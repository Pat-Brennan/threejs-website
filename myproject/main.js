import './style.css';

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

//? You will always need a SCENE, CAMERA, and RENDERER

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);

const renderer = new THREE.WebGLRenderer({
	canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(40);

renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(15, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xfcba03 }); //? "0x" is a hexidecimal literal
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight); //? Shows the exact location of pointlight
const gridHelper = new THREE.GridHelper(200, 50); //? Creates a grid to get a feel for the space
scene.add(lightHelper, gridHelper);

//? listens for dom events on the mouse and updates camera position accordingly
const controls = new OrbitControls(camera, renderer.domElement); 

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star)
}

Array(200).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load('Cosmos.jpg');
scene.background = spaceTexture;

const logoTexture = new THREE.TextureLoader().load('logo.jpg');

const logo = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
new THREE.MeshBasicMaterial({ map: logoTexture })
)

scene.add(logo)

renderer.render(scene, camera);

function animate() {
	requestAnimationFrame(animate);

	torus.rotation.x += 0.01;
	torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;
  
  controls.update(); //? Ensures the last position of orbit stays true

	renderer.render(scene, camera);
}

animate();
