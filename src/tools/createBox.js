import * as THREE from 'three'

function createBox(scene, color, x) {
  const material = new THREE.MeshBasicMaterial({ color })
  const geometry = new THREE.BoxGeometry(1, 1, 1, 1, 1, 1)
  const cube = new THREE.Mesh(geometry, material)
  const box = new THREE.BoxHelper(cube, 0xffff00)
  scene.add(box)
  scene.add(cube)

  cube.position.x = x
  return cube
}

export default createBox
