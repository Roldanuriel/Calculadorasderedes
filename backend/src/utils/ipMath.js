const IPV4_REGEX = /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/;

const ipToInt = (ip) => ip.split('.').map(Number).reduce((acc, octet) => (acc << 8) + octet, 0) >>> 0;

const intToIp = (value) => [24, 16, 8, 0].map((offset) => (value >>> offset) & 255).join('.');

export function calculateNetwork(ip, prefix) {
  if (!IPV4_REGEX.test(String(ip).trim())) {
    return { valid: false, error: 'La direccion IPv4 no es valida.' };
  }

  const parsedPrefix = Number(prefix);
  if (!Number.isInteger(parsedPrefix) || parsedPrefix < 0 || parsedPrefix > 32) {
    return { valid: false, error: 'El prefijo CIDR debe estar entre 0 y 32.' };
  }

  const ipInt = ipToInt(ip);
  const mask = parsedPrefix === 0 ? 0 : ((0xffffffff << (32 - parsedPrefix)) >>> 0);
  const wildcard = (~mask) >>> 0;
  const networkInt = ipInt & mask;
  const broadcastInt = networkInt | wildcard;
  const totalHosts = parsedPrefix === 32 ? 1 : 2 ** (32 - parsedPrefix);
  const usableHosts = parsedPrefix >= 31 ? 0 : totalHosts - 2;

  return {
    valid: true,
    ip,
    prefix: parsedPrefix,
    network: intToIp(networkInt),
    broadcast: intToIp(broadcastInt),
    netmask: intToIp(mask),
    wildcard: intToIp(wildcard),
    firstHost: intToIp(parsedPrefix >= 31 ? networkInt : networkInt + 1),
    lastHost: intToIp(parsedPrefix >= 31 ? broadcastInt : broadcastInt - 1),
    totalHosts,
    usableHosts
  };
}
