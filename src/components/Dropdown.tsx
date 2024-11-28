
export type DropdownOption = {
    key: string;
    value: string;
};

type DropdownProps = {
    value: string;
    options: DropdownOption[];
    onChange: (e: any) => void;
};

export const Dropdown = (props: DropdownProps) => {
    return (
        <>
            <select value={props.value} onChange={props.onChange}>
                {
                    props.options.map((option: DropdownOption) => {
                        return (
                            <option key={option.key} value={option.key}>{option.value}</option>
                        );
                    })
                }
            </select>
        </>
    );
};