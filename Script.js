const layers = [...document.querySelectorAll(".parallax-layer")].map(el => ({
  el,
  depth: parseFloat(el.dataset.depth) || 0
}));

const player = document.getElementById("player");
const bluelaser = document.getElementById("bluelaser");
const bluelaser2 = document.getElementById("bluelaser2");
const bluelaser3 = document.getElementById("bluelaser3");
const bluelaser4 = document.getElementById("bluelaser4");
const coin1 = document.getElementById("Coin1");
const coin2 = document.getElementById("Coin2");
const coin3 = document.getElementById("Coin3");
const coin4 = document.getElementById("Coin4");
const spikes1 = document.getElementById("Spikes1")
const lasers = [
  bluelaser,
  bluelaser2,
  bluelaser3,
  bluelaser4
];

const platforms = [
  document.getElementById("Platform1"),
  document.getElementById("Platform2"),
  document.getElementById("Platform3"),
  document.getElementById("Platform4"),
  document.getElementById("Platform5")
];

const spikes = [
  spikes1
];

let x = 0;
let y = 663;
let gravity = 0;
let xspeed = 4;
let yspeed = 4;
let time = Date.now()
let score = 0;
let health = 100;
let worldtime = 0;
let graceperiod = 0;
const maxHealth = 100;
let laserspeed = 7.5;
let laserNumber = 0;
let gracePeriodShot = 0;

let laserx = 0;
let lasery = 0;
let laser2x = 0;
let laser2y = 0;
let laser3x = 0;
let laser3y = 0;
let laser4x = 0;
let laser4y = 0;

let pwidth = player.getBoundingClientRect().height

let pheight = player.getBoundingClientRect().height



let noPlatform = true;
let positionChange = false


const keys = {
  w: false,
  a: false,
  s: false,
  d: false,
  e: false,
  ArrowUp: false,
  Arrowleft: false,
  ArrowDown: false,
  ArrowRight: false,
};

const healthBar = document.getElementById("HealthBar");
const healthValueDisplay = document.getElementById('health-value');

function updateHealthBar() {
  const percentage = (health / maxHealth) * 100;
  const percentageW = (health / maxHealth) * 70;

  healthBar.style.width = percentageW + '%';

  healthValueDisplay.textContent = percentage + '%';
}

function changeHealth(amount) {
  currentHealth = Math.min(maxHealth, Math.max(0, currentHealth + amount));
  updateHealthBar();
}


updateHealthBar();




function getCameraX(playerX) {
  return playerX - window.innerWidth / 2;
}

function renderParallax(playerX) {
  const cameraX = getCameraX(playerX);

  for (const layer of layers) {
    const offsetX = -cameraX * layer.depth;

    layer.el.style.backgroundPosition = `${offsetX}px 50%`;
  }
}

function areDivsTouching(elm1, elm2) {
  const rect1 = elm1.getBoundingClientRect();
  const rect2 = elm2.getBoundingClientRect();

  const noOverlap = (
    rect1.top + rect1.height < rect2.top || // rect1 is above rect2
    rect1.top > rect2.top + rect2.height || // rect1 is below rect2
    rect1.left + rect1.width < rect2.left || // rect1 is left of rect2
    rect1.left > rect2.left + rect2.width   // rect1 is right of rect2
  );

  return !noOverlap;
}

function resetLaser(laser, laserNumber) {

  laser.style.left = "-99999px";
  laser.style.top = "-99999px";

  if (laserNumber == 0) {
    laserx = -99999;
    lasery = -99999;
  }

  if (laserNumber == 1) {
    laser2x = -99999;
    laser2y = -99999;
  }

  if (laserNumber == 2) {
    laser3x = -99999;
    laser3y = -99999;
  }

  if (laserNumber == 3) {
    laser4x = -99999;
    laser4y = -99999;
  }
}

window.addEventListener("keydown", (e) => {
  const key = e.key.toLowerCase();
  if (key in keys) {
    keys[key] = true;
  }
});

//if keydown = true > 0.5s
//w = false


window.addEventListener("keyup", (e) => {
  const key = e.key.toLowerCase();
  if (key in keys) {
    keys[key] = false;
  }
});

