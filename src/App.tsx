import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { AppRouter } from "./AppRouter";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRouter />
    </QueryClientProvider>
  );
}

export default App;
