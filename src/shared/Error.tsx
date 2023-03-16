type ErrorProps = {
  error: string;
};

export default function Error({ error }: ErrorProps) {
  return (
    <p role="alert" className="text-red-600 font-bold">
      {error}
    </p>
  );
}
