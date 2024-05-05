import { createExtractUtils } from "../../helpers";

const sizes = {
  sm: { height: "height.8", padding: "padding.3" },
  default: { height: "height.9", padding: "padding.4" },
  lg: { height: "height.10", padding: "padding.8" },
};

export const createBtnUtils = (theme, userUtils = {}) => {
  const extractUtils = createExtractUtils(theme);
  let btnUtils = {};

  Object.keys(sizes).forEach((size) => {
    const sizeConfig = sizes[size];
    const heightValue = theme(sizeConfig.height);
    const paddingValue = theme(sizeConfig.padding);

    // USE THE EXTRACTION FUNCTION, PASS IN THE USER UTILS, THE CLASS WE ARE CONSTRUCTING, THE CSS PROP WE ARE USING AND THE DEFAULT VALUE.
    const newHeightUtils = extractUtils(
      userUtils,
      `.btn-h-${size}`,
      "height",
      heightValue
    );
    btnUtils = { ...btnUtils, ...newHeightUtils };

    const newPaddingUtils = extractUtils(
      userUtils,
      `.btn-p-${size}`,
      "padding",
      paddingValue
    );
    btnUtils = { ...btnUtils, ...newPaddingUtils };
  });

  return { ...btnUtils };
};
