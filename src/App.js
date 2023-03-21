import React, { useEffect, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import createBox from './tools/createBox'

let pointer,
  raycaster,
  isShiftDown = false
let plane
let cubeGeo, cubeMaterial
const objects = []

function App() {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  // Сетка
  const gridHelper = new THREE.GridHelper(50, 50)
  scene.add(gridHelper)

  const renderer = new THREE.WebGLRenderer()
  renderer.setClearColor('#fff', 1)
  const controls = new OrbitControls(camera, renderer.domElement)

  raycaster = new THREE.Raycaster()
  pointer = new THREE.Vector2()

  const geometry = new THREE.PlaneGeometry(50, 50)
  geometry.rotateX(-Math.PI / 2)

  plane = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ visible: false }))
  scene.add(plane)

  objects.push(plane)

  // const cube = new THREE.Mesh(
  //   new THREE.BoxGeometry(10, 0.3, 13),
  //   new THREE.MeshBasicMaterial({ color: '#999' })
  // )

  // cube.position.y = -0.68

  // Линии по бокам
  // const edges = new THREE.EdgesGeometry(new THREE.BoxGeometry(10, 0.3, 13))
  // const line = new THREE.LineSegments(
  //   edges,
  //   new THREE.LineBasicMaterial({
  //     color: 'black',
  //   })
  // )
  // line.position.y = -0.68
  // scene.add(line)

  // const edges2 = new THREE.EdgesGeometry(new THREE.BoxGeometry(1.01, 1.01, 1.01))
  // const line2 = new THREE.LineSegments(
  //   edges2,
  //   new THREE.LineBasicMaterial({
  //     color: 'black',
  //   })
  // )
  // line2.position.y = 0

  // scene.add(line2)

  // Свет
  // scene.add(cube)

  camera.position.set(10, 10, 10)
  controls.update()

  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)

  // Наводка мыши

  // const raycaster = new THREE.Raycaster()
  // const pointer = new THREE.Vector2()

  // function onPointerMove(event) {
  //   // calculate pointer position in normalized device coordinates
  //   // (-1 to +1) for both components

  //   pointer.x = (event.clientX / window.innerWidth) * 2 - 1
  //   pointer.y = -(event.clientY / window.innerHeight) * 2 + 1
  // }

  const render = () => {
    // update the picking ray with the camera and pointer position
    // raycaster.setFromCamera(pointer, camera)

    // // calculate objects intersecting the picking ray
    // const intersects = raycaster.intersectObjects(scene.children)

    // for (let i = 0; i < intersects.length; i++) {
    //   intersects[i].object.material.color.set(0xff0000)
    // }

    requestAnimationFrame(render)
    controls.update()

    renderer.render(scene, camera)
  }
  // let i = 0
  // const addBlock = () => {
  //   createBox(scene, 'rgb(100, 100, 120)', i)
  //   i++
  // }

  cubeGeo = new THREE.BoxGeometry(1, 1, 1)
  cubeMaterial = new THREE.MeshBasicMaterial({
    color: 'rgb(20, 100, 120)',
    opacity: 0.6,
    transparent: true,
  })

  function onPointerDown(event) {
    pointer.set(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1
    )

    raycaster.setFromCamera(pointer, camera)

    const intersects = raycaster.intersectObjects(objects, false)

    if (intersects.length > 0) {
      const intersect = intersects[0]

      // delete cube

      if (isShiftDown) {
        if (intersect.object !== plane) {
          scene.remove(intersect.object)

          objects.splice(objects.indexOf(intersect.object), 1)
        }

        // create cube
      } else {
        const voxel = new THREE.Mesh(cubeGeo, cubeMaterial)
        voxel.position.copy(intersect.point).add(intersect.face.normal)
        voxel.position.divideScalar(1).floor().multiplyScalar(1).addScalar(1)
        scene.add(voxel)

        objects.push(voxel)
      }

      render()
    }
  }

  createBox(scene, 'rgb(20, 100, 120)', 0.5)
  // window.addEventListener('pointermove', onPointerMove)
  window.addEventListener('pointerdown', onPointerDown)
  window.requestAnimationFrame(render)

  useEffect(() => {
    render()
  }, [])

  return <div className="App"></div>
}

export default App
