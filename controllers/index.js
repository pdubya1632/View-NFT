const router = require("express").Router();
const homeRoutes = require("./home-routes");
const commentRoutes = require("./api/comment-routes");
const userRoutes = require("./api/user-routes");
const galleryRoutes = require("./api/gallery-routes");
const nftRoutes = require("./api/nft-routes");
//set up the route useage
router.use("/", homeRoutes);
router.use("/api/comments", commentRoutes);
router.use("/api/users", userRoutes);
router.use("/api/galleries", galleryRoutes);
router.use("/api/nfts", nftRoutes);
module.exports = router;
