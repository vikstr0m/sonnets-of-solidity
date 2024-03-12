const { ethers } = require('ethers');

class ContractDeployer {
    constructor(privateKey, rpcUrl) {
        this.provider = new ethers.providers.JsonRpcProvider(rpcUrl);
        this.wallet = new ethers.Wallet(privateKey, this.provider);
    }

    async deploy(contractABI, contractBytecode, ...constructorArgs) {
        const factory = new ethers.ContractFactory(contractABI, contractBytecode, this.wallet);
        const contract = await factory.deploy(...constructorArgs);
        await contract.deployed();
        console.log(`Contract deployed to: ${contract.address}`);
        return contract;
    }
}

module.exports = ContractDeployer;
