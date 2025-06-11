import { useState, useMemo, useCallback } from 'react';

function App() {
  const [fibIndex, setFibIndex] = useState(0);

  const slowFibonacci = (n) => {
    if (n <= 1) return 1;
    return slowFibonacci(n - 1) + slowFibonacci(n - 2);
  };

  const fibResult = useMemo(() => slowFibonacci(Number(fibIndex)), [fibIndex]);

  const handleLog = useCallback(() => {
    console.log("Logging value or toggling");
  }, []);

  return (
    <>
      <h1>Fibonacci Calculator</h1>
      <h2>Fibonacci of {fibIndex} is: {fibResult}</h2>
      <input
        type="number"
        onChange={(e) => setFibIndex(e.target.value)}
        placeholder="Enter FibIndex"
      />
      <button onClick={handleLog}>Log Something</button>
    </>
  );
}

export default App;
