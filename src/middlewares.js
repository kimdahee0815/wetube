import multer from "multer";
import { S3Client } from "@aws-sdk/client-s3";
import multerS3 from "multer-s3";

const s3Client = new S3Client({
    region: "ap-northeast-2",
    credentials: {
        accessKeyId: process.env.AWS_KEY,
        secretAccessKey: process.env.AWS_SECRET,
    },
});

const s3Storage = multerS3({
    s3: s3Client,
    bucket: "wetube-fly-2024-update",
    acl: "public-read",
});

const s3AvatarStorage = multerS3({
    s3: s3Client,
    bucket: "wetube-fly-2024-update",
    acl: "public-read",
    key: function (req, file, cb) {
        cb(null, `avatars/${req.session.user._id}/${Date.now().toString()}`);
    },
});

const s3VideoStorage = multerS3({
    s3: s3Client,
    bucket: "wetube-fly-2024-update",
    acl: "public-read",
    key: function (req, file, cb) {
        cb(null, `videos/${req.session.user._id}/${Date.now().toString()}`);
    },
});

export const localsMiddleware = (req, res, next) => {
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    res.locals.siteName = "Wetube";
    res.locals.loggedInUser = req.session.user || {};
    // console.log(res.locals);
    next();
};

export const protectorMiddleware = (req, res, next) => {
    if (req.session.loggedIn) {
        next();
    } else {
        req.flash("error", "Log In First!");
        return res.redirect("/");
    }
};

export const publicOnlyMiddleware = (req, res, next) => {
    if (!req.session.loggedIn) {
        next();
    } else {
        req.flash("error", "Not Authorized");
        return res.redirect("/");
    }
};

export const avatarUpload = multer({ storage: s3AvatarStorage, limits: { fileSize: 3000000 } });

export const videoUpload = multer({ storage: s3VideoStorage, limits: { fileSize: 10000000 } });

export const removeFileUrl = async (url) =>
    await s3.send(
        new DeleteObjectCommand({
            Bucket: "Bucket-name",
            Key: decodeURIComponent(url.split(".amazonaws.com/").pop().toString()),
        })
    );
