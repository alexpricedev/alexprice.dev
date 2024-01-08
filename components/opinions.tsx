import { PostPreview } from "./post-preview";
import { DisplayHeading } from "./display-heading";
import { Dot } from "./dot";

import type { PostType } from "../interfaces/post";

type Props = {
  posts: PostType[];
};

export const Opinions = ({ posts }: Props) => {
  return (
    <section>
      <DisplayHeading as="h2" className="mb-8 text-4xl md:text-6xl font-bold">
        Opinions
        <Dot />
      </DisplayHeading>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
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
};
