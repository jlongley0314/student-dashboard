import { useQuery } from "react-query";

async function getStudentById(id?: string) {
  const response = await fetch(
    `https://613bb521110e000017a4570e.mockapi.io/students/${id}`
  );
  if (!response.ok) {
    throw new Error("Error fetching student");
  }
  return response.json();
}

export function useGetStudentById(id?: string) {
  return useQuery(`student-${id}`, () => getStudentById(id), {
    enabled: !!id && id !== "",
  });
}
