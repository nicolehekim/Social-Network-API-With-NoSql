const { Thought } = require('../models');
const { ObjectId } = require('mongoose').Types;

module.exports = {
  // Get all thoughts
  async allThoughts(req, res) {
    try {
        const thoughts = await Thought.find();
        
        res.status(200).json({ thoughts });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
  },
  // Get a thought
  async thoughtsById(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtID });
      
      if (!thought) {
          res.status(500).json({ message: "No thought with specified ID." })
      }
      
      res.status(200).json({ thought });
    }
    catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
  // Create a thought
  async createThoughts(req, res) {
    try {
       const newThought = await Thought.create(req.body);
       
       res.status(200).json({ newThought });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
  },
  // Delete a thought
  async deleteThoughts(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtID });
      
      if (!thought) {
          return res.status(500).json({ message: "No thought with specified ID." })
      }
      
      res.status(200).json({ message: "Thought has been deleted." });
    }
    catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
  // Update a thought
  async updateThoughts (req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
          { _id: req.params.thoughtID },
          { thoughtText: req.body.thoughtText },
          { new: true }
      );
      
      if (!thought) {
          return res.status(500).json({ message: "No thought with specified ID." })
      };
      
      res.status(200).json({ thought });
    }

    catch (error) {
      console.log(error);
      return res.status(500).json(error);
    };
  },
  // Create a reaction
  async createReactions(req, res) {
    try {
      const newReaction = {
          reactionBody: req.body.reactionBody,
          username: req.body.username
      };
      
      const thought = await Thought.findOneAndUpdate(
          { _id: req.params.thoughtID },
          { $addToSet: { reactions: newReaction } },
          { new: true }
      );
      
      if (!thought) {
          return res.status(500).json({ message: "No thought with specified ID." })
      }
      
      res.status(200).json(thought);
    }
    catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
// Delete a reaction
  async deleteReactions(req, res) {
    try {
      const thought = await Thought.findOne({_id: req.params.thoughtID});
      thought.reactions.pull({reactionID: req.params.reactionID})
      thought.save();
      
      if (!thought) {
          return res.status(500).json({ message: "No thought with specified ID." })
      }
      res.status(200).json(thought);
    }
    catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  } 
}
