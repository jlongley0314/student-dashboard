import { useMutation } from "react-query";
import { Submission } from "../types";

export function useAddSubmission(id: string) {
  return useMutation(async (submission: Omit<Submission, "id">) => {
    const response = await fetch(
      `https://613bb521110e000017a4570e.mockapi.io/students/${id}/submissions`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submission),
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
