import React from 'react'

interface TileProps {
  name: string
  type?: string
  color?: string
  children?: React.ReactNode,
  price?: number,
  players?: number[]
}

const Tile: React.FC<TileProps> = ({
  name,
  type,
  color,
  children,
  price,
  players = [1,2,3,4]
}) => {
  const tileColor = color
  const tileType = type || 'default'
  const tileName = name || 'Tile'
  
  return (
    <div className="bg-green-200 text-black border border-black flex flex-col justify-between items-center w-full h-full text-[10px]">

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

    {tileName === 'Chance' && (
      <img src="/images/chance_icon.png" alt="Chance" className="h-6 mb-1" />
    )}

    {tileName === 'Community Chest' && (
      <img src="/images/community_chest_icon.png" alt="Community Chest" className="h-6 mb-1" />
    )}


    {/* Nume tile */}
    <span className="font-semibold">{name}</span>

    {tileName === 'GO' && (
      <>
        <span className="font-semibold">Collect $200</span>
        <img src="/images/arrow_icon.png" alt="Go" className="h-6 mb-1" />
      </>
    )}
  </div>

  {/* Preț jos, dacă există */}
  {price && (
    <div className="text-center text-[9px]">
      ${price}
    </div>
  )}

  {/* Grid jucători jos */}
{players && players.length > 0 && (
  <div className="grid grid-cols-4 gap-1">
    {players.map((playerId) => (
      <img
        key={playerId}
        src={`/images/player_${playerId}.png`}
        alt={`Player ${playerId}`}
        className="w-4 h-4"
      />
    ))}
  </div>
)}
</div>

  )
}

export default Tile
