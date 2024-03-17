import { userModel } from "../models/user.model.js";
import { imageValidation } from "../validators/validator.js";
import { imageModel } from "../models/image.model.js";
import cloudinary from "cloudinary"

// @api - api/:id/image GET
// @desc -  get images of  user
//@access - protected
export const getUserImages = async (req,res) => {
  try {
    const _id = req.params.id;
    const user = await userModel.findOne({ _id}).populate("images_upload").select("-password");
    if (!user) {
      return res.status(404).json({
        "status": false,
        "message": "User Not Found"
      })
    }

    return res.status(200).json({
      "status": true,
      "content": {
        "data": user,

      }
    })


  } catch (error) {
    return res.status(400).json({
      status: 'failure',
      message: error.message,
    })
  }

}

// @api - api/:id/image POST
// @desc -  upload images of  user
//@access - protected
export const uploadImages = async (req,res) => {
  try {
    const { error } = imageValidation.validate(req.body)
    if (error) {
      return res.status(400).json({
        status: false,
        message: error.message,
      })
    }
    const _id= req.params.id;
    const userExists = await userModel.findOne({_id})
    if (!userExists) {
      return res.status(409).json({
        status: false,
        message: 'User Not Exists',
      })
    }
    const {name,url} = req.body;

    const newImage = new imageModel({
      name,
      url
    })

    await newImage.save()
    if (newImage) {
      await userModel.findByIdAndUpdate(userExists._id,
        { "$push": { images_upload:newImage._id} },
        { "new": true, "upsert": true },
      );
  
      res.status(201).json({
        status: true,
        content: {
          data: {
            id: newImage._id,
            name: newImage.name,
            url: newImage.url,
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