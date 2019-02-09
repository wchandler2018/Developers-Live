const express = require("express");
const router = express.Router();

//route api/profile/test GET request
//test profile route
//@access Public
router.get("/test", (req, res) => res.json({msg: "Profiles are the SHIT!!!"})
);

module.exports = router;