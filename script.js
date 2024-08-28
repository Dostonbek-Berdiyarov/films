var elMovieList = document.querySelector("#js-movie-list"),
  elSearchForm = document.querySelector("#js-search-form"),
  elSearchInput = elSearchForm.querySelector("#js-search"),
  elSearchBtn = elSearchForm.querySelector("#js-search-btn"),
  record = new webkitSpeechRecognition(),
  elSelect = elSearchForm.querySelector("#js-select"),
  elSelectList = elSearchForm.querySelector("#js-custom-select-list");

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

elSearchBtn.addEventListener("click", () => {
  record.start();
  elSearchBtn.style.borderColor = "red";
});
record.onresult = function (evt) {
  var result = evt.results["0"]["0"].transcript;
  elSearchInput.value = result;
  var filteredFilmsOnSpeach = films.filter(function (film) {
    return film.title.match(new RegExp(elSearchInput.value, "gi"));
  });
  displayFilms(filteredFilmsOnSpeach);
};

record.onend = function () {
  elSearchBtn.style.borderColor = "#ffffffc5";
};

var unicGenres = ["All"];

films.forEach((item) => {
  item.genres.forEach((answer) => {
    if (!unicGenres.includes(answer)) {
      unicGenres.push(answer);
    }
  });
});

for (const genre of unicGenres) {
  var newSelectItem = document.createElement("li");
  newSelectItem.textContent = genre;
  elSelectList.appendChild(newSelectItem);
}
elSelect.addEventListener("MutationObserver", () => {});

//  gpt select

let previousSelectedOption = null;

document
  .querySelector(".select-selected")
  .addEventListener("click", function () {
    const selectBox = this.parentNode;
    const optionsList = selectBox.querySelector(".select-options");

    if (optionsList.children.length === 0) {
      return; // Прерываем выполнение, если список пуст
    }

    selectBox.classList.toggle("active");

    if (selectBox.classList.contains("active")) {
      optionsList.style.maxHeight = optionsList.scrollHeight + "px";
    } else {
      optionsList.style.maxHeight = null;
    }
  });

document.querySelectorAll(".select-options li").forEach(function (option) {
  option.addEventListener("click", function () {
    const selectBox = this.closest(".custom-select");
    const selectedText = selectBox.querySelector(".select-selected");

    // Вернуть предыдущую выбранную опцию в список
    if (previousSelectedOption) {
      previousSelectedOption.style.display = "block";
    }

    // Обновление текста выбранной опции
    selectedText.textContent = this.textContent;

    // Скрыть выбранную опцию
    this.style.display = "none";

    // Сохранить ссылку на текущую выбранную опцию
    previousSelectedOption = this;

    // Закрытие списка
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

// gpt select
