const CHAR_SET = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789^!$$%&/()=?*+~#,;.:-_'

export const generatePassword = (length = 20) => {
  return [...Array(length)]
    .map(v => CHAR_SET.charAt(Math.random() * CHAR_SET.length))
    .join('')
}
