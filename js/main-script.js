import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { VRButton } from 'three/addons/webxr/VRButton.js';
import * as Stats from 'three/addons/libs/stats.module.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

//////////////////////
/* GLOBAL VARIABLES */
//////////////////////
var camera, scene, renderer;

var geometry, material, mesh;


function addBase(obj, x, y, z) {
    'use strict';
    geometry = new THREE.BoxGeometry(2, 6, 2); 
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y , z);
    obj.add(mesh);
}

function addtower(obj, x, y, z) {
    'use strict';
    geometry = new THREE.BoxGeometry(2, 6, 2); 
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y , z);
    obj.add(mesh);
}

function addTopTower(obj, x, y, z) {
    'use strict';
    geometry = new THREE.BoxGeometry(2, 6, 2); 
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y , z);
    obj.add(mesh);
}

function addJib(obj, x, y, z) {
    'use strict';
    geometry = new THREE.BoxGeometry(2, 6, 2); 
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y , z);
    obj.add(mesh);
}

function addCounterJib(obj, x, y, z) {
    'use strict';
    geometry = new THREE.BoxGeometry(2, 6, 2); 
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y , z);
    obj.add(mesh);
}

function addCounterbalance(obj, x, y, z) {
    'use strict';
    geometry = new THREE.BoxGeometry(2, 6, 2); 
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y , z);
    obj.add(mesh);
}

function addCab(obj, x, y, z) {
    'use strict';
    geometry = new THREE.BoxGeometry(2, 6, 2); 
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y , z);
    obj.add(mesh);
}

function addBlock(obj, x, y, z) {
    'use strict';
    geometry = new THREE.BoxGeometry(2, 6, 2); 
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y , z);
    obj.add(mesh);
}

function add(obj, x, y, z) {
    'use strict';
    geometry = new THREE.BoxGeometry(2, 6, 2); 
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y , z);
    obj.add(mesh);
}


/////////////////////
/* CREATE SCENE(S) */
/////////////////////
function createScene(){
    'use strict';
    scene = new THREE.Scene();


    scene.add(new THREE.AxesHelper(10));

    //createCrane
    //createObjects
    //createBin
    createTable(0, 8, 0);
    createBall(0, 0, 15);
}

//////////////////////
/* CREATE CAMERA(S) */
//////////////////////


/////////////////////
/* CREATE LIGHT(S) */
/////////////////////

////////////////////////
/* CREATE OBJECT3D(S) */
////////////////////////

//////////////////////
/* CHECK COLLISIONS */
//////////////////////
function checkCollisions(){
    'use strict';

}

///////////////////////
/* HANDLE COLLISIONS */
///////////////////////
function handleCollisions(){
    'use strict';

}

////////////
/* UPDATE */
////////////
function update(){
    'use strict';

}

/////////////
/* DISPLAY */
/////////////
function render() {
    'use strict';

}

////////////////////////////////
/* INITIALIZE ANIMATION CYCLE */
////////////////////////////////
function init() {
    'use strict';

}

/////////////////////
/* ANIMATION CYCLE */
/////////////////////
function animate() {
    'use strict';

}

////////////////////////////
/* RESIZE WINDOW CALLBACK */
////////////////////////////
function onResize() { 
    'use strict';

}

///////////////////////
/* KEY DOWN CALLBACK */
///////////////////////
function onKeyDown(e) {
    'use strict';

}

///////////////////////
/* KEY UP CALLBACK */
///////////////////////
function onKeyUp(e){
    'use strict';
}

init();
animate();