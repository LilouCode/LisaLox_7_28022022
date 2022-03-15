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

///////////////////////// Zone de Test ///////////////
// const testEnCours = [
//   {
//     id: 1,
//     name: "Limonade de Coco",
//     servings: 1,
//     ingredients: [
//       {
//         ingredient: "Lait de coco",
//         quantity: 400,
//         unit: "ml",
//       },
//       {
//         ingredient: "Jus de citron",
//         quantity: 2,
//       },
//     ],
//   },
//   {
//     id: 1,
//     name: "Tarte",
//     servings: 1,
//     ingredients: [
//       {
//         ingredient: "Pâte",
//         quantity: 400,
//         unit: "ml",
//       },
//       {
//         ingredient: "Fraises",
//         quantity: 2,
//       },
//     ],
//   },
// ];
// function filtrerParRecherche(testEnCours) {
//   testEnCours.name.includes("Tarte");
// }
// const recipeFiltered = testEnCours.filter(testEnCours => testEnCours.name.includes('Tarte'));
// console.log(recipeFiltered);
// // recipes.forEach((recipes) => {
// //   console.log("La recette pour faire un(e) super " + recipes.name);
// // });
// const oldRecipes = ["chocolat", "coco", "banane", "ananas", "haricots"];
// const newRecipes = oldRecipes.filter((oldRecipes) => oldRecipes.includes("co"));
// console.log(newRecipes);
// const test2 = recipes.ingredients.filter(recipes.ingredients => ingredients.ingredient.includes('sucre'));
// const recuperationIngredient = recipes.filter((recipes) =>
//   recipes.ingredients.filter((ingredients) => ingredients.ingredient.includes("sucre"))
// );
// console.log(recuperationIngredient);

// const ingredients = recipes.ingredients;
// recipes.filter(recipes.ingredients.ingredients.includes("sucre"));
// const test4 = recipes.filter((el) => el.ingredients.some((i) => i.ingredient.includes("Coco")));
// console.log(test4);
///////////////////////////////////////////////////////////////////////////////