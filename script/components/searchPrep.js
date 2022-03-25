import { recipes } from "../data/recipes.js";
import { createCard, createListIngredients } from "./grid.js";
import { MakeTheApplianceList, createAnApplianceItem, FinalListAppliance, listAppliance, listApplianceDrop } from "./searchAppliance.js";
import { MakeTheIngredientsList, createAnIngredientItem, FinalListIngredients, listIngredients, listIngredientsDrop } from "./searchIngredients.js";
import { MakeTheUstensilesList, createAnUstensilesItem, FinalListUstensiles, listUstensiles, listUstensilesDrop } from "./searchUstensiles.js";

//création de la liste + créations des Cards avec affichage des éléments dans la grid
export function showElements(objet) {
  // départ
  grid.innerHTML = "";
  listIngredients.length = 0;
  listAppliance.length = 0;
  listUstensiles.length= 0;
  listIngredientsDrop.innerHTML = "";
  listApplianceDrop.innerHTML ="";
  listUstensilesDrop.innerHTML="";
  //ustensiles
  MakeTheUstensilesList(objet);
  console.log(FinalListUstensiles)
  FinalListUstensiles.forEach((element) => {
    createAnUstensilesItem(element)
  })
  //appareils
  MakeTheApplianceList(objet);
  console.log(FinalListAppliance)
  FinalListAppliance.forEach((element) => {
    createAnApplianceItem(element)
  })
  //ingredients
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