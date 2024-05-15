import PostCard from "@/components/postCard/postCard";
import styles from "./blog.module.css";
import { getPosts, getUsers } from "@/lib/data";


const BlogPage = async () => {

  const posts = await getPosts();

  return (
    <div className={styles.container}>
      {posts.map((post: any) => (
        <div className={styles.post} key={post.id}>
          <PostCard post={post} />
        </div>
      ))}
    </div>
  );
};

export default BlogPage;