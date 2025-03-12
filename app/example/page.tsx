"use client";
import { useState } from "react";

export default function Page() {
  return (
    <div>
      <Parent />
    </div>
  );
}

function Parent() {
  const [count, setCount] = useState(0);
  return (
    <div
      style={{
        placeSelf: "center",
        padding: "10rem",
      }}
    >
      <p>Parent</p>

      <button
        style={{
          padding: "1rem",
          margin: "1rem",
          border: "1px solid white",
        }}
        onClick={() => setCount(count + 1)}
      >
        Increment
      </button>

      <Child count={count} />
    </div>
  );
}

function Child({ count }: { count: number }) {
  const [countCopy, setcountCopy] = useState(count);

  console.log("Child render: ", {
    countFromParent: count,
    countCopy,
  });

  //   useEffect(() => {
  //     setcountCopy(count);
  //   }, [count]);

  return (
    <div>
      <p>Child: {count}</p>
      <button
        style={{
          padding: "1rem",
          margin: "1rem",
          border: "1px solid white",
        }}
        onClick={() => setcountCopy(countCopy + 1)}
      >
        Increment Copy
      </button>
    </div>
  );
}
