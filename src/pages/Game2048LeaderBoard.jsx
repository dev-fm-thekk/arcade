import React from 'react';
import LeaderBoardLayout from '../layouts/LeaderBoardLayout';
import { getGameData } from '../data/games';

export default function Game2048LeaderBoard() {
  const data=getGameData("2048");
  return <LeaderBoardLayout {...data}/>;
}