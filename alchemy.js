import {
  getNftsForOwner,
  getNftsForOwnerIterator,
  NftExcludeFilters,
  initializeAlchemy,
} from '@alch/alchemy-sdk';

const alchemy = initializeAlchemy();

// Get how many NFTs an address owns.
getNftsForOwner(
  alchemy,
  '0x9Ad80ABc02bA459d7A7E252b3d173F471Daa1012'
).then((nfts) => {
  console.log(nfts.totalCount);
});

// Get all the image urls for all the NFTs an address owns.
async function main() {
  for await (const nft of getNftsForOwnerIterator(
    alchemy,
    '0x9Ad80ABc02bA459d7A7E252b3d173F471Daa1012'
  )) {
    console.log(nft.rawMetadata, nft.media);
  }
}

main();

// Filter out spam NFTs.
getNftsForOwner(
  alchemy,
  '0x9Ad80ABc02bA459d7A7E252b3d173F471Daa1012',
  {
    excludeFilters: [NftExcludeFilters.SPAM],
  }
).then(console.log);
