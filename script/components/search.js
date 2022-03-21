import { recipes } from "../data/recipes.js";
import { tableauTagsIngredients, listIngredientsDrop, showElements} from "./searchTags.js";

const searchBar = document.getElementById("search__input");
const searchTagZone = document.getElementById("search-tag");
let results = [];
searchBar.addEventListener("input", function () {
  const saisie = searchBar.value.toLocaleLowerCase();
  const messageNoResult = `<p id="message-no-result">Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc.</p>`;
  if (searchBar.value.length >= 3) {
    grid.innerHTML = "";
    console.log(saisie);
    results = recipes.filter(
      (recipes) =>
        recipes.name.toLocaleLowerCase().includes(saisie) ||
        recipes.description.toLocaleLowerCase().includes(saisie) ||
        recipes.ingredients.some((i) => i.ingredient.toLocaleLowerCase().includes(saisie))
    );

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
  return results;
});

///////////////
const selectTags = document.getElementById("list-ingredients");
let resultsI = [];

// ecoutes ajouts tags
selectTags.addEventListener("click", function () {
  if (tableauTagsIngredients.length > 1) {
    console.log("la liste des tags contient plus d'un élément")
    //si la liste des tags contient plus d'un élément
    if (results.length > 0) {
      //si le tableau est déjà filtré par la barre de recherche
      console.log("le tableau est déjà filtré par la barre de recherche")
      resultsI = results.filter((results) => results.ingredients.some((a) => a.ingredient.includes(tableauTagsIngredients[0])));
      for (let i = 1; i < tableauTagsIngredients.length; i++) {
        resultsI = resultsI.filter((results) => results.ingredients.some((a) => a.ingredient.includes(tableauTagsIngredients[i])));
      }
    } else {
      //si le tableau n'a pas encore été filtré
      console.log("le tableau n'a pas encore été filtré par la barre de recherche")
      resultsI = recipes.filter((recipes) => recipes.ingredients.some((a) => a.ingredient.includes(tableauTagsIngredients[0])));
      for (let i = 1; i < tableauTagsIngredients.length; i++) {
        resultsI = resultsI.filter((results) => results.ingredients.some((a) => a.ingredient.includes(tableauTagsIngredients[i])));
      }
    }
    showElements(resultsI);
  } else {
    console.log("la liste des tags ne contient pas plus d'un élément")
    // si la liste des tags ne contient pas plus d'un élément
    if (results.length > 0) {
      console.log("le tableau est déjà filtré par la barre de recherche")
      //si le tableau est déjà filtré par la barre de recherche
      resultsI = results.filter((results) => results.ingredients.some((i) => i.ingredient.includes(tableauTagsIngredients)));
    } else {
      //si le tableau n'a pas encore été filtré
      console.log("le tableau n'a pas encore été filtré par la barre de recherche")
      resultsI = recipes.filter((recipes) => recipes.ingredients.some((i) => i.ingredient.includes(tableauTagsIngredients)));
    }
    showElements(resultsI);
  }
});
//ecoute suppression tags
searchTagZone.addEventListener("click", function () {
  if (tableauTagsIngredients.length > 0) {
    if (results.length > 0) {
      resultsI = results.filter((results) => results.ingredients.some((i) => i.ingredient.includes(tableauTagsIngredients)));
    } else {
      resultsI = recipes.filter((recipes) => recipes.ingredients.some((i) => i.ingredient.includes(tableauTagsIngredients)));
    }
    listIngredientsDrop.innerHTML = "";
    grid.innerHTML = "";
    showElements(resultsI);
    return resultsI;
  } else if (tableauTagsIngredients.length < 1 && results.length > 0) {
    listIngredientsDrop.innerHTML = "";
    grid.innerHTML = "";
    showElements(results);
  } else if (tableauTagsIngredients.length < 1 && results.length < 1) {
    listIngredientsDrop.innerHTML = "";
    grid.innerHTML = "";
    showElements(recipes);
  }
});
