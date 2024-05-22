import * as THREE from 'three';
import { ParametricGeometry } from 'three/addons/geometries/ParametricGeometry.js';
import { ParametricGeometries } from 'three/addons/geometries/ParametricGeometries.js';
var camera, scene, renderer;

var materials = [
    new THREE.MeshBasicMaterial({ color: 0x0000dd, wireframe: false }),
    new THREE.MeshLambertMaterial({ color: 0x0000dd, wireframe: false }),
    new THREE.MeshPhongMaterial({ color: 0x0000dd, wireframe: false }),
    new THREE.MeshToonMaterial({ color: 0x0000dd, wireframe: false }),
    new THREE.MeshNormalMaterial({ wireframe: false })
];

var materialsCilindro = [
    new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: false }),
    new THREE.MeshLambertMaterial({ color: 0xffffff, wireframe: false }),
    new THREE.MeshPhongMaterial({ color: 0xffffff, wireframe: false }),
    new THREE.MeshToonMaterial({ color: 0xffffff, wireframe: false }),
    new THREE.MeshNormalMaterial({wireframe: false })
];

var materialsPequeno = [];
var materialsMedio = [];
var materialsGrande = [];
var objects = [];

var carrossel, cilindroCentral, anelGrande, anelMedio, anelPequeno;

var isMovingAnelGrande = false;
var isMovingAnelMedio = false;
var isMovingAnelPequeno = false;
var moveUpAnelGrande = true;
var moveUpAnelMedio = true;
var moveUpAnelPequeno = true;

var clock = new THREE.Clock();

// ------------       parametric functions      ------------------- //

const f1 = function (u, v, target) { // torus shape
    var x = (6+Math.cos(u*2*Math.PI))*Math.cos(v*2*Math.PI);
    var y = (3+Math.cos(u*2*Math.PI))*Math.sin(v*2*Math.PI);
    var z = Math.sin(u*2*Math.PI);

    target.set(x,y,z);
};

const f2 = function (u, v, target) { // crown

    var x = Math.cos(u*v*2.5*Math.PI)*5;
    var z = Math.sin(v*u*2.5*Math.PI)*5;
    var y = Math.sin(v*u*20*Math.PI)*2;

    target.set(x, y, z);
};

const f3 = function (u, v, target) { // twisty cone
    var h = 8
    var r = 3
    var x = (h - u*h-3)*(r/h)*Math.cos(v*2*Math.PI);
    var y = (h - u*h)*(r/h)*Math.sin(v*2*Math.PI);
    var z = u*h;

    target.set(x,y,z);
}
const f4 = function (u, v, target) { // bulb 
    var r = 2+Math.sin(6*Math.PI*v);
    var x = r*Math.cos(5*Math.PI*u)*Math.sin(4*Math.PI*v);
    var y = r*Math.sin(5*Math.PI*u)*Math.sin(4*Math.PI*v);
    var z = r*Math.cos(Math.PI*v);
    target.set(x,y,z);
}

const f5 = function (u, v, target) { // the eye
    var radius = 1; 
    var twist = 2; 
    var angle = u * Math.PI * 2 * twist;
    var spiralFactor = 10; 
    var spiralHeight = v * spiralFactor; 
    var x = (radius * Math.cos(angle)) * Math.cos(v * Math.PI);
    var y = (spiralHeight * Math.cos(angle)) * Math.sin(v * Math.PI);
    var z = spiralHeight * Math.sin(angle);
    target.set(x,y,z);
}

const f6 = function (u, v, target) { // tower of hanoi
    var x = Math.sin(u*6*Math.PI) * (Math.cos(v*2*Math.PI) + 3);
    var y = Math.cos(u*6*Math.PI) * (Math.cos(v*2*Math.PI) + 3);
    var z = Math.sin(v*6*Math.PI) + Math.cos(v*2*Math.PI);
    target.set(x, y, z);
}

