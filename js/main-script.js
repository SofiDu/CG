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
    geometry = new THREE.TetrahedronGeometry(2); 
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

function addCounterBalance(obj, x, y, z) {
    'use strict';
    geometry = new THREE.BoxGeometry(5, 2.5, 2.5); 
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y , z);
    obj.add(mesh);
}

function addCab(obj, x, y, z) {
    'use strict';
    geometry = new THREE.BoxGeometry(7.5, 5, 7.5); 
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y , z);
    obj.add(mesh);
}

function addTrolley(obj, x, y, z) {
    'use strict';
    geometry = new THREE.BoxGeometry(5, 2.5, 2.5); 
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y , z);
    obj.add(mesh);
}

function addBlock(obj, x, y, z) {
    'use strict';
    geometry = new THREE.BoxGeometry(2, 2, 2); 
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y , z);
    obj.add(mesh);
}

function addClaw(obj, x, y, z) {
    'use strict';
    geometry = new THREE.BoxGeometry(0.5, 2, 0.5); 
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y , z);
    obj.add(mesh);
}

function addSteelCable(obj, x, y, z) {
    'use strict';
    geometry = new THREE.BoxGeometry(0.5, 25, 0.5); 
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y , z);
    obj.add(mesh);
}

//new group para juntar
//rotation 
//position


//objects
function createObject1(x,y,z){
    'use strict';

    var object = new THREE.Object3D();

    material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
    geometry = new THREE.BoxGeometry(1, 1, 1); 
    mesh = new THREE.Mesh(geometry, material);

    object.add(mesh);
    object.position.set(x, y, z);

    scene.add(object);
}

function createObject2(x,y,z){
    'use strict';

    var object = new THREE.Object3D();

    var material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
    var geometry = new THREE.BoxGeometry(2, 1, 1); 
    var mesh = new THREE.Mesh(geometry, material);

    object.add(mesh);
    object.position.set(x, y, z);

    scene.add(object);
}

//bin
function createBin(x, y, z) {
    'use strict';

    var bin = new THREE.Object3D();

    var material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
    var geometry = new THREE.BoxGeometry(15, 20, 10); 
    var mesh = new THREE.Mesh(geometry, material);

    bin.add(mesh);
    bin.position.set(x, y, z);

    scene.add(bin);
}


function createCrane(x, y, z) {
    'use strict';
    var crane = new THREE.Object3D();
    var topSection = new THREE.Object3D();
    var claw = new THREE.Object3D();
    var clawSection = new THREE.Object3D();

    material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });

    //claw
    addClaw(claw , 68,22.75,-10)
    addClaw(claw , 70,22.75,-12)
    addClaw(claw , 70,22.75,-8)
    addClaw(claw , 72,22.75,-10)

    //claw section
    clawSection.add(claw);
    addBlock(clawSection,70,22.75,-10);
    addSteelCable(clawSection,70,36.25,-10);
    addTrolley(clawSection,70,48.75,-10);

    //top section
    topSection.add(clawSection)
    addCab(topSection, 20, 47.5, -10);
    addCounterJib(topSection, 10, 52.5, -10);
    addCounterBalance(topSection, 8, 50 , -1);
    addJibHolder(topSection, 20, 58.5, -10);
    addJib(topSection, 45, 52.5, -10);

    crane.add(topSection);
    addBase(crane, 20,2.5,-10);
    addTower(crane,20,25,-10);
    crane.add(topSection);
    
    crane.position.x = x;
    crane.position.y = y;
    crane.position.z = z;
}


/////////////////////
/* CREATE SCENE(S) */
/////////////////////
function createScene(){
    'use strict';
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xb8c7e0 )

    scene.add(new THREE.AxesHelper(10));

    createCrane(0,0,0); //mudar se necessario
    createObject1(35, 0, 1);
    createObject2(40,0,0);
    createBin(60,0,0);  
}

//////////////////////
/* CREATE CAMERA(S) */
//////////////////////
function createCameraPerspective() {
    'use strict';
    camera = new THREE.PerspectiveCamera(70,
                                         window.innerWidth / window.innerHeight,
                                         1,
                                         1000);
    camera.position.x = 50;
    camera.position.y = 50;
    camera.position.z = 50;
    camera.lookAt(scene.position);
}

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
    renderer.render(scene, camera);

}

////////////////////////////////
/* INITIALIZE ANIMATION CYCLE */
////////////////////////////////
function init() {
    'use strict';
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    createScene();
    createCameraPerspective();

    render();

    window.addEventListener("keydown", onKeyDown);
    //window.addEventListener("resize", onResize);
}

/////////////////////
/* ANIMATION CYCLE */
/////////////////////
function animate() {
    render();
    requestAnimationFrame(animate);
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
}

///////////////////////
/* KEY UP CALLBACK */
///////////////////////
function onKeyUp(e){
    'use strict';
}

init();
animate();