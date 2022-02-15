import { useMutation } from "react-query";

export function useEditAddress(id: string) {
  return useMutation(
    async (formData: FormData) => {
      const response = await fetch(
        `https://613bb521110e000017a4570e.mockapi.io/students/${id}/address`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const error = await response.json();
        console.log("error", error);
        throw error.error;
      }

      return response;
    },
    { onSuccess: () => {} }
  );
}
