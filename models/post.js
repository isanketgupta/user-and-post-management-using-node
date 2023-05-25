const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    Body: {
      type: String,
      required: true
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    location: {
        latitude: {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
        longitude: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    active: Boolean,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', postSchema);