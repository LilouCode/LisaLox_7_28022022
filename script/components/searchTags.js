import { recipes } from "../data/recipes.js";
import { createCard, createListIngredients } from "./grid.js";

//DOM
export const listIngredientsDrop = document.getElementById("list-ingredients");
const inputDropIngredients = document.getElementById("input-ingredients");

//Tableaux :
export const tableauTagsIngredients = [];
export let listIngredients = [];
export let FinalListIngredients = [];
let sortedListIngredients = [];

//Fonctions

//Création d'une liste d'ingrédients à partir d'une recette, trier par ordre alphabétique avec supression des doublons
export function MakeTheIngredientsList(objet) {
  objet.forEach((objet) => {
    const ingredients = objet.ingredients;
    ingredients.forEach((ingredients) => {
      const ingredient = ingredients.ingredient;
      listIngredients.push(ingredient);
      return listIngredients;
    });
  });
  //supression des doublons
  const uniqueSetIngredients = new Set(listIngredients);
  sortedListIngredients = [...uniqueSetIngredients];
  //tri par odre alphabétique
  function trierParOdreAlphabethique(a, b) {
    if (a.toLowerCase() < b.toLowerCase()) {
      return -1;
    } else if (a.toLowerCase() > b.toLowerCase()) {
      return 1;
    }
  }
  sortedListIngredients.sort(trierParOdreAlphabethique);
  FinalListIngredients = sortedListIngredients;
  if (tableauTagsIngredients.length > 0) {
    console.log("c'est ici");
    tableauTagsIngredients.forEach((el) => {
      console.log(tableauTagsIngredients.length);
      let index = sortedListIngredients.indexOf(el);
      sortedListIngredients.splice(index, 1);
    });
  }

  console.log("FinalListIngredients: " + FinalListIngredients); //test sortie
  return FinalListIngredients;
}

inputDropIngredients.addEventListener("input", function () {
  let saisieDropIngredients = inputDropIngredients.value.toLocaleLowerCase();
  console.log(saisieDropIngredients);
  let filtredListIngredients = sortedListIngredients.filter((recipes) => recipes.toLocaleLowerCase().includes(saisieDropIngredients));
  if (filtredListIngredients.length > 0) {
    FinalListIngredients = filtredListIngredients;
    listIngredientsDrop.innerHTML= "";
    FinalListIngredients.forEach((element) => {
      createAnIngredientItem(element);
    });
  }
  console.log("FinalListIngredients: " + FinalListIngredients);
});
// Création d'un élément Tag du DOM à partir d'un évenement (click dans la liste des ingrédients)
function createATag(item) {
  //DOM
  const tagZone = document.getElementById("search-tag"); //repère dans le DOM
  const tag = document.createElement("button"); //création
  // ajouts des attributs:
  tag.classList.add("tag");
  tag.classList.add("tag--ingredients");
  tag.setAttribute("id", item);
  tag.innerHTML = item;
  tagZone.appendChild(tag);
  //évenements (remove tag)
  tag.addEventListener("click", function () {
    createAnIngredientItem(item);
    tagZone.removeChild(tag);
    let index = tableauTagsIngredients.indexOf(item);
    tableauTagsIngredients.splice(index, 1);
    console.log("supression tag, liste tableauTagsIngredients: " + tableauTagsIngredients);
    return tableauTagsIngredients;
  });
  tableauTagsIngredients.push(item);
  console.log("liste tableauTagsIngredients: " + tableauTagsIngredients);
  return tagZone;
}

// création d'un bouton dans la zone de selection des tag (dropdown) pour chaque ingrédients à partir de la liste des ingrédients:
function createAnIngredientItem(item) {
  const itemList = document.createElement("button");
  itemList.classList.add("dropdown__list__item");
  itemList.innerHTML = `${item} `;
  itemList.setAttribute("id", item);
  listIngredientsDrop.appendChild(itemList);
  itemList.addEventListener("click", function () {
    inputDropIngredients.value = "";
    createATag(item);
  });
  return listIngredientsDrop;
}

//création de la liste + créations des Cards avec affichage des éléments dans la grid
export function showElements(objet) {
  // départ
  grid.innerHTML = "";
  listIngredients = [];
  listIngredientsDrop.innerHTML = "";
  //reprise
  MakeTheIngredientsList(objet);
  console.log(FinalListIngredients);
  FinalListIngredients.forEach((element) => {
    createAnIngredientItem(element);
  });
  objet.forEach((el) => {
    createCard(el);
    createListIngredients(el);
  });
}

showElements(recipes);
