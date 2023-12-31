import { useState } from 'react';

export const GRID_SIZE = 3;

export type Grid = string[][];

const generateGrid = (size: number): Grid => {
  const grid = [];

  for (let i = 0; i < size; i++) {
    grid.push([...Array(size)]);
  }

  return grid;
};

/** Checks in an array that all elements are the same */
const isLineWinning = (line: string[]): boolean => {
  const target = line[0];
  return target !== undefined && line.every((cell) => cell === target);
};

const checkHorizontal = (grid: Grid) => {
  return grid.some(isLineWinning);
};

const checkVertical = (grid: Grid) => {
  for (let i = 0; i < grid.length; i++) {
    let column: string[] = [];
    for (const row of grid) {
      column.push(row[i]);
    }
    if (isLineWinning(column)) return true;
  }
  return false;
};

const checkDiagonalDirection = (
  grid: Grid,
  direction: 'leftToRight' | 'rightToLeft'
): boolean => {
  const diagonal: string[] = [];

  for (let i = 0; i < grid.length; i++) {
    const diagonalIndex = direction === 'leftToRight' ? i : grid.length - 1 - i;
    diagonal.push(grid[i][diagonalIndex]);
  }

  return isLineWinning(diagonal);
};

const checkDiagonal = (grid: Grid): boolean => {
  return (
    checkDiagonalDirection(grid, 'leftToRight') ||
    checkDiagonalDirection(grid, 'rightToLeft')
  );
};

export const checkForWin = (grid: Grid) => {
  return checkHorizontal(grid) || checkVertical(grid) || checkDiagonal(grid);
};

function App() {
  const [grid, setGrid] = useState(generateGrid(GRID_SIZE));
  const [role, setRole] = useState(true);

  const handleClick = (row: number, col: number) => {
    grid[row][col] = role ? 'x' : 'o';
    setRole((prev) => !prev);
    setGrid([...grid]);
    if (checkForWin(grid)) {
      alert(`${role ? 'x' : 'o'} wins`);
    }
  };

  return (
    <div className='App'>
      <h1>Tic-Tac-Toe</h1>
      {grid.map((row, r) => (
        <div key={r} className='row'>
          {row.map((cell, c) => (
            <div key={c} className='cell' onClick={() => handleClick(r, c)}>
              {cell}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;
