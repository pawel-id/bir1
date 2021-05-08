# Notes to self

## ESM migration

### package.json

type -> commonjs / module

### tsconfig.json

module: commonjs / es2020
esModuleInterop: true - this is not required on esm

### src/index.ts

commonjs

import { default as Bir } from './bir'
export = Bir

esm

import Bir from './bir.js'
export default Bir

### any file

```javascript
import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
```
