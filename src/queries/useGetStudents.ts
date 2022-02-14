import { useQuery } from "react-query";

async function getStudents() {
  const response = await fetch(
    `https://613bb521110e000017a4570e.mockapi.io/students`
  );
  if (!response.ok) {
    throw new Error("Error fetching students");
  }
  return response.json();
}

export function useGetStudents() {
  return useQuery(`students`, () => getStudents());
}
