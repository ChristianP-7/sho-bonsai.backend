const express = require("express");
const router = express.Router();
const axios = require("axios");

// Proxy para imágenes
router.get("/api/proxy-image", async (req, res) => {
  const { imageUrl } = req.query;

  if (!imageUrl) {
    return res.status(400).send('El parámetro "imageUrl" es necesario.');
  }

  try {
    const imageResponse = await axios.get(imageUrl, {
      responseType: "arraybuffer",
    });
    const contentType = imageResponse.headers["content-type"];

    res.set("Content-Type", contentType);
    res.send(imageResponse.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener la imagen.");
  }
});

module.exports = router;
