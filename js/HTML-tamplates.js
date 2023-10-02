/**
 * Returns the HTML content for the victory screen.
 */
function getVicoryHTML() {
  return /*html*/ `
    <img src="./img/menue/victory.png" alt="victory img" />
    <div>
      <span>Play again</span>
       <img
        class="play-button"
        onclick="world.startGame()"
        src="./img/menue/play-button.png"
        alt=""
          />
    </div>
  `;
}

/**
 * Returns the HTML content for the defeat screen.
 */
function getDefeatHTML() {
  return /*html*/ `
    <img src="./img/menue/defeat.png" alt="defeat img" />
    <div>
      <span>Try again</span>
      <img
        class="play-button"
        onclick="world.startGame()"
        src="./img/menue/play-button.png"
        alt=""
      />
    </div>
    
  `;
}
