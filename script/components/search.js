const searchBar = document.getElementById("search__input");
searchBar.addEventListener("input", function () {
  if (searchBar.value.length >= 3) {
    const saisie = searchBar.value;
    console.log(saisie);
  }
});
