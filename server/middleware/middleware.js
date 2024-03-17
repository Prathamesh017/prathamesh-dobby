import jwt from 'jsonwebtoken'


const verifyToken = (req, res, next) => {
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]

    if (!token) {
      return res
        .status(401)
        .json({ message: 'A token is required for authentication' })
    }
    try {
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
      req.user = decoded

      next()
    } catch (err) {
      return res.status(401).json({ message: 'No Authorization' })
    }
  } else {
    return res.status(401).json({ message: 'No Authorization, No Token' })
  }
}
export default verifyToken
