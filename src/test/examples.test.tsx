import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("Home page", () => {
  it("renders the Capytal heading", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", { name: /capytal/i }),
    ).toBeInTheDocument();
  });
});
