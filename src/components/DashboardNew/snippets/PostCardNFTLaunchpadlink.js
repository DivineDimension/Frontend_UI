import React, { Component, useState, useEffect, useContext, useRef } from 'react';
import { Modal, Button, ProgressBar, Form, InputGroup, Container  } from 'react-bootstrap';
import Layout from '../LayoutT';
import Image from '../../../assets/images/peacock.png';
import aptos from '../../../assets/images/aptos.png';
import { useLocation} from 'react-router-dom';

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
import { createActivityTable, recordTxnLaunchpad } from '../../../awsdatafile';
// const algosdk = require('algosdk');
// const myAlgoWallet = new MyAlgoConnect();

const PostCard = (props) => {

    const [show, setShow] = React.useState(false);
    const [showDonate, setShowDonate] = React.useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const location = useLocation();  
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


    // console.log("image",Img1)
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

useEffect(()=>{getmydeposit()},[]);
const getmydeposit = async() =>{
    if(localStorage.getItem("EAWalletAddress")  === null || localStorage.getItem("EAWalletAddress")  === "" || localStorage.getItem("EAWalletAddress")  === " " ||  localStorage.getItem("EAWalletAddress") === '' || localStorage.getItem("EAWalletAddress") === undefined){
  
    } 
    else{
        try{
            let k =await fetch(`https://fullnode.testnet.aptoslabs.com/v1/accounts/${localStorage.getItem("EAWalletAddress")}/resource/${location.state.allData.deployerAddr}::Launch${location.state.allData.type}::Mydeposits`)
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
            let k =await fetch(`https://fullnode.testnet.aptoslabs.com/v1/accounts/${location.state.allData.deployerAddr}/resource/${location.state.allData.deployerAddr}::Launch${location.state.allData.type}::Cal`)
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


const reload = () => {
    sessionStorage.setItem("reloading", "true");
    window.location.reload(false); 
};

  

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
           
        handleShowLoad()  
        // toast.info("Participating",{autoClose: 5000});             
                                
 
          try {          
            // const response = await window.martian.connect();
            const sender = localStorage.getItem("EAWalletAddress");                    
         
            
              let newinstance;
              let txnHash1;
              let txnHash2;
               // Create a collection
               const randomNum = Math.floor(Math.random() * 1000) + 1;
               let nftName = location.state.allData.name+randomNum;
               console.log("nftname",nftName)
                const payloadclaim = {
                    type: "script_function_payload",
                    function: `${location.state.allData.deployerAddr}::Launch${location.state.allData.type}::participate`,      
                    type_arguments: ["0x1::aptos_coin::AptosCoin"],
                    arguments: [              
                      nftName,
                      "Launcpad",                     
                      "https://divinedimension.io",         
                      location.state.allData.ipfsurl, 
                      "0xdf47ac52cd9e0e78b95ae6ce91c09e4ea512cb034231e8ef315f75dbf1de2ec9"
                    ]
                  }

                  let transaction2Hash = await swappet(payloadclaim)
                  console.log("transactionHash", transaction2Hash); 
                  //   let id = "https://explorer.aptoslabs.com/txn/"+transactionHash;        
                  let id = "https://explorer.aptoslabs.com/txn/"+transaction2Hash+"?network=testnet";
                  toast.success(toastDiv(id));
                  await sleep(12000)  
                  await createActivityTable(localStorage.getItem('EAWalletAddress'),"NFT Launchpad",nftName,transaction2Hash,`Launch${location.state.allData.type}` )
                await recordTxnLaunchpad(nftName,location.state.allData.phase,location.state.allData.type,transaction2Hash,localStorage.getItem('EAWalletAddress'),location.state.allData.price,location.state.allData.ipfsurl);
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
                // await createActivityTable(sender,"Launchpad",sender,transaction2Hash,"Launchpad")

                toast.dismiss()
                toast.success(`Participated Successfully`,{autoClose: 5000});                                                                  
                handleHideLoad()
                done2();
              } catch(err){
                // console.log("Error sending File to IPFS: ")
                console.log(err)                                
                handleHideLoad()
              }
                              
              } catch (error) {              
                //   console.log("Error sending File to IPFS: ")
                  console.log(error)                                
                  handleHideLoad()
                  //window.location.reload(false)
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
    // let k = {
    //     name:"Divine Explorer NFT",
    //     startTime:"1681368652",
    //     endTime:1686398664,
    //     deployerAddr:"0x98c76c6286e9373f775ca68bd671df9adef7867ac8cd24167f571a6f060bcd66",
    //     ownerAddr:"0xdf47ac52cd9e0e78b95ae6ce91c09e4ea512cb034231e8ef315f75dbf1de2ec9",
    //     totalSale:100,
    //     imgurl:Image,
    //     price:"0.1"
    //    } 

    var us= location.state.allData.endTime;
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
<Layout>
    <Container>
        |
            
           
                    <div className="d-flex flex-wrap align-items-start justify-content-between">
                        <div className="mb-20 d-flex align-items-center mb-md-4 flex-wrap modal-head">
                            <img 
                            src={Logo} height={50} 
                             alt="logo" />
<Button>{location.state.allData.name}</Button>
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
                            <div className="p mb-20">{location.state.allData.price} APTOS = 1 NFT</div>
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
                                {parseFloat(totalNft * location.state.allData.price).toFixed(3)} / {location.state.allData.totalSale * location.state.allData.price} &nbsp;
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
            
                                    <ButtonLoad loading={loader} onClick={()=>participate()}> Participate</ButtonLoad>
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
             

            </Container>  
            </Layout>
        </>
    );
};

export default PostCard;