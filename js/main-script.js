import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { VRButton } from 'three/addons/webxr/VRButton.js';
import * as Stats from 'three/addons/libs/stats.module.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

//////////////////////
/* GLOBAL VARIABLES */
//////////////////////
var camera, frontalCamera, sideCamera, topCamera, orthographicCamera, perspectiveCamera, movablePerspectiveCamera, scene, renderer;

var geometry, material, mesh,material2;

var crane,topSection,claw,clawSection;

var object1,object2,bin;

var materials = []

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
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addTower(obj, x, y, z) {
    'use strict';
    geometry = new THREE.BoxGeometry(5, 40, 5); 
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y , z);
    obj.add(mesh);
}

function addJib(obj, x, y, z) {
    'use strict';
    geometry = new THREE.BoxGeometry(55, 5, 5); 
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y , z);
    obj.add(mesh);
}

function addCounterJib(obj, x, y, z) {
    'use strict';
    geometry = new THREE.BoxGeometry(15, 2.5, 2.5); 
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y , z);
    obj.add(mesh);
}

function addJibHolder(obj, x, y, z) {
    'use strict';
    geometry = new THREE.TetrahedronGeometry(2); 
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y , z);
    obj.add(mesh);
}

function addCounterBalance(obj, x, y, z) {
    'use strict';
    geometry = new THREE.BoxGeometry(5, 2.5, 2.5); 
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y , z);
    obj.add(mesh);
}

function addCab(obj, x, y, z) {
    'use strict';
    geometry = new THREE.BoxGeometry(7.5, 5, 7.5); 
    var mesh = new THREE.Mesh(geometry, mesh);
    mesh.position.set(x, y , z);
    obj.add(mesh);
}

function addTrolley(obj, x, y, z) {
    'use strict';
    geometry = new THREE.BoxGeometry(5, 2.5, 2.5); 
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y , z);
    obj.add(mesh);
}

function addBlock(obj, x, y, z) {
    'use strict';
    geometry = new THREE.BoxGeometry(2, 2, 2); 
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y , z);
    obj.add(mesh);
}

function addClaw(obj, x, y, z) {
    'use strict';
    geometry = new THREE.BoxGeometry(0.5, 2, 0.5); 
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y , z);
    obj.add(mesh);
}

function addSteelCable(obj, x, y, z) {
    'use strict';
    geometry = new THREE.BoxGeometry(0.5, 25, 0.5); 
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y , z);
    obj.add(mesh);
}



//objects
function createObject1(x,y,z){
    'use strict';

    object1 = new THREE.Object3D();

    var material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: false });
    var geometry = new THREE.BoxGeometry(1, 1, 1); 
    var mesh = new THREE.Mesh(geometry, material);

    materials.push(material);
    object1.add(mesh);
    object1.position.set(x, y, z);

    scene.add(object1);
}

function createObject2(x,y,z){
    'use strict';

    object2 = new THREE.Object3D();

    var material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: false });
    var geometry = new THREE.BoxGeometry(2, 1, 1); 
    var mesh = new THREE.Mesh(geometry, material);

    materials.push(material);
    object2.add(mesh);
    object2.position.set(x, y, z);

    scene.add(object2);
}

//bin
function createBin(x, y, z) {
    'use strict';

    bin = new THREE.Object3D();

    var material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: false });
    var geometry = new THREE.BoxGeometry(15, 20, 10); 
    var mesh = new THREE.Mesh(geometry, material);

    materials.push(material);
    bin.add(mesh);
    bin.position.set(x, y, z);

    scene.add(bin);
}


function createCrane(x, y, z) {
    'use strict';
    crane = new THREE.Object3D();
    topSection = new THREE.Object3D();
    claw = new THREE.Object3D();
    clawSection = new THREE.Object3D();

    material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: false });
    materials.push(material);

    //claw
    addClaw(claw , 49,21.75,0)
    addClaw(claw , 50,21.75,-1)
    addClaw(claw , 50,21.75,1)
    addClaw(claw , 51,21.75,0)

    //claw section
    clawSection.add(claw);
    addBlock(clawSection,50,22.75,0);
    addSteelCable(clawSection,50,36.25,0);
    addTrolley(clawSection,50,48.75,0);

    //top section
    topSection.position.set(20,0,-10);
    topSection.add(clawSection)
    addCab(topSection, 0, 47.5, -0);
    addCounterJib(topSection, -10, 52.5, 0);
    addCounterBalance(topSection, -12, 50 , 0);
    addJibHolder(topSection, 0, 58.5, -0);
    addJib(topSection, 25, 52.5, 0);

    addBase(crane, 20,2.5,-10);
    addTower(crane,20,25,-10);
    crane.add(topSection);
    
    
    crane.position.x = x;
    crane.position.y = y;
    crane.position.z = z;

    scene.add(crane);
}

