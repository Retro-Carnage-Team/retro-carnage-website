import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders start screen with game title", () => {
  const { getByText } = render(React.createElement(App));
  const linkElement = getByText(/Start Game/i);
  expect(linkElement).toBeInTheDocument();
});
