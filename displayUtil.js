export const HSLToHex = (h, s, l) => {
  /* 
  Converts HSL color values to hex color codes
  src: https://css-tricks.com/converting-color-spaces-in-javascript/ 
  Args: h (number) - hue: degree on the color wheel from 0 to 360. 0 is red, 120 is green, 240 is blue.
        s (number) - saturation: 0 means a shade of gray and 100 is the full color.
        l (number) - lightness: 0% is black, 100% is white.
  Return: (str) - hex color code 
  */

  s /= 100;
  l /= 100;

  let c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
    m = l - c / 2,
    r = 0,
    g = 0,
    b = 0;

  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }
  // Having obtained RGB, convert channels to hex
  r = Math.round((r + m) * 255).toString(16);
  g = Math.round((g + m) * 255).toString(16);
  b = Math.round((b + m) * 255).toString(16);

  // Prepend 0s, if necessary
  if (r.length == 1) r = "0" + r;
  if (g.length == 1) g = "0" + g;
  if (b.length == 1) b = "0" + b;

  return "#" + r + g + b;
};

export generateColors = (startColor = "teal", index = 0, hueRotateValue = 40, lightnessOptions = []) => {
    // generates colors along the rainbow wheel using the HSL color system
    // from a starting color and given an increasing index value to keep changing color 
    // what color to start generating from based on the color wheel
    const colorStartHueValues = {
      red: 0,
      orange: 20,
      yellow: 50,
      green: 100,
      teal: 160,
      aqua: 180,
      blue: 200,
      royalBlue: 230,
      purple: 265,
      pink: 290,
    };
    // possible shades of colors per hue
    const lightnessValues = lightnessOptions.length ? 
      lightnessOptions : [20, 45, 70];

    // how colorful to make a color
    const saturation = 95;
    const numberOfLightnessOptions = lightnessValues.length;
    // get one of the values from the lightness values in a cycle
    const lightnessOptionIndex = index % numberOfLightnessOptions;
    const lightness = lightnessValues[lightnessOptionIndex];
    // hue rotate val is how much to jump in the hue each time the huge changes
    // only move the color hue after we've gone through all lightness variations
    const hueColorRotation =
      Math.floor(index / numberOfLightnessOptions) * hueRotateValue;
    const hue = colorStartHueValues[startColor] + hueColorRotation;

    // convert to a hex color code string
    return HSLToHex(hue, saturation, lightness);
 }

export const convertRemToPixels = (
  rem = 0,
  conversionFactor = 16,
  dynamic = false
) => {
  // multiplies the rem integer by the conversion factor, typically 16px font size
  if (dynamic) {
    return (
      rem * parseFloat(getComputedStyle(document.documentElement).fontSize)
    );
  }
  return rem * conversionFactor;
};

export const convertPixelsToRem = (
  px = 0,
  conversionFactor = 16,
  dynamic = false
) => {
  // multiplies the rem integer by the conversion factor, typically 16px font size
  if (dynamic) {
    return px / parseFloat(getComputedStyle(document.documentElement).fontSize);
  }
  return px / conversionFactor;
};

export const makeStylesFromItems = ({
  items = [],
  selectorFormatter = () => {},
  style = "",
}) => {
  // change the items into selector strings using the template callback
  const toCSSSelectors = (currentItem) => {
    return selectorFormatter(currentItem);
  };
  const selectorItems = items.map(toCSSSelectors);
  const selectorsCSS = selectorItems.join(", ");

  // output the selectors with the defined css style declarations
  return items.length ? `${selectorsCSS} { ${style} }` : "";
};

export const addCustomStyleElementToHead = (cssTextContent = "") => {
  // adds a custom style tag to the head if it doesnt exist with the
  // passed css text content or updates the existing one if existing
  const customStyleElementId = "custom-util-style";
  const existingCustomStyleElement = document.getElementById(
    customStyleElementId
  );
  if (existingCustomStyleElement) {
    existingCustomStyleElement.textContent = cssTextContent;
  } else {
    const styleElement = document.createElement("style");
    styleElement.id = customStyleElementId;
    styleElement.textContent = cssTextContent;
    document.head.append(styleElement);
  }
};

export const observeResize = (element = {}, callback = () => {}) => {
  // uses resize observer to check for resize happening in efficient manner
  const myObserver = new ResizeObserver((entries) => {
    entries.forEach(({ contentRect, borderBoxSize }) => {
      callback({
        contentRect,
        borderBoxSize,
      });
    });
  });

  myObserver.observe(element);

  return myObserver;
};
