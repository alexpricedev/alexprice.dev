import cn from "classnames";
import Link from "next/link";
import Image from "next/image";

type Props = {
  title: string;
  src: string;
  slug?: string;
};

export const CoverImage = ({ title, src, slug }: Props) => {
  const image = (
    <div className="relative">
      <Image
        src={src}
        alt={`Cover Image for ${title}`}
        className="w-full"
        width={1300}
        height={630}
      />
      {slug && (
        <div
          className={cn(
            "absolute left-0 top-0 right-0 bottom-0",
            "hover:backdrop-blur-[3px] transition-all",
          )}
        />
      )}
    </div>
  );

  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link as={`/posts/${slug}`} href="/posts/[slug]" aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  );
};
