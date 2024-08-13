import { DisplayHeading } from "./display-heading";
import { Dot } from "./dot";

export const About = () => (
  <section className="mb-16">
    <DisplayHeading as="h2" className="mb-8 text-4xl md:text-6xl font-bold">
      About
      <Dot />
    </DisplayHeading>
    <div className="space-y-4 max-w-[600px] mb-8">
      <p>
        I've dedicated the last decade to solving complex customer problems with
        software and technology.
      </p>
      <p>
        My leadership style is built on setting strong processes, charting a
        clear path to success, empowering my team and stoking a shared delight
        in delivering value.
      </p>
      <p>
        I am recognised for my lens of entrepreneurial foundership, my
        relentless return to first-principles thinking and my commitment to
        personal integrity.
      </p>
    </div>
  </section>
);
