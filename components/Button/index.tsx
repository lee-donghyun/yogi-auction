import Link from "next/link";
import { FC } from "react";
import { UrlObject } from "url";

type Props = {
  mode?: "outline" | "fill";
  theme?: string;
  href?: UrlObject | string;
  replace?: boolean;
  submit?: boolean;
  onClick?: () => any;
};

const Button: FC<Props> = ({
  mode = "outline",
  theme,
  href,
  children,
  replace,
  submit,
  onClick,
}) => {
  const style = `
        rounded w-full flex items-center justify-center h-14
        ${mode === "outline" && "border border-current"} 
        ${mode === "fill" && "bg-black border border-black text-white"}
      `;

  if (href) {
    return (
      <Link href={href} replace={replace}>
        <a
          className={style}
          style={{ backgroundColor: theme, borderColor: theme }}
        >
          {children}
        </a>
      </Link>
    );
  }
  return (
    <button
      type={submit ? "submit" : "button"}
      className={style}
      style={{ backgroundColor: theme, borderColor: theme }}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
