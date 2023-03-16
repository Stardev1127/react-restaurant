type CheckboxProps = {
  className?: string;
  id: string;
  label: string;
  value?: string;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Checkbox({
  id,
  className,
  label,
  value,
  checked,
  onChange,
}: CheckboxProps) {
  return (
    <div className={className}>
      <input
        onChange={onChange}
        checked={checked}
        value={value}
        id={id}
        className="border border-gray-600 p-2"
        type="checkbox"
      />{" "}
      <label className="" htmlFor={id}>
        {label}
      </label>
    </div>
  );
}
