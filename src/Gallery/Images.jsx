import React, { useState, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import update from "immutability-helper";
import {  useSpring, config } from "react-spring";
import { motion } from "framer-motion";

const Images = ({ images }) => {
  const [imageList, setImageList] = useState(images);

  useEffect(() => {
    setImageList(images);
  }, [images]);

  const moveImage = (dragIndex, hoverIndex) => {
    const draggedImage = imageList[dragIndex];

    const updatedImageList = update(imageList, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, draggedImage],
      ],
    });

    setImageList(updatedImageList);
  };
  const onDrop = (draggedIndex, droppedIndex) => {
    
    moveImage(draggedIndex, droppedIndex);
  };

  return (
    <div className="flex flex-wrap p-4 poppings">
      {imageList.map((image, index) => (
        <div key={image.id} className="bg-white p-4 rounded-md shadow-md m-2">
          <DraggableImage
            image={image}
            index={index}
            moveImage={moveImage}
            onDrop={onDrop}
          />
        </div>
      ))}
    </div>
  );
};

const DraggableImage = ({ image, index, moveImage }) => {
  const [{ isDragging }, ref] = useDrag({
    type: "IMAGE",
    item: { id: image.id, index },
  });

  const [, drop] = useDrop({
    accept: "IMAGE",
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveImage(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  const springProps = useSpring({
    opacity: isDragging ? 0.7 : 1,
    transform: `translate3d(${isDragging ? 5 : 0}px, ${isDragging ? -5 : 0}px, 0) scale(${
      isDragging ? 1.05 : 1
    })`,
    boxShadow: isDragging
      ? "0px 8px 12px rgba(0, 0, 0, 0.2)"
      : "0px 4px 6px rgba(0, 0, 0, 0.1)",
   
  });

  return (
    <animate.div
      ref={(node) => {
        ref(node);
        drop(node);
      }}
      className={`cursor-move`}
      
    >
      <img
        src={image.src}
        alt={image.tag}
        className="md:w-[11rem] lg:w-[15rem] lx:w-[17rem] w-[5rem] xl:h-64 rounded-md h-24 lg:h-48 md:h-32"
      />
      <div className="flex justify-center">
        <button className="bg-gray-200 text-gray-700 mt-2 mx-auto p-2 xl:text-lg text-sm md:text-lg lg:text-lg rounded-md">
          {image.tag}
        </button>
      </div>
    </animate.div>
  );
};

export default Images;
