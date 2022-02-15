import React from "react";
import { useGetStudents } from "../queries/useGetStudents";
import CircularProgress from "@mui/material/CircularProgress";
import { StudentsTable } from "../components/StudentsTable";

export function StudentTableScreen() {
  const studentsQuery = useGetStudents();
  console.log(studentsQuery.data);
  return (
    <>
      {studentsQuery.isLoading ? (
        <CircularProgress
          style={{ position: "absolute", left: "50%", top: "50%" }}
        />
      ) : (
        <StudentsTable students={studentsQuery.data} />
      )}
    </>
  );
}
