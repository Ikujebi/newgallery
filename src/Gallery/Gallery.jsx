import React, { useState,useEffect } from "react";
import { Row, Col, Input } from "antd";
import ImageList from "./Images";
import { DndProvider } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";

const Gallery = ({ images }) => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const [filteredImages, setFilteredImages] = useState(images); // Initialize with the images prop

  
  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    // Update filteredImages whenever images or searchTerm changes
    const newFilteredImages = images.filter((image) =>
      image.tag.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredImages(newFilteredImages);
  }, [images, searchTerm]);
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const newFilteredImages = [...filteredImages];
    const [movedImage] = newFilteredImages.splice(result.source.index, 1);
    newFilteredImages.splice(result.destination.index, 0, movedImage);

    // Update the filtered images after dragging and dropping
    setFilteredImages(newFilteredImages);
  };

  return (
    <div className="container mx-auto mt-4 p-4">
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <h1 className="text-2xl font-semibold mb-4">Image Gallery</h1>
        </Col>
        <Col span={12}>
          <Input
            placeholder="Search images by tag"
            onChange={handleSearchInputChange}
            className="w-full"
          />
        </Col>
      </Row>
      <div>
        <DndProvider onDragEnd={onDragEnd} backend={TouchBackend} options={{ enableMouseEvents: true }}>
          <ImageList images={filteredImages} />
        </DndProvider>
      </div>
    </div>
  );
};

export default Gallery;
