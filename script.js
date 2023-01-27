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

window.mobileCheck = function() {
let check = false;
(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
return check;
};

window.mobileAndTabletCheck = function() {
let check = false;
(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
return check;
};

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
    if (window.mobileCheck()) {
        let loc = window.location.href;
        loc.replace("https", "dapp");
        window.location.assign(loc);
    } else {
        alert("no metamask extension detected");
    }
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
