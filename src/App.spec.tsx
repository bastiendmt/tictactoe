import { expect, test } from 'vitest';
import { GRID_SIZE, Grid, checkForWin } from './App';

/**
 * Dynamically creates a grid with a vertical or horizontal winning configuration
 * @param gridSize Size of the Grid (X by X)
 * @param winningDirection Direction of the winning grid
 * @param validIndex Index of the column to put 'X'
 */
function createVerticalValidGrid(
  gridSize: number,
  winningDirection: 'horizontal' | 'vertical',
  validIndex = -1
): Grid {
  const grid: Grid = [];

  for (let i = 0; i < gridSize; i++) {
    const row: string[] = [];
    for (let j = 0; j < gridSize; j++) {
      // Set the value of each cell in the column to columnValue
      const incrementChar = String.fromCharCode(
        'a'.charCodeAt(0) + i * gridSize + j
      );
      const isVertical = winningDirection === 'vertical';
      const isVerticalMatch = isVertical && j === validIndex;
      const isHorizontalMatch = !isVertical && i === validIndex;

      const cellValue =
        isVerticalMatch || isHorizontalMatch ? 'X' : incrementChar;

      row.push(cellValue);
    }
    grid.push(row);
  }

  return grid;
}

test('horizontal function', () => {
  const standardGrid = createVerticalValidGrid(GRID_SIZE, 'horizontal');
  expect(checkForWin(standardGrid)).toBe(false);
  const winningGrid = createVerticalValidGrid(GRID_SIZE, 'horizontal', 2);
  expect(checkForWin(winningGrid)).toBeTruthy();
});

test('vertical function', () => {
  const standardGrid = createVerticalValidGrid(GRID_SIZE, 'vertical');
  expect(checkForWin(standardGrid)).toBe(false);
  const winningGrid = createVerticalValidGrid(GRID_SIZE, 'vertical', 2);
  expect(checkForWin(winningGrid)).toBeTruthy();
});

test('diagonal function', () => {
  const baseGrid: Grid = [
    ['a', 'b', 'c'],
    ['d', 'e', 'f'],
    ['g', 'h', 'i'],
  ];

  const LTRWinningGrid: Grid = [
    ['X', 'b', 'c'],
    ['d', 'X', 'f'],
    ['g', 'h', 'X'],
  ];
  const RTLWinningGrid: Grid = [
    ['a', 'b', 'X'],
    ['d', 'X', 'f'],
    ['X', 'h', 'i'],
  ];

  expect(checkForWin(baseGrid)).toBe(false);
  expect(checkForWin(LTRWinningGrid)).toBeTruthy();
  expect(checkForWin(RTLWinningGrid)).toBeTruthy();
});
