import { executeQuery } from "./database";

export const storeStudent = async (item) => {
  console.log(item);
  await executeQuery(
    "INSERT INTO students (name, age) VALUES ($name,$age)",
    { $name: item.name, $age: parseInt(item.age) }
  );
};

export const updateStudent = async (item) => {
  await executeQuery(
    "UPDATE students SET name = $name, age = $age WHERE id = $id",
    { $name: item.name, $age: parseInt(item.age), $id: item.id }
  );
};

export const destroyStudent = async (id) => {
  await executeQuery("DELETE FROM students WHERE id = $id", { $id: id });
};

export const storeStudentMark = async (markData) => {
  await executeQuery(
    "INSERT INTO student_marks (student_id, mark) VALUES ($student_id, $mark)",
    { $student_id: markData.student_id, $mark: parseInt(markData.mark) }
  );
};

export const updateStudentMark = async (markData) => {
  await executeQuery(
    "UPDATE student_marks SET mark = $mark WHERE id = $id",
    { $mark: parseInt(markData.mark), $id: markData.id }
  );
};

export const destroyStudentMark = async (id) => {
  await executeQuery("DELETE FROM student_marks WHERE id = $id", { $id: id });
};