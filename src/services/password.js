const CHAR_SET = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

/**
 * Generate a random password
 * @param {Number}    length   The length of the password
 * @param {String}    chars    String containing the character possibilities
 * @return {String}            A random password with the length of supplied
 */
export const generatePassword = (length = 20, chars = CHAR_SET) => {
  const max = chars.length
  return [...Array(length)]
    .map(v => chars.charAt(getRandomInteger(max)))
    .join('')
}

/**
 * Generate a random integer
 * @param {Number}    max     The maximum possible integer to generate (inclusive)
 * @return {Number}           An integer between 0 and max
 */
export const getRandomInteger = (max) => {
  const cryptoObject = window.crypto || window.msCrypto

  if (!cryptoObject) {
    return Math.random() * max
  }

  const array = new Uint32Array(1)

  do {
    cryptoObject.getRandomValues(array)
  } while (array[0] - array[0] % max > 4294967296 - max)

  return array[0] % max
}
