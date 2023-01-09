
function click_filter_element(event) {
  const filter_element = event.target;
  filter_element.classList.toggle("selected");
  event.stopPropagation();
  update_programmes();
}


function create_filter_element(data) {

  const new_element = document.createElement("li");

  new_element.className = data.class;
  new_element.textContent = data.textContent;
  data.parent.appendChild(new_element);

  new_element.addEventListener("click", click_filter_element);

  return new_element;
}



/*function add_group_toggling(filter_container_dom) {
  filter_container_dom.addEventListener("click", () => {
    array_each(filter_container_dom.children, filter_element => {
      filter_element.classList.toggle("selected");
    });
    update_programmes();
  });
  /*
}
*/

/*function toggle_cities(event) {

  // select all city filter elements  
  const filter_container = document.querySelectorAll(".filter_container");
  const first_city = filter_container[0];
  console.log(first_city);
  const filter_elements = document.querySelectorAll(".filter_list > li");

  if (first_city.classList.contains("selected")) {
    array_each(filter_elements, element => element.classList.remove("selected"));
  } else {
    array_each(filter_elements, element => element.classList.add("selected"));
  }
}
*/

/*
WRITE SPECIFICATION
   Function: create_countries_cities_filters 

    ARGUMENTS: 
      None 
      No control of arguments.

    SIDE-EFFECTS:
    creates HTML elements for a list of filter items and adds them to the DOM. 
    It creates a DOM element for each country and city and appends them to the appropriate parent element.
    It also adds event listeners to the city elements. 

    RETURN VALUE:
      No return value 

Function: create_country 

  ARGUMENTS: 

    country (object): An object representing a country from the COUNTRIES array.

    SIDE-EFFECTS:
    The function creates a DOM element for the country and appends it to the DOM.

    RETURN VALUE:
      No return value 

Function: create_city 

  ARGUMENTS: 
      city (object): An object representing a city from the CITIES array.

      SIDE-EFFECTS:
      The function creates a DOM element for the city and appends it to the DOM. 
      It also adds a data attribute to the element.

      RETURN VALUE:
      No return value 
*/

function create_countries_cities_filters() {
  function create_country(country) {
    const dom = document.createElement("div");
    dom.classList.add("country");
    dom.classList.add("filter_container");
    dom.id = "country_" + country.id;
    document.querySelector("#country_filter > ul").append(dom);

    dom.innerHTML = `
      <h1>${country.name}</h1>
      <ul class="filter_list"></ul>
    `;

    const cities = array_filter(CITIES, test_function);
    function test_function(city) {
      return city.countryID === country.id;
    }

    array_each(cities, create_city);
  }
  function create_city(city) {

    const dom = create_filter_element({
      parent: document.querySelector(`#country_${city.countryID} > ul`),
      class: "selected",
      textContent: city.name,
    });
    dom.dataset.id = city.id;

  }

  array_each(COUNTRIES, create_country);
}



/* ABSTRACT AND WRITE SPECIFICATION

  Function: create_filter - creates HTML elements for a list of filter items and adds them to the DOM

    ARGUMENTS:
      parentSelector (string): the CSS selector for the element that filters elements should be appended to.
      className (string): the class name to be applied to the filter elements.
      items (array): an array of objects, where each object has the following structure:
        {
          id: (number),
          name: (string)
        } 
      No control of arguments.

    SIDE-EFFECTS:
    Creates HTML elements for each item in the "items" array and appends them to the element specified by "parentSelector".
    Sets the "data-id" attribute of each element to the "id" value of the corresponding item in the "items" array.
    Adds a "click" event listener to each element that will call the "click_filter_element" function when the element is clicked.

    RETURN VALUE:
      No return value 

============ ABSTRACTION =========== */
function create_filter(parentSelector, className, items) {

  items.forEach(item => {
    const dom_element = create_filter_element({
      parent: document.querySelector(parentSelector),
      class: className,
      textContent: item.name
    });
    dom_element.dataset.id = item.id;
    dom_element.addEventListener("click", click_filter_element);
  });
}
//---------------------------------------
function create_levels_filter() {
  function create_level(level) {
    const dom = create_filter_element({
      parent: document.querySelector("#level_filter > ul"),
      class: "selected",
      textContent: level.name,
    });
    dom.dataset.id = level.id;
  }
  array_each(LEVELS, create_level);
}
// Create Subjects Filter
function create_subjects_filter() {
  function create_subject(subject) {
    const dom = create_filter_element({
      parent: document.querySelector("#subject_filter > ul"),
      class: "selected",
      textContent: subject.name,
    });
    dom.dataset.id = subject.id;
  }
  array_each(SUBJECTS, create_subject);
}
// Create Search Field
function create_language_filter() {
  function create_element(data) {
    const dom = create_filter_element({
      parent: document.querySelector("#language_filter > ul"),
      class: "selected",
      textContent: data.name,
    });
    dom.dataset.id = data.id;
  }
  array_each(LANGUAGES, create_element);
}


