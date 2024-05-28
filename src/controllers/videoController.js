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
    console.log(video);

    if (video) {
        return res.render("watch", { pageTitle: `Watching: ${video.title}`, video });
    }
    return res.render("404", { pageTitle: "Video Not Found" });
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
    try {
        const { title, description, hashtags } = req.body;
        await Video.create({
            title,
            description,
            hashtags: hashtags.split(",").map((word) => `#${word}`),
        });
        return res.redirect("/");
    } catch (error) {
        console.log(error);
        return res.render("upload", { pageTitle: "Upload Video", errorMessage: error._message });
    }
};
