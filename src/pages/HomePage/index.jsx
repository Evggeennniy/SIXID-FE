import { MainSection } from "@shared/MainSection";
import { OptionsSection } from "@shared/OptionsSection";
import { Search } from "@widgets/Search";

import Logotype from "@assets/svg/logotype.svg?react";
import MenuIcon from "@assets/svg/menu-icon.svg?react";

export const HomePage = () => {
  return (
    <>
      <MainSection>
        <div className="flex content-between items-center gap-[20px]">
          <Logotype className="w-[30px] h-[30px] block sm:hidden " />
          <Search />
          <MenuIcon className="w-[30px] h-[30px] cursor-pointer block sm:hidden" />
        </div>
        Главная
      </MainSection>
      <OptionsSection>Опции</OptionsSection>
    </>
  );
};
