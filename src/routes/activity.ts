import express from 'express';
import * as ActivityController from '../controllers/activity';

const router = express.Router();

// Get all activities
router.get('/', ActivityController.getAllActivities);

// Get detail activity
router.get('/:activityId', ActivityController.getDetailActivity);

// Create activity
router.post('/', ActivityController.createActivity);

// Update activity
router.put('/:activityId', ActivityController.updateActivity);

// Delete activity
router.delete('/:activityId', ActivityController.deleteActivity);

export default router;
