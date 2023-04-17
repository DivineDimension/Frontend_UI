import React, { Component, useState, useEffect, useContext, useRef } from 'react';
import { Modal, Button, ProgressBar, Form, InputGroup  } from 'react-bootstrap';

import Image from '../../../assets/images/peacock.png';
import aptos from '../../../assets/images/aptos.png';
import ButtonLoad from 'react-bootstrap-button-loader';

// import Icon from '../../assets/images/post-icon-1.png';
import Logo from '../../../assets/images/divinelogo.png';
// import SLogo from '../../assets/images/modal-square-logo.png';
// import MyAlgoConnect from '@randlabs/myalgo-connect';
import ReactDomServer from 'react-dom/server';
import { ToastContainer, Toast, Zoom, Bounce, toast} from 'react-toastify';
import Compress from "react-image-file-resizer";

// import {appOptinLaunchpad, assetOptinLaunchpad, donateLaunchpad} from '../apicallfunction';
// import '../toast-style-override.css'
import launchpadDetails from './launchpad.json';

import axios from 'axios';  
// import url from '../../configurl';
import { Link } from 'react-router-dom';
import { swappet } from '../config';
import { createActivityTable } from '../../../awsdatafile';
// const algosdk = require('algosdk');
// const myAlgoWallet = new MyAlgoConnect();

