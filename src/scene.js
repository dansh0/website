import * as THREE from "https://cdn.jsdelivr.net/npm/three@v0.108.0/build/three.module.js";
import {OrbitControls} from "https://cdn.jsdelivr.net/npm/three@v0.108.0/examples/jsm/controls/OrbitControls.js";

class Scene {
    
    constructor() {
        this.scene = undefined;
        this.camera = undefined;
        this.renderer = undefined;
        this.controls = undefined;
        this.init()
    }


	init() {

		let self = this;

		// scene
		this.scene = new THREE.Scene();
		let scene = this.scene;

		// camera
		let canvasWidth = window.innerWidth;
		let canvasHeight = window.innerHeight;
		let multiplier = 200;
		this.camera = new THREE.OrthographicCamera(canvasWidth/-multiplier,canvasWidth/multiplier,canvasHeight/multiplier,canvasHeight/-multiplier,0.254,50)
		let camera = this.camera;

		// renderer
		this.renderer = new THREE.WebGLRenderer();
		this.renderer.setClearColor (0x444444, 1);
		this.renderer.setSize( window.innerWidth, window.innerHeight );
		document.body.appendChild( this.renderer.domElement );
		let renderer = this.renderer;

		// controls
		this.controls = new OrbitControls( this.camera, this.renderer.domElement );
		this.controls.enablePan = false;
		this.controls.mouseButtons = {
			RIGHT: THREE.MOUSE.ROTATE
		}
		let controls = this.controls;

		// textures & materials
		const loadManager = new THREE.LoadingManager();
		const loader = new THREE.TextureLoader(loadManager);

		let faces = {
			black: new THREE.MeshPhongMaterial({map: loader.load( "src/resources/textures/textures_black.png" )}),
			blue: new THREE.MeshPhongMaterial({map: loader.load( "src/resources/textures/textures_blue.png" )}),
			green: new THREE.MeshPhongMaterial({map: loader.load( "src/resources/textures/textures_green.png" )}),
			orange: new THREE.MeshPhongMaterial({map: loader.load( "src/resources/textures/textures_orange.png" )}),
			red: new THREE.MeshPhongMaterial({map: loader.load( "src/resources/textures/textures_red.png" )}),
			white: new THREE.MeshPhongMaterial({map: loader.load( "src/resources/textures/textures_white.png" )}),
			yellow: new THREE.MeshPhongMaterial({map: loader.load( "src/resources/textures/textures_yellow.png" )})
		}

		Object.keys(faces).forEach(mat => {
			faces[mat].map.anisotropy = 16;
			faces[mat].shininess = 100;
			// faces[mat].color = 0x996633;
		    // faces[mat].specular = 0x050505;
		})

		// map faces to indices
		let xNegColor = [faces.green, faces.black, faces.black]
		let xPosColor = [faces.black, faces.black, faces.blue]
		let yNegColor = [faces.orange, faces.black, faces.black]
		let yPosColor = [faces.black, faces.black, faces.red]
		let zNegColor = [faces.white, faces.black, faces.black]
		let zPosColor = [faces.black, faces.black, faces.yellow]

		// prepare geometry
		let cubes = []
		var geometry = new THREE.BoxGeometry();

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
						this.scene.add( cube.mesh );
					})
				})
			})
		}

		// lighting
		var light = new THREE.PointLight( 0xffffff, 10, 100 );
		light.position.set( 50, 50, 50 );
		this.scene.add( light );

		var light = new THREE.PointLight( 0xffffff, 10, 100 );
		light.position.set( -50, -50, -50 );
		this.scene.add( light );

		// finalize
		this.camera.position.z = 5;
		this.camera.position.x = 5;
		this.camera.position.y = 2;

		this.controls.update();

		function animate() {
			requestAnimationFrame( animate );
			controls.update();
			renderer.render( scene, camera );
		}

		// action!
		animate();
	}


}


export { Scene }