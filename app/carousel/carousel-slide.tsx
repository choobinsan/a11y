import { useEffect, useState } from "react";
import { useIntersectionObserver } from "usehooks-ts";
import { CarouselImageData } from "./carousel-data";

/* eslint-disable @next/next/no-img-element */
type CarouselSlideProps = {
  image: CarouselImageData;
  galleryRef: React.RefObject<HTMLDivElement | null>;
};

export const CarouselSlide: React.FC<CarouselSlideProps> = ({
  image,
  galleryRef,
}) => {
  const [loaded, setLoaded] = useState(false);
  const { isIntersecting, ref: intersectionRef } = useIntersectionObserver({
    rootMargin: "-10px",
    root: galleryRef?.current,
  });

  useEffect(() => {
    if (isIntersecting && !loaded) {
      setLoaded(true);
    }
  }, [isIntersecting, loaded]);

  return (
    <li ref={intersectionRef}>
      <figure>
        <img
          src={
            loaded
              ? image.src
              : "data:image/svg+xml;utf8,<svg xmlns=&quot;http://www.w3.org/2000/svg&quot; viewBox=&quot;0 0 6 2&quot; stroke=&quot;currentColor&quot; stroke-dasharray=&quot;1,0.5&quot;><path d=&quot;M1,1 5,1&quot; /></svg>"
          }
          alt={image.alt}
          className={loaded ? "" : "dots"}
          onLoad={() => {
            /* Optional: add any onLoad behavior here */
          }}
        />
        <noscript>
          <img src={image.src} alt={image.alt} />
        </noscript>
        <figcaption>{image.caption}</figcaption>
      </figure>
    </li>
  );
};
