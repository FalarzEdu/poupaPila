import db from "@database/databaseInit";

export type Category = {
  id: number;
  description: string;
  colour: string;
};

export default class CategoryRepository {

  public static async getAll(): Promise<Category[]> {
    return await db.getAllAsync("SELECT * FROM category");
  }

  public static async insert(category: Omit<Category, "id">): Promise<any> {
    const statement = await db.prepareAsync(
      "INSERT INTO category (description, colour) VALUES ($description, $colour);"
    )
    try {
      const result = await statement.executeAsync(category.description, category.colour);
      console.log(result.lastInsertRowId.toLocaleString());
    } finally {
      await statement.finalizeAsync();
    }
  }
}