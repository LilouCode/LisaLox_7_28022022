import { recipes } from "../data/recipes.js";
import { createCard, createListIngredients } from "./grid.js";

///////////////////////// Zone de Test ///////////////
const testEnCours = [
  {
    id: 1,
    name: "Limonade de Coco",
    servings: 1,
    ingredients: [
      {
        ingredient: "Lait de coco",
        quantity: 400,
        unit: "ml",
      },
      {
        ingredient: "Jus de citron",
        quantity: 2,
      },
    ],
  },
  {
    id: 1,
    name: "Tarte",
    servings: 1,
    ingredients: [
      {
        ingredient: "Pâte",
        quantity: 400,
        unit: "ml",
      },
      {
        ingredient: "Fraises",
        quantity: 2,
      },
    ],
  },
];
function filtrerParRecherche(testEnCours) {
  testEnCours.name.includes("Tarte");
}
const recipeFiltered = testEnCours.filter(testEnCours => testEnCours.name.includes('Tarte'));
console.log(recipeFiltered);
// recipes.forEach((recipes) => {
//   console.log("La recette pour faire un(e) super " + recipes.name);
// });
const oldRecipes = ["chocolat", "coco", "banane", "ananas", "haricots"];
const newRecipes = oldRecipes.filter((oldRecipes) => oldRecipes.includes("co"));
console.log(newRecipes);

///////////////////////////////////////////////////////////////////////////////
const searchBar = document.getElementById("search__input");
searchBar.addEventListener("input", function () {
  if (searchBar.value.length >= 3) {
    const saisie = searchBar.value.toLocaleLowerCase();
    grid.innerHTML = "";
    console.log(saisie);
    const results = recipes.filter(recipes => recipes.name.toLocaleLowerCase().includes(saisie) || recipes.description.toLocaleLowerCase().includes(saisie));
    if (results.length >0){
      results.forEach((results) => {
        createCard(results);
        createListIngredients(results);
      });
    } else{
      grid.innerHTML= `<p>Sorry we found nothing for "${saisie}", try with an other word or maybe with others tags</p>`
    }
  } else {
    if (grid.innerHTML === "")
      recipes.forEach((recipes) => {
        createCard(recipes);
        createListIngredients(recipes);
      });
  }
});
