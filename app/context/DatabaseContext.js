import React, { createContext, useState, useEffect } from "react";
import { fetchStudents, fetchStudentMarks } from "../ProjectCRUD/database";
import {
  storeStudent,
  updateStudent,
  destroyStudent,
  storeStudentMark,
  updateStudentMark,
  destroyStudentMark,
} from "../ProjectCRUD/crud";

export const DatabaseContext = createContext();

export const DatabaseProvider = ({ children }) => {
  const [rows, setRows] = useState([]);
  const [marks, setMarks] = useState([]);

  const loadStudents = async () => {
    const allRows = await fetchStudents();
    setRows(allRows);
  };
  const loadStudentMarks = async (studentId) => {
    const studentMarks = await fetchStudentMarks(studentId);
    setMarks(studentMarks);
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const addStudent = async (item) => {
    await storeStudent(item);
    loadStudents();
  };

  const editStudent = async (item) => {
    await updateStudent(item);
    loadStudents();
  };

  const deleteStudent = async (id) => {
    await destroyStudent(id);
    loadStudents();
  };

  const addMark = async (markData) => {
    await storeStudentMark(markData);
    loadStudentMarks(markData.student_id);
  };

  const editMark = async (markData) => {
    await updateStudentMark(markData);
    loadStudentMarks(markData.student_id);
  };

  const deleteMark = async (markData) => {
    await destroyStudentMark(markData.id);
    loadStudentMarks(markData.student_id);
  };

  return (
    <DatabaseContext.Provider
      value={{
        rows,
        marks,
        addStudent,
        editStudent,
        deleteStudent,
        addMark,
        editMark,
        deleteMark,
        loadStudentMarks,
      }}
    >
      {children}
    </DatabaseContext.Provider>
  );
};
