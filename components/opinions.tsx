import { PostPreview } from "./post-preview";
import { DisplayHeading } from "./display-heading";
import { Dot } from "./dot";

import type { PostType } from "../interfaces/post";

type Props = {
  className?: string;
  posts: PostType[];
};

export const Opinions = ({ className, posts }: Props) => (
  <section className={className}>
    <DisplayHeading as="h2" className="mb-8 text-4xl md:text-6xl font-bold">
      Opinions
      <Dot />
    </DisplayHeading>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-x-16 gap-y-20">
      {posts.map((post) => (
        <PostPreview
          key={post.slug}
          title={post.title}
          coverImage={post.coverImage}
          slug={post.slug}
          excerpt={post.excerpt}
        />
      ))}
    </div>
  </section>
);
