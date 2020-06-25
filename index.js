const assert = require('assert')
const makeConcurrent = require('make-concurrent')

module.exports = ({ name = '', interval, onBatch, concurrency = 1 }) => {
  assert(typeof interval === 'number', 'expected number "interval"')
  assert(typeof onBatch === 'function', 'expected number "onBatch"')

  const batch = []
  const emitBatch = makeConcurrent(
    async () => {
      const copy = batch.slice()
      batch.length = 0
      try {
        // coerce to Promise to handle both sync and async errs
        await Promise.resolve(onBatch(copy))
      } catch (err) {
        console.warn(`"${name}" batch handler failed`, err.message, err.stack)
      }
    },
    { concurrency }
  )

  let emitBatchTimeout

  const add = (item) => {
    batch.push(item)
    clearTimeout(emitBatchTimeout)
    emitBatchTimeout = setTimeout(emitBatch, interval)
  }

  return add
}
