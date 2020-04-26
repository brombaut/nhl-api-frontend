const lightenDarkenColor = function(colorCode: string, amount: number): string {
  let usePound = false;

  if (colorCode[0] == "#") {
    colorCode = colorCode.slice(1);
    usePound = true;
  }
  const num = parseInt(colorCode, 16);

  let r = (num >> 16) + amount;

  if (r > 255) {
    r = 255;
  } else if (r < 0) {
    r = 0;
  }

  let b = ((num >> 8) & 0x00ff) + amount;

  if (b > 255) {
    b = 255;
  } else if (b < 0) {
    b = 0;
  }

  let g = (num & 0x0000ff) + amount;

  if (g > 255) {
    g = 255; // eslint-disable-next-line
  }
  // const resultCode: string = (g | (b << 8) | (r << 16)).toString(16);
  let rResultCode = r.toString(16);
  if (rResultCode.length === 1) {
    rResultCode = `0${rResultCode}`;
  }
  let bResultCode = b.toString(16);
  if (bResultCode.length === 1) {
    bResultCode = `0${bResultCode}`;
  }
  let gResultCode = g.toString(16);
  if (gResultCode.length === 1) {
    gResultCode = `0${gResultCode}`;
  }
  const newResultCode = `${rResultCode}${bResultCode}${gResultCode}`;
  return (usePound ? "#" : "") + newResultCode;
};

// eslint-disable-next-line
const colorIsBright = function(color: any): boolean {
  // Variables for red, green, blue values
  let r, g, b;

  // Check the format of the color, HEX or RGB?
  if (color.match(/^rgb/)) {
    // If HEX --> store the red, green, blue values in separate variables
    color = color.match(
      /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/
    );
    r = color[1];
    g = color[2];
    b = color[3];
  } else {
    // If RGB --> Convert it to HEX: http://gist.github.com/983661
    color = +("0x" + color.slice(1).replace(color.length < 5 && /./g, "$&$&"));
    r = color >> 16;
    g = (color >> 8) & 255;
    b = color & 255;
  }

  // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
  const hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));

  // Using the HSP value, determine whether the color is light or dark
  if (hsp > 127.5) {
    return true;
  }
  return false;
};

export default {
  lightenDarkenColor,
  colorIsBright
};
