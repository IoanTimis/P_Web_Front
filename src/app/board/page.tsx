"use client"
import rawTiles from "../../locales/tiles.json"
import Tile from '../components/tile'
import React, { useState } from 'react'


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

  const [dice1, setDice1] = useState<number | null>(null)
  const [dice2, setDice2] = useState<number | null>(null)

  const rollDice = () => {
    const d1 = Math.floor(Math.random() * 6) + 1
    const d2 = Math.floor(Math.random() * 6) + 1
    setDice1(d1)
    setDice2(d2)
  }

  return (
    <div className="min-h-screen bg-black flex justify-center items-center">
      <div className="w-[1100px] h-[900px] bg-green-200 flex flex-col">

        {/* SUS */}
        <div className="grid grid-cols-11 h-[90px]">
          {[...Array(11)].map((_, i) => (
            <Tile key={i} {...tiles[(20 + i).toString()]} />
          ))}
        </div>

        {/* CENTRU cu STANGA + DREAPTA */}
        <div className="flex flex-1">

          {/* STÂNGA */}
          <div className="grid grid-rows-9 w-[100px]">
            {[...Array(9)].map((_, i) => (
              <Tile key={i} {...tiles[(19 - i).toString()]} />
            ))}
          </div>

          {/* CONTINUT CENTRAL */}
          <div className="flex-1 bg-green-200 flex items-center justify-center text-black">
            <div className="bg-white border border-black p-4 w-100 text-sm shadow-lg">
              {/* Tabs */}
              <div className="flex justify-between mb-2">
                {['Buy', 'Manage', 'Trade'].map((tab) => (
                  <button
                    key={tab}
                    className="bg-gradient-to-b rounded-md hover:to-blue-900 from-blue-500 to-blue-700 text-white px-3 py-1 border border-white text-xs font-semibold w-full"
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Status + Player */}
              <div className="flex">
                {/* Status textarea */}
                <textarea
                  readOnly
                  className="border border-black resize-none p-1 w-full h-20 text-xs font-mono"
                  defaultValue={`It is Player 1's turn.`}
                ></textarea>

                {/* Player info */}
                <div className="ml-2 border border-black px-2 w-[85px] py-1 text-xs font-semibold bg-white">
                  <div className="text-black">Player 1:</div>
                  <div className="text-green-700">$1500</div>
                </div>
              </div>

              {/* Roll Dice Button */}
              <div className="flex justify-between items-center mt-2">
                <button
                  className="px-3 py-1 text-xs border border-black hover:bg-gray-200 rounded-md"
                  onClick={rollDice}
                >
                  Roll Dice
                </button>

                {/* Dice images */}
                <div className="flex space-x-1 ml-4">
                  {dice1 !== null && (
                    <img
                      src={`/images/Die_${dice1}.png`}
                      alt={`Dice ${dice1}`}
                      className="h-6 w-6"
                    />
                  )}
                  {dice2 !== null && (
                    <img
                      src={`/images/Die_${dice2}.png`}
                      alt={`Dice ${dice2}`}
                      className="h-6 w-6"
                    />
                  )}
                </div>
              </div>
            </div>
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
