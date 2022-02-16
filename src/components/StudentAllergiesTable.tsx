import React, { useState, useEffect } from "react";
import { Allergy, Severity, AllergyType } from "../types";
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
  Select,
  InputLabel,
  FormControl,
  MenuItem,
  TextField,
  LinearProgress,
} from "@mui/material";
import { AddBox } from "@mui/icons-material";
import { useEditAllergy } from "../mutations/useEditAllergy";
import { useAddAllergy } from "../mutations/useAddAllergy";
import { useQueryClient } from "react-query";

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

type StudentAllergiesTableProps = {
  allergies: Allergy[];
  id: string;
  allergiesLoading: boolean;
};

const DefaultAllergy = {
  id: undefined,
  severity: Severity.Low,
  type: AllergyType.Environmental,
  description: "",
};

export function StudentAllergiesTable(props: StudentAllergiesTableProps) {
  const { allergies, id, allergiesLoading } = props;
  const addAllergyMutation = useAddAllergy(id);
  const editAllergyMutation = useEditAllergy(id);
  const [modalOpen, setModalOpen] = useState(false);
  const [allergyFormData, setAllergyFormData] = useState<Allergy>(
    DefaultAllergy
  );
  const queryClient = useQueryClient();

  function handleEditClick(allergy: Allergy) {
    setAllergyFormData(allergy);
    setModalOpen(true);
  }

  function handleAllergySubmit() {
    if (allergyFormData.id) {
      editAllergyMutation.mutate(allergyFormData);
    } else {
      addAllergyMutation.mutate(allergyFormData);
    }
    setAllergyFormData(DefaultAllergy);
    setModalOpen(false);
  }

  useEffect(() => {
    queryClient.invalidateQueries(`student-${id}`);
  }, [editAllergyMutation.isSuccess, addAllergyMutation.isSuccess]);

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
      {(editAllergyMutation.isLoading ||
        addAllergyMutation.isLoading ||
        allergiesLoading) && <LinearProgress />}
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
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box sx={style}>
          <Typography variant="h6" component="h2" gutterBottom>
            Allergy
          </Typography>
          <Box component="form" noValidate autoComplete="off">
            <FormControl fullWidth style={{ marginBottom: 10 }}>
              <InputLabel>Severity</InputLabel>
              <Select
                value={
                  allergyFormData?.severity
                    ? allergyFormData.severity
                    : undefined
                }
                label="Severity"
                onChange={(event) => {
                  {
                    setAllergyFormData({
                      ...allergyFormData,
                      severity: event.target.value,
                    });
                  }
                }}
              >
                <MenuItem value={Severity.Low}>Low</MenuItem>
                <MenuItem value={Severity.Medium}>Medium</MenuItem>
                <MenuItem value={Severity.High}>High</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth style={{ marginBottom: 10 }}>
              <InputLabel>Type</InputLabel>
              <Select
                value={allergyFormData?.type ? allergyFormData.type : undefined}
                label="Type"
                onChange={(event) => {
                  {
                    setAllergyFormData({
                      ...allergyFormData,
                      type: event.target.value,
                    });
                  }
                }}
              >
                <MenuItem value={AllergyType.Environmental}>
                  Environmental
                </MenuItem>
                <MenuItem value={AllergyType.Food}>Food</MenuItem>
                <MenuItem value={AllergyType.Medicine}>Medicine</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Description"
              defaultValue={allergyFormData.description}
              style={{ marginBottom: 10 }}
              onChange={(event) => {
                setAllergyFormData({
                  ...allergyFormData,
                  description: event.target.value,
                });
              }}
            />
          </Box>
          <Button
            variant="contained"
            style={{ marginTop: 15 }}
            onClick={handleAllergySubmit}
          >
            Submit
          </Button>
        </Box>
      </Modal>
    </>
  );
}
