# Script

## How to use the script

Sets up generateCssColor with functions it depends on, and the stop options it depends on.

generateCssColor will generate objects which contain the parts to create CSS variables and CSS classes based on a themes colors. Used for Tailwind plugin. Can also to be used to create variables for background-colors, text-colors, dynamic color contrast token classes and text on background colors.

Call it to create and return the functions. Then use the appropriate function while looping over the projects colors. It will generate the values from the project colors.

Example:
const {colorsToGenWCb} = generateCssColor()
// while looping over colors ->
const cb = colorsToGenWCb(colorName)
// in a nested loop of color stops
cb(stop)
