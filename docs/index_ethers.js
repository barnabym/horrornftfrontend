// tutorial - https://dev.to/rounakbanik

// full example - frontend - https://github.com/rounakbanik/nft-collectible-frontend

// contract -  https://github.com/rounakbanik/nft-collectible-contract

// polyscan key - CNJAIWFYT7A565AYEUKXGAVKRSQFYVMKV4

// chainfaces - https://etherscan.io/address/0x93a796b1e846567fe3577af7b7bb89f71680173a#code

const contract_address = "0x519a524192ff7e845f4a4895993f84d9b25f3be3";
const contract_abi = `[
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "id",
				"type": "bytes32"
			}
		],
		"name": "ChainlinkCancelled",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "id",
				"type": "bytes32"
			}
		],
		"name": "ChainlinkFulfilled",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "id",
				"type": "bytes32"
			}
		],
		"name": "ChainlinkRequested",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_requestId",
				"type": "bytes32"
			},
			{
				"internalType": "uint256",
				"name": "_volume",
				"type": "uint256"
			}
		],
		"name": "fulfill",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "requestVolumeData",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "requestId",
				"type": "bytes32"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "volume",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]`;

const start = async () => {
    try {
		if (window.ethereum) {
			try {
			  //const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
			  // setAccounts(accounts);

              // A Web3Provider wraps a standard Web3 provider, which is
            // what MetaMask injects as window.ethereum into each page
            const provider = new ethers.providers.Web3Provider(window.ethereum);

            // The MetaMask plugin also allows signing transactions to
            // send ether and pay to change state within the blockchain.
            // For this, you need the account signer...
            const signer = provider.getSigner();

            // console.log(window.ethereum.networkVersion, 'window.ethereum.networkVersion');
            // And these are the chain IDs for the most used ethereum networks:
            
            // Mainnet: 1
            // Kovan: 42
            // Ropsten: 3
            // Rinkeby: 4
            // Goerli: 5

            // The Contract object
             const NameContract = new ethers.Contract(contract_address, contract_abi, signer);

			  //const NameContract = web3.eth.Contract(contract_abi, contract_address);
			  
			  await NameContract.requestVolumeData();
              const res = await NameContract.volume();
			  console.log(res);
			  //NameContract.methods.setName("bitsofcode").send();
			  alert("state " + res);

			} catch (error) {
			  if (error.code === 4001) {
				// User rejected request
                alert("user rejected");
			  } else {
                console.error(error);
                alert("error");
              }
		  
			  //setError(error);
			}
		} else {
            alert("metamask is not installed");
            console.error("metamask is not installed");
        }
        
    } catch (error) {
      console.error(error);
    }
};

function preTest() {
    (async () => await start())();
}

preTest();
