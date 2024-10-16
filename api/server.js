const express = require("express");
const cors = require("cors"); // Importar el paquete cors
const { getAccessToken } = require("./auth");
const axios = require("axios");
const app = express();
const port = process.env.PORT || 3000;

// Habilitar CORS para todas las solicitudes
app.use(
  cors({
    origin: "https://sho-bonsai.vercel.app",
    methods: ["GET", "POST"], // Opcional: Limita los métodos HTTP permitidos
    credentials: true, // Si necesitas que se envíen cookies o autenticación en las solicitudes
  })
);

app.get("/api/products/:categoryId", async (req, res) => {
  try {
    const { categoryId } = req.params;
    const token = await getAccessToken();

    const ebayResponse = await axios.get(
      `https://api.ebay.com/buy/browse/v1/item_summary/search?category_ids=${categoryId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json(ebayResponse.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener los datos de eBay");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
