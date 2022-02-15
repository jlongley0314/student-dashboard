import React from "react";
import { Student } from "../types";
import { Box, Typography } from "@mui/material";

type StudentProfileHeaderProps = {
  student: Student;
};

export function StudentProfileHeader(props: StudentProfileHeaderProps) {
  const { student } = props;
  function getDate(date: string) {
    let parsed = new Date(date);
    return parsed.toLocaleDateString("en-US");
  }

  return (
    <Box sx={{ width: "100%", maxWidth: 500 }}>
      <Typography variant="h3" component="div" gutterBottom>
        {`${student.firstName} ${student.lastName}`}
      </Typography>
      <Typography variant="h5" component="div" gutterBottom>
        {`DOB: ${getDate(student.dateOfBirth)}`}
      </Typography>
    </Box>
  );
}
