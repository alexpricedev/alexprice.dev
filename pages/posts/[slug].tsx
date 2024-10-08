import { useRouter } from "next/router";
import Head from "next/head";
import ErrorPage from "next/error";

import { Container } from "../../components/container";
import { Header } from "../../components/header";
import { Layout } from "../../components/layout";
import { PostBody } from "../../components/post-body";
import { PostHeader } from "../../components/post-header";
import { PostTitle } from "../../components/post-title";
import { getPostBySlug, getAllPosts } from "../../lib/api";
import { markdownToHtml } from "../../lib/markdownToHtml";

import type { PostType } from "../../interfaces/post";

type Props = {
  post: PostType;
  morePosts: PostType[];
};

const PostPage = ({ post }: Props) => {
  const router = useRouter();
  const title = `${post.title} | Alex Price - CTO`;

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Layout>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article className="mb-32">
              <Head>
                <title>{title}</title>
                <meta property="og:image" content={post.ogImage.url} />
              </Head>
              <PostHeader title={post.title} coverImage={post.coverImage} />
              <PostBody content={post.content} />
            </article>
          </>
        )}
      </Container>
    </Layout>
  );
};

export default PostPage;

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(params.slug, [
    "title",
    "slug",
    "content",
    "ogImage",
    "coverImage",
  ]);

  const content = await markdownToHtml(post.content || "");

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"]);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
