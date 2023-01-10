import React from 'react'

interface ICircleSvgProps {
  size: string
  color: string
}

const CircleSvg = (props: ICircleSvgProps) => {
  return (
    <svg viewBox="0 0 80 80" width={props.size}>
      <circle style={{ fill: props.color }} cx="40" cy="40" r="38" />
    </svg>
  )
}
export default CircleSvg
