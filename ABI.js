export const ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"ApprovalCallerNotOwnerNorApproved","type":"error"},{"inputs":[],"name":"ApprovalQueryForNonexistentToken","type":"error"},{"inputs":[],"name":"ApproveToCaller","type":"error"},{"inputs":[],"name":"BalanceQueryForZeroAddress","type":"error"},{"inputs":[],"name":"HeroesOfAntares__InvalidInput","type":"error"},{"inputs":[],"name":"HeroesOfAntares__InvalidSignature","type":"error"},{"inputs":[],"name":"HeroesOfAntares__NotATokenOwner","type":"error"},{"inputs":[],"name":"Manageable__WalletIsAlreadyAManager","type":"error"},{"inputs":[],"name":"Manageable__WalletIsNotAManager","type":"error"},{"inputs":[],"name":"Manageable__ZeroAddress","type":"error"},{"inputs":[],"name":"MintERC2309QuantityExceedsLimit","type":"error"},{"inputs":[],"name":"MintToZeroAddress","type":"error"},{"inputs":[],"name":"MintZeroQuantity","type":"error"},{"inputs":[],"name":"Neutron__ExceedingMaxSupply","type":"error"},{"inputs":[],"name":"Neutron__ExceedingTokensPerStageLimit","type":"error"},{"inputs":[],"name":"Neutron__HashComparisonFailed","type":"error"},{"inputs":[],"name":"Neutron__InvalidConfiguration","type":"error"},{"inputs":[],"name":"Neutron__InvalidInput","type":"error"},{"inputs":[],"name":"Neutron__Invaliduint16","type":"error"},{"inputs":[],"name":"Neutron__NoSaleStageActive","type":"error"},{"inputs":[],"name":"Neutron__NothingToWithdraw","type":"error"},{"inputs":[],"name":"Neutron__SignatureAlreadyUsed","type":"error"},{"inputs":[],"name":"Neutron__UntrustedSigner","type":"error"},{"inputs":[],"name":"Neutron__WrongEtherAmmount","type":"error"},{"inputs":[{"internalType":"address","name":"operator","type":"address"}],"name":"OperatorNotAllowed","type":"error"},{"inputs":[],"name":"OwnerQueryForNonexistentToken","type":"error"},{"inputs":[],"name":"OwnershipNotInitializedForExtraData","type":"error"},{"inputs":[],"name":"TransferCallerNotOwnerNorApproved","type":"error"},{"inputs":[],"name":"TransferFromIncorrectOwner","type":"error"},{"inputs":[],"name":"TransferToNonERC721ReceiverImplementer","type":"error"},{"inputs":[],"name":"TransferToZeroAddress","type":"error"},{"inputs":[],"name":"URIQueryForNonexistentToken","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"fromTokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"toTokenId","type":"uint256"},{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"ConsecutiveTransfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"parentTokenId","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"secondParentTokenId","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"childTokenId","type":"uint256"}],"name":"EvolutionMint","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"OPERATOR_FILTER_REGISTRY","outputs":[{"internalType":"contract IOperatorFilterRegistry","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"wallets","type":"address[]"}],"name":"addManagers","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"uint32","name":"startTime","type":"uint32"},{"internalType":"uint32","name":"endTime","type":"uint32"},{"internalType":"uint16","name":"supplyLimitByTheEndOfStage","type":"uint16"},{"internalType":"uint16","name":"maxTokensPerWallet","type":"uint16"},{"internalType":"uint256","name":"weiTokenPrice","type":"uint256"}],"internalType":"struct Neutron.SaleStageConfig","name":"config","type":"tuple"}],"name":"addSaleStage","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"airdropTo","type":"address[]"},{"internalType":"uint256[]","name":"quantity","type":"uint256[]"}],"name":"airdrop","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"stageIndex","type":"uint16"},{"components":[{"internalType":"uint32","name":"startTime","type":"uint32"},{"internalType":"uint32","name":"endTime","type":"uint32"},{"internalType":"uint16","name":"supplyLimitByTheEndOfStage","type":"uint16"},{"internalType":"uint16","name":"maxTokensPerWallet","type":"uint16"},{"internalType":"uint256","name":"weiTokenPrice","type":"uint256"}],"internalType":"struct Neutron.SaleStageConfig","name":"config","type":"tuple"}],"name":"editSaleStage","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes","name":"signature","type":"bytes"},{"internalType":"uint256","name":"firstParentId","type":"uint256"},{"internalType":"uint256","name":"secondParentId","type":"uint256"}],"name":"evolutionMint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getCollectionSize","outputs":[{"internalType":"uint256","name":"collectionSize","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getCurrentSaleStageIndex","outputs":[{"internalType":"uint16","name":"currentStageIndex","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"getEvolutionsCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"stageIndex","type":"uint16"},{"internalType":"address","name":"wallet","type":"address"}],"name":"getMintedCountDuringSaleStage","outputs":[{"internalType":"uint256","name":"countMintedDuringStage","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"stageIndex","type":"uint16"}],"name":"getRemainingSupplyDuringSaleStage","outputs":[{"internalType":"uint256","name":"countRemainingDuringStage","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"stageIndex","type":"uint16"}],"name":"getSaleStageConfig","outputs":[{"components":[{"internalType":"uint32","name":"startTime","type":"uint32"},{"internalType":"uint32","name":"endTime","type":"uint32"},{"internalType":"uint16","name":"supplyLimitByTheEndOfStage","type":"uint16"},{"internalType":"uint16","name":"maxTokensPerWallet","type":"uint16"},{"internalType":"uint256","name":"weiTokenPrice","type":"uint256"}],"internalType":"struct Neutron.SaleStageConfig","name":"config","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getSaleStageCount","outputs":[{"internalType":"uint256","name":"saleStagesCount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getSignatureData","outputs":[{"internalType":"bytes8","name":"hashSalt","type":"bytes8"},{"internalType":"address","name":"signerAddress","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"wallet","type":"address"}],"name":"isManager","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"hash","type":"bytes32"},{"internalType":"bytes","name":"signature","type":"bytes"},{"internalType":"uint64","name":"nonce","type":"uint64"},{"internalType":"uint256","name":"quantity","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"wallets","type":"address[]"}],"name":"removeManagers","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"stageIndex","type":"uint16"}],"name":"removeSaleStage","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"stageIndex","type":"uint16"}],"name":"resetSaleStage","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"baseUri","type":"string"}],"name":"setBaseUri","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address payable","name":"to","type":"address"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]