
import { useDrag, useDrop  } from "react-dnd";
import { motion } from "framer-motion";
import {  useSpring, config } from "react-spring";

const DraggableImage = ({ image, index, moveImage }) => {
  const [{ isDragging }, ref] = useDrag({
    type: "IMAGE",
    item: { id: image.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  
  const [, drop] = useDrop({
    accept: "IMAGE",
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        // Call the moveImage function to reorder the cards
        moveImage(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
    drop: () => {
      // Handle drop event if needed
      onDrop(index);
    },
  });

  const springProps = {
    opacity: isDragging ? 0.7 : 1,
    transform: `translate3d(${isDragging ? 5 : 0}px, ${
      isDragging ? -5 : 0
    }px, 0) scale(${isDragging ? 1.05 : 1})`,
    boxShadow: isDragging
      ? "0px 8px 12px rgba(0, 0, 0, 0.2)"
      : "0px 4px 6px rgba(0, 0, 0, 0.1)",
      config: config.stiff,
  };

  return (
    <animate.div
    ref={(node) => {
        ref(node);
        drop(node);
      }}
      
      className={`cursor-move`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      style={springProps}
      
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

export default DraggableImage;
