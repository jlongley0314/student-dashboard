import React, { useState } from "react";
import { Address } from "../types";
import { Card, Typography, Stack, Button, TextField, Box } from "@mui/material";
import { useEditAddress } from "../mutations/useEditAddress";
import { useForm, Controller } from "react-hook-form";

type StudentAddressColumnProps = {
  address: Address;
  id: string;
};

export function StudentAddressColumn(props: StudentAddressColumnProps) {
  const { address, id } = props;
  const { register, handleSubmit } = useForm();
  const [isEditing, setIsEditing] = useState(false);
  const editAddressMutation = useEditAddress(id);

  function handleClick() {
    setIsEditing(!isEditing);
    if (isEditing) {
      handleSubmit(submitAddress);
    }
  }

  function submitAddress() {
    editAddressMutation.mutate();
  }

  return (
    <Card variant="outlined" style={{ padding: 10 }}>
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
              label="Address Line 1"
              defaultValue={address.line1}
            />
            <TextField label="Address Line 2" defaultValue={address.line2} />
            <TextField required label="City" defaultValue={address.city} />
            <TextField required label="State" defaultValue={address.state} />
            <TextField required label="ZIP" defaultValue={address.zip} />
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
