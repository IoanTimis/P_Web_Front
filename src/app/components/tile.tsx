import React from 'react'

interface TileProps {
  name: string
  type?: string
  color?: string
  children?: React.ReactNode,
  price?: number
}

const Tile: React.FC<TileProps> = ({
  name,
  type,
  color,
  children,
  price
}) => {
  const tileColor = color || getTileColor(type)
  const tileType = type || 'default'
  return (
    <div className="bg-white text-black border border-black flex flex-col justify-between items-center w-full h-full p-1 text-[10px]">

  {/* Stripe sus pentru proprietăți normale */}
  {tileType === 'default' && (
    <div className="w-full h-[12px]" style={{ backgroundColor: tileColor }}></div>
  )}

  {/* Conținut central */}
  <div className="flex-1 flex flex-col justify-center items-center text-center px-1">
    {/* Imagine pentru tipuri speciale */}
    {tileType === 'railroad' && (
      <img src="/images/train_icon.png" alt="Railroad" className="h-6 mb-1" />
    )}

    {tileType === 'utility' && (
      <img src="/images/water_icon.png" alt="Utility" className="h-6 mb-1" />
    )}

    {/* Nume tile */}
    <span className="font-semibold">{name}</span>
  </div>

  {/* Preț jos, dacă există */}
  {price && (
    <div className="text-center text-[9px]">
      ${price}
    </div>
  )}
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
