import React, { useState,useEffect } from "react";
import { Row, Col, Input,Button } from "antd";
import ImageList from "./Images";
import { DndProvider } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";
import {  useNavigate } from "react-router-dom";
import LogOutModal from "../Components/LogOutModal";
import rec from '../assets/images/Rectangle.png'

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
    console.log(result);
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
    <div className="container mx-auto mt-2 p-4 lato">
      <Row gutter={[16, 16]} className=" flex gap-[.01rem]">
        <Col span={12} className="flex ">
          <img src={rec} alt="logo"  className=" w-5rem "/>
          <h1 className="  font-semibold md:mt-5 lg:mt-5 xl:mt-5 mt-4 md:text-[1.6rem] text-gray-600 lg:text-[1.6rem] xl:text-[1.6rem] text-[1rem]">Image Gallery</h1>
        </Col>
        <Col span={12} className="   ">
          <Input
            placeholder="Search images by tag"
            onChange={handleSearchInputChange}
            className="md:w-full lg:w-full xl:w-full w-[9rem] "
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
