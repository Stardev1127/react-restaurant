import clsx from "clsx";

type ButtonProps = {
  className?: string;
  children: React.ReactNode;
  type: "button" | "submit";
  variant: "primary" | "secondary";
  onClick?: () => void;
};

const variantMap = {
  primary: "bg-blue-500 text-white",
  secondary: "bg-gray-500 text-white",
};

export default function Button({
  children,
  type,
  variant,
  className,
  onClick,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(
        variantMap[variant],
        className,
        "hover:bg-blue-700 font-bold py-2 px-4 rounded"
      )}
    >
      {children}
    </button>
  );
}
