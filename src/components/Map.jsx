import React, { useEffect } from 'react'
import { useInformer } from '../store'
import { init, setColorBlock } from './createMap'

// config

const Map = () => {
  const figure = useInformer((state) => state.id)

  console.log(figure)
  useEffect(() => {
    init()
  }, [])

  useEffect(() => {
    setColorBlock(figure)
  }, [figure])

  return <></>
}

export default Map
