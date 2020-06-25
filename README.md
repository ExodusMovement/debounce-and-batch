# debounce-and-batch

debounce and batch-process events

## Usage

```js
const debounceAndBatch = require('debounce-and-batch')

// say you want to batch process throwing away the trash
const emptyTrash = debounceAndBatch({
  name: 'trash batch-processor',
  interval: 1000,
  concurrency,
  onBatch: async (items) => {
    console.log(`emptying ${items.length} from trash`)
  },
})

eventEmitter.on('trash', emptyTrash)
```
