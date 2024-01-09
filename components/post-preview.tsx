import Link from "next/link";

import { CoverImage } from "./cover-image";

type Props = {
  coverImage: string;
  excerpt: string;
  slug: string;
  title: string;
};

export const PostPreview = ({ title, coverImage, excerpt, slug }: Props) => (
  <div>
    <div className="mb-5">
      <CoverImage slug={slug} title={title} src={coverImage} />
    </div>
    <h3 className="text-2xl md:text-3xl font-bold tracking-tighter leading-tight mb-4">
      <Link
        as={`/posts/${slug}`}
        href="/posts/[slug]"
        className="hover:underline"
      >
        {title}
      </Link>
    </h3>
    <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
  </div>
);
