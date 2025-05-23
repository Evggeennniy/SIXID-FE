import { MainSection } from "@shared/MainSection";
import { TodosApp } from "@widgets/TodosApp";
import { OptionsSection } from "@shared/OptionsSection";

export const ToDosPage = () => {
  return (
    <>
      <MainSection>
        <TodosApp />
      </MainSection>
      <OptionsSection>Опции</OptionsSection>
    </>
  );
};
