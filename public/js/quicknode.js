const ethers = require("ethers");
(async () => {
  const url = "https://withered-proud-glitter.discover.quiknode.pro/0d1fd7b046110759c9e1635b8626b5882fd6835e/"
  const provider = new ethers.providers.JsonRpcProvider(url);
  const heads = await provider.send("qn_fetchNFTs", [
     "0x8aE6422631292c31aeeB2efe154d6326f703F4",
    [
      "0x2106c00ac7da0a3430ae667879139e832307aeaa",
    ],
  ]);
  console.log(heads);
})();
