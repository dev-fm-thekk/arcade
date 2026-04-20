import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';

// Lazy load actual pages for code-splitting efficiency
const Game2048 = lazy(() => import('./pages/Game2048'));
const Worldle = lazy(() => import('./pages/Worldle'));
const Tetris = lazy(() => import('./pages/Tetris'));

const Game2048LeaderBoard = lazy(() => import('./pages/Game2048LeaderBoard'));
const WorldleLeaderBoard = lazy(() => import('./pages/WorldleLeaderBoard'));
const TetrisLeaderBoard = lazy(() => import('./pages/TetrisLeaderBoard'));

export const appRoutes = [
  {
    path: "/",
    element: <Navigate to="/2048" replace />,
  },
  {
    path: "/2048",
    element: <Game2048 />,
  },
  {
    path: "/2048-leaderboard",
    element: <Game2048LeaderBoard />,
  },
  {
    path: "/worldle",
    element: <Worldle />,
  },
  {
    path: "/worldle-leaderboard",
    element: <WorldleLeaderBoard />,
  },
  {
    path: "/tetris",
    element: <Tetris />,
  },
  {
    path: "/tetris-leaderboard",
    element: <TetrisLeaderBoard />,
  }  
];
