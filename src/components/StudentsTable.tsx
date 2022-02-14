import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { Student } from "../types";

type StudentsTableProps = {
  students: Student[];
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export function StudentsTable({ students }: StudentsTableProps) {
  function getDate(date: string) {
    let parsed = new Date(date);
    return parsed.toLocaleDateString("en-US");
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Student ID #</StyledTableCell>
            <StyledTableCell align="right">First Name</StyledTableCell>
            <StyledTableCell align="right">Last Name</StyledTableCell>
            <StyledTableCell align="right">Date of Birth</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((student: Student) => (
            <StyledTableRow key={student.id}>
              <StyledTableCell component="th" scope="row">
                {student.id}
              </StyledTableCell>
              <StyledTableCell align="right">
                {student.firstName}
              </StyledTableCell>
              <StyledTableCell align="right">
                {student.lastName}
              </StyledTableCell>
              <StyledTableCell align="right">
                {getDate(student.dateOfBirth)}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
