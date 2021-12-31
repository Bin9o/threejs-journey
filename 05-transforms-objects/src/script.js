import './style.css';
import * as THREE from 'three';

// Canvas
const canvas = document.querySelector('.webgl');

// Scene
const scene = new THREE.Scene();

// Group
const group = new THREE.Group();
scene.add(group);
group.position.y = 1;
group.rotation.y = Math.PI * 0.35;
group.scale.y = 0.8;
group.scale.x = 0.9;

// cube1
const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
group.add(cube1);

// cube2
const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x00ff00 })
);
cube2.position.x = -1;
group.add(cube2);

// cube3
const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x0000ff })
);
cube3.position.x = 1;
group.add(cube3);

// // Red cube
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
// const mesh = new THREE.Mesh(geometry, material);

// // Position
// // mesh.position.x = 0.7;
// // mesh.position.y = -0.6;
// // mesh.position.z = 1;
// mesh.position.set(1.7, 0, 1);

// // Scale
// mesh.scale.set(2, 0.5, 0.5);
// scene.add(mesh);

// // Rotation
// mesh.rotation.reorder('yxz');
// mesh.rotation.x = 0.25 * Math.PI;
// mesh.rotation.y = 0.25 * Math.PI;

// console.log(mesh.position.distanceTo(new THREE.Vector3(0, 1, 2)));

// Axes Helper
const axesHelper = new THREE.AxesHelper(2);

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
camera.position.x = 1;
camera.position.y = 1;
// console.log(mesh.position.distanceTo(camera.position));

scene.add(camera);
scene.add(axesHelper);

// camera.lookAt(mesh.position);

// Render
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(sizes.width, sizes.height);

renderer.render(scene, camera);
