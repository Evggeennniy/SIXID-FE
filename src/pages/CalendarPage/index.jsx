import { MainSection } from "@shared/MainSection";
import { OptionsSection } from "@shared/OptionsSection";
import CalendarApp from "../../widgets/CalendarApp";

export const CalendarPage = () => {
  return (
    <>
      <MainSection>
        <CalendarApp />
      </MainSection>
      <OptionsSection>Опции</OptionsSection>
    </>
  );
};
