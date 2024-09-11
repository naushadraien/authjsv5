import Carousel from "@/components/Carousel";
import { imgsData } from "../test/page";

function Test1Page() {
  return (
    <div className="flex justify-center items-center max-w-lg mx-auto">
      <Carousel imgData={imgsData} autoSlide />
    </div>
  );
}

export default Test1Page;
