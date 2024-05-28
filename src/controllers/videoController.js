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

export const see = (req, res) => res.render("watch", { pageTitle: "Watch" });

export const edit = (req, res) => res.render("edit", { pageTitle: "Edit" });

export const search = (req, res) => res.send("Search Video");

export const upload = (req, res) => res.send("Upload A Video");

export const deleteVideo = (req, res) => {
    console.log(req.params);
    return res.send("Delete A Video");
};
