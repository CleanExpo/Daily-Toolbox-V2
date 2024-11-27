import express from 'express';
import { validateApiKey } from '../middleware/auth.js';
import { AscoraService } from '../services/ascoraService.js';

const router = express.Router();
const ascoraService = new AscoraService();

// Apply API key validation to all routes
router.use(validateApiKey);

// Get daily schedule
router.get('/schedule/:date', async (req, res) => {
  try {
    const schedule = await ascoraService.getDailySchedule(req.params.date);
    res.json(schedule);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch schedule' });
  }
});

// Get job details
router.get('/jobs/:id', async (req, res) => {
  try {
    const job = await ascoraService.getJobDetails(req.params.id);
    res.json(job);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch job details' });
  }
});

// Get KPIs
router.get('/kpis/:date', async (req, res) => {
  try {
    const kpis = await ascoraService.getKPIs(req.params.date);
    res.json(kpis);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch KPIs' });
  }
});

// Update job notes
router.put('/jobs/:id/notes', async (req, res) => {
  try {
    const notes = await ascoraService.updateJobNotes(req.params.id, req.body);
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update job notes' });
  }
});

// Get team attendance
router.get('/attendance/:date', async (req, res) => {
  try {
    const attendance = await ascoraService.getTeamAttendance(req.params.date);
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch attendance' });
  }
});

export default router;