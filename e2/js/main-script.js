import * as THREE from 'three';

var camera, scene, renderer;

var geometry, material, mesh;

var materials = [];
var materialsPequeno = [];
var materialsMedio = [];
var materialsGrande = [];
var materialsCilindro = [];

var carrossel, cilindroCentral, anelGrande, anelMedio, anelPequeno;


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

    /*getPointAt(u, optionalTarget = new THREE.Vector3()) {
        return this.getPoint(u % 1, optionalTarget);
    }*/
    /*constructor(radius = 1, segments = 50) {
        super();
        this.radius = radius;
        this.segments = segments;
    }

    getPoint(t, optionalTarget = new THREE.Vector3()) {
        const angle = t * Math.PI * 2;
        const x = Math.cos(angle) * this.radius;
        const y = 0;
        const z = Math.sin(angle) * this.radius;
        return optionalTarget.set(x, y, z);
    }*/
}

function addAnelPequeno(obj, x, y, z) {
    'use strict';

    const path = new CustomCurve( 5 );
    var geometry = new THREE.TubeGeometry(path, 50, 3, 50, true );

    materialsPequeno = [
        new THREE.MeshBasicMaterial({ color: 0xddff00, wireframe: false }),
        //new THREE.MeshLambertMaterial({ color: 0xddff00, wireframe: false }),
        //new THREE.MeshPhongMaterial({ color: 0xddff00, wireframe: false }),
        //new THREE.MeshToonMaterial({ color: 0xddff00, wireframe: false }),
        new THREE.MeshNormalMaterial({wireframe: false })
    ];

    for(let i = 0; i < materialsPequeno.length; i++) {
        var mesh = new THREE.Mesh(geometry, materialsPequeno[i]);
        mesh.position.set(x, y, z);
        obj.add(mesh); 
    }
}

function addAnelMedio(obj, x, y, z) {
    'use strict';
    const path = new CustomCurve( 11 );
    var geometry = new THREE.TubeGeometry(path, 50, 3, 50, true );

    materialsMedio = [
        new THREE.MeshBasicMaterial({ color: 0x0000dd, wireframe: false }),
        //new THREE.MeshLambertMaterial({ color: 0x0000dd, wireframe: false }),
        //new THREE.MeshPhongMaterial({ color: 0x0000dd, wireframe: false }),
        //new THREE.MeshToonMaterial({ color: 0x0000dd, wireframe: false }),
        new THREE.MeshNormalMaterial({wireframe: false })
    ];

    for(let i = 0; i < materialsMedio.length; i++) {
        var mesh = new THREE.Mesh(geometry, materialsMedio[i]);
        mesh.position.set(x, y, z);
        obj.add(mesh); 
    }
}



function addAnelGrande(obj, x, y, z) {
    'use strict';
    const path = new CustomCurve( 17 );
    var geometry = new THREE.TubeGeometry(path, 50, 3, 50, true );

    materialsGrande = [
        new THREE.MeshBasicMaterial({ color: 0xa8c7e0, wireframe: false }),
        //new THREE.MeshLambertMaterial({ color: 0x00ff00, wireframe: false }),
        //new THREE.MeshPhongMaterial({ color: 0x00ff00, wireframe: false }),
        //new THREE.MeshToonMaterial({ color: 0x00ff00, wireframe: false }),
        new THREE.MeshNormalMaterial({wireframe: false })
    ];

    for(let i = 0; i < materialsGrande.length; i++) {
        var mesh = new THREE.Mesh(geometry, materialsGrande[i]);
        mesh.position.set(x, y, z);
        obj.add(mesh); 
    }
   
}

