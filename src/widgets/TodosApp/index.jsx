import { useState } from "react";

import { TodosInput } from "./ui/TodosInput";
import { TodosList } from "./ui/TodosList";
import { TodosItem } from "./ui/TodosItem";
import Dropdown from "../../shared/dropdown/Dropdown";
import { MainSection } from "../../shared/MainSection";
import { useSelector } from "react-redux";
import {
  selectTodosActiveItems,
  selectTodosCompletedItems,
} from "../../redux/slice/todos/todosSlice";

export const TodosApp = () => {
  const [input, setInput] = useState("");

  const activeTodos = useSelector(selectTodosActiveItems);
  const completedTodos = useSelector(selectTodosCompletedItems);

  return (
    <MainSection>
      <h2 className='capitalize mb-[30px]'>список задач</h2>
      <TodosInput
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
      <TodosList>
        <div className='flex flex-col gap-8'>
          <div className='cursor-pointer transition-colors '>
            {activeTodos.map((todo) => (
              <TodosItem
                key={todo.title}
                title={todo.title}
                statusOfImportant={todo.statusOfImportant}
                deadline={todo.deadline}
                isComplete={false}
              />
            ))}
          </div>
          <Dropdown btnText={"Выполненые"}>
            <div className='text-[#5E5E5E] cursor-pointer transition-colors w-full '>
              {completedTodos.map((todo) => (
                <TodosItem
                  key={todo.title}
                  title={todo.title}
                  statusOfImportant={todo.statusOfImportant}
                  deadline={todo.deadline}
                  isComplete={true}
                />
              ))}
            </div>
          </Dropdown>
        </div>
      </TodosList>
    </MainSection>
  );
};
