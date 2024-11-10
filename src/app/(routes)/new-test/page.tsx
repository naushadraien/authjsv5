"use client";
import React, { useRef } from "react";
import Counter, { CounterRef } from "./components/Counter";
import Input, { InputValResetRef } from "./components/Input";

const NewTestPage = () => {
  const counterRef = useRef<CounterRef>(null);
  const inputResetRef = useRef<InputValResetRef>(null);
  return (
    <main>
      <Counter ref={counterRef} />
      <button onClick={() => counterRef.current?.reset()}>Reset Count</button>
      <Input ref={inputResetRef} />
      <button onClick={() => inputResetRef.current?.reset()}>
        Reset Input Value
      </button>
    </main>
  );
};

export default NewTestPage;
