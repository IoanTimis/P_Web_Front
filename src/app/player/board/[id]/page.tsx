"use client"

import rawTiles from "@/locales/tiles.json"
import Tile from '@/app/components/tile'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useSelector } from 'react-redux'
import axios from "axios"
import PlayerStatusModal from "@/app/components/statsModal"
import InfoModal from "@/app/components/infoModal"
import { Player } from "@/types/page"

const tiles = rawTiles as Record<string, {
  name: string
  type?: string
  color?: string
  price?: number
  amount?: number
}>

const TILE_COUNT_ROW = 11
const TILE_COUNT_COL = 9

const BoardPage = () => {
  const [game, setGame] = useState<any>(null);
  const [canBuy, setCanBuy] = useState<boolean>(true);
  const [currentRound, setCurrentRound] = useState<any>();
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [infoMessage, setInfoMessage] = useState('');
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [showTradeModal, setShowTradeModal] = useState(false);
  const [dice1, setDice1] = useState<number | null>(null);
  const [dice2, setDice2] = useState<number | null>(null);

  const { id } = useParams<{ id: string }>();

  const user = useSelector((state: any) => state.user);
  const token = String(user?.data?.user?.token);


  const infoModal = (message : string) => {
    setShowInfoModal(true);
    setInfoMessage(message);
  }

  const statsModal = () => {
    setShowStatsModal(true); 
  }

  const tradeModal = () => {
    //todo
  }

  const onCloseInfoModal = () => {
    setShowInfoModal(false);
    setInfoMessage('');
  }

  const onCloseStatsModal = () => {
    setShowStatsModal(false)
  }

  const onCloseTradeModal = () => {
    setShowTradeModal(false)
  }

  const onTrade = () => {
    //todo
  }
  
  const onBuy = (id_prop: number) => {
    try {
      const buy = async () => {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/games/${id}/property/${id_prop}/buy`,
          { player_id: game.current_player_id },
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log('Buy response:', response.data);
      };
      buy();
      setCanBuy(false);
    } catch (err) {
      console.error('Error buying property:', err);
    }
  };

  useEffect(() => {
    const gameStatus = async () => {
      if (!id || !token) {
        console.error('Missing id or token');
        return;
      }
      
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/games/${id}`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            }
          });

        console.log('gameStatus', response.data);
        setGame(response.data);
        setPlayers(response.data.players.map((player: any) => player));
        setCurrentPlayer(response.data.players.find((player: any) => player.id === response.data.current_player_id));
      } catch (err) {
        console.error('Error fetching game status:', err);
      }
    };
    
    gameStatus();
    // Reactualizare informatii la interval, acum e 5 sec
    // const interval = setInterval(gameStatus, 5000);
    // return () => clearInterval(interval);
  }, [id, token, dice1]);

  console.log("currentPlayer", currentPlayer);

  const rollDice = async () => {
    try {
      const roll = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/games/${id}/roll`,
        {player_id: game.current_player_id},
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
      console.log('Rolled dice:', roll.data);

      setCanBuy(false)
      setCurrentRound(roll.data.property);
      setDice1(roll.data.dice[0]);
      setDice2(roll.data.dice[1])

      console.log("position", currentPlayer?.position, "dice", roll.data.dice[0], " ",roll.data.dice[1]);
       
      if(currentPlayer?.position + roll.data.dice[0] + roll.data.dice[1] >= 40) {
        console.log("You passed GO");
        infoModal("Collect $200 as you pass GO");
      }

      if(roll.data.property.owner_id !== currentPlayer?.id) {
        //todo pay rent: nestabilita functionalitatea/nu e pe backend
      } else if(roll.data.property.name === "chance") {
        //Todo: inca nu e pe backend
      } else if(roll.data.property.name === "Community Chest") {
        //Todo: inca nu e pe backend
      } else if(roll.data.property.name === "Go to Jail") {
        infoModal("You landed on Go to Jail. Go directly to jail. Do not collect $200.");
        console.log("You landed on Go to Jail. Go directly to jail. Do not collect $200.");
      } else if(roll.data.property.name === "Income Tax") {
        infoModal("You landed on Income Tax. Pay $80");
        console.log("You landed on Income Tax. Pay $80");
      } else {
        setCanBuy(true)
      }
    } catch (err) {
      console.error('Error rolling dice:', err);
    }
  }

  return (
    <div className="py-1  min-h-screen bg-gray-200 flex justify-center items-center">
      <div className="w-[1100px] min-h-screen bg-green-200 flex flex-col shadow-2xl">

        {/* SUS */}
        <div className="grid grid-cols-11 h-[90px]">
          {[...Array(TILE_COUNT_ROW)].map((_, i) => (
            <Tile tileNumber={i + 20} players={players} key={i} {...tiles[(20 + i).toString()]} />
          ))}
        </div>

        {/* CENTRU cu STANGA + DREAPTA */}
        <div className="flex flex-1">

          {/* STÂNGA */}
          <div className="grid grid-rows-9 w-[100px]">
            {[...Array(TILE_COUNT_COL)].map((_, i) => (
              <Tile tileNumber={19 - i} players={players} key={i} {...tiles[(19 - i).toString()]} />
            ))}
          </div>

          {/* CONTINUT CENTRAL */}
          <div className="flex-1 flex-col bg-green-200 flex items-center justify-center text-black">
            <div className="bg-white border border-black p-4 w-100 text-sm shadow-lg rounded-md">
              {/* Tabs */}
              <div className="flex gap-5 justify-between mb-2">
                {/*buy btn */}
                <button
                  onClick={() => onBuy(currentRound?.id)}
                  disabled={canBuy}
                    className="cursor-pointer bg-gradient-to-b rounded-md hover:to-blue-900 from-blue-500
                     to-blue-700 text-white px-3 py-1 border border-white text-xs font-semibold w-full"
                  >
                    buy
                  </button>
                {/*trade btn */}
                  <button
                  onClick={() => tradeModal()}
                    className="cursor-pointer bg-gradient-to-b rounded-md hover:to-blue-900 from-blue-500
                     to-blue-700 text-white px-3 py-1 border border-white text-xs font-semibold w-full"
                  >
                    trade
                  </button>

              </div>

              {/* Status + Player */}
              <div className="flex">
                {/* Status textarea */}
                <textarea
                  readOnly
                  className="border border-black resize-none rounded-md p-1 w-full h-20 text-xs font-mono"
                  value={`It is ${currentPlayer?.username} turn.`}
                ></textarea>

                {/* Player info */}
                <div className="ml-2 border border-black rounded-md px-2 w-[85px] py-1 text-xs font-semibold bg-white">
                  <div className="text-black">{currentPlayer?.username}:</div>
                  <div className="text-green-700">${currentPlayer?.balance}</div>
                </div>
              </div>

              {/* Roll Dice Button */}
              <div className="flex justify-between items-center mt-2">
                <button
                  className="px-3 py-1 cursor-pointer text-xs border border-black hover:bg-gray-200 rounded-md"
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
            {/* Player Stats - sub banii jucătorului */}
            <div className="mt-3 grid grid-cols-2 gap-2 w-100">
              {/*TODO: cand se apasa pe un player va afisa un modal cu resurse detinute de acel player*/}
              {players.map((player, index) => (
                <div
                  key={index}
                  onClick={() => setShowStatsModal(true)}
                  className="group relative cursor-pointer border border-gray-400 rounded bg-gray-100 px-2 py-1 text-xs hover:bg-gray-200"
                >
                  <div className="font-semibold">{player.username}</div>
                  <div className="text-green-700 font-bold">${player.balance}</div>
                  {/* Player image */}
                  <img
                    src={`/images/player_${index + 1}.png`}
                    alt={`Player ${index + 1}`}
                    className="h-6 w-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  />

                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-fit bg-black text-white text-[10px] rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                    Informatii
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DREAPTA */}
          <div className="grid grid-rows-9 w-[100px]">
            {[...Array(TILE_COUNT_COL)].map((_, i) => (
              <Tile tileNumber={i + 31} players={players} key={i} {...tiles[(31 + i).toString()]} />
            ))}
          </div>

        </div>

        {/* JOS */}
        <div className="grid grid-cols-11 h-[90px]">
          {[...Array(TILE_COUNT_ROW)].map((_, i) => (
            <Tile tileNumber={10 - i} players={players} key={i} {...tiles[(10 - i ).toString()]} />
          ))}
        </div>
        {/* MODAL */}
       
      </div>

      {showInfoModal && (
        <InfoModal
          message={infoMessage}
          onClose={onCloseInfoModal}
        />
      )}
    </div>
  )
}

export default BoardPage
