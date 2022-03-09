import { recipes } from "../data/recipes.js";

function createCard(recipes) {
  console.log(recipes.ingredients);
  console.log(recipes.name);
  console.log(recipes.description);
  const grid = document.getElementById("grid");
  const card = document.createElement("div");
  card.innerHTML = `<div class="card">
    <img src="" alt="">
    <div class="card__body">
      <div class="card__header">
        <h2>${recipes.name}</h2>
        <h3>${recipes.time} min</h3>
      </div>
      <div class="card__main">
        <ul id='ingredients-${recipes.id}' class="card__article"></ul>
        <div class="card__text">
        <p>${recipes.description}</p>
        </div>
      </div>
    </div>
  </div>`;
  grid.appendChild(card);
  return grid;
}
function createListIngredients(recipes) {
  const listDesIngredients = recipes.ingredients;
  const ul = document.getElementById("ingredients-" + recipes.id);
  listDesIngredients.forEach((listDesIngredients) => {
    const item = document.createElement("li");
    //pause regexp pour creer mon id sans espace
    let reg = / /g;
    let str = listDesIngredients.ingredient;
    let idItem = reg[Symbol.replace](str, "-");
    item.setAttribute("id", idItem);
    //
    //simplification des unités
    let unit;
    if (listDesIngredients.unit === "grammes") {
      unit = "gr";
    } else if (listDesIngredients.unit === "cuillère à soupe" || listDesIngredients.unit === "cuillères à soupe") {
      unit = "c.s";
    } else if (listDesIngredients.unit === "cuillère à café" || listDesIngredients.unit === "cuillères à café") {
      unit = "c.c";
    } else {
      unit = listDesIngredients.unit;
    }
    //
    if (listDesIngredients.quantity === undefined && listDesIngredients.quantity === undefined) {
      item.innerHTML = `<strong>${listDesIngredients.ingredient}</strong> `;
    } else if (listDesIngredients.unit === undefined) {
      item.innerHTML = `<strong>${listDesIngredients.ingredient}:</strong> ${listDesIngredients.quantity} `;
    } else {
      item.innerHTML = `<strong>${listDesIngredients.ingredient}:</strong> ${listDesIngredients.quantity} ${unit} `;
    }

    ul.appendChild(item);
  });
}
recipes.forEach((recipes) => {
  createCard(recipes);
  createListIngredients(recipes);
});
