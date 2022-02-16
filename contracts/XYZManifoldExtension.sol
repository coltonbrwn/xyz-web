// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

/// @author: swms.de

import "@manifoldxyz/libraries-solidity/contracts/access/AdminControl.sol";
import "@manifoldxyz/creator-core-solidity/contracts/core/IERC1155CreatorCore.sol";
import "@manifoldxyz/creator-core-solidity/contracts/extensions/ICreatorExtensionTokenURI.sol";

import "@openzeppelin/contracts/interfaces/IERC165.sol";


contract XYZManifoldExtension is ICreatorExtensionTokenURI, AdminControl  {

    address private _creator;
    uint256 private NUM_MINTED = 0;
    uint256 private constant PRICE = 0.01 ether;
    uint256 private constant MAX_MINTABLE = 5;
    uint8 private constant TOKEN_ID = 3;

    event Minted(address owner);

    constructor(address creator) {
        _creator = creator;
        NUM_MINTED = IERC1155CreatorCore(_creator).totalSupply(TOKEN_ID);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(AdminControl, IERC165)
        returns (bool)
    {
        return interfaceId == type(ICreatorExtensionTokenURI).interfaceId 
        || AdminControl.supportsInterface(interfaceId) 
        || super.supportsInterface(interfaceId);
    }
    
    function tokenURI(address creator, uint256 tokenId)
        external
        view
        override
        returns (string memory)
    {
        return 'https://arweave.net/Xsn4nYTe7tvUKlaRVvTUQC9KBHYUCvE7EsuHtNGQAwo';
    }

    function withdrawAll() external adminRequired {
        payable(0xb01Ba49F1B04A87D75BC268F9f3B5D1276A588f6).transfer(address(this).balance);
    }

    function getContractState() external view returns (uint256 price, uint256 maxMint, uint256 numMinted) {
        return (PRICE, MAX_MINTABLE, NUM_MINTED);
    }

    function mintNew() public adminRequired {

        require(
            NUM_MINTED == 0,
            'TokenID has already been minted'
        );

        address[] memory _callerAddress = new address[](1);
        uint256[] memory _amountsForMint = new uint256[](1);
        string[] memory _urisForMint = new string[](1);

        _callerAddress[0] = msg.sender;
        _amountsForMint[0] = 1;

        uint256[] memory minted = IERC1155CreatorCore(_creator).mintExtensionNew(_callerAddress, _amountsForMint, _urisForMint);
        NUM_MINTED = minted.length;
        emit Minted(msg.sender);
    }

    function mintExisting() public payable {

        require(
            msg.value >= PRICE,
            "Not enough ether to purchase NFT."
        );
        require(
            NUM_MINTED > 0,
            "mintNew must be called first"
        );
        require(
            NUM_MINTED <= MAX_MINTABLE,
            "All NFTs have been minted"
        );

        address[] memory _callerAddress = new address[](1);
        uint256[] memory _tokenIdsForMint = new uint256[](1);
        uint256[] memory _amountsForMint = new uint256[](1);

        _callerAddress[0] = msg.sender;
        _tokenIdsForMint[0] = TOKEN_ID;
        _amountsForMint[0] = 1;
        
        IERC1155CreatorCore(_creator).mintExtensionExisting(_callerAddress, _tokenIdsForMint, _amountsForMint);
        NUM_MINTED ++;
        emit Minted(msg.sender);
    }
}
