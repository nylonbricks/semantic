import { allPosts } from 'contentlayer/generated';

const HomePage = () => {
  return <div>{JSON.stringify(allPosts)}</div>;
};

export default HomePage;
