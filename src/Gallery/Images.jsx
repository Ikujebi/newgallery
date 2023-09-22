import React, { useState,useEffect } from "react";
import { useDrag, useDrop } from "react-dnd"; // Import useDrag and useDrop
import update from "immutability-helper";
import { useSpring, animated, config , motion } from "react-spring";

const Images = ({ images }) => {
  console.log("Received images:", images);
  const [imageList, setImageList] = useState(images);
  console.log("imageList images:", imageList);

  useEffect(() => {
    setImageList(images);
  }, [images]);

  const moveImage = (fromIndex, toIndex) => {
    // Ensure that fromIndex and toIndex are within bounds
    if (
      fromIndex < 0 ||
      fromIndex >= imageList.length ||
      toIndex < 0 ||
      toIndex >= imageList.length
    ) {
      return;
    }

    
    
    
    const updatedImageList = update(imageList, {
      
      $splice: [
        [fromIndex, 1], // Remove the item at fromIndex
        [toIndex, 0, imageList[fromIndex]], // Insert the item at fromIndex to toIndex
      ],
      
    });
    console.log("updatedImageList images:", updatedImageList);
    console.log(`updatedImageList = ${JSON.stringify(updatedImageList)}`);
    // Update the state with the new ordered imageList
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
    transform: `translate3d(0, ${isDragging ? -10 : 0}px, 0)`, // Use translate3d for smoother vertical movement
    config: { tension: 500, friction: 30 },
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
