import cn from "classnames";
import { Anton as AntonFont } from "next/font/google";
import { PropsWithChildren } from "react";

const anton = AntonFont({ weight: "400", subsets: ["latin"] });

type Props = PropsWithChildren & {
  as: "h1" | "h2" | "h3";
  className?: string;
};

export const DisplayHeading = ({ as = "h1", className, children }: Props) => {
  const As = as;

  return (
    <As
      className={cn(
        "decoration-teal-600", // for use with underline in className prop
        anton.className,
        className,
      )}
    >
      {children}
    </As>
  );
};
