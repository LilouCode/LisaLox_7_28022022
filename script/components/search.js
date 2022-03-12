import { recipes } from "../data/recipes.js";
import { createCard, createListIngredients } from "./grid.js";

const searchBar = document.getElementById("search__input");
searchBar.addEventListener("input", function () {
  if (searchBar.value.length >= 3) {
    const saisie = searchBar.value;
    grid.innerHTML = "";
    console.log(saisie);
  } else {
    if (grid.innerHTML === "")
      recipes.forEach((recipes) => {
        createCard(recipes);
        createListIngredients(recipes);
      });
  }
});
