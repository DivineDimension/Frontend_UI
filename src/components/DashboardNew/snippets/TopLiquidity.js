import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { ToastContainer, Toast, Zoom, Bounce, toast} from 'react-toastify';

// import Icon1 from '../../assets/images/icon1.png';
// import Icon2 from '../../assets/images/icon2.png';
// import elem from '../../assets/images/elem-original.png';
// import tau from '../../assets/images/tau-original.png';
// import logo from '../../assets/images/logoasset.png';

// import taulogo from '../../assets/images/tau-original.png';
// import elemlogo from '../../assets/images/elem-original.png';
// import algologo from '../../assets/images/Algo.png';
// import fireDb from '../../NFTFolder/firebase';
// import einrlogo from '../../assets/images/EINR-original.png';
// import selecttoken from '../../assets/images/selecttoken.png';
// 
// imp/ort usdclogo from '../../assets/images/usdc-logo.png';


import { useHistory } from "react-router-dom";
import { getallNFt } from '../../../awsdatafile';
// import {calltokenForUsers,callapiforuserslist,numberofpairs} from '../apicallfunction';
// import moment from 'moment';
// import MyAlgoConnect from "@randlabs/myalgo-connect";
// import algosdk, { Algod,base64 } from "algosdk";
// import {postusertx,postuserdetail,updateusedetails} from '../apicallfunction';
// import { Button, Col, Container, Modal, Row, Breadcrumb } from 'react-bootstrap';
// import { AppId,escrowProgram } from '../swapConfig';
// import { getpostdataall } from '../../firedbstore';
// import { createtxhash ,updatepairhistory,getmethod} from '../apicallfunction';
// import { priceofalgoperusdc,priceOfCoin2,find_balance,checkassetin,checkotp,convert1,convert2,readingLocalstate,assetName,decodLocalState } from '../formula';

// import { assert2Reserve, assert1Reserve } from '../formula';
// import node from '../DashboardNew/nodeapi.json';
// import AlgodClient from 'algosdk/dist/types/src/client/v2/algod/algod';
// const baseServer = 'https://testnet-algorand.api.purestake.io/ps2';
// const port = '';

// const token = {
//    'X-API-Key': 'pOD5BAUCxq7InVPjo0sO01B0Vq4d7pD1ask5Ix43'
// }

// const algodClientGet = new algosdk.Algodv2(token, baseServer, port);
// const indexerClient = new algosdk.Indexer('', node['indexerclient'], '');
// const algodClient = new algosdk.Algodv2('',node['algodclient'], '');

// const myAlgoWallet = new MyAlgoConnect();
let data = "escrowProgram";
const TopLiquidity = () => {
  useEffect(() => {
    document.title = "Sigma | Analytics"
}, [])
    let history=useHistory();
    const[dbvalues,setdbvalue] = useState([])
    const [dt,setdt] = useState([]);
    const[ar1,setar1] = useState([]);
    const[ar2,setar2] = useState([]);
    const[ar3,setar3] = useState([]);
    const [s1, sets1] = useState("");
    const [s2, sets2] = useState("");
    const [ilt, setilt] = useState("");
    const[unclaimed_protocol_fees,setunclaimed_protocol_fees]= useState("");
    const[outstanding_asset1_amount,setoutstanding_asset1_amount]= useState("")
    const[outstanding_asset2_amount,setoutstanding_asset2_amount]= useState("")
    const[outstanding_liquidity_amount,setoutstanding_liquidity_amount]= useState("")
    const[shownvalue,setshownalue] = useState(false);
    const[a,seta] = useState([]);
    const [liquidity, setLiquidity] = React.useState(false);
    const [pair, setPair] = React.useState(false);
    const[aprice,setaprice]= useState([]);
    const handleClose = () => setShow(false);
    const [show, setShow] = React.useState(false);
    const [appId,setAppId] = useState("");
    const[b,setb] = useState([]);
    const [algoPrice, setAlgoPrice] = useState("");
    const [usdcPrice, setUsdcPrice] = useState("");
    const[c,setc] = useState([]);
    const[pageSize,setPageSize]=useState(0); 
   
    const[startingpage,setstap ] = useState(0);
    const[spvalue,setpvalue] = useState("");
  //console.log("avalue",a);
    const[amount2Value,setamount2] = useState("");
    const[amount1Value,setamount1] = useState("");
    // const handleLiquidiy = () => {setLiquidity(!liquidity); setPair(false)};
    const [handleLiquidiyopen,sethandleLiquidiyopen] = useState(false);
    const [handleLiquidiyclose,sethandleLiquidiyclose] = useState(false);
    const handlelopen =() =>{sethandleLiquidiyopen(true)}
    const handlelclose =() =>{sethandleLiquidiyopen(false)}
    const[a1balance,setas1balance]=useState("");
    const[a2balance,setas2balance]=useState("");
    const[samount1,setsAmount1] = useState("");
    const[samount2,setsAmount2] = useState("");
    const[rstate,setrstate]= useState([]);
    const[lofPar,setlengthOfPair] = useState("");
    const[pageoffset,setpageoffset] = useState("0");
    const[appOpted,setOpted] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage,setpostperpage] = useState(4);
    let appID_global = 1;

    let currentPosts;
    // Get current posts
  
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
  //console.log("bva",startingpage, indexOfLastPost)
    currentPosts = b.slice(startingpage, indexOfLastPost);
