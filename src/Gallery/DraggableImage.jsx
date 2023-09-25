import React from 'react';
import { motion } from 'framer-motion';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

const DraggableImage = ({ image, index, moveImage,id }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging, over } = useDraggable({
    id: image.id,
    data: { index }, // Add the index as data
    move: (event) => {
      console.log('Move called:', image.id, event.active.id);
      moveImage(image.id, event.active.id); // Call moveImage when dragging
    }, 
  });

  return (
    <motion.div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      initial={{ opacity: 1, x: 0, y: 0 }}
      animate={{ opacity: over ? 0.7 : 1, x: transform?.x || 0, y: transform?.y || 0 }}
      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      className={`cursor-move`}
      style={{
        transform: CSS.Transform.toString(transform),
        boxShadow: isDragging
          ? '0px 8px 12px rgba(0, 0, 0, 0.2)'
          : '0px 4px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      <img
        src={image.src}
        alt={image.tag}
        className="md:w-[11rem] lg:w-[15rem] lx:w-[17rem] w-[5rem] xl:h-64 rounded-md h-24 lg:h-48 md:h-32"
      data-id={image.id}
     />
      <div className="flex justify-center">
        <button className="bg-gray-200 text-gray-700 mt-2 mx-auto p-2 xl:text-lg text-sm md:text-lg lg:text-lg rounded-md">
          {image.tag}
        </button>
      </div>
    </motion.div>
  );
};

export default DraggableImage;
