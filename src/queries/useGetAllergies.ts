import { useQuery } from "react-query";

async function getAllergies(id: string) {
  const response = await fetch(
    `https://613bb521110e000017a4570e.mockapi.io/students/${id}/allergies`
  );
  if (!response.ok) {
    throw new Error(`Error fetching allergies`);
  }
  return response.json();
}

export function useGetAllergies(id: string) {
  return useQuery(`allergies-${id}`, () => getAllergies(id), {
    enabled: !!id && id !== "",
  });
}
