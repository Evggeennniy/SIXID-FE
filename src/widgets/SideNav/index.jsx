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
import ProfileButton from "@shared/ProfileButton/ProfileButton";

export const SideNav = () => {
  return (
    <NavSection>
      <div className="flex items-center gap-[10px] mb-[15px]">
        <div className="flex items-center gap-[10px]">
          <Logotype className="h-[35px] w-[35px]" />
          <h4 className="uppercase tracking-[1px] block sm:hidden xl:block">
            sixid
          </h4>
        </div>
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
        </SideNavList>
      </div>
      <div className="relative">
        <SideNavTitle label="в разработке" />
        <SideNavList className="opacity-50">
          <SideNavItem
            Icon={NoteIcon}
            label="заметки"
            to="/notes"
            className="pointer-events-none"
          />
          <SideNavItem
            Icon={LightningIcon}
            label="продуктивность"
            to="/productivity"
            className="pointer-events-none"
          />
          <SideNavItem
            Icon={BudgetIcon}
            label="бюджет"
            to="/budget"
            className="pointer-events-none"
          />
          <SideNavItem
            Icon={PuzzleIcon}
            label="стратегии"
            to="/strategies"
            className="pointer-events-none"
          />
          <SideNavItem
            Icon={BooksIcon}
            label="библиотека"
            to="/library"
            className="pointer-events-none"
          />
          <SideNavItem
            Icon={GraphIcon}
            label="тестирование"
            to="/tests"
            className="pointer-events-none"
          />
        </SideNavList>
      </div>
      <hr className="line border-gray-300 mb-[15px]" />
      <div>
        <SideNavList className="opacity-50">
          <SideNavItem
            Icon={DialogueIcon}
            label="обсуждения"
            to="/threads"
            className="pointer-events-none"
          />
        </SideNavList>
      </div>
    </NavSection>
  );
};
