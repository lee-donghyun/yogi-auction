import { FC } from "react";

type Props = {
  mode?: "outline" | "fill";
  theme?: string;
};

const Button: FC<Props> = ({ mode = "outline", theme, children }) => {
  return (
    <button
      type="button"
      className={`
        rounded w-full p-4
        ${mode === "outline" && "border border-current"} 
        ${mode === "fill" && "bg-black border border-black text-white"}
      `}
      style={{ backgroundColor: theme, borderColor: theme }}
    >
      {children}
    </button>
  );
};

export default Button;
