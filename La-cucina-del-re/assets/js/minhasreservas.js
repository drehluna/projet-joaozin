axios.defaults.headers.common["Authorization"] = `${
  document.cookie.match(/authorization=([^;]*)/)[1]
}`;

axios
  .get("http://localhost:8001/me")
  .then((response) => {
    if (response.status === 200) {
      // mantém a página
    } else {
      window.location.href = "login.html";
    }
  })
  .catch((error) => {
    window.location.href = "login.html";
  });
