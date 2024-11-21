"use client";
import { useEffect, useState } from "react";

type HOCProps = {
  children?: React.ReactNode;
};

const withLoaderHOC = <T extends object>(
  WrappedComponent: React.ComponentType<T>
) => {
  const HOC = (props: HOCProps & T) => {
    const [posts, setPosts] = useState<
      Array<{
        userId: number;
        id: number;
        title: string;
        body: string;
      }>
    >([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    useEffect(() => {
      fetchPosts();
    }, []);

    if (isLoading) {
      return (
        <p className="text-center text-purple-500 w-full h-full text-xl font-bold">
          Loading
        </p>
      );
    }
    return <WrappedComponent {...(props as T)} posts={posts} />;
  };
  return HOC;
};

export default withLoaderHOC;
