// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
contract NinjaPunksNFT is ERC721,Ownable{
    
    uint public mintprice;
    uint public totalsupply;
    uint public maxsupply;

    string tokenuri;    
   address payable public withdrawaddress;
    mapping (uint=>string)public nftAttributes;
    constructor()payable ERC721("NinjaPunk","NJP"){
        mintprice=0.02 ether;
        totalsupply=0;
        maxsupply=100;
        withdrawaddress=payable(msg.sender);
    }

    function withdraw()external payable onlyOwner{
        uint bal=address(this).balance;
        (bool success, )=withdrawaddress.call{value:bal}('');
        require(success,"withdraw failed");
    }
    function settokenuri(string memory _tokenuri) public {
        tokenuri=_tokenuri;
    }

    function tokenURI(uint _tokenId) public view override returns (string memory){
         require(_exists(_tokenId));
        string memory output=nftAttributes[_tokenId];
        return output;
    }
  
  function mint(string memory _tokenuri )public payable returns(bool){
       
        require(msg.value == mintprice,"Not enough ether");
        require(totalsupply < maxsupply,"Max supply reached");
       
            uint newtokenid=totalsupply+1;
             totalsupply++;
             nftAttributes[newtokenid]=_tokenuri;
            _safeMint(msg.sender, newtokenid);
            settokenuri(_tokenuri);
            tokenURI(newtokenid);
            return true;
    }

}