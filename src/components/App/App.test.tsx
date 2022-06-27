import { render } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("should render the App component consistently", () => {
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
  });
});
