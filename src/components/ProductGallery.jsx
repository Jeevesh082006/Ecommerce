import { useState } from "react";

function ProductGallery({
  image,
  title,
}) {
  const [
    selectedImage,
    setSelectedImage,
  ] = useState(image);

  return (
    <div className="gallery">

      <div className="thumbnail-list">

        <button
          type="button"
          className="thumbnail active"
          onClick={() =>
            setSelectedImage(image)
          }
        >
          <img
            src={image}
            alt={title}
          />
        </button>

      </div>

      <div className="main-product-image">

        <img
          src={selectedImage}
          alt={title}
        />

      </div>

    </div>
  );
}

export default ProductGallery;