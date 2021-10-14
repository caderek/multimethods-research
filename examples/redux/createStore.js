import { multi, method, _ } from '@arrows/multimethod'
import { not, notIn } from './predicates.js'

/* Direct translation */

const createStore = multi(
  (...args) => args.slice(0, 4).map((arg) => typeof arg),

  method([_, 'function', 'function', _], () => {
    throw new Error('Several store enhancers')
  }),

  method([_, _, 'function', 'function'], () => {
    throw new Error('Several store enhancers')
  }),

  method([_, _, notIn('function', undefined), _], () => {
    throw new Error(`Expected the enhancer to be a function.`)
  }),

  method([_, 'function', _, _], (reducer, enhancer) => {
    return enhancer(createStore)(reducer)
  }),

  method([_, _, 'function', _], (reducer, preloadedState, enhancer) => {
    return enhancer(createStore)(reducer, preloadedState)
  }),

  method([not('function'), _, _, _], () => {
    throw new Error(`Expected the root reducer to be a function.`)
  }),

  method((reducer, preloadedState) => {
    // Store creation code...
  }),
)

export default createStore
