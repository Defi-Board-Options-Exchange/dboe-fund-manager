import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'
import { ethers } from "hardhat"
import { Vesting } from "../typechain"
import vestingTypes from '../helper/vesting-types'
import teamData from '../data/team_vesting.json'
const fs = require('fs')


const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments } = hre
  const vestingDeployment = await deployments.get('Vesting')
  const config = vestingTypes.bsc

  const teamContract = <Vesting>await ethers.getContractAt(
    vestingDeployment.abi,
    config.team.address
  )

  async function importParticipants(name: string, data: any, contract: Vesting) {
    const failedTransactions = []
    for(let i = 0; i < data.length; i++) {
      try {
        let tx = await contract.updateRecipient(
          data[i].walletAddress.split('@')[0], 
          ethers.utils.parseUnits(String(data[i].amountDBOE), 18)
        )
  
        console.log(tx)
      } catch (e) {
        failedTransactions.push(data[i])
        console.log('#############', e)
      }
    }
  
    fs.writeFileSync(
      'data/failed-vesting-' + name + '.json',  
      JSON.stringify(failedTransactions)
    );
  }

  await importParticipants('team', teamData, teamContract)
}

export default func
func.tags = ['ImportParticipants']