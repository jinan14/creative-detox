import AdminLog from '../models/AdminLog.js';

export const logAdminAction = async ({ adminId, action, entityType, entityId, description }) => {
  try {
    await AdminLog.create({ admin: adminId, action, entityType, entityId, description });
  } catch (err) {
    console.error('Failed to write admin log:', err.message);
  }
};
