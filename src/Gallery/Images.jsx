import React, { useState,useEffect } from "react";
import { useDrag, useDrop } from "react-dnd"; // Import useDrag and useDrop
import update from "immutability-helper";

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
    <div className="flex flex-wrap p-4">
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
  const [, ref, preview] = useDrag({
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

  return (
    <div
      ref={(node) => {
        ref(node);
        drop(node);
      }}
     className=" cursor-move"
    >
      <img
        src={image.src}
        alt={image.tag}
        className="w-full xl:h-64 rounded-md h-24 lg:h-48 md:h-32"
      />
      <div className="flex justify-center">
        <button className="bg-gray-200 text-gray-700 mt-2 mx-auto p-2 xl:text-lg text-sm md:text-lg lg:text-lg rounded-md">
          {image.tag}
        </button>
      </div>
    </div>
  );
};

export default Images;
