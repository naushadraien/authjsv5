"use client";
import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import Modal from "@/components/Modal";
import ChatZoneImg from "@/assets/ChatZone.png";
import BroadBandImg from "@/assets/Digiweb_Broadband_Logo.png";
import ZurichImg from "@/assets/Zurich.png";
import AIBImg from "@/assets/AIB_Logo.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const imgsData: Array<{ src: string | StaticImageData; alt: string }> = [
  {
    src: ChatZoneImg,
    alt: "Chat Image",
  },
  {
    src: BroadBandImg,
    alt: "BroadBand Image",
  },
  {
    src: ZurichImg,
    alt: "BroadBand Image",
  },
  {
    src: AIBImg,
    alt: "BroadBand Image",
  },
];

const Page = () => {
  const [openModal, setOpenModal] = useState(false);
  const [positions, setPositions] = useState<
    { x: number; y: number; text: string }[]
  >([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  // const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
  //   const rect = e.currentTarget.getBoundingClientRect();
  //   const x = e.clientX - rect.left;
  //   const y = e.clientY - rect.top;
  //   // const text = prompt("Enter text:");
  //   if (text) {
  //     setPositions((prev) => [...prev, { x, y, text }]);
  //   }
  // };

  const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPositions([...positions, { x, y, text: "" }]);
    setEditingIndex(positions.length); // Set the new position as the editing index
  };

  const deleteAllPositions = () => {
    setPositions([]);
  };

  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newText = e.target.value;
    const newPositions = positions.map((pos, i) =>
      i === index ? { ...pos, text: newText } : pos
    );
    setPositions(newPositions);
  };

  const deleteThisPositionText = (idx: number) => {
    setPositions((prev) => [...prev.filter((_, i) => i !== idx)]);
    setEditingIndex(null);
  };

  const handleOuterText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newOuterText = e.target.value;
    setPositions((prev) => [
      ...prev.map((pos, i) =>
        i === editingIndex ? { ...pos, text: newOuterText } : pos
      ),
    ]);
  };

  const [imgData, setImgData] = useState(imgsData);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (
    event: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    event.preventDefault();

    if (draggedIndex !== null && draggedIndex !== index) {
      const newImgData = [...imgData];
      const [draggedImage] = newImgData.splice(draggedIndex, 1);
      newImgData.splice(index, 0, draggedImage);
      setImgData(newImgData);
      setDraggedIndex(index);
    }
  };

  // const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
  //   e.preventDefault();
  // };

  const handleDrop = (index: number) => {
    // if (draggedIndex === null) return;

    // const newImgData = [...imgData];
    // const [draggedImage] = newImgData.splice(draggedIndex, 1);
    // newImgData.splice(index, 0, draggedImage);

    // setImgData(newImgData);
    setDraggedIndex(null);
  };

  return (
    <>
      <div className="flex justify-center items-center mb-20">
        <div className="flex gap-6 justify-center items-center mt-5">
          {imgData.map((img, idx) => (
            <div
              key={idx}
              draggable
              onDragStart={() => handleDragStart(idx)}
              onDragOver={(event) => handleDragOver(event, idx)}
              onDrop={() => handleDrop(idx)}
              style={{
                cursor: "move",
                opacity: draggedIndex === idx ? 0.5 : 1,
                transform: draggedIndex === idx ? "scale(1.05)" : "scale(1)",
                transition: "transform 0.2s, opacity 0.2s",
              }}
            >
              <Image src={img.src} alt={img.alt} width={100} height={100} />
            </div>
            // <div
            //   key={idx}
            //   draggable
            //   onDragStart={() => handleDragStart(idx)}
            //   onDragOver={handleDragOver}
            //   onDrop={() => handleDrop(idx)}
            //   style={{ cursor: "move" }}
            // >
            //   <Image src={img.src} alt={img.alt} width={100} height={100} />
            // </div>
          ))}
        </div>
      </div>
      <div
        onClick={handleOpenModal}
        className="flex justify-center items-center mt-20 flex-col"
      >
        <Image
          src={ChatZoneImg}
          alt="ChatZone Image"
          width={500}
          height={500}
        />

        <div>
          <h3>Stored Positions:</h3>
          <ul>
            {positions.map((pos, index) => (
              <li key={index}>
                Position: ({pos.x}, {pos.y}), Text: {pos.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {openModal && (
        <Modal
          isOpen={openModal}
          onClose={handleCloseModal}
          title="This is test"
        >
          <div className="relative">
            <Image
              src={ChatZoneImg}
              alt="ChatZone Image"
              width={1000}
              height={1000}
              onClick={handleImageClick}
              className="cursor-pointer"
            />
            {positions.map((pos, index) => (
              <div
                key={index}
                className="absolute"
                style={{
                  position: "absolute",
                  top: pos.y,
                  left: pos.x,
                  transform: "translate(-50%, -50%)",
                  background: "rgba(255, 255, 255, 0.7)",
                  padding: "2px 4px",
                  borderRadius: "4px",
                  // pointerEvents: "none", // Prevent the text from being interactive
                }}
              >
                {/* {editingIndex === index ? (
                  <>
                    <Input
                      value={pos.text}
                      onChange={(e) => handleTextChange(e, index)}
                    />
                    <Button
                      variant={"destructive"}
                      onClick={() => deleteThisPositionText(index)}
                    >
                      Delete this position
                    </Button>
                  </>
                ) : (
                  <p onClick={() => setEditingIndex(index)}>{pos.text}</p>
                )} */}
                <p onClick={() => setEditingIndex(index)}>{pos.text}</p>
              </div>
            ))}
            <form onSubmit={(e) => e.preventDefault()}>
              <Input onChange={handleOuterText} />
              <Button type="submit">Submit</Button>
            </form>
            {positions.length > 0 && (
              <Button variant={"destructive"} onClick={deleteAllPositions}>
                Delete All Positions
              </Button>
            )}
          </div>
        </Modal>
      )}
    </>
  );
};

export default Page;
