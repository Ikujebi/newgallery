import DraggableImage from './DraggableImage';

const DropImage = ({  index, moveImage, onDrop, dropImageContents, imageList }) => {
  const handleDrop = (e) => {
    e.preventDefault();
    const draggedId = e.dataTransfer.getData("text/plain");
    onDrop(draggedId, index); // Pass the dragged ID and the index to the onDrop function.
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      {dropImageContents[index] && (
        <DraggableImage
          image={imageList.find((image) => image.id === dropImageContents[index])}
          index={index}
          moveImage={moveImage}
        />
      )}
    </div>
  );
};

export default DropImage;