const f7 = function (u, v, target) { // helix
    var a = 2;
    var x = v*2*Math.PI * Math.cos(u*4*Math.PI);
    var z = v*2*Math.PI * Math.sin(u*4*Math.PI);
    var y = a * u*2*Math.PI;
    target.set(x, y, z);
}

// -----------------         parametric functions end       --------------- //

class CustomCurve extends THREE.Curve {

	constructor( scale = 1 ) {
		super();
		this.scale = scale;
	}

	getPoint( t, optionalTarget = new THREE.Vector3() ) {

        const tx = Math.sin( 2 * Math.PI * t );
		const ty = 0;
		const tz = Math.cos( 2 * Math.PI * t );;

		return optionalTarget.set( tx, ty, tz ).multiplyScalar( this.scale );
	}
}

class StraightLineCurve extends THREE.Curve {
    constructor(height = 1) {
        super();
        this.height = height;
    }

    getPoint(t, optionalTarget = new THREE.Vector3()) {
        const x = 0;
        const y = (t - 0.5) * this.height;
        const z = 0;

        return optionalTarget.set(x, y, z);
    }
}

function addShapes(obj, r) {
    var material = new THREE.MeshLambertMaterial( { color: 0xff00ff } );
    materials.push(material);
    

    var geo1 = new ParametricGeometry( f1, 25, 25 );
    var obj1 = new THREE.Mesh(geo1,material);
    obj1.position.set(r,8,0);
    var scalef = Math.random()*0.1+0.1
    obj1.scale.set(scalef,scalef,scalef)
    obj1.rotation.y = Math.random()*Math.PI*2
    obj.add(obj1);
    objects.push(obj1);
    var sl1 = new THREE.SpotLight( 0xffffff );
    sl1.intensity = 2;
    sl1.angle = Math.PI/2
    sl1.position.set(r, 5, 0)
    sl1.target = obj1;
    obj.add(sl1);

    var geo2 = new ParametricGeometry( f2, 25, 25 );
    var obj2 = new THREE.Mesh(geo2,material);
    obj2.position.set(r*0.7,8,r*0.7);
    var scalef = Math.random()*0.2+0.2
    obj2.scale.set(scalef,scalef,scalef)
    obj2.rotation.y = Math.random()*Math.PI*2
    obj.add(obj2);
    objects.push(obj2);
    var sl2 = new THREE.SpotLight( 0xffffff );
    sl2.intensity = 2;
    sl2.angle = Math.PI/2
    sl2.position.set(r*0.7, 5, r*0.7)
    sl2.target = obj2;
    obj.add(sl2);   
    
    var geo3 = new ParametricGeometry( f3, 25, 25 );
    var obj3 = new THREE.Mesh(geo3,material);
    obj3.position.set(0,8,r);
    var scalef = Math.random()*0.2+0.2
    obj3.scale.set(scalef,scalef,scalef)
    obj3.rotation.y = Math.random()*Math.PI*2
    obj.add(obj3);
    objects.push(obj3);
    var sl3 = new THREE.SpotLight( 0xffffff );
    sl3.intensity = 2;
    sl3.angle = Math.PI/2
    sl3.position.set(0, 5, r)
    sl3.target = obj3;
    obj.add(sl3);    

    var geo4 = new ParametricGeometry( f4, 25, 25 );
    var obj4 = new THREE.Mesh(geo4,material);
    obj4.position.set(-r*0.7,8,r*0.7);
    var scalef = Math.random()*0.2+0.2
    obj4.scale.set(scalef,scalef,scalef)
    obj4.rotation.y = Math.random()*Math.PI*2
    obj.add(obj4);
    objects.push(obj4);
    var sl4 = new THREE.SpotLight( 0xffffff );
    sl4.intensity = 2;
    sl4.angle = Math.PI/2
    sl4.position.set(-r*0.7,5,r*0.7)
    sl4.target = obj4;
    obj.add(sl4);    

    var geo5 = new ParametricGeometry( f5, 25, 25 );
    var obj5 = new THREE.Mesh(geo5,material);
    obj5.position.set(-r,8,0);
    var scalef = Math.random()*0.2+0.2
    obj5.scale.set(scalef,scalef,scalef)
    obj5.rotation.y = Math.random()*Math.PI*2
    obj.add(obj5);
    objects.push(obj5);
    var sl5 = new THREE.SpotLight( 0xffffff );
    sl5.intensity = 2;
    sl5.angle = Math.PI/2
    sl5.position.set(-r,5,0)
    sl5.target = obj5;
    obj.add(sl5);    

    var geo6 = new ParametricGeometry( f6, 25, 25 );
    var obj6 = new THREE.Mesh(geo6,material);
    obj6.position.set(-r*0.7,8,-r*0.7);
    var scalef = Math.random()*0.2+0.2
    obj6.scale.set(scalef,scalef,scalef)
    obj6.rotation.y = Math.random()*Math.PI*2
    obj.add(obj6);
    objects.push(obj6);
    var sl6 = new THREE.SpotLight( 0xffffff );
    sl6.intensity = 2;
    sl6.angle = Math.PI/2
    sl6.position.set(-r*0.7,5,-r*0.7)
    sl6.target = obj6;
    obj.add(sl6);    

    var geo7 = new ParametricGeometry( f7, 25, 25 );
    var obj7 = new THREE.Mesh(geo7,material);
    obj7.position.set(0,8,-r);
    var scalef = Math.random()*0.2+0.2
    obj7.scale.set(scalef,scalef,scalef)
    obj7.rotation.y = Math.random()*Math.PI*2
    obj.add(obj7);
    objects.push(obj7);
    var sl7 = new THREE.SpotLight( 0xffffff );
    sl7.intensity = 2;
    sl7.angle = Math.PI/2
    sl7.position.set(0,5,-r)
    sl7.target = obj7;
    obj.add(sl7);    

    var geo8 = new ParametricGeometry( ParametricGeometries.klein, 25, 25 );
    var obj8 = new THREE.Mesh(geo8,material);
    obj8.position.set(r*0.7,8,-r*0.7);
    var scalef = Math.random()*0.2+0.1
    obj8.scale.set(scalef,scalef,scalef)
    obj8.rotation.y = Math.random()*Math.PI*2
    obj.add(obj8);
    objects.push(obj8);
    var sl8 = new THREE.SpotLight( 0xffffff );
    sl8.intensity = 2;
    sl8.angle = Math.PI/2
    sl8.position.set(r*0.7,5,-r*0.7)
    sl8.target = obj8;
    obj.add(sl8);    
}

