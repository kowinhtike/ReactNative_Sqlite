import * as SQLite from "expo-sqlite";

export const getDatabase = async () => {
  const db = await SQLite.openDatabaseAsync("data");
  return db;
};

export const executeQuery = async (sql, params) => {
  const db = await getDatabase();
  try {
    await db.runAsync(sql, params);
  } catch (error) {
    console.error("Database error:", error);
  } finally {
    fetchStudents();
  }
};

export const fetchStudents = async () => {
  const db = await getDatabase();
  await db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS students (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, age INTEGER);
      CREATE TABLE IF NOT EXISTS student_marks (id INTEGER PRIMARY KEY NOT NULL, student_id INTEGER, mark INTEGER,
      FOREIGN KEY(student_id) REFERENCES students(id) ON DELETE CASCADE);
      `);
  const allRows = await db.getAllAsync("SELECT * FROM students");
  return allRows;
};

export const fetchStudentMarks = async (studentId) => {
  const db = await getDatabase();
  const marks = await db.getAllAsync(
    "SELECT * FROM student_marks WHERE student_id = ?",
    [studentId]
  );
  return marks;
};
