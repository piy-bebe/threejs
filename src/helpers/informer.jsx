import React from 'react'
import { useInformer } from '../store'
import style from './informer.module.scss'
const Informer = () => {
  const changeFigure = useInformer((state) => state.change)
  const onChange = (e) => {
    changeFigure(e.target.id)
  }

  return (
    <div className={style.informer}>
      <label>
        Блок 1x1
        <input onChange={onChange} type="radio" name="figure" id="0" />
      </label>
      <label>
        Блок 1x3
        <input onChange={onChange} type="radio" name="figure" id="1" />
      </label>
      <label>
        Блок 2x2
        <input onChange={onChange} type="radio" name="figure" id="2" />
      </label>
    </div>
  )
}

export default Informer
