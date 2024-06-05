import mongoose from "mongoose";

// export const formatHashtags = (hashtags) =>
//     hashtags.split(",").map((word) => (word.trim().startsWith("#") ? word.trim() : `#${word.trim()}`));

const videoSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true, maxLength: 80 },
    description: { type: String, required: true, trim: true, minLength: 20 },
    fileUrl: { type: String },
    thumbUrl: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now },
    hashtags: [{ type: String, trim: true }],
    meta: {
        views: { type: Number, default: 0, required: true },
        rating: { type: Number, default: 0, required: true },
    },
    owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
});

// videoSchema.pre("save", async function () {
//     this.hashtags = this.hashtags[0].split(",").map((word) => (word.startsWith("#") ? word.trim() : `#${word.trim()}`));
// });
videoSchema.static("formatHashtags", function (hashtags) {
    return hashtags.split(",").map((word) => (word.trim().startsWith("#") ? word.trim() : `#${word.trim()}`));
});

const Video = mongoose.model("Video", videoSchema);
export default Video;
