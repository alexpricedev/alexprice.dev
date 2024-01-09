import { PropsWithChildren } from "react";

import { Footer } from "./footer";
import { Meta } from "./meta";

type Props = PropsWithChildren;

export const Layout = ({ children }: Props) => (
  <>
    <Meta />
    <div className="min-h-screen min-w-[300px]">
      <main>{children}</main>
    </div>
    <Footer />
  </>
);
