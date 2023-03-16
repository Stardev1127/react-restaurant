import Error from "./Error";

type CheckboxListProps = {
  label: string;
  className?: string;
  children: React.ReactNode;
  error?: string;
};

export default function CheckboxList({
  children,
  className = "",
  label,
  error,
}: CheckboxListProps) {
  return (
    <fieldset className={className}>
      <legend>{label}</legend>
      {error && <Error error={error} />}
      {children}
    </fieldset>
  );
}
