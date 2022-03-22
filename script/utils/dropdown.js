//DOM//
const searchDropdown = document.getElementById("search-dropdowns");
const dropdownIngredients = document.getElementById("dropdown-ingredients");
const dropdownAppareils = document.getElementById("dropdown-appareils");
const dropdownUstensiles = document.getElementById("dropdown-ustensiles");
const dropdownIngredientsBtn = document.getElementById("dropdown-ingredients-button");
const dropdownAppareilsBtn = document.getElementById("dropdown-appareils-button");
const dropdownUstensilesBtn = document.getElementById("dropdown-ustensiles-button");
const contentIngredients = document.getElementById("content-ingredients");
const contentAppareils = document.getElementById("content-appareils");
const contentUstensiles = document.getElementById("content-ustensiles");
/////////
window.onclick = function (event) {
  if (event.target.matches('#dropdown-ingredients-button')){
    dropdownIngredientsBtn.classList.toggle("none");
    dropdownIngredients.classList.toggle("large");
    contentIngredients.classList.toggle("visible");
    closeDropdownAppareils()
    closeDropdownUstensiles()
  } else if(event.target.matches('#dropdown-appareils-button')){
    dropdownAppareilsBtn.classList.toggle("none");
    dropdownAppareils.classList.toggle("large");
    contentAppareils.classList.toggle("visible");
    closeDropdownIngredients()
    closeDropdownUstensiles()
  }else if(event.target.matches('#dropdown-ustensiles-button')){
    dropdownUstensilesBtn.classList.toggle("none");
    dropdownUstensiles.classList.toggle("large");
    contentUstensiles.classList.toggle("visible");
    closeDropdownIngredients()
    closeDropdownAppareils()
  } else if(event.target.matches('#search__input')){
    closeDropdownIngredients()
    closeDropdownAppareils()
    closeDropdownUstensiles()
  }
}
function closeDropdownIngredients() {
  dropdownIngredientsBtn.classList.remove("none");
  dropdownIngredients.classList.remove("large");
  contentIngredients.classList.remove("visible");
}
function closeDropdownAppareils() {
  dropdownAppareilsBtn.classList.remove("none");
  dropdownAppareils.classList.remove("large");
  contentAppareils.classList.remove("visible");
}

function closeDropdownUstensiles() {
  dropdownUstensilesBtn.classList.remove("none");
  dropdownUstensiles.classList.remove("large");
  contentUstensiles.classList.remove("visible");
}