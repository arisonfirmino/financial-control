import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { formatValue } from "../helpers/formatValue";

export default function Balance({ total_value }: { total_value: number }) {
  const [hideValue, setHideValue] = useState(false);

  return (
    <div className="flex items-center justify-between rounded border border-solid border-stroke bg-background p-2.5">
      <div className="space-y-1">
        <p className="text-xs uppercase">Saldo total</p>
        <p className="text-2xl font-bold">
          {hideValue ? "******" : `${formatValue(total_value)}`}
        </p>
      </div>

      <button onClick={() => setHideValue(!hideValue)}>
        {hideValue ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
      </button>
    </div>
  );
}
