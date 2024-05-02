// btn.js

const sizes = ["sm", "default", "lg"];

const generateBtnTokens = (btnUtils) => {
  const btnTokens = {};

  sizes.forEach((size) => {
    btnTokens[`.btn-token-${size}`] = {
      height: btnUtils[`.btn-h-${size}`]?.height,
      paddingLeft: btnUtils[`.btn-p-${size}`]?.padding,
      paddingRight: btnUtils[`.btn-p-${size}`]?.padding,
    };
  });

  return btnTokens;
};

export { generateBtnTokens };
