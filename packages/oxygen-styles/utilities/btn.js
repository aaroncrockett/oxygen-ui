const sizes = {
  sm: { height: "height.8", padding: "padding.3" },
  default: { height: "height.9", padding: "padding.4" },
  lg: { height: "height.10", padding: "padding.8" },
};

export const createBtnUtils = (theme) => {
  const btnUtils = {};

  Object.keys(sizes).forEach((size) => {
    const sizeConfig = sizes[size];
    const heightValue = theme(sizeConfig.height);
    const paddingValue = theme(sizeConfig.padding);

    btnUtils[`.btn-h-${size}`] = {
      height: heightValue,
    };
    btnUtils[`.btn-p-${size}`] = {
      padding: paddingValue,
    };
  });

  return { ...btnUtils };
};
