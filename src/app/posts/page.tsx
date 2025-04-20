import PostsListPage from './p/[page]/page';

const PostsPage = () => {
  return <PostsListPage params={Promise.resolve({ page: '1' })} />;
};

export default PostsPage;
