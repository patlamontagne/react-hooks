# Hooks

### useLocalStorage

Same usage as `useState` except the value is stored in browser local storage and restored on initial render.

```js
const [value, setValue] = useLocalStorage('keyname', false);
```