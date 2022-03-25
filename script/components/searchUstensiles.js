import { trierParOdreAlphabethique } from "../index.js";
//DOM
// ///////////////////////////
export const listUstensilesDrop = document.getElementById("list-ustensiles");
const inputDropUstensiles = document.getElementById("input-ustensiles");
//Tableaux
export const tableauTagsUstensiles = [];
export let listUstensiles = [];
export let FinalListUstensiles = [];
let sortedListUstensiles = [];

export function MakeTheUstensilesList(objet) {
  objet.forEach((objet) => {
    const ustensiles = objet.ustensils;
    ustensiles.forEach((ustensile) => {
      listUstensiles.push(ustensile.toLocaleLowerCase());
    });
  });
  //supression des doublons
  const uniqueSetUstensiles = new Set(listUstensiles);
  sortedListUstensiles = [...uniqueSetUstensiles];
  //tri par odre alphabétique
  sortedListUstensiles.sort(trierParOdreAlphabethique);
  FinalListUstensiles = sortedListUstensiles;
  if (tableauTagsUstensiles.length > 0) {
    tableauTagsUstensiles.forEach((el) => {
      console.log(tableauTagsUstensiles.length);
      let index = sortedListUstensiles.indexOf(el);
      sortedListUstensiles.splice(index, 1);
    });
  }
  console.log("FinalListUstensiles: " + FinalListUstensiles); //test sortie
  return FinalListUstensiles;
}

inputDropUstensiles.addEventListener("input", function () {
  let saisieDropUstensiles = inputDropUstensiles.value.toLocaleLowerCase();
  console.log(saisieDropUstensiles);
  let filtredListUstensiles = sortedListUstensiles.filter((recipes) => recipes.toLocaleLowerCase().includes(saisieDropUstensiles));
  if (filtredListUstensiles.length > 0) {
    FinalListUstensiles = filtredListUstensiles;
    listUstensilesDrop.innerHTML = "";
    FinalListUstensiles.forEach((element) => {
      createAnUstensilesItem(element);
    });
  }
  console.log("FinalListUstensiles: " + FinalListUstensiles);
});

// Création d'un élément Tag du DOM à partir d'un évenement (click dans la liste des ustensiles)
export function createATagUstensiles(ustensiles) {
  //DOM
  const tagZone = document.getElementById("search-tag"); //repère dans le DOM
  const tag = document.createElement("button"); //création
  // ajouts des attributs:
  tag.classList.add("tag");
  tag.classList.add("tag--ustensiles");
  tag.setAttribute("id", ustensiles);
  tag.innerHTML = ustensiles;
  tagZone.appendChild(tag);
  //évenements (remove tag)
  tag.addEventListener("click", function () {
    createAnUstensilesItem(ustensiles);
    tagZone.removeChild(tag);
    let index = tableauTagsUstensiles.indexOf(ustensiles);
    tableauTagsUstensiles.splice(index, 1);
    console.log("supression tag, liste tableauTagsUstensiles: " + tableauTagsUstensiles);
    return tableauTagsUstensiles;
  });
  tableauTagsUstensiles.push(ustensiles);
  console.log("liste tableauTagsUstensiles: " + tableauTagsUstensiles);
  return tagZone;
}

// création d'un bouton dans la zone de selection des tag (dropdown) pour chaque appareil à partir de la liste des appareils:
export function createAnUstensilesItem(ustensiles) {
  const itemList = document.createElement("button");
  itemList.classList.add("dropdown__list__item");
  itemList.classList.add("dropdown__list__item--appareils");
  itemList.innerHTML = `${ustensiles} `;
  itemList.setAttribute("id", ustensiles);
  listUstensilesDrop.appendChild(itemList);
  itemList.addEventListener("click", function () {
    inputDropUstensiles.value = "";
    createATagUstensiles(ustensiles);
  });
  return listUstensilesDrop;
}