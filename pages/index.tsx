import Head from "next/head";

import { About } from "../components/about";
import { Container } from "../components/container";
import { Intro } from "../components/intro";
import { Layout } from "../components/layout";
import { Opinions } from "../components/opinions";
import { getAllPosts } from "../lib/api";

import type { PostType } from "../interfaces/post";

type Props = {
  posts: PostType[];
};

export default function Index({ posts }: Props) {
  return (
    <>
      <Layout>
        <Head>
          <title>Alex Price - CTO</title>
        </Head>
        <Container>
          <Intro />
          <About />
          <Opinions posts={posts} />
        </Container>
      </Layout>
    </>
  );
}

export const getStaticProps = async () => {
  const posts = getAllPosts(["title", "slug", "coverImage", "excerpt"]);

  return {
    props: { posts },
  };
};
