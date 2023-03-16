import * as stories from "./Button.stories";
import { composeStories } from "@storybook/testing-react";
import { render, screen } from "@testing-library/react";
import Button from "./Button";

const { Primary } = composeStories(stories);

describe("Button", () => {
  it("should render children", () => {
    const { getByRole } = render(<Primary />);
    getByRole("button", { name: "Click me" });
  });

  it("should set a custom CSS class", () => {
    const { getByRole } = render(
      <Button type="button" variant="primary" className="my-class">
        Click me
      </Button>
    );
    expect(getByRole("button", { name: "Click me" })).toHaveClass("my-class");
  });

  it("should apply the button type prop", () => {
    const { getByRole } = render(
      <Button type="submit" variant="primary">
        Click me
      </Button>
    );
    expect(getByRole("button", { name: "Click me" })).toHaveAttribute(
      "type",
      "submit"
    );
  });

  it("should apply the proper styles for a variant", () => {
    render(
      <Button type="button" variant="primary">
        Click me
      </Button>
    );
    expect(screen.getByRole("button", { name: "Click me" })).toHaveClass(
      "bg-blue-500 text-white"
    );
  });
});
