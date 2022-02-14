import React, { ReactElement } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { StudentTableScreen } from "./screens/StudentTableScreen";

export function AppRouter(): ReactElement {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StudentTableScreen />} />
      </Routes>
    </Router>
  );
}