function addAnelPequeno(obj, x, y, z) {
    'use strict';

    const path = new CustomCurve(5);
    var geometry = new THREE.TubeGeometry(path, 50, 3, 50, true);

    var mesh = new THREE.Mesh(geometry, materials[1]);
    mesh.position.set(x, y, z);
    obj.add(mesh);

    obj.userData = { mesh: mesh, materials: materials, currentMaterialIndex: 1 };
}

function addAnelMedio(obj, x, y, z) {
    'use strict';
    const path = new CustomCurve( 11 );
    var geometry = new THREE.TubeGeometry(path, 50, 3, 50, true );

    var mesh = new THREE.Mesh(geometry, materials[1]);
    mesh.position.set(x, y, z);
    obj.add(mesh);

    // Armazena referência para o mesh e materiais
    obj.userData = { mesh: mesh, materials: materials, currentMaterialIndex: 1 };
}



function addAnelGrande(obj, x, y, z) {
    'use strict';
    const path = new CustomCurve( 17 );
    var geometry = new THREE.TubeGeometry(path, 50, 3, 50, true );

    var mesh = new THREE.Mesh(geometry, materials[1]);
    mesh.position.set(x, y, z);
    obj.add(mesh);

    obj.userData = { mesh: mesh, materials: materials, currentMaterialIndex: 1 };
   
}

