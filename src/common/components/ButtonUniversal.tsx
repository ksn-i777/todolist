import React from 'react'

type UniversalButtonType = {
  name: string,
  className: string,
  onClick(): void,
}

export function ButtonUniversal(props: UniversalButtonType) {
  return <button className={props.className} onClick={props.onClick}>{props.name}</button>
}