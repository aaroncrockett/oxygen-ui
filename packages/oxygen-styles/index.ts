export { getTwColors } from "./scripts";
import { generateBtnTokens } from "./styles/components/btn.js";
import { createBtnUtils } from "./styles/utilities/btn.js";

// const components = { ...btnTokens };

// @ts-ignore
export const collectCustomUtilOverrides = (theme) => {
  const CUSTOM_UTIL_TYPES = ["btn-h", "btn-p"] as const;

  const newUtilColl: Record<string, string> = {};

  CUSTOM_UTIL_TYPES.forEach((utilType) => {
    if (theme(utilType)) {
      const utils = theme(utilType);

      Object.keys(utils).forEach((key) => {
        const newKey = `${utilType}-${key}`;
        newUtilColl[newKey] = utils[key];
      });
    }
  });

  return newUtilColl;
};

// @ts-ignore
const pluginCb = ({ addComponents, addUtilities, theme }) => {
  const userUtils = collectCustomUtilOverrides(theme);
  const btnUtils = createBtnUtils(theme, userUtils);
  const btnComponents = generateBtnTokens(btnUtils);

  const components = { ...btnComponents };
  const utils = { ...btnUtils };

  addUtilities(utils, theme);
  addComponents(components);
};

export { pluginCb };
