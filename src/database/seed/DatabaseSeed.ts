import db from "@database/databaseInit";

export default class DatabaseSeed {

  private static enableForeignKeys() {
    try {
      db.execSync(`
      PRAGMA foreign_keys = ON;
    `)
    } catch (error) {
      throw error;
    }
  }

  private static categoryTable(): void {
    try {
      db.execSync(`
      CREATE TABLE IF NOT EXISTS category (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        description TEXT NOT NULL,
        colour TEXT
      );
    `);

      // const statement = db.prepareSync(`
      //   INSERT INTO category
      //       (description, colour)
      //   VALUES
      //       ($description, $category);
      // `)
      //
      // statement.executeSync("Compras", "#d1d11b");
      // statement.executeSync("Lazer", "#f2a5b8");
      // statement.executeSync("Outros", "#6d6aba");
      // statement.executeSync("Fixos", "#3dd44a");

    } catch (error) {
      throw error;
    }
  }

  private static transactionTable(): void {
    try {
      db.execSync(`
      CREATE TABLE IF NOT EXISTS transactions (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          description TEXT NOT NULL,
          type TEXT CHECK(type IN ('revenue', 'expense', 'transfer')) NOT NULL,
          price REAL NOT NULL,
          installments INTEGER DEFAULT NULL,
          paid BOOLEAN NOT NULL DEFAULT false,
          date TEXT NOT NULL,
          categoryId INTEGER NOT NULL,
          FOREIGN KEY (categoryId) REFERENCES category(id) ON DELETE CASCADE
      )  
    `)
    } catch (error) {
      throw error;
    }
  }

  public static initializeDatabase(): void {
    try {
      this.enableForeignKeys()
      this.categoryTable();
      this.transactionTable();
    } catch (error) {
      console.error(error);
    }
  }
}