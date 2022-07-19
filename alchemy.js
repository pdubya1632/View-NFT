import {
    getNftsForOwner,
    getNftsForOwnerIterator,
    NftExcludeFilters,
    initializeAlchemy,
  } from "@alch/alchemy-sdk";
  
  const alchemy = initializeAlchemy();
  
  // Get how many NFTs an address owns.
  getNftsForOwner(alchemy, "0xshah.eth").then((nfts) => {
    console.log(nfts.totalCount);
  });
  
  // Get all the image urls for all the NFTs an address owns.
  async function main() {
    for await (const nft of getNftsForOwnerIterator(alchemy, "0xshah.eth")) {
      console.log(nft.rawMetadata,nft.media);
    }
  }
  
  main();
  
  // Filter out spam NFTs.
  getNftsForOwner(alchemy, "0xshah.eth", {
    excludeFilters: [NftExcludeFilters.SPAM],
  }).then(console.log);