function addCilindroCentral(obj, x, y, z) {
    'use strict';

    const path = new StraightLineCurve( 30 );
    var geometry = new THREE.TubeGeometry(path, 50, 2, 50, true);

    var mesh = new THREE.Mesh(geometry, materialsCilindro[1]);
    mesh.position.set(x, y, z);
    obj.add(mesh);

    obj.userData = { mesh: mesh, materials: materialsCilindro, currentMaterialIndex: 1 };
}

function createSkydome(x, y, z) {
    var geometry = new THREE.SphereGeometry( 200, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);

    var texture = new THREE.TextureLoader().load('textures/Skydome.jpg'); 

    var material = new THREE.MeshBasicMaterial( { map:texture, side: THREE.DoubleSide } );
    //transparent: true, opacity: 0.5
    //var material = new THREE.MeshBasicMaterial( { color: 0xffff00 } ); 
    var sphere = new THREE.Mesh( geometry, material );
    scene.add( sphere );

    sphere.position.x = x;
    sphere.position.y = y;
    sphere.position.z = z;
}


function createCarrossel(x, y, z) {
    'use strict';

    carrossel = new THREE.Object3D();
    cilindroCentral = new THREE.Object3D();
    anelGrande = new THREE.Object3D();
    anelMedio = new THREE.Object3D();
    anelPequeno = new THREE.Object3D();

    addCilindroCentral(cilindroCentral, 0, 15, 0);
    addAnelGrande(anelGrande, 0, 3, 0);
    addAnelMedio(anelMedio, 0, 9, 0);
    addAnelPequeno(anelPequeno, 0, 15, 0);

    carrossel.add(cilindroCentral);
    carrossel.add(anelGrande);
    carrossel.add(anelMedio);
    carrossel.add(anelPequeno);

    scene.add(carrossel);

    carrossel.position.x = x;
    carrossel.position.y = y;
    carrossel.position.z = z;
}

function switchMaterialAux(obj, materialIndex) {
    obj.userData.currentMaterialIndex = materialIndex;
    obj.userData.mesh.material = obj.userData.materials[materialIndex];
    obj.userData.mesh.material.needsUpdate = true;
}

function switchMaterial(materialIndex) {
    scene.traverse(function(child) {
        if (child.userData && child.userData.materials) {
            switchMaterialAux(child, materialIndex); 
        }
    });
}


function createScene() {
    'use strict';

    scene = new THREE.Scene();


    scene.add(new THREE.AxesHelper(30));

    createCarrossel(0, 0, 0);
    addShapes(anelGrande, 17);
    addShapes(anelMedio, 11);
    addShapes(anelPequeno, 5);
    createSkydome(0, 0, 0);
}



///////////////
// ROTATIONS //
///////////////

function rotateCilindroCentral(delta) {
    cilindroCentral.rotation.y += 2 * delta;
}

function rotateAnelGrande(delta) {
    anelGrande.rotation.y += 0.5 * delta;
}

function rotateAnelMedio(delta) {
    anelMedio.rotation.y += 2 * delta;
}

function rotateAnelPequeno(delta) {
    anelPequeno.rotation.y += 1 * delta;
}



///////////////
// MOVEMENTS //
///////////////

function moveAnelGrande(delta) {
    if (isMovingAnelGrande) {
        if (moveUpAnelGrande) {
            anelGrande.position.y += 16 * delta;
            //carrossel.children[1].position.y += 16 * delta;
            if (anelGrande.position.y >= 24) {
                moveUpAnelGrande = false;
            }
        } else {
            anelGrande.position.y -= 16 * delta;
            //carrossel.children[1].position.y -= 16 * delta;
            if (anelGrande.position.y <= 0) {
                moveUpAnelGrande = true;
            }
        }
    }
}

