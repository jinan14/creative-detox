import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiPlus, FiX } from "react-icons/fi";
import api from "../../api/axios";
import ArtworkTable from "../../components/admin/ArtworkTable";
import ImageUploadField from "../../components/admin/ImageUploadField";

const inputClass =
  "w-full min-w-0 max-w-full px-4 py-3 rounded-2xl border border-neutral-200 bg-white font-body text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition-all duration-200";

const emptyForm = {
  title: "",
  description: "",
  image: "",
  artist: "",
  price: "",
  category: "",
  available: true,
};

export default function AdminArtworks() {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);

  const loadArtworks = () => {
    api
      .get("/artworks")
      .then(({ data }) => setArtworks(data))
      .catch(() => setError("Couldn't load artworks."))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadArtworks();
  }, []);

  const openCreateForm = () => {
    setEditingId(null);
    setForm(emptyForm);
    setFormError("");
    setFormOpen(true);
  };

  const openEditForm = (artwork) => {
    setEditingId(artwork._id);
    setForm({
      title: artwork.title,
      description: artwork.description,
      image: artwork.image,
      artist: artwork.artist,
      price: artwork.price,
      category: artwork.category,
      available: artwork.available,
    });
    setFormError("");
    setFormOpen(true);
  };

  const closeForm = () => setFormOpen(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.image || !form.artist || !form.price || !form.category) {
      setFormError("Please fill in all fields and upload an image.");
      return;
    }

    setSaving(true);
    setFormError("");
    try {
      const payload = { ...form, price: Number(form.price) };
      if (editingId) {
        await api.put(`/artworks/${editingId}`, payload);
      } else {
        await api.post("/artworks", payload);
      }
      setFormOpen(false);
      loadArtworks();
    } catch (err) {
      setFormError(err.response?.data?.message || "Failed to save artwork.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (artwork) => {
    if (!window.confirm(`Delete "${artwork.title}"? This can't be undone.`)) return;
    try {
      await api.delete(`/artworks/${artwork._id}`);
      loadArtworks();
    } catch {
      setError("Failed to delete artwork.");
    }
  };

  const handleToggleAvailable = async (artwork) => {
    try {
      await api.put(`/artworks/${artwork._id}`, { available: !artwork.available });
      loadArtworks();
    } catch {
      setError("Failed to update artwork status.");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl font-bold text-neutral-900">Artworks</h2>
        <button onClick={openCreateForm} className="btn-primary text-sm py-2.5 px-5">
          <FiPlus size={15} /> Add Artwork
        </button>
      </div>

      {formOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-cream/60 rounded-3xl p-6 shadow-card"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold text-lg text-neutral-900">
              {editingId ? "Edit Artwork" : "New Artwork"}
            </h3>
            <button onClick={closeForm} className="text-neutral-400 hover:text-berry transition-colors">
              <FiX size={18} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <ImageUploadField value={form.image} onChange={(url) => setForm((prev) => ({ ...prev, image: url }))} />

            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Title"
              className={inputClass}
            />
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Description"
              rows={3}
              className={`${inputClass} resize-none`}
            />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <input
                name="artist"
                value={form.artist}
                onChange={handleChange}
                placeholder="Artist"
                className={inputClass}
              />
              <input
                name="price"
                type="number"
                min="0"
                step="0.01"
                value={form.price}
                onChange={handleChange}
                placeholder="Price"
                className={inputClass}
              />
              <input
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="Category"
                className={inputClass}
              />
            </div>

            <label className="flex items-center gap-2 font-body text-sm text-neutral-600">
              <input
                type="checkbox"
                name="available"
                checked={form.available}
                onChange={handleChange}
                className="rounded border-neutral-300 text-teal focus:ring-teal/30"
              />
              Available for purchase
            </label>

            {formError && <p className="text-xs text-berry font-body">{formError}</p>}

            <button
              type="submit"
              disabled={saving}
              className="btn-primary justify-center py-3 text-sm disabled:opacity-60"
            >
              {saving ? "Saving..." : editingId ? "Save Changes" : "Create Artwork"}
            </button>
          </form>
        </motion.div>
      )}

      <div className="bg-white rounded-3xl p-6 shadow-card">
        {loading && <p className="text-center text-neutral-500 font-body py-10">Loading artworks...</p>}
        {!loading && error && <p className="text-center text-berry font-body py-10">{error}</p>}
        {!loading && !error && (
          <ArtworkTable
            artworks={artworks}
            onEdit={openEditForm}
            onDelete={handleDelete}
            onToggleAvailable={handleToggleAvailable}
          />
        )}
      </div>
    </div>
  );
}
