import React,{useEffect,useState,useContext} from 'react';
import Layout from './LayoutT';
import { Link ,useHistory} from 'react-router-dom';
import { Card, Col, Container, Row, Button, Form} from 'react-bootstrap';
import ButtonLoad from 'react-bootstrap-button-loader';
import fireDb from '../../NFTFolder/firebase';
import Compress from "react-image-file-resizer";
import { ToastContainer, Zoom, toast} from 'react-toastify';
import {abibytecode} from './datasbytecodeNormalNFT'
import lottery from './Normalnftcontract';
import {abibytecoderoylty} from './datasbytecodeRoyaltyNFT'
import lotteryroyalty from './Royaltynftcontract';
import {abibytecodeauction} from './datasbytecodeAuctionNFT'
import {abiauction} from './Auctionnftcontract';
//import configfile from '../../NFTFolder/config.json'
import {DataContext} from "../../App";
import web3 from './web3';
import axios from 'axios';
import { createActivityTable, createNFTDetails } from '../../awsdatafile';
//const axios = require('axios');
const MintNFT = () => {
    const value = useContext(DataContext);
    useEffect(() => {
      document.title = "DivineDimension | MintNFT"
    }, [])
    let history=useHistory();        
    const [selectValue,setSelectValue] = useState("Image");
    const [selectValue2,setSelectValue2] = useState("Sports");    
    const [selectValue31,setSelectValue31] = useState("NFT");  
    console.log("selected",selectValue31)    
    const [selectValue311,setSelectValue311] = useState("1");       
    const handleChange311 = (e)=>{
        setSelectValue311(e.target.value)
    }             
    const [Check,setCheck] = useState(false);    
    const [Name,setName] = useState("");
    const [Links,setLink] = useState("");
    const [Description,setDescription] = useState("");
    const [Img,setImg] = useState("")
    const [Imgname,setImgname] = useState("") 
    const [getFile,setFile] = useState("") 
    const[getIProfile,setgetIProfile]=useState([""]);     
    console.log("MintProfile",getIProfile)     
    const[loader, setLoader] = useState(false);
    const [tid,setId] = useState("");
    console.log("LogId",tid)
    const handleShowLoad = () => setLoader(true);
    const handleHideLoad = () => setLoader(false);            
      
    const captureFile =async(event) => {
        event.stopPropagation()
        event.preventDefault()
        const file = event.target.files[0]
        setImgname(file.name)
        setFile(file)
        const MIN_FILE_SIZE = 1024 // 1KB
        const MAX_FILE_SIZE = 500120 // 500KB
        let fileSizeKiloBytes = file.size 
        let c=0;
        if(fileSizeKiloBytes < MIN_FILE_SIZE){
          toast.dismiss();
          toast.error("File size is less than minimum limit",{autoClose:3000});          
          c=c+1;
          handleHideLoad()                               
          await sleep(4000);
          window.location.reload(false)
        }
        if(fileSizeKiloBytes > MAX_FILE_SIZE){
          toast.dismiss();
          toast.error("File size is greater than maximum limit",{autoClose:3000});      
          c=c+1;
          handleHideLoad()  
          await sleep(4000);                             
          window.location.reload(false)
        }        
        if(c===0){
        let reader = new window.FileReader()
        try{
        Compress.imageFileResizer(file, 500, 500, 'JPEG', 200, 0,
        uri => {          
            setImg(uri)          
        },
        'base64'
        );
        reader.readAsArrayBuffer(file)        
        }catch (err) {      
        }
        }else{
          toast.dismiss();
          toast.error("Support file size: 1 kb to 500 kb ",{autoClose:3000});                
          handleHideLoad()                               
          await sleep(4000);
          window.location.reload(false)
          
        }
        
    }; 

    const dbcallProfile=async()=>{            
        let r=[];
        try {         
        //firebase.auth().signInAnonymously().then((response)=>{      
        fireDb.database().ref("EPuserprofile").child(localStorage.getItem('EAWalletAddress')).on("value", (data) => {          
          if (data) {                      
              r.push({
                Bio:data.val().Bio,
                Customurl: data.val().Customurl,
                Email: data.val().Email,
                Imageurl:data.val().Imageurl,
                Personalsiteurl: data.val().Personalsiteurl,
                TimeStamp: data.val().TimeStamp,
                Twittername: data.val().Twittername,
                UserName: data.val().UserName,
                WalletAddress: data.val().walletAddress,
                bgurl:data.val().bgurl,
                valid:data.val().valid
              })                
          }
          else{
            setgetIProfile([""]);  
          }
          setgetIProfile(r);
        });    
        //})              
      } catch (error) {        
      }                
    }    
    useEffect(()=>{dbcallProfile()},[])

    const nftkey=async()=>{                  
      try {         
      //firebase.auth().signInAnonymously().then((response)=>{      
      fireDb.database().ref("nftgkey").on("value", (data) => {          
        //console.log("Assetval",data.val())        
        let idto = (parseInt(data.val())+1)
        setId(idto)
      });    
      //})              
    } catch (error) {      
    }                
    }    
    useEffect(()=>{nftkey()},[])

    const MintNFT =async()=>{    
        console.log("Mintcall")
        let te = tid;
        var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;          
        if(localStorage.getItem("EAWalletAddress") === null || localStorage.getItem("EAWalletAddress") === undefined || localStorage.getItem("EAWalletAddress") === ''){                      
          toast.warning(`please connect your wallet`,{autoClose: 5000});            
          handleHideLoad()                     
        }
        else if(Name === "" || Name  === undefined || Name === null){          
          toast.warning(`please enter NFT Name`,{autoClose: 5000}); 
          handleHideLoad()                     
        }
        else if(!/\S/.test(Name)){          
          toast.warning(`only space not allowed`,{autoClose: 5000});            
          handleHideLoad()                     
        }
        else if(format.test(Name)){          
          toast.warning(`please enter valid NFT Name special character not allowed`,{autoClose: 5000});            
          handleHideLoad()                     
        }                
        else if(Img === "" || Img === undefined || Img === null){          
          toast.warning(`please Select Image`,{autoClose: 5000});            
          handleHideLoad()                   
        }
        else if( Check === false){          
          toast.warning(`please accept declaration`,{autoClose: 5000});            
          handleHideLoad()                     
        }
        else{          
          handleShowLoad()  
          toast.info("Minting Token",{autoClose: 5000});             
          toast.info("Image Uploading in IPFS",{autoClose: 5000});                          
          if (getFile) {
            try {          
              // const response = await window.martian.connect();
              const sender = localStorage.getItem("EAWalletAddress");                    
              const formData = new FormData();
              formData.append("file", getFile);
              const resFile = await axios({
                  method: "post",
                  url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                  data: formData,
                  headers: {
                      'pinata_api_key': "0ea6c19229db30947801",
                      'pinata_secret_api_key': '9b68d78db91fa44b3911ecae071f7635ae9724df3df4df95e838661dcc3f3e5d',                        
                      "Content-Type": "multipart/form-data"
                  },
                });                
                const realipfsurl = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;                                  
                console.log("Pinata updated",realipfsurl)
                let newinstance;
                let txnHash1;
                let txnHash2;
                 // Create a collection
                //  const txnHash1 = await (window).aptos.createCollection(Name, Description, "https://aptos.dev");
                if(localStorage.getItem("EAWalletName")==="EPetraWallet"){
                  const transaction1 = {
                    function: "0x3::token::create_collection_script",
                    type_arguments: [],
                    arguments: [
                      Name,
                      Description,
                      "\"https://aptos.dev\"",
                      "9007199254740991",
                      [
                        false,
                        false,
                        false
                      ]
                    ],
                    "type": "entry_function_payload"
                  }
              
                  const transaction2 =  {
                    function: "0x3::token::create_token_script",
                    type_arguments: [],
                    arguments: [
                      Name,
                      Name,
                      Description,
                      "1",
                      "9007199254740991",
                      realipfsurl,
                      "0x1",
                      "0",
                      "0",
                      [
                        false,
                        false,
                        false,
                        false,
                        false
                      ],
                      [],
                      [],
                      []
                    ],
                    type: "entry_function_payload"
                  }

                   let txn1 = await (window).aptos.signAndSubmitTransaction(transaction1);
                   txnHash1 = txn1.hash;
                   let txn2 = await (window).aptos.signAndSubmitTransaction(transaction2);
                   txnHash2 = txn2.hash;
                }
                else if (localStorage.getItem("EAWalletName") === "EMartianWallet"){
                   txnHash1 = await window.martian.createCollection(Name, Description, "https://aptos.dev");
                 console.log("completedTXN1",txnHash1)           
                 // Create a token

                //  const txnHash2 = await (window).aptos.createToken(Name,Name, Description, 1,realipfsurl, 1)

                  txnHash2 = await window.martian.createToken(Name,Name, Description, 1,realipfsurl, 1)
                 console.log("completed",txnHash2) 
                }
                else{

                }
                   
                try{
                  await createNFTDetails(sender,txnHash1,selectValue31,Description,Name,Links,Img,selectValue2)
                  //  await storeDBOnly(txnHash2,txnHash2,sender,Img,realipfsurl,"")  
                  await createActivityTable(sender,"Mint NFT",sender,txnHash2,selectValue2)
  
                  toast.dismiss()
                  toast.success(`NFT Minted Successfully`,{autoClose: 5000});                                                                  
                  handleHideLoad()
                  done2();
                } catch(err){
                  console.log("Error sending File to IPFS: ")
                  console.log(err)                                
                  handleHideLoad()
                }
                 
                // const accounts = await web3.eth.getAccounts();
                // if(selectValue31 === "NFT"){
                //   fireDb.database().ref(`nftgkey`).set(tid).then(async()=>{                  
                //     await lottery.deploy({                                                          
                //       data: abibytecode,
                //       arguments: [Name,"Matic",realipfsurl,localStorage.getItem('EAWalletAddress'),'0xFC32107b3153322F4055bf5Ba7de21978E9E3Dfc']        
                //   })
                //   .send({
                //     from: accounts[0],
                //     gas: 15571390//6241620,//9088550,0.01357139//4000000
                //     //gasPrice:'10' //'1000000000'
                //   })
                //   .then(function(newContractInstance){
                //     newinstance = newContractInstance;
                //     console.log(newContractInstance.options.address) // instance with the new contract address          
                //     localStorage.setItem('myData', newContractInstance.options.address);                                        
                //   })                                       
                //   //let address =  localStorage.getItem('myData');                                                                   
                //   //let geta=new web3.eth.Contract(lottery,address);                    
                //   //event.preventDefault();                    
                //   await newinstance.methods.mintWithTokenURI(localStorage.getItem('EAWalletAddress'),te,realipfsurl,te).send({
                //     from: localStorage.getItem('EAWalletAddress'),      
                //     //gas: 21000            
                //    }).on('transactionHash',function(hash){      
                //     console.log("hashget",hash)                                                
                //     let getData=localStorage.getItem('myData')              
                //     storeDBOnly(te,hash,localStorage.getItem('EAWalletAddress'),Img,realipfsurl,getData)                  
                //     })
                //   })                
                // }else if(selectValue31 === "Royalty-NFT"){
                //   fireDb.database().ref(`nftgkey`).set(tid).then(async()=>{                  
                //     await lotteryroyalty.deploy({                                                          
                //       data: abibytecoderoylty,
                //       arguments: [Name,"Matic",realipfsurl,localStorage.getItem('EAWalletAddress'),'0xFC32107b3153322F4055bf5Ba7de21978E9E3Dfc']        
                //   })
                //   .send({
                //     from: accounts[0],
                //     gas: 15571390//6241620,//9088550,0.01357139//4000000
                //     //gasPrice:'10' //'1000000000'
                //   })
                //   .then(function(newContractInstance){
                //     newinstance = newContractInstance;
                //     console.log(newContractInstance.options.address) // instance with the new contract address          
                //     localStorage.setItem('myData', newContractInstance.options.address);                                        
                //   })                                                         
                //   await newinstance.methods.mintWithTokenURI(localStorage.getItem('EAWalletAddress'),te,realipfsurl,te).send({
                //     from: localStorage.getItem('EAWalletAddress'),      
                //     //gas: 21000            
                //    }).on('transactionHash',function(hash){      
                //     console.log("hashget",hash)                                                
                //     let getData=localStorage.getItem('myData')              
                //     storeDBOnly(te,hash,localStorage.getItem('EAWalletAddress'),Img,realipfsurl,getData)                  
                //     })
                //   })                
                // }else if(selectValue31 === "Auction-NFT"){
                //   let lotteryauction = new web3.eth.Contract(abiauction);
                //   fireDb.database().ref(`nftgkey`).set(tid).then(async()=>{                  
                //     await lotteryauction.deploy({                                                          
                //       data: abibytecodeauction,
                //       arguments: [Name,"Matic",realipfsurl,localStorage.getItem('EAWalletAddress'),'0xFC32107b3153322F4055bf5Ba7de21978E9E3Dfc']        
                //   })
                //   .send({
                //     from: accounts[0],
                //     gas: 15571390//6241620,//9088550,0.01357139//4000000
                //     //gasPrice:'10' //'1000000000'
                //   })
                //   .then(function(newContractInstance){
                //     newinstance = newContractInstance;
                //     console.log(newContractInstance.options.address) // instance with the new contract address          
                //     localStorage.setItem('myData', newContractInstance.options.address);                                        
                //   })                                       
                //   //let address =  localStorage.getItem('myData');                                                                   
                //   //let geta=new web3.eth.Contract(lottery,address);                    
                //   //event.preventDefault();                    
                //   await newinstance.methods.mintWithTokenURI(localStorage.getItem('EAWalletAddress'),te,realipfsurl,te).send({
                //     from: localStorage.getItem('EAWalletAddress'),      
                //     //gas: 21000            
                //    }).on('transactionHash',function(hash){      
                //     console.log("hashget",hash)                                                
                //     let getData=localStorage.getItem('myData')              
                //     storeDBOnly(te,hash,localStorage.getItem('EAWalletAddress'),Img,realipfsurl,getData)                  
                //     })
                //   })                
                // }else{

                // }                
                } catch (error) {              
                    console.log("Error sending File to IPFS: ")
                    console.log(error)                                
                    handleHideLoad()
                    //window.location.reload(false)
                }
        }                                  
      }
    }  

    

// const testETHs = async()=>{
//   //firebase.auth().signInAnonymously().then((response)=>{      
//     fireDb.database().ref(`nftgkey`).set(1000);
//   //})
// }
    
    const storeDBOnly=async(assetID,responsetxId,addresseswall,Img,realipfsurls,a)=>{      
      console.log("Inside1",realipfsurls)
      let appId = a;
      // let realipfsurl = localStorage.getItem("realipfsurl")
      let dateset=new Date().toDateString();               
        if(selectValue31 === "NFT"){
          //NFT
          console.log("Inside2",realipfsurls)
          if(getIProfile[0].valid === "validated"){                
            console.log("Inside3",realipfsurls)
            //fireDb.auth().signInAnonymously().then((response)=>{      
            let reftotal=fireDb.database().ref(`EPolygonNFTTotal/${addresseswall}`);      
            let ref2=fireDb.database().ref(`EPolygonNFTN/${addresseswall}`);      
            let refactivity=fireDb.database().ref(`EPolygonactivitytable/${addresseswall}`);   
            const db = ref2.push().key;                                                
            ref2.child(db).set({
              Assetid:assetID,Imageurl:Img,NFTPrice:"",EscrowAddress:a,keyId:db,
              NFTName:Name,userSymbol:"Matic",Ipfsurl:realipfsurls,ownerAddress:addresseswall,previousoaddress:"",
              TimeStamp:dateset,NFTDescription:Description,HistoryAddress:[addresseswall],Appid:appId,valid:"true",
              CreatorAddress:addresseswall,NFTType:"",NFTChannel:"NFT",SocialLink:"",NFTModel:selectValue2
            })
              .then(()=>{
                reftotal.child(db).set({
                  Assetid:assetID,Imageurl:Img,NFTPrice:"",EscrowAddress:a,keyId:db,
                  NFTName:Name,userSymbol:"Matic",Ipfsurl:realipfsurls,ownerAddress:addresseswall,previousoaddress:"",
                  TimeStamp:dateset,NFTDescription:Description,HistoryAddress:[addresseswall],Appid:appId,valid:"false",
                  CreatorAddress:addresseswall,NFTType:"",NFTChannel:"NFT",SocialLink:"",NFTModel:selectValue2,AuctionTime:""
                })
                  .then(()=>{
                refactivity.child(db).set({
                    Assetid:assetID,Imageurl:Img,NFTPrice:responsetxId,EscrowAddress:a,keyId:db,
                    NFTName:Name,userSymbol:"Matic",Ipfsurl:realipfsurls,ownerAddress:addresseswall,previousoaddress:"",
                    TimeStamp:dateset,NFTDescription:Description,HistoryAddress:[addresseswall],Appid:appId,valid:"true",
                    CreatorAddress:addresseswall,NFTType:"",NFTChannel:"NFT",SocialLink:"",NFTModel:selectValue2
                  })
                .then(()=>{                                                            
                            toast.dismiss()
                            toast.success(`NFT Minted Successfully`,{autoClose: 5000});                                                                  
                            handleHideLoad()
                            done2();            
                })                
              })             
            })         
            //})
          }
          else{        
            //fireDb.auth().signInAnonymously().then((response)=>{      
            let reftotal=fireDb.database().ref(`EPolygonNFTTotal/${addresseswall}`);      
            let ref2=fireDb.database().ref(`EPolygonNFTN/${addresseswall}`);      
            let refactivity=fireDb.database().ref(`EPolygonactivitytable/${addresseswall}`);   
            const db = ref2.push().key;                                                
            ref2.child(db).set({
              Assetid:assetID,Imageurl:Img,NFTPrice:"",EscrowAddress:a,keyId:db,
              NFTName:Name,userSymbol:"Matic",Ipfsurl:realipfsurls,ownerAddress:addresseswall,previousoaddress:"",
              TimeStamp:dateset,NFTDescription:Description,HistoryAddress:[addresseswall],Appid:appId,valid:"false",
              CreatorAddress:addresseswall,NFTType:"",NFTChannel:"NFT",SocialLink:"",NFTModel:selectValue2
            })
              .then(()=>{
                reftotal.child(db).set({
                  Assetid:assetID,Imageurl:Img,NFTPrice:"",EscrowAddress:a,keyId:db,
                  NFTName:Name,userSymbol:"Matic",Ipfsurl:realipfsurls,ownerAddress:addresseswall,previousoaddress:"",
                  TimeStamp:dateset,NFTDescription:Description,HistoryAddress:[addresseswall],Appid:appId,valid:"false",
                  CreatorAddress:addresseswall,NFTType:"",NFTChannel:"NFT",SocialLink:"",NFTModel:selectValue2,AuctionTime:""
                })
                  .then(()=>{
                refactivity.child(db).set({
                    Assetid:assetID,Imageurl:Img,NFTPrice:responsetxId,EscrowAddress:a,keyId:db,
                    NFTName:Name,userSymbol:"Matic",Ipfsurl:realipfsurls,ownerAddress:addresseswall,previousoaddress:"",
                    TimeStamp:dateset,NFTDescription:Description,HistoryAddress:[addresseswall],Appid:appId,valid:"false",
                    CreatorAddress:addresseswall,NFTType:"",NFTChannel:"NFT",SocialLink:"",NFTModel:selectValue2
                  })
                    .then(()=>{                                                                    
                            toast.dismiss()
                            toast.success(`NFT Minted Successfully`,{autoClose: 5000});                                                                  
                            handleHideLoad()
                            done2();                         
                })           
              })       
            })                                                                                                                                 
            //})
          }                                  
        }else if(selectValue31 === "Royalty-NFT"){
        //Royalty
        if(getIProfile[0].valid === "validated"){                
          //fireDb.auth().signInAnonymously().then((response)=>{    
          let reftotal=fireDb.database().ref(`EPolygonNFTTotal/${addresseswall}`);        
          let ref2=fireDb.database().ref(`EPolygonNFTR/${addresseswall}`);      
          let refactivity=fireDb.database().ref(`EPolygonactivitytable/${addresseswall}`);   
          const db = ref2.push().key;                                                
          ref2.child(db).set({
            Assetid:assetID,Imageurl:Img,NFTPrice:"",EscrowAddress:a,keyId:db,
            NFTName:Name,userSymbol:"Matic",Ipfsurl:realipfsurls,ownerAddress:addresseswall,previousoaddress:"",
            TimeStamp:dateset,NFTDescription:Description,HistoryAddress:[addresseswall],Appid:appId,valid:"true",
            CreatorAddress:addresseswall,NFTType:"",NFTChannel:"Royalty",SocialLink:selectValue311,NFTModel:selectValue2
          })
            .then(()=>{
              reftotal.child(db).set({
                Assetid:assetID,Imageurl:Img,NFTPrice:"",EscrowAddress:a,keyId:db,
                NFTName:Name,userSymbol:"Matic",Ipfsurl:realipfsurls,ownerAddress:addresseswall,previousoaddress:"",
                TimeStamp:dateset,NFTDescription:Description,HistoryAddress:[addresseswall],Appid:appId,valid:"false",
                CreatorAddress:addresseswall,NFTType:"",NFTChannel:"Royalty",SocialLink:selectValue311,NFTModel:selectValue2,AuctionTime:""
              })
                .then(()=>{
              refactivity.child(db).set({
                  Assetid:assetID,Imageurl:Img,NFTPrice:responsetxId,EscrowAddress:a,keyId:db,
                  NFTName:Name,userSymbol:"Matic",Ipfsurl:realipfsurls,ownerAddress:addresseswall,previousoaddress:"",
                  TimeStamp:dateset,NFTDescription:Description,HistoryAddress:[addresseswall],Appid:appId,valid:"true",
                  CreatorAddress:addresseswall,NFTType:"",NFTChannel:"Royalty",SocialLink:selectValue311,NFTModel:selectValue2
                })
              .then(()=>{                                                            
                          toast.dismiss()
                          toast.success(`NFT Minted Successfully`,{autoClose: 5000});                                                                  
                          handleHideLoad()
                          done2();            
              })                
            })             
          })         
          //})
        }
        else{        
          //fireDb.auth().signInAnonymously().then((response)=>{      
          let reftotal=fireDb.database().ref(`EPolygonNFTTotal/${addresseswall}`);        
          let ref2=fireDb.database().ref(`EPolygonNFTR/${addresseswall}`);                
          let refactivity=fireDb.database().ref(`EPolygonactivitytable/${addresseswall}`);   
          const db = ref2.push().key;                                                
          ref2.child(db).set({
            Assetid:assetID,Imageurl:Img,NFTPrice:"",EscrowAddress:a,keyId:db,
            NFTName:Name,userSymbol:"Matic",Ipfsurl:realipfsurls,ownerAddress:addresseswall,previousoaddress:"",
            TimeStamp:dateset,NFTDescription:Description,HistoryAddress:[addresseswall],Appid:appId,valid:"false",
            CreatorAddress:addresseswall,NFTType:"",NFTChannel:"Royalty",SocialLink:selectValue311,NFTModel:selectValue2
          })
            .then(()=>{              
              reftotal.child(db).set({
                Assetid:assetID,Imageurl:Img,NFTPrice:"",EscrowAddress:a,keyId:db,
                NFTName:Name,userSymbol:"Matic",Ipfsurl:realipfsurls,ownerAddress:addresseswall,previousoaddress:"",
                TimeStamp:dateset,NFTDescription:Description,HistoryAddress:[addresseswall],Appid:appId,valid:"false",
                CreatorAddress:addresseswall,NFTType:"",NFTChannel:"Royalty",SocialLink:selectValue311,NFTModel:selectValue2,AuctionTime:""
              })
                .then(()=>{
              refactivity.child(db).set({
                  Assetid:assetID,Imageurl:Img,NFTPrice:responsetxId,EscrowAddress:a,keyId:db,
                  NFTName:Name,userSymbol:"Matic",Ipfsurl:realipfsurls,ownerAddress:addresseswall,previousoaddress:"",
                  TimeStamp:dateset,NFTDescription:Description,HistoryAddress:[addresseswall],Appid:appId,valid:"false",
                  CreatorAddress:addresseswall,NFTType:"",NFTChannel:"Royalty",SocialLink:selectValue311,NFTModel:selectValue2
                })
                  .then(()=>{                                                                    
                          toast.dismiss()
                          toast.success(`NFT Minted Successfully`,{autoClose: 5000});                                                                  
                          handleHideLoad()
                          done2();                         
              })                  
            })             
          })     
          //})
        }                                  
        }else if(selectValue31 === "Auction-NFT"){
        //Auction
        if(getIProfile[0].valid === "validated"){                
          //fireDb.auth().signInAnonymously().then((response)=>{      
          let reftotal=fireDb.database().ref(`EPolygonNFTTotal/${addresseswall}`);        
          let ref2=fireDb.database().ref(`EPolygonNFTA/${addresseswall}`);      
          let refactivity=fireDb.database().ref(`EPolygonactivitytable/${addresseswall}`);   
          const db = ref2.push().key;                                                
          ref2.child(db).set({
            Assetid:assetID,Imageurl:Img,NFTPrice:"",EscrowAddress:a,keyId:db,
            NFTName:Name,userSymbol:"Matic",Ipfsurl:realipfsurls,ownerAddress:addresseswall,previousoaddress:"",
            TimeStamp:dateset,NFTDescription:Description,HistoryAddress:[addresseswall],Appid:appId,valid:"true",
            CreatorAddress:addresseswall,NFTType:"",NFTChannel:"Auction",SocialLink:"",NFTModel:selectValue2,AuctionTime:""
          })
            .then(()=>{
              reftotal.child(db).set({
                Assetid:assetID,Imageurl:Img,NFTPrice:"",EscrowAddress:a,keyId:db,
                NFTName:Name,userSymbol:"Matic",Ipfsurl:realipfsurls,ownerAddress:addresseswall,previousoaddress:"",
                TimeStamp:dateset,NFTDescription:Description,HistoryAddress:[addresseswall],Appid:appId,valid:"false",
                CreatorAddress:addresseswall,NFTType:"",NFTChannel:"Auction",SocialLink:"",NFTModel:selectValue2,AuctionTime:""
              })
                .then(()=>{
              refactivity.child(db).set({
                  Assetid:assetID,Imageurl:Img,NFTPrice:responsetxId,EscrowAddress:a,keyId:db,
                  NFTName:Name,userSymbol:"Matic",Ipfsurl:realipfsurls,ownerAddress:addresseswall,previousoaddress:"",
                  TimeStamp:dateset,NFTDescription:Description,HistoryAddress:[addresseswall],Appid:appId,valid:"true",
                  CreatorAddress:addresseswall,NFTType:"",NFTChannel:"Auction",SocialLink:"",NFTModel:selectValue2,AuctionTime:""
                })
              .then(()=>{                                                            
                          toast.dismiss()
                          toast.success(`NFT Minted Successfully`,{autoClose: 5000});                                                                  
                          handleHideLoad()
                          done2();            
              })                
            })             
          })         
          //})
        }
        else{        
          //fireDb.auth().signInAnonymously().then((response)=>{     
          let reftotal=fireDb.database().ref(`EPolygonNFTTotal/${addresseswall}`);         
          let ref2=fireDb.database().ref(`EPolygonNFTA/${addresseswall}`);      
          let refactivity=fireDb.database().ref(`EPolygonactivitytable/${addresseswall}`);   
          const db = ref2.push().key;                                                
          ref2.child(db).set({
            Assetid:assetID,Imageurl:Img,NFTPrice:"",EscrowAddress:a,keyId:db,
            NFTName:Name,userSymbol:"Matic",Ipfsurl:realipfsurls,ownerAddress:addresseswall,previousoaddress:"",
            TimeStamp:dateset,NFTDescription:Description,HistoryAddress:[addresseswall],Appid:appId,valid:"false",
            CreatorAddress:addresseswall,NFTType:"",NFTChannel:"Auction",SocialLink:"",NFTModel:selectValue2,AuctionTime:""
          })
            .then(()=>{
              reftotal.child(db).set({
                Assetid:assetID,Imageurl:Img,NFTPrice:"",EscrowAddress:a,keyId:db,
                NFTName:Name,userSymbol:"Matic",Ipfsurl:realipfsurls,ownerAddress:addresseswall,previousoaddress:"",
                TimeStamp:dateset,NFTDescription:Description,HistoryAddress:[addresseswall],Appid:appId,valid:"false",
                CreatorAddress:addresseswall,NFTType:"",NFTChannel:"Auction",SocialLink:"",NFTModel:selectValue2,AuctionTime:""
              })
                .then(()=>{
              refactivity.child(db).set({
                  Assetid:assetID,Imageurl:Img,NFTPrice:responsetxId,EscrowAddress:a,keyId:db,
                  NFTName:Name,userSymbol:"Matic",Ipfsurl:realipfsurls,ownerAddress:addresseswall,previousoaddress:"",
                  TimeStamp:dateset,NFTDescription:Description,HistoryAddress:[addresseswall],Appid:appId,valid:"false",
                  CreatorAddress:addresseswall,NFTType:"",NFTChannel:"Auction",SocialLink:"",NFTModel:selectValue2,AuctionTime:""
                })
                  .then(()=>{                                                                    
                          toast.dismiss()
                          toast.success(`NFT Minted Successfully`,{autoClose: 5000});                                                                  
                          handleHideLoad()
                          done2();                         
              })                  
            })             
          })                                                                                                                    
          //})
        }                                  
        }          
    }
    
    const handleChange = (e)=>{
      setSelectValue(e.target.value)
    }
    const handleChange2 = (e)=>{
      setSelectValue2(e.target.value)
    }
    const handleChange3 = (e)=>{
      setCheck(e.target.checked)
    }
    const handleChange31 = (e)=>{
      setSelectValue31(e.target.value)
    }    
    
    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    const done=async()=>{
      await sleep(7000);
      history.push("/Mint-NFT")      
    } 
    const done2=async()=>{
      await sleep(5000);
      history.push("/my-NFT")
      window.location.reload(false);    
    }
    const toastDiv = (txId) =>
    (
    <div>
         <p> Transaction is successful &nbsp;<a style={{color:'#FDBD01'}} href={txId} target="_blank" rel="noreferrer"><br/><p style={{fontWeight: 'bold'}}>View in Aptosexplorer <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M11.7176 3.97604L1.69366 14L0.046875 12.3532L10.0697 2.32926H1.23596V0H14.0469V12.8109H11.7176V3.97604Z" fill="#FDBD01"/>
          </svg></p></a></p>  
     </div>
    );

    const clearImage = () =>{
      setImg("")
    }    

    return (
        <Layout>
            <Container>
            <ToastContainer position='bottom-right' draggable = {false} transition={Zoom} autoClose={4000} closeOnClick = {false}/>
                <Row className='justify-content-center'>
                    <Col md={10} lg={7}>
                        <Card className='card-dash border-0 d-block'>
                            <div className='d-flex align-items-start justify-content-between flex-wrap'>
                                {getIProfile === "" || getIProfile === null || getIProfile === undefined || getIProfile[0] === "" || getIProfile[0] === null || getIProfile[0] === undefined ?(
                                    <Link to="/create-artists" className='btn order-2 btn-outline-purple'>Create Artist</Link>
                                ):(                                  
                                    <p className='btn order-2 btn-outline-purple'>{getIProfile[0].UserName}</p>                                                                                                           
                                )}                                  
                                <div>
                                    <center><h3 className='mb-3'>Mint NFT</h3></center>
                                    {/* <p>Mint NFT</p> */}
                                    {/* <Link to="/MintSpecial-NFT" className='btn order-2 btn-outline-purple'>Mint Special-NFT</Link>                                   */}
                                    &nbsp;
                                    {/* <Link to="/Mint-NFT1155" className='btn order-2 btn-outline-purple'>Mint Erc1155</Link>                                   */}
                                </div>                                
                            </div>
                            {/* <hr className='my-4' /> */}

                            <Form>
                                <div className='mb-3'>
                                    <label>NFT Name</label>
                                    <input id="inputID" type="text" placeholder='Enter the nft name' className="form-control form-control-field border-0" onChange={event => setName( event.target.value)}/>
                                </div>
                                <Row>
                                <Col md={4} xs={6}>
                                        <div className='mb-3'>
                                            <label>NFT Model</label>
                                            <select className="form-control form-control-field border-0"
                                            defaultValue={selectValue31} 
                                            onChange={handleChange31}>
                                                <option value="NFT">NFT</option>
                                                <option value="Royalty-NFT">Royalty-NFT</option>                                                
                                                {/* <option value="Fractional-NFT">Fractional-NFT</option>                                                 */}
                                                {/* <option value="Auction-NFT">Auction-NFT</option>                                                 */}
                                            </select>
                                        </div>
                                    </Col>
                                    {/* <Col md={4} xs={6}>
                                        <div className='mb-3'>
                                            <label>Artwork Type</label>
                                            <select className="form-control form-control-field border-0" 
                                            defaultValue={selectValue} 
                                            onChange={handleChange} >                                                
                                                <option value="Image">Image</option>                                  
                                            </select>
                                        </div>
                                    </Col> */}
                                    <Col md={4} xs={6}>
                                        <div className='mb-3'>
                                            <label>Category</label>
                                            <select className="form-control form-control-field border-0"
                                            defaultValue={selectValue2} 
                                            onChange={handleChange2}>
                                                <option value="Buddhists">Buddhists</option>
                                                <option value="Christian">Christian</option>
                                                <option value="Hinduism">Hinduism</option>
                                                <option value="Islam">Islam</option>
                                                <option value="land">Land & Estate</option>
                                            </select>
                                        </div>
                                    </Col>
                                    {/* {selectValue31 === "Fractional-NFT" ? (
                                      <Col md={4} xs={6}>
                                        <div className='mb-3'>                                            
                                          <label>Total Supply</label>
                                            <select className="form-control form-control-field border-0"
                                            defaultValue={selectValue311} 
                                            onChange={handleChange311}>
                                                <option value="10">10</option>                                                
                                                <option value="100">100</option>                                                
                                            </select>
                                        </div>                                        
                                    </Col>
                                    ):(
                                        <></>
                                    )}                                     */}
                                    {selectValue31 === "Royalty-NFT" ? (
                                      <Col md={4} xs={6}>
                                        <div className='mb-3'>                                            
                                          <label>Royalty Reward Percentage</label>
                                            <select className="form-control form-control-field border-0"
                                            defaultValue={selectValue311} 
                                            onChange={handleChange311}>
                                                <option value="1">1</option>                                                
                                                <option value="2">2</option>                                                
                                                <option value="3">3</option>                                                
                                                <option value="4">4</option>                                                
                                                <option value="5">5</option>                                                
                                            </select>
                                        </div>                                        
                                    </Col>
                                    ):(
                                        <></>
                                    )}                                    
                                </Row>
                                <div className='mb-3'>
                                    <label>Social Media link</label>
                                    <input id="inputID" type="url" placeholder='Enter the valid Link' className="form-control form-control-field border-0" onChange={event => setLink( event.target.value)} />
                                </div>
                                <div className='mb-3'>
                                    <label>Description</label>
                                    <textarea id="inputID" rows="4" placeholder='Write something about your artwork' className="form-control form-control-field border-0"  onChange={event => setDescription( event.target.value)}/>
                                </div>
                                <div className='mb-3'>
                                    <label>Upload</label>

                                    <div className='upload-box text-center'>


                                      {Img === null || Img === "" || Img === undefined ?(
                                        <>
                                        <input id="upload" type="file" hidden onChange = {captureFile}/>
                                        <label htmlFor='upload'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi mb-3 bi-upload" viewBox="0 0 16 16">
                                                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                                                <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
                                            </svg>
                                            <p id="inputID">Support file : png/img </p>                                           
                                        </label>
                                            <p id="inputID">Support file size: 1 kb to 500 kb </p>
                                        </>
                                      ):(
                                        <>
                                        <input id="upload" type="file" hidden onChange = {captureFile}/>
                                        <label htmlFor='Image Uploaded' className='p-2' >                                                                        
                                        <Button variant='link' className='p-0 text-white btn-closeimg' onClick={()=>{clearImage()}}>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;
                                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi m-0 bi-x-circle-fill" viewBox="0 0 16 16">
                                              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                                            </svg>
                                        </Button> 
                                        <img src={Img} alt="Img" className='img-fluid w-100 rounded-16' />            
                                        </label>
                                        </>
                                      )}
                                        
                                    </div>
                                </div>
                                <div className='mb-3'>
                                <Form.Check 
                                    onChange={e => handleChange3(e)}                                    
                                    type="checkbox"
                                    id="terms"
                                    label="I declare that this is an original artwork. I understand that no plagiarism is allowed, and that the artwork can be removed anytime if detected."
                                />
                                </div>                                
                                <ButtonLoad loading={loader} className='w-100 mb-3' onClick={()=>{MintNFT()}}>Mint NFT</ButtonLoad>
                            </Form>
                        </Card>
                    </Col>
                </Row>
                
            </Container>
        </Layout>
    )
}

export default MintNFT;