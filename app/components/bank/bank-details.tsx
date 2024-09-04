export default function BankDetails({
  title,
  value,
  className,
}: {
  title: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={`w-full ${className}`}>
      <span className="text-xs">{title}:</span>
      <p className="text-sm font-medium">{value}</p>
    </div>
  );
}
