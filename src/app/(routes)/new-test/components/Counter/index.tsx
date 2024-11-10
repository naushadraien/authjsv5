import React, { forwardRef, Ref, useImperativeHandle, useState } from "react";

export type CounterRef = {
  reset: () => void;
};

const Counter = (props, ref: Ref<CounterRef>) => {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    if (count !== 0) {
      setCount(count - 1);
    }
  };

  const handleReset = () => {
    setCount(0);
  };

  //useImperativeHandle is used to expose the function to the parent component so that the parent component can call the function from the child component
  useImperativeHandle(ref, () => ({
    reset: handleReset,
  }));
  return (
    <div className="flex flex-col gap-4">
      <p>{count}</p>
      <div className="flex gap-4">
        <button onClick={handleIncrement}>Increment Count</button>
        <button onClick={handleDecrement}>Decrement Count</button>
      </div>
    </div>
  );
};

export default forwardRef(Counter); //forwardRef is used to pass ref to the child component from the parent component
