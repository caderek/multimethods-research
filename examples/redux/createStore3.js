import { multi, method, __ } from '@arrows/multimethod'
import { getType, types } from '@arrows/dispatch'

/* With custom dispatch per method */

const createStore = multi(
  method(
    (a, b, c, d) =>
      (typeof b === 'function' && typeof c === 'function') ||
      (typeof c === 'function' && typeof d === 'function'),
    () => {
      throw new Error('Several store enhancers')
    },
  ),

  method(
    (a, b, c) => c !== undefined && typeof c !== 'function',
    () => {
      throw new Error(`Expected the enhancer to be a function.`)
    },
  ),

  method(
    (a, b) => typeof b === 'function',
    (reducer, enhancer) => {
      return enhancer(createStore)(reducer)
    },
  ),

  method(
    (a, b, c) => typeof c === 'function',
    (reducer, preloadedState, enhancer) => {
      return enhancer(createStore)(reducer, preloadedState)
    },
  ),

  method(
    (a) => typeof a !== 'function',
    () => {
      throw new Error(`Expected the root reducer to be a function.`)
    },
  ),

  method((reducer, preloadedState) => {
    // Store creation code...
  }),
)

export default createStore
