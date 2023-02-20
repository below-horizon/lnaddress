const { bech32 } = require('bech32');
const { curly } = require('node-libcurl');

// Decodes callback url from LNURL and fetches paymentinfo from lnurlp
const decodeLNUrl = async (user) => {
  let paymentInfo = null;
  const bech32lnurl = user.lnurl;
  const decodedLNURL = bech32.decode(bech32lnurl, 1500);
  const url = Buffer.from(bech32.fromWords(decodedLNURL.words)).toString();
  try {
    const { data } = await curly.get(url, { FOLLOWLOCATION: true });
    try {
      paymentInfo = JSON.parse(data);
    } catch {
      paymentInfo = data;
    }
  } catch (err) {
    console.log(err);
  }
  return paymentInfo;
};

module.exports = decodeLNUrl;
