import {
  userLoginValidation,
  userRegisterValidation,
} from '../validators/validator.js'
import { userModel } from '../models/user.model.js'
import {
  hashPassword,
  generateToken,
  validatePassword,
} from '../utility/utilities.js'
// @api - api/auth/signup POST
// @desc - register user
export const registerUser = async (req, res) => {
  try {
    const { error } = userRegisterValidation.validate(req.body)
    if (error) {
      return res.status(400).json({
        status: false,
        message: error.message,
      })
    }
    const { name, email, password } = req.body
    const emailAlreadyExists = await userModel.findOne({ email })
    if (emailAlreadyExists) {
      return res.status(409).json({
        status: false,
        message: 'User Alreay Exists',
      })
    }
    const hashedPassword = await hashPassword(password)

    const user = new userModel({
      name,
      email,
      password: hashedPassword,
    })
    await user.save()
    if (user) {
      let token = await generateToken(user.id)

      res.status(201).json({
        status: true,
        content: {
          data: {
            id: user._id,
            name: user.name,
            email: user.email,
          },
          meta: {
            access_token: token,
          },
        },
      })
    }
  } catch (err) {
    return res.status(400).json({
      status: 'failure',
      message: err.message,
    })
  }
}

// @api - api/auth/signin POST
// @desc - login user
//@access - public
export const loginUser = async (req, res) => {
  try {
    const { error } = userLoginValidation.validate(req.body)
    if (error) {
      return res.status(400).json({
        status: false,
        message: error.message,
      })
    }
    const { email, password } = req.body
    const user = await userModel.findOne({ email })
    if (!user) {
      return res.status(404).json({
        status: false,
        message: 'User Not Found',
      })
    }
    const isPasswordCorrect = await validatePassword(password, user.password)
    if (!isPasswordCorrect) {
      return res.status(401).json({
        status: false,
        message: 'Invalid Credentials',
      })
    }
    if (user) {
      let token = await generateToken(user.id)
      res.status(201).json({
        status: true,
        content: {
          data: {
            id: user._id,
            name: user.name,
            email: user.email,
            created_at: user.createdAt,
          },
          meta: {
            access_token: token,
          },
        },
      })
    }
  } catch (err) {
    return res.status(400).json({
      status: 'failure',
      message: err.message,
    })
  }
}
