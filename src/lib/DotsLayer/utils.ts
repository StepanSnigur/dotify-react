interface ICoords {
  x: number,
  y: number
}

export const getRandomNum = (min: number, max: number) => min + Math.floor(Math.random() * max)
export const getRandomCoords = (maxX: number, maxY: number): ICoords => {
  return {
    x: getRandomNum(0, maxX),
    y: getRandomNum(0, maxY),
  }
}

export const getNextCoords = (x: number, y: number, angle: number): ICoords => {
  return {
    x: x + Math.sin(angle * Math.PI / 180),
    y: y + Math.sin((90 - angle) * Math.PI / 180)
  }
}
export const isBeyond = (x: number, y: number, width: number, height: number) => {
  if (
    x > width ||
    x < 0 ||
    y > height ||
    y < 0
  ) return true
  return false
}
