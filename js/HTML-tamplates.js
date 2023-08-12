function getVicoryHTML() {
  return /*html*/ `
    <img src="../el-pollo-loco/img/menue/victory.png" alt="victory img" />
    <div>
      <span>Play again</span>
       <img
        class="play-button"
        onclick="world.startGame()"
        src="../el-pollo-loco/img/menue/play-button.png"
        alt=""
          />
    </div>
  `;
}

function getDefeatHTML() {
  return /*html*/ `
    <img src="../el-pollo-loco/img/menue/defeat.png" alt="defeat img" />
    <div>
      <span>Try again</span>
      <img
        class="play-button"
        onclick="world.startGame()"
        src="../el-pollo-loco/img/menue/play-button.png"
        alt=""
      />
    </div>
    
  `;
}
