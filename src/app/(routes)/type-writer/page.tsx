import Typewriter from "@/components/Typewriter";
import React from "react";

const TypeWriterPage = () => {
  return (
    <main>
      <Typewriter
        text={["Hello My Name is Rehan", "King is King"]}
        speed={100}
      />
    </main>
  );
};

export default TypeWriterPage;
