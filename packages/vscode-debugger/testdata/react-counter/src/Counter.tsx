import React, { useState } from "react";
import "./Counter.css";

export default function Counter() {
  const [value, setter] = useState(0);
  return (
    <button
      className="counter"
      onClick={() => {
        debugger;
        setter(value + 1);
      }}
    >
      {value}
    </button>
  );
}
