import withLoaderHOC from "@/components/WithLoaderHOC";
import React from "react";

type Props = {
  title: string;
  posts?: {
    userId: number;
    id: number;
    title: string;
    body: string;
  }[]; // Add posts to the Props type
};

const TestSection = ({ title, posts }: Props) => {
  console.log("🚀 ~ TestSection ~ posts:", posts);
  return <section>TestSection</section>;
};

export default withLoaderHOC(TestSection);
