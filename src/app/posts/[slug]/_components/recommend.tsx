import { PostGrid } from "@semantic/components/ui/post-grid";
import type { Post } from "@/types/content";

interface RecommendProps {
  posts: Post[];
}

export const Recommend = ({ posts }: RecommendProps) => (
  <section aria-labelledby="recommendation-heading">
    <h3
      className="font-medium font-mono text-[var(--color-gray-accent)] text-lg"
      id="recommendation-heading"
    >
      🦾 Check them out
    </h3>
    <PostGrid className="mt-[2.25rem] mb-[3.5rem]" posts={posts} />
  </section>
);
