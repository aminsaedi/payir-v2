const axios = require("axios");

/**
 * Pay.ir Node.js Module
 * @module Pay.ir
 * @author Amin saedi <amin.di.sam[at]gmail.com>
 * @copyright Pay.ir 2017
 * @version 1.0.0
 * @license Apache-2.0
 */

/** Pay.ir Class */
class Payir {
  /**
   * Get the API Key
   * @param {string} api Your gateway API Key.
   * @throws Will throw an error if the API isn't string.
   */
  constructor(api) {
    if (api != "" && typeof api === "string") {
      this.api = api;
      this.sendEndPoint = "https://pay.ir/pg/send";
      this.verifyEndPoint = "https://pay.ir/pg/verify";
      this.gateway = "https://pay.ir/pg/";
    } else
      throw new Error(
        "You should pass your Pay.ir API Key to the constructor."
      );
  }

  /**
   * Build and prepare transaction URL
   * @param {number} amount Transaction's Amount
   * @param {string} callbackURL User will redirect to this URL to check transaction status
   * @param {object} options other options for paymnet (e.g. mobile, factorNumber, description)
   * @throws Will throw an error if URL building isn't successfull.
   */
  send(amount, callbackURL, options) {
    return new Promise((resolve, reject) => {
      if (typeof amount !== "number" || amount <= 10000)
        reject({
          message:
            "Transaction's amount must be a number and equal/greater than 10000",
        });
      else if (typeof callbackURL !== "string" || callbackURL.length < 5)
        reject({ message: "Callback (redirect) URL must be a string." });
      else if (callbackURL.slice(0, 4) != "http")
        reject({ message: "Callback URL must start with http/https" });
      axios
        .post(this.sendEndPoint, {
          api: this.api,
          amount,
          redirect: callbackURL,
          ...options,
        })
        .then((data) => {
          {
            resolve({
              ...data.data,
              gatewayUrl: `https://pay.ir/pg/${data.data.token}`,
            });
          }
        })
        .catch((e) => {
          reject(e.response.data);
        });
    });
  }

  /**
   *
   * @param {string} status result status code of payment
   * @param {string} token token of your payment
   */
  verify(status, token) {
    return new Promise((resolve, reject) => {
      if (status !== "1") reject({ message: "status code is not equal to 1" });
      axios
        .post(this.verifyEndPoint, { api: this.api, token })
        .then((r) => resolve(r.data))
        .catch((e) => reject(e.response?.data));
    });
  }
}

module.exports = Payir;
