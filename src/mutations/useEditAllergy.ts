import { useMutation } from "react-query";
import { Allergy } from "../types";

export function useEditAllergy(id: string) {
  return useMutation(async (allergy: Allergy) => {
    const response = await fetch(
      `https://613bb521110e000017a4570e.mockapi.io/students/${id}/allergies/${allergy.id}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(allergy),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      console.log("error", error);
      throw error.error;
    }

    return response;
  });
}
