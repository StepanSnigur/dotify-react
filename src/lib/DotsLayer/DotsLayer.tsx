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
  spawnedRecently: boolean,
  spawnTime: number,
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

const dotFadeAnimation = `
  @keyframes pulse-animation {
    0% {
      opacity: 1;
    }
    50% {
      opacity: .4;
    }
    100% {
      opacity: 1;
    }
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`
const FADE_TIME = 800
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
    const dotOpacity = getRandomNum(3, 10) / 10

    return {
      x: dotCoords.x,
      y: dotCoords.y,
      angle: getRandomNum(0, 359),
      size: `${getRandomNum(3, 7)}px`,
      shade: `rgba(255, 255, 255, ${dotOpacity})`,
      spawnedRecently: true,
      spawnTime: Date.now(),
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
        ...newDotCoords,
        spawnedRecently: (Date.now() - dot.spawnTime > FADE_TIME) ? false : true
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
      <style>{dotFadeAnimation}</style>
      {children}
      {dots.map((dot, i) => <div
        key={i}
        style={{
          ...dotStyle,
          top: `${dot.y}px`,
          left: `${dot.x}px`,
          minWidth: dot.size,
          minHeight: dot.size,
          background: dot.shade,

          animation: `${dot.spawnedRecently ? `fadeIn ${FADE_TIME}ms` : 'pulse-animation 4s infinite'}`,
        }}
      ></div>)}
    </div>
  )
}

export default DotsLayer
