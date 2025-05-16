import { AppNavList } from "./ui/AppNavList";
import { AppNavItem } from "./ui/AppNavItem";
import { AppNavTitle } from "./ui/AppNavTitle";

import Logotype from "@assets/svg/logotype.svg?react";
import HomeIcon from "@assets/svg/home-icon.svg?react";
import ToDoIcon from "@assets/svg/todo-icon.svg?react";
import NoteIcon from "@assets/svg/note-icon.svg?react";
import LightningIcon from "@assets/svg/lightning-icon.svg?react";
import PuzzleIcon from "@assets/svg/puzzle-icon.svg?react";
import BooksIcon from "@assets/svg/books-icon.svg?react";
import GraphIcon from "@assets/svg/graph-icon.svg?react";
import DialogueIcon from "@assets/svg/dialogue-icon.svg?react";

export const AppNav = () => {
  return (
    <section className="shadow-block p-[20px] lg:flex-1/5 hidden sm:block">
      <div className="flex items-center gap-[10px] mb-[15px]">
        <Logotype className="h-[35px] w-[35px]" />
        <h4 className="uppercase tracking-[1px] hidden lg:block">sixid</h4>
      </div>
      <hr className="line border-gray-300 mb-[15px]" />
      <div>
        <AppNavList>
          <AppNavItem Icon={HomeIcon} label="главная" to="/" />
        </AppNavList>
      </div>
      <div>
        <AppNavTitle label="инструменты" />
        <AppNavList>
          <AppNavItem Icon={ToDoIcon} label="задачи" to="/todos" />
          <AppNavItem Icon={NoteIcon} label="заметки" to="/notes" />
          <AppNavItem
            Icon={LightningIcon}
            label="продуктивность"
            to="/productivity"
          />
        </AppNavList>
      </div>
      <div>
        <AppNavTitle label="в разработке" />
        <AppNavList className="opacity-50">
          <AppNavItem Icon={PuzzleIcon} label="стратегии" to="/strategies" />
          <AppNavItem Icon={BooksIcon} label="библиотека" to="/library" />
          <AppNavItem Icon={GraphIcon} label="тестирование" to="/tests" />
        </AppNavList>
      </div>
      <hr className="line border-gray-300 mb-[15px]" />
      <div>
        <AppNavList className="opacity-50">
          <AppNavItem Icon={DialogueIcon} label="обсуждения" to="/threads" />
        </AppNavList>
      </div>
    </section>
  );
};
