export { getTwColors } from "./scripts";
import { generateBtnTokens } from "./components/btn.js";
import { createBtnUtils } from "./utilities/btn.js";

// const components = { ...btnTokens };

const customUtils = ["btn-h"];

// @ts-ignore
function collectCustomUtilOverrides(theme) {
  const collectedUtils: Record<string, string> = {};

  customUtils.forEach((value) => {
    if (theme(value)) {
      const utils = theme(value);
      Object.keys(utils).forEach((key) => {
        const newKey = `${value}-${key}`;
        collectedUtils[newKey] = utils[key];
      });
    }
  });
}

// @ts-ignore
const pluginCb = ({ addComponents, addUtilities, theme }) => {
  const btnUtils = createBtnUtils(theme);
  const btnComponents = generateBtnTokens(btnUtils);

  collectCustomUtilOverrides(theme);

  const components = { ...btnComponents };

  addUtilities(utils, theme);
  addComponents(components);
};

export { pluginCb };
