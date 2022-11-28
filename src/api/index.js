import axios from "axios";

const URL = "https://jobseek-server.vercel.app";

// const URL = "http://localhost:8000";

export default axios.create({
  baseURL: URL,
});
