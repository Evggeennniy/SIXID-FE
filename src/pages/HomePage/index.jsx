import { MainSection } from "@shared/MainSection";
import { OptionsSection } from "@shared/OptionsSection";
import { Search } from "@widgets/Search";

export const HomePage = () => {
  return (
    <>
      <MainSection>
        <Search />
        Главная
      </MainSection>
      <OptionsSection>Опции</OptionsSection>
    </>
  );
};
