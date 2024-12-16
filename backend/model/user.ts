import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: { type: String },
  email: { type: String, unique: true, required: true },
  emailVerified: { type: Date },
  image: { type: String },
}, {
  timestamps: true
});

export const User = mongoose.model('User', UserSchema);