function create_programme(programme) {


  const li_programmes = document.createElement("li");
  li_programmes.classList.add("programme");

  const div_programme = document.createElement("div");
  li_programmes.appendChild(div_programme);

  const h3_programme_name = document.createElement("h3");
  h3_programme_name.textContent = programme.name;

  const p1_university = document.createElement("p");
  p1_university.textContent = array_find(UNIVERSITIES, university => university.id === programme.universityID).name;

  const university = array_find(UNIVERSITIES, university => university.id === programme.universityID);
  const city = array_find(CITIES, city => city.id === university.cityID);

  const programme_background_img = array_random_element(city.imagesNormal);
  li_programmes.style.backgroundImage = `url("././media/geo_images/${programme_background_img}")`;

  const p2_city_country = document.createElement("p");
  const country = array_find(COUNTRIES, country => country.id === city.countryID);
  p2_city_country.textContent = `${city.name}, ${country.name}`;


  const p3_levels_subject_language = document.createElement("p");
  p3_levels_subject_language.textContent = `${array_find(LEVELS, level => level.id === programme.levelID).name}, ${array_find(SUBJECTS, subject => subject.id === programme.subjectID).name}, ${array_find(LANGUAGES, language => language.id === programme.languageID).name}`;

  const p4_sun_index = document.createElement("p");
  p4_sun_index.textContent = `${city.name}, sun-index: ${city.sun}`;


  div_programme.appendChild(h3_programme_name);
  div_programme.appendChild(p1_university);
  div_programme.appendChild(p2_city_country);
  div_programme.appendChild(p3_levels_subject_language);
  li_programmes.appendChild(p4_sun_index);

  document.querySelector("#programmes > ul").appendChild(li_programmes);
}


function update_programmes() {

  const selected_filters = read_filters();

  const programmes_list = document.querySelector("#programmes > ul");

  programmes_list.innerHTML = "";

  selected_filters.forEach(programme => {
    create_programme(programme);
  })


  if (selected_filters.length === 0) {
    document.querySelector("#programmes > p").style.display = "block";
  } else {
    document.querySelector("#programmes > p").style.display = "none";
  }


  const top_images = document.querySelector("#top_images");
  const div_images = top_images.children;

  for (let i = 0; i < div_images.length; i++) {
    const random_country = array_random_element(COUNTRIES);
    const top_country_image = array_random_element(random_country.imagesNormal);
    // set images as the background image for the top divs
    div_images[i].style.backgroundImage = `url("././media/geo_images/${top_country_image}")`;
  }
}



