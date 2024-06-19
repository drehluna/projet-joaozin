const formlogin = document.getElementById("form");
console.log(formlogin);

formlogin.addEventListener("submit", function (event) {
  event.preventDefault();

  const formData = new FormData(formlogin);

  const data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });

  axios
    .post("http://localhost:8001/users/login", data)
    .then((response) => {
      alert("login efetuado com sucesso!");
      document.cookie = `authorization=${response.data.token}; path=/`;
      axios.defaults.headers.common["Authorization"] = `${
        document.cookie.match(/authorization=([^;]*)/)[1]
      }`;
      axios.get("http://localhost:8001/me");
    })
    .catch((error) => {
      alert(error.response.data.error);
    });
});
