const config = require('./config');
const { bech32 } = require('bech32');

// Decodes callback url from LNURL and fetches paymentinfo from lnurlp
const decodeLNUrl = async (input) => {
  console.log('lnurl input : ', input);
  let paymentInfo = null;
  const userName = Object.keys(input)[0];
  const bech32lnurl = Object.values(input)[0];
  const decodedLNURL = bech32.decode(bech32lnurl, 1500);
  const url = Buffer.from(bech32.fromWords(decodedLNURL.words)).toString();
  const response = await fetch(url);
  const data = await response.json();
  data.metadata = await modifyMetadata(data.metadata, userName);
  paymentInfo = data;
  return paymentInfo;
};

// Adds identifier to metadata
const modifyMetadata = async (metadata, userName) => {
  const identifier = `,["text/identifier", "${userName}@${config.domain}"]]`;
  const newMetadata = metadata.slice(0, -1).concat(identifier);
  return newMetadata;
};

module.exports = decodeLNUrl;
