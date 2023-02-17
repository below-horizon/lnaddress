const { bech32 } = require('bech32');

// Decodes callback url from LNURL and fetches paymentinfo from lnurlp
const decodeLNUrl = async (user) => {
  let paymentInfo = null;
  const bech32lnurl = user.lnurl;
  const decodedLNURL = bech32.decode(bech32lnurl, 1500);
  const url = Buffer.from(bech32.fromWords(decodedLNURL.words)).toString();
  const response = await fetch(url);
  const data = await response.json();
  paymentInfo = data;
  return paymentInfo;
};

module.exports = decodeLNUrl;
