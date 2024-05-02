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


/*
. As peças são as seguintes: (i) base da grua, (ii) torre metálica com
porta-lanças, (iii) contra-lança e lança, (iv) contra-peso, (v) tirantes sobre a contra-lança e sobre
a lança, (vi) cabine, (vii) carrinho de translação, (viii) cabo de aço conectado a bloco do gancho, e
(xix) uma garra articulável de 4 dedos aguçados (em vez do gancho) (Figura 1 (B)).

*/

//crane

function addBase(obj, x, y, z) {
    'use strict';
    geometry = new THREE.BoxGeometry(10, 5, 7.5); 
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addTower(obj, x, y, z) {
    'use strict';
    geometry = new THREE.BoxGeometry(5, 40, 5); 
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y , z);
    obj.add(mesh);
}

function addJib(obj, x, y, z) {
    'use strict';
    geometry = new THREE.BoxGeometry(55, 5, 5); 
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y , z);
    obj.add(mesh);
}

function addCounterJib(obj, x, y, z) {
    'use strict';
    geometry = new THREE.BoxGeometry(15, 2.5, 2.5); 
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y , z);
    obj.add(mesh);
}

function addJibHolder(obj, x, y, z) {
    'use strict';
    geometry = new THREE.TeGeometry(2, 6, 2); 
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y , z);
    obj.add(mesh);
}

function addJibTle(obj, x, y, z) {
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

function addTrolley(obj, x, y, z) {
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

function addHook(obj, x, y, z) {
    'use strict';
    geometry = new THREE.BoxGeometry(2, 6, 2); 
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y , z);
    obj.add(mesh);
}

function addSteelCable(obj, x, y, z) {
    'use strict';
    geometry = new THREE.BoxGeometry(2, 6, 2); 
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y , z);
    obj.add(mesh);
}

//objects

//bin

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

    switch (e.keyCode) {
        case 1: //frontal
        case 2: //lateral
            scene.traverse(function (node) {
                if (node instanceof THREE.Mesh) {
                    node.material.wireframe = !node.material.wireframe;
                }
            });
            break;
        case 3:  //topo
        case 4: //fixa projecao ortogonal
            ball.userData.jumping = !ball.userData.jumping;
            break;
        case 5:  //fixa projecao prespetiva
        case 6: //movel prespetiva
            scene.traverse(function (node) {
                if (node instanceof THREE.AxesHelper) {
                    node.visible = !node.visible;
                }
            });
            break;
        }
        case 81: //Q

        case 113: //q
        

        case 65: //A

        case 97: //a

        case 87: //W

        case 119: //w

        case 83: //S

        case 115: //s

        case 69: //E

        case 101: //e

        case 68: //D

        case 100: //d

        case 82: //R

        case 114: //r

        case 70: //F

        case 102: //f
}

///////////////////////
/* KEY UP CALLBACK */
///////////////////////
function onKeyUp(e){
    'use strict';
}

init();
animate();