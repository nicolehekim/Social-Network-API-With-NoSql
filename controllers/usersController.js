const { Users } = require('../models');

const usersController = {
  allUsers(req, res) {
    Users.find({})
      .then(userData => res.json(userData))
      .catch(err => res.status(400).json(err));
  },

  usersById(req, res) {
    Users.findById(req.params.usersId)
      .then(userData => res.json(userData))
      .catch(err => res.status(400).json(err));
  },

  createUsers (req, res) {
    Users.create(req.body)
      .then(userData => res.json(userData))
      .catch(err => res.status(400).json(err));
  },

  updateUsers (req, res) {
    Users.findOneAndUpdate(req.params.id, req.body, {new:true})
      .then(userData => {
        if (!userData) {
          return res.status(404).json({ message: 'No user with that ID.' });
        }
        res.json(userData);
      })
      .catch(err => res.status(400).json(err));
  },

  deleteUsers (req, res) {
    Users.findOneAndDelete(req.params.id)
      .then(userData => {
        if (!userData) {
          return res.status(404).json({ message: 'No user with that ID.' });
        }
        res.json({ message: 'User hs been deleted.' });
      })
      .catch(err => res.status(400).json(err));
  },

  addFriends (req, res) {
    Users.findOneAndUpdate(
      {_id: req.params.usersId},
      {$addToSet: { friends: req.body.friendsId || req.params.friendsId }},
      {new: true}
    )
    .then(userData => {
      if (!userData) {
        return res.status(404).json({ message: 'No user with that ID.' })
      }
      res.json(userData);
    })
    .catch(err => res.status(400).json(err));
  },
  
  removeFriends({ params }, res) {
    Users.findOneAndUpdate(
      {_id: params.usersId },
      { $pull: { friends: params.friendsId }},
      { new: true }
    )
    .then((dbUserData) => {
      if (!dbUserData) {
        return res.status(404).json({ message: 'No user with that ID.' });
      }
      const removed = !dbUserData.friends.includes(params.friendsId);

      if (removed) {
        res.json({ message: 'Removed friend.', dbUserData });
      } else {
        res.json(dbUserData);
      }
    })
    .catch((err) => res.status(400).json(err));
  },
};

module.exports = usersController;