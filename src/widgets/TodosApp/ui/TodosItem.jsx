export const TodosItem = ({ title }) => {
  return (
    <li className="flex items-center gap-[15px] p-[13px]">
      <input type="checkbox" name="is_done" />
      <h5 className="leading-normal">{title}</h5>
    </li>
  );
};
