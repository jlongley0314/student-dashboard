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

export function StudentProfileScreen() {
  let { id } = useParams();
  const { data } = useGetStudentById(id);
  console.log("data", data);
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
              address={data.address[data.address.length - 1]}
            />
          </Grid>
          <Grid item xs={12}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography>Allergies</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <StudentAllergiesTable id={id} allergies={data.allergies} />
              </AccordionDetails>
            </Accordion>
          </Grid>
          <Grid item xs={12}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography>Submissions</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </Typography>
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
