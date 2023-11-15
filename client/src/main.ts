
import {PerspectiveCamera, Vector3, Color, Scene, Fog,
  HemisphereLight, WebGLRenderer, PlaneGeometry, Float32BufferAttribute, 
  MeshBasicMaterial, Mesh, SRGBColorSpace} from 'three';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
import { initEventListeners } from './eventListeners';
import { gameState, gameStateOnUpdate } from './gameState/gameState';
const camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
const  scene = new Scene();
const renderer = new WebGLRenderer( { antialias: true } );
  renderer.setPixelRatio( window.devicePixelRatio );
const controls = new PointerLockControls( camera, document.body );


let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let canJump = false;
let eulerCamera = new Vector3();
let prevTime = performance.now();
const velocity = new Vector3();
const direction = new Vector3();
const color = new Color();




init();
animate();

function init() {

  
  camera.position.y = 10;

 
  scene.background = new Color( 0xffffff );
  scene.fog = new Fog( 0xffffff, 0, 750 );

  const light = new HemisphereLight( 0xeeeeff, 0x777788, 2.5 );
  light.position.set( 0.5, 1, 0.75 );
  scene.add( light );

  
  
  


  

  

  scene.add( controls.getObject() );


  

  let floorGeometry = new PlaneGeometry( 2000, 2000, 100, 100 );
  floorGeometry.rotateX( - Math.PI / 2 );

  let position = floorGeometry.attributes.position;

  

  const colorsFloor = [];

  for ( let i = 0, l = position.count; i < l; i ++ ) {

    color.setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75, SRGBColorSpace );
    colorsFloor.push( color.r, color.g, color.b );

  }

  floorGeometry.setAttribute( 'color', new Float32BufferAttribute( colorsFloor, 3 ) );

  const floorMaterial = new MeshBasicMaterial( { vertexColors: true } );

  const floor = new Mesh( floorGeometry, floorMaterial );
  scene.add( floor );

  
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );
 
}
const onKeyDown = function ( event:KeyboardEvent ) {

  switch ( event.code ) {

    case 'ArrowUp':
    case 'KeyW':
      moveForward = true;
      break;

    case 'ArrowLeft':
    case 'KeyA':
      moveLeft = true;
      break;

    case 'ArrowDown':
    case 'KeyS':
      moveBackward = true;
      break;

    case 'ArrowRight':
    case 'KeyD':
      moveRight = true;
      break;

    case 'Space':
      if ( canJump === true ) velocity.y += 350;
      canJump = false;
      break;

  }

};

const onKeyUp = function ( event:KeyboardEvent ) {

  switch ( event.code ) {

    case 'ArrowUp':
    case 'KeyW':
      moveForward = false;
      break;

    case 'ArrowLeft':
    case 'KeyA':
      moveLeft = false;
      break;

    case 'ArrowDown':
    case 'KeyS':
      moveBackward = false;
      break;

    case 'ArrowRight':
    case 'KeyD':
      moveRight = false;
      break;

  }

};
gameStateOnUpdate(scene);

window.addEventListener( 'keydown', onKeyDown );
window.addEventListener( 'keyup', onKeyUp );

initEventListeners(camera,renderer, eulerCamera)

function animate() {
  // console.log(gameState)
  requestAnimationFrame( animate );

    const time = performance.now();

    const delta = ( time - prevTime ) / 1000;

    velocity.x -= velocity.x * 10.0 * delta;
    velocity.z -= velocity.z * 10.0 * delta;

    velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

    direction.z = Number( moveForward ) - Number( moveBackward );
    direction.x = Number( moveRight ) - Number( moveLeft );
    direction.normalize(); // this ensures consistent movements in all directions

    if ( moveForward || moveBackward ) velocity.z -= direction.z * 400.0 * delta;
    if ( moveLeft || moveRight ) velocity.x -= direction.x * 400.0 * delta;

    

    controls.moveRight( - velocity.x * delta );
    controls.moveForward( - velocity.z * delta );

    controls.getObject().position.y += ( velocity.y * delta ); // new behavior

    if ( controls.getObject().position.y < 10 ) {

      velocity.y = 0;
      controls.getObject().position.y = 10;

      canJump = true;

    }

  

  prevTime = time;
  camera.rotation.set(eulerCamera.x,eulerCamera.y,eulerCamera.z);
  renderer.render( scene, camera );

}