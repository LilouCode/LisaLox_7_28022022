import { trierParOdreAlphabethique } from "../index.js";
//DOM
// ///////////////////////////
export const listApplianceDrop = document.getElementById("list-appareils");
const inputDropAppliance = document.getElementById("input-appareils");
//Tableaux
export const tableauTagsAppliance = [];
export let listAppliance = [];
export let FinalListAppliance= [];
let sortedListAppliance = [];

export function MakeTheApplianceList(objet) {
  objet.forEach((objet) => {
    const appliance = objet.appliance;
    listAppliance.push(appliance)
  });
  //supression des doublons
  const uniqueSetAppliance = new Set(listAppliance);
  sortedListAppliance = [...uniqueSetAppliance];
  //tri par odre alphabétique
  sortedListAppliance.sort(trierParOdreAlphabethique);
  FinalListAppliance = sortedListAppliance;
  if (tableauTagsAppliance.length > 0) {
    console.log("c'est ici");
    tableauTagsAppliance.forEach((el) => {
      console.log(tableauTagsAppliance.length);
      let index = sortedListAppliance.indexOf(el);
      sortedListAppliance.splice(index, 1);
    });
  }
  console.log("FinalListAppliance: " + FinalListAppliance); //test sortie
  return FinalListAppliance;
}

inputDropAppliance.addEventListener("input", function () {
  let saisieDropAppliance = inputDropAppliance.value.toLocaleLowerCase();
  console.log(saisieDropAppliance);
  let filtredListAppliance = sortedListAppliance.filter((recipes) => recipes.toLocaleLowerCase().includes(saisieDropAppliance));
  if (filtredListAppliance.length > 0) {
    FinalListAppliance = filtredListAppliance;
    listApplianceDrop.innerHTML= "";
    FinalListAppliance.forEach((element) => {
      createAnApplianceItem(element);
    });
  }
  console.log("FinalListAppliance: " + FinalListAppliance);
});

// Création d'un élément Tag du DOM à partir d'un évenement (click dans la liste des appareils)
export function createATagAppliance(appliance) {
  //DOM
  const tagZone = document.getElementById("search-tag"); //repère dans le DOM
  const tag = document.createElement("button"); //création
  // ajouts des attributs:
  tag.classList.add("tag");
  tag.classList.add("tag--appareils");
  tag.setAttribute("id", appliance);
  tag.innerHTML = appliance;
  tagZone.appendChild(tag);
  //évenements (remove tag)
  tag.addEventListener("click", function () {
    createAnApplianceItem(appliance)
    tagZone.removeChild(tag);
    let index = tableauTagsAppliance.indexOf(appliance);
    tableauTagsAppliance.splice(index, 1);
    console.log("supression tag, liste tableauTagsAppliance: " + tableauTagsAppliance);
    return tableauTagsAppliance;
  });
  tableauTagsAppliance.push(appliance);
  console.log("liste tableauTagsAppliance: " + tableauTagsAppliance);
  return tagZone;
}

// création d'un bouton dans la zone de selection des tag (dropdown) pour chaque appareil à partir de la liste des appareils:
export function createAnApplianceItem(appliance) {
  const itemList = document.createElement("button");
  itemList.classList.add("dropdown__list__item");
  itemList.classList.add("dropdown__list__item--appareils");
  itemList.innerHTML = `${appliance} `;
  itemList.setAttribute("id", appliance);
  listApplianceDrop.appendChild(itemList);
  itemList.addEventListener("click", function () {
    inputDropAppliance.value = "";
    createATagAppliance(appliance);
  });
  return listApplianceDrop;
}
