import React from 'react'
import style from './style.module.scss'

interface ICardProps {
  children?: React.ReactNode
  width?: string
  height?: string
}

const Card = (props: ICardProps) => {
  return (
    <div
      style={{ width: props.width || 'auto', height: props.height || 'auto' }}
      className={style.main}
    >
      {props.children}
    </div>
  )
}

export default Card
