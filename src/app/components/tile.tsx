import React from 'react'

interface TileProps {
  name: string;
  type?: string;
  color?: string;
  children?: React.ReactNode;
  price?: number;
  tileNumber?: number;
  players?: Array<{
    id: number;
    position: number;
    balance: number;
    in_jail: boolean;
    is_bankrupt: boolean;
  }>;
}


const Tile: React.FC<TileProps> = ({
  name,
  type,
  color,
  children,
  price,
  players,
  tileNumber
}) => {
  const tileColor = color
  const tileType = type || 'default'
  const tileName = name || 'Tile'
  console.log(players, "players");
  
  return (
    <div className="bg-green-200 text-black border border-black flex flex-col justify-between items-center w-full h-full text-[10px]">

  {tileType === 'default' && (
    <div className="w-full h-[12px]" style={{ backgroundColor: tileColor }}></div>
  )}

  <div className="flex-1 flex flex-col justify-center items-center text-center px-1">
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


    <span className="font-semibold">{name}</span>

    {tileName === 'GO' && (
      <>
        <span className="font-semibold">Collect $200</span>
        <img src="/images/arrow_icon.png" alt="Go" className="h-6 mb-1" />
      </>
    )}
  </div>

  {price && (
    <div className="text-center text-[9px]">
      ${price}
    </div>
  )}

  {/* Adauga poza pion */}
{players && players.length > 0 && (
  <div className="grid grid-cols-4 gap-1">
    {players.map((player, index) => {
      // console.log(player.position, "pozitia", tileNumber);
      if(tileNumber == player.position) {
        const playerNumber = index + 1;
        return (
          <img
            key={playerNumber}
            src={`/images/player_${playerNumber}.png`}
            alt={`Player ${playerNumber}`}
            className="w-4 h-4"
          />
        );
    }
    })}
  </div>
)}
</div>

  )
}

export default Tile
