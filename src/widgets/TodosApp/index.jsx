import { useState } from "react";

import { TodosInput } from "./ui/TodosInput";
import { TodosList } from "./ui/TodosList";

export const TodosApp = () => {
  const [input, setInput] = useState("");

  return (
    <div>
      <h2 className='capitalize mb-[30px]'>список задач</h2>
      <TodosInput
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
      <TodosList />
    </div>
  );
};
