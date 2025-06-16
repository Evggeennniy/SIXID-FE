import OptionsWrapDropdown from "../../../TodosApp/ui/options/OptionsWrapDropdown";
import EditIcon from "@assets/svg/edit-icon.svg?react";
export default function EditTaskTitleForm({
  value,
  onChange,
  onBlur,
  onSubmit,
}) {
  return (
    <OptionsWrapDropdown icon={<EditIcon />} text='Изменить' haveDorder={true}>
      <form onSubmit={onSubmit} className='flex items-center w-full'>
        <input
          type='text'
          name='input_title'
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className='w-full py-2 px-3 rounded bg-[#ECF7FF] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A8A5FF]'
          placeholder='Название задачи'
        />
        <button className='w-0 h-0 opacity-0' />
      </form>
    </OptionsWrapDropdown>
  );
}
