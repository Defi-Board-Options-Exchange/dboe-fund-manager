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

  const founderTokenVestingParams = {
    vestingName: 'Founder Token',
    amountToBeVested: config.founder.amount,
    initialUnlock: 0,
    releaseRate: rateAccuracy.div(1080),
    releaseInterval: monthlyReleaseInterval,
    lockPeriod: yearlyLockPeriod*2, // 2 years
    vestingPeriod: duration.days(5*yearInDays) // 5 years - 60 months
  }

  const projectDevTokenVestingParams = {
    vestingName: 'Project Dev Token',
    amountToBeVested: config.projectDev.amount,
    initialUnlock: 0,
    releaseRate: rateAccuracy.div(1080),
    releaseInterval: monthlyReleaseInterval,
    lockPeriod: yearlyLockPeriod,
    vestingPeriod: duration.days(1.5*yearInDays) // 1.5 years 
  }
  const execTeamTokenVestingParams = {
    vestingName: 'Executive Team Token',
    amountToBeVested: config.execTeam.amount,
    initialUnlock: 0,
    releaseRate: rateAccuracy.div(1080),
    releaseInterval: monthlyReleaseInterval,
    lockPeriod: yearlyLockPeriod,
    vestingPeriod: duration.days(3*yearInDays) // 3 years
  }
  const seedInvestorsTokenVestingParams = {
    vestingName: 'Seed Investors Token',
    amountToBeVested: config.seedInvestors.amount,
    initialUnlock: 0,
    releaseRate: rateAccuracy.div(1080),
    releaseInterval: monthlyReleaseInterval,
    lockPeriod: yearlyLockPeriod,
    vestingPeriod: duration.days(3*yearInDays) // 3 years
  }
  const advisorsTokenVestingParams = {
    vestingName: 'Advisors Token',
    amountToBeVested: config.advisors.amount,
    initialUnlock: 0,
    releaseRate: rateAccuracy.div(1080),
    releaseInterval: monthlyReleaseInterval,
    lockPeriod: yearlyLockPeriod,
    vestingPeriod: duration.days(2*yearInDays) // 2 years
  }
  const strategicInvestorsTokenVestingParams = {
    vestingName: 'Strategic Investors Token',
    amountToBeVested: config.strategicInvestors.amount,
    initialUnlock: 0,
    releaseRate: rateAccuracy.div(1080),
    releaseInterval: monthlyReleaseInterval,
    lockPeriod: yearlyLockPeriod,
    vestingPeriod: duration.days(3*yearInDays) // 36 months
  }
  const strategicPartnersTokenVestingParams = {
    vestingName: 'Strategic Partners Token',
    amountToBeVested: config.strategicPartners.amount,
    initialUnlock: 0,
    releaseRate: rateAccuracy.div(1080),
    releaseInterval: monthlyReleaseInterval,
    lockPeriod: yearlyLockPeriod,
    vestingPeriod: duration.days(3*yearInDays) // 36 months
  }
  const publicSaleTokenVestingParams = {
    vestingName: 'Public Sale Token',
    amountToBeVested: config.publicSale.amount,
    initialUnlock: 0,
    releaseRate: rateAccuracy.div(1080),
    releaseInterval: monthlyReleaseInterval,
    lockPeriod: monthlyLockPeriod,
    vestingPeriod: duration.days(6*monthInDays) // 36 months
  }
  
  //TODO
  DBOEToken = <CustomToken>await deployContract("CustomToken", "DBOE token", "DBOE", totalSupply);
  console.log("Token Deployed:", DBOEToken.address);

  const founderTokenVesting = <Vesting>await deployProxy("Vesting", dboeTokenAddress, founderTokenVestingParams);
  console.log("DBOE Team :", founderTokenVesting.address);
  const projectDevTokenVesting = <Vesting>await deployProxy("Vesting", dboeTokenAddress, projectDevTokenVestingParams);
  console.log("DBOE Project Dev:", projectDevTokenVesting.address);  
  const execTeamTokenVesting = <Vesting>await deployProxy("Vesting", dboeTokenAddress, execTeamTokenVestingParams);
  console.log("DBOE Exec Team :", execTeamTokenVesting.address);  
  

  /*const seedInvestorsTokenVesting = <Vesting>await deployProxy("Vesting", dboeTokenAddress, seedInvestorsTokenVestingParams);
  console.log("DBOE Seed Investors:", seedInvestorsTokenVesting.address);  
  const strategicInvestorsTokenVesting = <Vesting>await deployProxy("Vesting", dboeTokenAddress, strategicInvestorsTokenVestingParams);
  console.log("DBOE Advisor :", strategicInvestorsTokenVesting.address);  
  const strategicPartnersTokenVesting = <Vesting>await deployProxy("Vesting", dboeTokenAddress, strategicPartnersTokenVestingParams);
  console.log("DBOE Strategic Partners:", strategicPartnersTokenVesting.address);  
  const publicSaleTokenVesting = <Vesting>await deployProxy("Vesting", dboeTokenAddress, publicSaleTokenVestingParams);
  console.log("DBOE Public Token Sale:", publicSaleTokenVesting.address);  */

}



main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
