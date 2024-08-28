let elMovieList = document.querySelector("#js-movie-list"),
  elSearchForm = document.querySelector("#js-search-form"),
  elSearchInput = elSearchForm.querySelector("#js-search"),
  elSearchBtn = elSearchForm.querySelector("#js-search-btn"),
  record = new webkitSpeechRecognition(),
  elSelect = elSearchForm.querySelector("#js-select"),
  elSelectList = elSearchForm.querySelector("#js-custom-select-list"),
  elSelectAllItems = elSelectList.querySelectorAll("li");

elSearchForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
});

function displayFilms(filmsToDisplay) {
  elMovieList.innerHTML = "";
  for (const film of filmsToDisplay) {
    let newItem = document.createElement("li"),
      newFilmDate = document.createElement("span"),
      newImg = document.createElement("img"),
      newWrapper = document.createElement("div"),
      newTextWrapper = document.createElement("div"),
      newTitle = document.createElement("h3"),
      newText = document.createElement("p");

    let date = new Date(film.release_date);
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
  let searchInputValue = elSearchInput.value;
  let filteredFilms = films.filter(function (film) {
    return film.title.match(new RegExp(searchInputValue, "gi"));
  });
  displayFilms(filteredFilms);
});

displayFilms(films);

elSearchBtn.addEventListener("click", () => {
  record.start();
  elSearchBtn.style.borderColor = "red";
});
record.onresult = function (evt) {
  let result = evt.results["0"]["0"].transcript;
  elSearchInput.value = result;
  let filteredFilmsOnSpeach = films.filter(function (film) {
    return film.title.match(new RegExp(elSearchInput.value, "gi"));
  });
  displayFilms(filteredFilmsOnSpeach);
};

record.onend = function () {
  elSearchBtn.style.borderColor = "#ffffffc5";
};

let unicGenres = ["All"];

films.forEach((item) => {
  item.genres.forEach((answer) => {
    if (!unicGenres.includes(answer)) {
      unicGenres.push(answer);
    }
  });
});

for (const genre of unicGenres) {
  let newSelectItem = document.createElement("li");
  newSelectItem.classList.add("childItem");
  newSelectItem.textContent = genre;
  elSelectList.appendChild(newSelectItem);
}

elSelectList.addEventListener("click", (event) => {
  if (event.target.textContent == "All") {
    let filteredFilmsFromSelect = films.filter(function (film) {
      return film;
    });
    displayFilms(filteredFilmsFromSelect);
  } else {
    const filteredFilmsFromSelectRegex = new RegExp(
      event.target.textContent,
      "gi"
    );
    let filteredFilmsFromSelect = films.filter(function (film) {
      return film.genres.some((genre) =>
        genre.match(filteredFilmsFromSelectRegex)
      );
    });
    displayFilms(filteredFilmsFromSelect);
  }
});

let previousSelectedOption = null;

elSelect.addEventListener("click", function () {
  const selectBox = this.parentNode;
  const optionsList = selectBox.querySelector(".select-options");

  if (optionsList.children.length === 0) {
    return;
  }

  selectBox.classList.toggle("active");

  if (selectBox.classList.contains("active")) {
    optionsList.style.maxHeight = optionsList.scrollHeight + "px";
  } else {
    optionsList.style.maxHeight = null;
  }
});

elSelectAllItems.forEach(function (option) {
  option.addEventListener("click", function () {
    const selectBox = this.closest(".custom-select");
    const selectedText = selectBox.querySelector(".select-selected");
    if (previousSelectedOption) {
      previousSelectedOption.style.display = "block";
    }
    selectedText.textContent = this.textContent;
    this.style.display = "none";
    previousSelectedOption = this;
    selectBox.classList.remove("active");
    selectBox.querySelector(".select-options").style.maxHeight = null;
  });
});

document.addEventListener("click", function (event) {
  const selectBox = document.querySelector(".custom-select");

  if (!event.target.closest(".custom-select")) {
    selectBox.classList.remove("active");
    selectBox.querySelector(".select-options").style.maxHeight = null;
  }
});
