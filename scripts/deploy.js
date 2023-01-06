
const hre = require("hardhat");

async function main() {
  

  const NinjaPunks = await hre.ethers.getContractFactory("NinjaPunksNFT");
  const ninjapunks = await NinjaPunks.deploy();

  await ninjapunks.deployed();

  console.log("Contract deployed to ",ninjapunks.address);
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
