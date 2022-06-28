import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Navigation } from "./Navigation";

const wrapper: React.FC = ({ children }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

function renderNavigation() {
  render(<Navigation />, { wrapper });
}

describe("Navigation", () => {
  it("should not render the drawer initially", () => {
    renderNavigation();
    expect(screen.queryByRole("presentation")).not.toBeInTheDocument();
  });

  it("should be in the drawer after clicking the menu button", () => {
    renderNavigation();
    userEvent.click(screen.getByRole("button"));
    expect(screen.getByRole("presentation")).toBeInTheDocument();
  });

  it("should keep the drawer open if the user presses tab", () => {
    renderNavigation();
    userEvent.click(screen.getByRole("button"));

    expect(screen.getByRole("presentation")).toBeInTheDocument();

    userEvent.tab();

    expect(screen.getByRole("presentation")).toBeInTheDocument();
  });
});
