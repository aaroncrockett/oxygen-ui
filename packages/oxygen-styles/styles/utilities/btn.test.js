import { test, expect } from "bun:test";
import { createBtnUtils } from "./btn";

test("createBtnUtils correctly generates button utilities with default values", () => {
  // Define a simple theme function returning the value as is
  const theme = (value) => value;

  // Call the createBtnUtils function with the theme
  const result = createBtnUtils(theme);

  // Assertions
  expect(result).toMatchObject({
    ".btn-h-sm": { height: "height.8" },
    ".btn-p-sm": { padding: "padding.3" },
    ".btn-h-default": { height: "height.9" },
    ".btn-p-default": { padding: "padding.4" },
    ".btn-h-lg": { height: "height.10" },
    ".btn-p-lg": { padding: "padding.8" },
  });
});

test("createBtnUtils correctly generates button utilities with user overrides", () => {
  // Define a theme function returning the value as is
  const theme = (value) => value;

  // User overrides for btn-h-sm and btn-p-sm
  const userUtilsWithOverrides = {
    ".btn-h-sm": "5rem",
    ".btn-p-sm": "1rem",
  };

  // Call the createBtnUtils function with the theme and user overrides
  const result = createBtnUtils(theme, userUtilsWithOverrides);

  // Assertions
  expect(result).toMatchObject({
    ".btn-h-sm": { height: "5rem" },
    ".btn-p-sm": { padding: "1rem" },
    ".btn-h-default": { height: "height.9" },
    ".btn-p-default": { padding: "padding.4" },
    ".btn-h-lg": { height: "height.10" },
    ".btn-p-lg": { padding: "padding.8" },
  });
});

test("createBtnUtils correctly generates button utilities with user overrides", () => {
  // Define a theme function returning the value as is
  const theme = (value) => value;

  // User overrides for btn-h-sm and btn-p-sm
  const userUtilsWithOverrides = {
    ".btn-h-sm": "5rem",
    ".btn-p-sm": "1rem",
  };

  // Call the createBtnUtils function with the theme and user overrides
  const result = createBtnUtils(theme, userUtilsWithOverrides);

  // Assertions
  expect(result).toMatchObject({
    ".btn-h-sm": { height: "5rem" }, // Expecting btn-h-sm to have user override value
    ".btn-p-sm": { padding: "1rem" }, // Expecting btn-p-sm to have user override value
    ".btn-h-default": { height: "height.9" }, // Expecting other values to remain unchanged
    ".btn-p-default": { padding: "padding.4" }, // Expecting other values to remain unchanged
    ".btn-h-lg": { height: "height.10" }, // Expecting other values to remain unchanged
    ".btn-p-lg": { padding: "padding.8" }, // Expecting other values to remain unchanged
  });
});

// MOVE TO HELPERS OR UTILS TEST.
