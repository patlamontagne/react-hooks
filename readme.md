# Hooks usage


## useToggle

Shortcut for togglable boolean states.

```js
const [value, valueToggle] = useToggle(false);

return (
    <div onClick={valueToggle}>
        {value && <span>Active</span>}
        {!value && <span>Inactive</span>}
    </div>
);
```


## useLocalStorage

Same usage as `useState` except the value is stored in browser local storage and restored on initial render.

```js
const [value, setValue] = useLocalStorage('keyname', false);
```


## useMouseOverDelay

Improves mouseenter/mouseleave interactions by using a delay. Helpful to prevent unwanted opening/closing of menus and such as soon as the mouse enters/leaves the boundary. Great for user experience.

```js
const [delayMouseEnter, delayMouseLeave] = useMouseOverDelay(250);
const [open, setOpen] = useState(false);

const handleClick = () => setOpen(true);
const handleMouseEnter = () => delayMouseEnter(() => setOpen(true));
const handleMouseLeave = () => delayMouseLeave(() => setOpen(false));

return (
    <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
    >
        <span>Menu</span>
        {open && <Menu />}
    </div>
);
```


## useOnClickOutside

Calls the provided function when user clicks or taps outside the provided element(s).

```js
const modalRef = useRef();
const [open, setOpen] = useState(false);
useOnClickOutside([modalRef], closeModal);

function openModal() { setOpen(true); }
function closeModal() { setOpen(false); }

return (
    <div>
        <h1>Component</h1>
        <button onClick={openModal}>Open modal</button>

        {open && (
            <div ref={modalRef}>
                <h2>Modal</h2>
                <button onClick={closeModal}>Close modal</button>
            </div>
        )}
    </div>
);
```

##  usePosition

Returns the geolocation data of the user. The service needs to be enabled at first render or after a user prompt.

### Watcher mode

With `usePosition(true)` position data will be updated and rerender the component.

### Non-watcher mode

With `usePosition(false)`, will only return position data once.

### Options

You can pass custom options to the geolocation service like so `usePosition(true, options)`.

Refer to https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition

```js
const { position, error, enableService } = usePosition(true);

useEffect(function() {
    // Ask the browser to enable the geolocation service on component render.
    enableService();
}, []);

if (error) {
    // Geolocation no supported
    return <div className="text-red-500">{error}</div>;
}

return  (
    <div>
        <div>My latitude : {position.latitude}</div>
        <div>My longitude : {position.longitude}</div>
        <div>My speed : {position.speed}</div>
    </div>
);
```


## useScrollTo

Provides functions to easily scroll to specific positions or elements.

```js
const [scrollToTop] = useScrollTo(0);
const [scrollToFooter, setFooterRef] = useScrollTo();

return  (
    <div>
        <button onClick={scrollToFooter}>Scroll to footer</button>
        {/* ... */}
        <footer ref={setFooterRef}>
            <button onClick={scrollToTop}>Scroll top</button>
        </footer>
    </div>
);
```

Can also use already existing ref.

```js
const [scrollToParent] = useScrollTo(parentRef);

return  (
    <div>
        <button onClick={scrollToParent}>Scroll to parent</button>
    </div>
);
```

## useStopwatch

Provides functions to start, stop and reset a stopwatch timer.

```js
const initialTitle = document.title;
const startTime = 0;
const maxTime = 30;

const {
    elapsedTime,
    isRunning,
    start,
    stop,
    reset
} = useStopwatch(startTime);

const [failed, setFailed] = useState(false);

useEffect(function() {
    // start stopwatch on component first render.
    start();
}, []);

useEffect(function() {
    // check if time is up
    if (elapsedTime >= maxTime) {
        document.title = `⚠️ Time is up !`;
        setFailed(true);
        stop();
    } else if(isRunning) {
        document.title = `⏲️ ${elapsedTime} seconds...`;
    } else {
        document.title = initialTitle;
    }
}, [elapsedTime, isRunning]);

if (failed) {
    return (
        <div>
            <h1>Time is up !</h1>
        </div>
    );
}

return  (
    <div>
        <h1>{elapsedTime} seconds...</h1>
        <button onClick={start} disabled={isRunning}>Start</button>
        <button onClick={stop} disabled={!isRunning}>Stop</button>
        <button onClick={reset} disabled={elapsedTime === startTime}>Reset</button>
    </div>
);
```

## useWindowSize

Returns current window width and height.

```js
const mobileBreakPoint = 600;
const { width, height } = useWindowSize();
const [isMobile, setIsMobile] = useState(false);

useEffect(function () {
    if (width) {
        // toggle mobile menu when window width is below breakpoint
        setIsMobile(width < mobileBreakPoint);
    }
}, [width]);

return  (
    <div>
        {!isMobile && <span>Desktop</span> />}
        {isMobile && <span>Mobile</span>}
    </div>
);
```