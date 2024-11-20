let sphere;
let sphereVelocity = { x: 0.1, y: 0.1, z: 0.1 }; 
let hitMessageDisplayed = false;

function setup() {
    noCanvas();
    world = new World('VRScene');
    world.setBackground(173, 216, 230);

    // LOADING MY HOUSE MODEL
    let RedRoof = new OBJ({
        asset: 'RedRoof-obj', 
        mtl: 'RedRoof-mtl',
        x: -2,
        y: 14,  
        z: -5,
        rotationX: 0,
        rotationY: 180,
        scaleX: 1,
        scaleY: 1,
        scaleZ: 1,
    });
    world.add(RedRoof);

   
    sphere = document.createElement('a-sphere'); 
    sphere.setAttribute('position', { x: 0, y: 0, z: 30 });
    sphere.setAttribute('radius', 1);  
    sphere.setAttribute('color', 'blue');
    document.querySelector('#VRScene').appendChild(sphere); 
  
    let aframeCamera = document.querySelector('a-camera');
    aframeCamera.setAttribute('position', { x: .5, y: 5, z: 5 });  
    window.addEventListener("keydown", handleKeyPress);
}

function handleKeyPress(event) {
    let aframeCamera = document.querySelector('a-camera');
    let cameraPosition = aframeCamera.getAttribute('position');
    let { x, y, z } = cameraPosition; 

// USE Q AND E TO FLY UP AND DOWN
    if (event.key === "q") {
        aframeCamera.setAttribute('position', { x: x, y: y + 0.3, z: z }); 
    } else if (event.key === "e") {
        aframeCamera.setAttribute('position', { x: x, y: y - 0.3, z: z }); 
    }
}


// TRYING TO DISPLAY A MESSAGE WHEN GETTING HIT BY THE BALL
function displayHitMessage() {
    if (!hitMessageDisplayed) {
        let hitMessage = document.createElement('a-text');
        hitMessage.setAttribute('value', 'You were hit by the ball!');
        hitMessage.setAttribute('position', { x: 0, y: 3, z: -5 }); 
        hitMessage.setAttribute('color', 'red');  
        hitMessage.setAttribute('scale', '3 3 3'); 
        document.querySelector('#VRScene').appendChild(hitMessage);
        hitMessageDisplayed = true;
    }
}

function draw() {
    if (!sphere) {
        return;
    }


    let spherePosition = sphere.getAttribute('position'); 
    let { x, y, z } = spherePosition;

    let aframeCamera = document.querySelector('a-camera');
    let cameraPosition = aframeCamera.getAttribute('position');
    let { x: cameraX, y: cameraY, z: cameraZ } = cameraPosition;

    let distance = Math.sqrt(Math.pow(x - cameraX, 2) + Math.pow(y - cameraY, 2) + Math.pow(z - cameraZ, 2));

    // SHOW THE HIT MESSAGE IF THE PLAYER IS CLOSE TO THE BALL
    if (distance < 3 && !hitMessageDisplayed) {
        displayHitMessage();  
    }

    // Update position based on velocity
    x += sphereVelocity.x;
    y += sphereVelocity.y;
    z += sphereVelocity.z;

    // SPHERE COLLISION FOR FRONT AND BACK WALLLS
    if (x > 5 || x < -5) {  
        sphereVelocity.x *= -1;  
    }

    // SPHERE COLLISION FOR FLOOR AND CEIILING
    if (y > 13 || y < 0) {  
        sphereVelocity.y *= -1;  
    }

    // SPHERE COLLISSION FOR LEFT AND RIGHT SIDES OF THE HOUSE
    if (z > 6 || z < -23) {  
        sphereVelocity.z *= -1;  
    }
    sphere.setAttribute('position', { x: x, y: y, z: z });
}
