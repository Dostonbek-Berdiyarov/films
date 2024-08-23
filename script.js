var elMovieList = document.querySelector("#js-movie-list"),
  elSearchForm = document.querySelector("#js-search-form"),
  elSearchInput = elSearchForm.querySelector("#js-search"),
  elSearchBtn = elSearchForm.querySelector("#js-search-btn");

elSearchForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
});

function displayFilms(filmsToDisplay) {
  elMovieList.innerHTML = "";
  for (const film of filmsToDisplay) {
    var newItem = document.createElement("li"),
      newFilmDate = document.createElement("span"),
      newImg = document.createElement("img"),
      newWrapper = document.createElement("div"),
      newTextWrapper = document.createElement("div"),
      newTitle = document.createElement("h3"),
      newText = document.createElement("p");

    var date = new Date(film.release_date);
    newFilmDate.textContent = date.getFullYear();
    newImg.src = film.poster;
    newImg.alt = `${film.title}'s poster`;
    newImg.width = 255;
    newImg.height = 350;
    newTitle.textContent = film.title;
    newText.textContent = film.genres.join(" ");

    newItem.classList.add("film-items");
    newImg.classList.add("film-img");
    newFilmDate.classList.add("film-date");
    newTitle.classList.add("film-title");
    newWrapper.classList.add("film-title-wrapper");
    newText.classList.add("film-text");
    newTextWrapper.classList.add("film-text-wrapper");
    newWrapper.appendChild(newTitle);
    newTextWrapper.appendChild(newText);
    newItem.append(newFilmDate, newImg, newWrapper, newTextWrapper);
    elMovieList.appendChild(newItem);
  }
}

elSearchInput.addEventListener("input", () => {
  var searchInputValue = elSearchInput.value;
  var filteredFilms = films.filter(function (film) {
    return film.title.match(new RegExp(searchInputValue, "gi"));
  });
  displayFilms(filteredFilms);
});

displayFilms(films);
