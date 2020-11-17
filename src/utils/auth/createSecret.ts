import { v4 as uuidv4 } from "uuid";

const createRandomToken = () => {
  const secret = uuidv4();
  return secret;
};

export default createRandomToken;
