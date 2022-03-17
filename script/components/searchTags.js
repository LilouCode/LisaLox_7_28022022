import { recipes } from "../data/recipes.js";
import { createCard, createListIngredients } from "./grid.js";

export const listIngredientsDrop = document.getElementById("list-ingredients");
let listIngredients = [];
let BackToListIngredients;

export function MakeTheIngredientsList(objet) {
  objet.forEach((objet) => {
    const ingredients = objet.ingredients;
    ingredients.forEach((ingredients) => {
      const ingredient = ingredients.ingredient;
      listIngredients.push(ingredient);
      return listIngredients;
    });
  });
  console.log(listIngredients);
  const uniqueSetIngredients = new Set(listIngredients);
  BackToListIngredients = [...uniqueSetIngredients];
  function trierParOdreAlphabethique(a, b) {
    if (a.toLowerCase() < b.toLowerCase()) {
      return -1;
    } else if (a.toLowerCase() > b.toLowerCase()) {
      return 1;
    }
  }
  BackToListIngredients.sort(trierParOdreAlphabethique);
  console.log(BackToListIngredients);
  return BackToListIngredients;
}

function createATag(item) {
  const tagZone = document.getElementById("search-tag");
  const tag = document.createElement("button");
  tag.classList.add("tag");
  tag.classList.add("tag--ingredients");
  tag.innerHTML = item;
  tagZone.appendChild(tag);
  tag.addEventListener("click", function () {
    createAnIngredientItem(item);
    tagZone.removeChild(tag);
  });
  return tagZone;
}

function createAnIngredientItem(item) {
  const itemList = document.createElement("button");
  itemList.classList.add("dropdown__list__item");
  itemList.innerHTML = `${item} `;
  itemList.setAttribute("id", item);
  listIngredientsDrop.appendChild(itemList);
  itemList.addEventListener("click", function () {
    createATag(item);
    listIngredientsDrop.removeChild(itemList);
  });
  return listIngredientsDrop;
}

export function showElements(objet) {
  listIngredients = [];
  MakeTheIngredientsList(objet);
  console.log(BackToListIngredients);
  BackToListIngredients.forEach((element) => {
    createAnIngredientItem(element);
  });

  objet.forEach((el) => {
    createCard(el);
    createListIngredients(el);
  });
}
showElements(recipes);