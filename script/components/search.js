import { recipes } from "../data/recipes.js";
import { listIngredientsDrop, showElements} from "./searchTags.js";

function makeTable(str) {
  let table = new Array(str.length);
  let maxPrefix = 0;

  table[0] = 0;

  for (let i = 1; i < str.length; i++) {
    while (maxPrefix > 0 && str.charAt(i) !== str.charAt(maxPrefix)) {
      maxPrefix = table[maxPrefix - 1];
    }

    if (str.charAt(maxPrefix) === str.charAt(i)) {
      maxPrefix++;
    }
    table[i] = maxPrefix;
  }
  return table;
}

function kmpMatching(str, word) {
  let prefixes = makeTable(word);
  let matches = [];

  let j = 0;
  let i = 0;
  while (i < str.length) {
    if (str.charAt(i) === word.charAt(j)) {
      i++;
      j++;
    }

    if (j === word.length) {
      matches.push(i - j);

      j = prefixes[j - 1];
    } else if (str.charAt(i) !== word.charAt(j)) {
      if (j !== 0) {
        j = prefixes[j - 1];
      } else {
        i++;
      }
    }
  }

  return matches;
}
const searchBar = document.getElementById("search__input");
searchBar.addEventListener("input", function () {
  const saisie = searchBar.value.toLocaleLowerCase();
  const messageNoResult = `<p id="message-no-result">Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc.</p>`;
  if (searchBar.value.length >= 3) {
    grid.innerHTML = "";
    console.log(saisie);
    const results = [];
    for (let i = 0; i < recipes.length; i++){
      
      if (
        kmpMatching(recipes[i].name.toLocaleLowerCase(), saisie).length !== 0 ||
        kmpMatching(recipes[i].description.toLocaleLowerCase(), saisie).length !== 0 ||
        kmpMatching(recipes[i].ingredients.some(i => i.ingredient),saisie).length !== 0){
        results.push(recipes[i]);
      }
    }
    
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
