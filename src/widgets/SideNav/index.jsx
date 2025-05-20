import { useUIStore } from "@shared/store/ui-store";

import { NavSection } from "@shared/NavSection";
import { SideNavList } from "./ui/SideNavList";
import { SideNavItem } from "./ui/SideNavItem";
import { SideNavTitle } from "./ui/SideNavTitle";

import Logotype from "@assets/svg/logotype.svg?react";
import HomeIcon from "@assets/svg/home-icon.svg?react";
import ToDoIcon from "@assets/svg/todo-icon.svg?react";
import NoteIcon from "@assets/svg/note-icon.svg?react";
import LightningIcon from "@assets/svg/lightning-icon.svg?react";
import PuzzleIcon from "@assets/svg/puzzle-icon.svg?react";
import BooksIcon from "@assets/svg/books-icon.svg?react";
import GraphIcon from "@assets/svg/graph-icon.svg?react";
import DialogueIcon from "@assets/svg/dialogue-icon.svg?react";
import BudgetIcon from "@assets/svg/money-icon.svg?react";
import CalendarIcon from "@assets/svg/calendar-icon.svg?react";

export const SideNav = () => {
  const isNavOpen = useUIStore((state) => state.isNavOpen);

  return (
    <NavSection className={isNavOpen ? "left-0" : "left-[-100vw]"}>
      <div className="flex items-center gap-[10px] mb-[15px]">
        <Logotype className="h-[35px] w-[35px]" />
        <h4 className="uppercase tracking-[1px] sm:hidden lg:block">sixid</h4>
      </div>
      <hr className="line border-gray-300 mb-[15px]" />
      <div>
        <SideNavList>
          <SideNavItem Icon={HomeIcon} label="главная" to="/" />
        </SideNavList>
      </div>
      <div>
        <SideNavTitle label="инструменты" />
        <SideNavList>
          <SideNavItem Icon={ToDoIcon} label="задачи" to="/todos" />
          <SideNavItem Icon={CalendarIcon} label="календарь" to="/calendar" />
          <SideNavItem Icon={NoteIcon} label="заметки" to="/notes" />
          <SideNavItem
            Icon={LightningIcon}
            label="продуктивность"
            to="/productivity"
          />
        </SideNavList>
      </div>
      <div>
        <SideNavTitle label="в разработке" />
        <SideNavList className="opacity-50">
          <SideNavItem Icon={BudgetIcon} label="бюджет" to="/budget" />
          <SideNavItem Icon={PuzzleIcon} label="стратегии" to="/strategies" />
          <SideNavItem Icon={BooksIcon} label="библиотека" to="/library" />
          <SideNavItem Icon={GraphIcon} label="тестирование" to="/tests" />
        </SideNavList>
      </div>
      <hr className="line border-gray-300 mb-[15px]" />
      <div>
        <SideNavList className="opacity-50">
          <SideNavItem Icon={DialogueIcon} label="обсуждения" to="/threads" />
        </SideNavList>
      </div>
    </NavSection>
  );
};
