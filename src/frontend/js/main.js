import "../scss/styles.scss";

document.addEventListener("DOMContentLoaded", () => {
  const searchToggle = document.querySelector(".search-toggle");
  const searchForm = document.querySelector(".search__form");

  searchToggle.addEventListener("click", () => {
    searchForm.classList.toggle("show");
  });
});
