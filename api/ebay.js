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
        Authorization:
          "Bearer v^1.1#i^1#f^0#p^1#r^0#I^3#t^H4sIAAAAAAAAAOVYbYwTRRhur70Dwh0YNEJOTMpyRoLZ7exu2+tuaJPeZ8vHtUd7eODHOd2dXpdrd5vdWe4KGI4zOQWUoAkoUQj6hwSUQPyIiR9EiAExGARiOAIxGhMxFzGgCBIg7rbl6J0EkGtiE/unmXfeeed5nnnfmdkB/VWT5g4GBy/XWCdU7OgH/RVWKz0ZTKqqfGKKraK20gKKHKw7+uv67QO2c/M0mE5l+MVIyyiyhhx96ZSs8Tmjj9BVmVegJmm8DNNI47HARwOLFvIMBfiMqmBFUFKEI9TkIyBLCxAkIOsVEl7orTes8s2YMcVHCBxkvCKKix4vJ7CIM/o1TUchWcNQxj6CAYyLpAFJu2MMwzMs72IpF80tIxxLkKpJimy4UIDw5+DyubFqEdY7Q4WahlRsBCH8oUBLNBwINTW3xeY5i2L5CzpEMcS6NrrVqIjIsQSmdHTnabScNx/VBQFpGuH052cYHZQP3ARzH/BzUrtQPXAhCCAjIgQSrpJI2aKoaYjvjMO0SCKZyLnySMYSzt5NUUON+HIk4EKrzQgRanKYf+06TEkJCak+orkhsDQQiRD+xqQqaViCZDSpxI3UgWRkcRPJeUQRgLgISOCmaU5IgMJE+WgFmcfM1KjIomSKpjnaFNyADNRorDZ0kTaGU1gOq4EENhGN+HliABQ0ZLzeZeai5ldRx0nZXFeUNoRw5Jp3X4GR0RirUlzHaCTC2I6cREZZZTKSSIztzOViIX36NB+RxDjDO529vb1UL0spareTAYB2di5aGBWSKA0Jw9es9by/dPcBpJSjIiBjpCbxOJsxsPQZuWoAkLsJvxu4vYAp6D4aln+s9R+GIs7O0RVRqgpxA0S7IEfXAxrVcyXZa/yFHHWaMFAcZsk0VHsQzqSggEjBSDM9jVRJ5Fl3gmG9CUSKHi5BurhEgoy7RQ9JJ4xiRSgeFzjv/6lO7jXTo0hQES5JqpcszZ10cikGy/tEvGBBQ5Zjkg26umil3u7GMdf87khLKLWwM9LUujIY6/bdazHclnxjSjKUiRnzl1+tBxUNI3Fc9KKCkkERJSUJ2fJaYFYVI1DF2ShKpQzDuEgGMplQabbqktH7l9vE/fEu3RH1Hx1Pt2WlmSlbXqzM8ZoRAGYkyjyBKEFJOxWz1qFx+zDNXTnU4+ItGRfXsmJtkMyzlcT8jZNSTLqUtkKgVKQpumpctqmweQGLKT1INs4zrCqpFFKX0OOu53RaxzCeQuVW2CVIcAmW2WFL1zMcYGnAsOPiJeSO0q5y25JKshXbW+7vVu0c/Y3vt+R+9ID1ABiwfl5htYJ54DF6NphVZeuw26prNQkjSoIJSpO6ZePTVUVUD8pmoKRWPGi5+M7mYGNtc3jL3FWx7LE3D1mqi54YdjwDZow8Mkyy0ZOLXhzAzFs9lfTU6TWMiwa0m2EY1sUuA7Nv9drph+0PHeTgntdr+m0dV7df+ZA8sPP4xT/2gJoRJ6u10mIfsFpaJ75WPWFd5JNzF7bMGNzWd2yX5cbpNTNjh79a8WP71pZDaU/gT6Jj47Se415rbey3vdZqe+VTK9Y6hk+8f8jKvf2R2vLtiaHzzinrZ7V2Xrp+41eBXz3n2OCG9d+cfu/ay2G8/Cd22sUz+784csXfunN/5HqbW5+2jn3js/kbzp/q2nTm8ad3+oau7D3Iv1v33Ae2sx/TK1cH1hwY2jT81wvEceHal5c3f1flq+7cTT17dutA7QNNJ4NHM4Oha6/sHriwZv2RyPW1Xb94vt5Xf7jzpU+ffNW1tn3o5wVTtzMv8qfq3hL2EcOhvXXb9O9PrQrsmzjnkebpwSrP78/3XOoI76I3nvzhaKPn0avDwfxa/g3sLwPg/BEAAA==",
      },
    });

    // Enviar los resultados al frontend
    res.json(response.data);
  } catch (error) {
    console.error("Error al obtener productos de eBay:", error);
    res.status(500).json({ error: "No se pudo obtener productos de eBay" });
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
