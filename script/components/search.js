import { recipes } from "../data/recipes.js";
import { listIngredientsDrop, showElements} from "./searchTags.js";

const searchBar = document.getElementById("search__input");
searchBar.addEventListener("input", function () {
  const saisie = searchBar.value.toLocaleLowerCase();
  const messageNoResult = `<p id="message-no-result">Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc.</p>`;
  if (searchBar.value.length >= 3) {
    grid.innerHTML = "";
    console.log(saisie);
    const results = recipes.filter(
      (recipes) =>
        recipes.name.toLocaleLowerCase().includes(saisie) ||
        recipes.description.toLocaleLowerCase().includes(saisie) ||
        recipes.ingredients.some((i) => i.ingredient.toLocaleLowerCase().includes(saisie))
    );
    if (results.length > 0) {
      listIngredientsDrop.innerHTML = "";
      showElements(results)
    } else {
      grid.innerHTML = messageNoResult;
      listIngredientsDrop.innerHTML="";
    }
  } else {
    if (grid.innerHTML === "" || messageNoResult) {
      grid.innerHTML = "";
      listIngredientsDrop.innerHTML="";
      showElements(recipes)
    }
  }
});