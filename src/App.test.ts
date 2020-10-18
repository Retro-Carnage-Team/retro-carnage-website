import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders start screen with game title", () => {
  const { getByText } = render(React.createElement(App));
  const linkElement = getByText(/is loading/i);
  expect(linkElement).toBeInTheDocument();
});
