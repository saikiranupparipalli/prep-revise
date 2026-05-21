import mongoose from "mongoose";
import globaldDto from "../../common/config/dto/dto.js";
import { required, string } from "joi";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 14,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    maxlength: 12,
    unique: true,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    minlength: 8,
    maxlength: 14,
    required: true,
  },
  role: {
    type: String,
    enum: ["customer, seller"],
    default: "customer",
  },
  isverified: {
    type: Boolean,
    select: false,
  },

  verificationToken: { type: String, select: false },
  refreshToken:{type:String, select:false }
});

export default mongoose.model("User", userSchema)