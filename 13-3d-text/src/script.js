import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
import ky from "kyouka";
import { AxesHelper } from "three";

/**
 * Base
 */
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Axis Helper
// const axisHelper = new THREE.AxesHelper()
// scene.add(axisHelper)


/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

const backgroundMatcapTexture = textureLoader.load('./textures/matcaps/2.png')
const backgroundMaterial = new THREE.MeshMatcapMaterial({ matcap: backgroundMatcapTexture})

const matcapTexture = textureLoader.load('./textures/matcaps/8.png')
const textMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture})

const donutArray = []

const handleFontLoad = (font) => {
  // console.log(font);
  const textGeometry = new THREE.TextBufferGeometry(
    window.prompt("请输入你想展示的文字\nInput the text you want to display",'Hello Three.js!'),
    // 'Hello Three.js!',
    {
      font,
      size: 0.5,
      height: 0.2,
      curveSegments: 5,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.02,
      bevelOffset: 0,
      bevelSegments: 3,
    }
  );
  const text = new THREE.Mesh(textGeometry, textMaterial);
  textGeometry.computeBoundingBox()
  console.log(textGeometry.boundingBox);
  textGeometry.translate(
    - (textGeometry.boundingBox.max.x - 0.02) * 0.5,
    - (textGeometry.boundingBox.max.y - 0.02) * 0.5,
    - (textGeometry.boundingBox.max.z - 0.03) * 0.5,
  )


  scene.add(text)

  console.time('donuts');

  const donutGeometry = new THREE.TorusBufferGeometry(0.3, 0.2, 20, 45)

  
  for(let i = 0; i < 300; i++){
    const donut = new THREE.Mesh(donutGeometry, backgroundMaterial)

    donut.position.x = (Math.random() - 0.5 ) * 10
    donut.position.y = (Math.random() - 0.5 ) * 10
    donut.position.z = (Math.random() - 0.5 ) * 10

    donut.rotation.x = Math.random() * Math.PI
    donut.rotation.y = Math.random() * Math.PI
    
    const scale = Math.random() * 0.2
    donut.scale.set(scale, scale, scale)

    scene.add(donut)

    donutArray.push(donut)
  }

  console.timeEnd('donuts');
}

const fontLoader = new THREE.FontLoader()
fontLoader.load(
  './fonts/helvetiker_regular.typeface.json',
  (font) => handleFontLoad(font)
)

/**
 * Object
 */

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
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

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
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

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);

  for(let i = 0; i < 300; i += 1){
    // donutArray[i].position.x += (Math.random() - 0.5 ) * 0.1
    // donutArray[i].position.y += (Math.random() - 0.5 ) * 0.1
    // donutArray[i].position.z += (Math.random() - 0.5 ) * 0.1

    // donutArray[i].rotation.x += Math.random() * Math.PI
    // donutArray[i].rotation.y += Math.random() * Math.PI
  }


};

tick();