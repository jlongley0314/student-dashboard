import React, { useState } from "react";
import { Allergy } from "../types";
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
  TextField,
  Box,
} from "@mui/material";
import { AddBox } from "@mui/icons-material";

type StudentAllergiesTableProps = {
  allergies: Allergy[];
  id: string;
};

export function StudentAllergiesTable(props: StudentAllergiesTableProps) {
  const { allergies, id } = props;
  const [modalOpen, setModalOpen] = useState(false);
  const [allergyToEdit, setAllergyToEdit] = useState<Allergy | undefined>();

  function handleEditClick(allergy: Allergy) {
    setAllergyToEdit(allergy);
    setModalOpen(true);
  }

  function handleAllergySubmit() {
    if (allergyToEdit) {
      setAllergyToEdit(undefined);
    }
  }

  return (
    <>
      <Button
        variant="contained"
        endIcon={<AddBox />}
        style={{ marginBottom: 15 }}
        onClick={() => setModalOpen(true)}
      >
        Add Allergy
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell>Severity</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Description</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allergies.map((allergy: Allergy) => (
              <TableRow hover key={allergy.id}>
                <TableCell component="th" scope="row">
                  {allergy.severity}
                </TableCell>
                <TableCell component="th" scope="row">
                  {allergy.type}
                </TableCell>
                <TableCell component="th" scope="row">
                  {allergy.description}
                </TableCell>
                <TableCell component="th" scope="row">
                  {
                    <Button
                      variant="contained"
                      onClick={() => handleEditClick(allergy)}
                    >
                      Edit
                    </Button>
                  }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <Typography variant="h6" component="h2">
            {allergyToEdit ? "Edit Allergy" : "Create Allergy"}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
          <Button variant="contained">Submit</Button>
        </Box>
      </Modal>
    </>
  );
}
