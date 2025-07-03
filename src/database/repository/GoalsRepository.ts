import db from "@database/databaseInit";
import {DatabaseResponse} from "@types/databaseResponse";

export type Goal = {
  id: number;
  name: string;
  goalValue: number;
  currentValue: number;
  deadline: string;
}

export default class GoalsRepository {

  public static async getAll(): Promise<DatabaseResponse> {
    try
    {
      const result = await db.getAllAsync(`
        SELECT * FROM goals 
    `)
      return { success: true, data: result }
    }
    catch (error)
    {
      console.log(error)
    }
  }

  public static async insert(goal: Omit<Goal, "id" | "currentValue">): Promise<DatabaseResponse> {
    const statement = await db.prepareAsync(`
      INSERT INTO goals 
          (goalValue, deadline, name)
      VALUES 
          ($goalValue, $deadline, $name)
    `)

    try
    {
      const result = await statement.executeAsync(goal.goalValue, goal.deadline, goal.name);
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

  public static async updateGoalValue(value: number, id: string): Promise<DatabaseResponse> {
    const statement = await db.prepareAsync(`
      UPDATE 
          goals 
      SET
        currentValue = $currentValue
      WHERE 
          goals.id = $id
    `)

    try
    {
      const result = await statement.executeAsync(value, id);
      console.log(result);
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

}