const express = require("express");
const router = express.Router();

//route api/users/test GET request
//test users route
//@access Public
router.get("/test", (req, res) => res.json({msg: "Users are the SHIT!!!"})
);

module.exports = router;