function moveAnelMedio(delta) {
    if (isMovingAnelMedio) {
        if (moveUpAnelMedio) {
            anelMedio.position.y += 16 * delta;
            //carrossel.children[2].position.y += 16 * delta;
            if (anelMedio.position.y >= 18) {
                moveUpAnelMedio = false;
            }
        } else {
            anelMedio.position.y -=16 * delta;
            //carrossel.children[2].position.y -= 16 * delta;
            if (anelMedio.position.y <= -6) {
                moveUpAnelMedio = true;
            }
        }
    }
}

function moveAnelPequeno(delta) {
    if (isMovingAnelPequeno) {
        if (moveUpAnelPequeno) {
            anelPequeno.position.y += 16 * delta;
            //carrossel.children[3].position.y += 16 * delta;
            if (anelPequeno.position.y >= 12) {
                moveUpAnelPequeno = false;
            }
        } else {
            anelPequeno.position.y -= 16 * delta;
            //carrossel.children[3].position.y -= 16 * delta;
            if (anelPequeno.position.y <= -12) {
                moveUpAnelPequeno = true;
            }
        }
    }
}



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


function onResize() {
    'use strict';

    renderer.setSize(window.innerWidth, window.innerHeight);

    if (window.innerHeight > 0 && window.innerWidth > 0) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }

}


/////////////////////
/* CREATE LIGHT(S) */
/////////////////////
function createdirectionalLight() {
    'use strict';
    var directionalLight = new THREE.DirectionalLight( 0xffffff, 1);
    scene.add( directionalLight );
    directionalLight.position.set(1, 100, 200);
}


function createAmbientLight() {
    'use strict';
    var ambientLight = new THREE.AmbientLight(0xff7f00, 0.4); 
    scene.add(ambientLight);
}


function onKeyDown(e) {
    'use strict';

    switch (e.keyCode) {
        case 49: // 1
            isMovingAnelGrande = true;
            break;
        case 50: // 2
            isMovingAnelMedio = true;
            break;
        case 51: // 3
            isMovingAnelPequeno = true;
            break;

        case 68: //D
            directionalLight.visible = !directionalLight.visible;
            break;
        case 100: //d
            directionalLight.visible = !directionalLight.visible;
            break;
        case 81:  //Q  (Gouraud(diffuse))
            switchMaterial(1); 
            break;
        case 113:  //q  (Gouraud(diffuse))
            switchMaterial(1); 
            break;

        case 87:  //W  (Phong)
            switchMaterial(2); 
            break;

        case 110:  //w  (Phong)
            switchMaterial(2); 
            break;

        case 69:  //E  (Cartoon)
            switchMaterial(3); 
            break;

        case 101:  //e  (Catrtoon)
            switchMaterial(3); 
            break;

        case 82:  //R  (NormalMap)
            switchMaterial(4); 
            break;

        case 114:  //r  (NormalMap)
            switchMaterial(4); 
            break;

        case 84:  //T  (BasicMaterial)
            switchMaterial(0);
            break;

        case 116:  //t  (BasicMaterial)
            switchMaterial(0);
            break;

    }
    
}

function onKeyUp(e) {
    switch (e.keyCode) {
        case 49: // 1
            isMovingAnelGrande = false;
            break;
        case 50: // 2
            isMovingAnelMedio = false;
            break;
        case 51: // 3
            isMovingAnelPequeno = false;
            break;
    }
}

function render() {
    'use strict';
    renderer.render(scene, camera);
}

function init() {
    'use strict';
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xd3d3d3);
    document.body.appendChild(renderer.domElement);

    createScene();
    createCamera();
    createdirectionalLight();
    createAmbientLight();

    render();

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("resize", onResize);
}

function animate() {
    'use strict';
    var delta = clock.getDelta();

    moveAnelGrande(delta);
    moveAnelMedio(delta);
    moveAnelPequeno(delta);

    rotateCilindroCentral(delta);
    rotateAnelGrande(delta);
    rotateAnelMedio(delta);
    rotateAnelPequeno(delta);

    render();

    requestAnimationFrame(animate);
}

init();
animate();
