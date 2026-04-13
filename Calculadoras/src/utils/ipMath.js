const IPV4_REGEX = /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/;

export function ipToInt(ip) {
  return ip
    .split('.')
    .map(Number)
    .reduce((acc, octet) => (acc << 8) + octet, 0) >>> 0;
}

export function intToIp(value) {
  return [24, 16, 8, 0].map((offset) => (value >>> offset) & 255).join('.');
}

export function parseIpv4Cidr(ip, prefix) {
  if (!IPV4_REGEX.test(ip.trim())) {
    return { valid: false, error: 'La direccion IPv4 no es valida.' };
  }

  const parsedPrefix = Number(prefix);
  if (!Number.isInteger(parsedPrefix) || parsedPrefix < 0 || parsedPrefix > 32) {
    return { valid: false, error: 'El prefijo CIDR debe estar entre 0 y 32.' };
  }

  return { valid: true, ip: ip.trim(), prefix: parsedPrefix };
}

function ipClass(firstOctet) {
  if (firstOctet <= 127) return 'A';
  if (firstOctet <= 191) return 'B';
  if (firstOctet <= 223) return 'C';
  if (firstOctet <= 239) return 'D (Multicast)';
  return 'E (Reservada)';
}

export function calculateNetwork(ip, prefix) {
  const parsed = parseIpv4Cidr(ip, prefix);
  if (!parsed.valid) {
    return parsed;
  }

  const ipInt = ipToInt(parsed.ip);
  const mask = parsed.prefix === 0 ? 0 : ((0xffffffff << (32 - parsed.prefix)) >>> 0);
  const wildcard = (~mask) >>> 0;
  const networkInt = ipInt & mask;
  const broadcastInt = networkInt | wildcard;

  const totalHosts = parsed.prefix === 32 ? 1 : 2 ** (32 - parsed.prefix);
  const usableHosts = parsed.prefix >= 31 ? 0 : totalHosts - 2;
  const firstHost = parsed.prefix >= 31 ? networkInt : networkInt + 1;
  const lastHost = parsed.prefix >= 31 ? broadcastInt : broadcastInt - 1;

  return {
    valid: true,
    ip: parsed.ip,
    prefix: parsed.prefix,
    network: intToIp(networkInt),
    broadcast: intToIp(broadcastInt),
    netmask: intToIp(mask),
    wildcard: intToIp(wildcard),
    firstHost: intToIp(firstHost),
    lastHost: intToIp(lastHost),
    totalHosts,
    usableHosts,
    className: ipClass(Number(parsed.ip.split('.')[0]))
  };
}
