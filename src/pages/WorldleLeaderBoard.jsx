import React from 'react';
import LeaderBoardLayout from '../layouts/LeaderBoardLayout';
import { getGameData } from '../data/games';

export default function WorldleLeaderBoard() {
  const data=getGameData("WORLDLE");
  return <LeaderBoardLayout {...data}/>;
}