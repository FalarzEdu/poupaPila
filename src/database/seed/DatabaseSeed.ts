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
        description TEXT NOT NULL UNIQUE,
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
      // statement.executeSync("Compras", "#40F99B");
      // statement.executeSync("Lazer", "#61707D");
      // statement.executeSync("Outros", "#9D69A3");
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

  private static budgetsTable(): void {
    db.execSync(`
      CREATE TABLE IF NOT EXISTS budgets (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          categoryId INTEGER NOT NULL,
          value REAL NOT NULL,
          FOREIGN KEY (categoryId) REFERENCES category(id) ON DELETE CASCADE
      )
    `)
  }

  public static initializeDatabase(): void {
    try {
      this.enableForeignKeys()
      this.categoryTable();
      this.transactionTable();
      this.budgetsTable();
    } catch (error) {
      console.error(error);
    }
  }
}