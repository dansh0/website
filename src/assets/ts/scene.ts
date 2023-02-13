import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

/* eslint-disable */

// scene
const scene = new THREE.Scene();

// camera
const canvasWidth = window.innerWidth;
const canvasHeight = window.innerHeight;
const multiplier = 200;
const camera = new THREE.OrthographicCamera(canvasWidth/-multiplier,canvasWidth/multiplier,canvasHeight/multiplier,canvasHeight/-multiplier,0.254,50)

// renderer
const renderer = new THREE.WebGLRenderer();
renderer.setClearColor (0x444444, 1);
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// controls
const controls = new OrbitControls( camera, renderer.domElement );
controls.enablePan = false;
controls.mouseButtons = {
    RIGHT: THREE.MOUSE.ROTATE
}

// textures & materials
const loadManager = new THREE.LoadingManager();
const loader = new THREE.TextureLoader(loadManager);

const faces: { [key: string]: THREE.MeshPhongMaterial } = {
    "black": new THREE.MeshPhongMaterial({map: loader.load( "/textures/textures_black.png" )}),
    "blue": new THREE.MeshPhongMaterial({map: loader.load( "/textures/textures_blue.png" )}),
    "green": new THREE.MeshPhongMaterial({map: loader.load( "/textures/textures_green.png" )}),
    "orange": new THREE.MeshPhongMaterial({map: loader.load( "/textures/textures_orange.png" )}),
    "red": new THREE.MeshPhongMaterial({map: loader.load( "/textures/textures_red.png" )}),
    "white": new THREE.MeshPhongMaterial({map: loader.load( "/textures/textures_white.png" )}),
    "yellow": new THREE.MeshPhongMaterial({map: loader.load( "/textures/textures_yellow.png" )})
}

Object.keys(faces).forEach(mat => {
    faces[mat].map!.anisotropy = 16;
    faces[mat].shininess = 100;
    // faces[mat].color = 0x996633;
    // faces[mat].specular = 0x050505;
})

// grid positions
const xPos = [...Array(3).keys()];
const yPos = [...Array(3).keys()];
const zPos = [...Array(3).keys()];

// map faces to indices
const xNegColor = [faces.green, faces.black, faces.black]
const xPosColor = [faces.black, faces.black, faces.blue]
const yNegColor = [faces.orange, faces.black, faces.black]
const yPosColor = [faces.black, faces.black, faces.red]
const zNegColor = [faces.white, faces.black, faces.black]
const zPosColor = [faces.black, faces.black, faces.yellow]

// prepare geometry
const cubes = []
const geometry = new THREE.BoxGeometry();

// generate mesh and add to scene
loadManager.onLoad = () => {

    // let matArray = [faces.green, faces.yellow, faces.white, faces.blue, faces.orange, faces.red]

    xPos.forEach(i => {
        yPos.forEach(j => {
            zPos.forEach(k => {

                // set face definition
                let matArray = [
                    xPosColor[i],
                    xNegColor[i],
                    yPosColor[j],
                    yNegColor[j],
                    zPosColor[k],
                    zNegColor[k]
                ]

                let index = i*3+j*3+k
                let mesh = new THREE.Mesh( geometry, matArray );
                let cube = {
                    mesh: mesh,
                    material: faces.blue,
                    xPos: 1.05*(i-1),
                    yPos: 1.05*(j-1),
                    zPos: 1.05*(k-1),
                    // color: colorArray[index],
                    index: index
                }
                console.log(cube)
                cube.mesh.translateX(cube.xPos)
                cube.mesh.translateY(cube.yPos)
                cube.mesh.translateZ(cube.zPos)
                scene.add( cube.mesh );
            })
        })
    })
}

// lighting
const light = new THREE.PointLight( 0xffffff, 75, 100 );
light.position.set( 50, 50, 50 );
scene.add( light );

const light2 = new THREE.PointLight( 0xffffff, 75, 100 );
light2.position.set( -50, -50, -50 );
scene.add( light2 );

// finalize
camera.position.z = 5;
camera.position.x = 5;
camera.position.y = 2;

controls.update();

// animate
function animate() {
    requestAnimationFrame( animate );
    controls.update();
    renderer.render( scene, camera );
}

// action!
animate();