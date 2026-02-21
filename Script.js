const layers = [...document.querySelectorAll(".parallax-layer")].map(el => ({
  el,
  depth: parseFloat(el.dataset.depth) || 0
}));

const player = document.getElementById("player");

let x = 0;
let y = 663;
let gravity = 0;
let xspeed = 4;
let yspeed = 4;
let time = Date.now()


let noPlatform = true;
let positionChange = false


const keys = {
  w: false,
  a: false,
  s: false,
  d: false,
  e: false
};

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
    gravity = -10;
    lockouttime = time + 500
  }
  // Drop
  if (keys.s && noPlatform) y += yspeed;
  // Left
  if (keys.a && x > 0) x -= xspeed;
  // Right
  if (keys.d && (x < window.innerWidth - 23)) x += xspeed;

  player.style.left = x + "px";
  player.style.top = y + "px";


  // Player bounds
  // Left Player Bound
  if (x < 0) {
   x = 1;
  } 

  // Right
  if (x > window.innerWidth - 22) {
    x = window.innerWidth-23;
  } 

  // Up
  if (y < 10) {
   y = 11;
  } 

  // Down
  if (y > window.innerHeight - 40) {
    y = window.innerHeight - 41;
  }

  // Updating gravity accelleration up to a maximum of 20
  y = y + gravity;
  if (gravity < 20) {
    gravity = gravity + 1;
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
      if ((y + gravity) <623) {
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
      if ((y + gravity) <609) {
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

  renderParallax(x) ;
  requestAnimationFrame(gameLoop);
}

gameLoop();
