import React from 'react';
import LeaderBoardLayout from '../layouts/LeaderBoardLayout';
import { getGameData } from '../data/games';

export default function TetrisLeaderBoard() {
  const data=getGameData("TETRIS");
  return <LeaderBoardLayout {...data}/>;
}