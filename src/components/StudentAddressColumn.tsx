import React, { useState } from "react";
import { Address } from "../types";
import {
  Card,
  Typography,
  Stack,
  Button,
  TextField,
  Box,
  LinearProgress,
} from "@mui/material";
import { useEditAddress } from "../mutations/useEditAddress";

type StudentAddressColumnProps = {
  address: Address;
  id: string;
};

export function StudentAddressColumn(props: StudentAddressColumnProps) {
  const { address, id } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(address);
  const editAddressMutation = useEditAddress(id);

  function handleClick() {
    setIsEditing(!isEditing);
    if (isEditing) {
      editAddressMutation.mutate(formData);
    }
  }

  return (
    <Card variant="outlined" style={{ padding: 10 }}>
      {editAddressMutation.isLoading && <LinearProgress />}
      <Typography variant="h5" component="div" gutterBottom>
        Address:
      </Typography>
      {isEditing ? (
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "50ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              required
              error={!formData.line1}
              label="Address Line 1"
              defaultValue={address.line1}
              onChange={(event) => {
                setFormData({ ...formData, line1: event.target.value });
              }}
            />
            <TextField
              label="Address Line 2"
              defaultValue={address.line2}
              onChange={(event) => {
                setFormData({ ...formData, line2: event.target.value });
              }}
            />
            <TextField
              required
              error={!formData.city}
              label="City"
              defaultValue={address.city}
              onChange={(event) => {
                setFormData({ ...formData, city: event.target.value });
              }}
            />
            <TextField
              required
              error={!formData.state}
              label="State"
              defaultValue={address.state}
              onChange={(event) => {
                setFormData({ ...formData, state: event.target.value });
              }}
            />
            <TextField
              required
              error={!formData.zip}
              label="ZIP"
              type="number"
              defaultValue={address.zip}
              onChange={(event) => {
                setFormData({ ...formData, zip: parseInt(event.target.value) });
              }}
            />
          </div>
        </Box>
      ) : (
        <Stack>
          <Typography variant="body2" component="div">
            {address.line1}
          </Typography>
          {address.line2 !== "" && (
            <Typography variant="body2" component="div">
              {address.line2}
            </Typography>
          )}
          <Typography variant="body2" component="div">
            {`${address.city}, ${address.state} ${address.zip}`}
          </Typography>
        </Stack>
      )}
      <Button
        style={{ width: 15, marginTop: 20 }}
        variant="contained"
        onClick={handleClick}
        type="submit"
      >
        {isEditing ? "Save" : "Edit"}
      </Button>
    </Card>
  );
}
