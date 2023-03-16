import Error from "./Error";

type InputProps = {
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  id: string;
  label: string;
  type?: "text" | "number" | "email" | "password" | "tel";
  value?: string;
  error?: string;
};

export default function Input({
  id,
  className,
  label,
  type = "text",
  value,
  onChange,
  onBlur,
  error,
}: InputProps) {
  return (
    <div className={className}>
      <label className="block" htmlFor={id}>
        {label}
      </label>
      <input
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        id={id}
        className="border border-gray-600 p-2"
        type={type}
      />
      {error && <Error error={error} />}
    </div>
  );
}
