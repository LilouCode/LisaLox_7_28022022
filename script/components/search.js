import { recipes } from "../data/recipes.js";
import { createCard, createListIngredients } from "./grid.js";

const searchBar = document.getElementById("search__input");
searchBar.addEventListener("input", function () {
  const saisie = searchBar.value.toLocaleLowerCase();
  const messageNoResult = `<p id="message-no-result">Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc.</p>`;
  if (searchBar.value.length >= 3) {
    grid.innerHTML = "";
    console.log(saisie);
    const results = [];
    recipes.forEach((recipe) => {
      if (
        recipe.name.toLocaleLowerCase().includes(saisie) ||
        recipe.description.toLocaleLowerCase().includes(saisie) ||
        recipe.ingredients.some((i) => i.ingredient.toLocaleLowerCase().includes(saisie))
      ) {
        results.push(recipe);
        return results;
      }
    });

    if (results.length > 0) {
      results.forEach((results) => {
        createCard(results);
        createListIngredients(results);
      });
    } else {
      grid.innerHTML = messageNoResult;
    }
  } else {
    if (grid.innerHTML === "" || messageNoResult) {
      grid.innerHTML = "";
      recipes.forEach((recipes) => {
        createCard(recipes);
        createListIngredients(recipes);
      });
    }
  }
});
