/**
 * Required External Modules and Interfaces
 */

const express = require("express");
const { WordList } = require("../Models/listModel");
const { checkJwt } = require("../authz/check-jwt");
/**
 * Router Definition
 */

const ListRouter = express.Router();

/**
 * Controller Definitions
 */

// GET messages/

ListRouter.post("/saves", checkJwt, async (req, res) => {
  try {
    const { email } = req.body;
    const existList = await WordList.findOne({ email: email });
    res.status(200).send({ success: true, words: existList.words });
  } catch (err) {
    res.send({
      success: false,
      message: "No words exist",
    });
  }
});

ListRouter.post("/save-word", checkJwt, async (req, res) => {
  try {
    const { email, word } = req.body;
    let existList = await WordList.findOne({ email: email });

    if (existList) {
      if (!existList.words.includes(word)) {
        existList.words = [word, ...existList.words];
        await existList.save();
      } else {
        res.status(200).send({
          success: false,
          message: "Word Already Exist",
        });
      }
    } else {
      let newUser = await WordList.create({
        words: [word],
        email: email,
      });
    }
    res.status(200).send({
      success: true,
      message: "Saved!",
    });
  } catch (err) {
    res.status(400).send({
      success: false,
      message: "Error,Try again!",
    });
  }
});

ListRouter.post("/delete-word", checkJwt, async (req, res) => {
  try {
    const { email, word } = req.body;
    let existList = await WordList.findOne({ email: email });

    if (existList) {
      if (existList.words.includes(word)) {
        existList.words = existList.words.filter((item) => item !== word);
        await existList.save();
        res.send({
          success: true,
          words: existList.words,
        });
      } else {
        res.send({
          success: false,
          message: "Word Not Exist",
        });
      }
    }
    res.send({
      success: true,
      message: "Deleted!",
    });
  } catch (err) {
    res.status(400).send({
      success: false,
      message: "Error,Try again!",
    });
  }
});

module.exports = {
  ListRouter,
};
