export const areListEqual = (a, b) => {
  if (a.length !== b.length) {
    return false;
  }

  if (a.length === 0) {
    return true;
  }

  a.forEach((item, index) => {
    if (item.packageName !== b[index].packageName) {
      console.log('b');
      return false;
    }
  });

  return true;
};
