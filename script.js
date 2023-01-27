import { ABI } from "./ABI.js";

const Web3Modal = window.Web3Modal.default;
const WalletConnectProvider = window.WalletConnectProvider.default;

// Web3modal instance
let web3Modal;

// Chosen wallet provider given by the dialog window
let provider;

// Address of the selected account
let selectedAccount;

let contractAddressFromParams;

let chainNumber;

const logElement = document.querySelector("#logs");
logElement.innerHTML += "Starting logs<br/>";

function overrideConsoleLog() {
  var oldLog = console.log;
  console.log = function (message) {
      oldLog(message);
      printToHtml(message);
  }
  var oldError = console.error;
  console.error = function (message) {
      oldError(message);
      printToHtml(message);
  }
}

function printToHtml(message) {
  if (typeof message == 'object') {
    logElement.innerHTML += (JSON && JSON.stringify ? JSON.stringify(message) : message) + '<br />';
    if(message.message != null) {
      logElement.innerHTML += message.message + '<br />';
    }
  } else {
    logElement.innerHTML += message + '<br />';
  }
}

// overrideConsoleLog();

window.addEventListener("load", async () => {
  
  if (window.ethereum) {
    await window.ethereum.send("eth_requestAccounts");

    readProviderData();
  } else {
    alert("no metamask extension detected");
  }
});

function readProviderData() {
  const urlParams = new URLSearchParams(window.location.search);
  const action = urlParams.get("action");
  const message = urlParams.get("message");
  const chainId = urlParams.get("chainId");
  const provider = urlParams.get("provider") || undefined;
  const contractAddress = urlParams.get("contractAddress") || undefined;
  const method = urlParams.get("method") || undefined;
  const args = urlParams.get("args") || undefined;
  const signature = urlParams.get("signature") || undefined;
  const abi = urlParams.get("abi") || undefined;

  //?action=sign&provider=metamask&message=helloworld
  //?action=sign&provider=walletconnect&message=helloworld
  //?action=sign&provider=binance&message=helloworld
  //http://127.0.0.1:5500/index.html?action=sign&provider=metamask&message=helloworld

  if (action === "sign") {
    if (provider == "metamask") {
      if (action === "sign" && message) {
        return signMessageMM(message, selectedAccount);
      }
    } else if (provider == "binance") {
      if (action === "sign" && message) {
        return signMessageBin(message, selectedAccount);
      }
    } else if (provider == "walletconnect") {
      if (action === "sign" && message) {
        return signMessageWC(message, selectedAccount);
      }
    } else {
      if (!provider) {
        if (action === "sign" && message) {
          return signMessage(message);
        }
      }
    }
  } else {
    if (action === "contract") {
      if (
        action === "contract" &&
        chainId &&
        contractAddress &&
        args &&
        method === "evolutionMint"
      ) {
        return checkNetwork(chainId, contractAddress, method, args, provider, signature);
      }
    }
  }
  displayResponse("Invalid URL");
}

//?action=contract&contractAddress=0xE63CEC937b8Ab2A27935DD929C2A3C864491404e&chainId=11155111&method=evolutionMint
//?action=contract&contractAddress=0xE63CEC937b8Ab2A27935DD929C2A3C864491404e&chainId=11155111&method=evolutionMint&args=[256,257]&provider=metamask

async function checkNetwork(chainId, contractAddress, method, args, provider, signature) {
  window.web3 = new Web3(ethereum);

  const chainIdClient = await web3.eth.getChainId();
  //сверять пришедший номер сети с этим
  console.log(chainIdClient);
  if (chainId) {
    if (chainIdClient == chainId) {
      if (provider == "metamask") {
        return signEvolutionMintMM(contractAddress, method, args, provider, signature);
      } else if (provider == "binance") {
        return signEvolutionMintBin(contractAddress, method, args, provider, signature);
      } else if (provider == "walletconnect") {
        return signEvolutionMintWC(contractAddress, method, args, provider, signature);
      } else {
        if (!provider) {
          return signEvolutionMint(
            contractAddress,
            method,
            args,
            provider,
            selectedAccount
          );
        }
      }
    } else {
      alert(`choose ${chainId} network`);
    }
  } else {
    console.log("no chain number");
  }
}

function init() {
  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        infuraId: "9aa3d95b3bc440fa88ea12eaa4456161",
      },
      // rpc: {
      //   11155111: "https://rpc.sepolia.org",
      // },
    },
    "custom-binancechainwallet": {
      display: {
        //logo: "../../assets/img/binance-logo.svg",
        name: "Binance Chain Wallet",
        description: "Connect to your Binance Chain Wallet",
      },
      package: true,
      connector: async () => {
        let provider = null;
        if (typeof window.BinanceChain !== "undefined") {
          provider = window.BinanceChain;
          try {
            await provider.request({ method: "eth_requestAccounts" });
          } catch (error) {
            throw new Error("User Rejected");
          }
        } else {
          throw new Error("No Binance Chain Wallet found");
        }
        return provider;
      },
    },
  };

  web3Modal = new Web3Modal({
    cacheProvider: false, // optional
    providerOptions, // required
    disableInjectedProvider: false, // optional. For MetaMask / Brave / Opera.
  });
}

