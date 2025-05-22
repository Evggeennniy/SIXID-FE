import { MainSection } from "@shared/MainSection";
import { TodosApp } from "@widgets/TodosApp";
import { OptionsSection } from "@shared/OptionsSection";
import TodosOptions from "../../widgets/TodosApp/ui/TodosOptions";

export const ToDosPage = () => {
  return (
    <>
      <TodosApp />
      <TodosOptions />
    </>
  );
};
