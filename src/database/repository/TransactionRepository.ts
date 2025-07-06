import db from "@database/databaseInit";

export type Transaction = {
  id: number,
  description: string,
  type: 'revenue' | 'expense' | 'transfer',
  price: number,
  installments: number,
  paid: boolean,
  date: string
  categoryId: number,
}

type DatabaseResponse = {
  success: boolean,
  data?: any
}

export default class TransactionRepository {

  public static async getAll(monthNumber: string, yearNumber: string): Promise<Transaction[]> {
    return await db.getAllAsync(`
        SELECT * FROM 
            transactions 
        WHERE 
            strftime('%m', date) = '${monthNumber}'
        AND
            strftime('%Y', date) = '${yearNumber}'
    `);
  }

  public static async insert(transaction: Omit<Transaction, "id">): Promise<DatabaseResponse>  {
    const statement = await db.prepareAsync(`
      INSERT INTO transactions 
            (description, type, price, installments, paid, date, categoryId) 
      VALUES
            ($description, $type, $price, $installments, $paid, $date, $categoryId)
    `)

    try
    {
      const result = await statement.executeAsync(
        transaction.description,
        transaction.type,
        transaction.price,
        transaction.installments,
        transaction.paid,
        transaction.date,
        transaction.categoryId,
      );

      return { success: true }
    }
    catch
    {
      return { success: false }
    }
    finally
    {
      await statement.finalizeAsync();
    }
  }

  public static async sumAllPrices(
    transferType: Transaction["type"], monthNumber: string, yearNumber: string
  ): Promise<DatabaseResponse> {

    try {
      const result = await db.getFirstAsync(`
          SELECT SUM(price) as totalPrice 
          FROM transactions 
          WHERE 
              type = '${transferType}'
          AND
              strftime('%m', date) = '${monthNumber}'
          AND
              strftime('%Y', date) = '${yearNumber}'
          `,
      )
      return { success: true, data: result };
    }
    catch(error) {
      console.log(error)
      return { success: false }
    }
  }

  public static async expensesByCategory(): Promise<DatabaseResponse> {

    try {
      const result = await db.getAllAsync(`
          WITH category_expenses AS (
              SELECT SUM(price) as categoryPrice,
                     category.description,
                     category.colour
              FROM
                  transactions
                      LEFT JOIN
                  category
              WHERE
                  type = 'expense'
                AND
                  category.id = transactions.categoryId
                AND 
                  strftime('%m', date) = strftime('%m', date())
              GROUP BY
                  categoryId
          ),
          total_expenses AS (
              SELECT SUM(price) as totalPrice 
              FROM 
                  transactions 
              WHERE 
                  type = 'expense'
              AND
                  strftime('%m', date) = strftime('%m', date())
          )
          SELECT
              ce.categoryPrice,
              ce.description,
              ce.colour,
              ct.totalPrice
          FROM
              category_expenses ce,
              total_expenses AS ct

      `)
      return { success: true, data: result };
    }
      catch(error) {
        console.log(error)
      }
  }

  public static async getAllRevenuesAndExpenses(): Promise<DatabaseResponse> {
    try
    {
      const result = await db.getAllAsync(`
        SELECT
            (SELECT TOTAL(price) FROM transactions
             WHERE type = 'revenue'
               AND strftime('%m', date) = strftime('%m', date('now'))
               AND strftime('%Y', date) = strftime('%Y', date('now'))
            ) AS totalRevenues,
            -- ##############
            (SELECT TOTAL(price) FROM transactions
             WHERE type = 'expense'
               AND strftime('%m', date) = strftime('%m', date('now'))
               AND strftime('%Y', date) = strftime('%Y', date('now'))
            ) AS totalExpenses,
            -- ##############
            (
                SELECT TOTAL(price) FROM transactions
                WHERE type = 'revenue'
                  AND date(date) BETWEEN date('now', 'start of month', '-1 month') AND date('now', 'start of month', '-1 day')
            ) -
            (
                SELECT TOTAL(price) FROM transactions
                WHERE type = 'expense'
                  AND date(date) BETWEEN date('now', 'start of month', '-1 month') AND date('now', 'start of month', '-1 day')
            ) AS lastMonthNetBalance,
            -- ##############
            (
                SELECT TOTAL(price) FROM transactions
                WHERE 
                    type = 'revenue'
                AND
                    paid = true
                AND date(date) BETWEEN date('now', 'start of month') AND date('now', 'start of month', '+1 month', '-1 day')
            ) -
            (
                SELECT TOTAL(price) FROM transactions
                WHERE 
                    type = 'expense'
                AND
                    paid = true
                AND 
                    date(date) BETWEEN date('now', 'start of month') AND date('now', 'start of month', '+1 month', '-1 day')
            ) AS thisMonthNetBalance
    `)
      return { success: true, data: result };
    }
    catch(error)
    {
      console.log(error)
      return { success: false }
    }
  }

  public static async changePaidState(id: number, changeTo: boolean): Promise<DatabaseResponse> {
    const statement = await db.prepareAsync(`
      UPDATE 
        transactions
      SET 
        paid = $paid
      WHERE 
        id = $id
    `)

    try
    {
      const result = await statement.executeAsync(changeTo, id)
      return { success: true };
    }
    catch(error)
    {
      console.log(error)
      return { success: false }
    }
    finally
    {
      statement.finalizeAsync();
    }
  }

  public static test() {
    return db.getFirstSync(`
      SELECT strftime('%Y', date) FROM transactions
    `)
  }

}