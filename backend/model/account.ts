import mongoose from 'mongoose';

const { Schema } = mongoose;

const AccountSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  provider: { type: String, required: true },
  providerAccountId: { type: String, required: true },
  refresh_token: { type: String },
  access_token: { type: String },
  expires_at: { type: Number },
  token_type: { type: String },
  scope: { type: String },
  id_token: { type: String },
  session_state: { type: String }
}, {
  timestamps: true
});

AccountSchema.index({ provider: 1, providerAccountId: 1 }, { unique: true });

export const Account = mongoose.model('Account', AccountSchema);
