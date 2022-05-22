import { ethers } from "hardhat";
import { Vesting,CustomToken } from "../typechain";
import { duration } from "../helper/utils";
import { deployProxy,deployContract } from "../helper/deployer";
import vestingTypes from '../helper/vesting-types'

const TokenAddress: any = {
  bsc: '0x743b813A3A4F495E7c795c319280CA5b1215d5bb',
}

async function main() {
  const dboeTokenAddress = TokenAddress.bsc;
  const config = vestingTypes.bsc

  const rateAccuracy = ethers.utils.parseUnits('1', 10);
  const dailyReleaseInterval = 24 * 60 * 60; // 1 day;
  const dailyLockPeriod = 24 * 60 * 60; // 1 day;
  const monthlyReleaseInterval = 30 * 24 * 60 * 60; // 1 month;
  const monthlyLockPeriod = 30 * 24 * 60 * 60; // 1 month; - 2,592,000
  const yearlyLockPeriod = 12*30 * 24 * 60 * 60; // 365 days
  const monthInDays = 30;
  const yearInDays = 12*30;
  let DBOEToken: CustomToken;
  const totalSupply = ethers.utils.parseUnits("200000000", 18);

  const [deployer] = await ethers.getSigners();

  console.log("Deploying DBOE Vesting contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Token = await ethers.getContractFactory("Token");
  const token = await Token.deploy(
    "DBOE Token",
    "DBOE",
    totalSupply
  );

  console.log("Token address:", token.address);
  //TODO
/*  DBOEToken = <CustomToken>await deployContract("CustomToken", "DBOE token", "DBOE", totalSupply);
  console.log("Token Deployed:", DBOEToken.address); */

  const DBOETokenContract = await ethers.getContractFactory("DBOETokenVesting");
  const tokenVesting = await DBOETokenContract.deploy(token.address);
  console.log("DBOE Token Vesting address:", tokenVesting.address);
  
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


 