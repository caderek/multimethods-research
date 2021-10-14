import b from 'benny'
import createStoreOriginal from '../examples/redux/createStoreOriginal.js'
import createStore1 from '../examples/redux/createStore.js'
import createStore2 from '../examples/redux/createStore2.js'
import createStore3 from '../examples/redux/createStore3.js'

const enhancer = (createStore) => (reducer, preloadedState) => {}

const benchmarks = (cases) =>
  cases.map(([name, createStore]) =>
    b.add(name, () => {
      createStore({}, enhancer)
      createStore(() => {}, {}, enhancer)
      createStore(() => {}, {})
      createStore(() => {})
    }),
  )

b.suite(
  'createStore',

  ...benchmarks([
    ['original', createStoreOriginal],
    ['v1', createStore1],
    ['v2', createStore2],
    ['v3', createStore3],
  ]),

  b.cycle(),
  b.complete(),
  b.save({ file: 'createStore', format: 'chart.html' }),
)

/** Usage */
