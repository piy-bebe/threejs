import React from 'react'
import style from './informer.module.scss'
const Informer = () => {
  const onChange = (e) => {
    console.log(e.target.id)
  }

  return (
    <div className={style.informer}>
      <label>
        Блок 1x1
        <input onChange={onChange} type="radio" name="figure" id="1" />
      </label>
      <label>
        Блок 1x3
        <input onChange={onChange} type="radio" name="figure" id="2" />
      </label>
      <label>
        Блок 2x2
        <input onChange={onChange} type="radio" name="figure" id="3" />
      </label>
    </div>
  )
}

export default Informer
