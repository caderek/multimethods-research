import { multi, method, __ } from '@arrows/multimethod'

/* Direct translation */

const createStore = multi(
  (...args) => args.slice(0, 4).map((arg) => typeof arg),

  method([__, 'function', 'function', __], () => {
    throw new Error('Several store enhancers')
  }),

  method([__, __, 'function', 'function'], () => {
    throw new Error('Several store enhancers')
  }),

  method([__, __, __.notIn('function', undefined), __], () => {
    throw new Error(`Expected the enhancer to be a function.`)
  }),

  method([__, 'function', __, __], (reducer, enhancer) => {
    return enhancer(createStore)(reducer)
  }),

  method([__, __, 'function', __], (reducer, preloadedState, enhancer) => {
    return enhancer(createStore)(reducer, preloadedState)
  }),

  method([__.not('function'), __, __, __], () => {
    throw new Error(`Expected the root reducer to be a function.`)
  }),

  method((reducer, preloadedState) => {
    // Store creation code...
  }),
)

export default createStore
