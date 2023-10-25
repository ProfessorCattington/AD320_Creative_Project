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
  const NOTES = {
    q:0,
    w:1,
    e:2,
    r:3,
    t:4,
    y:5,
    u:6,
    i:7,
    o:8,
    p:9
  }

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
 * function to make a piano object add the keypress listener to the page
 * @returns the piano class element
 * 
 */
  function setupPiano(){

    window.addEventListener("keypress", playNote);
    
    let body = document.body;
    
    let piano = document.createElement("div");
    piano.classList.add("piano");
    body.prepend(piano);

    let header = document.createElement("h1");
    let underLine = document.createElement("u");
    underLine.innerText = "Piano";
    header.appendChild(underLine);
    piano.appendChild(header);

    let header2 = document.createElement("h2");
    header2.innerText = "Play Me!";
    piano.appendChild(header2);

    let image = document.createElement("img");
    image.src = "https://www.yamaha.com/yamahavgn/PIM/Images/81129E1F301A42ECAAA5F7BFB5E39046_12073_4454x4521_298b6c84fab6fe3d07e34178decce424.jpg";
    piano.appendChild(image);

    return piano;
}
  /**
   * Called when the page is loaded. Loads the files from the sound_files directory and then creates elements
   * for them. Also adds event listeners for key presses
   * @param piano The piano class element. Used to house the key elements
   */
  function setupKeys(piano){

    //make a new class for the piano keys
    let keys = document.createElement("div");
    keys.className = "keys";

    for(let i = 0; i < KEY_INDEX; i++){
      //get the file
      let source = document.createElement("source");
      let filePath = KEY_FOLDER + KEY_FILE_NAME + i + KEY_EXTENSION;
      source.src = filePath;

      //add the file to the audio element
      let note = document.createElement("audio");
      note.appendChild(source);

      //add the audio element to the array of audio elements and to key class element
      notes.push(note);
      keys.appendChild(note);
    }
    
    piano.appendChild(keys);
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
          notes[NOTES.q].currentTime=0;
          notes[NOTES.q].play();
          break;
        case("w"):
          notes[NOTES.w].currentTime=0;
          notes[NOTES.w].play();
          break;
        case("e"):
          notes[NOTES.e].currentTime=0;
          notes[NOTES.e].play();
          break;
        case("r"):
          notes[NOTES.r].currentTime=0;
          notes[NOTES.r].play();
          break;
        case("t"):
          notes[NOTES.t].currentTime=0;
          notes[NOTES.t].play();
          break;
        case("y"):
          notes[NOTES.y].currentTime=0;
          notes[NOTES.y].play();
          break;
        case("u"):
          notes[NOTES.u].currentTime=0;
          notes[NOTES.u].play();
          break;
        case("i"):
          notes[NOTES.i].currentTime=0;
          notes[NOTES.i].play();
          break;
        case("o"):
          notes[NOTES.o].currentTime=0;
          notes[NOTES.o].play();
          break;
        case("p"):
          notes[NOTES.p].currentTime=0;
          notes[NOTES.p].play();
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