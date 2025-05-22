import { useState } from "react";

import { TodosInput } from "./ui/TodosInput";
import { TodosList } from "./ui/TodosList";
import { TodosItem } from "./ui/TodosItem";
import Dropdown from "../../shared/dropdown/Dropdown";
import { MainSection } from "../../shared/MainSection";
export const todos = [
  {
    title: "Протестировать работу списка заданий на SIXID",
    deadline: "2025-05-25T17:00:00Z",
    statusOfImportant: "срочно", // urgently
    status: "active",
  },
  {
    title: "Написать юнит-тесты для новых компонентов",
    deadline: "2025-06-01",
    statusOfImportant: "важно", // importent
    status: "complete",
  },
  {
    title: "Проверить дизайн-макеты",
    deadline: "2025-06-10",
    statusOfImportant: "обычно", // simple
    status: "active",
  },
  {
    title: "Подготовить слайды презентации",
    deadline: "2025-05-30T12:00:00Z",
    statusOfImportant: "срочно", // urgently
    status: "complete",
  },
  {
    title: "Рефакторинг старого кода",
    deadline: "2025-06-15",
    statusOfImportant: "важно", // importent
    status: "active",
  },
];
export const TodosApp = () => {
  const [input, setInput] = useState("");
  const [activeTitle, setActiveTitle] = useState(null);

  const onActive = (title) => {
    setActiveTitle(title);
  };

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
            {todos
              .filter((item) => item.status === "active")
              .map((todo) => (
                <TodosItem
                  key={todo.title}
                  title={todo.title}
                  statusOfImportant={todo.statusOfImportant}
                  deadline={todo.deadline}
                  isActive={activeTitle === todo.title}
                  onClick={() => onActive(todo.title)}
                  isComplete={false}
                />
              ))}
          </div>
          <Dropdown btnText={"Выполненые"}>
            <div className='text-[#5E5E5E] cursor-pointer transition-colors w-full '>
              {todos
                .filter((item) => item.status !== "active")
                .map((todo) => (
                  <TodosItem
                    key={todo.title}
                    title={todo.title}
                    statusOfImportant={todo.statusOfImportant}
                    deadline={todo.deadline}
                    isActive={activeTitle === todo.title}
                    onClick={() => onActive(todo.title)}
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
