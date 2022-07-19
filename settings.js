import { Network, initializeAlchemy } from '@alch/alchemy-sdk';

// Optional Config object, but defaults to demo api-key and eth-mainnet.
const settings = {
  apiKey: 'pBzIF8CrJjWaD58fUN6CzJDBBOjwqXq_', // Replace with your Alchemy API Key.
  network: Network.ETH_MAINNET, // Replace with your network.
  maxRetries: 10
};

const alchemy = initializeAlchemy(settings);