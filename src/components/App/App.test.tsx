import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";

const wrapper: React.FC = ({ children }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe("App", () => {
  it("should render the App component consistently", () => {
    const { container } = render(<App />, { wrapper });
    expect(container).toMatchSnapshot();
  });
});
