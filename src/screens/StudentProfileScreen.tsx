import React from "react";
import { useParams } from "react-router-dom";
import { Container, Grid, CircularProgress } from "@mui/material";
import { useGetStudentById } from "../queries/useGetStudentById";
import { StudentProfileHeader } from "../components/StudentProfileHeader";
import { StudentAddressColumn } from "../components/StudentAddressColumn";

export function StudentProfileScreen() {
  let { id } = useParams();
  const { isLoading, data } = useGetStudentById(id);
  return (
    <Container>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <StudentProfileHeader student={data} />
          </Grid>
          <Grid item xs={12}>
            <StudentAddressColumn id={id} address={data.address[0]} />
          </Grid>
          <Grid item xs={6}>
            {"allergies"}
          </Grid>
          <Grid item xs={6}>
            {"submissions"}
          </Grid>
        </Grid>
      )}
    </Container>
  );
}
