import * as THREE from 'three'

function createBox(scene, color, x) {
  const material = new THREE.MeshBasicMaterial({ color, opacity: 0.6, transparent: true })
  const geometry = new THREE.BoxGeometry(1, 1, 1, 1, 1, 1)
  const cube = new THREE.Mesh(geometry, material)
  scene.add(cube)

  // Линия

  const edges2 = new THREE.EdgesGeometry(new THREE.BoxGeometry(1, 1, 1))
  const line2 = new THREE.LineSegments(
    edges2,
    new THREE.LineBasicMaterial({
      color: 'black',
    })
  )
  line2.position.x = 0.5
  line2.position.z = 0.5
  line2.position.y = x

  scene.add(line2)

  cube.position.x = 0.5
  cube.position.z = 0.5
  cube.position.y = x
  return cube
}

export default createBox
