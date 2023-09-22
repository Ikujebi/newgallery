import React, { useState,useEffect } from "react";
import { Row, Col, Input,Button } from "antd";
import ImageList from "./Images";
import { DndProvider } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";
import {  useNavigate } from "react-router-dom";
import LogOutModal from "../Components/LogOutModal";

const Gallery = ({ images, setIsAuthenticated }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate()
  const [filteredImages, setFilteredImages] = useState(images); // Initialize with the images prop
  const [isLogOutModalOpen, setIsLogOutModalOpen] = useState(false);

  
  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const updateFilteredImages = (newImages) => {
    setFilteredImages(newImages);
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const newFilteredImages = [...filteredImages];
    const [movedImage] = newFilteredImages.splice(result.source.index, 1);
    newFilteredImages.splice(result.destination.index, 0, movedImage);

    // Update the filtered images after dragging and dropping
    updateFilteredImages(newFilteredImages);
  };

  const openLogOutModal = () => {
    setIsLogOutModalOpen(true);
  };

  const logoutHandler = () => {
    openLogOutModal();
  };

  useEffect(() => {
    // Update filteredImages whenever images or searchTerm changes
    const newFilteredImages = images.filter((image) =>
      image.tag.toLowerCase().includes(searchTerm.toLowerCase())
    );
    updateFilteredImages(newFilteredImages);
  }, [images, searchTerm]);
  

  return (
    <div className="container mx-auto mt-4 p-4 lato">
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
        <Col>
        <Button onClick={logoutHandler} type="danger" className=" bg-red-600 text-white">sign out</Button>
       
        </Col>
      </Row>
      {isLogOutModalOpen && ( 
        <LogOutModal
          isOpen={isLogOutModalOpen}
          onRequestClose={() => setIsLogOutModalOpen(false)}
          onConfirm={() => {
            handleLogout();
            setIsLogOutModalOpen(false);
          }}
        />
      )}
      <div>
        <DndProvider onDragEnd={onDragEnd} backend={TouchBackend} options={{ enableMouseEvents: true }}>
          <ImageList images={filteredImages} />
        </DndProvider>
      </div>
    </div>
  );
};

export default Gallery;
