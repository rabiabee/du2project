"use strict";

/*
  Notice the images on the page header.

  G: The images can be hard-coded in the CSS (as background-image)
  VG: Every time the user selects / unselects one or more filter elements, the app
      shows three random images from all the possible country images.
*/

// create programmes (+  create an HTML element for each programme and append it to the #programmes > ul element.)
array_each(PROGRAMMES, function (programme) {
  create_programme(programme);
});
update_programmes();

document.querySelector(".filter_container").addEventListener("click", click_filter_element);


// Create Filter Elements
create_filter("#level_filter > ul", "selected", LEVELS);
create_filter("#subject_filter > ul", "selected", SUBJECTS);
create_filter("#language_filter > ul", "selected", LANGUAGES);
create_countries_cities_filters();

// Add Interaction of search field button
document.querySelector("#search_field button").addEventListener("click", update_programmes);

// Initialise programmes list by calling relevant function
update_programmes();


// VG
// Add Interaction of filter containers (select-deselect all filters in the container)
// Example: Click anywhere on the language-filter-container and all the language filters
// (spanska, svenska, engelska, franska) will toggle.


// VG
// Add Interaction of button toggle-all-cities

