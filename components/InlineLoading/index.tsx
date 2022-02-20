import { FC } from "react";
import { VscLoading } from "react-icons/vsc";

const InlineLoading: FC<{ isLoading: boolean; label: string }> = ({
  isLoading,
  label,
}) =>
  isLoading ? <VscLoading className="animate-spin mx-auto" /> : <>{label}</>;

export default InlineLoading;
