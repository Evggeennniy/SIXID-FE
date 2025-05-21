import { useState } from "react";
import { TodosItem } from "./TodosItem";
const todos = [
  {
    title: "Протестировать работу списка заданий на SIXID",
    deadline: "2025-05-25T17:00:00Z",
    statusOfImportant: "срочно", // urgently
  },
  {
    title: "Написать юнит-тесты для новых компонентов",
    deadline: "2025-06-01",
    statusOfImportant: "важно", // importent
  },
  {
    title: "Проверить дизайн-макеты",
    deadline: "2025-06-10",
    statusOfImportant: "обычно", // simple
  },
  {
    title: "Подготовить слайды презентации",
    deadline: "2025-05-30T12:00:00Z",
    statusOfImportant: "срочно", // urgently
  },
  {
    title: "Рефакторинг старого кода",
    deadline: "2025-06-15",
    statusOfImportant: "важно", // importent
  },
];
export const TodosList = () => {
  const [activeIndex, setActiveIndex] = useState();

  function onActive(index) {
    setActiveIndex(index);
  }
  return (
    <>
      <div className='max-w-4xl mx-auto p-4'>
        {/* Заголовоки таблицы */}
        <div className='grid grid-cols-6 gap-4 capitalize  text-[#A4A4A4] pb-2 mb-2'>
          <h5 className={"col-span-4"}>Назва</h5>
          <h5>Важливість</h5>
          <h5>Дата</h5>
        </div>

        <div className='text-[#5E5E5E] cursor-pointer transition-colors rounded-lg'>
          {todos.map((todo, index) => (
            <TodosItem
              key={index}
              title={todo.title}
              statusOfImportant={todo.statusOfImportant}
              deadline={todo.deadline}
              isActive={activeIndex === index}
              onClick={() => onActive(index)}
            />
          ))}
        </div>
      </div>
    </>
  );
};
