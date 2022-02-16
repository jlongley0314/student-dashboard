import React, { useState, useEffect } from "react";
import { Submission } from "../types";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
  Modal,
  Typography,
  Box,
  TextField,
  LinearProgress,
} from "@mui/material";
import { AddBox } from "@mui/icons-material";
import { useAddSubmission } from "../mutations/useAddSubmission";
import { useQueryClient } from "react-query";

type StudentAllergiesTableProps = {
  submissions: Submission[];
  id: string;
  submissionsLoading: boolean;
};

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export function StudentSubmissionsTable(props: StudentAllergiesTableProps) {
  const { submissions, id, submissionsLoading } = props;
  const [modalOpen, setModalOpen] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const [submissionFormData, setSubmissionFormData] = useState({
    assignmentName: "",
    dueDate: "",
    difficulty: 0,
    teachersNotes: "",
  });
  const submissionMutation = useAddSubmission(id);
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries(`student-${id}`);
  }, [submissionMutation.isSuccess]);

  function formDataValid() {
    return (
      submissionFormData.assignmentName &&
      submissionFormData.dueDate &&
      submissionFormData.difficulty
    );
  }

  function handleSubmit() {
    setShowErrors(true);
    if (formDataValid()) {
      submissionMutation.mutate(submissionFormData);
      setModalOpen(false);
    }
  }

  return (
    <>
      {submissionMutation.isLoading && <LinearProgress />}
      <Button
        variant="contained"
        endIcon={<AddBox />}
        style={{ marginBottom: 15 }}
        onClick={() => setModalOpen(true)}
      >
        Add Submission
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell>Assignment Name</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Difficulty</TableCell>
              <TableCell>Teachers Notes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {submissions.map((submission: Submission) => (
              <TableRow hover key={submission.id}>
                <TableCell component="th" scope="row">
                  {submission.assignmentName}
                </TableCell>
                <TableCell component="th" scope="row">
                  {submission.dueDate}
                </TableCell>
                <TableCell component="th" scope="row">
                  {submission.difficulty}
                </TableCell>
                <TableCell component="th" scope="row">
                  {submission.teachersNotes}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box sx={style}>
          <Typography variant="h6" component="h2" gutterBottom>
            Submission
          </Typography>
          <Box component="form" noValidate autoComplete="off">
            <TextField
              required
              fullWidth
              error={showErrors && !submissionFormData.assignmentName}
              label="Assignment Name"
              style={{ marginBottom: 10 }}
              onChange={(event) => {
                setSubmissionFormData({
                  ...submissionFormData,
                  assignmentName: event.target.value,
                });
              }}
            />
            <TextField
              required
              error={showErrors && !submissionFormData.dueDate}
              fullWidth
              label="Due Date (mm-dd-yyyy)"
              style={{ marginBottom: 10 }}
              onChange={(event) => {
                setSubmissionFormData({
                  ...submissionFormData,
                  dueDate: event.target.value,
                });
              }}
            />
            <TextField
              required
              fullWidth
              error={
                showErrors &&
                !submissionFormData.difficulty &&
                (submissionFormData.difficulty <= 10 ||
                  submissionFormData.difficulty > 0)
              }
              helperText={
                showErrors &&
                !submissionFormData.difficulty &&
                (submissionFormData.difficulty <= 10 ||
                  submissionFormData.difficulty > 0)
                  ? "Must be between 1-10"
                  : ""
              }
              label="Difficulty"
              inputProps={{ min: 1, max: 10 }}
              type="number"
              style={{ marginBottom: 10 }}
              onChange={(event) => {
                setSubmissionFormData({
                  ...submissionFormData,
                  difficulty: parseInt(event.target.value),
                });
              }}
            />
            <TextField
              fullWidth
              label="Teacher's Notes"
              style={{ marginBottom: 10 }}
              onChange={(event) => {
                setSubmissionFormData({
                  ...submissionFormData,
                  teachersNotes: event.target.value,
                });
              }}
            />
          </Box>
          <Button
            variant="contained"
            style={{ marginTop: 15 }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Box>
      </Modal>
    </>
  );
}
