import Artwork from '../models/Artwork.js';
import { logAdminAction } from '../utils/adminLog.js';

export const getArtworks = async (req, res) => {
  try {
    const artworks = await Artwork.find().sort({ order: 1, createdAt: -1 });
    res.json(artworks);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch artworks', error: err.message });
  }
};

export const getArtworkById = async (req, res) => {
  try {
    const artwork = await Artwork.findById(req.params.id);
    if (!artwork) return res.status(404).json({ message: 'Artwork not found' });
    res.json(artwork);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch artwork', error: err.message });
  }
};

export const createArtwork = async (req, res) => {
  try {
    const { title, description, image, artist, price, category, available } = req.body;

    if (!title || !description || !image || !artist || price === undefined || !category) {
      return res
        .status(400)
        .json({ message: 'Title, description, image, artist, price, and category are required' });
    }

    const lastArtwork = await Artwork.findOne().sort({ order: -1 });
    const order = lastArtwork ? lastArtwork.order + 1 : 0;

    const artwork = await Artwork.create({ title, description, image, artist, price, category, available, order });

    await logAdminAction({
      adminId: req.user.id,
      action: 'create',
      entityType: 'Artwork',
      entityId: artwork._id,
      description: `Created artwork "${artwork.title}"`,
    });

    res.status(201).json(artwork);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create artwork', error: err.message });
  }
};

export const updateArtwork = async (req, res) => {
  try {
    const artwork = await Artwork.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!artwork) return res.status(404).json({ message: 'Artwork not found' });

    const isStatusChange = Object.keys(req.body).every((key) => key === 'available');
    await logAdminAction({
      adminId: req.user.id,
      action: isStatusChange ? 'status_change' : 'update',
      entityType: 'Artwork',
      entityId: artwork._id,
      description: isStatusChange
        ? `Marked artwork "${artwork.title}" as ${artwork.available ? 'available' : 'sold'}`
        : `Updated artwork "${artwork.title}"`,
    });

    res.json(artwork);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update artwork', error: err.message });
  }
};

export const reorderArtworks = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: 'ids array is required' });
    }

    await Promise.all(ids.map((id, index) => Artwork.findByIdAndUpdate(id, { order: index })));

    await logAdminAction({
      adminId: req.user.id,
      action: 'update',
      entityType: 'Artwork',
      entityId: ids[0],
      description: 'Reordered the artwork gallery',
    });

    const artworks = await Artwork.find().sort({ order: 1, createdAt: -1 });
    res.json(artworks);
  } catch (err) {
    res.status(500).json({ message: 'Failed to reorder artworks', error: err.message });
  }
};

export const deleteArtwork = async (req, res) => {
  try {
    const artwork = await Artwork.findByIdAndDelete(req.params.id);
    if (!artwork) return res.status(404).json({ message: 'Artwork not found' });

    await logAdminAction({
      adminId: req.user.id,
      action: 'delete',
      entityType: 'Artwork',
      entityId: artwork._id,
      description: `Deleted artwork "${artwork.title}"`,
    });

    res.json({ message: 'Artwork deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete artwork', error: err.message });
  }
};
