import {recipes} from './data/recipes.js';

let listIngredients = [];
console.table (recipes);
recipes.forEach((recipes) =>{
    const ingredients = recipes.ingredients
    console.log(ingredients)
    ingredients.forEach((ingredients) => {
        const ingredient = ingredients.ingredient;
        console.log(ingredient);
        listIngredients.push(ingredient);
        return listIngredients
    })
})
console.log(listIngredients)
const uniqueSetIngredients = new Set(listIngredients);
const BackToListIngredients = [...uniqueSetIngredients];
function trierParOdreAlphabethique(a, b) {
    if (a.toLowerCase() < b.toLowerCase()) {
      return -1;
    } else if (
      a.toLowerCase() > b.toLowerCase()
    ) {
      return 1;
    }
}
BackToListIngredients.sort(trierParOdreAlphabethique);
console.log(BackToListIngredients)
//DOM//
const listIngredientsDrop = document.getElementById('list-ingredients');
//
function createAnIngredientItem(item){
    const itemList = document.createElement('li');
    itemList.classList.add('dropdown__list__item')
    itemList.innerHTML = `${item} `;
    listIngredientsDrop.appendChild(itemList);
    return listIngredientsDrop
}
BackToListIngredients.forEach((element) =>{
    createAnIngredientItem(element);
})