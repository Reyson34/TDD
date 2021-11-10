import cycleOfLife from '../src/cycleOfLife';
import _, { xor } from 'lodash'

function createWorld(width, height) {
  const world = new Array
  for (let i = 0; i < height; i++) {
    world.push(new Array(width).fill(0))
  }
  return world
}

test('Hello Cell World', () => {
  const world = createWorld(3,3)
  expect(world).toBeInstanceOf(Array)
  expect(world.length).toBe(3)
  expect(world[0].length).toBe(3)
  _.forEach(world, row => {
    _.forEach(row, cell => {
      expect(cell).toBe(0)
    })
  })
})

function giveLife(width, height, world) {
  if (width < 0 || height < 0)
    throw "Out of bounds"
  world[height][width] = 1
}

test('Hello living Cell', () => {
  const world = createWorld(3,3)
  giveLife(2, 1, world)
  expect(world[1][2]).toBe(1)
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
