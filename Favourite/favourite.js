// function for display favourites
function showFavList() {
  let favList = JSON.parse(localStorage.getItem("favList")) || [];
  let html = "";
  if (favList.length !== 0) {
    for (let index = 0; index < favList.length; index++) {
      fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${favList[index]}`
      )
        .then((response) => response.json())
        .then((data) => {
          html += `
            <div class="meal-card">
            <div class="card-image">
              <img src=${data.meals[0].strMealThumb} />
            </div>
            <div class="card-heading">
              <div>
                <span class="card-heading-recipe">RECIPE</span>
                <span>| ${data.meals[0].strMeal}</span>
              </div>
              <div onclick="remove(${data.meals[0].idMeal})">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#f44336" class="bi bi-heart-fill" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
              </svg>
              </div>
            </div>
            <div class="card-button">
              <button>QUICK VIEW</button>
            </div>
          </div>
              `;
          document.querySelector(".fav-cards").innerHTML = html;
        });
    }
  } else {
    document.querySelector(
      ".fav-cards"
    ).innerHTML = `<p style="color:white;">You don't have any favourites</p>`;
  }
}

// function for remove item from favourites
function remove(id) {
  favList = JSON.parse(localStorage.getItem("favList"));
  let index = favList.findIndex((obj) => obj.idMeal == id);
  favList.splice(index, 1);
  localStorage.setItem("favList", JSON.stringify(favList));
  alert("your meal removed from your favourites list");
  showFavList();
}

var navLinks = document.getElementById("navLinks");

// function for display menu
function showMenu() {
  navLinks.style.left = "0";
}

// function for hide menu
function hideMenu() {
  navLinks.style.left = "-200px";
}
