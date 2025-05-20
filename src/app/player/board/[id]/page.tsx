"use client"
import rawTiles from "@/locales/tiles.json"
import Tile from '@/app/components/tile'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useSelector } from 'react-redux'
import axios from "axios"
import PlayerStatusModal from "@/app/components/statsModal"

type Player = {
  id: number;
  position: number;
  balance: number;
  in_jail: boolean;
  is_bankrupt: boolean;
};

const tiles = rawTiles as Record<string, {
  name: string
  type?: string
  color?: string
  price?: number
  amount?: number
}>

const property = {
  can_buy: Boolean,
  id: Number,
  name: String,
  price: Number
}

const TILE_COUNT_ROW = 11
const TILE_COUNT_COL = 9
const TILE_SIZE = 50

const BoardPage = () => {
  const [game, setGame] = useState<any>(null)
  const [canBuy, setCanBuy] = useState<boolean>(false)
  const [currentRound, setCurrentRound] = useState<any>()
  const [players, setPlayers] = useState<Player[]>([])
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null)
  const [showStatsModal, setShowStatsModal] = useState(false)
  const [showTradeModal, setShowTradeModal] = useState(false)
  const [showAuctionModal, setShowAuctionModal] = useState(false)
  const [showChance, setShowChance] = useState(false)
  const [showCommunityChest, setShowCommunityChest] = useState(false)
  const [dice1, setDice1] = useState<number | null>(null)
  const [dice2, setDice2] = useState<number | null>(null)

  const { id } = useParams<{ id: string }>();

  const user = useSelector((state: any) => state.user);
  const token = String(user?.data?.user?.token);

  const statsModal = () => {
    setShowStatsModal(true); 
  }

  const tradeModal = () => {
    //todo
  }

  const auctionModal = () => {
    //todo
  }

  const onCloseStatsModal = () => {
    setShowStatsModal(false)
  }

  const onCloseTradeModal = () => {
    setShowTradeModal(false)
  }

  const onCloseAuctionModal = () => {
    setShowAuctionModal(false)
  }

  const onCloseChance = () => {
    setShowChance(false)
  }

  const onCloseCommunityChest = () => {
    setShowCommunityChest(false)
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

  const onPayRent = () => {
    //todo
  }

  const onAuction = () => {
    //todo
  }

  const onChance = () => {
    //todo
  }

  const onCommunityChest = () => {
    //todo
  }

  const onTrade = () => {
    //todo
  }


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

      // go to prison, start(collect 200),luxury tax, chance, community chest
      // price isnt 0
      if(roll.data.property.owner_id !== null) {
        //todo pay rent/ verificare daca e a lui
      } else if(roll.data.property.name === "chance") {
        setShowChance(true)
      } else if(roll.data.property.name === "Community Chest") {
        setShowCommunityChest(true)
      } else if(roll.data.property.name === "Go to Jail") {
      } else if(roll.data.property.name === "Income Tax") {
      } else if(roll.data.property.start) {
        //todo: collect 200
      } else if(roll.data.property.name === "Jail") {
      } else if(roll.data.property.name === "Free Parking") {

      } else{
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
          {[...Array(11)].map((_, i) => (
            <Tile tileNumber={i + 20} players={players} key={i} {...tiles[(20 + i).toString()]} />
          ))}
        </div>

        {/* CENTRU cu STANGA + DREAPTA */}
        <div className="flex flex-1">

          {/* STÂNGA */}
          <div className="grid grid-rows-9 w-[100px]">
            {[...Array(9)].map((_, i) => (
              <Tile tileNumber={19 - i} players={players} key={i} {...tiles[(19 - i).toString()]} />
            ))}
          </div>

          {/* CONTINUT CENTRAL */}
          <div className="flex-1 flex-col bg-green-200 flex items-center justify-center text-black">
            <div className="bg-white border border-black p-4 w-100 text-sm shadow-lg rounded-md">
              {/* Tabs */}
              <div className="flex justify-between mb-2">
                
                <button
                  onClick={() => onBuy(currentRound?.id)}
                  disabled={canBuy}
                    className="cursor-pointer bg-gradient-to-b rounded-md hover:to-blue-900 from-blue-500
                     to-blue-700 text-white px-3 py-1 border border-white text-xs font-semibold w-full"
                  >
                    buy
                  </button>

              </div>

              {/* Status + Player */}
              <div className="flex">
                {/* Status textarea */}
                <textarea
                  readOnly
                  className="border border-black resize-none rounded-md p-1 w-full h-20 text-xs font-mono"
                  defaultValue={`It is Player 1's turn.`}
                ></textarea>

                {/* Player info */}
                <div className="ml-2 border border-black rounded-md px-2 w-[85px] py-1 text-xs font-semibold bg-white">
                  <div className="text-black">Player 1:</div>
                  <div className="text-green-700">$1500</div>
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
              {players.map((player, index) => (
                <div
                //Todo: temporar va trebui modficata.
                  key={index}
                  onClick={() => setShowStatsModal(true)}
                  className="group relative cursor-pointer border border-gray-400 rounded bg-gray-100 px-2 py-1 text-xs hover:bg-gray-200"
                >
                  <div className="font-semibold">Player {index}</div>
                  <div className="text-green-700 font-bold">$1500</div>

                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-fit bg-black text-white text-[10px] rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                    {/* Conținut personalizat pentru fiecare jucător */}
                    Informatii
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DREAPTA */}
          <div className="grid grid-rows-9 w-[100px]">
            {[...Array(9)].map((_, i) => (
              <Tile tileNumber={i + 31} players={players} key={i} {...tiles[(31 + i).toString()]} />
            ))}
          </div>

        </div>

        {/* JOS */}
        <div className="grid grid-cols-11 h-[90px]">
          {[...Array(11)].map((_, i) => (
            <Tile tileNumber={10 - i} players={players} key={i} {...tiles[(10 - i ).toString()]} />
          ))}
        </div>
        {/* MODAL */}
       

      </div>
    </div>
  )
}

export default BoardPage
