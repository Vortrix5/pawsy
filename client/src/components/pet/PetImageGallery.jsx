const PetImageGallery = ({ image, name }) => (
  <div className="aspect-square relative rounded-lg overflow-hidden">
    <img
      src={image}
      alt={name}
      className="object-cover w-full h-full"
    />
  </div>
);

export default PetImageGallery;
