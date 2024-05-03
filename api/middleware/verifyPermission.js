const Post = require("../models/post.js");

const verifyPermission = {
  verifyPostPermission: async (req, res, next) => {
    try {
      const postId = req.params.id;
      const userId = req.auth.payload.user_id;

      const post = await Post.findOne({
        where: { post_id: postId },
      });
      if (!post) {
        return res.status(404).send("Príspevok nebol nájdený");
      }

      if (
        post.author_id !== userId &&
        !req.auth.payload.permissions.includes("everything")
      ) {
        return res
          .status(403)
          .send("Nemáte oprávnenie upraviť tento príspevok");
      }

      req.post = post;
      next();
    } catch (error) {
      res.status(500).send("Interná chyba servera");
    }
  },
};

module.exports = verifyPermission;
