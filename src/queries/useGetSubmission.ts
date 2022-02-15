import { useQuery } from "react-query";

async function getSubmissions(id: string) {
  const response = await fetch(
    `https://613bb521110e000017a4570e.mockapi.io/students/${id}/allergies`
  );
  if (!response.ok) {
    throw new Error(`Error fetching submissions`);
  }
  return response.json();
}

export function useGetSubmissions(id: string) {
  return useQuery(`submissions-${id}`, () => getSubmissions(id), {
    enabled: !!id && id !== "",
  });
}
