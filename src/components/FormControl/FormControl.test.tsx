import { render, screen } from "@testing-library/react";
import { FormControl } from "./FormControl";

describe("FormControl", () => {
  const baseClass = "bsds-form-control";
  const testId = baseClass;

  it("renders without crashing", () => {
    render(
      <FormControl data-testid={testId} id={testId} label="Form Control" />
    );
  });

  /**
   * Replace and add more useful tests
   */
  it("applies className correctly", () => {
    render(
      <FormControl
        data-testid={testId}
        id={testId}
        label="Form Control"
        className={baseClass}
      />
    );
    expect(screen.getByTestId(testId)).toHaveClass(baseClass);
  });
});
