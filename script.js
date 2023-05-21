const searchInput = document.querySelector(".search-input input");
searchButton = document.querySelector(".input-button");
cards = document.querySelector(".cards");
title = document.querySelector(".search-results-heading");
searchButton.addEventListener("click", showResult);
title.innerHTML = "You don't have any search results ";

function showResult() {
  fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput.value.trim()}`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.meals != null) {
        let resData = data.meals.map((res) => res);
        if (resData && searchInput.value.trim() != "") {
          let li = "";
          let favList = JSON.parse(localStorage.getItem("favList")) || [];
          resData.forEach((meal) => {
            if (favList.includes(parseInt(meal.idMeal))) {
              li += `
                  <div class="meal-card">
                <div class="card-image">
                  <img src=${meal.strMealThumb} />
                </div>
                <div class="card-heading">
                  <div>
                    <span class="card-heading-recipe">RECIPE</span>
                    <span>| ${meal.strMeal}</span>
                  </div>
                  <div onclick="remove(${meal.idMeal})">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#f44336" class="bi bi-heart-fill" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                  </svg>
                  </div>
                </div>
                <div class="card-button">
                  <button><a href="/Details/details.html?id=${meal.idMeal}">QUICK VIEW</a></button>
                </div>
              </div>
                  `;
            } else {
              li += `
                  <div class="meal-card">
                <div class="card-image">
                  <img src=${meal.strMealThumb} />
                </div>
                <div class="card-heading">
                  <div>
                    <span class="card-heading-recipe">RECIPE</span>
                    <span>| ${meal.strMeal}</span>
                  </div>
                  <div onclick="addToFav(${meal.idMeal})">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                  </svg>
                  </div>
                </div>
                <div class="card-button">
                  <button><a href="/Details/details.html?id=${meal.idMeal}">QUICK VIEW</a></button>
                </div>
              </div>
                  `;
            }
          });
          cards.innerHTML = li;
          title.innerHTML = `${
            resData.length
          } matching results for  " ${searchInput.value.trim()} "`;
        }
      }
    })
    .catch((err) => console.log(err));
}

function addToFav(id) {
  let favList = JSON.parse(localStorage.getItem("favList")) || [];
  favList.push(id);
  localStorage.setItem("favList", JSON.stringify(favList));
  alert("your meal added to your favourites list");
  showResult();
}

function remove(id) {
  favList = JSON.parse(localStorage.getItem("favList"));
  console.log(favList);
  let index = favList.findIndex((obj) => obj.idMeal == id);
  favList.splice(index, 1);
  localStorage.setItem("favList", JSON.stringify(favList));
  alert("your meal removed from your favourites list");
  showResult();
}

var navLinks = document.getElementById("navLinks");

function showMenu() {
  navLinks.style.left = "0";
}
function hideMenu() {
  navLinks.style.left = "-200px";
}
