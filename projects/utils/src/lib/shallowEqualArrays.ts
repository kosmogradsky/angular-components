export const shallowEqualArrays = <T extends any[]>(arrA: T, arrB: T) => {
  if (arrA === arrB) {
    return true;
  }

  const len = arrA.length;

  if (arrB.length !== len) {
    return false;
  }

  for (let i = 0; i < len; i++) {
    if (arrA[i] !== arrB[i]) {
      return false;
    }
  }

  return true;
};
