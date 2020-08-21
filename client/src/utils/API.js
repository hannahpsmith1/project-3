import axios from "axios";

export default {
  signup: function(name, email, password) {
    return axios.post("/api/users/signup", { name, email, password });
  },
  login: function(email, password) {
    return axios.post("/api/users/login", { email, password });
  },
  logout: function() {
    return axios.get("/api/users/logout");
  },
};