/* 
SPECIFICATION
  Function: read_filters - 
      ARGUMENTS: 
        No arguments
      SIDE EFFECTS: 
        None
      RETURN VALUE: 
        Returns an array of programmes that match the selected filters.

   Function: callback_add_cityID(dom_element)
      ARGUMENT: 
        dom_element: reference to a city filter element
      SIDE EFFECT: 
        id of the city represented by dom_element is added to city_id_selected array
      
      NO RETURN VALUE  

  Function: test_function_level(programme)
    ARGUMENT: 
      programme: a programme object
    RETURN VALUE: 
      a boolean that is true if the level of the programme is selected by the user and false otherwise

  Function: callback_add_languageID(dom_element)
    ARGUMENT: 
      dom_element: reference to a language filter element
    SIDE EFFECT: 
      id of the language represented by dom_element is added to language_id_selected array

    NO RETURN VALUE

  Function: test_function_language(programme)
    ARGUMENT: 
      programme: a programme object
    RETURN VALUE: 
      a boolean that is true if the language of the programme is selected by the user and false otherwise

Function: callback_add_subjectID(dom_element)
  ARGUMENT: 
    dom_element: reference to a subject filter element
  SIDE EFFECT: 
    id of the subject represented by dom_element is added to subject_id_selected array
NO RETURN VALUE

Function test_function_subject(programme)
  ARGUMENT: 
    programme: a programme object
  RETURN VALUE: 
    a boolean that is true if the subject of the programme is selected by the user and false otherwise

Function test_function(programme)
  ARGUMENT: 
    programme: a programme object
  RETURN VALUE: 
    a boolean that is true if the name of the programme includes the search string entered by the user and false otherwise
*/
function read_filters() {

  const city_selected_dom = document.querySelectorAll("#country_filter li.selected");

  const city_id_selected = [];
  function callback_add_cityID(dom_element) {
    const id_as_integer = parseInt(dom_element.dataset.id);
    city_id_selected.push(id_as_integer);
  }
  array_each(city_selected_dom, callback_add_cityID);

  const universities = [];
  for (let i = 0; i < city_id_selected.length; i++) {
    const city_id = city_id_selected[i];
    for (let ii = 0; ii < UNIVERSITIES.length; ii++) {
      const university = UNIVERSITIES[ii];
      if (university.cityID === city_id) {
        universities.push(university);
      }
    }
  }

  let programmes = [];
  function callback_add_programmes(university) {
    const university_id = university.id;
    for (let i = 0; i < PROGRAMMES.length; i++) {
      const programme = PROGRAMMES[i];
      if (programme.universityID === university_id) {
        programmes.push(programme);
      }
    }
  }
  array_each(universities, callback_add_programmes);


  const level_selected_dom = document.querySelectorAll("#level_filter li.selected");
  const level_id_selected = [];
  function callback_add_levelID(dom_element) {
    const id_as_integer = parseInt(dom_element.dataset.id);
    level_id_selected.push(id_as_integer);
  }
  array_each(level_selected_dom, callback_add_levelID);

  function test_function_level(programme) {
    return level_id_selected.includes(programme.levelID);
  }
  programmes = array_filter(programmes, test_function_level);


  const language_selected_dom = document.querySelectorAll("#language_filter li.selected");
  const language_id_selected = [];
  function callback_add_languageID(dom_element) {
    const id_as_integer = parseInt(dom_element.dataset.id);
    language_id_selected.push(id_as_integer);
  }
  array_each(language_selected_dom, callback_add_languageID);


  function test_function_language(programme) {
    return language_id_selected.includes(programme.languageID);
  }
  programmes = array_filter(programmes, test_function_language);


  const subject_selected_dom = document.querySelectorAll("#subject_filter li.selected");
  const subject_id_selected = [];
  function callback_add_subjectID(dom_element) {
    const id_as_integer = parseInt(dom_element.dataset.id);
    subject_id_selected.push(id_as_integer);
  }
  array_each(subject_selected_dom, callback_add_subjectID);



  function test_function_subject(programme) {
    return subject_id_selected.includes(programme.subjectID);
  }
  programmes = array_filter(programmes, test_function_subject);


  const search_string = document.querySelector("#search_field input").value;
  if (search_string !== "") {
    function test_function(programme) {
      return programme.name.includes(search_string);
    }
    programmes = array_filter(programmes, test_function);
  }

  return programmes;
}
