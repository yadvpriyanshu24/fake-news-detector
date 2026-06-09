const express = require("express");
const router = express.Router();

const detectFakeNews = require("../utils/detectFakeNews");

router.post("/analyze", (req, res) => {
  const { headline, article } = req.body;

  if (!headline || !article) {
    return res.status(400).json({
      message: "Please provide headline and article"
    });
  }

  const result = detectFakeNews(headline, article);

  res.json(result);
});

module.exports = router;