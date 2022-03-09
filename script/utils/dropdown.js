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
//
function openDropdown() {
  dropdownIngredientsBtn.classList.toggle("none");
  dropdownIngredients.classList.toggle("large");
  contentIngredients.classList.toggle("visible");
}
function closeDropdown() {
  dropdownIngredientsBtn.classList.remove("none");
  dropdownIngredients.classList.remove("large");
  contentIngredients.classList.remove("visible");
}
// window.onclick = function (event) {
//     if (!event.target.matches('#dropdown-ingredients-button')) {
//       closeDropdown();
//     }
//   };
