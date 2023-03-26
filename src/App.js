import React, { useEffect, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import Informer from './helpers/informer'
import createBox from './tools/createBox'

let pointer,
  raycaster,
  isShiftDown = false
let plane
let cubeGeo, cubeMaterial
let objects = []
let rollOverMesh, rollOverMaterial

// config
const gridSize = 200 // размер сетки
const gridSizeCell = 50 // размер ячейки сетки
const planeSize = 200 // размер поля
const boxSize = gridSize / gridSizeCell // размер блока

function App() {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  // Сетка
  const gridHelper = new THREE.GridHelper(gridSize, gridSizeCell)
  scene.add(gridHelper)

  const renderer = new THREE.WebGLRenderer()
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setClearColor('#fff', 1)
  const controls = new OrbitControls(camera, renderer.domElement)

  raycaster = new THREE.Raycaster()
  pointer = new THREE.Vector2()

  const geometry = new THREE.PlaneGeometry(planeSize, planeSize)
  geometry.rotateX(-Math.PI / 2)

  // roll-over helpers

  const rollOverGeo = new THREE.BoxGeometry(boxSize, boxSize, boxSize)
  rollOverMaterial = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    opacity: 0.5,
    transparent: true,
  })
  rollOverMesh = new THREE.Mesh(rollOverGeo, rollOverMaterial)
  scene.add(rollOverMesh)

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

  camera.position.set(0, 50, 50)
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
  let i = 1
  const render = () => {
    // update the picking ray with the camera and pointer position
    // raycaster.setFromCamera(pointer, camera)

    // // calculate objects intersecting the picking ray
    // const intersects = raycaster.intersectObjects(scene.children)

    // for (let i = 0; i < intersects.length; i++) {
    //   intersects[i].object.material.color.set(0xff0000)
    // }

    // i++
    // requestAnimationFrame(render)
    // controls.update() // ??? работает и без
    // console.log(i)

    renderer.render(scene, camera)
  }

  cubeGeo = new THREE.BoxGeometry(boxSize, boxSize, boxSize)
  cubeMaterial = new THREE.MeshBasicMaterial({
    color: 'rgb(20, 100, 120)',
    opacity: 0.6,
    transparent: true,
  })

  function onScroll(event) {
    render()
  }
  //
  function onPointerMove(event) {
    pointer.set(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1
    )

    raycaster.setFromCamera(pointer, camera)

    const intersects = raycaster.intersectObjects(objects, false)

    if (intersects.length > 0) {
      const intersect = intersects[0]

      rollOverMesh.position.copy(intersect.point).add(intersect.face.normal)
      rollOverMesh.position
        .divideScalar(boxSize)
        .floor()
        .multiplyScalar(boxSize)
        .addScalar(boxSize / 2)

      render()
    }
  }
  //
  function onPointerDown(event) {
    console.log(objects)
    pointer.set(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1
    )

    raycaster.setFromCamera(pointer, camera)

    const intersects = raycaster.intersectObjects(objects, false)
    console.log(intersects)

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
        voxel.position
          .divideScalar(boxSize)
          .floor()
          .multiplyScalar(boxSize)
          .addScalar(boxSize / 2)
        scene.add(voxel)

        const edges2 = new THREE.EdgesGeometry(
          new THREE.BoxGeometry(boxSize, boxSize, boxSize)
        )
        const line2 = new THREE.LineSegments(
          edges2,
          new THREE.LineBasicMaterial({
            color: 'black',
          })
        )
        line2.position.copy(intersect.point).add(intersect.face.normal)
        line2.position
          .divideScalar(boxSize)
          .floor()
          .multiplyScalar(boxSize)
          .addScalar(boxSize / 2)
        scene.add(line2)

        objects.push(voxel)
      }

      render()
    }
  }

  const onKeyUp = (e) => {
    switch (e.key) {
      case 'c':
        console.log(objects)
        objects = []
        render()
        break

      default:
        render()
    }
  }

  window.addEventListener('dblclick', onPointerDown)
  window.addEventListener('pointermove', onPointerMove)
  window.addEventListener('wheel', onScroll)
  window.addEventListener('keyup', onKeyUp)

  window.requestAnimationFrame(render)

  return (
    <div className="App">
      <Informer />
    </div>
  )
}

export default App
