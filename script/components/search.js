import { recipes } from "../data/recipes.js";
import { listIngredientsDrop, showElements } from "./searchTags.js";

//
function nativeSearch(str, word) {
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    for (let j = 0; j < word.length; j++) {
      if (word[j] !== str[i + j]) break;
      if (j === word.length - 1) count++;
    }
  }
  return count;
}
const searchBar = document.getElementById("search__input");
searchBar.addEventListener("input", function () {
  const saisie = searchBar.value.toLocaleLowerCase();
  const messageNoResult = `<p id="message-no-result">Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc.</p>`;
  if (searchBar.value.length >= 3) {
    grid.innerHTML = "";
    console.log(saisie);
    const results = [];
    for (let i = 0; i < recipes.length; i++) {
      
      if (
        nativeSearch(recipes[i].name.toLocaleLowerCase(), saisie) == 1 ||
        nativeSearch(recipes[i].description.toLocaleLowerCase(), saisie) == 1 ){
        const ajout = results.length;
        results[ajout] = recipes[i];
      }
    }

    if (results.length > 0) {
      listIngredientsDrop.innerHTML = "";
      showElements(results);
    } else {
      grid.innerHTML = messageNoResult;
      listIngredientsDrop.innerHTML = "";
    }
  } else {
    if (grid.innerHTML === "" || messageNoResult) {
      grid.innerHTML = "";
      listIngredientsDrop.innerHTML = "";
      showElements(recipes);
    }
  }
});
