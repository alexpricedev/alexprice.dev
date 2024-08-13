import { DisplayHeading } from "./display-heading";
import { Dot } from "./dot";

export const Intro = () => (
  <section className="my-16">
    <DisplayHeading
      as="h1"
      className="text-5xl md:text-8xl font-bold underline mb-3"
    >
      alexprice
      <Dot />
      dev
    </DisplayHeading>
    <h4 className="text-md md:text-lg">
      Product technologist, leader and strategist.
    </h4>
  </section>
);
