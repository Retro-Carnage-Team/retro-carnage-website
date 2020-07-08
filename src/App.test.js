import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders start screen with game title", () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Retro Carnage/i);
  expect(linkElement).toBeInTheDocument();
});
