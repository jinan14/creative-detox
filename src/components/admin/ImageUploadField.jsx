import { useState } from "react";
import { FiUpload, FiCheck } from "react-icons/fi";
import api from "../../api/axios";
import resolveImageUrl from "../../utils/resolveImageUrl";

export default function ImageUploadField({ value, onChange }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");
    setUploading(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const { data } = await api.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onChange(data.url);
    } catch (err) {
      setError(err.response?.data?.message || "Upload failed. Please try again.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  return (
    <div>
      <div className="flex items-center gap-4">
        {value ? (
          <img
            src={resolveImageUrl(value)}
            alt="Preview"
            className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
          />
        ) : (
          <div className="w-16 h-16 rounded-xl bg-neutral-100 flex items-center justify-center flex-shrink-0">
            <FiUpload size={18} className="text-neutral-400" />
          </div>
        )}

        <label className="flex-1 min-w-0">
          <span className="sr-only">Upload image</span>
          <div className="flex items-center gap-2 px-4 py-3 rounded-2xl border border-neutral-200 bg-white font-body text-sm text-neutral-600 cursor-pointer hover:border-teal transition-colors">
            {uploading ? (
              "Uploading..."
            ) : value ? (
              <>
                <FiCheck size={14} className="text-teal" /> Image uploaded — change file
              </>
            ) : (
              "Choose an image file"
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
            className="hidden"
          />
        </label>
      </div>
      {error && <p className="mt-1 text-xs text-berry font-body">{error}</p>}
    </div>
  );
}
