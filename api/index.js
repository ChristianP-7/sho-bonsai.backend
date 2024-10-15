const axios = require("axios");

module.exports = async (req, res) => {
  try {
    const authorization = process.env.AUT; // Usar la variable de entorno AUT

    const response = await axios.get(
      "https://api.ebay.com/buy/browse/v1/item_summary/search?category_ids=181003",
      {
        headers: {
          Authorization: `Bearer ${authorization}`,
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener datos de eBay.",
      details: error.message,
    });
  }
};
