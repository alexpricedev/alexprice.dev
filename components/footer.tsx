import { Container } from "./container";
import { Dot } from "./dot";
import { DisplayHeading } from "./display-heading";

export const Footer = () => (
  <footer className="bg-neutral-50 border-t border-neutral-200">
    <Container>
      <div className="py-28 flex flex-col lg:flex-row items-center">
        <DisplayHeading
          as="h3"
          className="text-4xl lg:text-6xl text-center lg:text-left mb-10 lg:mb-0 lg:pr-4 lg:w-1/2"
        >
          Some snappy sign-off
          <Dot />
        </DisplayHeading>
        <div className="w-full flex flex-col sm:flex-row justify-center lg:justify-end items-center lg:pl-4 lg:w-1/2 sm:space-x-3 space-y-3 sm:space-y-0">
          <a
            href="mailto:contact@alexprice.dev"
            className="font-bold hover:underline border-black border-2 px-5 py-3"
          >
            Email me
          </a>
          <a
            className="font-bold hover:underline border-black border-2 px-5 py-3"
            href="https://github.com/remotealex"
            rel="noopener noreferrer"
            target="_blank"
          >
            View my GitHub
          </a>
        </div>
      </div>
    </Container>
  </footer>
);
