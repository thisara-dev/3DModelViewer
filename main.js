// main.js

// Create the scene
const scene = new THREE.Scene();

// Create a camera, which determines what we'll see when we render the scene
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

// Create a renderer and attach it to our document
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add a basic light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5).normalize();
scene.add(light);

// Add OrbitControls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
// Load a GLTF model
const loader = new THREE.GLTFLoader();
loader.load(
  "model//scene.gltf", // Replace with the path to your model
  function (gltf) {
    const model = gltf.scene;
    // Scale the model
    model.scale.set(0.1, 0.1, 0.1); // Adjust the scaling factor as needed
    scene.add(model);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

// Handle window resizing
window.addEventListener("resize", function () {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Required if controls.enableDamping or controls.autoRotate are set to true
  controls.update();

  renderer.render(scene, camera);
}
