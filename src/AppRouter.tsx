import React, { ReactElement } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { StudentTableScreen } from "./screens/StudentTableScreen";
import { StudentProfileScreen } from "./screens/StudentProfileScreen";

export function AppRouter(): ReactElement {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StudentTableScreen />} />
        <Route path="/profile/:id" element={<StudentProfileScreen />} />
      </Routes>
    </Router>
  );
}
