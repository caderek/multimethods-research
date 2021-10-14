import { multi, method, _ } from '@arrows/multimethod'
import { getType, types } from '@arrows/dispatch'
import { not, notIn } from './predicates.js'

/* More elegant version with dispatch utils and separate functions */

const createStore = multi(
  (...args) => args.slice(0, 4).map(getType),

  method([_, types.Function, types.Function, _], handleEnhancersError),

  method([_, _, types.Function, types.Function], handleEnhancersError),

  method([_, _, notIn(types.Function, undefined), _], () => {
    throw new Error(`Expected the enhancer to be a function.`)
  }),

  method([_, types.Function, _, _], (reducer, enhancer) => {
    return enhancer(createStore)(reducer)
  }),

  method([_, _, types.Function, _], (reducer, preloadedState, enhancer) => {
    return enhancer(createStore)(reducer, preloadedState)
  }),

  method([not(types.Function), _, _, _], () => {
    throw new Error(`Expected the root reducer to be a function.`)
  }),

  method(create),
)

function handleEnhancersError() {
  throw new Error('Several store enhancers')
}

function create(reducer, preloadedState) {
  // Store creation code...
}

export default createStore
