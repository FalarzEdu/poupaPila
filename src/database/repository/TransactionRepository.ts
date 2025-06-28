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

}