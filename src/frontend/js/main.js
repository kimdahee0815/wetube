import "../scss/styles.scss";

document.addEventListener("DOMContentLoaded", () => {
    const searchToggle = document.querySelector(".search-toggle");
    const searchForm = document.querySelector(".header__search");

    if (searchToggle && searchForm) {
        searchToggle.addEventListener("click", () => {
            searchForm.classList.toggle("show");
            if (searchForm.classList.contains("show")) {
                searchForm.querySelector("input").focus();
            }
        });
    }
});
