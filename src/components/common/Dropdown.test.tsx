import { render, screen, fireEvent } from "@testing-library/react";
import { Dropdown, Props } from "./Dropdown";
import userEvent from "@testing-library/user-event";

describe("<Dropdown>", () => {
  it("should render the value", () => {
    setupComponent({
      value: "test",
      options: [
        { key: "test", value: "test" },
        { key: "notest", value: "notest" },
      ],
    });
    expect(screen.getByRole("combobox")).toHaveValue("test");
  });

  it("should render the options", () => {
    setupComponent({
      options: [
        { key: "1", value: "One" },
        { key: "2", value: "Two" },
      ],
    });
    expect(screen.getByTestId("select-option-1")).toBeInTheDocument();
    expect(screen.getByTestId("select-option-2")).toBeInTheDocument();
  });

  it("should change the selected value", async () => {
    let selected: string = "test";
    const options = [
      { key: "test", value: "test" },
      { key: "notest", value: "notest" },
    ];
    const handleChange = (e: any) => {
      console.log(e.target.value);
      selected = e.target.value;
    };
    const { rerender } = render(
      <Dropdown value={selected} options={options} onChange={handleChange} />
    );

    expect(screen.getByRole("combobox")).toHaveValue("test");

    fireEvent.change(screen.getByTestId("select"), {
      target: { value: "notest" },
    });

    rerender(
      <Dropdown value={selected} options={options} onChange={handleChange} />
    );

    expect(screen.getByRole("combobox")).toHaveValue("notest");
  });
});

const setupComponent = (props: Partial<Props> = {}) => {
  const componentProps: Props = {
    value: "One",
    options: [
      { key: "1", value: "One" },
      { key: "2", value: "Two" },
    ],
    onChange: jest.fn(),
    ...props,
  };
  return render(<Dropdown {...componentProps} />);
};
