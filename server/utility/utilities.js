import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cloudinary from "cloudinary";
// @description - to hash and secure password
export const hashPassword = async (password) => {
  try {
    let saltRounds = 10
    let hash = await bcrypt.genSalt(saltRounds)
    let hashedPassword = await bcrypt.hash(password, hash)
    return hashedPassword
  } catch (e) {
    console.log(e)
  }
}
// @description - to generate token for authorization
export const generateToken = async (id) => {
  const token = jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: '2h',
  })

  return token
}

export const validatePassword = async (password, userPassword) => {
  try {
    let isPasswordCorrect = await bcrypt.compare(password, userPassword)

    return isPasswordCorrect ? true : false
  } catch (error) {
    console.log(error)
  }
}



