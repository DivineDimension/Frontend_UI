import React,{useEffect,useState,useContext} from 'react';
import { Card, Col} from 'react-bootstrap';
import ButtonLoad from 'react-bootstrap-button-loader';
import firebase from '../../NFTFolder/firebase';
import fireDb from '../../NFTFolder/firebase';
import { ToastContainer, Toast, Zoom, Bounce, toast} from 'react-toastify';
import { useHistory } from "react-router-dom";
import configfile from '../../NFTFolder/config.json'
import web3 from './web3';
import {abi} from './Normalnftcontract';
//import node from './nodeapi.json';
import {DataContext} from "../../App";
import { swappet } from './config';
import { createActivityTable, getuserDetailsbywallet, putByPrice, putBySale } from '../../awsdatafile';
const CreateTabNFT =({x})=>{        
    let history=useHistory();
    const EAWalletbalances = useContext(DataContext);        
    const handleShowLoad = () => setLoader(true);
    const handleHideLoad = () => setLoader(false);
    const[getIProfile,setgetIProfile]=useState([""]);           
    const [getprices,setprices]=useState("")    
    const[loader, setLoader] = useState(false);   
    let caddressnew = "0x069918e79642121dcd5e88565efdd16b1ba9421dfcfed66eff3a1c400efcfc3d"
    let pooladdressfinal = "0xc78f87c3e587d53bf4821a10472c4ba973ac57815d7901d4d3224347f484cd7f"; 
    const[userprofile,setUserProfile] = useState([]);
    


    const dbcallProfile=async()=>{            
      if(localStorage.getItem("EAWalletAddress")  === null || localStorage.getItem("EAWalletAddress")  === "" || localStorage.getItem("EAWalletAddress")  === " " || localStorage.getItem("wallet") === undefined || localStorage.getItem("EAWalletAddress") === ''){
      }
      else{

        let k = await getuserDetailsbywallet(localStorage.getItem("EAWalletAddress"))
        setUserProfile(k.data2);
        //firebase.auth().signInAnonymously().then(async(response)=>{           
          const hasRestaurant = await fireDb.database()
          .ref(`EPuserprofile/${localStorage.getItem('EAWalletAddress')}`)
          .orderByKey().limitToFirst(1).once('value')
          .then(res => res.exists());            
          if(hasRestaurant)
          {
              let r=[];
          try {    
          //firebase.auth().signInAnonymously().then((response)=>{           
          firebase.database().ref("EPuserprofile").child(localStorage.getItem('EAWalletAddress')).on("value", (data) => {          
              if (data) {  
                  try{
  
                  
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
              }   catch(e){                      
              }                 
              }
              else{
              setgetIProfile([""]);  
              }
              setgetIProfile(r);
          });         
          //})         
          } catch (error) {          
          }                
          }else{
              setgetIProfile([""]);  
          }   
        //})         
      }        
    }    
    useEffect(()=>{dbcallProfile()},[])        



    const saledb =async(b) =>{        
        if(localStorage.getItem('EAWalletAddress') === null || localStorage.getItem('EAWalletAddress') === "" || localStorage.getItem('EAWalletAddress') === undefined || localStorage.getItem('EAWalletAddress') === " "){            
            toast.warn(`please connect your wallet`,{autoClose: 5000});            
            handleHideLoad()            
        }else if(localStorage.getItem('EAWalletAddress') === b.ownerAddress){   
            handleShowLoad()                             
            toast.info("Updating The Sale of NFT",{autoClose:5000}); 
            // const response = await window.martian.connect();
            // const address = response.address;
            // const options = {
            //   max_gas_amount: "10000"
            // }
      
            //let pricecalculation = ((parseFloat(valuess.NFTPrice)/1.5)*100) 
      
            let property_version = 0 
            const payloadclaim = {
                type: "script_function_payload",
                function: `${caddressnew}::creating6::add_asset`,      
                type_arguments: ["0x1::aptos_coin::AptosCoin"],
                arguments: [
                  pooladdressfinal,
                  b.creatorAddress,                     
                  b.nftName,         
                  b.nftName,         
                  property_version,        
                  1
                ]
              }    
            // const txn_request2 =  await window.martian.generateTransaction(address, payloadclaim,options)
            // console.log("Req",txn_request2)
            // const signed_txn2 = await  window.martian.signTransaction(txn_request2)
            // console.log("signedTx",signed_txn2)
            // const res2 = await window.martian.submitTransaction(signed_txn2)        
            // console.log("TransferV",res2)     
            
            let transactionHash = await swappet(payloadclaim)
            console.log("transactionHash", transactionHash); 
              let id = "https://explorer.aptoslabs.com/txn/"+transactionHash;   
              toast.success(toastDiv(id)); 
            await sleep(12000)                
            // let getaaaa=new web3.eth.Contract(abi,b.EscrowAddress);
            // const accounts = await  web3.eth.getAccounts();
            // await getaaaa.methods.transferFrom(accounts[0],"0xFC32107b3153322F4055bf5Ba7de21978E9E3Dfc",b.Assetid).send({
            //   from:localStorage.getItem('EAWalletAddress')
            // });
            let dateset=new Date().toDateString();      
            //firebase.auth().signInAnonymously().then((response)=>{           
            // fireDb.database().ref(`EPolygonNFTNS/${localStorage.getItem('EAWalletAddress')}`).child(b.keyId).set({
            //     Assetid:b.Assetid,Imageurl:b.Imageurl,NFTPrice:b.NFTPrice,EscrowAddress:b.EscrowAddress,keyId:b.keyId,
            //     NFTName:b.NFTName,userSymbol:b.userSymbol,Ipfsurl:b.Ipfsurl,ownerAddress:b.ownerAddress,previousoaddress:b.previousoaddress,
            //     TimeStamp:dateset,NFTDescription:b.NFTDescription,HistoryAddress:b.HistoryAddress,Appid:b.Appid,valid:b.valid,
            //     CreatorAddress:b.CreatorAddress,NFTType:b.NFTType,NFTChannel:b.NFTChannel,SocialLink:b.SocialLink,NFTModel:b.NFTModel
            //   }).then(()=>{
            //     fireDb.database().ref(`EPolygonNFTN/${localStorage.getItem('EAWalletAddress')}`).child(b.keyId).remove();
            //     let refactivity=fireDb.database().ref(`EPolygonactivitytable/${localStorage.getItem('EAWalletAddress')}`);   
            //     const db = refactivity.push().key;                         
            //     refactivity.child(db).set({
            //     Assetid:b.Assetid,Imageurl:b.Imageurl,NFTPrice:b.NFTPrice,EscrowAddress:"saleNFT",keyId:db,
            //     NFTName:b.NFTName,userSymbol:b.userSymbol,Ipfsurl:b.Ipfsurl,ownerAddress:b.ownerAddress,previousoaddress:localStorage.getItem('EAWalletAddress'),                
            //     TimeStamp:dateset,NFTDescription:b.NFTDescription,HistoryAddress:b.HistoryAddress,Appid:b.Appid,valid:b.valid,
            //     CreatorAddress:b.CreatorAddress,NFTType:b.NFTType,NFTChannel:b.NFTChannel,SocialLink:b.SocialLink,NFTModel:b.NFTModel
            // })
            //                 .then(async()=>{                                                                                
            //         handleHideLoad()                    
            //         toast.success(`Moving NFT to Sale`,{autoClose: 5000});                                
            //         await done();                    
            //     })                                          
            //   })
            try{
                await putBySale("yes",b.keyValue);
                await createActivityTable(localStorage.getItem('EAWalletAddress'),"Put for Sale", pooladdressfinal,transactionHash,"NFT")
                toast.success(`NFT Put for Sale Successfully Done`,{autoClose: 5000});            
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
        }        
    }
    
    const setpricedb=async(b)=>{   
        console.log("price",getprices,x)     
        if(getprices === null || getprices === undefined || getprices === "" ){
            toast.warning(`please enter price`,{autoClose:5000})
            handleHideLoad()            
        }else if(isNaN(getprices))
        {        
            toast.warning(`please valid number`,{autoClose:5000})
            handleHideLoad()            
        }
        else if(getprices === "0"){
            toast.warning(`please enter above 0 price`,{autoClose:5000})
            handleHideLoad()            
        }
        else if(getprices === "00" || getprices === "000" || getprices === "0000" || getprices === "00000" || getprices === "000000" || getprices === "0000000"){
            toast.warning(`you are entered zeros`,{autoClose:5000})
            handleHideLoad()            
        }
        else if(getprices.length >= 7 ){                                    
            toast.warning(`you are entered Maximum Values`,{autoClose:5000})
            handleHideLoad()            
        }        
        else if(EAWalletbalances === "" || EAWalletbalances === "0" || EAWalletbalances === undefined || EAWalletbalances === null){
            toast.warning(`Insufficient balance to update NFT Price `,{autoClose:5000})
            handleHideLoad()            
        }
        else if(localStorage.getItem('EAWalletAddress') === null || localStorage.getItem('EAWalletAddress') === "" || localStorage.getItem('EAWalletAddress') === undefined || localStorage.getItem('EAWalletAddress') === " "){
            toast.warning(`please connect your wallet`,{autoClose:5000})
            handleHideLoad()         
        }        
        else{        
        try{
        handleShowLoad()  
        console.log("b",b)   
        let amountmul=(parseFloat(getprices)*100000000);
        toast.info("Updating The Price of NFT",{autoClose:5000}); 
        
    //   const response = await window.martian.connect();
    //   const address = response.address;
      const options = {
        max_gas_amount: "10000"
      } 
      let property_version = 0   
        const payloadclaim = {
          type: "script_function_payload",
          function: `${caddressnew}::creating6::add_assetssopt`,      
          type_arguments: ["0x1::aptos_coin::AptosCoin"],
          arguments: [
            pooladdressfinal,        
            localStorage.getItem("EAWalletAddress"),                     
            b.nftName,         
            b.nftName,         
            property_version,        
            1
          ]
        }
  
        // const txn_request2CS =  await window.martian.generateTransaction(address, payloadclaim,options)
        // console.log("Req",txn_request2CS)
        // const signed_txn2CS = await  window.martian.signTransaction(txn_request2CS)
        // console.log("signedTx",signed_txn2CS)
        // const res2CS = await window.martian.submitTransaction(signed_txn2CS)        
        // console.log("TransferV",res2CS)      
        
        // //await storeDbUpdate(valuess,address,caddress,Prices);
        
        // //let id = "https://explorer.aptoslabs.com/txn/"+res2CS.hash+"?network=testnet";
        // let id = "https://explorer.aptoslabs.com/txn/"+res2CS.hash;
        console.log("entering")
        let transaction2Hash = await swappet(payloadclaim)
        console.log("transactionHash", transaction2Hash); 
        //   let id = "https://explorer.aptoslabs.com/txn/"+transactionHash;
        //await storeDbUpdate(valuess,address,caddress,Prices);

        //let id = "https://explorer.aptoslabs.com/txn/"+res2CS.hash+"?network=testnet";
        
        let id = "https://explorer.aptoslabs.com/txn/"+transaction2Hash;
        toast.success(toastDiv(id));
        let calc=amountmul;
        await sleep(12000)               
        // await storeDbUpdate(valuess,address,caddressnew,calc,"AptosNFTN","AptosNFTNS");
        //await callStake(caddress)
    //   } catch (error) {              
    //     console.log("Error",error)
    //     console.log(error)                                
    //     handleHideLoad()
    //     window.location.reload(false)
    //   }
        // let getaaaa=new web3.eth.Contract(abi,b.EscrowAddress);
        // const accounts = await  web3.eth.getAccounts();
        // await getaaaa.methods.setTokenState(b.Assetid,"true").send({
        //   from:localStorage.getItem('EAWalletAddress'),
        //   gas: 210000,
        //   //gasPrice: '20000000000'
        // });     
        // await getaaaa.methods.setTokenPrice(b.Assetid,web3.utils.toBN(amountmul)).send({
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
        // //let id = "https://explorer.aptoslabs.com/txn/" + res2CS.hash;
        // //toast.success(toastDiv(id));              
        // //let cl=res2CS.hash;        
        let cl = "";
        //db here          
        // let dateset=new Date().toDateString();
        // //fireDb.auth().signInAnonymously().then((responses)=>{                     
        // fireDb.database().ref(`EPolygonNFTN/${localStorage.getItem('EAWalletAddress')}`).child(b.keyId).update({
        //     Assetid:b.Assetid,Imageurl:b.Imageurl,NFTPrice:(amountmul),EscrowAddress:localStorage.getItem('EAWalletAddress'),keyId:b.keyId,
        //     NFTName:b.NFTName,userSymbol:b.userSymbol,Ipfsurl:b.Ipfsurl,ownerAddress:b.ownerAddress,previousoaddress:localStorage.getItem('EAWalletAddress'),
        //     TimeStamp:dateset,NFTDescription:b.NFTDescription,HistoryAddress:b.HistoryAddress,Appid:b.Appid,valid:b.valid,
        //     CreatorAddress:b.CreatorAddress,NFTType:b.NFTType,NFTChannel:b.NFTChannel,SocialLink:b.SocialLink,NFTModel:b.NFTModel
        // }).then(()=>{  
        //     let refactivity=fireDb.database().ref(`EPolygonactivitytable/${localStorage.getItem('EAWalletAddress')}`);   
        //     const db = refactivity.push().key;                         
        //     refactivity.child(db).set({
        //         Assetid:b.Assetid,Imageurl:b.Imageurl,NFTPrice:(amountmul),EscrowAddress:"priceupdated",keyId:db,
        //         NFTName:b.NFTName,userSymbol:b.userSymbol,Ipfsurl:b.Ipfsurl,ownerAddress:b.ownerAddress,previousoaddress:localStorage.getItem('EAWalletAddress'),
        //         TimeStamp:dateset,NFTDescription:cl,HistoryAddress:b.HistoryAddress,Appid:b.Appid,valid:b.valid,
        //         CreatorAddress:b.CreatorAddress,NFTType:b.NFTType,NFTChannel:b.NFTChannel,SocialLink:b.SocialLink,NFTModel:b.NFTModel
        // })
        // .then(async()=>{                                                    
        //     toast.success(`NFT Price Updated Successfully`,{autoClose: 5000});            
        //     //await saledb()
        //     handleHideLoad()
        //     await done();
        //     })                        
        // })                    
        //})
        try{
            await putByPrice(amountmul,b.keyValue);
            await createActivityTable(localStorage.getItem('EAWalletAddress'),"Update price", pooladdressfinal,transaction2Hash,"NFT")
            toast.success(`NFT Price Updated Successfully`,{autoClose: 5000});            
                //await saledb()
                handleHideLoad()
                await done();
        }catch(error){
            console.log("Error",error)
            console.log(error)                                
            handleHideLoad()
            window.location.reload(false)
        }
       
        //db end here         
        } catch (error) {              
        console.log("Error",error)
        console.log(error)                                
        handleHideLoad()
        window.location.reload(false)
        }                             
        // } catch (err) {
        //         console.error(err);            
        //         toast.error(`your browser appearing issue`,{autoClose: 5000});            
        //         handleHideLoad()                        
        // }
    }   
    }                   

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    const done=async()=>{
        await sleep(7000);
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
                                                <h6>{x.description}</h6>
                                            )}                                            
                                        </span>
                                        </p>
                                        <br />                                        
                    {/* {x.nftPrice === "" || x.nftPrice === null || x.nftPrice === undefined || x.nftPrice === 0 ?(
                        <>                                            
                        <h6 className='mb-2'>Price</h6><h5 className='d-flex mb-3 align-items-center'><img src={userprofile.bgvImagePath} alt="logo" className='me-2 avatar-pic' />                        
                        <div className="input-group-max d-flex align-items-center text-nowrap px-3 input-group-max-lg w-100">
                        <input type="number" placeholder='Enter Price' className='form-control' value={((getprices))} onChange={event => setprices((event.target.value))} />
                        </div>
                        </h5> 
                        <ButtonLoad loading={loader} variant="blue" className='w-100' onClick={()=>{setpricedb(x)}}>Update Price</ButtonLoad>                                        
                        </>
                    ):(
                        <>
                        &nbsp;
                        <h5 className='d-flex mb-3 align-items-center'>
                            <img src={userprofile.bgvImagePath} alt="logo" className='me-2 avatar-pic' />
                            {x.nftPrice/100000000}</h5>                        
                        <ButtonLoad loading={loader} variant="blue" className='w-100' onClick={()=>{saledb(x)}}>Sale</ButtonLoad>                          
                        </>
                    )}                                          */}
                </Card>
                </Col>                
        
    )
}

export default CreateTabNFT