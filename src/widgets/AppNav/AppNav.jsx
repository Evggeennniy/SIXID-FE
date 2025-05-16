import { AppNavList } from "./ui/AppNavList";
import { AppNavItem } from "./ui/AppNavItem";

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
    <section className="shadow-block flex-1/5 p-[20px]">
      <div className="flex items-center gap-[10px] mb-[15px]">
        <Logotype className="h-[35px] w-[35px]" />
        <h4 className="uppercase tracking-[1px]">sixid</h4>
      </div>
      <hr className="line border-gray-300 mb-[15px]" />
      <div>
        <AppNavList>
          <AppNavItem Icon={HomeIcon} label="главная" to="/" />
        </AppNavList>
      </div>
      <div>
        <p className="text-gray-400 capitalize mb-[10px]">категории</p>
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
        <p className="text-gray-400 capitalize mb-[10px]">в разработке</p>
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
