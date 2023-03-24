import * as THREE from 'three'

// Добавление линии
function createLine(scene, x, z, y) {
  const edges2 = new THREE.EdgesGeometry(new THREE.BoxGeometry(0.5, 0.5, 0.5))
  const line2 = new THREE.LineSegments(
    edges2,
    new THREE.LineBasicMaterial({
      color: '#0c6e29',
    })
  )
  line2.position.x = x
  line2.position.z = z
  line2.position.y = y

  scene.add(line2)
}

function createBox(scene, color, x, z, y) {
  const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)
  const material = new THREE.MeshPhongMaterial({
    color,
    opacity: 0.6,
    transparent: true,
  })

  const cube = new THREE.Mesh(geometry, material)
  scene.add(cube)
  createLine(scene, x, z, y)

  cube.position.x = x
  cube.position.z = z
  cube.position.y = y

  return cube
}

export default createBox
