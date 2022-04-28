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
  const monthlyLockPeriod = 30 * 24 * 60 * 60; // 1 month;
  let DBOEToken: CustomToken;
  const totalSupply = ethers.utils.parseUnits("100000000", 18);
  const teamTokenVestingParams = {
      vestingName: 'Team Token',
      amountToBeVested: config.team.amount,
      initialUnlock: 0,
      releaseRate: rateAccuracy.div(1080),
      releaseInterval: dailyReleaseInterval,
      lockPeriod: dailyLockPeriod,
      vestingPeriod: duration.days(1080) // 36 months
  }
  //TODO
  DBOEToken = <CustomToken>await deployContract("CustomToken", "DBOE token", "DBOE", totalSupply);
  console.log("Token Deployed:", DBOEToken.address);
  const teamTokenVesting = <Vesting>await deployProxy("Vesting", dboeTokenAddress, teamTokenVestingParams);
  console.log("Team Token:", teamTokenVesting.address);
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
