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

searchBar.addEventListener("input", function () {
  const saisie = searchBar.value.toLocaleLowerCase();
  const messageNoResult = `<p id="message-no-result">Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc.</p>`;
  if (searchBar.value.length >= 3) {
    if (alreadyFiltredWithTags) {
      results = resultsTags.filter(
        (recipes) =>
          recipes.name.toLocaleLowerCase().includes(saisie) ||
          recipes.description.toLocaleLowerCase().includes(saisie) ||
          recipes.ingredients.some((i) => i.ingredient.toLocaleLowerCase().includes(saisie))
      );
    } else {
      results = recipes.filter(
        (recipes) =>
          recipes.name.toLocaleLowerCase().includes(saisie) ||
          recipes.description.toLocaleLowerCase().includes(saisie) ||
          recipes.ingredients.some((i) => i.ingredient.toLocaleLowerCase().includes(saisie))
      );
    }

    if (results.length > 0) {
      listIngredientsDrop.innerHTML = "";
      listApplianceDrop.innerHTML = "";
      listUstensilesDrop.innerHTML = "";
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
      listIngredientsDrop.innerHTML = "";
      listApplianceDrop.innerHTML = "";
      listUstensilesDrop.innerHTML = "";
      filtredByTags(recipes);
    } else {
      listIngredientsDrop.innerHTML = "";
      listApplianceDrop.innerHTML = "";
      listUstensilesDrop.innerHTML = "";
      showElements(recipes);
    }
  }
});

//////// INGREDIENTS

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
////////////////////////////////


// selectTagsAppliance.addEventListener("click", function () {
//   if (tableauTagsAppliance.length > 0) {
//     if (resultsTags.length > 0) {
//       tableauTagsAppliance.forEach((el) => {
//         resultsA = resultsTags.filter((recipes) => recipes.appliance.includes(el));
//       });
//     } else if (results.length > 0) {
//       tableauTagsAppliance.forEach((el) => {
//         resultsA = results.filter((recipes) => recipes.appliance.includes(el));
//       });
//     } else {
//       tableauTagsAppliance.forEach((el) => {
//         resultsA = recipes.filter((recipes) => recipes.appliance.includes(el));
//       });
//     }
//     showElements(resultsA);
//     alreadyFiltredWithTags = true;
//     resultsU.length = 0;
//     resultsI.length = 0;
//     resultsTags = resultsA;
//     temoinA = tableauTagsAppliance.length;
//     console.log("temoin A: " + temoinA);
//   }
// });
// selectTagsUstensiles.addEventListener("click", function () {
//   if (resultsTags.length > 0) {
//     tableauTagsUstensiles.forEach((el) => {
//       resultsU = resultsTags.filter((recipes) => recipes.ustensils.some((u) => u.includes(el)));
//     });
//   } else if (results.length > 0) {
//     tableauTagsUstensiles.forEach((el) => {
//       resultsU = results.filter((recipes) => recipes.ustensils.some((u) => u.includes(el)));
//     });
//   } else {
//     tableauTagsUstensiles.forEach((el) => {
//       resultsU = recipes.filter((recipes) => recipes.ustensils.some((u) => u.includes(el)));
//     });
//   }
//   showElements(resultsU);
//   alreadyFiltredWithTags = true;
//   resultsA.length = 0;
//   resultsI.length = 0;
//   temoinU = tableauTagsUstensiles.length;
//   console.log("temoinU: " + temoinU);
//   console.log("resultA = " + resultsA.length + ", resultI = " + resultsI.length);
// });



// ///////////////
// const selectTagsIngredients = document.getElementById("list-ingredients");
// const selectTagsAppliance = document.getElementById("list-appareils");
// const selectTagsUstensiles = document.getElementById("list-ustensiles");
// let resultsI = [];
// let resultsA = [];
// let resultsU = [];

