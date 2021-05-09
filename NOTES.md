# Notes to self

## ESM migration

### settings

| file - setting                  | commonjs | esm           |
| ------------------------------- | -------- | ------------- |
| package.json - type             | commonjs | module        |
| tsconfig.json - module          | commonjs | es2020        |
| tsconfig.json - esModuleInterop | true     | not required? |

### exporting modules

src/index.ts

commonjs

```javascript
import { default as Bir } from './bir'
export = Bir
```

esm

```javascript
import Bir from "./bir.js";
export default Bir;
```

### \_\_dirname

definie \_\_dirname missing in esm

```javascript
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
```

## API documentation

consider to use

- [typedoc](https://www.npmjs.com/package/typedoc)

  `npx typedoc src/bir.ts --out docs-api --excludePrivate`

- [api-extractor](https://www.npmjs.com/package/@microsoft/api-extractor)

  see [example usage](https://github.com/puppeteer/puppeteer/blob/main/package.json)
