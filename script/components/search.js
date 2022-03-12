import { recipes } from "../data/recipes.js";
import { createCard, createListIngredients } from "./grid.js";

function filtrerParRecherche(obj){
  obj.ingredients.includes('i')
}
const recipeFiltered = recipes.filter(filtrerParRecherche);
console.log(recipeFiltered)
recipes.forEach((recipes) => {
  console.log('La recette pour faire un(e) super '+recipes.name)
});
const oldRecipes = ['chocolat', 'coco', 'banane', 'ananas', 'haricots'];
const newRecipes = oldRecipes.filter(oldRecipes => oldRecipes.includes('co'));
console.log(newRecipes);


// recipes.forEach(recipes.in)
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

