import PostsPage from './p/[page]/page';

const PostRootPage = () => {
  return <PostsPage params={Promise.resolve({ page: '1' })} />;
};

export default PostRootPage;
