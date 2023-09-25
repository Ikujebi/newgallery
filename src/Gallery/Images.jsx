import React, { useState, useEffect } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import DraggableImage from './DraggableImage';
import DropImage from './DropImage';

const Images = ({ images }) => {
  const [imageList, setImageList] = useState(images);

  useEffect(() => {
    setImageList(images);
  }, [images]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const [dropImageContents, setDropImageContents] = useState(Array(images.length).fill(null));


  const moveImage = (draggedId, targetId) => {
    console.log('moveImage called with draggedId:', draggedId);
    console.log('moveImage called with targetId:', targetId);
    console.log('Event Target Element:', event.target);
    console.log('Event over Element:', event.over);
  
    if (!targetId) {
      console.log('No valid drop target found');
      return;
    }
  
    const draggedIndex = imageList.findIndex((image) => image.id === draggedId);
    const targetIndex = imageList.findIndex((image) => image.id === targetId);
  
    if (draggedIndex === -1 || targetIndex === -1) {
      console.log('Invalid IDs');
      return;
    }
  
    const updatedImageList = [...imageList];
    const [draggedImage] = updatedImageList.splice(draggedIndex, 1);
    updatedImageList.splice(targetIndex, 0, draggedImage);
  
    setImageList(updatedImageList);
  };

  return (
     <DndContext onDragEnd={(event) => moveImage(event.active.id, event.over?.id)}>
      <div className="flex flex-wrap p-4 poppings">
        {imageList.map((image, index) => (
          <div key={image.id} className="bg-white p-4 rounded-md shadow-md m-2">
            <DraggableImage image={image} index={index} />
          </div>
        ))}
      </div>
    </DndContext>
  );
};

export default Images;
