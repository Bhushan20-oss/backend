const express =require("express");
const {handelGetAllUsers, handleGetUserById, handelUpdateUserById, handleDelteUserById, handleCreateNewUser}= require('../controllers/user')
const router = express.Router();

router.route("/")
.post(handleCreateNewUser)
.get(handelGetAllUsers);

router.route("/:id")
.get(handleGetUserById)
.patch(handelUpdateUserById)
.delete(handleDelteUserById)

module.exports= router;