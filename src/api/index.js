import axios from "axios";

// const URL = "https://tolemy-task.herokuapp.com";

const URL = "http://localhost:8000";

export default axios.create({
  baseURL: URL,
});
