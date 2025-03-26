import React from 'react'

interface TileProps {
  name: string
  type?: string
  color?: string
  children?: React.ReactNode
}

const Tile: React.FC<TileProps> = ({
  name,
  type,
  color,
  children
}) => {
  const tileColor = color || getTileColor(type)

  return (
    <div className="bg-white text-black border border-black flex flex-col justify-between items-center w-full h-full">
      <div className="flex-1 flex items-center justify-center">
        {children}
      </div>
      <div
        className="w-full text-center text-black text-[10px] py-1"
        style={{
          backgroundColor: tileColor
        }}
      >
        {name}
      </div>
    </div>
  )
}

const getTileColor = (type?: string): string => {
  switch (type) {
    case 'corner':
      return '#9ca3af'
    case 'railroad':
      return '#d4d4d4'
    case 'utility':
      return '#fcd34d'
    case 'card':
      return '#a78bfa'
    case 'tax':
      return '#f87171'
    default:
      return '#e5e7eb'
  }
}

export default Tile
