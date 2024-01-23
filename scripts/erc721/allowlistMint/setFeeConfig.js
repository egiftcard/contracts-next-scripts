import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { config } from "dotenv";

config();

// Run: `node scripts/erc721/allowlistMint/setFeeConfig.js`

const TARGET_TOKEN_ADDRESS = "0x97694C602c283DE8f40B8f2679ED5E730806297a";
const TARGET_HOOK_ADDRESS = "0x9Ef026c82F6491eBA4EAC14378a3FEd397C9F282";

async function setFeeConfig(sdkInstance) {
  // FEE CONFIG PARAMS
  const primarySaleRecipient = "0x2Ee4c2e9666Ff48DE2779EB6f33cDC342d761372";
  const platformFeeRecipient = "0x2Ee4c2e9666Ff48DE2779EB6f33cDC342d761372";
  const platformFeeBps = 100;

  // SET
  const contract = await sdkInstance.getContract(TARGET_HOOK_ADDRESS);
  const tx = await contract.call("setFeeConfig", [
    TARGET_TOKEN_ADDRESS,
    {
      primarySaleRecipient,
      platformFeeRecipient,
      platformFeeBps,
    },
  ]);

  console.log("\nSet fee config tx:", tx.receipt.transactionHash);
}

async function main() {
  const PRIVATE_KEY = process.env.TEST_WALLET_PRIVATE_KEY;
  const SECRET_KEY = process.env.THIRDWEB_SECRET_KEY;

  if (!PRIVATE_KEY || !SECRET_KEY) {
    throw new Error(
      "Please set the TEST_WALLET_PRIVATE_KEY and THIRDWEB_SECRET_KEY env vars."
    );
  }

  const chain = "goerli";
  const sdk = ThirdwebSDK.fromPrivateKey(PRIVATE_KEY, chain, {
    secretKey: SECRET_KEY,
  });

  await setFeeConfig(sdk);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
