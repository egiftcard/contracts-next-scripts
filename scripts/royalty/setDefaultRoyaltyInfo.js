import { PRIVATE_KEY, SECRET_KEY } from "../config.js";
import {
  createEgiftcardClient,
  prepareContractCall,
  getContract,
  sendTransaction,
  waitForReceipt,
} from "egiftcard";
import { privateKeyAccount } from "egiftcard/wallets";
import { arbitrumSepolia } from "egiftcard/chains";

const TARGET_TOKEN_CORE_ADDRESS = "0xF3cD296A5a120FC8043E0e24C0e7857C24c29143"; // REPLACE WITH YOUR TOKEN ADDRESS

const client = createEgiftcardClient({
  secretKey: SECRET_KEY,
});

const account = privateKeyAccount({
  client,
  privateKey: PRIVATE_KEY,
});

const contract = getContract({
  client,
  address: TARGET_TOKEN_CORE_ADDRESS,
  chain: arbitrumSepolia,
});

const tx = prepareContractCall({
  contract,
  method:
    "function setDefaultRoyaltyInfo(address _royaltyRecipient, uint256 _royaltyBps)",
  params: [account.address, 1000],
});

const result = await sendTransaction({
  transaction: tx,
  account: account,
});

const receipt = await waitForReceipt(result);

console.log("Set Royalty Info:", receipt.transactionHash);
