
import { Schema, model} from 'mongoose';

const imageSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique:true,
  },
  url: {
    type: String,
    required: true,
    unique: true
  },
})

imageSchema.set("timestamps", true);

export const imageModel = model('Image', imageSchema);