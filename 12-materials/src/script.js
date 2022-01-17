import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';

// Textures
const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load('./textures/matcaps/1.png');
const gridentTexture = textureLoader.load('./textures/gradients/3.jpg');

// Parameters
const parameters = {
  color: new THREE.Color('white'),
  spin: () => {
    console.log('spin');
    gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + 10 });
  },
};

const canvas = document.querySelector('canvas.webgl');
const scene = new THREE.Scene();
const material = new THREE.MeshBasicMaterial();
// material.map = matcapTexture;
// material.color.set('red');
material.color = new THREE.Color('white');
// material.wireframe = true;
material.opacity = 0.5;
material.transparent = true;

// meshes
const sphere = new THREE.Mesh(
  new THREE.SphereBufferGeometry(0.5, 16, 16),
  material
);
sphere.position.x = -1.5;

const plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(1, 1), material);

const torus = new THREE.Mesh(
  new THREE.TorusBufferGeometry(0.3, 0.2, 16, 32),
  material
);

torus.position.x = 1.5;

scene.add(sphere, plane, torus);

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 3;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update Objects
  sphere.rotation.y = 0.1 * elapsedTime;
  plane.rotation.y = 0.1 * elapsedTime;
  torus.rotation.y = 0.1 * elapsedTime;

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();

// dat.GUI
const gui = new dat.GUI();
// gui.hide()
gui.addColor(parameters, 'color').onChange(() => {
  console.log('tweak did change');
  material.color.set(parameters.color);
});
gui.add(parameters, 'spin');
// gui.add(mesh.position, 'y').min(-3).max(3).step(0.01);
// gui.add(mesh, 'visible');
// gui.add(mesh.material, 'wireframe');
