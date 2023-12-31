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

export const checkHorizontal = (grid: Grid) => {
  for (const row of grid) {
    const target = row[0];
    if (row.every((cell) => cell === target) && target !== undefined) {
      return true;
    }
  }
  return false;
};

export const checkVertical = (grid: Grid) => {
  for (let i = 0; i < grid.length; i++) {
    let column: string[] = [];
    for (let j = 0; j < grid.length; j++) {
      column.push(grid[j][i]);
    }
    const target = column[0];
    if (column.every((cell) => cell === target) && target !== undefined) {
      return true;
    }
  }
  return false;
};

export const checkDiagonalDirection = (
  grid: Grid,
  direction: 'leftToRight' | 'rightToLeft'
): boolean => {
  const diagonal: string[] = [];

  for (let i = 0; i < grid.length; i++) {
    const diagonalIndex = direction === 'leftToRight' ? i : grid.length - 1 - i;
    diagonal.push(grid[i][diagonalIndex]);
  }

  const target = diagonal[0];
  return diagonal.every((cell) => cell === target) && target !== undefined;
};

export const checkDiagonal = (grid: Grid): boolean => {
  return (
    checkDiagonalDirection(grid, 'leftToRight') ||
    checkDiagonalDirection(grid, 'rightToLeft')
  );
};

const checkForWin = (grid: Grid) => {
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
      {grid.map((row, r) => {
        return (
          <div key={r} className='row'>
            {row.map((cell, c) => (
              <div key={c} className='cell' onClick={() => handleClick(r, c)}>
                {cell}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

export default App;
