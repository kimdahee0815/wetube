export const getJoin = (req, res) => res.render("join", { pageTitle: "Create Account" });

export const postJoin = (req, res) => {
    console.log(req.body);
    return res.end();
};

export const edit = (req, res) => res.send("Edit User");

export const remove = (req, res) => res.send("Remove User");

export const login = (req, res) => res.send("Log In");

export const logout = (req, res) => res.send("Log Out");

export const see = (req, res) => res.send("See User");
