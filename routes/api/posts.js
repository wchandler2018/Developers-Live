const express = require("express");
const router = express.Router();

//route api/posts/test  GET request
//test posts route
//@access Public
router.get("/test", (req, res) => res.json({msg: "Posts are the SHIT!!!"})
);

module.exports = router;