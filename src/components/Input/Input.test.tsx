import { render, screen } from "@testing-library/react";
import { Input } from "./Input";

describe("Input", () => {
  const baseClass = "bsds-input";
  const testId = baseClass;

  it("renders without crashing", () => {
    render(<Input data-testid={testId} />);
  });

  /**
   * Replace and add more useful tests
   */
  it("applies className correctly", () => {
    render(<Input data-testid={testId} className={baseClass} />);
    expect(screen.getByTestId(testId)).toHaveClass(baseClass);
  });
});
