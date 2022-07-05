import { MockedProvider } from "@apollo/client/testing";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { useSnackbarStateMock } from "test-utilities/test-state";
import { App } from "./App";

const wrapper: React.FC = ({ children }) => (
  <MockedProvider>
    <BrowserRouter>{children}</BrowserRouter>
  </MockedProvider>
);

describe("App", () => {
  beforeEach(() => {
    useSnackbarStateMock();
  });

  it("should render the App component consistently", () => {
    const { container } = render(<App />, { wrapper });
    expect(container).toMatchSnapshot();
  });
});
