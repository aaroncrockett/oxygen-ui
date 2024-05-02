import { createExtractUtils } from "./index";

test("createExtractUtils correctly extracts utility with default value", () => {
  // Define a simple theme function returning the value as is
  const theme = (value) => value;

  // Define userUtils and className
  const userUtils = {};
  const className = ".btn-h-sm";

  // Call the createExtractUtils function with the theme
  const extractUtil = createExtractUtils(theme);

  // Extract the utility
  const result = extractUtil(userUtils, className, "height", "height.8");

  // Assertions
  expect(result).toEqual({
    [className]: { height: "height.8" },
  });
});
