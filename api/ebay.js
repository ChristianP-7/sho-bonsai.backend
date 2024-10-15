const axios = require("axios");
const cors = require("cors");
const express = require("express");

const app = express();

// Habilitar CORS para permitir solicitudes de cualquier dominio (ajustar si es necesario)
app.use(
  cors({
    origin: "*",
  })
);

// Ruta para obtener productos de eBay según la categoría
app.get("/api/products/:categoryId", async (req, res) => {
  const { categoryId } = req.params; // Extraemos el ID de la categoría desde la URL

  try {
    // Construir la URL de la API de eBay con el ID de categoría
    const ebayApiUrl = `https://api.ebay.com/buy/browse/v1/item_summary/search?category_ids=${categoryId}`;

    // Realizar la solicitud a la API de eBay
    const response = await axios.get(ebayApiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Enviar los resultados al frontend
    res.json(response.data);
  } catch (error) {
    console.error("Error al obtener productos de eBay:", error);
    res.status(500).json({ error: "No se pudo obtener productos de eBay." });
  }
});

// Configurar el servidor para pruebas locales
// if (require.main === module) {
//   const port = 3000; // Puedes cambiar el puerto si es necesario
//   app.listen(port, () => {
//     console.log(`Servidor corriendo en http://localhost:${port}`);
//   });
// }

// Exportar la función para que Vercel la utilice
module.exports = (req, res) => {
  return app(req, res);
};
