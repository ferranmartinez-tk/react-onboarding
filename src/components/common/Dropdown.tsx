export type DropdownOption = {
  key: string;
  value: string;
};

export type Props = {
  value: string;
  options: DropdownOption[];
  onChange: (e: any) => void;
};

export const Dropdown = (props: Props) => {
  return (
    <>
      <select
        data-testid="select"
        value={props.value}
        onChange={props.onChange}
      >
        {props.options.map((option: DropdownOption) => {
          return (
            <option
              data-testid={`select-option-${option.key}`}
              key={option.key}
              value={option.key}
            >
              {option.value}
            </option>
          );
        })}
      </select>
    </>
  );
};
