import Head from "next/head";
// import Link from "next/link";

import { About } from "../components/about";
import { Container } from "../components/container";
import { Intro } from "../components/intro";
import { Layout } from "../components/layout";
// import { Opinions } from "../components/opinions";
import { getAllPosts } from "../lib/api";

// import buttonStyles from "../styles/button.module.css";

// import type { PostType } from "../interfaces/post";

// type Props = {
// posts: PostType[];
// };

// const HomePage = ({ posts }: Props) => (
const HomePage = () => (
  <>
    <Layout>
      <Head>
        <title>Alex Price - CTO</title>
        <meta
          name="description"
          content="The website of Alex Price, a digital product technologist, leader and strategist."
        />
      </Head>
      <Container>
        <Intro />
        <About />
        {/* <Opinions posts={posts} /> */}
        {/*
          <div className="text-center sm:text-left mt-4 mb-32">
            <Link className={buttonStyles.button} href="/opinions">
              View all opinions
            </Link>
          </div>
        */}
      </Container>
    </Layout>
  </>
);

export default HomePage;

export const getStaticProps = async () => {
  const posts = getAllPosts(["title", "slug", "coverImage", "excerpt"]);

  return {
    props: { posts },
  };
};