// //////// INGREDIENTS
// // ecoutes ajouts tags
// selectTagsIngredients.addEventListener("click", function () {
//   if (tableauTagsIngredients.length > 1) {
//     console.log("la liste des tags contient plus d'un élément")
//     //si la liste des tags contient plus d'un élément
//     if (results.length > 0) {
//       //si le tableau est déjà filtré par la barre de recherche
//       console.log("le tableau est déjà filtré par la barre de recherche")
//       resultsI = results.filter((results) => results.ingredients.some((a) => a.ingredient.includes(tableauTagsIngredients[0])));
//       for (let i = 1; i < tableauTagsIngredients.length; i++) {
//         resultsI = resultsI.filter((results) => results.ingredients.some((a) => a.ingredient.includes(tableauTagsIngredients[i])));
//       }
//     } else {
//       //si le tableau n'a pas encore été filtré
//       console.log("le tableau n'a pas encore été filtré par la barre de recherche")
//       resultsI = recipes.filter((recipes) => recipes.ingredients.some((a) => a.ingredient.includes(tableauTagsIngredients[0])));
//       for (let i = 1; i < tableauTagsIngredients.length; i++) {
//         resultsI = resultsI.filter((results) => results.ingredients.some((a) => a.ingredient.includes(tableauTagsIngredients[i])));
//       }
//     }
//     showElements(resultsI);
//   } else {
//     console.log("la liste des tags ne contient pas plus d'un élément")
//     // si la liste des tags ne contient pas plus d'un élément
//     if (results.length > 0) {
//       console.log("le tableau est déjà filtré par la barre de recherche")
//       //si le tableau est déjà filtré par la barre de recherche
//       resultsI = results.filter((results) => results.ingredients.some((i) => i.ingredient.includes(tableauTagsIngredients)));
//     } else {
//       //si le tableau n'a pas encore été filtré
//       console.log("le tableau n'a pas encore été filtré par la barre de recherche")
//       resultsI = recipes.filter((recipes) => recipes.ingredients.some((i) => i.ingredient.includes(tableauTagsIngredients)));
//     }
//     showElements(resultsI);
//   }
// });
// //ecoute suppression tags
// searchTagZone.addEventListener("click", function () {
//   if (tableauTagsIngredients.length > 0) {
//     if (results.length > 0) {
//       resultsI = results.filter((results) => results.ingredients.some((i) => i.ingredient.includes(tableauTagsIngredients)));
//     } else {
//       resultsI = recipes.filter((recipes) => recipes.ingredients.some((i) => i.ingredient.includes(tableauTagsIngredients)));
//     }
//     listIngredientsDrop.innerHTML = "";
//     grid.innerHTML = "";
//     showElements(resultsI);
//     return resultsI;
//   } else if (tableauTagsIngredients.length < 1 && results.length > 0) {
//     listIngredientsDrop.innerHTML = "";
//     grid.innerHTML = "";
//     showElements(results);
//   } else if (tableauTagsIngredients.length < 1 && results.length < 1) {
//     listIngredientsDrop.innerHTML = "";
//     grid.innerHTML = "";
//     showElements(recipes);
//   }
// });

// //////// APPLIANCE
// // ecoutes ajouts tags
// selectTagsAppliance.addEventListener("click", function () {
//   if (tableauTagsAppliance.length > 1) {
//     console.log("la liste des tags contient plus d'un élément")
//     //si la liste des tags contient plus d'un élément
//     if (results.length > 0) {
//       //si le tableau est déjà filtré par la barre de recherche
//       console.log("le tableau est déjà filtré par la barre de recherche")
//       resultsA = results.filter((results) => results.appliance.includes(tableauTagsAppliance[0]));
//       for (let i = 1; i < tableauTagsAppliance.length; i++) {
//         resultsA = resultsA.filter((results) => results.appliance.includes(tableauTagsAppliance[i]));
//       }
//     } else {
//       //si le tableau n'a pas encore été filtré
//       console.log("le tableau n'a pas encore été filtré par la barre de recherche")
//       resultsA = recipes.filter((recipes) => recipes.appliance.includes(tableauTagsAppliance[0]));
//       for (let i = 1; i < tableauTagsAppliance.length; i++) {
//         resultsA = resultsA.filter((results) => results.appliance.includes(tableauTagsAppliance[i]));
//       }
//     }
//     showElements(resultsA);
//   } else {
//     console.log("la liste des tags ne contient pas plus d'un élément")
//     // si la liste des tags ne contient pas plus d'un élément
//     if (results.length > 0) {
//       console.log("le tableau est déjà filtré par la barre de recherche")
//       //si le tableau est déjà filtré par la barre de recherche
//       resultsA = results.filter((results) => results.appliance.includes(tableauTagsAppliance));
//     } else {
//       //si le tableau n'a pas encore été filtré
//       console.log("le tableau n'a pas encore été filtré par la barre de recherche")
//       resultsA = recipes.filter((recipes) => recipes.appliance.includes(tableauTagsAppliance));
//     }
//     showElements(resultsA);
//   }
// });
// //ecoute suppression tags
// searchTagZone.addEventListener("click", function () {
//   if (tableauTagsIngredients.length > 0) {
//     if (results.length > 0) {
//       resultsI = results.filter((results) => results.ingredients.some((i) => i.ingredient.includes(tableauTagsIngredients)));
//     } else {
//       resultsI = recipes.filter((recipes) => recipes.ingredients.some((i) => i.ingredient.includes(tableauTagsIngredients)));
//     }
//     listIngredientsDrop.innerHTML = "";
//     grid.innerHTML = "";
//     showElements(resultsI);
//     return resultsI;
//   } else if (tableauTagsIngredients.length < 1 && results.length > 0) {
//     listIngredientsDrop.innerHTML = "";
//     grid.innerHTML = "";
//     showElements(results);
//   } else if (tableauTagsIngredients.length < 1 && results.length < 1) {
//     listIngredientsDrop.innerHTML = "";
//     grid.innerHTML = "";
//     showElements(recipes);
//   }
// });

