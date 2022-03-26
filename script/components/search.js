import { recipes } from "../data/recipes.js";
import { listApplianceDrop, tableauTagsAppliance } from "./searchAppliance.js";
import { tableauTagsIngredients, listIngredientsDrop } from "./searchIngredients.js";
import { showElements } from "./searchPrep.js";
import { listUstensilesDrop, tableauTagsUstensiles } from "./searchUstensiles.js";

const searchBar = document.getElementById("search__input");
const searchTagZone = document.getElementById("search-tag");
let results = [];

const selectTagsIngredients = document.getElementById("list-ingredients");
const selectTagsAppliance = document.getElementById("list-appareils");
const selectTagsUstensiles = document.getElementById("list-ustensiles");
let resultsTags = [];
let alreadyFiltredWithTags = false;

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
searchBar.addEventListener("input", function () {
  const saisie = searchBar.value.toLocaleLowerCase();
  const messageNoResult = `<p id="message-no-result">Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc.</p>`;
  if (searchBar.value.length >= 3) {
    results.length = 0;
    if (alreadyFiltredWithTags){
      for (let i = 0; i < resultsTags.length; i++) {
        let ingredients = resultsTags[i].ingredients;
        const ingredient = function () {
          for (let a = 0; a < ingredients.length; a++) {
            return ingredients[a].ingredient.toLocaleLowerCase();
          }
        };
        if (
          nativeSearch(resultsTags[i].name.toLocaleLowerCase(), saisie) == 1 ||
          nativeSearch(resultsTags[i].description.toLocaleLowerCase(), saisie) == 1 ||
          nativeSearch(ingredient(), saisie) == 1
        ) {
          const ajout = results.length;
          results[ajout] = resultsTags[i];
        }
      }
    } else{
      for (let i = 0; i < recipes.length; i++) {
        let ingredients = recipes[i].ingredients;
        const ingredient = function () {
          for (let a = 0; a < ingredients.length; a++) {
            return ingredients[a].ingredient.toLocaleLowerCase();
          }
        };
        if (
          nativeSearch(recipes[i].name.toLocaleLowerCase(), saisie) == 1 ||
          nativeSearch(recipes[i].description.toLocaleLowerCase(), saisie) == 1 ||
          nativeSearch(ingredient(), saisie) == 1
        ) {
          const ajout = results.length;
          results[ajout] = recipes[i];
        }
      }
    }

    if (results.length > 0) {
      showElements(results);
    } else {
      grid.innerHTML = messageNoResult;
      listIngredientsDrop.innerHTML = "";
      listApplianceDrop.innerHTML = "";
      listUstensilesDrop.innerHTML = "";
    }
  } else {
    results.length = 0;
    if (tableauTagsIngredients.length > 0 || tableauTagsAppliance.length > 0 || tableauTagsUstensiles.length > 0) {
      filtredByTags(recipes);
    } else {
      showElements(recipes);
    }
  }
});

////////////////////////////RECHERCHE AVEC TAGS
//////// SELECTION TAGS

selectTagsIngredients.addEventListener("click", function () {
  if (results.length > 0) {
    console.log("results")
    filtredByTags(results);
  } else {
    console.log("recipes")
    filtredByTags(recipes);
  }
});
selectTagsAppliance.addEventListener("click", function () {
  if (results.length > 0) {
    console.log("results")
    filtredByTags(results);
  } else {
    console.log("recipes")
    filtredByTags(recipes);
  }
});
selectTagsUstensiles.addEventListener("click", function () {
  if (results.length > 0) {
    console.log("results")
    filtredByTags(results);
  } else {
    console.log("recipes")
    filtredByTags(recipes);
  }
});

///////// SUPPPRESSION TAGS

searchTagZone.addEventListener("click", function () {
  const saisie = searchBar.value.toLocaleLowerCase();
  if (saisie.length > 0) {
    if (tableauTagsIngredients.length > 0 || tableauTagsAppliance.length > 0 || tableauTagsUstensiles.length > 0) {
      filtredByTags(results);
    } else {
      alreadyFiltredWithTags = false;
      results = recipes.filter(
        (recipes) =>
          recipes.name.toLocaleLowerCase().includes(saisie) ||
          recipes.description.toLocaleLowerCase().includes(saisie) ||
          recipes.ingredients.some((i) => i.ingredient.toLocaleLowerCase().includes(saisie))
      );
      showElements(results);
    }
  } else {
    if (tableauTagsIngredients.length > 0 || tableauTagsAppliance.length > 0 || tableauTagsUstensiles.length > 0) {
      filtredByTags(recipes);
    } else {
      alreadyFiltredWithTags = false;
      showElements(recipes);
    }
  }
});
/////// FONCTION FILTER AVEC TAGS
function filtredByTags(tableau) {
  alreadyFiltredWithTags = false;
  if (tableauTagsIngredients.length > 0) {
    tableauTagsIngredients.forEach((el) => {
      resultsTags = tableau.filter((recipes) => recipes.ingredients.some((a) => a.ingredient.includes(el)));
    });
    alreadyFiltredWithTags = true;
  }
  if (tableauTagsAppliance.length > 0) {
    if (alreadyFiltredWithTags) {
      tableauTagsAppliance.forEach((el) => {
        resultsTags = resultsTags.filter((recipes) => recipes.appliance.includes(el));
      });
    } else {
      tableauTagsAppliance.forEach((el) => {
        resultsTags = tableau.filter((recipes) => recipes.appliance.includes(el));
      });
      alreadyFiltredWithTags = true;
    }
  }
  if (tableauTagsUstensiles.length > 0) {
    if (alreadyFiltredWithTags) {
      tableauTagsUstensiles.forEach((el) => {
        resultsTags = resultsTags.filter((recipes) => recipes.ustensils.some((u) => u.includes(el)));
      });
    } else {
      tableauTagsUstensiles.forEach((el) => {
        resultsTags = tableau.filter((recipes) => recipes.ustensils.some((u) => u.includes(el)));
      });
      alreadyFiltredWithTags = true;
    }
  }
  showElements(resultsTags);
}