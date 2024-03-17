
import { Schema, model} from 'mongoose';
// import mongoose from 'mongoose';


const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  images_upload:[{ type: Schema.Types.ObjectId, ref: 'Image' }]
})

userSchema.set("timestamps", true);

export const userModel = model('User', userSchema);