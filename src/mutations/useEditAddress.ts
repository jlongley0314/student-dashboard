import { useMutation } from "react-query";
import { Address } from "../types";

export function useEditAddress(id: string) {
  return useMutation(async (address: Address) => {
    const response = await fetch(
      `https://613bb521110e000017a4570e.mockapi.io/students/${id}/address`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(address),
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
