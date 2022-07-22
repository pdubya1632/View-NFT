// const ethers = require('ethers');

// const fetchNfts = async (e) => {
//   const address = e.value;

//   const url =
//     'https://withered-proud-glitter.discover.quiknode.pro/0d1fd7b046110759c9e1635b8626b5882fd6835e/';
//   const provider = new ethers.providers.JsonRpcProvider(url);
//   const heads = await provider.send('qn_fetchNFTs', [address]);
//   console.log(heads);
// };

// module.exports = fetchNfts;

const fetchNFTs = async (e) => {
  const collectionGrid = document.getElementById('collectionGrid');
  const addCollection = document.getElementById('addCollection');

  console.log('fetching nfts');
  const api_key = 'A8A1Oo_UTB9IN5oNHfAc2tAxdR4UVwfM';
  const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${api_key}/getNFTs/`;
  const address = e.value;
  const requestOptions = {
    method: 'GET',
  };

  console.log('fetching nfts by address');
  const fetchURL = `${baseURL}?owner=${address}`;
  const nfts = await fetch(fetchURL, requestOptions).then((data) =>
    data.json()
  );
  const ownedNfts = nfts.ownedNfts;
  const filterNfts = ownedNfts.map((item) => {
    const container = {};

    container.title = item.title;
    container.description = item.description;
    container.image_url = item.media[0].gateway;
    // container.user_id = req.session.userId;

    return container;
  });

  filterNfts.forEach((element) => {
    collectionGrid.innerHTML += `<div class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">`;
    collectionGrid.innerHTML += `<article class="overflow-hidden rounded-lg shadow-lg">`;
    collectionGrid.innerHTML += `<a href="#">`;
    collectionGrid.innerHTML += `<img alt="Placeholder" class="block h-auto w-full" src="${element.image_url}" />`;
    collectionGrid.innerHTML += `</a>`;
    collectionGrid.innerHTML += `<header class="flex items-center justify-between leading-tight p-2 md:p-4">`;
    collectionGrid.innerHTML += `<h2 class="text-lg">`;
    collectionGrid.innerHTML += `<a class="no-underline hover:underline text-white" href="#">${element.title}</a>`;
    collectionGrid.innerHTML += `</h2>`;
    collectionGrid.innerHTML += `<p class="text-white text-sm">${element.description}</p>`;
    collectionGrid.innerHTML += `</header>`;
    collectionGrid.innerHTML += `<footer class="flex items-center justify-between leading-none p-2 md:p-4"></footer>`;
    collectionGrid.innerHTML += `</article>`;
    collectionGrid.innerHTML += `</div>`;
  });

  addCollection.classList.add('hidden');

  // if (filterNfts) {
  //   const response = await fetch('/api/nfts', {
  //     method: 'post',
  //     body: JSON.stringify({
  //       filterNfts,
  //     }),
  //     headers: { 'Content-Type': 'application/json' },
  //   });

  //   if (response.ok) {
  //     console.log(response);
  //   } else {
  //     alert(response.statusText);
  //   }
  // }
};
