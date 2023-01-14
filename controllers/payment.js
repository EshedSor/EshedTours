const Cart = require("../models/cart");
const CLIENT_ID =
  "AXu5wZ9Q8_8KEnoCnGI_dH8wfFyKWMN53naUEXOYqwPZfyw1fLpPZg8vV5B2SfUbQRcK7gWJW32a2EAt";
const APP_SECRET =
  "EIQAe8KBlbBxX03feSik__azAOPwrmr4GCNiCkLJ_JB6hDtFHkpWjJm3nauuGSdtpXdkwYluEkoxiY40";
const base = "https://api-m.sandbox.paypal.com";

async function generateAccessToken() {
  const response = await fetch(base + "/v1/oauth2/token", {
    method: "post",
    body: "grant_type=client_credentials",
    headers: {
      Authorization:
        "Basic " + Buffer.from(CLIENT_ID + ":" + APP_SECRET).toString("base64"),
    },
  });
  const data = await response.json();
  return data.access_token;
}

module.exports.createOrder = async (total) => {
  const accessToken = await generateAccessToken();
  const url = `${base}/v2/checkout/orders`;
  const response = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: total,
          },
        },
      ],
    }),
  });
  const data = await response.json();
  console.log(data);
  return data;
};
module.exports.capturePayment = async (orderId) => {
  const accessToken = await generateAccessToken();
  const url = `${base}/v2/checkout/orders/${orderId}/capture`;
  const response = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const data = await response.json();
  console.log(data);
  return data;
};
