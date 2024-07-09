const UserModel = require("../database/userModel");
const { v4: uuid } = require("uuid");

// Create
// const signupHandler = async (req, res) => {
//   const { name, age, address, email, password } = req.body;
//   try {
//     const newUser = new UserModel({ name, age, address, email, password });
//     await newUser.save();
//     res.status(201).send(newUser);
//   } catch (error) {
//     res.status(404).send(error);
//   }
// };

const signupHandler = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const newUser = new UserModel({ username, email, password });
    await newUser.save();
    res.status(201).send(newUser);
  } catch (error) {
    res.status(404).send(error);
  }
};

const loginHandler = async (req, res) => {
  const { email, password } = req.body;
  try {
    const newUser = await UserModel.findOne({ email });
    if (newUser) {
      if (newUser.password == password) {
        res.status(201).send({
          message: "Login successfull",
          status: true,
          data: {
            // username: newUser.name,
            // userId: newUser.userId,
            // age: newUser.age,
            // address: newUser.address,
            username:newUser.username,
            email:newUser.email
          },
        });
      } else {
        res.status(401).send({
          message: "Invalid password",
          status: false,
        });
      }
    } else {
      res.status(401).send({
        message: "Invalid email-password",
        status: false,
      });
    }
  } catch (error) {
    res.status(404).send(error);
  }
};

// Read all users
const readUserById1 = async (req, res) => {
  const userId = req.query.userId;
  try {
    const users = await UserModel.findOne({ userId });
    if (users) {
      res.status(200).send(users);
    } else {
      res.status(400).send({
        message: "No user found",
        status: fail,
      });
    }
  } catch (error) {
    throw error;
  }
};

// Read user by ID
const readUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await UserModel.findOne({ id });
    if (user) {
      res.status(200).send({
        message: "Successfully read",
        status: true,
        data: user,
      });
    } else {
      res.status(400).send({
        message: "Something went wrong",
        status: false,
        data: {},
      });
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

// Read user by name
const readUserByName = async (req, res) => {
  const { name } = req.query;
  try {
    const user = await UserModel.findOne({ name });

    if (user) {
      res.status(200).send({
        message: "Successfully read",
        status: true,
        data: user,
      });
    } else {
      res.status(400).send({
        message: "Something went wrong",
        status: false,
        data: {},
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Update user
const updateUser = async (req, res) => {
  const { name: currentname } = req.query;
  const { name: updatedname } = req.body;
  console.log(currentname, updatedname);
  const options = {
    new: true,
  };
  try {
    const updatedUser = await UserModel.findOneAndUpdate(
      { name: currentname },
      { name: updatedname },
      options
    );
    console.log(updatedUser, "updateduser");
    if (updatedUser) {
      res.status(200).send({
        message: "Successfully updated",
        status: true,
        data: updatedUser,
      });
    } else {
      res.status(400).send({
        message: "No user found",
        status: fail,
      });
    }
    //updatedUser.name = updatedname;
    // if (age) updatedUser.age = age;
    // if (address) updatedUser.address = address;

    // Save the updated user
    //await updatedUser.save();
  } catch (error) {
    throw error;
  }
};

// Delete user
const deleteUser = async (req, res) => {
  const { name } = req.query;
  const { name: deletedname } = req.body;
  try {
    const deletedUser = await UserModel.findOneAndDelete(
      { name },
      { name: deletedname }
    );
    if (deletedUser) {
      res.status(200).send({
        message: "Successfully deleted",
        status: true,
        data: deletedUser,
      });
    } else {
      res.status(400).send({
        message: "No user found",
        status: fail,
      });
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  signupHandler,
  loginHandler,
  readUserById1,
  readUserById,
  readUserByName,
  updateUser,
  deleteUser,
};
