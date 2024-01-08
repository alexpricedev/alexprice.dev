import { DisplayHeading } from "./display-heading";
import { Dot } from "./dot";

export const Intro = () => {
  return (
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
        Customer-obsessed technologist, leader and entrepreneur.
      </h4>
    </section>
  );
};
