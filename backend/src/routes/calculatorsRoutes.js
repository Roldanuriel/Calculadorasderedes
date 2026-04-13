import { Router } from 'express';
import { calculateNetwork } from '../utils/ipMath.js';
import { convertBaseValue } from '../utils/binaryMath.js';
import { buildSubnetGuide } from '../utils/subnetGuide.js';

const router = Router();

router.post('/ip/calculate', (req, res) => {
  const { ip, prefix } = req.body;
  const result = calculateNetwork(ip, prefix);
  res.status(result.valid ? 200 : 400).json(result);
});

router.post('/binary/convert', (req, res) => {
  const { value, sourceBase } = req.body;
  const result = convertBaseValue(value, sourceBase);
  res.status(result.valid ? 200 : 400).json(result);
});

router.post('/subnet/explain', (req, res) => {
  const { prefix } = req.body;
  const result = buildSubnetGuide(prefix);
  res.status(result.valid ? 200 : 400).json(result);
});

export default router;
