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
        founder: {
            address: '0x27F79F9fcEB0A1f8207A5F227c7a757AAf25520d',
            amount: utils.parseUnits('20000000', 18)
        },
        projectDev: {
            address: '0x8efe989AD6E464aDE731548293f3a8760a0934e1',
            amount: utils.parseUnits('20000000', 18)
        },
        execTeam: {
            address: '0x70Ae57EEC560c2521c8FE2317cFcbf5cE7DD2E4e',
            amount: utils.parseUnits('20000000', 18)
        },
        seedInvestors: {
            address: '0x785Cf3Dc8115E7a085C3609a2BE204BA4D153c19',
            amount: utils.parseUnits('20000000', 18)
        },
        advisors: {
            address: '0x167DAF6263009923B0847608eA4c1F6A2522bC2B',
            amount: utils.parseUnits('10000000', 18)
        },
        strategicInvestors: {
            address: '0xD3CaD6Ed9949a62D6da480Eddb59b6809d1131F1',
            amount: utils.parseUnits('10000000', 18)
        },
        strategicPartners: {
            address: '0x981169bE0FAE9dfa4ae80A98Ac6027bCb7489358',
            amount: utils.parseUnits('10000000', 18)
        },
        publicSale: {
            address: '0xCfB4A84154fAf65713a52Bb71572C44e2c367238',
            amount: utils.parseUnits('6000000', 18) 
        },
        ecoSystem: {
            address: '0x1Fa3fDaf677E16a1c736C346F2327F25ddd66E33',
            amount: utils.parseUnits('44000000', 18)
        },
        airdrop: {
            address: '0xF925157ebd9188EBd1536a4B9aEe0CA8fde58355',
            amount: utils.parseUnits('20000000', 18)
        },

    }
}

export default vestingTypes