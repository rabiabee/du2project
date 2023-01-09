"use strict";

array_each(PROGRAMMES, function (programme) {
  create_programme(programme);
});
update_programmes();

document.querySelector(".filter_container").addEventListener("click", click_filter_element);



create_filter("#level_filter > ul", "selected", LEVELS);
create_filter("#subject_filter > ul", "selected", SUBJECTS);
create_filter("#language_filter > ul", "selected", LANGUAGES);
create_countries_cities_filters();


document.querySelector("#search_field button").addEventListener("click", update_programmes);


update_programmes();


// Add Interaction of button toggle-all-cities
/*const toggle_button = document.querySelector("#country_filter > button");
toggle_button.addEventListener("click", toggle_cities);*/

