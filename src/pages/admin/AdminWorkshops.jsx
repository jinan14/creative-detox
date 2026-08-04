import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiPlus, FiX } from "react-icons/fi";
import api from "../../api/axios";
import WorkshopTable from "../../components/admin/WorkshopTable";
import ImageUploadField from "../../components/admin/ImageUploadField";
import GenerateDescriptionButton from "../../components/admin/GenerateDescriptionButton";

const inputClass =
  "w-full min-w-0 max-w-full px-4 py-3 rounded-2xl border border-neutral-200 bg-white font-body text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition-all duration-200";

const emptyForm = {
  title: "",
  description: "",
  date: "",
  time: "",
  location: "",
  capacity: "",
  seatsRemaining: "",
  price: "",
  image: "",
  category: "",
  duration: "",
  level: "",
};

const toDateInputValue = (date) => {
  if (!date) return "";
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return "";
  return parsed.toISOString().slice(0, 10);
};

export default function AdminWorkshops() {
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);

  const loadWorkshops = () => {
    api
      .get("/workshops")
      .then(({ data }) => setWorkshops(data))
      .catch(() => setError("Couldn't load workshops."))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadWorkshops();
  }, []);

  const openCreateForm = () => {
    setEditingId(null);
    setForm(emptyForm);
    setFormError("");
    setFormOpen(true);
  };

  const openEditForm = (workshop) => {
    setEditingId(workshop._id);
    setForm({
      title: workshop.title,
      description: workshop.description,
      date: toDateInputValue(workshop.date),
      time: workshop.time,
      location: workshop.location,
      capacity: workshop.capacity,
      seatsRemaining: workshop.seatsRemaining,
      price: workshop.price ?? "",
      image: workshop.image || "",
      category: workshop.category || "",
      duration: workshop.duration || "",
      level: workshop.level || "",
    });
    setFormError("");
    setFormOpen(true);
  };

  const closeForm = () => setFormOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.date || !form.time || !form.location || !form.capacity) {
      setFormError("Title, description, date, time, location, and capacity are required.");
      return;
    }

    setSaving(true);
    setFormError("");
    try {
      const payload = {
        title: form.title,
        description: form.description,
        date: form.date,
        time: form.time,
        location: form.location,
        capacity: Number(form.capacity),
        price: form.price === "" ? 0 : Number(form.price),
        image: form.image,
        category: form.category,
        duration: form.duration,
        level: form.level,
      };
      if (editingId) {
        payload.seatsRemaining =
          form.seatsRemaining === "" ? Number(form.capacity) : Number(form.seatsRemaining);
        await api.put(`/workshops/${editingId}`, payload);
      } else {
        await api.post("/workshops", payload);
      }
      setFormOpen(false);
      loadWorkshops();
    } catch (err) {
      setFormError(err.response?.data?.message || "Failed to save workshop.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (workshop) => {
    if (!window.confirm(`Delete "${workshop.title}"? This can't be undone.`)) return;
    try {
      await api.delete(`/workshops/${workshop._id}`);
      loadWorkshops();
    } catch {
      setError("Failed to delete workshop.");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl font-bold text-neutral-900">Workshops</h2>
        <button onClick={openCreateForm} className="btn-primary text-sm py-2.5 px-5">
          <FiPlus size={15} /> Add Workshop
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
              {editingId ? "Edit Workshop" : "New Workshop"}
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
            <div className="flex flex-col gap-1.5">
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Description"
                rows={3}
                className={`${inputClass} resize-none`}
              />
              <GenerateDescriptionButton
                title={form.title}
                type="workshop"
                onGenerated={(description) => setForm((prev) => ({ ...prev, description }))}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
                className={inputClass}
              />
              <input
                name="time"
                value={form.time}
                onChange={handleChange}
                placeholder="Time (e.g. 10:00 AM)"
                className={inputClass}
              />
            </div>

            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Location"
              className={inputClass}
            />

            <div className={`grid grid-cols-1 ${editingId ? "sm:grid-cols-3" : "sm:grid-cols-2"} gap-4`}>
              <input
                name="capacity"
                type="number"
                min="1"
                value={form.capacity}
                onChange={handleChange}
                placeholder="Capacity"
                className={inputClass}
              />
              {editingId && (
                <input
                  name="seatsRemaining"
                  type="number"
                  min="0"
                  value={form.seatsRemaining}
                  onChange={handleChange}
                  placeholder="Seats Remaining"
                  className={inputClass}
                />
              )}
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
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <input
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="Category"
                className={inputClass}
              />
              <input
                name="duration"
                value={form.duration}
                onChange={handleChange}
                placeholder="Duration (e.g. 2 Hours)"
                className={inputClass}
              />
              <input
                name="level"
                value={form.level}
                onChange={handleChange}
                placeholder="Level (e.g. All Levels)"
                className={inputClass}
              />
            </div>

            {formError && <p className="text-xs text-berry font-body">{formError}</p>}

            <button
              type="submit"
              disabled={saving}
              className="btn-primary justify-center py-3 text-sm disabled:opacity-60"
            >
              {saving ? "Saving..." : editingId ? "Save Changes" : "Create Workshop"}
            </button>
          </form>
        </motion.div>
      )}

      <div className="bg-white rounded-3xl p-6 shadow-card">
        {loading && <p className="text-center text-neutral-500 font-body py-10">Loading workshops...</p>}
        {!loading && error && <p className="text-center text-berry font-body py-10">{error}</p>}
        {!loading && !error && (
          <WorkshopTable workshops={workshops} onEdit={openEditForm} onDelete={handleDelete} />
        )}
      </div>
    </div>
  );
}
