import { MainSection } from "@shared/MainSection";
import { TodosApp } from "@widgets/TodosApp";
import { OptionsSection } from "@shared/OptionsSection";

export const ToDosPage = () => {
  return (
    <>
      <TodosApp />
      <OptionsSection>Опции</OptionsSection>
    </>
  );
};
