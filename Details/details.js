// function for display details
function showDetails() {
  var url_string = window.location.href.toLowerCase();
  var url = new URL(url_string);
  var id = url.searchParams.get("id");
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((response) => response.json())
    .then((data) => {
      html = `
      <div class="recipe" id="about">
        <div class="recipe-image">
          <img
            src=${data.meals[0].strMealThumb}
            class="w3-round w3-image w3-opacity-min"
            alt="Table Setting"
          />
        </div>

        <div class="recipe-details">
          <h1 class="recipe-heading">${data.meals[0].strMeal}</h1>
          <br />
          <h5 class="recipe-instruction-heading">Instruction</h5>
          <p class="recipe-instruction">
          ${data.meals[0].strInstructions}
          </p>
        </div>
      </div>
        `;
      document.querySelector(".details").innerHTML = html;
    });
}

var navLinks = document.getElementById("navLinks");

// function for display menu
function showMenu() {
  navLinks.style.left = "0";
}

// function for display menu
function hideMenu() {
  navLinks.style.left = "-200px";
}
