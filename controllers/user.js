const User = require("../models/user");

async function handelGetAllUsers(req, res) {
  const allDbUsers = await User.find({});
  return res.json(allDbUsers);
}

async function handleGetUserById(req, res) {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  return res.json(user);
}

async function handelUpdateUserById(req,res) {
   await User.findByIdAndUpdate(req.params.id);
    return res.json({status:"done"});
}

async function handleDelteUserById(req, res) {
    await User.findByIdAndDelete(req.params.id);
    return res.json({status:"done"})
    
}

async function handleCreateNewUser(req,res) {
    const body = req.body;
            if (!body || !body.first_Name || !body.last_Name || !body.Email || !body.Gender || !body.job_Title) {
                return res.status(400).json({ msg: "All fields are required" });
            }
            const result = await User.create({
                firstName: body.first_Name,
                lastName: body.last_Name,
                email: body.Email,
                gender: body.Gender,
                jobTitle: body.job_Title
            });
            return res.status(201).json({ msg: "Success", id: result._id });
    
}

module.exports = {
  handelGetAllUsers,
  handleGetUserById,
  handelUpdateUserById,
  handleDelteUserById,
  handleCreateNewUser,
};