//console.log("current",currentPosts,indexOfLastPost);
// alert("entereing")
// console.log("statevalue",dbvalues)
  
const getmethd = async() =>{

  let k = await getallNFt();
  console.log("k",k.data2);
  setaprice(k.data2)

}

useEffect(()=>{getmethd()},[])
   
   
   
    ////console.log("lofpair",lofPar/10)
    //  if(parseInt(pageoffset) < parseInt((dbvalues.length / 4)-1))
    //  {
      // setpageoffset(pageoffset + 1)
      // let k = await callapiforuserslist(pageoffset + 1);
      // currentPosts = b.slice(indexOfLastPost, indexOfLastPost + 4);
 // console.log("K",k)
  //  setb(k);
    //  }
    
// console.log("not enter",postsPerPage,(b.length-4))
  //  if(postsPerPage > (b.length-4))
  //  {
  //    if((b.length)-postsPerPage > 0){
  //     // console.log("not enter")
  //       let k = (b.length)-postsPerPage;
  //       setpostperpage(postsPerPage+k)
  //       // setstap(startingpage)
  //       currentPosts= b.slice(indexOfLastPost, indexOfLastPost+k);
  //    }
     
  //  }
  //  else{
  //   setpostperpage(postsPerPage+4)
  //   // setstap(startingpage)
  //    currentPosts= b.slice(indexOfLastPost, indexOfLastPost+4);
  //  //console.log("current",currentPosts);
  //  }
    
  //  }
   
 //console.log("bvalue",b)


    return (
        <div className='mb-5'>


          {/* <center><h6>Before Add Liquidity go to Swap Page and do App Opt-In</h6></center> */}
          {/* <br></br> */}
            <h2 className="h3 text-uppercase mb-40">NFT Stats</h2>
           
           
           
            <ToastContainer position='top-center' draggable = {false} transition={Zoom} autoClose={8000} closeOnClick = {false}/>

            <div className="table-group-outer table-group-lg">
                <div className="table-group-head">
                    <div className="table-group-tr">
                        <div className="table-group-th">Name</div> 
                        
                        {/* th-head */}
                       
                        <div className="table-group-th"></div>
                        {/* <div className="table-group-th"></div> */}
                        <div className="table-group-th">
                            {/* <Dropdown>
                                <Dropdown.Toggle variant="reset" id="dropdown-basic"> */}
                                    Creator Address
                                {/* </Dropdown.Toggle> */}

                                {/* <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                </Dropdown.Menu> */}
                            {/* </Dropdown> */}
                        </div>
                        <div className="table-group-th">ownerAddress </div>
                        {/* <div className="table-group-th"></div> */}
                        <div className="table-group-th">Type </div>
                        <div className="table-group-th">socialLink </div>
                        <div className="table-group-th"></div>
                        <div className="table-group-th">createdTime </div>

                        {/* <div className="table-group-th">price</div> */}
                        {/* <div className="table-group-th">POOL</div> */}
                        {/* <div className="table-group-th"></div> */}
                        {/* <div className="table-group-th text-end">fees (yearly)</div> */}
                    </div>
                </div>
               

                    {/* {dbvalues ===null || dbvalues ==="" || dbvalues ===undefined || dbvalues.length == 0?(<> */}
                      
                        {/* <div className="table-group-body text-gray-AA"> */}
               {/* Loading ....  */}
               {/* <Button className='btn w-100 mb-20 text-none btn-grad btn-xl' onClick={()=>pass(4)}>VIEW</Button> */}

               {/* <img src="https://c.tenor.com/FBeNVFjn-EkAAAAS/ben-redblock-loading.gif"/> */}
               {/* <span className="d-block text-center">
                  <svg version="1.1" id="L9" width="80" height="80" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                      viewBox="0 0 100 100" enable-background="new 0 0 0 0">
                        <path fill="#fff" d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
                          <animateTransform 
                            attributeName="transform" 
                            attributeType="XML" 
                            type="rotate"
                            dur="1s" 
                            from="0 50 50"
                            to="360 50 50" 
                            repeatCount="indefinite" />
                      </path>
                    </svg>
                </span> */}
               {/* <div className="table-group-body text-gray-AA" >

           
                    </div> */}
{/* </div> */}
                    {/* </>):(<> */}
                    
                        {aprice.map((pageSize)=>{
                        //    if(i<pageSize)
// console.log("pagesize",(pageSize.fees/1000000)* algoPrice)
                            return(<>
                            <div className=" text-gray-AA" >
                            {/* <img src="https://c.tenor.com/FBeNVFjn-EkAAAAS/ben-redblock-loading.gif"/> */}
                            
<div className="table-group-tr"> 
<div className="table-group-td">
    <div className="d-flex align-items-center td-cell">
    <img src={pageSize.imagePath} alt='icon'className='me-2 avatar-pic' />
        {/* <img src={checklogo(pageSize.AssetName1,pageSize.AssetId1)} alt='icon' /> */}
        {/* <img src={checklogo(pageSize.AssetName2,pageSize.AssetId2)} alt='icon' /> */}
        <span className=' text-truncate'>{pageSize.nftName ? pageSize.nftName:""}</span>
    </div>
</div>
<div className="table-group-td"></div>  

{/* <div className="table-group-td"></div> */}
{/* {(pageSize.AssetName1=== "ALGO" || pageSize.AssetName2 ==="ALGO") ? 
(<>
<div className="table-group-td">$ {parseFloat((pageSize.tvl/1000000)* (algoPrice/1000000)).toFixed(3)}</div>
</>) :
 (pageSize.AssetName1=== "USDC" || pageSize.AssetName2 ==="USDC") ?
 (<>
 <div className="table-group-td">$ {parseFloat((pageSize.tvl/1000000) * usdcPrice).toFixed(3)}</div>
 </>):
 (<>
 <div className="table-group-td">{parseFloat(pageSize.tvl/1000000).toFixed(3)}</div>
 </>)} */}
 {/* <div className="table-group-td">{pageSize.creatorAddress ? (pageSize.creatorAddress).slice(0,5) :""} ...{pageSize.creatorAddress ? (pageSize.creatorAddress).slice(10,15) :""}<a className='mb-3 ms-3 text-white d-flex align-items-center btn-link' href={"https://explorer.aptoslabs.com/account/" + pageSize.creatorAddress + "?network=testnet"} target="_blank" rel="noreferer noreferrer">
                            <svg class="white me-2" width="16" height="16" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M15.8333 15.8333H4.16667V4.16667H10V2.5H4.16667C3.24167 2.5 2.5 3.25 2.5 4.16667V15.8333C2.5 16.75 3.24167 17.5 4.16667 17.5H15.8333C16.75 17.5 17.5 16.75 17.5 15.8333V10H15.8333V15.8333ZM11.6667 2.5V4.16667H14.6583L6.46667 12.3583L7.64167 13.5333L15.8333 5.34167V8.33333H17.5V2.5H11.6667Z"></path></svg>
                            View on explorer
                        </a> </div> */}
<div className="table-group-td">
  <a href={"https://explorer.aptoslabs.com/account/" + pageSize.creatorAddress + "?network=testnet"} target="_blank" rel="noreferer noreferrer">
    {pageSize.creatorAddress ? (pageSize.creatorAddress).slice(0,5) : ""} ...{pageSize.creatorAddress ? (pageSize.creatorAddress).slice(10,15) : ""}
    {/* <svg class="white me-2" width="16" height="16" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.8333 15.8333H4.16667V4.16667H10V2.5H4.16667C3.24167 2.5 2.5 3.25 2.5 4.16667V15.8333C2.5 16.75 3.24167 17.5 4.16667 17.5H15.8333C16.75 17.5 17.5 16.75 17.5 15.8333V10H15.8333V15.8333ZM11.6667 2.5V4.16667H14.6583L6.46667 12.3583L7.64167 13.5333L15.8333 5.34167V8.33333H17.5V2.5H11.6667Z"></path>
    </svg> */}
   
  </a>
</div>

{/* 
 <div className="table-group-td">{pageSize.ownerAddress ? (pageSize.ownerAddress).slice(0,5) :""} ...{pageSize.ownerAddress ? (pageSize.ownerAddress).slice(10,15) :""}<a className='mb-3 ms-3 text-white d-flex align-items-center btn-link' href={"https://explorer.aptoslabs.com/account/" + pageSize.ownerAddress  + "?network=testnet"} target="_blank" rel="noreferer noreferrer">
                            <svg class="white me-2" width="16" height="16" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M15.8333 15.8333H4.16667V4.16667H10V2.5H4.16667C3.24167 2.5 2.5 3.25 2.5 4.16667V15.8333C2.5 16.75 3.24167 17.5 4.16667 17.5H15.8333C16.75 17.5 17.5 16.75 17.5 15.8333V10H15.8333V15.8333ZM11.6667 2.5V4.16667H14.6583L6.46667 12.3583L7.64167 13.5333L15.8333 5.34167V8.33333H17.5V2.5H11.6667Z"></path></svg>
                            View on explorer
                        </a></div> */}

<div className="table-group-td">
  <a href={"https://explorer.aptoslabs.com/account/" + pageSize.ownerAddress + "?network=testnet"} target="_blank" rel="noreferer noreferrer">
    {pageSize.ownerAddress ? (pageSize.ownerAddress).slice(0,5) : ""} ...{pageSize.ownerAddress ? (pageSize.ownerAddress).slice(10,15) : ""}
    {/* <svg class="white me-2" width="16" height="16" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.8333 15.8333H4.16667V4.16667H10V2.5H4.16667C3.24167 2.5 2.5 3.25 2.5 4.16667V15.8333C2.5 16.75 3.24167 17.5 4.16667 17.5H15.8333C16.75 17.5 17.5 16.75 17.5 15.8333V10H15.8333V15.8333ZM11.6667 2.5V4.16667H14.6583L6.46667 12.3583L7.64167 13.5333L15.8333 5.34167V8.33333H17.5V2.5H11.6667Z"></path>
    </svg> */}
   
  </a>
</div>
{/* <div className="table-group-td">{parseFloat(pageSize.tvl/1000000).toFixed(3)}</div> */}
{/* <div className="table-group-td"></div> */}
<div className="table-group-td">{pageSize.nftType  ? pageSize.nftType:"" }</div>
{/* <div className="table-group-td"></div> */}
<div classname="table-group-td">{pageSize.socialLink ? pageSize.socialLink:""}</div>
<div className="table-group-td"></div>
<div classname="table-group-td">{pageSize.createdTime ? pageSize.createdTime:""}</div>
{/* <div className="table-group-td">{pageSize.nftPrice?pageSize.nftPrice:"0.0"}</div> */}
{/* <div className="table-group-td text-truncate">ELEMENT POOL {(pageSize.asetName1)}-{pageSize.asetName2}</div> */}
{/* <div className="table-group-td"> */}
    {/* <div className="d-flex align-items-center">
    <Button variant='arrow' className="btn btn-grad" onClick={()=>pass(pageSize)} >
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
        <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
    </svg>
    </Button>
    <Button variant='arrow' className="btn btn-grad" onClick={()=>buttonclick(pageSize)}>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left-right" viewBox="0 0 16 16">
        <path fillRule="evenodd" d="M1 11.5a.5.5 0 0 0 .5.5h11.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 11H1.5a.5.5 0 0 0-.5.5zm14-7a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H14.5a.5.5 0 0 1 .5.5z"/>
    </svg>
    </Button>
    </div> */}
    {/* </div> */}
{/* <div className="table-group-td text-end">{pageSize.tvlvalue}</div> */}
</div>
</div></>)
 
})}
{/* </>)} */}
                    
                
            </div>

            <div className="pagination-footer d-flex align-items-center justify-content-between">
                {/* <p>showing {startingpage+1}-{startingpage + 4} from {parseFloat(dbvalues.length/4).toFixed(0)} Page</p> */}

                <div className="d-flex pagination align-items-center">
                    {/* <Button variant='arrow'  onClick={()=>{setpostcall()}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                        </svg>
                    </Button>
                    <Button variant='arrow' onClick={()=>{setincrm()}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                        </svg>
                    </Button> */}

                    {/* <Button variant='page' onClick={()=>{setpostcall()}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#fff" class="bi m-0 bi-chevron-left" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                        </svg>
                    </Button>
                    <Button variant='page' onClick={()=>{setincrm()}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#fff" class="bi m-0 bi-chevron-right" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                        </svg>
                    </Button> */}
                </div>
            </div>
            


        </div>
    );
};

export default TopLiquidity;
