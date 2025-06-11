import { useState, useMemo, useCallback, useEffect } from 'react';

// Memoized fibonacci function using dynamic programming
const fibonacci = (() => {
  const memo = new Map([[0, 1], [1, 1]]); // Base cases
  
  return (n) => {
    if (memo.has(n)) return memo.get(n);
    
    const result = fibonacci(n - 1) + fibonacci(n - 2);
    memo.set(n, result);
    return result;
  };
})();

function App() {
  const [fibIndex, setFibIndex] = useState('');
  const [isValid, setIsValid] = useState(true);

  // Validate input and handle changes
  const handleChange = useCallback((e) => {
    const value = e.target.value;
    if (value === '' || (/^\d+$/.test(value) && parseInt(value) >= 0)) {
      setFibIndex(value);
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, []);

  // Calculate fibonacci number
  const fibResult = useMemo(() => {
    if (fibIndex === '' || !isValid) return null;
    const n = parseInt(fibIndex);
    return n <= 1000 ? fibonacci(n) : 'Too large (max 1000)';
  }, [fibIndex, isValid]);

  // Memoized logging function
  const handleLog = useCallback(() => {
    console.log(`Current Fibonacci index: ${fibIndex}`);
  }, [fibIndex]);

  return (
    <div className="container">
      <h1>Fibonacci Calculator</h1>
      <div className="input-group">
        <input
          type="text"
          value={fibIndex}
          onChange={handleChange}
          placeholder="Enter a non-negative integer"
          className={!isValid ? 'invalid' : ''}
        />
        {!isValid && <div className="error">Please enter a valid non-negative integer</div>}
      </div>
      {fibResult !== null && isValid && (
        <h2>Fibonacci of {fibIndex} is: {fibResult}</h2>
      )}
      <button onClick={handleLog} disabled={!isValid}>
        Log Current Value
      </button>
    </div>
  );
}

export default App;