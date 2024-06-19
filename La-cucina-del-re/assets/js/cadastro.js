const formCadastro = document.getElementById("form-cadastro");
console.log(formCadastro);

const testme = document.getElementById("testme1");
console.log(testme);

testme.addEventListener("click", function () {
  axios.defaults.headers.common["Authorization"] = `${
    document.cookie.match(/authorization=([^;]*)/)[1]
  }`;
  axios.get("http://localhost:8001/me").then((response) => {
    console.log(response.data);
  });
});

formCadastro.addEventListener("submit", function (event) {
  event.preventDefault();

  console.log(event);
  const formData = new FormData(formCadastro);

  const data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });

  axios
    .post("http://localhost:8001/users", data)
    .then((response) => {
      console.log(response.data);
      alert("Cadastrado com sucesso!");
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
