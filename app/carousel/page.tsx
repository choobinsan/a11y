"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import "./carousel.css";
import { imagesData } from "./carousel-data";
import { CarouselControls } from "./carousel-controls";
import { CarouselSlide } from "./carousel-slide";

export default function Carousel() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    galleryRef.current?.classList.remove("no-js");
  }, []);

  // Update current slide index based on scroll position
  const updateSlideIndex = useCallback(() => {
    if (!galleryRef.current) return;
    const gallery = galleryRef.current;
    const totalSlides = imagesData.length;
    const slideWidth = gallery.scrollWidth / totalSlides;
    const newIndex = Math.round(gallery.scrollLeft / slideWidth);
    setCurrentSlide(newIndex);
  }, []);

  // Debounced scroll handler to update the slide index
  const debouncedUpdateSlideIndex = useCallback(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    debounceTimerRef.current = setTimeout(updateSlideIndex, 100);
  }, [updateSlideIndex]);

  // Navigate to previous slide
  const handlePrevClick = useCallback(() => {
    if (!galleryRef.current) return;
    const gallery = galleryRef.current;
    const totalSlides = imagesData.length;
    const newSlide = Math.max(currentSlide - 1, 0);
    const slideWidth = gallery.scrollWidth / totalSlides;
    gallery.scrollTo({ left: newSlide * slideWidth, behavior: "smooth" });
    setCurrentSlide(newSlide);
  }, [currentSlide]);

  // Navigate to next slide
  const handleNextClick = useCallback(() => {
    if (!galleryRef.current) return;
    const gallery = galleryRef.current;
    const totalSlides = imagesData.length;
    const newSlide = Math.min(currentSlide + 1, totalSlides - 1);
    const slideWidth = gallery.scrollWidth / totalSlides;
    gallery.scrollTo({ left: newSlide * slideWidth, behavior: "smooth" });
    setCurrentSlide(newSlide);
  }, [currentSlide]);

  return (
    <div className="gallery-container" style={{ padding: "0 3rem" }}>
      <CarouselControls
        onPrev={handlePrevClick}
        onNext={handleNextClick}
        disablePrev={currentSlide === 0}
        disableNext={currentSlide === imagesData.length - 1}
      />
      <div
        role="group"
        className="gallery"
        aria-label="gallery (scroll for more)"
        tabIndex={0}
        ref={galleryRef}
        onScroll={debouncedUpdateSlideIndex}
      >
        <ul>
          {imagesData.map((image, index) => (
            <CarouselSlide key={index} image={image} galleryRef={galleryRef} />
          ))}
        </ul>
      </div>
    </div>
  );
}
