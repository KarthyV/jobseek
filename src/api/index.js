import axios from "axios";

const URL = "https://jobseek-server.herokuapp.com";

export default axios.create({
  baseURL: URL,
});
