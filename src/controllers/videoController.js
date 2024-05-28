import Video from "../models/Video";

export const home = async (req, res) => {
    try {
        const videos = await Video.find({});
        return res.render("home", { pageTitle: "Home", videos });
    } catch (err) {
        return res.render("server-error");
    }
};

export const watch = (req, res) => {
    const { id } = req.params;
    return res.render("watch", { pageTitle: `Watching: ${video.title}` });
};

export const getEdit = (req, res) => {
    const { id } = req.params;
    res.render("edit", { pageTitle: `Editing: ${video.title}` });
};

export const postEdit = (req, res) => {
    console.log(req.params);
    console.log(req.body);
    const { id } = req.params;
    const { title } = req.body;
    return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
    return res.render("upload", { pageTitle: `Uploading A Video` });
};

export const postUpload = async (req, res) => {
    //here we will add a video to videos array
    console.log(req.body);
    const { title, description, hashtags } = req.body;
    const video = new Video({
        title,
        description,
        createdAt: Date.now(),
        meta: {
            views: 0,
            rating: 0,
        },
        hashtags: hashtags.split(",").map((word) => `#${word}`),
    });
    const dbVideo = await video.save();
    console.log(dbVideo);
    return res.redirect("/");
};
