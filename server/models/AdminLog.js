import mongoose from "mongoose";
const { Schema } = mongoose;

const adminLogSchema = new Schema({
  admin: { type: Schema.Types.ObjectId, ref: "User", required: true },
  action: {
    type: String,
    enum: ["create", "update", "delete", "status_change"],
    required: true,
  },
  entityType: {
    type: String,
    enum: ["Artwork", "Workshop", "GypsumOrder", "Registration"],
    required: true,
  },

  // Polymorphic reference: refPath tells Mongoose to look at the
  // entityType field on THIS document to decide which collection
  // entityId points into. The enum values above ("Artwork", "Workshop",
  // "GypsumOrder", "Registration") must exactly match the model names
  // registered in mongoose.model(...) for those collections.

  entityId: {
    type: Schema.Types.ObjectId,
    required: true,
    refPath: "entityType",
  },
  description: { type: String },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model("AdminLog", adminLogSchema);