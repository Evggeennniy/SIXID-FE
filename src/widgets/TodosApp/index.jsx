import { useState } from "react";

import { TodosInput } from "./ui/TodosInput";
import { TodosList } from "./ui/TodosList";
import { TodosItem } from "./ui/TodosItem";
import Dropdown from "../../shared/dropdown/Dropdown";
import { MainSection } from "../../shared/MainSection";
import { useUIStore } from "../../shared/store/ui-store";
export const todos = [
  {
    title: "Протестировать работу списка заданий на SIXID",
    deadline: "2025-05-25T17:00:00Z",
    statusOfImportant: "срочно", // urgently
    status: "active",
    subtasks: [
      {
        id: 1,
        title: "Открыть страницу списка заданий",
        is_done: false,
      },
      {
        id: 2,
        title: "Проверить отображение активных задач",
        is_done: false,
      },
      {
        id: 3,
        title: "Проверить фильтрацию по статусу",
        is_done: true,
      },
    ],
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
  const toggleOptions = useUIStore((state) => state.toggleOptions);
  const onActive = (title) => {
    if (activeTitle === title) {
      setActiveTitle(null);
      toggleOptions(false);
      return;
    }
    setActiveTitle(title);
    toggleOptions(true);
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
