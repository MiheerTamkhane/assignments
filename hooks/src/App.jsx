import { useEffect, useState, useRef } from "react";
import "./App.css";

const useIsOnline = () => {
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    let online = window.navigator.onLine;
    setIsOnline(online);
  }, []);

  return isOnline;
};

const useMousePointer = () => {
  const [coors, setCoors] = useState({});
  function onMouseMove(e) {
    let x = e.clientX;
    let y = e.clientY;
    let coors = { x, y };
    setCoors(coors);
  }

  function onMouseOut() {
    setCoors({ x: 0, y: 0 });
  }
  return [onMouseMove, onMouseOut, coors];
};

const useInterval = (fn, delay) => {
  const intervalId = setInterval(fn, delay);

  return () => clearInterval(intervalId);
};

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    let timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};

function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

function App() {
  const isOnline = useIsOnline();
  const [onMouseMove, onMouseOut, coors] = useMousePointer();
  const [count, setCount] = useState(0);
  const [input, setInput] = useState("");
  const some = useState();
  const previousValue = usePrevious(count);
  // useInterval(() => {
  //   setCount(count + 1);
  // }, 1000);

  const debouncedValue = useDebounce(input, 500);
  // const defferedValue = useDeferredValue(input, { timeout: 1000 });
  console.log("previousValue : ", previousValue);
  return (
    <div>
      <h1>Custom Hooks</h1>
      <p>
        {count} : {previousValue}
      </p>
      <button onClick={(e) => setCount((c) => c + 1)}>Inc Count</button>
      <br />
      <h2>Is user online : {isOnline ? "YES" : "NO"}</h2>
      <br />
      <h2>Mouse pointer </h2>
      <div
        style={{
          width: "200px",
          height: "100px",
          border: "1px solid black",
          background: "gray",
          cursor: "pointer",
        }}
        onMouseMove={onMouseMove}
        onMouseOut={onMouseOut}
      ></div>
      <p>{"Coordinates: (" + (coors.x || 0) + "," + (coors.y || 0) + ")"}</p>
      <br />
      <h2>useIntervalHook</h2>
      <p>Timer: {count}</p>
      <br />
      <input
        type="text"
        placeholder="debounce..."
        onChange={(e) => setInput(e.target.value)}
        value={input}
      />
    </div>
  );
}

export default App;
