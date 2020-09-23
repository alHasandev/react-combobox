import React, { useState } from "react";
import ComboBox from "./ComboBox";

// Import static assets for app
import "./ComboBox/index.css";
import "@fortawesome/fontawesome-free/css/all.css";

const examples = [
  {
    value: 1,
    label: "Example 1",
    className: "px-4 py-2 border hover:bg-blue-200",
  },
  {
    value: 2,
    label: "Example 2",
    className: "px-4 py-2 border hover:bg-blue-200",
  },
  {
    value: 3,
    label: "Example 3",
    className: "px-4 py-2 border hover:bg-blue-200",
  },
  {
    value: 4,
    label: "Example 4",
    className: "px-4 py-2 border hover:bg-blue-200",
  },
  {
    value: 5,
    label: "Example 5",
    className: "px-4 py-2 border hover:bg-blue-200",
  },
];

function App() {
  const [value, setValue] = useState("");
  return (
    <section className="max-w-screen-xl px-4 md:px-8 mx-auto border flex flex-col justify-center items-stretch h-screen">
      <ComboBox
        name="example"
        value={value}
        onChange={(ev) => setValue(ev.target.value)}
        className="px-4 py-2 w-full border border-black rounded"
        placeholder="ComboBox Example"
        items={examples}
        mutateItem={(item) =>
          String(item.value) === String(value)
            ? { ...item, className: `${item.className} bg-blue-200` }
            : item
        }
        navs={{
          reset: <i className="fas fa-times inline-block mr-4 mt-3"></i>,
          open: <i className="fas fa-chevron-up inline-block mr-4 mt-3"></i>,
          close: <i className="fas fa-chevron-down inline-block mr-4 mt-3"></i>,
        }}
      />
    </section>
  );
}

export default App;
