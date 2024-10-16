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

    res.setHeader(
      "Access-Control-Allow-Origin",
      "Access-Control-Allow-Referer",
      "*"
    ); // Permite todas las solicitudes
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader(
      "Content-Security-Policy",
      "default-src 'self'; img-src 'self' https://i.ebayimg.com;"
    );

    res.set("Content-Type", contentType);
    res.send(imageResponse.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener la imagen.");
  }
});

module.exports = router;
