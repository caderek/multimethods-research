import { multi, method, __ } from '@arrows/multimethod'
import { getType, types } from '@arrows/dispatch'

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
    console.log('Creating store!', { reducer, preloadedState })
  }),
)

/* More elegant version with dispatch utils and separate functions */

const createStore2 = multi(
  (...args) => args.slice(0, 4).map(getType),

  method([__, types.Function, types.Function, __], handleEnhancersError),

  method([__, __, types.Function, types.Function], handleEnhancersError),

  method([__, __, __.notIn(types.Function, undefined), __], () => {
    throw new Error(`Expected the enhancer to be a function.`)
  }),

  method([__, types.Function, __, __], (reducer, enhancer) => {
    return enhancer(createStore)(reducer)
  }),

  method([__, __, types.Function, __], (reducer, preloadedState, enhancer) => {
    return enhancer(createStore)(reducer, preloadedState)
  }),

  method([__.not(types.Function), __, __, __], () => {
    throw new Error(`Expected the root reducer to be a function.`)
  }),

  method(create),
)

function handleEnhancersError() {
  throw new Error('Several store enhancers')
}

function create(reducer, preloadedState) {
  console.log('Creating store!', { reducer, preloadedState })
  // Store creation code...
}
