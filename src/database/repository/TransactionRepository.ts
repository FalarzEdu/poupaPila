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

  public static async getAll(): Promise<Transaction[]> {
    return await db.getAllAsync("SELECT * FROM transactions;");
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

  public static async sumAllPrices(transferType: Transaction["type"]): Promise<DatabaseResponse> {

    try {
      const result = await db.getFirstAsync(
        `SELECT SUM(price) as totalPrice FROM transactions WHERE type = '${transferType}'`,
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
              GROUP BY
                  categoryId
          ),
          total_expenses AS (
              SELECT SUM(price) as totalPrice 
              FROM 
                  transactions 
              WHERE 
                  type = 'expense'
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

}