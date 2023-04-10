import React,{useEffect,useState,useContext} from 'react';
import { Card, Col} from 'react-bootstrap';
import ButtonLoad from 'react-bootstrap-button-loader';
import firebase from '../../NFTFolder/firebase';
import fireDb from '../../NFTFolder/firebase';
import { ToastContainer, Toast, Zoom, Bounce, toast} from 'react-toastify';
import {abiroyalty} from './Royaltynftcontract';
import web3 from './web3';
import { useHistory } from "react-router-dom";
import configfile from '../../NFTFolder/config.json'
import {DataContext} from "../../App";
import { swappet } from './config';
import { createActivityTable, getuserDetailsbywallet, putByPrice, putBySale, updateAuctionDetails, updateLandByPrice } from '../../awsdatafile';
import { landAbi,dimeTokenAbi } from '../../abi&contractfiles/abi';
import { landAddress ,dimeTokenAddress} from '../../abi&contractfiles/contractaddress';

const CreateTab =({x})=>{
    console.log("Blog1",x)
    const EAWalletbalances = useContext(DataContext);            
    let history=useHistory();
    const handleShowLoad = () => setLoader(true);
    const handleHideLoad = () => setLoader(false);
    const[getIProfile,setgetIProfile]=useState([""]);           
    // const [getprices,setprices]=useState("")    
    const[loader, setLoader] = useState(false);   
    const[allowances,setallowance]=useState("");           
    const [getprices,setprices]=useState("")   
    const[dbalance,setdbalance] = useState(""); 
    let caddressnew = "0x069918e79642121dcd5e88565efdd16b1ba9421dfcfed66eff3a1c400efcfc3d"
    let pooladdressfinal = "0xc78f87c3e587d53bf4821a10472c4ba973ac57815d7901d4d3224347f484cd7f"; 
    // const [getduplicateAssetValue2new,setduplicateAssetValue2new] = useState("");     
    // const [getduplicateAssetValue2newEscrow,setduplicateAssetValue2newEscrow] = useState("");     
    const[userprofile,setUserProfile] = useState([]);

    
    const dbcallProfile=async()=>{   
        
        // let amout = 1000;
        // console.log("amount",amout.toString())
      if(localStorage.getItem("walletAddress")  === null || localStorage.getItem("walletAddress")  === "" || localStorage.getItem("walletAddress")  === " " || localStorage.getItem("walletAddress") === undefined || localStorage.getItem("walletAddress") === ''){
      }
      else{
        const accounts = await web3.eth.getAccounts();
        const dimecontract = new web3.eth.Contract(dimeTokenAbi, dimeTokenAddress);
        let allowance = await dimecontract.methods.allowance(localStorage.getItem("walletAddress"),landAddress).call();
        setallowance(allowance)
        let balance = await dimecontract.methods.balanceOf(localStorage.getItem("walletAddress")).call();
        setdbalance(balance)
        console.log("dbbalance",balance)
        
      }        
    }    
    useEffect(()=>{dbcallProfile()},[])        
    
    const approve = async(x) =>{
        handleShowLoad()  
        const accounts = await web3.eth.getAccounts();
        const dimecontract = new web3.eth.Contract(dimeTokenAbi, dimeTokenAddress);
        let amountmul = 100000000000000000000;
        let hash =  await dimecontract.methods.approve(landAddress,web3.utils.toBN(amountmul)).send({from:accounts[0]});
        console.log("hash",hash.transactionHash)
        let transaction2Hash=hash.transactionHash;
        let id = "https://sepolia.etherscan.io/tx"+transaction2Hash;
        //let id = "https://explorer.aptoslabs.com/txn/"+res2CS.hash;
        toast.success(toastDiv(id));
        // await sleep(12000)  
        try{
            setallowance(10000);
           
            // await createActivityTable(localStorage.getItem('EAWalletAddress'),"Update price", pooladdressfinal,transaction2Hash,"Royalty-NFT")
            toast.success(`Approved Successfully`,{autoClose: 5000});            
                //await saledb()
                handleHideLoad()
                // await done();
           await  dbcallProfile()
        }catch(error){
            console.log("Error",error)
            console.log(error)                                
            handleHideLoad()
            window.location.reload(false)
        }  
        
    }



    const setpricedb=async(b)=>{   
        let amountmul=(parseFloat(getprices)*1000000000000000000); 
            

        // let amt ;
        // if(b.bidAmount > 0){
        //     amt = b.bidAmount;
        // }
        // else{
        //     amt = b.price;
        // }
        // console.log("amountmul",parseInt(amountmul),parseInt(amt))
        if(getprices === null || getprices === undefined || getprices === "" ){
            toast.warning(`please enter price`,{autoClose:5000})
            handleHideLoad()            
        }else if(isNaN(getprices))
        {        
            toast.warning(`please valid number`,{autoClose:5000})
            handleHideLoad()            
        }
        // // else if(getprices === "0" || parseInt(getprices) === 0){
        // else if(parseInt(amountmul) < parseInt(amt)){

        //     toast.warning(`please enter above Higgestprice price`,{autoClose:5000})
        //     handleHideLoad()            
        // }
        // else if(getprices === "00" || getprices === "000" || getprices === "0000" || getprices === "00000" || getprices === "000000" || getprices === "0000000"){
        //     toast.warning(`you are entered zeros`,{autoClose:5000})
        //     handleHideLoad()            
        // }
        // else if(getprices.length >= 7 ){                                    
        //     toast.warning(`you are entered Maximum Values`,{autoClose:5000})
        //     handleHideLoad()            
        // }
        // else if(EAWalletbalances === "" || EAWalletbalances === "0" || EAWalletbalances === undefined || EAWalletbalances === null){
        //     toast.warning(`Insufficient balance to NFT Updating Price `,{autoClose:5000})
        //     handleHideLoad()            
        // }
        else if(localStorage.getItem('walletAddress') === null || localStorage.getItem('walletAddress') === "" || localStorage.getItem('walletAddress') === undefined || localStorage.getItem('walletAddress') === " "){
            toast.warning(`please connect your wallet`,{autoClose:5000})
            handleHideLoad()            
        }        
        else{
        // let minbalance=await minAlgoBalance()
        // if(minbalance < (961000+2000)){
        //     toast.error("Your Algo balance is low. Please get more Algos from dispenser",{autoClose:5000});              
        //     handleHideLoad()
        // }
        // else{                          
        handleShowLoad()             
        toast.info("Bidding is in progress",{autoClose:5000});                         
        try {  
            
            
            console.log("AmountLog",amountmul);
            const accounts = await web3.eth.getAccounts();
            const landcontract = new web3.eth.Contract(landAbi, landAddress);
            let hash =  await landcontract.methods.putForSale([b.assetId],[web3.utils.toBN(amountmul)]).send({from:accounts[0]});
            console.log("hash",hash.transactionHash)
            let transaction2Hash=hash.transactionHash

         
              
              //await storeDbUpdate(valuess,address,caddress,Prices);
              let calc=(parseFloat(getprices)*100000000)
              let id = "https://sepolia.etherscan.io/tx"+transaction2Hash;
              //let id = "https://explorer.aptoslabs.com/txn/"+res2CS.hash;
              toast.success(toastDiv(id));
              await sleep(12000)       
            //   await storeDbUpdate(valuess,address,caddressnew,calc,"AptosNFTR","AptosNFTRS");        
            // let getaaaa=new web3.eth.Contract(abiroyalty,b.EscrowAddress);
            // const accounts = await  web3.eth.getAccounts();
            // await getaaaa.methods.setTokenState(b.Assetid,"true").send({
            // from:localStorage.getItem('EAWalletAddress'),
            // gas: 210000,
            // //gasPrice: '20000000000'
            // });     
            // await getaaaa.methods.setTokenPrice(b.Assetid,web3.utils.toBN(amountmul),parseInt(b.SocialLink)).send({
            //     from:localStorage.getItem('EAWalletAddress'),              
            //     gas: 210000,
            //     //gasPrice: '20000000000'
            // })
            // const priceamount = await getaaaa.methods.items(b.Assetid).call();
            // console.log(priceamount.price)    
            // await getaaaa.methods.approve(b.EscrowAddress,b.Assetid).send({
            //     from:localStorage.getItem('EAWalletAddress'),
            //     gas: 210000,
            //     //gasPrice: '20000000000'
            // })            
            // let id = "https://explorer.aptoslabs.com/txn/"+res2CS.hash+"?network=testnet";
            // //let id = "https://explorer.aptoslabs.com/txn/"+res2CS.hash;
            // toast.success(toastDiv(id))
            // let cl=res2CS.hash;          
            let cl = "";
            //db here          
            let dateset=new Date().toDateString();
            //fireDb.auth().signInAnonymously().then((responses)=>{                     
            // fireDb.database().ref(`EPolygonNFTR/${localStorage.getItem('EAWalletAddress')}`).child(b.keyId).update({
            //     Assetid:b.Assetid,Imageurl:b.Imageurl,NFTPrice:parseFloat(amountmul),EscrowAddress:localStorage.getItem('EAWalletAddress'),keyId:b.keyId,
            //     NFTName:b.NFTName,userSymbol:b.userSymbol,Ipfsurl:b.Ipfsurl,ownerAddress:b.ownerAddress,previousoaddress:localStorage.getItem('EAWalletAddress'),
            //     TimeStamp:dateset,NFTDescription:b.NFTDescription,HistoryAddress:b.HistoryAddress,Appid:b.Appid,valid:b.valid,
            //     CreatorAddress:b.CreatorAddress,NFTType:b.NFTType,NFTChannel:b.NFTChannel,SocialLink:b.SocialLink,NFTModel:b.NFTModel
            // }).then(()=>{  
            //     let refactivity=fireDb.database().ref(`EPolygonactivitytable/${localStorage.getItem('EAWalletAddress')}`);   
            //     const db = refactivity.push().key;                         
            //     refactivity.child(db).set({
            //         Assetid:b.Assetid,Imageurl:b.Imageurl,NFTPrice:parseFloat(amountmul),EscrowAddress:"priceupdated",keyId:db,
            //         NFTName:b.NFTName,userSymbol:b.userSymbol,Ipfsurl:b.Ipfsurl,ownerAddress:b.ownerAddress,previousoaddress:localStorage.getItem('EAWalletAddress'),
            //         TimeStamp:dateset,NFTDescription:cl,HistoryAddress:b.HistoryAddress,Appid:b.Appid,valid:b.valid,
            //         CreatorAddress:b.CreatorAddress,NFTType:b.NFTType,NFTChannel:b.NFTChannel,SocialLink:b.SocialLink,NFTModel:b.NFTModel
            // })
            // .then(async()=>{                                                    
            //     toast.success(`NFT Price Updated Successfully`,{autoClose: 5000});            
            //     handleHideLoad()
            //     done()
            //     //await saledb()
            //     })                        
            // })  
            try{
                // await updateAuctionDetails(amountmul.toString(),b.assetId);
                await updateLandByPrice(amountmul.toString(),b.assetId);
                // await createActivityTable(localStorage.getItem('EAWalletAddress'),"Update price", pooladdressfinal,transaction2Hash,"Royalty-NFT")
                toast.success(`Bidded Successfully`,{autoClose: 5000});            
                    //await saledb()
                    handleHideLoad()
                    await done();
            }catch(error){
                console.log("Error",error)
                console.log(error)                                
                handleHideLoad()
                window.location.reload(false)
            }          
            //})
            //db end here                  
            } catch (err) {
                    console.error(err);            
                    toast.error(`your browser appearing issue`,{autoClose: 5000});            
                    handleHideLoad()            
            }                
        }            
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    const done=async()=>{
        await sleep(7000);
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
    return(           
                <Col xxl={3} md={4} sm={6} xs={12} className='mb-4'>
                <Card className='card-dash p-3 d-block border-0'>
                    <div className='card-img text-center mb-2'>                        
                            <img src={x.imagePath} alt="image" className='img-fluid' />                        
                    </div>
                    <div className='d-flex mb-2 justify-content-between flex-wrap align-items-center'>                        
                    </div>
                    <h5 className='mb-2'>{x.name} <br />
                                        </h5>
                                        <p className='subheading mb-0'>
                                        <span className='text-success'>
                                            {x.description === null || x.description === "" || x.description === undefined ?(
                                                <>{configfile.nullvalue}</>
                                            ):(
                                                <h6>
                                                    {x.description}
                                                </h6>
                                            )}                                            
                                        </span>
                                        <br/>
                                        {/* {x.bidAmount === "0" || x.bidAmount === "null" ? (<>
                                            <h6 className='mb-2'>Highest Bid Price: {x.price ? (x.price/1000000000000000000) : "0.0"}</h6>
                                        </>):(<>
                                            <h6 className='mb-2'>Highest Bid Price: {x.bidAmount ? (x.bidAmount/1000000000000000000) : (x.price/1000000000000000000)}</h6>
                                        </>)} */}
                                        
                                        </p>
                                        <br />                    
                        {/* {x.price === "" || x.price === null || x.price === undefined || x.price === 0 ?(
                        <>                                             */}
                        {/* <h6 className='mb-2'>Price: {x.price ? (x.price/1000000000000000000) : "0.0"}</h6> */}
                        {/* <h5 className='d-flex mb-3 align-items-center'> */}
                            {/* <img src={userprofile.bgvImagePath} alt="logo" className='me-2 avatar-pic' />                         */}
                        <div className="input-group-max d-flex align-items-center text-nowrap px-3 input-group-max-lg w-100">
                        <input type="number" placeholder='Enter Price' className='form-control' value={((getprices))} onChange={event => setprices((event.target.value))} />
                        </div>
                        {/* </h5>  */}
                        <br/>

                        {/* {dbalance === "" || dbalance === null || dbalance === undefined || dbalance === 0 ||dbalance === "0" ? (<>
                            <ButtonLoad  variant="blue" className='w-100' >Dont have Dime Token</ButtonLoad>   
                        
                        </>):(<>
                            {allowances === "" || allowances === null || allowances === undefined || allowances === 0 || allowances === "0"  ? (<>
                            <ButtonLoad loading={loader} variant="blue" className='w-100' onClick={()=>{approve()}}>Approve</ButtonLoad>                                        

                        </>):(<>
                            <ButtonLoad loading={loader} variant="blue" className='w-100' onClick={()=>{setpricedb(x)}}>Bid </ButtonLoad>                                        

                        </>)}                                    

                        </>)} */}
                        <ButtonLoad loading={loader} variant="blue" className='w-100' onClick={()=>{setpricedb(x)}}>Update Price and Resale</ButtonLoad>                                        
                        {/* </>
                    ):(
                        <>
                        <h6 className='mb-2'>Price</h6><h5 className='d-flex mb-3 align-items-center'><img src={userprofile.bgvImagePath} alt="logo" className='me-2 avatar-pic' />{x.nftPrice/100000000}</h5>
                        <ButtonLoad loading={loader} variant="blue" className='w-100' onClick={()=>{saledb(x)}}>Sale</ButtonLoad>                          
                        </>
                    )} */}
                </Card>
                </Col>                
        
    )
}

export default CreateTab