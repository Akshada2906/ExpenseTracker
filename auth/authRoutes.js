const express = require("express");
const router = express.Router();
const userControllers = require("../auth/authController");

// Define your routes
router.post("/signup", userControllers.signupHandler);//new user created
router.post("/login",userControllers.loginHandler) //for login the user ,where we read the data from dATabse
router.get("/read", userControllers.readUserById1);//by query
router.get("/readbyId/:id", userControllers.readUserById);//by params
router.get("/find", userControllers.readUserByName); 
router.put("/update", userControllers.updateUser);
router.delete("/delete", userControllers.deleteUser);

module.exports = router;
