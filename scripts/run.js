
const hre = require("hardhat");

async function main() {
  

  const NinjaPunks = await hre.ethers.getContractFactory("NinjaPunksNFT");
  const ninjapunks = await NinjaPunks.deploy();

  await ninjapunks.deployed();
    let cost=0.02 ;
  const tx=await ninjapunks.mint("https://jsonkeeper.com/b/HDHQ",
  {value:ethers.utils.parseEther(cost.toString())})


  console.log("NFT minted to ",ninjapunks.address);
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});