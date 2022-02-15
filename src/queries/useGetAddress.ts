import { useQuery } from "react-query";

async function getAddress(id: string) {
  const response = await fetch(
    `https://613bb521110e000017a4570e.mockapi.io/students/${id}/address`
  );
  if (!response.ok) {
    throw new Error(`Error fetching address`);
  }
  return response.json();
}

export function useGetAddress(id: string) {
  return useQuery(`address-${id}`, () => getAddress(id), {
    enabled: !!id && id !== "",
  });
}
