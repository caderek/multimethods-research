export const not = (y) => (x) => x !== y
export const notIn = (...arr) => (x) => !arr.includes(x)
