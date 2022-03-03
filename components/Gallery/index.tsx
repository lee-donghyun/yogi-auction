import { FC, useState } from "react";
import { VscLoading, VscAdd } from "react-icons/vsc";
import { uploadFile } from "../../services/api/firebase";

const Gallery: FC<{
  imageUrls: string[];
  name: string;
  onChange: (e: any) => void;
}> = ({ imageUrls, name, onChange }) => {
  const [isImageUploading, setIsImageUploading] = useState(false);

  const onChangeInputImage = async ({ target: { files } }: any) => {
    if (files && !isImageUploading) {
      try {
        setIsImageUploading(true);
        const imageUrl = await uploadFile(files?.[0]);
        onChange({
          target: {
            name,
            value: [...imageUrls, imageUrl],
          },
        });
      } catch (error) {
        console.error(error);
      } finally {
        setIsImageUploading(false);
      }
    }
  };

  return (
    <div className="grid grid-cols-4 lg:grid-cols-8 gap-2">
      {imageUrls.map((imageUrl, i) => (
        <div className="aspect-square relative" key={imageUrl}>
          <img
            src={imageUrl}
            alt={name + i}
            className="absolute inset-0 object-cover max-h-full min-h-full min-w-full max-w-full rounded"
          />
        </div>
      ))}
      {isImageUploading && (
        <div className="flex items-center justify-center aspect-square">
          <VscLoading className="text-3xl animate-spin" />
        </div>
      )}
      <label
        htmlFor={name}
        className="rounded bg-[#ebebeb] text-white flex items-center justify-center aspect-square cursor-pointer"
      >
        <VscAdd className="text-3xl" />
        <input
          id={name}
          name={name}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onChangeInputImage}
        />
      </label>
    </div>
  );
};

export default Gallery;
