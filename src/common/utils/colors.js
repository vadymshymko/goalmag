export const getHashFromText = str => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {//eslint-disable-line
    hash = str.charCodeAt(i) + ((hash << 5) - hash);//eslint-disable-line
  }
  return hash;
};

export const getRGBByNumber = num => {
  const c = (num & 0x00ffffff).toString(16).toUpperCase();//eslint-disable-line

  return '00000'.substring(0, 6 - c.length) + c;
};

export const getColorByText = text => getRGBByNumber(getHashFromText(text));
