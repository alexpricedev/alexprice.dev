import { CoverImage } from "./cover-image";
import { PostTitle } from "./post-title";

type Props = {
  title: string;
  coverImage: string;
};

export const PostHeader = ({ title, coverImage }: Props) => (
  <>
    <PostTitle>{title}</PostTitle>
    <div className="mb-8 md:mb-16 sm:mx-0">
      <CoverImage title={title} src={coverImage} />
    </div>
  </>
);
