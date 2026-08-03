import { ImagePlus } from "lucide-react";

function PhotoUploader() {
  return (
    <div className="mt-12">

      <h2 className="text-3xl font-bold">
        📸 Memory Gallery
      </h2>

      <p className="text-gray-400 mt-2">
        Add the memories that make this birthday unforgettable.
      </p>

      <div className="mt-8">

        <label
          className="border-2 border-dashed border-white/20
          rounded-3xl h-72
          flex flex-col justify-center items-center
          cursor-pointer
          hover:border-purple-500
          transition-all duration-300
          bg-[#15151D]"
        >

          <ImagePlus
            size={60}
            className="text-purple-400"
          />

          <h3 className="mt-6 text-2xl font-bold">

            Add Beautiful Memories

          </h3>

          <p className="text-gray-400 mt-3">

            Click anywhere to upload photos

          </p>

          <p className="text-sm text-gray-500 mt-2">

            JPG • PNG • JPEG

          </p>

          <p className="text-sm text-purple-300 mt-6">

            Maximum 12 Memories

          </p>

          <input
            type="file"
            multiple
            className="hidden"
          />

        </label>

      </div>

    </div>
  );
}

export default PhotoUploader;