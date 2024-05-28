import Video from "../models/Video";

export const home = async (req, res) => {
    try {
        const videos = await Video.find({});
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
        return res.render("404", { pageTitle: "Video Not Found" });
    }
    await Video.findByIdAndUpdate(id, {
        title,
        description,
        hashtags,
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
            hashtags,
        });
        return res.redirect("/");
    } catch (error) {
        console.log(error);
        return res.render("upload", { pageTitle: "Upload Video", errorMessage: error._message });
    }
};
