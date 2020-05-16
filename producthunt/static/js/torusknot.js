// CONSTANTS
var CANVAS_WIDTH = 160, CANVAS_HEIGHT = 160;

// GLOBALS
var renderer, scene, camera, torusknot;
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var normMaterial = new THREE.MeshNormalMaterial();
var diffuseColor = new THREE.Color().setHSL( 0.59, 0.88, 0.5 );
var stdMaterial = new THREE.MeshStandardMaterial({color: diffuseColor, roughness: 0.5, metalness:0.1});


function init() {
    // DOM ELEMENTS
    var container = document.createElement('div');
    var domElements = document.getElementsByClassName('canvas-container');
    var domParent = domElements[0];
    domParent.appendChild(container);
    // RENDERER
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(CANVAS_WIDTH, CANVAS_HEIGHT);
    renderer.setClearColor(0x000000, 0);
    // APPEND RENDERER TO DOM ELEMENT
    container.appendChild(renderer.domElement);
    // SCENE
    var geometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
    torusknot = new THREE.Mesh(geometry, normMaterial);    
    scene.add(torusknot);    

    // LIGHTS
    // HEMISPHERE
    hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
    hemiLight.color.setHSL( 0.6, 1, 0.7 );
    hemiLight.groundColor.setHSL( 0.095, 1, 0.9 );
    hemiLight.position.set( 0, 50, 0 );
    scene.add( hemiLight );
    // hemiLightHelper = new THREE.HemisphereLightHelper( hemiLight, 10 );
    // scene.add( hemiLightHelper );
    // DIRECTIONAL
    dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
    dirLight.color.setHSL( 0.1, 1, 0.95 );
    dirLight.position.set( - 1, 1.75, 1 );
    dirLight.position.multiplyScalar( 30 );
    scene.add( dirLight );
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    var d = 50;
    dirLight.shadow.camera.left = - d;
    dirLight.shadow.camera.right = d;
    dirLight.shadow.camera.top = d;
    dirLight.shadow.camera.bottom = - d;
    dirLight.shadow.camera.far = 3500;
    dirLight.shadow.bias = - 0.0001;
    // dirLightHeper = new THREE.DirectionalLightHelper( dirLight, 10 );
    // scene.add( dirLightHeper );
    
    camera.position.z = 4.85;
    // MOUSE MOVE: Add Event Listener
    window.addEventListener('mousemove', onMouseMove, false);
}

function animate() {
    window.requestAnimationFrame(animate);
    torusknot.rotation.x += 0.01;
    torusknot.rotation.y += 0.01;
    raycaster.setFromCamera(mouse, camera);
    // Calculate objects intersecting the picking ray
    var intersects = raycaster.intersectObjects(scene.children);
    if (intersects.length == 0) {
        torusknot.material = normMaterial;
    }
    else {
        for (var i = 0; i < intersects.length; i++) {
            intersects[i].object.material = stdMaterial;
        }
    }
    renderer.render(scene, camera);
}

function setMaterial() {
    
}

function onMouseMove(event) {
    /// Calculate mouse position in normalized device coordinates
    /// (-1 to +1) for both components
    // CONTAINER DIV
    mouse.x = ( ( event.clientX - renderer.domElement.offsetLeft ) / renderer.domElement.clientWidth ) * 2 - 1;
    mouse.y = - ( ( event.clientY - renderer.domElement.offsetTop ) / renderer.domElement.clientHeight ) * 2 + 1;
    // FULLSCREEEN
    // mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    // mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
}

init();
animate();