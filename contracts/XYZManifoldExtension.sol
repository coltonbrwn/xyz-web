// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

/// @author: swms.de

import "@manifoldxyz/libraries-solidity/contracts/access/AdminControl.sol";
import "@manifoldxyz/creator-core-solidity/contracts/core/IERC1155CreatorCore.sol";
import "@manifoldxyz/creator-core-solidity/contracts/extensions/ICreatorExtensionTokenURI.sol";

import "@openzeppelin/contracts/interfaces/IERC165.sol";


contract XYZManifoldExtension is ICreatorExtensionTokenURI, AdminControl  {

    address private _creator;
    uint256 public _numMinted = 0;

    uint256 public constant PRICE = 0.01 ether;
    uint256 public constant MAX_MINTABLE = 5;
    uint8 private constant TOKEN_ID = 1;

    constructor(address creator) {
        _creator = creator;
        _numMinted = IERC1155CreatorCore(_creator).totalSupply(TOKEN_ID);
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
        returns (string memory)
    {
        return 'h';
    }

    function mintNew() public adminRequired {

        require(
            _numMinted == 0,
            'TokenID 1 has already been minted'
        );

        address[] memory _callerAddress = new address[](1);
        uint256[] memory _amountsForMint = new uint256[](1);
        string[] memory _urisForMint = new string[](1);

        _callerAddress[0] = msg.sender;
        _amountsForMint[0] = 1;

        uint256[] memory minted = IERC1155CreatorCore(_creator).mintExtensionNew(_callerAddress, _amountsForMint, _urisForMint);
        _numMinted = minted.length;
    }

    function mintExisting() public payable {

        require(
            msg.value >= PRICE * 1,
            "Not enough ether to purchase NFT."
        );
        require(
            _numMinted > 0,
            "mintNew must be called first"
        );
        require(
            _numMinted <= MAX_MINTABLE,
            "All NFTs have been minted"
        );

        address[] memory _callerAddress = new address[](1);
        uint256[] memory _tokenIdsForMint = new uint256[](1);
        uint256[] memory _amountsForMint = new uint256[](1);

        _callerAddress[0] = msg.sender;
        _tokenIdsForMint[0] = TOKEN_ID;
        _amountsForMint[0] = 1;
        
        IERC1155CreatorCore(_creator).mintExtensionExisting(_callerAddress, _tokenIdsForMint, _amountsForMint);
        _numMinted ++;
    }
}