const PostCard = ({x}) => {

    const [show, setShow] = React.useState(false);
    const [showDonate, setShowDonate] = React.useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCloseDonate = () => setShowDonate(false);
    const handleShowDonate = () => setShowDonate(true);

    const [address, setAddress] = React.useState(false);
    const [getFile,setFile] = useState("") 

    const [accounts, setaccount] = useState("");
    let[startdt,setstartdt] = useState("");
    const[enddt,setenddt] = useState("");
    const[clsdt,setclsdt] = useState("");
    const[goal,setgoal] = useState("");
    const[total,settotal] = useState("");
    const[rec,setrec]= useState("");
    const[creator,setCreator]= useState("");
    const[escrow,setescrow]= useState("");
    const[appid,setappid]= useState("");
    const[percent,setPercent]= useState(parseFloat(""));
    const[date,setdate]= useState("");
    const[time,settime]= useState("");
    const[map1,setMap]= useState([]);
    const[day,setTime4]= useState("");
    const[hour,setTim1]= useState("");
    const[min,setTim2]= useState("");
    const[sec,setTim3]= useState("");
    const[lock,setlock]= useState(""); 
    const [appOpt,setToAppOpt] = useState(false);
    const [assetOpt,setToAssetOpt] = useState(false);
    const [asset,setToasset] = useState("");
    const [amount_inp, setToamount] = useState("");
    const [amtReclaim, setToReclaim] = useState("");
    const [LocalAmount, setLocalAmount] = useState("");
    // const [show, setShow] = useState(false);
    const [value, setValue] = React.useState('');
    const [valueAddAddress, setValueAddAddress] = React.useState('');
    const [addrAddAddress, setValueAddrAddAddress] = React.useState('');
    const [user_nft, setUserNft] = useState("");
    const [user_aptos, setUserAptos] = useState("");
    const [totalNft, setTotalNft] = useState("");
    
    const [minAlgo, setMinAlgo] = useState("");

    const handleAssetFalse = () => setToAssetOpt(false);
    const handleAssetTrue = () => setToAssetOpt(true);
    const [Img1,setImg1] = useState("")    
    const [Imgname,setImgname] = useState("") 
    const[loader, setLoader] = useState(false);
    const handleShowLoad = () => setLoader(true);
    const handleHideLoad = () => setLoader(false); 


    console.log("image",Img1)
    // let appID_global = launchpadDetails['app1']['appID'];
    let escrow_global = "LMCGCWB7LOFIQBIKO663W4OOOQQCNWQGU23HCMLYXX3S35OXS47XLXLTXQ";
    // let elementID_global = launchpadDetails['app1']['elemAssetID'];
    let whiteID_global = 56296602;
    let owner_global = "UTV3AUE6PTUDIBAT6EOP57IUJMW75MOXNP2XOZLMJX5CEBLDGTMYTR32CU";

    const baseServer = 'https://testnet-algorand.api.purestake.io/ps2';
const port = '';

const token = {
   'X-API-Key': 'pOD5BAUCxq7InVPjo0sO01B0Vq4d7pD1ask5Ix43'
}

const captureFile1 =async(event) => {
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
        setImg1(uri)
        // console.log("uri",uri);          
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


const clearImage = () =>{
    setImg1("")
    console.log("clearing")
  }


useEffect(()=>{getmydeposit()},[]);
const getmydeposit = async() =>{
    if(localStorage.getItem("EAWalletAddress")  === null || localStorage.getItem("EAWalletAddress")  === "" || localStorage.getItem("EAWalletAddress")  === " " ||  localStorage.getItem("EAWalletAddress") === '' || localStorage.getItem("EAWalletAddress") === undefined){
  
    } 
    else{
        try{
            let k =await fetch(`https://fullnode.testnet.aptoslabs.com/v1/accounts/${localStorage.getItem("EAWalletAddress")}/resource/0x98c76c6286e9373f775ca68bd671df9adef7867ac8cd24167f571a6f060bcd66::mint_nft3::Mydeposits`)
            // console.log("fetch",await k.json())
            let a = await k.json()
            console.log("getmydepo",a)
            setUserNft(a.data.total_nft)
            setUserAptos(a.data.total_aptos)
        } 
        catch(error){
            console.log("getmydepo",error)
            
        }
    }
   
}
useEffect(()=>{gettotaldeposit()},[]);
const gettotaldeposit = async() =>{
    
        try{
            let k =await fetch(`https://fullnode.testnet.aptoslabs.com/v1/accounts/0x98c76c6286e9373f775ca68bd671df9adef7867ac8cd24167f571a6f060bcd66/resource/0x98c76c6286e9373f775ca68bd671df9adef7867ac8cd24167f571a6f060bcd66::mint_nft3::Cal`)
            // console.log("fetch",await k.json())
            let a = await k.json()
            console.log("getmydepo",a)
            setTotalNft(a.data.count)
            // setUserAptos(a.data.total_aptos)
        } 
        catch(error){
            console.log("getmydepo",error)
            
        }
    
   
}

// useEffect(async() =>{await fetch()},[goal, startdt, enddt, total])



// function sleep(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
//  }



// const fetch = async () => {
// let index = parseInt(appID_global); //current app id need to be entered
// setappid(index);
// // await readLocalState(algodClient, localStorage.getItem("walletAddress"), index);
// await globalState(index);
// }

const reload = () => {
    sessionStorage.setItem("reloading", "true");
    window.location.reload(false); 
};

    // window.onload = () => {
    //     let reloading = sessionStorage.getItem("reloading");
    //     if (reloading) {
    //         sessionStorage.removeItem("reloading");
    //         popShow();
    //     }
    // }

// const popShow = async () => {
//     handleShow();
// }

const convertEpochToDateTime = (epoch) => {
    // Create a new Date object with the epoch timestamp in milliseconds
    const dateObj = new Date(epoch * 1000);
  
    // Extract the date and time components
    const date = dateObj.toLocaleDateString();
    const time = dateObj.toLocaleTimeString();
  
    // Combine the date and time components into a single string
    const dateTimeStr = `${date} ${time}`;
  
    // Return the date and time string
    return dateTimeStr;
  };



  const participate = async() =>{
    if(Img1 === "" || Img1 === null || Img1 === undefined){            
        toast.warning(`please Upload Image`,{autoClose:5000})
        handleHideLoad()
    }
    else{          
        handleShowLoad()  
        // toast.info("Participating",{autoClose: 5000});             
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
               const randomNum = Math.floor(Math.random() * 1000) + 1;
               let nftName = "Divine"+randomNum;
               console.log("nftname",nftName)
                const payloadclaim = {
                    type: "script_function_payload",
                    function: `0x98c76c6286e9373f775ca68bd671df9adef7867ac8cd24167f571a6f060bcd66::mint_nft3::participate`,      
                    type_arguments: ["0x1::aptos_coin::AptosCoin"],
                    arguments: [
                      "0x98c76c6286e9373f775ca68bd671df9adef7867ac8cd24167f571a6f060bcd66",        
                      nftName,
                      "Divine Launcpad",                     
                      "https://divinedimension.io",         
                      realipfsurl, 
                      "0xdf47ac52cd9e0e78b95ae6ce91c09e4ea512cb034231e8ef315f75dbf1de2ec9",
                      10000000
                    ]
                  }

                  let transaction2Hash = await swappet(payloadclaim)
                  console.log("transactionHash", transaction2Hash); 
                  //   let id = "https://explorer.aptoslabs.com/txn/"+transactionHash;        
                  let id = "https://explorer.aptoslabs.com/txn/"+transaction2Hash+"?network=testnet";
                  toast.success(toastDiv(id));
                  await sleep(12000)  
                  await createActivityTable(localStorage.getItem('EAWalletAddress'),"Launchpad",nftName,transaction2Hash,"Launchpad")
                // const transaction2 =  {
                //   function: "0x3::token::create_token_script",
                //   type_arguments: [],
                //   arguments: [
                //     Name,
                //     Name,
                //     Description,
                //     "1",
                //     "9007199254740991",
                //     realipfsurl,
                //     "0x1",
                //     "0",
                //     "0",
                //     [
                //       false,
                //       false,
                //       false,
                //       false,
                //       false
                //     ],
                //     [],
                //     [],
                //     []
                //   ],
                //   type: "entry_function_payload"
                // }

               
             
                 
              try{
                // await createNFTDetails(sender,txnHash1,selectValue31,Description,Name,Links,Img,selectValue2)
                //  await storeDBOnly(txnHash2,txnHash2,sender,Img,realipfsurl,"")  
                await createActivityTable(sender,"Launchpad",sender,transaction2Hash,"Launchpad")

                toast.dismiss()
                toast.success(`Participated Successfully`,{autoClose: 5000});                                                                  
                handleHideLoad()
                done2();
              } catch(err){
                console.log("Error sending File to IPFS: ")
                console.log(err)                                
                handleHideLoad()
              }
                              
              } catch (error) {              
                  console.log("Error sending File to IPFS: ")
                  console.log(error)                                
                  handleHideLoad()
                  //window.location.reload(false)
              }
      }                                  
    }
  }
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  const done2=async()=>{
    await sleep(5000);
    // history.push("/my-NFT")
    window.location.reload(false);    
  }
  const toastDiv = (txId) =>
  (
  <div>
       <p> Transaction is successful &nbsp;<a style={{color:'#FDBD01'}} href={txId} target="_blank" rel="noreferrer"><br/><p style={{fontWeight: 'bold'}}>View in Explorer <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
       <path d="M11.7176 3.97604L1.69366 14L0.046875 12.3532L10.0697 2.32926H1.23596V0H14.0469V12.8109H11.7176V3.97604Z" fill="#FDBD01"/>
        </svg></p></a></p>  
   </div>
  );

  const first = async () => {
    let k = {
        name:"Divine Explorer NFT",
        startTime:"1681368652",
        endTime:1686398664,
        deployerAddr:"0x98c76c6286e9373f775ca68bd671df9adef7867ac8cd24167f571a6f060bcd66",
        ownerAddr:"0xdf47ac52cd9e0e78b95ae6ce91c09e4ea512cb034231e8ef315f75dbf1de2ec9",
        totalSale:100,
        imgurl:Image,
        price:"0.1"
       } 

    var us= k.endTime;
    var ff=new Date(us);
    
setdate(ff.toDateString());
var hours = ff.getHours();
  var minutes = ff.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  settime( hours + ':' + minutes + ' ' + ampm);
//settime(lock);
var countDowndate   =us * 1000;

// var countDownDate = new Date().getTime() + (lock * 1000) ;
//alert(time);
    var x = setInterval(function() {
       var now = new Date().getTime();
      var distance = countDowndate - now ;
    //   console.log("countDowndate",countDowndate,distance);
    //    //console.log("-------------------now", distance);
     //  //console.log(now);
      // Time calculations for days, hours, minutes and seconds
     var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
    //    //console.log("date e", day);
    //    //console.log("hour e", hour);
    //    //console.log("min e", minutes);
    //    //console.log("sec e", seconds);

      // Output the result in an element with id="demo"
     // document.getElementById("demo").innerHTML = hours + "h "
     // + minutes + "m " + seconds + "s ";
    setTime4(days);
    setTim1(hours);
    setTim2(minutes);
    setTim3(seconds);


    
    
    
    
      // If the count down is over, write some text 
      if (distance < 0) {
            clearInterval(x);
            setlock(false);

           //  //console.log('CountDown Finished');
        }
        else{
         setlock(true);
        }

    
      
    }, 1000);

}
useEffect(() => {
    first()
}, []);
    return (
        
        <>
{/* <><ToastContainer position='top-center' draggable = {false} transition={Zoom} autoClose={8000} closeOnClick = {false}/></> */}
                   <Modal show={showDonate} centered onHide={handleCloseDonate}>
                {/* <Modal.Header class="btn-close btn-close-white" closeButton /> */}
                <Modal.Body>
                    <Button className='modal-close' onClick={handleCloseDonate} variant='reset'>
                        <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g opacity="1">
                            <path d="M17.5004 32.0832C9.44597 32.0832 2.91699 25.5542 2.91699 17.4998C2.91699 9.44546 9.44597 2.9165 17.5004 2.9165C25.5548 2.9165 32.0837 9.44546 32.0837 17.4998C32.0837 25.5542 25.5548 32.0832 17.5004 32.0832ZM17.5004 29.1665C20.5946 29.1665 23.562 27.9373 25.75 25.7494C27.9379 23.5615 29.1671 20.594 29.1671 17.4998C29.1671 14.4056 27.9379 11.4382 25.75 9.25026C23.562 7.06233 20.5946 5.83317 17.5004 5.83317C14.4062 5.83317 11.4387 7.06233 9.25076 9.25026C7.06283 11.4382 5.83367 14.4056 5.83367 17.4998C5.83367 20.594 7.06283 23.5615 9.25076 25.7494C11.4387 27.9373 14.4062 29.1665 17.5004 29.1665ZM17.5004 15.4378L21.6245 11.3121L23.6881 13.3757L19.5625 17.4998L23.6881 21.624L21.6245 23.6875L17.5004 19.5619L13.3762 23.6875L11.3126 21.624L15.4383 17.4998L11.3126 13.3757L13.3762 11.3121L17.5004 15.4378Z" fill="white"/>
                            </g>
                        </svg>
                    </Button>
                    <div className="pb-4 px-3">
                  
                        <img 
                        // src={SLogo} 
                        width="80" className="mx-auto mb-1 d-block" alt="icon" />
                        <h5 className="mb-1 text-center">Element</h5>
                        <p className="mb-4 pb-3 text-center"></p>

                        <Form className='form-area'>
                        <Form.Group className="mb-4" controlId="formBasicPassword">
                            <center><Form.Label><h3>Sale</h3></Form.Label></center> <br/>
                            <center><Form.Label><p>Spendable Algo Balance:&nbsp;{(parseFloat(minAlgo)/1000000).toFixed(2) === 'NaN' ?<>0.00</> :(parseFloat(minAlgo)/1000000).toFixed(2)} ALGO</p></Form.Label></center> <br/>
                            <Form.Control type="text" placeholder="Enter Amount" value={value} onChange={(e) => setValue(e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1'))}/>
                        </Form.Group>
                            <Button variant="grad" size="lg" className='w-100' 
                            // onClick={()=>Donate(value)}
                            >
                                Participate
                            </Button>
                        </Form>
                    </div>
                </Modal.Body>
            </Modal>
            <div className="post-card">
                <div className="post-card-image">
                    <img src={x.imgurl} alt="post img" />
                </div>

                <div className="post-card-title w-100 d-flex align-items-center">
                    <img 
                    src={aptos} className='me-2 avatar-pic' 
                     alt="icon" />
                    <div>
                        <h6 className='m-0'>{x.name}</h6>
                        <span className='d-block'>APTOS</span>
                    </div>
                </div>

                <div className="post-card-body">
                    <div className="d-flex align-items-start justify-content-between">
                        <span>Total Sale</span>
                        <div className="h6 text-end">{x.totalSale} NFT</div>
                    </div>
                    <div className="d-flex align-items-start justify-content-between">
                        <span>Starts On {convertEpochToDateTime(x.startTime)}<br/> Ends On {convertEpochToDateTime(x.endTime)}</span>
                        {/* <div className="h6 text-end">{mapStartDate} <small className='d-block'>≈</small></div> */}
                        {/* <div className="h6 text-end">{mapStartDate} <br/> {mapEndDate}</div> */}
                    </div>
                </div>

                <div className="post-card-footer d-flex align-items-end justify-content-between">
                    <div>
                    <Button  onClick={handleShow}>Participate</Button><br/><br/>
                    {/* <Button variant='grad' onClick={minBal}>check</Button><br/><br/> */}

                    {/* {localStorage.getItem("walletAddress") === creator ? (<><Button variant='grad' onClick={handleAddress}>ADD ADDRESS</Button><br/><br/></>):(<></>)} */}
                        
                    
                    </div>
                    {/* <div className="h6 text-end"> <Link to="/"><h6>Project Website</h6></Link> </div> */}
                    {/* <div className="h6 text-end text-uppercase">Official Announcement</div> */}
                </div>
            </div>
            
            <Modal
                show={show}
                size={'lg'}
                centered={true}
                onHide={handleClose}
                keyboard={false}
            >
                {/* <><ToastContainer position='top-center' draggable = {false} transition={Zoom} autoClose={8000} closeOnClick = {false}/></> */}

                <Modal.Body>
                    <Button className='modal-close' onClick={handleClose} variant='reset'>
                        <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g opacity="1">
                            <path d="M17.5004 32.0832C9.44597 32.0832 2.91699 25.5542 2.91699 17.4998C2.91699 9.44546 9.44597 2.9165 17.5004 2.9165C25.5548 2.9165 32.0837 9.44546 32.0837 17.4998C32.0837 25.5542 25.5548 32.0832 17.5004 32.0832ZM17.5004 29.1665C20.5946 29.1665 23.562 27.9373 25.75 25.7494C27.9379 23.5615 29.1671 20.594 29.1671 17.4998C29.1671 14.4056 27.9379 11.4382 25.75 9.25026C23.562 7.06233 20.5946 5.83317 17.5004 5.83317C14.4062 5.83317 11.4387 7.06233 9.25076 9.25026C7.06283 11.4382 5.83367 14.4056 5.83367 17.4998C5.83367 20.594 7.06283 23.5615 9.25076 25.7494C11.4387 27.9373 14.4062 29.1665 17.5004 29.1665ZM17.5004 15.4378L21.6245 11.3121L23.6881 13.3757L19.5625 17.4998L23.6881 21.624L21.6245 23.6875L17.5004 19.5619L13.3762 23.6875L11.3126 21.624L15.4383 17.4998L11.3126 13.3757L13.3762 11.3121L17.5004 15.4378Z" fill="white"/>
                            </g>
                        </svg>
                    </Button>
                    <div className="d-flex flex-wrap align-items-start justify-content-between">
                        <div className="mb-20 d-flex align-items-center mb-md-4 flex-wrap modal-head">
                            <img 
                            src={Logo} height={50} 
                             alt="logo" />
<Button>{x.name}</Button>
                            {/* {appOpt === false ? <><ButtonLoad variant="blue" className='w-100'
                            // onClick={()=>AppOptIn()} 
                            style={{textTransform:"capitalize"}}>app opt-in</ButtonLoad></> : <></>}
                     */}
                            {/* <span>(Opt-in only one time)</span> */}
                        </div>
                    </div>
                    <div className="d-flex align-items-start justify-content-between">
                        <div className='d-flex flex-column'>
                        <strong className="p">Exchange Rate</strong>
                            <div className="p mb-20">{x.price} APTOS = 1 NFT</div>
                        </div>
                        <div className='d-flex ms-auto pt-2 flex-column align-items-end'>
                            <strong className="p">Your Balance</strong>
                            <div className="p mb-20">{localStorage.getItem("EAWalletBalance") ?localStorage.getItem("EAWalletBalance")  : "0.0"}  &nbsp; APTOS</div>
                            {/* <div className="p mb-20">{(parseFloat(elemBalance)/1000000).toFixed(2) === 'NaN' ?<>0.00</> :(parseFloat(elemBalance)/1000000).toFixed(2)}&nbsp; ELEM</div> */}
                        </div>
                        </div>

                    <div className="d-flex mb-20 flex-wrap align-items-start justify-content-between">
                        <div>
                            {/* <strong>Round</strong> */}
                            <strong>
                            {/* {parseFloat((ReactDomServer.renderToString(mapTotal))) != parseFloat((ReactDomServer.renderToString(mapGoal))) ? <div className="p mb-0 text-uppercase" style={{color:"green"}}>Sale in Progress</div> : <div className="p mb-0 text-uppercase" style={{color:"red"}}>Sale Ended</div>} */}
                            </strong>
                        </div>
                        <div className='text-md-end'>
                            <strong>Time Left</strong>
                            <div className="p mb-0">{lock == true ? (<>{day}d:{hour}h:{min}m:{sec}s</>):(<>{0}d:{0}h:{0}m:{0}s</>)}</div>
                        </div>
                    </div>

                    <div className="mb-20">
                        <div className="d-flex justify-content-between">
                            <strong>Start</strong>
                            <strong>End</strong>
                        </div>
                        <ProgressBar 
                        now={totalNft}
                         />
                        <div className="d-flex justify-content-between">
                            <strong>
                                {totalNft}
                                %</strong>
                            <strong>
                                {parseFloat(totalNft * x.price).toFixed(3)} / {100 * x.price} &nbsp;
                             APTOS</strong>
                        </div>
                    </div>
                    <div className="d-flex align-items-start justify-content-between">
                        <div className='d-flex flex-column'>
                            <strong className="p">Your Contribution</strong>
                            <div className="p mb-20">{(parseFloat(user_aptos))  ? (parseFloat(user_aptos)/100000000).toFixed(2): 0.000 } APTOS</div>
                            <div className="p mb-20">{(parseFloat(user_nft))  ? (parseFloat(user_nft)) : 0.000  } NFT Purchased</div>
                        </div>
                    <div className="mb-20 d-flex flex-column align-items-end">
                    <label>Image</label>
                    <div className='upload-box text-center'>

{Img1 === null || Img1 === "" || Img1 === undefined ?(
  <>
  <input id="upload" type="file" hidden onChange = {captureFile1}/>
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
  <input id="upload" type="file" hidden onChange = {captureFile1}/>
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
  <img  key={Date.now()} src={Img1} alt="Img" className='img-fluid w-100 rounded-16' />            
  </label>
  </>
)}
  
</div>
                                    <ButtonLoad loading={loader} onClick={()=>participate()}>Upload Image & Participate</ButtonLoad>
                        {/* {assetOpt === false ? <><Button variant='grad' className='mb-20 py-1' */}
                        {/* //  onClick={()=>optinAsset() } */}
                          {/* style={{textTransform:"capitalize"}}>asset opt-in</Button><p style={{color:"red"}}>(Please Opt-In Asset to Participate)</p><br/></> : <></>} */}
                        {/* {parseFloat((ReactDomServer.renderToString(mapTotal))) != parseFloat((ReactDomServer.renderToString(mapGoal))) ? <Button variant='grad' className='mb-20 py-1' onClick={()=>handleShowDonate()} style={{textTransform:"capitalize"}}>participate</Button>:<></>} */}
                        {/* <Button variant='grad' className='mb-20 py-1' onClick={()=>handleShowDonate()} style={{textTransform:"capitalize"}}>participate</Button> */}
                    </div>
                    </div>

                    <div className="d-flex align-items-start justify-content-between">
                        <div className='d-flex flex-column'>
                            <strong className="mb-0">Total Allocation</strong>
                            <div className="p mb-0"> <strong>100</strong> NFT</div>
                            
                        </div>
                        <div className='d-flex flex-column align-items-end'>
                            <strong>Total Sold</strong>
                            <div className="p mb-0">
                               <strong> {totalNft} </strong>
                                NFT</div>
                            {/* <strong>ALGO</strong> */}
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            {/* <Modal
                show={address}
                size={'lg'}
                centered={true}
                onHide={handleCloseAddress}
                keyboard={false}
            >
                <Modal.Body className='p-md-5'>
                    <Button className='modal-close' onClick={handleCloseAddress} variant='reset'>
                        <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g opacity="1">
                            <path d="M17.5004 32.0832C9.44597 32.0832 2.91699 25.5542 2.91699 17.4998C2.91699 9.44546 9.44597 2.9165 17.5004 2.9165C25.5548 2.9165 32.0837 9.44546 32.0837 17.4998C32.0837 25.5542 25.5548 32.0832 17.5004 32.0832ZM17.5004 29.1665C20.5946 29.1665 23.562 27.9373 25.75 25.7494C27.9379 23.5615 29.1671 20.594 29.1671 17.4998C29.1671 14.4056 27.9379 11.4382 25.75 9.25026C23.562 7.06233 20.5946 5.83317 17.5004 5.83317C14.4062 5.83317 11.4387 7.06233 9.25076 9.25026C7.06283 11.4382 5.83367 14.4056 5.83367 17.4998C5.83367 20.594 7.06283 23.5615 9.25076 25.7494C11.4387 27.9373 14.4062 29.1665 17.5004 29.1665ZM17.5004 15.4378L21.6245 11.3121L23.6881 13.3757L19.5625 17.4998L23.6881 21.624L21.6245 23.6875L17.5004 19.5619L13.3762 23.6875L11.3126 21.624L15.4383 17.4998L11.3126 13.3757L13.3762 11.3121L17.5004 15.4378Z" fill="white"/>
                            </g>
                        </svg>
                    </Button>
                    {/* <Form className='form-area'>
                        <Form.Group className="mb-4" controlId="formBasicEmail">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" placeholder="Enter Address" value={addrAddAddress} onChange={(e) => setValueAddrAddAddress(e.target.value)}/>
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="formBasicPassword">
                            <Form.Label>Asset ID:</Form.Label>
                            <Form.Control type="text" placeholder="Enter Asset" />
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="formBasicPassword">
                            <Form.Label>Amount:</Form.Label>
                            <Form.Control type="text" placeholder="Enter Amount" value={valueAddAddress} onChange={(e) => setValueAddAddress(e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1'))}/>
                        </Form.Group>
                        <div className="text-end">
                            <Button variant="grad" onClick={() => addAddress(addrAddAddress, whiteID_global, valueAddAddress, appID_global)}>
                                Add Address
                            </Button>
                        </div>
                    </Form>
                    <p className='mt-md-5 mt-4 text-gray'>(Adding Address Function will be visible only to the App creator - Normal users can't access this function)</p>
                </Modal.Body>
            </Modal> */}
        </>
    );
};

export default PostCard;