const { User, Thought } = require('../models');
const { ObjectId } = require('mongoose').Types;

module.exports = {
  async allUsers(req, res) {
    try {
      const users = await User.find();
      
      if (!users) {
          res.status(500).json({ message: "No users found" });
      };
      
      res.status(200).json({ users });
    }
    catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },

  async usersById(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userID });
      
      if (!user) {
          return res.status(500).json({ message: "No users found with specified ID." });
      };

      res.status(200).json({ user });
    }
    catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },

  async createUser (req, res) {
      try {
          const newUser = await User.create(req.body);
          res.json({ newUser });
      }
      catch (error) {
          console.log(error);
          return res.status(500).json(error);
      }
    },

  async updateUser (req, res) {
    try {
      const user = await User.findOneAndUpdate(
          { _id: req.params.userID },
          { username: req.body.username },
          { new: true });

      if (!user) {
          return res.status(500).json({ message: "No users found with specified ID." });
      }

      res.status(200).json({ user });
    }
    catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },

  async deleteUser (req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userID });
      
      if (!user) {
          return res.status(500).json({ message: "Could not delete user." });
      }

      const thoughts = await Thought.deleteMany({
          _id: {$in: user.thoughts}
      });

      const userDeleted = await User.findOneAndDelete({_id: req.params.userID});

      res.status(200).json({message: "User has been deleted."})
    }
    catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },

  async addFriend (req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userID });
      const friend = await User.findOne({ _id: req.params.friendID });

      if (!user || !friend) {
          return res.status(500).json({ message: "No user found with ID." })
      };

      const updatedUser = await User.findOneAndUpdate(
          { _id: req.params.userID },
          { $addToSet: { friends: req.params.friendID } },
          { new: true }
      );

      const updatedFriend = await User.findOneAndUpdate(
          { _id: req.params.friendID },
          { $addToSet: { friends: req.params.userID } },
          { new: true }
      );

      if (!updatedUser || !updatedFriend) {
          return res.status(500).json({message: "Could not update list"})
      }
      res.status(200).json({ message: `${updatedFriend.username} has been added as a friend.` });
    }
    catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
  
  async removeFriend({ params }, res) {
    try {
      const user = await User.findOneAndUpdate(
          { _id: req.params.userID },
          { $pull: { friends: req.params.friendID } },
          { new: true }
      );

      const friend = await User.findOneAndUpdate(
          { _id: req.params.friendID },
          { $pull: { friends: req.params.userID } },
          { new: true }
      );

      if (!user || !friend) {
          return res.status(500).json({message: "Unable to locate user."})
      };

      res.json({message: `${friend.username} has been removed.`});
    }
    catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
};
