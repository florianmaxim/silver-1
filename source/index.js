import * as THREE from 'three';

import DiamondSquare from './DiamondSquare';
import {OrbitControls} from './OrbitControls';


var scene, camera, renderer, controls;
var geometry, material, mesh;

init();
animate();

function init() {

	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.z = 100;
  camera.position.y = 50;

  camera.lookAt(scene.position);

  controls = new OrbitControls(camera)

  var ambient = new THREE.AmbientLight( 0xeaf4f9, 1 );
	scene.add( ambient );

  var light = new THREE.PointLight(0xffffff, .5);
  light.position.y=100;
  light.position.x=-50;
  scene.add(light);

  var light = new THREE.PointLight(0xffffff, .5);
  light.position.y=100;
  light.position.x=50;
  scene.add(light);

  var light = new THREE.PointLight(0xffffff, .5);
  light.position.y=100;
  light.position.x=50;
  light.position.z=50;
  
  scene.add(light);

  var light = new THREE.DirectionalLight(0xffffff, .25);
  light.position.set(0, 10, 1).normalize();
  scene.add(light);

  var factor = 1;

  var width = 512*factor;
  var height = 512*factor;
  var segments = 512*factor;
  var smooth = 256*factor;

  var ground = new DiamondSquare(width, height, segments, smooth);
  var ground = ground.generate();

	var geometry = new THREE.PlaneGeometry(width, height, segments, segments);
		var index = 0;
		for(var i = 0; i <= segments; i++) {
			for(var j = 0; j <= segments; j++) {
				geometry.vertices[index].z = ground[i][j];
				index++;
			}
		}

	console.log(geometry.vertices);

  geometry.computeFaceNormals();
  geometry.computeVertexNormals();

  var path = "static/textures/cube/";
  			var format = '.jpg';
  			var urls = [
  					path + 'px' + format, path + 'nx' + format,
  					path + 'py' + format, path + 'ny' + format,
  					path + 'pz' + format, path + 'nz' + format
  				];

	var reflectionCube = new THREE.CubeTextureLoader().load( urls );
	reflectionCube.format = THREE.RGBFormat;

	//scene = new THREE.Scene();
	//scene.background = reflectionCube;

  var refractionCube = new THREE.CubeTextureLoader().load( urls );
			refractionCube.mapping = THREE.CubeRefractionMapping;
			refractionCube.format = THREE.RGBAFormat;


  var material = new THREE.MeshPhongMaterial( {
    side: THREE.DoubleSide,
  /*   color: 0x564100,
    specular:0x937300,
    emissive:0xffffff, */
    color: 0x000000,
    specular:0x7c7c7c,
    emissive:0xffffff,
    emissiveIntensity:.1,
    envMap: reflectionCube,
    displacementMap: reflectionCube,
    combine: THREE.MixOperation,
    reflectivity: .1} );

	mesh = new THREE.Mesh( geometry, material );
	mesh.scale.set(.1,.1,.1);
	scene.add( mesh );


	renderer = new THREE.WebGLRenderer({antialias:true});
	renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setPixelRatio( window.devicePixelRatio);

	document.body.style.margin = 0;
	document.body.appendChild( renderer.domElement );

  addEventListener('resize', () =>{
    renderer.setSize( window.innerWidth, window.innerHeight );
  })

}

function animate() {

	//mesh.rotation.y+=.01;
	//mesh.rotation.x+=.01;


  controls.update();

	requestAnimationFrame( animate );

	renderer.render( scene, camera );

}
