import React, { useEffect, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import createBox from './tools/createBox'

function App() {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )

  // Свет
  const addLight = (...pos) => {
    const color = 0xffffff
    const intensity = 1
    const light = new THREE.DirectionalLight(color, intensity)
    light.position.set(...pos)
    scene.add(light)
  }

  addLight(1, 2, 0)
  addLight(-1, 2, 0)
  addLight(0, 2, 1)
  addLight(0, 2, -1)

  const renderer = new THREE.WebGLRenderer()
  renderer.setClearColor('#fff', 1)
  const controls = new OrbitControls(camera, renderer.domElement)
  const cube = new THREE.Mesh(
    new THREE.BoxGeometry(10, 0.3, 13),
    new THREE.MeshBasicMaterial({ color: '#999' })
  )

  cube.position.y = -0.68

  // Линии по бокам
  const edges = new THREE.EdgesGeometry(new THREE.BoxGeometry(10, 0.3, 13))
  const line = new THREE.LineSegments(
    edges,
    new THREE.LineBasicMaterial({
      color: 'black',
    })
  )
  line.position.y = -0.68
  scene.add(line)

  // const edges2 = new THREE.EdgesGeometry(new THREE.BoxGeometry(1.01, 1.01, 1.01))
  // const line2 = new THREE.LineSegments(
  //   edges2,
  //   new THREE.LineBasicMaterial({
  //     color: 'black',
  //   })
  // )
  // line2.position.y = 0

  // scene.add(line2)

  scene.add(cube)

  camera.position.z = 4
  camera.position.x = 3
  camera.position.y = 3
  controls.update()

  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)

  const animate = () => {
    requestAnimationFrame(animate)
    controls.update()

    renderer.render(scene, camera)
  }
  let x = 0
  let z = 0
  let y = 0

  let counterX = 1
  let counterZ = 1
  const addBlock = () => {
    createBox(scene, 'lime', x, z, y)

    if (counterX % 3 === 0) {
      x = 0
      z += 0.6

      counterZ++
      console.log(counterZ)
    } else {
      x += 0.6
    }

    if (counterZ % 5 === 0) {
      x = 0
      z = 0
      y += 0.6
      counterZ = 1
    }

    // Счетчик коробок
    counterX++
  }

  useEffect(() => {
    animate()
  }, [])

  return (
    <div className="App">
      <button onClick={addBlock}>Добавить</button>
    </div>
  )
}

export default App
