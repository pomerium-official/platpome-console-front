import React from 'react';

const NftBiz = () => {
  return <></>;
};
//
// const tokenId =
//   '110357510015558044527847930644377079477575369549309045141195236846544038658068';
//
// const NftBiz = () => {
//   const { contract } = useContract(
//     '0xB877259aBFC3617370203209cDBbBd469db43243'
//   );
//   console.warn('render >> ', contract);
//   // 0x119aaf82f1f3784233Dd3f8e914f8C16527c3A4B;  // Pome -> BNB
//   // 0x2953399124F0cBB46d2CbACD8A89cF0599974963;  // Polygon -> Opensea
//   const address = useAddress();
//   // alert(address);
//   // const { data, isLoading, error } = useNFT(contract, tokenId);
//   // const { data, isLoading, error } = useOwnedNFTs(contract, address);
//
//   // MINT
//   // const {
//   //   mutateAsync: mintNft,
//   //   isLoading: isLoading,
//   //   error: error,
//   // } = useMintNFT(contract);
//
//   const metadataWithSupply = [
//     {
//       supply: 50, // The number of this NFT you want to mint
//       metadata: {
//         name: 'Cool NFT #1',
//         description: 'This is a cool NFT',
//         image:
//           'ipfs://Qmeav572bpU59AD31yQ9HxSi9yFNSEsYEq95gmKh1Sjkjr/5847558.png', // URL, IPFS URI, or File object
//         // ... Any other metadata you want to include
//       },
//     },
//     {
//       supply: 100, // The number of this NFT you want to mint
//       metadata: {
//         name: 'Cool NFT #2',
//         description: 'This is a cool NFT',
//         image:
//           'ipfs://QmS8YiqFs4iGkuCgWDbnzLziJQkqHEz9pzhyeV5gARQp1M/760db2d36c0ec6217a3a2ce0635474b8.png', // URL, IPFS URI, or File object
//         // ... Any other metadata you want to include
//       },
//     },
//   ];
//
//   const metadatas = [
//     {
//       name: 'Cool NFT1',
//       description: 'This is a cool NFT1',
//       image:
//         'ipfs://Qmeav572bpU59AD31yQ9HxSi9yFNSEsYEq95gmKh1Sjkjr/5847558.png', // This can be an image url or file
//     },
//     {
//       name: 'Cool NFT1',
//       description: 'This is a cool NFT2',
//       image:
//         'ipfs://Qmeav572bpU59AD31yQ9HxSi9yFNSEsYEq95gmKh1Sjkjr/5847558.png',
//     },
//   ];
//
//   const mint = async () => {
//     // const result = await contract.createBatch(metadatas); // uploads and creates the NFTs on chain
//     const result = await contract.erc1155.mintBatch(metadataWithSupply);
//     console.warn('txResult : >> ', result);
//   };
//
//   // console.warn('data : ', data);
//   // console.warn('isLoading : ', isLoading);
//   // console.warn('error : ', error);
//   return (
//     <div className="grid">
//       <div className="col-12">
//         <div className={'card'}>
//           <ConnectWallet />
//         </div>
//         <div className="card">
//           <button onClick={mint}>mint</button>
//         </div>
//         {/*<div className="card">*/}
//         {/*  /!*<Toast ref={toast} />*!/*/}
//         {/*  <h5>NFT</h5>*/}
//         {/*  {isLoading && <div>Fetching NFT…</div>}*/}
//         {/*  {error && <div>Error fetching NFT</div>}*/}
//         {/*  {!data && <div>NFT not found</div>}*/}
//         {/*  {data && <div>NFT: {data.metadata.name}</div>}*/}
//         {/*</div>*/}
//         {/*<div className={'card'}>*/}
//         {/*  <Web3Button*/}
//         {/*    contractAddress={contract}*/}
//         {/*    action={() =>*/}
//         {/*      mintNft({*/}
//         {/*        // Any valid IPFS or HTTP URL that points to a JSON object*/}
//         {/*        metadata: {*/}
//         {/*          name: 'My NFT',*/}
//         {/*          description: 'This is my NFT',*/}
//         {/*          image:*/}
//         {/*            'ipfs://QmS8YiqFs4iGkuCgWDbnzLziJQkqHEz9pzhyeV5gARQp1M/760db2d36c0ec6217a3a2ce0635474b8.png', // Accepts any URL or File type*/}
//         {/*        },*/}
//         {/*        to: address,*/}
//         {/*      })*/}
//         {/*    }*/}
//         {/*  >*/}
//         {/*    Mint NFT*/}
//         {/*  </Web3Button>*/}
//         {/*</div>*/}
//       </div>
//     </div>
//   );
// };

export default NftBiz;
