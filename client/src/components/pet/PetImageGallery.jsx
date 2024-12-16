const API_URL = import.meta.env.VITE_API_URL;

const PetImageGallery = ({ image, name }) => (
  <div className="aspect-square relative rounded-lg overflow-hidden">
    <img
      src={`${API_URL}/${image}`}
      alt={name}
      className="object-cover w-full h-full"
    />
  </div>
);

export default PetImageGallery;
