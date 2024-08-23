import axios from "axios";

export default axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: "93a5f52692ba4e83aeaab1cd6fd33e7b",
  },
});
