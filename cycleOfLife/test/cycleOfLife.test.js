import cycleOfLife from '../src/cycleOfLife';
import _, { words, xor } from 'lodash'

const State = {
  dead: 0,
  alive: 1
}

function createWorld(height, width) {
  const world = new Array
  for (let i = 0; i < height; i++) {
    world.push(new Array(width).fill(State.dead))
  }
  return world
}

function giveLife(height, width, world) {
  if (width < 0 || height < 0)
    throw "Out of bounds"
  world[height][width] = State.alive
}

function giveStateOfCellIn(height, width, world) {
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

	let mapCopy = _.cloneDeep(world)

  for (let height = 0; height < world.length; height++) {
    for (let width = 0; width < world[height].length; width++) {
      if (world[height][width] == State.alive) {
        const stateOfCell = shouldDie(height, width, world)
        // console.log(height,width, 'is should die: ', stateOfCell)
        if (stateOfCell) {
          mapCopy[height][width] = State.dead
        }
      } else {
        const stateOfCell = shouldBeResurected(height, width, world)
        // console.log(height,width, 'is still resurected: ', stateOfCell)
        if (stateOfCell) {
          mapCopy[height][width] = State.alive
        }
      }
    }
  }

	return mapCopy
}

function countCellAliveAroundAt(height, width, world) {
  let countAlive = 0
  
  // top
  countAlive += ((height - 1 >= 0) && world[height - 1][width] == State.alive) ? 1 : 0 
  // bottom
  countAlive += ((height + 1 < world[0].length) && world[height + 1][width] == State.alive) ? 1 : 0 
  // right
  countAlive += ((width + 1 < world.length) && world[height][width + 1] == State.alive) ? 1 : 0 
  // left
  countAlive += ((width - 1 >= 0) && world[height][width - 1] == State.alive) ? 1 : 0 

  // Left + Top
  countAlive += ((height - 1 >= 0) && (width - 1 >= 0) && world[height - 1][width - 1] == State.alive) ? 1 : 0 
  // right + Top
  countAlive += ((height - 1 >= 0) && (width + 1 < world.length) && world[height - 1][width + 1] == State.alive) ? 1 : 0 
  // Left + Bot
  countAlive += ((height + 1 < world[0].length) && (width - 1 >= 0) && world[height + 1][width - 1] == State.alive) ? 1 : 0 
  // Right + Bot
  countAlive += ((height + 1 < world[0].length) && (width + 1 < world.length) && world[height + 1][width + 1] == State.alive) ? 1 : 0 
  
  return countAlive
}

function shouldBeResurected(height, width, world) {
  let countAlive = countCellAliveAroundAt(height, width, world);

  return countAlive == 3
}

function shouldDie(height, width, world) { //height, width
  let countAlive = countCellAliveAroundAt(height, width, world)
  
  return countAlive < 2 || countAlive > 3
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
  expect(world[2][1]).toBe(State.alive)
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

  const newWorld = resolveWorldTick(world)
  const result = giveStateOfCellIn(1, 1, newWorld)


  expect(result).toBe(State.dead)
})

console.log('----------------')

test('If one cell has two or three neighbors it should stay alive', () => {
  // Given 
  const world = createWorld(3, 3)
  /*
  000
  110
  010 
  */
  giveLife(1, 0, world)
  giveLife(1, 1, world)
  giveLife(2, 1, world)

  // When
  const newWorld = resolveWorldTick(world)
  
  // Then
  expect(giveStateOfCellIn(1, 0, newWorld)).toBe(State.alive)
  expect(giveStateOfCellIn(1, 1, newWorld)).toBe(State.alive)
  expect(giveStateOfCellIn(2, 1, newWorld)).toBe(State.alive)
})


test('If a cell got more than 3 neighboor', () => {
	//given 
	const world = createWorld(3,3)
	
	//start
	//010
	//111
	//010
	//expected
	//010
	//101
	//010
	

	giveLife(0,1, world)
	giveLife(1,0, world)
	giveLife(1,1, world)
	giveLife(1,2, world)
	giveLife(2,1, world)
	//When
	const newWorld =  resolveWorldTick(world)

	//Then
	expect(giveStateOfCellIn( 0, 1, newWorld)).toBe(State.alive)
	expect(giveStateOfCellIn( 1, 0, newWorld)).toBe(State.alive)
	expect(giveStateOfCellIn( 1, 1, newWorld)).toBe(State.dead)
	expect(giveStateOfCellIn( 1, 2, newWorld)).toBe(State.alive)
	expect(giveStateOfCellIn( 2, 1, newWorld)).toBe(State.alive)
})

test('If a dead cell is surounded by 3 cells alive it should be resurrected', () => {
  const world = createWorld(3, 3)

  
	//start
	//010
	//100
	//010
	//expected
	//000
	//110
	//000
	const expectedWorld = createWorld(3, 3)
  giveLife(1, 0, expectedWorld)
  giveLife(1, 1, expectedWorld)


	giveLife(0,1, world)
	giveLife(1,0, world)
	giveLife(2,1, world)
	//When
	const newWorld =  resolveWorldTick(world)

	//Then
  expect(newWorld).toStrictEqual(expectedWorld)
})
