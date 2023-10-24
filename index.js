/**
 * 
 * Michael Lezon 
 * 10/22/2023
 * 
 * This java script file is attached to index.html. It helps create the
 * functions that make the website interactive and able to play the piano.
 */
(function() {
 
    //constants
    const KEY_INDEX = 10;
    const KEY_FOLDER = "./sound_files/";
    const KEY_FILE_NAME = "key"
    const KEY_EXTENSION = ".mp3";

    //globals
    let notes = [];

    /**
     * Add a function that will be called when the window is loaded.
     */
    window.addEventListener("load", init);
  
    /**
     * init() initializes all the surface level buttons to have event listeners.
     * These buttons include start-btn and back-btn.
     */
    function init() {
      let piano = setupPiano();
      setupKeys(piano);
    }
  
    /**
   * function to make a piano element add the keypress listener to the page
   * 
   */
    function setupPiano(){

      window.addEventListener("keypress", playNote);
      let piano = qs(".piano");

      return piano;
  }
    /**
     * Called when the page is loaded. Loads the files from the sound_files directory and then creates elements
     * for them. Also adds event listeners for key presses
     * @param piano the piano class element. used as a parent for all the audio elements
     */
    function setupKeys(piano){

      for(let i = 0; i < KEY_INDEX; i++){
        //get the file
        let source = document.createElement("source");
        let filePath = KEY_FOLDER + KEY_FILE_NAME + i + KEY_EXTENSION;
        source.src = filePath;

        //add the file to the audio element
        let note = document.createElement("audio");
        note.appendChild(source);

        //add the audio element to the array of audio elements and to piano class element
        notes.push(note);
        piano.appendChild(note);
      }
    }

 
    /**
     * 
     * Called when a key on the keyboard is pressed. Will play a sound for keys Q through P
     * the current time on each audio element needs to be reset to 0 when the key is pressed or 
     * the note cannot be played again until the sound file finishes playing.
     * 
     */
    function playNote(e){

      switch(e.key){
          case ("q"):
            notes[0].currentTime=0;
            notes[0].play();
            break;
          case("w"):
            notes[1].currentTime=0;
            notes[1].play();
            break;
          case("e"):
            notes[2].currentTime=0;
            notes[2].play();
            break;
          case("r"):
            notes[3].currentTime=0;
            notes[3].play();
            break;
          case("t"):
            notes[4].currentTime=0;
            notes[4].play();
            break;
          case("y"):
            notes[5].currentTime=0;
            notes[5].play();
            break;
          case("u"):
            notes[6].currentTime=0;
            notes[6].play();
            break;
          case("i"):
            notes[7].currentTime=0;
            notes[7].play();
            break;
          case("o"):
            notes[8].currentTime=0;
            notes[8].play();
            break;
          case("p"):
            notes[9].currentTime=0;
            notes[9].play();
            break;
        }
    }

    /** ------------------------------ Helper Functions  ------------------------------ */
  
    /**
     * Returns the element that has the ID attribute with the specified value.
     * @param {string} idName - element ID
     * @returns {object} DOM object associated with id.
     */
    function id(idName) {
      return document.getElementById(idName);
    }
  
    /**
     * Returns the first element that matches the given CSS selector.
     * @param {string} selector - CSS query selector.
     * @returns {object} The first DOM object matching the query.
     */
    function qs(selector) {
      return document.querySelector(selector);
    }
  
    /**
     * Returns the array of elements that match the given CSS selector.
     * @param {string} selector - CSS query selector
     * @returns {object[]} array of DOM objects matching the query.
     */
    function qsa(selector) {
      return document.querySelectorAll(selector);
    }
  
    /**
     * Returns a new element with the given tag name.
     * @param {string} tagName - HTML tag name for new DOM element.
     * @returns {object} New DOM object for given HTML tag.
     */
    function gen(tagName) {
      return document.createElement(tagName);
    }
  
  })();