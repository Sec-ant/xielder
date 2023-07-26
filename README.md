# xielder

> A `yield` expression is only allowed in a generator body. --`ts(1163)`

But you can **`xield`** anywhere.

## Install

```bash
npm i xielder
```

## Usage

❌ You can not `yield` in a callback function:

```ts
function* x() {
  setInterval(() => {
    yield Date.now();
  }, 1000);
}

for (const d of x) {
  console.log(d);
}
```

✅ But you can `xield` in it:

```ts
import { xielder } from "xielder";

const x = xielder<number>((xield) => {
  setInterval(() => {
    xield(Date.now());
  }, 1000);
});

for await (const d of x) {
  console.log(d);
}
```

✅ use `close` to stop `xield`inig:

```ts
import { xielder } from "xielder";

const x = xielder<number>((xield, close) => {
  setInterval(() => {
    xield(Date.now());
  }, 1000);

  setTimeout(() => {
    close();
  }, 15000);
});

for await (const d of x) {
  console.log(d);
}
```

## License

MIT
