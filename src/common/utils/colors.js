export const getHSLByPercent = percent => {
  const hue0 = 120;
  const hue1 = 0;
  const hue = percent * (hue1 - hue0) + hue0;

  return `hsl(${hue}, 66%, 47%)`;
};

export default getHSLByPercent;
