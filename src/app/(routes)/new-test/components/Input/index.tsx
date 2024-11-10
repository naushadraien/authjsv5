import React, {
  forwardRef,
  Ref,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";

export type InputValResetRef = {
  reset: () => void;
};

const Input = (props, ref: Ref<InputValResetRef>) => {
  const localRef = useRef<HTMLInputElement>(null);
  useImperativeHandle(ref, () => ({
    reset: () => {
      if (!localRef.current) return;

      localRef.current.value = "";
      localRef.current.focus();
    },
  }));
  return <input type="text" ref={localRef} className="border border-black" />;
};

export default forwardRef(Input);
