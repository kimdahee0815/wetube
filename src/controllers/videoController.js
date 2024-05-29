import Video from "../models/Video";

export const home = async (req, res) => {
    try {
        const videos = await Video.find({}).sort({ createdAt: "desc" });
        return res.render("home", { pageTitle: "Home", videos });
    } catch (err) {
        return res.render("server-error");
    }
};

export const watch = async (req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);

    if (!video) {
        return res.render("404", { pageTitle: "Video Not Found" });
    }
    return res.render("watch", { pageTitle: `Watching: ${video.title}`, video });
};

export const getEdit = async (req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);

    if (!video) {
        return res.render("404", { pageTitle: "Video Not Found" });
    }
    return res.render("edit", { pageTitle: `Editing: ${video.title}`, video });
};

export const postEdit = async (req, res) => {
    const { id } = req.params;
    const video = await Video.exists({ _id: id });
    const { title, description, hashtags } = req.body;
    if (!video) {
        return res.status(404).render("404", { pageTitle: "Video Not Found" });
    }
    await Video.findByIdAndUpdate(id, {
        title,
        description,
        hashtags: Video.formatHashtags(hashtags),
    });
    // video.title = title;
    // video.description = description;
    // video.hashtags = hashtags.split(",").map((word) => (word.startsWith("#") ? word.trim() : `#${word.trim()}`));
    // await video.save();
    return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
    return res.render("upload", { pageTitle: `Uploading A Video` });
};

export const postUpload = async (req, res) => {
    //here we will add a video to videos array
    try {
        const { title, description, hashtags } = req.body;
        await Video.create({
            title,
            description,
            hashtags: Video.formatHashtags(hashtags),
        });
        return res.redirect("/");
    } catch (error) {
        console.log(error);
        return res.status(400).render("upload", { pageTitle: "Upload Video", errorMessage: error._message });
    }
};

export const deleteVideo = async (req, res) => {
    const { id } = req.params;
    //delete the video
    const removedVid = await Video.findByIdAndDelete(id);
    console.log(removedVid);
    return res.redirect("/");
};

export const search = async (req, res) => {
    console.log(req.query);
    const { keyword } = req.query;
    let videos = [];
    if (keyword) {
        videos = await Video.find({
            title: {
                $regex: new RegExp(`${keyword}`, "i"),
            },
        });
    }
    return res.render("search", { pageTitle: "Search!", videos });
};
