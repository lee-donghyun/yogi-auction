import Link from "next/link";
import { FC } from "react";
import { Url, UrlObject } from "url";

type Props = {
  mode?: "outline" | "fill";
  theme?: string;
  href?: UrlObject | string;
  replace?: boolean;
};

const Button: FC<Props> = ({
  mode = "outline",
  theme,
  href,
  children,
  replace,
}) => {
  const style = `
        rounded w-full p-4 block text-center
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
      type="button"
      className={style}
      style={{ backgroundColor: theme, borderColor: theme }}
    >
      {children}
    </button>
  );
};

export default Button;
