import { BigNumber, utils } from 'ethers'

export interface VestingType {
    address: string
    amount: BigNumber
}

export interface VestingTypes {
    [symbol: string]: {
        [network: string]: VestingType
    }
}

const vestingTypes: VestingTypes = {
    bsc: {
        team: {
            address: '0x7c0cEf928602d467e42A79672eEE74fb8816b737',
            amount: utils.parseUnits('8656000', 18)
        }
    }
}

export default vestingTypes