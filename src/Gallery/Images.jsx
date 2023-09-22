import React, { useState,useEffect } from "react";
import { useDrag, useDrop } from "react-dnd"; // Import useDrag and useDrop
import update from "immutability-helper";

import { useSpring, animated } from "react-spring";

const Images = ({ images }) => {
  console.log("Received images:", images);
  const [imageList, setImageList] = useState(images);
  console.log("imageList images:", imageList);

  useEffect(() => {
    setImageList(images);
  }, [images]);

  const moveImage = (dragIndex, hoverIndex) => {
    const draggedImage = imageList[dragIndex];

    // Use immutability-helper to update the imageList state
    const updatedImageList = update(imageList, {
      $splice: [
        [dragIndex, 1], // Remove the dragged image from the original position
        [hoverIndex, 0, draggedImage], // Insert the dragged image at the new position
      ],
    });

    setImageList(updatedImageList);
  };

  

  return (
    <div className="flex flex-wrap p-4 poppings">
      {imageList.map((image, index) => (
        <div key={image.id} className="bg-white p-4 rounded-md shadow-md m-2">
          {/* Use useDrag hook to make the image draggable */}
          <DraggableImage
            image={image}
            index={index}
            moveImage={moveImage}
          />
        </div>
      ))}
    </div>
  );
};

const DraggableImage = ({ image, index, moveImage }) => {
  const [{ isDragging }, ref, preview] = useDrag({
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
    transform: `translate3d(${isDragging ? 5 : 4}px, ${isDragging ? -5 : 0}px, 0)`,
    config: {
      tension: isDragging ? 800 : 500, 
      friction: isDragging ? 40 : 30,  
      duration: isDragging ? 0 : 300, 
    },
  });

  return (
    <animated.div
    style={springProps} 
      ref={(node) => {
        ref(node);
        drop(node);
      }}
      className={`cursor-move ${isDragging ? "dragging" : ""}`}
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
    </animated.div>
  );
};

export default Images;
