import React, { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      const fetchedCount = 5;
      setCount(fetchedCount);
    }, 1000); 
  }, []);

  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);
  const double = () => setCount(prev => prev * 2);
  const reset = () => setCount(0);

  return (
    <div style={{textAlign: 'center', marginTop: '50px'}}>
      <h1>Counter: {count}</h1>
      <button onClick={increment}>Increment +1</button>
      <button onClick={decrement} style={{marginLeft: '10px'}}>Decrement -1</button>
      <button onClick={double} style={{marginLeft: '10px'}}>Double</button>
      <button onClick={reset} style={{marginLeft: '10px'}}>Reset</button>
    </div>
  );
}

export default Counter;
