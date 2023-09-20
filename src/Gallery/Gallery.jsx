import React, { useState } from "react";
import { Row, Col, Input } from "antd";
import ImageList from "./Images";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const Gallery = ({ images }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredImages, setFilteredImages] = useState(images);

  const handleSearchInputChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = images.filter((image) => image.tag.toLowerCase().includes(term));
    setFilteredImages(filtered);
  };

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
        <DndProvider onDragEnd={onDragEnd} backend={HTML5Backend}>
          <ImageList images={filteredImages} />
        </DndProvider>
      </div>
    </div>
  );
};

export default Gallery;
