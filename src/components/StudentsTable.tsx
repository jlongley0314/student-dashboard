import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Student } from "../types";
import { useNavigate } from "react-router-dom";

type StudentsTableProps = {
  students: Student[];
};

export function StudentsTable({ students }: StudentsTableProps) {
  const navigate = useNavigate();

  function getDate(date: string) {
    let parsed = new Date(date);
    return parsed.toLocaleDateString("en-US");
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell>Student ID #</TableCell>
            <TableCell align="right">First Name</TableCell>
            <TableCell align="right">Last Name</TableCell>
            <TableCell align="right">Date of Birth</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((student: Student) => (
            <TableRow
              hover
              key={student.id}
              style={{ cursor: "pointer" }}
              onClick={(event) => navigate(`/profile/${student.id}`)}
            >
              <TableCell component="th" scope="row">
                {student.id}
              </TableCell>
              <TableCell align="right">{student.firstName}</TableCell>
              <TableCell align="right">{student.lastName}</TableCell>
              <TableCell align="right">
                {getDate(student.dateOfBirth)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
