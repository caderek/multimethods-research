import { multi, method, __ } from '@arrows/multimethod'
import { getType, types } from '@arrows/dispatch'

/* With custom dispatch per method */

const createStore = multi(
  method(
    (args) =>
      (typeof args[1] === 'function' && typeof args[2] === 'function') ||
      (typeof args[2] === 'function' && typeof args[3] === 'function'),
    () => {
      throw new Error('Several store enhancers')
    },
  ),

  method(
    (args) => args[2] !== undefined && typeof args[2],
    () => {
      throw new Error(`Expected the enhancer to be a function.`)
    },
  ),

  method(
    (args) => typeof args[1] === 'function',
    (reducer, enhancer) => {
      return enhancer(createStore)(reducer)
    },
  ),

  method(
    (args) => typeof args[2] === 'function',
    (reducer, preloadedState, enhancer) => {
      return enhancer(createStore)(reducer, preloadedState)
    },
  ),

  method(
    ([reducer]) => typeof reducer !== 'function',
    () => {
      throw new Error(`Expected the root reducer to be a function.`)
    },
  ),

  method((reducer, preloadedState) => {
    console.log('Creating store!', { reducer, preloadedState })
    // Store creation code...
  }),
)