window.addEventListener("mousedown", (e) => {
  const container = document.createElement("div");

  container.style.position = "fixed";
  container.style.left = `${e.clientX}px`;
  container.style.top = `${e.clientY}px`;
  container.style.transform = "translate(-50%, -50%)";
  container.style.pointerEvents = "none";
  container.style.display = "flex";
  container.style.alignItems = "center";
  container.style.gap = "6px";

  const dot = document.createElement("div");
  dot.style.width = "6px";
  dot.style.height = "6px";
  dot.style.backgroundColor = "red";
  dot.style.borderRadius = "50%";

  container.appendChild(dot);
  document.body.appendChild(container);

  console.log(`x: ${e.clientX}px y :${e.clientY}px`)
});

let lockouttime = 0
function gameLoop() {
  time = Date.now()
  // console.log(time)
  // Movement
  // Jump
  if (keys.w && lockouttime < time) {
    if (gravity >= 0 && gravity <= 0.7) {
      gravity = -10;
      lockouttime = time + 500
    }
  }
  // Drop
  if (keys.s && noPlatform) y += yspeed;
  // Left
  if (keys.a && x > 0) {
    x -= xspeed;
    player.style.backgroundImage = "url('walking-left-1-test.gif')"
  }
  // Right
  if (keys.d && (x < window.innerWidth - 23)) {
    x += xspeed;
    player.style.backgroundImage = "url('walking-right-2-test.gif')"
  }


  // Shoot
  if (keys.e) {
    if (gracePeriodShot < worldtime) {
      laserNumber = laserNumber + 1;
      if (laserNumber == 4) {
        laserNumber = 0;
      }
      if (laserNumber == 0) {
        laserx = x;
        lasery = y;
      }
      if (laserNumber == 1) {
        laser2x = x;
        laser2y = y;
      }
      if (laserNumber == 2) {
        laser3x = x;
        laser3y = y;
      }
      if (laserNumber == 3) {
        laser4x = x;
        laser4y = y;
      }
      gracePeriodShot = worldtime + 30;
    }
  }


  if (laserx > -500) {
    laserx = laserx + laserspeed;
  }

  if (laser2x > -500) {
    laser2x = laser2x + laserspeed;
  }

  if (laser3x > -500) {
    laser3x = laser3x + laserspeed;
  }

  if (laser4x > -500) {
    laser4x = laser4x + laserspeed;
  }

  if (laserx > window.innerWidth + 200) {
    resetLaser(bluelaser, 0);
  }

  if (laser2x > window.innerWidth + 200) {
    resetLaser(bluelaser2, 1);
  }

  if (laser3x > window.innerWidth + 200) {
    resetLaser(bluelaser3, 2);
  }

  if (laser4x > window.innerWidth + 200) {
    resetLaser(bluelaser4, 3);
  }

  if (laserx > window.innerWidth + 200) {
    laserx = -1000;
  }

  if (laser2x > window.innerWidth + 200) {
    laser2x = -1000;
  }

  if (laser3x > window.innerWidth + 200) {
    laser3x = -1000;
  }

  if (laser4x > window.innerWidth + 200) {
    laser4x = -1000;
  }

  if (keys.a == false && keys.s == false && keys.d == false && keys.w == false) {
    player.style.backgroundImage = "url('character\ looking\ forward.png')"
  }

  player.style.left = x + "px";
  player.style.top = y + "px";

  bluelaser.style.left = laserx + "px";
  bluelaser.style.top = lasery + "px";

  bluelaser2.style.left = laser2x + "px";
  bluelaser2.style.top = laser2y + "px";

  bluelaser3.style.left = laser3x + "px";
  bluelaser3.style.top = laser3y + "px";

  bluelaser4.style.left = laser4x + "px";
  bluelaser4.style.top = laser4y + "px";

  for (let i = 0; i < lasers.length; i++) {

    // Check collision with platforms
    for (const platform of platforms) {

      if (areDivsTouching(lasers[i], platform)) {

        resetLaser(lasers[i], i);

      }
    }

    // Check collision with spikes
    for (const spike of spikes) {

      if (areDivsTouching(lasers[i], spike)) {

        resetLaser(lasers[i], i);

      }
    }
  }

  // Player bounds
  // Left Player Bound
  if (x < 0) {
    x = 1;
  }

  // Right
  if (x > window.innerWidth - 22) {
    x = window.innerWidth - 23;
  }

  // Up
  if (y < 10) {
    y = 11;
  }

  // Down
  if (y > window.innerHeight - pheight) {
    y = window.innerHeight - pheight - 1;
    gravity = 0
  }

  // Updating gravity accelleration up to a maximum of 20
  y = y + gravity;
  if (gravity < 20) {
    gravity = gravity + 0.7;
  }


  // Platform 1 Bounds
  if ((430 < x) && (x < 580)) { // if player x (horizontal) pos is between 440 and 580 px
    if ((y > 591) && y < 623) { // if player y (vertical) pos is between 591 and 623 px
      if ((y + gravity) > 591) {
        gravity = 0;
        y = 591
        noPlatform = false;
      } else {
        noPlatform = true;
      }
    } else if ((y >= 623)) {
      if ((y + gravity) < 623) {
        gravity = 0
        y = 624
        noPlatform = false;
      } else {
        noPlatform = true;
      }
    } else {
      noPlatform = true;
    }

  }

  // Platform 2
  if (x + 20 > 630 && x < 660) {
    let platformTop = 587;
    if (y + 20 >= platformTop && y + 20 <= platformTop + 22 && gravity >= 0) {
      gravity = 0;
      y = platformTop - 20;
      noPlatform = false;
    } else if ((y >= 609)) {
      if ((y + gravity) < 609) {
        gravity = 0
        y = 610
        noPlatform = false;
      } else {
        noPlatform = true;
      }
    } else {
      noPlatform = true;
    }
  }



  // Platform 3
  if (x + 20 > 696 && x < 726) {
    let platformTop = 546;
    if (y + 20 >= platformTop && y + 20 <= platformTop + 22 && gravity >= 0) {
      gravity = 0;
      y = platformTop - 20;
      noPlatform = false;
    } else if ((y >= 568)) {
      if ((y + gravity) < 568) {
        gravity = 0;
        y = 569;
        noPlatform = false;
      } else {
        noPlatform = true;
      }
    } else {
      noPlatform = true;
    }
  }

  // Platform 4
  if (x + 20 > 760 && x < 790) {
    let platformTop = 505;
    if (y + 20 >= platformTop && y + 20 <= platformTop + 22 && gravity >= 0) {
      gravity = 0;
      y = platformTop - 20;
      noPlatform = false;
    } else if ((y >= 527)) {
      if ((y + gravity) < 527) {
        gravity = 0;
        y = 528;
        noPlatform = false;
      } else {
        noPlatform = true;
      }
    } else {
      noPlatform = true;
    }
  }

  // Platform 5
  if (x + 20 > 824 && x < 854) {
    let platformTop = 464;
    if (y + 20 >= platformTop && y + 20 <= platformTop + 22 && gravity >= 0) {
      gravity = 0;
      y = platformTop - 20;
      noPlatform = false;
    } else if ((y >= 486)) {
      if ((y + gravity) < 486) {
        gravity = 0;
        y = 487;
        noPlatform = false;
      } else {
        noPlatform = true;
      }
    } else {
      noPlatform = true;
    }
  }

  if (areDivsTouching(player, coin1) && coin1.style.display != "None") {
    score = score + 1;
    coin1.style.display = "None";
    document.getElementById("score").textContent = score;
  }
  if (areDivsTouching(player, coin2) && coin2.style.display != "None") {
    score = score + 1;
    coin2.style.display = "None";
    document.getElementById("score").textContent = score;
  }
  if (areDivsTouching(player, coin3) && coin3.style.display != "None") {
    score = score + 1;
    coin3.style.display = "None";
    document.getElementById("score").textContent = score;
  }
  if (areDivsTouching(player, coin4) && coin4.style.display != "None") {
    score = score + 1;
    coin4.style.display = "None";
    document.getElementById("score").textContent = score;
  }


  if (graceperiod < worldtime) {
    if (areDivsTouching(player, spikes1)) {
      health = health - 5;
      graceperiod = worldtime + 35;
    }
  }

  if (health <= 0) {
    health = 100;
    x = 0;
    y = 663;
  }

  document.getElementById("score").textContent = "Score: " + score;

  updateHealthBar();

  renderParallax(x);
  worldtime += 1;
  console.log(worldtime);
  requestAnimationFrame(gameLoop);
}

gameLoop();
