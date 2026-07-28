import AdminLog from '../models/AdminLog.js';

export const getAdminLogs = async (req, res) => {
  try {
    const logs = await AdminLog.find()
      .populate('admin', 'name email')
      .sort({ timestamp: -1 })
      .limit(100);
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch admin logs', error: err.message });
  }
};
