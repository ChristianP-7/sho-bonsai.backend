const axios = require("axios");

let accessToken = null;
let tokenExpiration = null;

async function getAccessToken() {
  if (!accessToken || Date.now() > tokenExpiration) {
    // Si no tenemos un token o si el token ha expirado, lo renovamos
    const tokenResponse = await axios.post(
      "https://api.ebay.com/identity/v1/oauth2/token",
      new URLSearchParams({
        grant_type: "client_credentials",
        scope: "https://api.ebay.com/identity/v1/oauth2/token",
      }),
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${process.env.EBAY_CLIENT_ID}:${process.env.EBAY_CLIENT_SECRET}`
          ).toString("base64")}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    accessToken = tokenResponse.data.access_token;
    const expiresIn = tokenResponse.data.expires_in; // Tiempo de expiración devuelto por eBay
    tokenExpiration = Date.now() + expiresIn * 1000; // Ajusta el tiempo de expiración en milisegundos
  }

  return accessToken;
}

module.exports = { getAccessToken };
