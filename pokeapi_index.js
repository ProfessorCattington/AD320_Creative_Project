/**
 * A webpage for fetching pokemon and trainer data using pokeapi ( https://pokeapi.co/api/v2/pokemon/ ) and REST API to express_index.js
 */

"use strict";
(function() {

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

      let pSearchButton = id("pSearch");
      pSearchButton.addEventListener("click", searchPokemons);

      let tViewButton = id("tView");
      tViewButton.addEventListener("click", searchTrainers);

      let bViewButton = id("bView");
      bViewButton.addEventListener("click", searchBadges);
    }

    function getSearchField(){

      let searchField = id("pname");
      return searchField;
    }

    function getTrainerSelection(){

      let trainerDropDown = id("trainers");
      return trainerDropDown.value;
    }

    function getBadgeSelection(){

      let badgeDropDown = id("badges");
      return badgeDropDown.value;
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

    function searchTrainers(){

      let trainerName = getTrainerSelection();
      getTrainerInfo(trainerName);
    }

    function searchBadges(){

      let badgeName = getBadgeSelection();
      getBadgeInfo(badgeName);
    }

    function clearField(){
      let searchField = getSearchField();
      searchField.value = "";
    }

    function clearPokemonInfo(){
      let pokemonData = document.getElementsByClassName("pokemon")[0];
      pokemonData.innerHTML = "";
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

    function getTrainerInfo(trainerName){

      let requestString = "http://localhost:8000/Trainers/" + trainerName;

      fetch(requestString)
      .then(statusCheck)
      .then(resp => resp.json())
      .then(formatTrainerInfo)
      .catch(showError);
    }

    function getBadgeInfo(badgeName){

      let requestString = "http://localhost:8000/Badges/" + badgeName;

      fetch(requestString)
      .then(statusCheck)
      .then(resp => resp.json())
      .then(formatBadgeInfo)
      .catch(showError);
    }

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param pokeResponse the text response from the server
   * @return none
   */
    function formatBasicInfo(pokeResponse) {

      //blow away older pokemon data if it's there
      clearPokemonInfo();

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

    function formatTrainerInfo(trainerResponse){

      //blow away older pokemon data if it's there
      clearPokemonInfo();

      //strip out the data we are interested in from the JSON 
      let trainerName = trainerResponse.Name;
      let trainerRoster = trainerResponse.Roster;
      let trainerInfo = trainerResponse.Info;
  
      let imagePath = "trainer_images/" + trainerName + ".png";
      
      //make some HTML tags
      let body = document.body;
      let pokemonData = document.getElementsByClassName("pokemon")[0];
      body.appendChild(pokemonData);

      //image
      let imageTag = document.createElement("img");
      imageTag.classList.add("trainerImage");
      imageTag.src = imagePath;
      pokemonData.appendChild(imageTag);

      //name
      let nameHeader = document.createElement("h2");
      let nameText = document.createElement("u");
      nameText.innerText = trainerName;
      pokemonData.appendChild(nameHeader);
      nameHeader.appendChild(nameText);

      //roster
      let pokemonNames = Object.keys(trainerRoster);

      let rosterHeader = document.createElement("h3");
      let rosterText = document.createElement("u");
      rosterText.innerText = "Roster: ";

      rosterHeader.appendChild(rosterText);
      pokemonData.appendChild(rosterHeader);

      for (let pokemonName of pokemonNames){
        let rosterMember = document.createElement("p");
        let pokemonId = trainerRoster[pokemonName];
        rosterMember.innerText = "# " + pokemonId + " : " + pokemonName;
        pokemonData.appendChild(rosterMember);
      }

      //trainer info
      let infoHeader = document.createElement("h3");
      infoHeader.innerText = "Info: " + trainerInfo;
      pokemonData.appendChild(infoHeader);
    }

    function formatBadgeInfo(badgeResponse){

      //blow away older pokemon data if it's there
      clearPokemonInfo();

      //strip out the data we are interested in from the JSON 
      let badgeName = badgeResponse['Badge Name'];
      let gymName = badgeResponse['Gym Name'];
      let gymLeaderName = badgeResponse['Leader Name'];
      let gymType = badgeResponse['Type'];
  
      let imagePath = "badge_images/" + getBadgeSelection() + ".png";
      
      //make some HTML tags
      let body = document.body;
      let pokemonData = document.getElementsByClassName("pokemon")[0];
      body.appendChild(pokemonData);

      //image
      let imageTag = document.createElement("img");
      imageTag.classList.add("badgeImage");
      imageTag.src = imagePath;
      pokemonData.appendChild(imageTag);

      // badge name
      let nameHeader = document.createElement("h2");
      let nameText = document.createElement("u");
      nameText.innerText = badgeName;
      pokemonData.appendChild(nameHeader);
      nameHeader.appendChild(nameText);

      //gym name
      let gymHeader = document.createElement("h3");
      let gymText = document.createElement("u");
      gymText.innerText = "Gym Name: " + gymName;

      gymHeader.appendChild(gymText);
      pokemonData.appendChild(gymHeader);

      //leader name
      let leaderHeader = document.createElement("h3");
      leaderHeader.innerText = "Leader Name: " + gymLeaderName;
      pokemonData.appendChild(leaderHeader);

      //gym type
      let typeHeader = document.createElement("h3");
      typeHeader.innerText = "Gym Type: " + gymType;
      pokemonData.appendChild(typeHeader);
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
    clearPokemonInfo();
    let pokemonData = document.getElementsByClassName("pokemon")[0];
    let errorText = "Error: Bad name/number. Check spelling or ID on your selection.";

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
