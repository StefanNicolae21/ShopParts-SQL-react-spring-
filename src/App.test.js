import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders the main navigation and homepage", () => {
  const { getByRole, getByText } = render(<App />);
  expect(getByRole("navigation", { name: /navigare principală/i })).toBeInTheDocument();
  expect(getByRole("link", { name: "Home" })).toBeInTheDocument();
  expect(getByText("Shop now")).toBeInTheDocument();
});
