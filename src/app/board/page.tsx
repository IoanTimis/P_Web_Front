import React from 'react'
import Tile from '../components/tile'
import rawTiles  from "../../locales/tiles.json"

const tiles = rawTiles as Record<string, {
  name: string
  type?: string
  color?: string
  price?: number
  amount?: number
}>


const TILE_COUNT_ROW = 11
const TILE_COUNT_COL = 9
const TILE_SIZE = 50

const BoardPage = () => {
  return (
    <div className="min-h-screen bg-black flex justify-center items-center">
      <div className="w-[1100px] h-[900px] bg-green-200 flex flex-col">
        {/* SUS */}
        <div className="grid grid-cols-11 h-[90px]">
          {[...Array(11)].map((_, i) => (
            <Tile key={i} {...tiles[(20 + i).toString()]} />
          ))}
        </div>
  
        {/* CENTRU cu STÂNGA + DREAPTA */}
        <div className="flex flex-1">
          {/* STÂNGA */}
          <div className="grid grid-rows-9 w-[100px]">
          {[...Array(9)].map((_, i) => (
            <Tile key={i} {...tiles[(19 - i).toString()]} />
          ))}
        </div>

  
          {/* CONȚINUT CENTRAL */}
          <div className="flex-1 bg-green-200  flex items-center justify-center text-black">
            Continut interior
          </div>
  
          {/* DREAPTA */}
          <div className="grid grid-rows-9 w-[100px]">
          {[...Array(9)].map((_, i) => (
            <Tile key={i} {...tiles[(31 + i).toString()]} />
          ))}
        </div>
        </div>
  
        {/* JOS */}
        <div className="grid grid-cols-11 h-[90px]">
          {[...Array(11)].map((_, i) => (
            <Tile key={i} {...tiles[i.toString()]} />
          ))}
        </div>

      </div>
    </div>
  )
    
}

export default BoardPage
