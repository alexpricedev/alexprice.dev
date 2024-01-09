import { PropsWithChildren } from "react";

type Props = PropsWithChildren;

export const Container = ({ children }: Props) => (
  <div className="container mx-auto px-5">{children}</div>
);
