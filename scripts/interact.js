// interact.js

const API_KEY = process.env.API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS

const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json")

// Provider
const alchemyProvider = new ethers.providers.AlchemyProvider(
    (network = "ropsten"),
    API_KEY
)

// Signer
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider)

// Contract
const helloWorldContract = new ethers.Contract(
    CONTRACT_ADDRESS,
    contract.abi,
    signer
)

async function main() {
    // Read the last message, which is at this point the first one, that we wrote when we deployed our smart contract
    const message = await helloWorldContract.message()
    console.log("The message is: " + message)

    // Update the message
    console.log("Updating the message...")
    const tx = await helloWorldContract.update("This is the new message.")
    await tx.wait()

    // Read the last message
    const newMessage = await helloWorldContract.message()
    console.log("The new message is: " + newMessage)
}

main()