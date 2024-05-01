// @ts-nocheck
import { expect, test } from "bun:test";
import { getTwColors } from "./index";

const colorPrefixes = [
  "primary",
  "secondary",
  "tertiary",
  "error",
  "warning",
  "neutral",
];

const colorSuffixes = [
  "-50",
  "-100",
  "-200",
  "-300",
  "-400",
  "-600",
  "-700",
  "-800",
  "-900",
  "-950",
];

const result = getTwColors();

test("getTwColors returns a non-empty object", () => {
  expect(result).toBeInstanceOf(Object);
  expect(Object.keys(result)).not.toHaveLength(0);
});

test("getTwColors returns the correct color keys", () => {
  colorPrefixes.forEach((prefix) => {
    expect(Object.keys(result).some((key) => key.startsWith(prefix))).toBe(
      true
    );
  });
});

test("getTwColors returns the correct color suffixes", () => {
  colorSuffixes.forEach((suffix) => {
    expect(Object.keys(result).some((key) => key.endsWith(suffix))).toBe(true);
  });
});

test("getTwColors returns keys that end with the prefixes, because the middle value does not include -500", () => {
  colorPrefixes.forEach((prefix) => {
    expect(Object.keys(result).some((key) => key.endsWith(prefix))).toBe(true);
  });
});
