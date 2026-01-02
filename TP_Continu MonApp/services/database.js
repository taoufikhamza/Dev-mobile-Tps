import * as SQLite from "expo-sqlite";
export const db = SQLite.openDatabaseSync("todos.db");
export const initDB = () => {
  db.execSync(`
  CREATE TABLE IF NOT EXISTS todos(
  id INTEGER PRIMARY KEY,
  title TEXT,
  completed INTEGER DEFAULT 0
);
`);
  // Migration simple: Ajoute la colonne si elle manque (pour les utilisateurs existants)
  try {
    db.execSync("ALTER TABLE todos ADD COLUMN completed INTEGER DEFAULT 0;");
  } catch (e) {
    // La colonne existe déjà, on ignore l'erreur
  }
};

export const addTodoOffline = (title) => {
  db.runSync(
    "INSERT INTO todos (id, title) VALUES (?, ?)",
    [Date.now(), title]
  );
};

export const updateTodoOffline = (id, title) => {
  db.runSync(
    "UPDATE todos SET title = ? WHERE id = ?",
    [title, id]
  );
};

export const deleteTodoOffline = (id) => {
  db.runSync("DELETE FROM todos WHERE id = ?", [id]);
};

export const loadTodos = () => {
  return db.getAllSync("SELECT * FROM todos");
};
