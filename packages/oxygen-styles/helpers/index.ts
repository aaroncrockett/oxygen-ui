// MOVE TO HELPERS OR UTILS
export const createExtractUtils =
  (theme) => (optUtils, className, cssKey, value) => {
    const utils = {};
    utils[className] = {
      [cssKey]: optUtils[className]
        ? optUtils[className].startsWith(cssKey + ".")
          ? theme(optUtils[className])
          : optUtils[className]
        : value,
    };
    return utils;
  };