//function restoreTopCrane() {
//    crane.position.copy(crane.userData.initialPosition);
//    crane.rotation.copy(crane.userData.initialRotation);
//}

/////////////////////
/* CREATE SCENE(S) */
/////////////////////
function createScene(){
    'use strict';
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xb8c7e0 )

    scene.add(new THREE.AxesHelper(10));

    createCrane(0,0,0);
    createObject1(35, 0, 1);
    createObject2(40,0,0);
    createBin(60,0,0);  
}




//////////////////////
/* CREATE CAMERA(S) */
//////////////////////
function createCamera() {
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

function createFrontalCamera() {
    'use strict';
    frontalCamera = new THREE.OrthographicCamera(window.innerWidth / - 12,
                                        window.innerWidth / 12,
                                        window.innerHeight / 12,
                                        window.innerHeight / - 12,
                                        1,
                                        1000);
    frontalCamera.position.x = 100;
    frontalCamera.position.y = 50;
    frontalCamera.position.z = 0;
    frontalCamera.lookAt(scene.position);
}

function createSideCamera() {
    'use strict';
    sideCamera = new THREE.OrthographicCamera(window.innerWidth / - 10,
                                        window.innerWidth / 10,
                                        window.innerHeight / 10,
                                        window.innerHeight / - 10,
                                        1,
                                        1000);
    sideCamera.position.x = 0;
    sideCamera.position.y = 30;
    sideCamera.position.z = 50;
    sideCamera.lookAt(scene.position);
}
function createTopCamera() {
    'use strict';
    topCamera = new THREE.OrthographicCamera(window.innerWidth / - 12,
                                        window.innerWidth / 12,
                                        window.innerHeight / 12,
                                        window.innerHeight / - 12,
                                        1,
                                        1000);
    topCamera.position.x = 0;
    topCamera.position.y = 120;
    topCamera.position.z = 0;
    topCamera.lookAt(scene.position);
}

function createOrthographicCamera() {
    'use strict';
    orthographicCamera = new THREE.OrthographicCamera(window.innerWidth / - 12,
                                        window.innerWidth / 12,
                                        window.innerHeight / 12,
                                        window.innerHeight / - 12,
                                        1,
                                        1000);
                                         
    orthographicCamera.position.x = 50;
    orthographicCamera.position.y = 50;
    orthographicCamera.position.z = 50;
    orthographicCamera.lookAt(scene.position);
}

function createPerspectiveCamera() {
    'use strict';
    perspectiveCamera = new THREE.PerspectiveCamera(70,
                                         window.innerWidth / window.innerHeight,
                                         1,
                                         1000);
    perspectiveCamera.position.x = 50;
    perspectiveCamera.position.y = 100;
    perspectiveCamera.position.z = -50;
    perspectiveCamera.lookAt(scene.position);
}

function createMovablePerspectiveCamera() { // ????????
    'use strict';
    movablePerspectiveCamera = new THREE.PerspectiveCamera(70,
                                         window.innerWidth / window.innerHeight,
                                         1,
                                         1000);
    movablePerspectiveCamera.position.x = 70;
    movablePerspectiveCamera.position.y = 48.75;
    movablePerspectiveCamera.position.z = -10;
    movablePerspectiveCamera.lookAt(movablePerspectiveCamera.position.x, 0, movablePerspectiveCamera.position.z);
    clawSection.add(movablePerspectiveCamera);
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
    createCamera();

    createMovablePerspectiveCamera();
    createFrontalCamera();
    createSideCamera();
    createTopCamera();
    createOrthographicCamera();
    createPerspectiveCamera();

    render();
    
    
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
}

/////////////////////
/* ANIMATION CYCLE */
/////////////////////
function animate() {
    update();
    render();
    requestAnimationFrame(animate);
    'use strict';
}

////////////////////////////
/* RESIZE WINDOW CALLBACK */
////////////////////////////
function onResize() {
    'use strict';

    renderer.setSize(window.innerWidth, window.innerHeight);

    if (window.innerHeight > 0 && window.innerWidth > 0) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }

}

