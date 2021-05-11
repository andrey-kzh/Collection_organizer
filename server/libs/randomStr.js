const randomStr = (len) => {
  let str = '';
  while (str.length < len) str += Math.random().toString(36).substr(2, len - str.length);
  return str;
};
module.exports = { randomStr };
