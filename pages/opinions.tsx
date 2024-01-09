import Head from "next/head";

import { Container } from "../components/container";
import { Header } from "../components/header";
import { Layout } from "../components/layout";
import { Opinions } from "../components/opinions";
import { getAllPosts } from "../lib/api";

import type { PostType } from "../interfaces/post";

type Props = {
  posts: PostType[];
};

const OpinionsPage = ({ posts }: Props) => (
  <>
    <Layout>
      <Head>
        <title>Alex Price - CTO</title>
      </Head>
      <Container>
        <Header />
        <Opinions posts={posts} className="mb-32" />
      </Container>
    </Layout>
  </>
);

export default OpinionsPage;

export const getStaticProps = async () => {
  const posts = getAllPosts(["title", "slug", "coverImage", "excerpt"]);

  return {
    props: { posts },
  };
};