async function fetchAccountData() {
  const web3 = new Web3(provider);

  // console.log("Web3 instance is", web3);

  // Get connected chain id from Ethereum node
  const chainId = await web3.eth.getChainId();
  //сверять пришедший номер сети с этим
  console.log(chainId);

  const accounts = await web3.eth.getAccounts();

  //console.log("Got accounts", accounts);
  selectedAccount = accounts[0];

  console.log(selectedAccount);

  //processAction();
  // signMessage(selectedAccount);
}

async function refreshAccountData() {
  //document.getElementById("connectBtn").setAttribute("disabled", "disabled");
  await fetchAccountData(provider);
  //document.getElementById("connectBtn").removeAttribute("disabled");
}

/**
 * Connect wallet button pressed.
 */
async function onConnect() {
  try {
    await web3Modal.clearCachedProvider();
    provider = await web3Modal.connect();
    web3 = new Web3(provider);
    window.web3 = web3;
  } catch (e) {
    console.log("Could not get a wallet connection", e);
    return;
  }

  // Subscribe to accounts change
  provider.on("accountsChanged", (accounts) => {
    setTimeout(() => {
      window.location.reload();
    }, 2000);
    //fetchAccountData();
  });

  // Subscribe to chainId change
  provider.on("chainChanged", (chainId) => {
    setTimeout(() => {
      window.location.reload();
    }, 2000);
    // fetchAccountData();
  });

  // Subscribe to networkId change
  provider.on("networkChanged", (networkId) => {
    setTimeout(() => {
      window.location.reload();
    }, 2000);
    // fetchAccountData();
  });

  await refreshAccountData();
}

// async function signMessage(message, selectedAccount) {
//   if (!selectedAccount) return;
//   try {
//     const sign = await web3.eth.personal.sign(message, selectedAccount);
//     console.log(sign);
//   } catch (error) {
//     console.log(error.message);
//   }
// }

//signature from web3modal
async function signMessage(message) {
  init();
  await onConnect();

  //if (!selectedAccount) return;

  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const signature = await web3.eth.personal.sign(message, selectedAccount);
    console.log(signature);

    displayResponse(
      "Signature complete.<br><br>Copy to clipboard then continue to App",
      signature, true
    );
  } catch (error) {
    copyToClipboard("error");
    displayResponse("Signature Denied");
  }
}

//signature from MetaMask
async function signMessageMM(message) {
  window.web3 = new Web3(window.ethereum);

  const accounts = await ethereum.request({ method: "eth_accounts" });

  selectedAccount = accounts[0];

  console.log(selectedAccount);
  if (!selectedAccount) return;

  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const signature = await web3.eth.personal.sign(message, selectedAccount);
    console.log(signature);
    displayResponse(
      "Signature complete.<br><br>Copy to clipboard then continue to App",
      signature, true
    );
  } catch (error) {
    copyToClipboard("error");
    displayResponse("Signature Denied");
  }
}

//sign from wallet connect
async function signMessageWC(message) {
  const web3Provider = new WalletConnectProvider({
    infuraId: "9aa3d95b3bc440fa88ea12eaa4456161",
  });

  await web3Provider.enable();

  const web3 = new Web3(web3Provider);

  const accounts = await web3.eth.getAccounts();
  selectedAccount = accounts[0];

  console.log(selectedAccount);
  if (!selectedAccount) return;

  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const signature = await web3.eth.personal.sign(message, selectedAccount);
    console.log(signature);
    displayResponse(
      "Signature complete.<br><br>Copy to clipboard then continue to App",
      signature, true
    );
  } catch (error) {
    console.log(error);
    copyToClipboard("error");
    displayResponse("Signature Denied");
  }
}

//sign from binance
async function signMessageBin(message) {
  if (typeof BinanceChain !== "undefined") {
    BinanceChain.enable().catch(console.error);
  } else {
    console.log("binance not installed");
  }
  let accounts = await BinanceChain.request({
    method: "eth_requestAccounts",
  }).then((addresses) => {
    selectedAccount = addresses[0];

    console.log(selectedAccount);
  });

  if (!selectedAccount) return;

  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const signature = await BinanceChain.bnbSign(selectedAccount, message).then(
      (signature) => {
        //console.log(JSON.stringify(sig));
        console.log(signature);
        console.log(signature.signature);
        displayResponse(
          "Signature complete.<br><br>Copy to clipboard then continue to App",
          signature.signature, true
        );
      }
    );
  } catch (error) {
    //alert(error.message);
    copyToClipboard("error");
    displayResponse("Signature Denied");
  }
}

