import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'
import { ethers } from 'hardhat'
import { Vesting } from "../typechain"
import vestingTypes, { VestingType } from '../helper/vesting-types'


const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments } = hre
  const tokenDeployment = await deployments.get('DBOEToken')

  const tokenContract = await ethers.getContractAt(
      tokenDeployment.abi,
      tokenDeployment.address
  )

  const config = vestingTypes.bsc // David - BSC

  /**
   * Pre mints token to vesting contract address
   * 
   * @param vesting VestingType
   */
  async function preMintTokensToContract(vesting: VestingType) {
    const tokenBalance = await tokenContract.balanceOf(vesting.address)
    if (tokenBalance.isZero()) {
        await tokenContract.mint(vesting.address, vesting.amount)
        console.log('Tokens minted', vesting, tokenBalance)
    } else {
        console.log('Mint tokens failed', vesting, tokenBalance)
    }
  }

  /**
   * Sets vesting start time by given vesting type
   * @param vesting VestingType
   */
  async function scheduleVestingStartTime(vesting: VestingType) {
    const vestingDeployment = await deployments.get('Vesting')
    const vestingContract = <Vesting>await ethers.getContractAt(
      vestingDeployment.abi,
      vesting.address
    )
    
    // Date and time (GMT): Saturday, January 1, 2022 1:00:00 AM
    const startTime = '1640998800'
    await vestingContract.setStartTime(startTime)
    console.log('Scheduled vesting time', startTime)
  }

  console.log('Initialize Vesting - Founder')
  await preMintTokensToContract(config.founder)
  await scheduleVestingStartTime(config.founders)

  console.log('Initialize Vesting - Project Dev')
  await preMintTokensToContract(config.projectDev)
  await scheduleVestingStartTime(config.projectDev)

  console.log('Initialize Vesting - Exec Team')
  await preMintTokensToContract(config.execTeam)
  await scheduleVestingStartTime(config.execTeam)

  console.log('Initialize Vesting - Seed Investors')
  await preMintTokensToContract(config.seedInvestors)
  await scheduleVestingStartTime(config.seedInvestors)

  console.log('Initialize Vesting - Advisors')
  await preMintTokensToContract(config.advisors)
  await scheduleVestingStartTime(config.advisors)

  console.log('Initialize Vesting - Strategic Investors')
  await preMintTokensToContract(config.strategicInvestors)
  await scheduleVestingStartTime(config.strategicInvestors)

  console.log('Initialize Vesting - Public Sale')
  await preMintTokensToContract(config.publicSale)
  await scheduleVestingStartTime(config.publicSale)

  console.log('Initialize Vesting - Eco System')
  await preMintTokensToContract(config.ecoSystem)
  await scheduleVestingStartTime(config.ecoSystem)

  console.log('Initialize Vesting - Airdrop')
  await preMintTokensToContract(config.airdrop)
  await scheduleVestingStartTime(config.airdrop)

}

export default func
func.tags = ['InitVesting']