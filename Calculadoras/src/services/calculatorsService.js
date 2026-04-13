import { apiClient } from './apiClient';
import { calculateNetwork } from '../utils/ipMath';
import { convertFromBase } from '../utils/binaryMath';
import { buildSubnetGuide } from '../utils/subnetGuide';

export async function resolveIpCalculation(ip, prefix) {
  try {
    return await apiClient.post('/ip/calculate', { ip, prefix });
  } catch {
    return calculateNetwork(ip, prefix);
  }
}

export async function resolveBinaryConversion(value, sourceBase) {
  try {
    return await apiClient.post('/binary/convert', {
      value,
      sourceBase
    });
  } catch {
    return convertFromBase(value, sourceBase);
  }
}

export async function resolveSubnetGuide(prefix) {
  try {
    return await apiClient.post('/subnet/explain', { prefix });
  } catch {
    return buildSubnetGuide(prefix);
  }
}