//sign evolution method web3modal
async function signEvolutionMint(contractAddress, method, args, provider, signature) {
  init();
  await onConnect();

  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    let tokensIDs = [signature].concat(JSON.parse(args));

    console.log(tokensIDs);
    //if (!selectedAccount) return;

    const CONTRACT = new window.web3.eth.Contract(ABI, contractAddress);

    let result = await CONTRACT.methods.evolutionMint(...tokensIDs).send({
      from: selectedAccount,
    });
    console.log(result);
    displayResponse(
      "Transaction sent.<br><br>Copy to clipboard then continue to App",
      result.transactionHash, true
    );
  } catch (error) {
    console.error(error);
    copyToClipboard("error");
    displayResponse("Transaction Denied");
  }
}

//sign evolution method metamask
async function signEvolutionMintMM(contractAddress, method, args, provider, signature) {
  try {
    window.web3 = new Web3(ethereum);

    const accounts = await ethereum.request({ method: "eth_accounts" });

    selectedAccount = accounts[0];

    console.log(selectedAccount);

    let tokensIDs = [signature].concat(JSON.parse(args));

    console.log(tokensIDs);
    if (!selectedAccount) return;

    const CONTRACT = new window.web3.eth.Contract(ABI, contractAddress);

    let result = await CONTRACT.methods.evolutionMint(...tokensIDs).send({
      from: selectedAccount,
      //value: priceInWei,
    });
    console.log(result);
    displayResponse(
      "Transaction sent.<br><br>Copy to clipboard then continue to App",
      result.transactionHash, true
    );
  } catch (error) {
    console.error(error);
    copyToClipboard("error");
    displayResponse("Transaction Denied");
  }
}

async function signEvolutionMintBin(contractAddress, method, args, provider, signature) {
  if (typeof BinanceChain !== "undefined") {
    BinanceChain.enable().catch(console.error);
  } else {
    console.log("binance not installed");
  }
  let accounts = await BinanceChain.request({
    method: "eth_requestAccounts",
  }).then((addresses) => {
    selectedAccount = addresses[0];

    console.log(selectedAccount);
  });

  if (!selectedAccount) return;

  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    window.web3 = new Web3(BinanceChain);

    console.log(selectedAccount);

    let tokensIDs = [signature].concat(JSON.parse(args));

    console.log(tokensIDs[0]);

    const CONTRACT = new window.web3.eth.Contract(ABI, contractAddress);

    let result = await CONTRACT.methods.evolutionMint(...tokensIDs).send({
      from: selectedAccount,
    });
    console.log(result);

    displayResponse(
      "Transaction sent.<br><br>Copy to clipboard then continue to App",
      result.transactionHash, true
    );
  } catch (error) {
    console.error(error);
    copyToClipboard("error");
    displayResponse("Transaction Denied");
  }
}

async function signEvolutionMintWC(contractAddress, method, args, provider) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const web3Provider = new WalletConnectProvider({
      infuraId: "9aa3d95b3bc440fa88ea12eaa4456161",
      // rpc: {
      //   11155111: "https://rpc.sepolia.org",
      // },
    });

    await web3Provider.enable();

    const web3 = new Web3(web3Provider);

    const accounts = await web3.eth.getAccounts();
    selectedAccount = accounts[0];

    console.log(selectedAccount);
    if (!selectedAccount) return;

    let tokensIDs = [signature].concat(JSON.parse(args));

    console.log(tokensIDs[0]);

    const CONTRACT = new web3.eth.Contract(ABI, contractAddress);

    let result = await CONTRACT.methods.evolutionMint(...tokensIDs).send({
      from: selectedAccount,
    });
    console.log(result);

    displayResponse(
      "Transaction sent.<br><br>Copy to clipboard then continue to App",
      result.transactionHash, true
    );
  } catch (error) {
    console.error(error);
    copyToClipboard("error");
    displayResponse("Transaction Denied");
  }
}

// display error or response
function displayResponse(text, response, redirectToApp = false) {
  const responseText = document.getElementById("response-text");
  responseText.innerHTML = text;
  responseText.className = "active";

  if (response) {
    // display button to copy tx.hash or signature
    const responseButton = document.getElementById("response-button");
    responseButton.className = "active";
    responseButton.onclick = () => copyToClipboard(response);
  }
  
  if (redirectToApp) {
    document.location.assign("hoatest://hoatest?" + response);
  }
}

// copy signature to clipboard
async function copyToClipboard(response) {
  try {
    // focus from metamask back to browser
    window.focus();
    // wait to finish focus
    await new Promise((resolve) => setTimeout(resolve, 500));
    // copy tx hash to clipboard
    await navigator.clipboard.writeText(response);
    document.getElementById("response-button").innerHTML = "Copied";
  } catch {
    // for metamask mobile android
    const input = document.createElement("input");
    input.type = "text";
    input.value = response;
    document.body.appendChild(input);
    input.select();
    document.execCommand("Copy");
    input.style = "visibility: hidden";
    document.getElementById("response-button").innerHTML = "Copied";
  }
}
