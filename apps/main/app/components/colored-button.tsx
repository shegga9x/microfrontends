'use client'

import { matchingTextColor, randomColor } from '@acme/utils'
import { useEffect, useState } from 'react'

export function ColoredButton() {
  const [bgColor, setBgColor] = useState('')
  const [textColor, setTextColor] = useState('')
  const changeColor = () => {
    const bg = randomColor()
    setBgColor(bg)
    setTextColor(matchingTextColor(bg))
  }

  useEffect(changeColor, [])

  return <></>
}
