import db from "@database/databaseInit";
import {DatabaseResponse} from "@types/databaseResponse";

export type Budget = {
  id: number;
  categoryId: number;
  value: number;
}

export default class BudgetsRepository {

  public static async getAll(): Promise<DatabaseResponse> {
    try
    {
      const result = await db.getAllAsync(`
        SELECT budgets.id, value, category.description as 'categoryName'
        FROM 
            budgets
        JOIN 
            category
        WHERE
            category.id = categoryId
        
    `)
      return { success: true, data: result }
    }
    catch (error)
    {
      console.log(error)
    }
  }

  public static async insert(budget: Omit<Budget, "id">): Promise<DatabaseResponse> {
    const statement = await db.prepareAsync(`
      INSERT INTO budgets 
          (categoryId, value)
      VALUES 
          ($categoryId, $value)
    `)

    try
    {
      const result = await statement.executeAsync(budget.categoryId, budget.value);
      return { success: true, data: result };
    }
    catch (error)
    {
      console.log(error)
      return { success: false };
    }
    finally
    {
      await statement.finalizeAsync();
    }
  }

  public static async calcBudgets(): Promise<DatabaseResponse> {

    try
    {
      const response = await db.getAllAsync(`
      SELECT budgets.value as budgetValue, category.description as categoryName, (
        SELECT TOTAL(transactions.price) 
        FROM 
            transactions
        WHERE
            budgets.categoryId = transactions.categoryId
        AND
            strftime('%m', transactions.date) = strftime('%m', date())
        AND
            strftime('%Y', transactions.date) = strftime('%Y', date())
        AND
            transactions.type = 'expense'
      ) as categoryExpense
      FROM
          budgets
      JOIN
          category
      WHERE
          category.id = budgets.categoryId
    `)
      console.log(response)
      return { success: true, data: response }
    }
    catch (error)
    {
      console.log(error)
      return { success: false };
    }
  }

}