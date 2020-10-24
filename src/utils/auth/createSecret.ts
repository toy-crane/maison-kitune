import cryptoRandomString from "crypto-random-string";

const createRandomToken = (length: number = 10) => {
  const secret = cryptoRandomString({ length, type: "url-safe" });
  return secret;
};

export default createRandomToken;
