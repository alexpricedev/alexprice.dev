import { Container } from "./container";
import { Dot } from "./dot";
import { DisplayHeading } from "./display-heading";

import styles from "../styles/button.module.css";

export const Footer = () => (
  <footer className="bg-neutral-50 border-t border-neutral-200">
    <Container>
      <div className="py-28 flex flex-col lg:flex-row items-center">
        <div className="p-6 text-center lg:text-left mb-10 lg:mb-0 lg:pr-4 lg:w-1/2">
          <DisplayHeading as="h3" className="text-4xl lg:text-6xl">
            Follow me on Xwitterz
            <Dot />
          </DisplayHeading>
        </div>
        <div className="w-full flex flex-col sm:flex-row justify-center lg:justify-end items-center lg:pl-4 lg:w-1/2 sm:space-x-3 space-y-3 sm:space-y-0">
          <a className={styles.button} href="mailto:contact@alexprice.dev">
            Email me
          </a>
          <a
            className={styles.button}
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
