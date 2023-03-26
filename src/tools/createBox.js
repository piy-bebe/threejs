import * as THREE from 'three'

function createBox(scene, color, x, boxSize) {
  const material = new THREE.MeshBasicMaterial({ color, opacity: 0.6, transparent: true })
  const geometry = new THREE.BoxGeometry(boxSize, boxSize, boxSize, 1, 1, 1)
  const cube = new THREE.Mesh(geometry, material)

  // Линия

  const edges2 = new THREE.EdgesGeometry(new THREE.BoxGeometry(boxSize, boxSize, boxSize))
  const line2 = new THREE.LineSegments(
    edges2,
    new THREE.LineBasicMaterial({
      color: 'black',
    })
  )
  cube.position.set(2, 2, 2)
  line2.position.set(2, 2, 2)

  scene.add(line2)
  scene.add(cube)
  return cube
}

export default createBox
