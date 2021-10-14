import { multi, method, __ } from '@arrows/multimethod'

const fn = multi(
  (a, b) => [a, b],
  method((a, b) => {
    console.log({ a, b })
    return true
  }, 'ok'),
)

fn(1, 2, 3, 4)
