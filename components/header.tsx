import Link from "next/link";

import { DisplayHeading } from "./display-heading";
import { Dot } from "./dot";

export const Header = () => {
  return (
    <DisplayHeading
      as="h2"
      className="text-2xl md:text-4xl mb-20 mt-8 underline"
    >
      <Link href="/" className="opacity-20 hover:opacity-100">
        alexprice
        <Dot />
        dev
      </Link>
    </DisplayHeading>
  );
};
