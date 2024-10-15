const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const port = process.env.PORT || 3000; // Establece un puerto por defecto si no se encuentra el valor en las variables de entorno
const authorization = process.env.AUT;

// Habilitar CORS para todas las solicitudes
app.use(cors());

// Ruta para hacer peticiones a la API de eBay
app.get("/ebay-data", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.ebay.com/buy/browse/v1/item_summary/search?category_ids=181003",
      {
        headers: {
          Authorization: `Bearer ` + authorization,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    res
      .status(500)
      .json({
        error: "Error al obtener datos de eBay",
        details: error.message,
      });
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
