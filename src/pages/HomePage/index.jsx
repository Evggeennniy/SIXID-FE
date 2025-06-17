import { MainSection } from "@shared/MainSection";
import { OptionsSection } from "@shared/OptionsSection";

export const HomePage = () => {
  return (
    <>
      <MainSection>
        <h1 className="!text-center">Кто прочитал тот лох!</h1>
      </MainSection>
      <OptionsSection>Опции</OptionsSection>
    </>
  );
};
