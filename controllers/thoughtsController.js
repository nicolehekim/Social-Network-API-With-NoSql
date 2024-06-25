const { Thoughts, Users, Reactions } = require('../models');
const { Types } = require('mongoose');

const thoughtsController = {
  // Get all thoughts
  async allThoughts(req, res) {
    try {
      const thoughts = await Thoughts.find()
      .populate('thoughts');
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a thought
  async thoughtsById(req, res) {
    try {
      const thoughts = await Thoughts.findOne({ _id: req.params.thoughtsId })
      .populate('thoughts');

      if (!thoughts) {
        return res.status(404).json({ message: 'No thoughts with that ID' });
      } else {

      res.json(thought)};
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a thought
  async createThoughts(req, res) {
    try {
      const thoughts = await Thoughts.create(req.body);
      res.json(thoughts);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Delete a thought
  async deleteThoughts(req, res) {
    try {
      const thoughts = await Thoughts.findOneAndDelete({ _id: req.params.thoughtsId });

      if (!thoughts) {
        return res.status(404).json({ message: 'No thought with that ID' });
      } else {
        res.json({ message: 'Thought deleted!' });
        res.json(thoughts);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update a thought
  async updateThoughts (req, res) {
    try {
      const thoughts = await Thoughts.findOneAndUpdate(
        { _id: req.params.thoughtsId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thoughts) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a reaction
  async createReactions(req, res) {
    try {
      const thoughts = await Thoughts.findOneAndUpdate(
        { _id: req.params.thoughtsId},
        { $addToSet: {reactions: req.body} },
        { runValidators: true, new: true }
      );

      thoughts ? res.json(thoughts) : res.status(404).json({message: 'Unable to create reaction.'});

    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
// Delete a reaction
  async deleteReactions(req, res) {
    try {
      const thoughts = await Thoughts.findOneAndUpdate(
        { _id: req.params.thoughtsId},
        { $pull: {reactions: {reactionsId: req.params.reactionsId}} },
        { runValidators: true, new: true }
      );

      thoughts ? res.json(thoughts) : res.status(404).json({message: 'Unable to delete reaction.'});
      
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
}

module.exports = thoughtsController;
