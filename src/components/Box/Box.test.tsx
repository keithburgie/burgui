import { describe, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Box from "./Box";

describe("Box", () => {
  const baseClass = "bsds-box";
  const testId = baseClass;

  it("renders without crashing", () => {
    render(<Box data-testid={testId} />);
  });

  /**
   * Replace and add more useful tests
   */
  it("applies className correctly", () => {
    render(<Box data-testid={testId} className={baseClass} />);
    expect(screen.getByTestId(testId)).toHaveClass(baseClass);
  });
});
