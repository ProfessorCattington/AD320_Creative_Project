/**
 * A webpage for fetching cute pet photos. Puppies or kitties
 * will be populated on the page after the user selects their desired
 * pet type.
 * 
 * Important information to complete this assignment:
 * - Service URL: https://courses.cs.washington.edu/courses/cse154/webservices/pets/ajaxpets.php
 * - Query Parameters (required): ?animal=<value>
 *   - Details: animal is the name of the query parameter you need to assign
 *              a value to. This API recognizes either a value of puppy or kitty.
 * 
 * Example Request (with puppy as the value):
 * https://courses.cs.washington.edu/courses/cse154/webservices/pets/ajaxpets.php?animal=puppy
 */

"use strict";
(function() {

  const buttonIndex = 6;
  window.addEventListener("load", init);

  function init() {
    setupPage();
  }

  /**
   * Sets up the page with listeners and initializes global variables
   * @param nothing
   * @return nothing
   */
    function setupPage(){

      let pokedex = id("Pokedex");
      let button = pokedex.children[buttonIndex];
      button.addEventListener("click", searchPokemons);
    }

    function getSearchField(){

      let searchField = document.getElementById("pname");

      return searchField;
    }

    /**
   * Returns the element that has the ID attribute with the specified value.
   * @param response the text response from the server
   * @return none
   */
    function searchPokemons() {

      getPokemonInfo(); // make API call for the basic pokemon data
      clearField(); //clear out the search field
    }

    function clearField(){
      let searchField = getSearchField();
      searchField.value = "";
    }

    /**
   * makes a request to the pokeapi webservice URI. 
   * @param nothing
   * @return nothing
   */
    function getPokemonInfo() {

      let searchField = getSearchField();
      let input = searchField.value;

      //make a URI out of the animal that was clicked and the sample link
      let requestString = "https://pokeapi.co/api/v2/pokemon/" + input;

      fetch(requestString)
      .then(statusCheck)
      .then(resp => resp.json())
      .then(formatBasicInfo)
      .then(getSpeciesInfo)
      .catch(showError);

    }

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param pokeResponse the text response from the server
   * @return none
   */
    function formatBasicInfo(pokeResponse) {

      //strip out the data we are interested in from the JSON 
      let pokemonName = pokeResponse.name;
      let pokemonNumber = pokeResponse.id;
      
      //some pokemon have 2 types
      let pokemonTypes = pokeResponse.types;
      let pokemonType  = pokemonTypes[0].type.name;

      if(pokemonTypes.length > 1){

          pokemonType += " / ";
          pokemonType += pokemonTypes[1].type.name;
      }

      /*This API is in development
        The JSON path to the image URL changed while I was working 
        on this part of the project. Not sure if this will work by the time this is graded
      */
      //let imagePath = pokeResponse.sprites.front_default;
      let imagePath = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + pokemonNumber + ".png";
      
      //make some HTML tags
      let body = document.body;
      //let pokemonData = document.createElement("div");
      //pokemonData.classList.add("pokemon");
      let pokemonData = document.getElementsByClassName("pokemon")[0];
      pokemonData.innerHTML = "";
      body.appendChild(pokemonData);

      //image
      
      let imageTag = document.createElement("img");
      imageTag.src = imagePath;
      pokemonData.appendChild(imageTag);

      //name
      let nameHeader = document.createElement("h2");
      let nameText = document.createElement("u");
      nameText.innerText = pokemonName;
      pokemonData.appendChild(nameHeader);
      nameHeader.appendChild(nameText);

      //id number
      let numberHeader = document.createElement("h3");
      numberHeader.innerText = "id #: " + pokemonNumber;
      pokemonData.appendChild(numberHeader);

      //type
      let typeHeader = document.createElement("h3");
      typeHeader.innerText = "type: " + pokemonType;
      pokemonData.appendChild(typeHeader);

      return pokeResponse.id;
    }

    function getSpeciesInfo(idNumber){

        let requestString = "https://pokeapi.co/api/v2/pokemon-species/" + idNumber;

        fetch(requestString)
        .then(statusCheck)
        .then(resp => resp.json())
        .then(formatSpeciesInfo)
        .catch(showError);
    }

    function formatSpeciesInfo(speciesResponse){

        let pokemonData = document.getElementsByClassName("pokemon")[0];
        let flavorText = speciesResponse.flavor_text_entries[0].flavor_text;

        let speciesHeader = document.createElement("h3");
        speciesHeader.innerText = "Note: " + flavorText;
        pokemonData.appendChild(speciesHeader);
    }
  /**
   * report error to console
   * @param error the error thrown by error handling
   * @return nothing
   */
  function showError(error) {
    console.log(error)
    let pokemonData = document.getElementsByClassName("pokemon")[0];
    let errorText = "I think you spelled the name wrong or put in a bad number";

    let errorHeader = document.createElement("h3");
    errorHeader.innerText = errorText;
    pokemonData.appendChild(errorHeader);
  }
  /* ------------------------------ Helper Functions  ------------------------------ */

  /**
   * Helper function to return the response's result text if successful, otherwise
   * returns the rejected Promise result with an error status and corresponding text
   * @param {object} res - response to check for success/error
   * @return {object} - valid response if response was successful, otherwise rejected
   *                    Promise result
   */
  async function statusCheck(res) {
    if (!res.ok) {
      throw new Error(await res.text());
    }
    return res;
  }

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} id - element ID
   * @return {object} DOM object associated with id.
   */
  function id(id) {
    return document.getElementById(id);
  }

  /**
   * Returns the first element that matches the given CSS selector.
   * @param {string} query - CSS query selector.
   * @returns {object[]} array of DOM objects matching the query.
   */
  function qs(query) {
    return document.querySelector(query);
  }

  /**
   * Returns the array of elements that match the given CSS selector.
   * @param {string} query - CSS query selector
   * @returns {object[]} array of DOM objects matching the query.
   */
  function qsa(query) {
    return document.querySelectorAll(query);
  }
})();
