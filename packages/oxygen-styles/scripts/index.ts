import { colorNames, stops, type Stop } from "../settings/global";
import type { ContrastColorMapRecord } from "../types";

type ColorPropType = "color" | "background" | "background-alpha";
type DictionaryType<T> = { [key: string]: T };

const COLOR_PROP_PREFIX = "--color-";
const ALPHA_VAL_POSTFIX = " / <alpha-value>";

export type StrategyType =
  | "color"
  | "color-stop"
  | "color_rgb"
  | "color_rgb/alpha"
  | "color-stop_rgb/alpha"
  | "color-stop_rgb"
  | "color-token_rgb"
  | "color-stop-token_rgb";

type GenerateCssPropValue = (
  type: StrategyType, // The strategy type, which determines the format of the CSS property value. IE: var(--color-primary), var(--bg-primary-400), etc.
  name: string, // The name of the color. IE: primary, secondary, etc.
  mod?: string // optional modifier. 100, 200, etc.
) => string;

// createGenerateCssValues is called bellow. It is exported for testing purposes.
// createGenerateCssValues sets up generateCssValues with functions it depends on, and the stop options it depends on.
// See more detailed comments on createGenerateCssValues and generateCssValues in the sibling README.md file.
export const createGenerateCssValues = (
  generateCssPropValue: Function,
  createGenerateCssPropKeyValuePair: Function,
  stops: ReadonlyArray<Stop>
) => {
  const generateCssPropKeyValuePair =
    createGenerateCssPropKeyValuePair(generateCssPropValue);

  // Func: generateCssValues
  return function <T>(
    // Object to collect all the return values. If none is passed in, create one as a default.
    dictionary: DictionaryType<T> = {},
    // Array of values we are collecting.
    collection: string[] = [],
    // A color map used to determine the contrast color for accessible text on a given background color. There should be function to create contrastColorsMap in helpers.
    contrastColorsMap?: ContrastColorMapRecord
  ) {
    // Create background alpha object with classes as keys and css props as values. Uses generateCssPropKeyValuePair. This will be used to create colors for tailwind plugin.
    const generateDictionaryToken = (colorName: string) => {
      dictionary.tokenBackgrounds![`.${colorName}-token`] = {
        ...generateCssPropKeyValuePair("background-color", colorName),
        ...generateCssPropKeyValuePair("color", colorName),
      };

      return (stop: string, contrastKey: number) => {
        dictionary.tokenBackgrounds![
          `.${colorName}-${stop}-${stops[contrastKey]}-token`
        ] = {
          ...generateCssPropKeyValuePair("background-color", colorName, stop),
          ...generateCssPropKeyValuePair("color", colorName, stop),
        };

        dictionary.tokenBackgrounds![
          `.dark .${colorName}-${stop}-${stops[contrastKey]}-token`
        ] = {
          ...generateCssPropKeyValuePair(
            "background-color",
            colorName,
            stops[contrastKey]
          ),
          ...generateCssPropKeyValuePair(
            "color",
            colorName,
            stops[contrastKey]
          ),
        };
      };
    };

    // Creates classes for TW equipped with alpha values. Uses generateCssPropKeyValuePair. This can base used to create colors for the tailwind plugin.
    const genBgsWAlpha = (colorName: string) => {
      dictionary[colorName] = generateCssPropValue(
        "color_rgb/alpha",
        colorName
      );
      return (stop: string) => {
        dictionary[`${colorName}-${stop}`] = generateCssPropValue(
          "color-stop_rgb/alpha",
          colorName,
          stop
        );
      };
    };

    // Creates an array of text colors for a given background color.
    // Used to create CSS Variables to add to :root. These vars will be used within TW components.
    const genTextOnWCb = (colorName: string) => {
      if (collection && contrastColorsMap) {
        const textColorVal = contrastColorsMap[`${colorName}`];

        if (textColorVal) {
          const colorProp = generateCssPropValue("color_rgb", colorName);

          collection.push(`--text-on-${colorName}: ${textColorVal}`);
        }
      }

      return (stop: string) => {
        if (collection && contrastColorsMap) {
          const textColorVal = contrastColorsMap[`${colorName}`];

          if (textColorVal) {
            const colorProp = generateCssPropValue(
              "color-stop_rgb",
              colorName,
              stop
            );
            collection.push(`--text-on-${colorName}-${stop}: ${textColorVal}`);
          }
        }
      };
    };

    // Calls generateDictionaryToken to create background alpha object.
    const genTokensWCb = (colorName: string) => {
      return generateDictionaryToken(colorName);
    };

    // used to get the created dictionary and collections created and used within loop.
    const getDictionary = () =>
      Object.keys(dictionary).length > 0 ? dictionary : null;
    const getCollection = () => (collection.length > 0 ? collection : null);
    return {
      genBgsWAlpha,
      genTextOnWCb,
      genTokensWCb,
      getCollection,
      getDictionary,
    };
  };
};

export const createGenerateCssPropKeyValuePair =
  (generateCssPropValue: GenerateCssPropValue) =>
  (type: ColorPropType, name: string, wStop = "") => {
    const prop = type === "color" ? "color" : "background-color";
    const id = wStop ? "color-stop_rgb" : "color_rgb";
    createGenerateCssPropKeyValuePair;

    // Func: generateCssPropKeyValuePair
    return { [prop]: generateCssPropValue(id, name, wStop) };
  };

// Generates a dynamic CSS property value string based on the provided parameters.
export const generateCssPropValue: GenerateCssPropValue = (
  id: StrategyType,
  name: string,
  mod?: string
) => {
  const result = (() => {
    if (id === "color") return `var(${COLOR_PROP_PREFIX}${name})`;

    if (id === "color-stop") return `var(${COLOR_PROP_PREFIX}${name}-${mod})`;

    if (id === "color_rgb") return `rgb(var(${COLOR_PROP_PREFIX}${name}))`;

    if (id === "color_rgb/alpha")
      return `rgb(var(${COLOR_PROP_PREFIX}${name}) ${ALPHA_VAL_POSTFIX})`;

    if (id === "color-stop_rgb/alpha")
      return `rgb(var(${COLOR_PROP_PREFIX}${name}-${mod}) ${ALPHA_VAL_POSTFIX})`;

    if (id === "color-stop_rgb")
      return `rgb(var(${COLOR_PROP_PREFIX}${name}-${mod}))`;

    return "";
  })();

  if (result === "") console.error("missing props");

  return result;
};

export const generateCssValues = createGenerateCssValues(
  generateCssPropValue,
  createGenerateCssPropKeyValuePair,
  stops
);

// Use this function to call within Tailwind config to get colors.
export const getTwColors = () => {
  // All Token Background, Text, Border Colors
  //   const twColors: any = {}

  const { genBgsWAlpha, getDictionary } = generateCssValues();

  colorNames.forEach((colorName: string) => {
    const bgsWAlphaForStops = genBgsWAlpha(colorName);
    stops.forEach((stop) => {
      bgsWAlphaForStops(stop);
    });
  });

  const results = getDictionary();

  if (results === null) console.error("Results is null");

  return results;
};

export function example() {
  return "example";
}
