import cycleOfLife from '../src/cycleOfLife';
import _, { xor } from 'lodash'

const State = {
  dead: 0,
  alive: 1
}

function createWorld(width, height) {
  const world = new Array
  for (let i = 0; i < height; i++) {
    world.push(new Array(width).fill(State.dead))
  }
  return world
}

function giveLife(width, height, world) {
  if (width < 0 || height < 0)
    throw "Out of bounds"
  world[height][width] = State.alive
}

function giveStateOfCellIn(width, height, world) {
  return world[height][width]
}

/*
State Initial
000
110
010
Resolve World
000
110
010
*/
function resolveWorldTick(world) {
  for (let height = 0; height < world.length; height++) {
    for (let width = 0; width < world[height].length; width++) {
      if (shouldDie(width, height, world)) {
        world[height][width] = State.dead
      }
    }
  }
}

function shouldDie(width, height, world) {
  let countAlive = 0
  
  // Left
  countAlive += ((width - 1 >= 0) && world[width - 1][height] == State.alive) ? 1 : 0 
  // Right
  countAlive += ((width + 1 < world[0].length) && world[width + 1][height] == State.alive) ? 1 : 0 
  // Bottom
  countAlive += ((height + 1 < world.length) && world[width][height - 1] == State.alive) ? 1 : 0 
  // Top
  countAlive += ((height - 1 >= 0) && world[width][height + 1] == State.alive) ? 1 : 0 

  // Left + Top
  countAlive += ((width - 1 >= 0) && (height - 1 >= 0) && world[width - 1][height - 1] == State.alive) ? 1 : 0 
  // Left + Bot
  countAlive += ((width - 1 >= 0) && (height + 1 < world.length) && world[width - 1][height + 1] == State.alive) ? 1 : 0 
  // Right + Top
  countAlive += ((width + 1 < world[0].length) && (height - 1 >= 0) && world[width + 1][height - 1] == State.alive) ? 1 : 0 
  // Right + Bot
  countAlive += ((width + 1 < world[0].length) && (height + 1 < world.length) && world[width + 1][height + 1] == State.alive) ? 1 : 0 
  return countAlive < 2;
}

test('Hello Cell World', () => {
  const world = createWorld(3,3)
  expect(world).toBeInstanceOf(Array)
  expect(world.length).toBe(3)
  expect(world[0].length).toBe(3)
  _.forEach(world, row => {
    _.forEach(row, cell => {
      expect(cell).toBe(State.dead)
    })
  })
})


test('Hello living Cell', () => {
  const world = createWorld(3,3)
  giveLife(2, 1, world)
  expect(world[1][2]).toBe(State.alive)
})

test('Give life not in bound with width', () => {
  const world = createWorld(3,3)
  try {
    giveLife(-1, 2, world)
  } catch (error) {
    expect(error).toBe('Out of bounds')
  }
})

test('Give life not in bound with height', () => {
  const world = createWorld(3,3)
  try {
    giveLife(1, -2, world)
  } catch (error) {
    expect(error).toBe('Out of bounds')
  }
})

test('If one cell is alone it should die', () => {
  const world = createWorld(3, 3)
  giveLife(1, 1, world)

  resolveWorldTick(world)
  const result = giveStateOfCellIn(1, 1, world)

  expect(result).toBe(State.dead)
})

test('If one cell has two neighbors it should stay alive', () => {
  // Given 
  const world = createWorld(3, 3)
  /*
  000
  110
  010 
  */
  giveLife(0, 1, world)
  giveLife(1, 1, world)
  giveLife(2, 1, world)

  // When
  resolveWorldTick(world)
  
  // Then
  expect(giveStateOfCellIn(0, 1, world)).toBe(State.alive)
  expect(giveStateOfCellIn(1, 1, world)).toBe(State.alive)
  expect(giveStateOfCellIn(2, 1, world)).toBe(State.alive)
})