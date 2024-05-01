import { expect, test } from "bun:test";
import { example } from "./index";

test("example test", () => {
  expect(example()).toBe("example");
});
