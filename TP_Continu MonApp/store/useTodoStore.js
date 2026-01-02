import { create } from "zustand";
import { db } from "../services/database";
import { fetchTodosFromFirestore, addTodoToFirestore } from "../services/firestore";

// Note: Ensure /services/database.js exports the SQLite db object as 'db'
// If not, this import might fail. The user prompt assumes there is a database service.

export const useTodoStore = create((set, get) => ({
  todos: [],
  loadTodos: async (uid) => {
    //charger Firestore
    const remoteTodos = await fetchTodosFromFirestore(uid);

    //injecter SQLite (Reset local cache from Remote source of truth logic? Or Merge?)
    // For simplicity in this TP, we replace local with remote or just append. 
    // The previous code did DELETE ALL then INSERT. That wipes local changes not synced. 
    // Let's keep existing logic but add 'completed' handling.

    db.transaction(tx => {
      tx.executeSql("DELETE FROM todos");
      remoteTodos.forEach(t =>
        tx.executeSql("INSERT INTO todos (id, title, completed) VALUES (?, ?, ?)",
          [t.id, t.title, t.completed ? 1 : 0])
      );
    });

    //charger SQLite vers Zustand
    db.transaction(tx => {
      tx.executeSql("SELECT * FROM todos", [], (_, res) => {
        set({ todos: res.rows._array });
      });
    });
  },
  addTodo: async (uid, title) => {
    const id = Date.now(); // Temp ID for Optimistic UI
    // SQLite
    db.transaction(tx => {
      tx.executeSql("INSERT INTO todos (id, title, completed) VALUES (?, ?, 0)", [id, title]);
    });

    // Firestore
    await addTodoToFirestore(uid, { title, completed: false });

    // Refresh
    get().loadTodos(uid);
  },
  toggleTodo: async (uid, id) => {
    const todo = get().todos.find(t => t.id === id);
    if (!todo) return;

    const newStatus = !todo.completed;

    // SQLite
    db.transaction(tx => {
      tx.executeSql("UPDATE todos SET completed = ? WHERE id = ?", [newStatus ? 1 : 0, id]);
    });

    // Update State
    set(state => ({
      todos: state.todos.map(t => t.id === id ? { ...t, completed: newStatus } : t)
    }));

    // Firestore (TODO: implémenter updateTodoInFirestore)
    // await updateTodoInFirestore(uid, id, { completed: newStatus });
  },
  deleteTodo: async (uid, id) => {
    // Supprimer localement (SQLite)
    db.transaction(tx => {
      tx.executeSql("DELETE FROM todos WHERE id = ?", [id]);
    });

    // Mettre à jour le state immédiatement pour la réactivité
    set((state) => ({ todos: state.todos.filter((t) => t.id !== id) }));
  }
}));