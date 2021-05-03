import React, { useState, useEffect, useRef } from 'react'
import {
  getRandomNum,
  getRandomCoords,
  getNextCoords,
  isBeyond
} from './utils'

interface IDotsLayer {
  dotsCount: number
}
export interface IDot {
  x: number,
  y: number,
  angle: number,
  size: string,
  shade: string,
  id: number
}

const rootStyle = {
  padding: 0,
  margin: 0,
  display: 'block',
  width: '100%',
  height: '100vh',
  position: 'fixed',
  zIndex: -1,
  background: 'rgb(189, 189, 189)',
  overflow: 'hidden'
} as React.CSSProperties
const dotStyle = {
  position: 'absolute',
  zIndex: 99,
  borderRadius: '50%',
  background: 'rgba(255, 255, 255, 0)'
} as React.CSSProperties

const DotsLayer: React.FC<IDotsLayer> = ({ dotsCount, children }) => {
  const [dots, setDots] = useState<IDot[]>([])

  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const animateRef = useRef<any>()

  useEffect(() => {
    const fieldWidth = wrapperRef.current!.offsetWidth
    const fieldHeight = wrapperRef.current!.offsetHeight

    const dotsArr: IDot[] = []
    new Array(dotsCount).fill(0).forEach((_, i) => {
      const newDot: IDot = generateDot(fieldWidth, fieldHeight, i)
      dotsArr.push(newDot)
    })

    setDots(dotsArr)
    startMoveDots()

    return () => cancelAnimationFrame(animateRef.current)
  }, [])

  const generateDot = (fieldWidth: number, fieldHeight: number, id: number): IDot => {
    const dotCoords = getRandomCoords(fieldWidth, fieldHeight)

    return {
      x: dotCoords.x,
      y: dotCoords.y,
      angle: getRandomNum(0, 359),
      size: `${getRandomNum(3, 7)}px`,
      shade: `rgba(255, 255, 255, ${getRandomNum(3, 10) / 10})`,
      id
    }
  }
  const updateDots = (prevDots: IDot[]) => {
    return prevDots.map((dot, i) => {
      const newDotCoords = getNextCoords(dot.x, dot.y, dot.angle)
      const fieldWidth = wrapperRef.current!.offsetWidth
      const fieldHeight = wrapperRef.current!.offsetHeight

      if (isBeyond(
        newDotCoords.x,
        newDotCoords.y,
        fieldWidth,
        fieldHeight
      )) {
        return generateDot(fieldWidth, fieldHeight, i)
      }

      const updatedDot = {
        ...dot,
        ...newDotCoords
      }
      return updatedDot
    })
  }
  const moveDots = () => {
    setDots(updateDots)
    animateRef.current = requestAnimationFrame(moveDots)
  }
  const startMoveDots = () => {
    console.log('started')
    animateRef.current = requestAnimationFrame(moveDots)
  }

  return (
    <div
      ref={wrapperRef}
      style={{
        ...rootStyle,
        position: !!children ? 'relative' : 'fixed',
        height: !!children ? 'auto' : '100vh'
      }}
    >
      {children}
      {dots.map((dot, i) => <div
        key={i} 
        style={{
          ...dotStyle,
          top: `${dot.y}px`,
          left: `${dot.x}px`,
          minWidth: dot.size,
          minHeight: dot.size,
          background: dot.shade
        }}
      ></div>)}
    </div>
  )
}

export default DotsLayer
