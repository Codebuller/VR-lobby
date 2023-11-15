import { PerspectiveCamera, Renderer, Vector3 } from "three";

export const initEventListeners = (camera:PerspectiveCamera,renderer:Renderer,eulerCamera:Vector3) =>{
    function onWindowResize() {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
      
        renderer.setSize( window.innerWidth, window.innerHeight );
      
      }
      
      window.addEventListener( 'resize', onWindowResize );
      const sensitivity = 0.005; // Чувствительность движения мыши
      window.addEventListener('mousemove', (event) => {
        let dx = event.movementX;
        let dy = event.movementY;
      
        // Изменение углов поворота камеры
        eulerCamera.y -= dx * sensitivity; // Поворот вокруг оси y (горизонтальное движение мыши)
        eulerCamera.x -= dy * sensitivity; // Поворот вокруг оси x (вертикальное движение мыши)
      
        // Ограничение вертикального угла обзора (опционально)
        eulerCamera.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, eulerCamera.x));
      }); 
}