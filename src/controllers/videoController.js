const videos = [
    {
        title: "First Video",
        rating: 4,
        comments: 2,
        createdAt: "2 mnutes ago",
        views: 59,
        id: 1,
    },
    {
        title: "Second Video",
        rating: 4,
        comments: 2,
        createdAt: "2 mnutes ago",
        views: 59,
        id: 2,
    },
    {
        title: "Third Video",
        rating: 4,
        comments: 2,
        createdAt: "2 mnutes ago",
        views: 59,
        id: 3,
    },
];

export const trending = (req, res) => {
    return res.render("home", { pageTitle: "Home", videos });
};

export const watch = (req, res) => {
    const { id } = req.params;
    const video = videos[id - 1];
    return res.render("watch", { pageTitle: `Watching: ${video.title}`, id, video });
};

export const getEdit = (req, res) => {
    const { id } = req.params;
    const video = videos[id - 1];
    res.render("edit", { pageTitle: `Editing: ${video.title}`, video });
};

export const postEdit = (req, res) => {
    console.log(req.params);
    console.log(req.body);
    const { id } = req.params;
    const { title } = req.body;
    const video = videos[id - 1];
    video.title = title;
    return res.redirect(`/videos/${id}`);
};
