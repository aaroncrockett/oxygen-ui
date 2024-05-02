import { test, expect, mock } from "bun:test";
import { collectCustomUtilOverrides } from "./index";

const mockTheme = mock((type) => {
  if (type === "btn-h") {
    return {
      sm: "2rem",
      md: "3rem",
    };
  }
});

test("collectCustomUtilOverrides correctly collects custom util overrides", () => {
  // Calling the function with the mock theme
  const result = collectCustomUtilOverrides(mockTheme);

  // Assertions
  expect(result).toMatchObject({
    "btn-h-sm": "2rem",
    "btn-h-md": "3rem",
  });
});
