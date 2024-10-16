const express = require("express");
const cors = require("cors"); // Importar el paquete cors
const { getAccessToken } = require("./auth");
const axios = require("axios");
const app = express();
const imageProxyRoutes = require("./routes/imageProxyRoutes");

const port = process.env.PORT || 3000;

const allowedOrigin = process.env.ALLOWED_ORIGINS || "http://localhost:3000";

app.use(
  cors({
    origin: allowedOrigin,
    methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"], // Opcional: Limita los métodos HTTP permitidos
    credentials: true, // Si necesitas que se envíen cookies o autenticación en las solicitudes
  })
);

app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "img-src 'self' https://i.ebayimg.com;" // Permitir imágenes desde eBay
  );
  next();
});

app.use(imageProxyRoutes); // Aquí se agregan las rutas del manejo de imagenes

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
