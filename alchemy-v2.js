// const { createAlchemyWeb3 } = require('@alch/alchemy-web3');
import 'dotenv/config';
import express from 'express';

import { createAlchemyWeb3 } from '@alch/alchemy-web3';

// Using HTTP
const web3 = createAlchemyWeb3(process.env.ALCHEMY_APP);

const main = async () => {
  // Wallet address
  const address = '0x9Ad80ABc02bA459d7A7E252b3d173F471Daa1012';

  // Get all NFTs
  const nfts = await web3.alchemy.getNfts({ owner: address });

  // Parse output
  const numNfts = nfts['totalCount'];
  const nftList = nfts['ownedNfts'];

  console.log(`Total NFTs owned by ${address}: ${numNfts} \n`);

  let i = 1;
  let nft;

  for (nft of nftList) {
    console.log(`${i}. ${nft['metadata']['name']}`);
    i++;
  }
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