///////////////////////
/* Translaction for trolley */
///////////////////////
function move_trolley(key){

    if(key == 87|| key == 119){
        if (clawSection.position.x < 0 ){
            clawSection.position.x += 1;
        }
    }

    if(key == 83|| key == 115){
        if (clawSection.position.x > -43){
            clawSection.position.x -= 1;
        }
    }

}

///////////////////////
/* KEY DOWN CALLBACK */
///////////////////////
function onKeyDown(e) {
    'use strict';

    switch (e.keyCode) {
        case 49: //frontal
            camera = frontalCamera;
            break;
        case 50: //lateral
            camera = sideCamera;
            break;
        case 51:  //topo
            camera = topCamera;
            break;
        case 52: //fixa projecao ortogonal
            camera = orthographicCamera;
            break;
        case 53:  //fixa projecao prespetiva
            camera = perspectiveCamera;
            break;
        case 54: //movel prespetiva
            camera = movablePerspectiveCamera;
            break;
        case 55: // tecla 7
            for (let i=0; i<materials.length; i++) {
                materials[i].wireframe = !materials[i].wireframe
            }
            break;
        case 81: //Q
        case 113: //q
            topSection.rotation.y += Math.PI / 90;
            break;
        
        case 65: //A
        case 97: //a
            topSection.rotation.y -= Math.PI / 90;
            break;

        case 87: //W
            move_trolley(87);
            break;
        case 119: //w
            move_trolley(119);
            break;
        case 83: //S
            move_trolley(83);
            break;
        case 115: //s
            move_trolley(115);  
            break;
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

//////////
/* HUD */
/////////

// Criar o elemento para o HUD
var hud = document.createElement('div');
hud.id = 'hud';
hud.style.position = 'fixed';
hud.style.top = '10px';
hud.style.left = '10px';
hud.style.fontFamily = 'Arial, sans-serif';
hud.style.fontSize = '18px';
hud.style.color = 'white';
hud.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
hud.style.padding = '10px';
document.body.appendChild(hud);

// Objeto para rastrear as teclas pressionadas
var keysPressed = {};

// Atualizar o HUD com as teclas pressionadas
function updateHUD() {
    hud.textContent = "Teclas pressionadas: " + Object.keys(keysPressed).join(', ');
}

// Event listener para quando uma tecla é pressionada
window.addEventListener('keydown', function(event) {
    keysPressed[event.key] = true;
    updateHUD();
});

// Event listener para quando uma tecla é solta
window.addEventListener('keyup', function(event) {
    delete keysPressed[event.key];
    updateHUD();
});

const gui = new GUI();

const folder = gui.addFolder('Câmaras');
folder.add({ 1: 'frontal' }, '1').name('1');
folder.add({ 2: 'lateral' }, '2').name('2');
folder.add({ 3: 'topo' }, '3').name('3');
folder.add({ 4: 'projeção ortogonal' }, '4').name('4');
folder.add({ 5: 'projeção prespetiva' }, '5').name('5');
folder.add({ 6: 'móvel' }, '6').name('6');

const folder1 = gui.addFolder('Q(q) e A(a) - rotação da secção superior');
folder1.add({ info: 'q- rotação contra-relógio a- rotação sentido relógio' }, 'info').name('Info');

const folder2 = gui.addFolder('W(w) e S(s) - translação do trolley');
folder2.add({ info: 'w- frente s-trás' }, 'info').name('Info');


const folder3 = gui.addFolder('E(e) e D(d) - translação do gancho');
folder3.add({ info: 'Additional information about hook translation' }, 'info').name('Info');


const folder4 = gui.addFolder('R(r) e F(f) - abertura e fecho da garra');
folder4.add({ info: 'Additional information about hook translation' }, 'info').name('Info');

gui.open();





///////////////////////
/* KEY UP CALLBACK */
///////////////////////
function onKeyUp(e){
    'use strict';
}

init();
animate();