import * as THREE from 'three';

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


var carrossel, cilindroCentral, anelGrande, anelMedio, anelPequeno;

var directionalLight, ambientLight;


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


function createCarrossel(x, y, z) {
    'use strict';

    carrossel = new THREE.Object3D();
    cilindroCentral = new THREE.Object3D();
    anelGrande = new THREE.Object3D();
    anelMedio = new THREE.Object3D();
    anelPequeno = new THREE.Object3D();

    addCilindroCentral(cilindroCentral, 0, 15, 0);
    addAnelGrande(anelGrande, 0, 3, 0);
    addAnelMedio(anelMedio, 0, 9, 0); //6
    addAnelPequeno(anelPequeno, 0, 15, 0); // 10

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
}


function createCamera() {
    'use strict';
    camera = new THREE.PerspectiveCamera(70,
                                         window.innerWidth / window.innerHeight,
                                         1,
                                         1000);
    camera.position.x = 40;
    camera.position.y = 40;
    camera.position.z = 40;
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
    directionalLight = new THREE.DirectionalLight( 0xffffff, 1);
    scene.add( directionalLight );
    directionalLight.position.set(1, 100, 200);
}


function createAmbientLight() {
    'use strict';
    ambientLight = new THREE.AmbientLight(0xff7f00, 0.4); 
    scene.add(ambientLight);
}


function onKeyDown(e) {
    'use strict';

    switch (e.keyCode) {    
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
    window.addEventListener("resize", onResize);
}

function animate() {
    'use strict';

    render();

    requestAnimationFrame(animate);
}

init();
animate();