function addCilindroCentral(obj, x, y, z) {
    'use strict';

    /*const circleShape = new THREE.Shape();

    const radius = 2;
    const height = 20;
    circleShape.moveTo(0, 0);
    circleShape.absarc(0, 0, radius, 0, Math.PI * 2, false);

    // Define the extrusion settings
    const extrudeSettings = {
        depth: height,
        bevelEnabled: false,
        steps: 1,
        curveSegments: 60,
    };

    const geometry = new THREE.ExtrudeGeometry(circleShape, extrudeSettings);*/

    const path = new StraightLineCurve( 30 );
    var geometry = new THREE.TubeGeometry(path, 50, 2, 50, true);

    materialsCilindro = [
        new THREE.MeshBasicMaterial({ color: 0xa6a6a6, wireframe: false }),
        //new THREE.MeshLambertMaterial({ color: 0xa6a6a6, wireframe: false }),
        //new THREE.MeshPhongMaterial({ color: 0xa6a6a6, wireframe: false }),
        //new THREE.MeshToonMaterial({ color: 0xa6a6a6, wireframe: false }),
        new THREE.MeshNormalMaterial({wireframe: false })
    ];

    for(let i = 0; i < materialsCilindro.length; i++) {
        var mesh = new THREE.Mesh(geometry, materialsCilindro[i]);
        mesh.position.set(x, y, z);
        obj.add(mesh);
    }
}


function createCarrossel(x, y, z) {
    'use strict';

    carrossel = new THREE.Object3D();
    cilindroCentral = new THREE.Object3D();
    anelGrande = new THREE.Object3D();
    anelMedio = new THREE.Object3D();
    anelPequeno = new THREE.Object3D();

    //var lambertMaterial = new THREE.MeshLambertMaterial({ color: 0x00ff00, wireframe: true });
    //var phongMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00, wireframe: true });
    //var toonMaterial = new THREE.MeshToonMaterial({ color: 0xffffff, wireframe: true });
    //var normalMaterial = new THREE.MeshNormalMaterial({wireframe: true });
    //materials.push(lambertMaterial);
    //materials.push(phongMaterial);
    //materials.push(toonMaterial);
    //materials.push(normalMaterial);

    //material = new THREE.MeshBasicMaterial({ color: 0xa8c7e0, wireframe: false });
    //materials.push(material);

    addCilindroCentral(cilindroCentral, 0, 15, 0);
    addAnelGrande(anelGrande, 0, 3, 0);
    addAnelMedio(anelMedio, 0, 9, 0); //6
    addAnelPequeno(anelPequeno, 0, 15, 0); // 10

    carrossel.add(cilindroCentral);
    carrossel.add(anelGrande);
    carrossel.add(anelMedio);
    carrossel.add(anelPequeno);

    /*addCilindroCentral(carrossel, 0, 4.5, 0);
    addAnelGrande(carrossel, 0, 1, 0);
    addAnelMedio(carrossel, 0, 1, 0);
    addAnelPequeno(carrossel, 0, 1, 0);*/

    scene.add(carrossel);

    carrossel.position.x = x;
    carrossel.position.y = y;
    carrossel.position.z = z;
}

function createScene() {
    'use strict';

    scene = new THREE.Scene();


    scene.add(new THREE.AxesHelper(30));

    createCarrossel(0, 0, 0);
}


function moveAnelGrande() {

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

    /*'use strict';
    camera = new THREE.OrthographicCamera(window.innerWidth / - 12,
                                        window.innerWidth / 12,
                                        window.innerHeight / 12,
                                        window.innerHeight / - 12,
                                        1,
                                        1000);
    camera.position.x = 0;
    camera.position.y = 200;
    camera.position.z = 50;
    camera.lookAt(scene.position);*/
}

function onResize() {
    'use strict';

    renderer.setSize(window.innerWidth, window.innerHeight);

    if (window.innerHeight > 0 && window.innerWidth > 0) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }

}

function onKeyDown(e) {
    'use strict';

    switch (e.keyCode) {
        case 49: // 1
            break;
        case 50: // 2
            break;
        case 51: // 3
            break;

        case 65: //A
        case 97: //a
            
            break;
        case 83:  //S
        case 115: //s
        
            break;
        case 69:  //E
        case 101: //e
            scene.traverse(function (node) {
                if (node instanceof THREE.AxesHelper) {
                    node.visible = !node.visible;
                }
            });
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
    document.body.appendChild(renderer.domElement);

    createScene();
    createCamera();

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