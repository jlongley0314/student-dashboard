import React from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Grid,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { useGetStudentById } from "../queries/useGetStudentById";
import { StudentProfileHeader } from "../components/StudentProfileHeader";
import { StudentAddressColumn } from "../components/StudentAddressColumn";
import { StudentAllergiesTable } from "../components/StudentAllergiesTable";
import { StudentSubmissionsTable } from "../components/StudentSubmissionsTable";

export function StudentProfileScreen() {
  let { id } = useParams();
  const { data, isLoading } = useGetStudentById(id);
  return (
    <Container>
      {id && data ? (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <StudentProfileHeader student={data} />
          </Grid>
          <Grid item xs={12}>
            <StudentAddressColumn
              id={id}
              address={data.address[0]}
              addressLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography>Allergies</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <StudentAllergiesTable
                  id={id}
                  allergies={data.allergies}
                  allergiesLoading={isLoading}
                />
              </AccordionDetails>
            </Accordion>
          </Grid>
          <Grid item xs={12}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography>Submissions</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <StudentSubmissionsTable
                  id={id}
                  submissions={data.submissions}
                  submissionsLoading={isLoading}
                />
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
      ) : (
        <CircularProgress
          style={{ position: "absolute", left: "50%", top: "50%" }}
        />
      )}
    </Container>
  );
}