// //////// USTENSILES
// // ecoutes ajouts tags
// selectTagsUstensiles.addEventListener("click", function () {
//   if (tableauTagsUstensiles.length > 1) {
//     console.log("la liste des tags contient plus d'un élément")
//     //si la liste des tags contient plus d'un élément
//     if (results.length > 0) {
//       //si le tableau est déjà filtré par la barre de recherche
//       console.log("le tableau est déjà filtré par la barre de recherche")
//       resultsU = results.filter((results) => results.ustensils.some((u) => u.includes(tableauTagsUstensiles[0])));
//       for (let i = 1; i < tableauTagsUstensiles.length; i++) {
//         resultsU = resultsU.filter((results) => results.ustensils.some((u) => u.includes(tableauTagsUstensiles[i])));
//       }
//     } else {
//       //si le tableau n'a pas encore été filtré
//       console.log("le tableau n'a pas encore été filtré par la barre de recherche")
//       resultsU = recipes.filter((recipes) => recipes.ustensils.some((u) => u.includes(tableauTagsUstensiles[0])));
//       for (let i = 1; i < tableauTagsUstensiles.length; i++) {
//         resultsU = resultsU.filter((results) => results.ustensils.some((u) => u.includes(tableauTagsUstensiles[i])));
//       }
//     }
//     showElements(resultsU);
//   } else {
//     console.log("la liste des tags ne contient pas plus d'un élément")
//     // si la liste des tags ne contient pas plus d'un élément
//     if (results.length > 0) {
//       console.log("le tableau est déjà filtré par la barre de recherche")
//       //si le tableau est déjà filtré par la barre de recherche
//       resultsU = results.filter((results) => results.ustensils.some((u) => u.includes(tableauTagsUstensiles)));
//     } else {
//       //si le tableau n'a pas encore été filtré
//       console.log("le tableau n'a pas encore été filtré par la barre de recherche")
//       resultsU = recipes.filter((recipes) => recipes.ustensils.some((u) => u.includes(tableauTagsUstensiles)));
//     }
//     showElements(resultsU);
//   }
// });
// //ecoute suppression tags
// searchTagZone.addEventListener("click", function () {
//   if (tableauTagsIngredients.length > 0) {
//     if (results.length > 0) {
//       resultsI = results.filter((results) => results.ingredients.some((i) => i.ingredient.includes(tableauTagsIngredients)));
//     } else {
//       resultsI = recipes.filter((recipes) => recipes.ingredients.some((i) => i.ingredient.includes(tableauTagsIngredients)));
//     }
//     listIngredientsDrop.innerHTML = "";
//     grid.innerHTML = "";
//     showElements(resultsI);
//     return resultsI;
//   } else if (tableauTagsIngredients.length < 1 && results.length > 0) {
//     listIngredientsDrop.innerHTML = "";
//     grid.innerHTML = "";
//     showElements(results);
//   } else if (tableauTagsIngredients.length < 1 && results.length < 1) {
//     listIngredientsDrop.innerHTML = "";
//     grid.innerHTML = "";
//     showElements(recipes);
//   }
// });
