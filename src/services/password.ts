const CHAR_SET = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

/**
 * Generate a random integer
 */
export const getRandomInteger = (max: number): number => {
  if (!window.crypto) {
    return Math.floor(Math.random() * max)
  }
  const array = new Uint32Array(1)
  do {
    window.crypto.getRandomValues(array)
  } while (array[0] - array[0] % max > 4294967296 - max)
  return array[0] % max
}

/**
 * Generate a random password
 */
export const generatePassword = (length: number = 20, chars: string = CHAR_SET): string => {
  const max = chars.length
  return '_'.repeat(length)
    .split('')
    .map(v => chars.charAt(getRandomInteger(max))).join('')
}
