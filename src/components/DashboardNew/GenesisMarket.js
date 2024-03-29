import React,{useState,useEffect} from 'react';
import Layout from './LayoutT';
import { Link } from 'react-router-dom';
import { Card, Col, Container, Row, Tabs, Tab, Badge, Button, InputGroup, Form, Dropdown,Modal} from 'react-bootstrap';
import firebase from '../../NFTFolder/firebase';
import configelem from '../../NFTFolder/config.json';
import node from './nodeapi.json';
import { ToastContainer, Zoom, toast} from 'react-toastify';
import GExploreTab from './GExploreTab';
import GSportsTab from './GSportsTab'
import GArtTab from './GArtTab'
import GPetTab from './GPetTab'
import GTradingCardTab from './GTradingCardTab'
import GPhotographyTab from './GPhotographyTab'
import { getNFTDetailsByTypeSale } from '../../awsdatafile';


const GenesisMarket = () => {
    useEffect(() => {
        document.title = "DivineDimension | Royalty-NFTs"
    }, [])
    //const[loader, setLoader] = useState(false);
    //const handleShowLoad = () => setLoader(true);
    //const handleHideLoad = () => setLoader(false);
    // const[getElemBalance,setElembalance]=useState("");
    // const[getElemBalanceEscrow,setElembalanceEscrow]=useState("");
    // const[getElemBalanceTotal,setElembalanceTotal]=useState("");
    // const[getElemBalanceEscrowCir,setElembalanceEscrowCir]=useState("");
    const[pageSize,setPageSize]=useState(12);     
    const [searchText, setSearchText] = React.useState('');
    const[getrecent,setrecent]=useState("View All");        
    //const [algobalanceApp,setalgobalanceApp] = useState("");      
    const[getImgreffalgoCount,setgetImgreffalgoCount]=useState([]);
    const[getImgreffalgosale,setgetImgreffalgosale]=useState([]);    
    const[getImgreffalgosaleSports,setgetImgreffalgosaleSports]=useState([]);    
    const[getImgreffalgosalePet,setgetImgreffalgosalePet]=useState([]);    
    const[getImgreffalgosaleArts,setgetImgreffalgosaleArts]=useState([]);    
    const[getImgreffalgosalePhotography,setgetImgreffalgosalePhotography]=useState([]);
    const[getImgreffalgosaleTradingCards,setgetImgreffalgosaleTradingCards]=useState([]);
        


    const dbcallalgos=async()=>{        
        let req = [];
        let slaenft = await getNFTDetailsByTypeSale("Royalty-NFT","yes")
        setgetImgreffalgosale(slaenft.data2);
        console.log("salenft",slaenft.data2)
        //firebase.auth().signInAnonymously().then((response)=>{      
        //   firebase.database().ref("EPolygonNFTRS").on("value", (data) => {
        //     if (data) {
        //       data.forEach((d) => {                
        //         let value=d.val();
        //         Object.keys(value).map(async(k)=>{   
        //             if(value[k].NFTChannel === "Royalty"){
        //                 req.push(            
        //                     {
        //                       Assetid:value[k].Assetid,
        //                       Imageurl:value[k].Imageurl,
        //                       NFTPrice:value[k].NFTPrice,
        //                       EscrowAddress:value[k].EscrowAddress,
        //                       keyId:value[k].keyId,
        //                       NFTName:value[k].NFTName,
        //                       userSymbol:value[k].userSymbol,
        //                       Ipfsurl:value[k].Ipfsurl,
        //                       ownerAddress:value[k].ownerAddress,
        //                       previousoaddress:value[k].previousoaddress,
        //                       TimeStamp:value[k].TimeStamp,
        //                       NFTDescription:value[k].NFTDescription,
        //                       HistoryAddress:value[k].HistoryAddress,
        //                       Appid:value[k].Appid,
        //                       valid:value[k].valid,
        //                       CreatorAddress:value[k].CreatorAddress,
        //                       NFTType:value[k].NFTType,
        //                       NFTChannel:value[k].NFTChannel,
        //                       SocialLink:value[k].SocialLink,
        //                       NFTModel:value[k].NFTModel
        //                 })                
        //             }                                        
        //         })
        //         });        
        //       }
        //       req.reverse()
        //       setgetImgreffalgosale(req);
        //     });      
        //})                      
    }      
    useEffect(()=>{dbcallalgos()},[])

    const dbcallalgos1=async()=>{        
        let req = [];
        //firebase.auth().signInAnonymously().then((response)=>{      
          firebase.database().ref("EPolygonNFTRS").on("value", (data) => {
            if (data) {
              data.forEach((d) => {                
                let value=d.val();
                Object.keys(value).map(async(k)=>{                                        
                    if(value[k].NFTModel === "Sports"){                        
                        if(value[k].NFTChannel === "Royalty"){
                            req.push(            
                                {
                                  Assetid:value[k].Assetid,
                                  Imageurl:value[k].Imageurl,
                                  NFTPrice:value[k].NFTPrice,
                                  EscrowAddress:value[k].EscrowAddress,
                                  keyId:value[k].keyId,
                                  NFTName:value[k].NFTName,
                                  userSymbol:value[k].userSymbol,
                                  Ipfsurl:value[k].Ipfsurl,
                                  ownerAddress:value[k].ownerAddress,
                                  previousoaddress:value[k].previousoaddress,
                                  TimeStamp:value[k].TimeStamp,
                                  NFTDescription:value[k].NFTDescription,
                                  HistoryAddress:value[k].HistoryAddress,
                                  Appid:value[k].Appid,
                                  valid:value[k].valid,
                                  CreatorAddress:value[k].CreatorAddress,
                                  NFTType:value[k].NFTType,
                                  NFTChannel:value[k].NFTChannel,
                                  SocialLink:value[k].SocialLink,
                                  NFTModel:value[k].NFTModel
                            })                
                        }                        
                        
                    }   
                    
                })
                }); 
                req.reverse()
                setgetImgreffalgosaleSports(req);                                                 
              }
              
            });      
        //})                      
    }      
    useEffect(()=>{dbcallalgos1()},[])

    const dbcallalgos2=async()=>{        
        let req = [];
        //firebase.auth().signInAnonymously().then((response)=>{      
          firebase.database().ref("EPolygonNFTRS").on("value", (data) => {
            if (data) {
              data.forEach((d) => {                
                let value=d.val();
                Object.keys(value).map(async(k)=>{                                        
                    if(value[k].NFTModel === "Pet"){
                        if(value[k].NFTChannel === "Royalty"){
                            req.push(            
                                {
                                  Assetid:value[k].Assetid,
                                  Imageurl:value[k].Imageurl,
                                  NFTPrice:value[k].NFTPrice,
                                  EscrowAddress:value[k].EscrowAddress,
                                  keyId:value[k].keyId,
                                  NFTName:value[k].NFTName,
                                  userSymbol:value[k].userSymbol,
                                  Ipfsurl:value[k].Ipfsurl,
                                  ownerAddress:value[k].ownerAddress,
                                  previousoaddress:value[k].previousoaddress,
                                  TimeStamp:value[k].TimeStamp,
                                  NFTDescription:value[k].NFTDescription,
                                  HistoryAddress:value[k].HistoryAddress,
                                  Appid:value[k].Appid,
                                  valid:value[k].valid,
                                  CreatorAddress:value[k].CreatorAddress,
                                  NFTType:value[k].NFTType,
                                  NFTChannel:value[k].NFTChannel,
                                  SocialLink:value[k].SocialLink,
                                  NFTModel:value[k].NFTModel
                            })                
                        }                        
                    }               
                })
                });        
              }
              req.reverse()
              setgetImgreffalgosalePet(req);
            });      
        //})                      
    }      
    useEffect(()=>{dbcallalgos2()},[])

    const dbcallalgos3=async()=>{        
        let req = [];
        //firebase.auth().signInAnonymously().then((response)=>{      
          firebase.database().ref("EPolygonNFTRS").on("value", (data) => {
            if (data) {
              data.forEach((d) => {                
                let value=d.val();
                Object.keys(value).map(async(k)=>{                                        
                    if(value[k].NFTModel === "Arts"){                        
                        if(value[k].NFTChannel === "Royalty"){
                            req.push(            
                                {
                                  Assetid:value[k].Assetid,
                                  Imageurl:value[k].Imageurl,
                                  NFTPrice:value[k].NFTPrice,
                                  EscrowAddress:value[k].EscrowAddress,
                                  keyId:value[k].keyId,
                                  NFTName:value[k].NFTName,
                                  userSymbol:value[k].userSymbol,
                                  Ipfsurl:value[k].Ipfsurl,
                                  ownerAddress:value[k].ownerAddress,
                                  previousoaddress:value[k].previousoaddress,
                                  TimeStamp:value[k].TimeStamp,
                                  NFTDescription:value[k].NFTDescription,
                                  HistoryAddress:value[k].HistoryAddress,
                                  Appid:value[k].Appid,
                                  valid:value[k].valid,
                                  CreatorAddress:value[k].CreatorAddress,
                                  NFTType:value[k].NFTType,
                                  NFTChannel:value[k].NFTChannel,
                                  SocialLink:value[k].SocialLink,
                                  NFTModel:value[k].NFTModel
                            })                
                        }                        
                    }               
                })
                });        
              }
              req.reverse()
              setgetImgreffalgosaleArts(req);
            });      
        //})                      
    }      
    useEffect(()=>{dbcallalgos3()},[])
    
    const dbcallalgos4=async()=>{        
        let req = [];
        //firebase.auth().signInAnonymously().then((response)=>{      
          firebase.database().ref("EPolygonNFTRS").on("value", (data) => {
            if (data) {
              data.forEach((d) => {                
                let value=d.val();
                Object.keys(value).map(async(k)=>{                                        
                    if(value[k].NFTModel === "Photography"){
                        if(value[k].NFTChannel === "Royalty"){
                            req.push(            
                                {
                                  Assetid:value[k].Assetid,
                                  Imageurl:value[k].Imageurl,
                                  NFTPrice:value[k].NFTPrice,
                                  EscrowAddress:value[k].EscrowAddress,
                                  keyId:value[k].keyId,
                                  NFTName:value[k].NFTName,
                                  userSymbol:value[k].userSymbol,
                                  Ipfsurl:value[k].Ipfsurl,
                                  ownerAddress:value[k].ownerAddress,
                                  previousoaddress:value[k].previousoaddress,
                                  TimeStamp:value[k].TimeStamp,
                                  NFTDescription:value[k].NFTDescription,
                                  HistoryAddress:value[k].HistoryAddress,
                                  Appid:value[k].Appid,
                                  valid:value[k].valid,
                                  CreatorAddress:value[k].CreatorAddress,
                                  NFTType:value[k].NFTType,
                                  NFTChannel:value[k].NFTChannel,
                                  SocialLink:value[k].SocialLink,
                                  NFTModel:value[k].NFTModel
                            })                
                        }                        
                    }               
                })
                });        
              }
              req.reverse()
              setgetImgreffalgosalePhotography(req);
            });      
        //})                      
    }      
    useEffect(()=>{dbcallalgos4()},[])

    const dbcallalgos5=async()=>{        
        let req = [];
        //firebase.auth().signInAnonymously().then((response)=>{      
          firebase.database().ref("EPolygonNFTRS").on("value", (data) => {
            if (data) {
              data.forEach((d) => {                
                let value=d.val();
                Object.keys(value).map(async(k)=>{                                        
                    if(value[k].NFTModel === "Trading Cards"){
                        if(value[k].NFTChannel === "Royalty"){
                            req.push(            
                                {
                                  Assetid:value[k].Assetid,
                                  Imageurl:value[k].Imageurl,
                                  NFTPrice:value[k].NFTPrice,
                                  EscrowAddress:value[k].EscrowAddress,
                                  keyId:value[k].keyId,
                                  NFTName:value[k].NFTName,
                                  userSymbol:value[k].userSymbol,
                                  Ipfsurl:value[k].Ipfsurl,
                                  ownerAddress:value[k].ownerAddress,
                                  previousoaddress:value[k].previousoaddress,
                                  TimeStamp:value[k].TimeStamp,
                                  NFTDescription:value[k].NFTDescription,
                                  HistoryAddress:value[k].HistoryAddress,
                                  Appid:value[k].Appid,
                                  valid:value[k].valid,
                                  CreatorAddress:value[k].CreatorAddress,
                                  NFTType:value[k].NFTType,
                                  NFTChannel:value[k].NFTChannel,
                                  SocialLink:value[k].SocialLink,
                                  NFTModel:value[k].NFTModel
                            })                
                        }                        
                    }               
                })
                });        
              }
              req.reverse()
              setgetImgreffalgosaleTradingCards(req);
            });      
        //})                      
    }      
    useEffect(()=>{dbcallalgos5()},[])

    const filterdata=()=>{
        let dateset=new Date().toDateString();
        let today= new Date();
        let weekdate=new Date(today.getFullYear(), today.getMonth(), today.getDate()-1).toDateString();        
        if(searchText === "")
        {                          
        if(getrecent === "View All"){                    
            return getImgreffalgosale;                                                
        }
        if(getrecent === "Recently added"){        
            let data = getImgreffalgosale.filter((val)=>{                                                                                        
                return dateset === val.TimeStamp            
                //return (val.TimeStamp < currentdate || val.TimeStamp > weekdate);                
            })
            return data;                                        
        //   let data=getImgreffalgosale.reverse().filter((val)=> (weekdate) <= (val.TimeStamp) || (val.TimeStamp) >= dateset)        
        //   return data;        
        }
        if(getrecent === "Low to High"){
          let data=getImgreffalgosale.sort((a,b)=>{ return parseFloat(a.NFTPrice/100000000) - parseFloat(b.NFTPrice/100000000)})          
          return data;
        }
        if(getrecent ===  "High to Low"){
          let data=getImgreffalgosale.sort((a,b)=>{ return parseFloat(b.NFTPrice/100000000) - parseFloat(a.NFTPrice/100000000)})          
          return data;
        }
        }
        else{
                let data = getImgreffalgosale.filter((val)=>{
                if(val.NFTName === "" || val.NFTName === null || val.NFTName === undefined){    
                }else{
                let val1 = (val.NFTName).toLowerCase().includes(searchText.toLocaleLowerCase())                                
                return val1
                }            
            })                                    
            return data;
        }                
        return getImgreffalgosale
    }

    const filterdata1=()=>{
        let dateset=new Date().toDateString();
        let today= new Date();
        let weekdate=new Date(today.getFullYear(), today.getMonth(), today.getDate()-1).toDateString();        
        if(searchText === "")
        {                          
        if(getrecent === "View All"){                    
            return getImgreffalgosaleSports;                                                
        }
        if(getrecent === "Recently added"){        
            let data = getImgreffalgosaleSports.filter((val)=>{                                                                                        
                return dateset === val.createdTime            
                //return (val.TimeStamp < currentdate || val.TimeStamp > weekdate);                
            })
            return data;                                        
        //   let data=getImgreffalgosaleSports.reverse().filter((val)=> (weekdate) <= (val.TimeStamp) || (val.TimeStamp) >= dateset)        
        //   return data;        
        }
        if(getrecent === "Low to High"){
          let data=getImgreffalgosaleSports.sort((a,b)=>{ return parseFloat(a.nftPrice/100000000) - parseFloat(b.nftPrice/100000000)})          
          return data;
        }
        if(getrecent ===  "High to Low"){
          let data=getImgreffalgosaleSports.sort((a,b)=>{ return parseFloat(b.nftPrice/100000000) - parseFloat(a.nftPrice/100000000)})        
          return data;
        }
        }
        else{
                let data = getImgreffalgosaleSports.filter((val)=>{
                if(val.nftName === "" || val.nftName === null || val.nftName === undefined){    
                }else{
                let val1 = (val.nftName).toLowerCase().includes(searchText.toLocaleLowerCase())                                
                return val1
                }            
            })                                    
            return data;
        }                
        return getImgreffalgosaleSports
    }

    const filterdata2=()=>{
        let dateset=new Date().toDateString();
        let today= new Date();
        let weekdate=new Date(today.getFullYear(), today.getMonth(), today.getDate()-1).toDateString();        
        if(searchText === "")
        {                          
        if(getrecent === "View All"){                    
            return getImgreffalgosalePet;                                                
        }
        if(getrecent === "Recently added"){        
            let data = getImgreffalgosalePet.filter((val)=>{                                                                                        
                return dateset === val.TimeStamp            
                //return (val.TimeStamp < currentdate || val.TimeStamp > weekdate);                
            })
            return data;                                        
        //   let data=getImgreffalgosalePet.reverse().filter((val)=> (weekdate) <= (val.TimeStamp) || (val.TimeStamp) >= dateset)        
        //   return data;        
        }
        if(getrecent === "Low to High"){
          let data=getImgreffalgosalePet.sort((a,b)=>{ return parseFloat(a.NFTPrice/100000000) - parseFloat(b.NFTPrice/100000000)})          
          return data;
        }
        if(getrecent ===  "High to Low"){
          let data=getImgreffalgosalePet.sort((a,b)=>{ return parseFloat(b.NFTPrice/100000000) - parseFloat(a.NFTPrice/100000000)})
          return data;
        }
        }
        else{
                let data = getImgreffalgosalePet.filter((val)=>{
                if(val.NFTName === "" || val.NFTName === null || val.NFTName === undefined){    
                }else{
                let val1 = (val.NFTName).toLowerCase().includes(searchText.toLocaleLowerCase())                                
                return val1
                }            
            })                                    
            return data;
        }                
        return getImgreffalgosalePet
    }

    const filterdata3=()=>{
        let dateset=new Date().toDateString();
        let today= new Date();
        let weekdate=new Date(today.getFullYear(), today.getMonth(), today.getDate()-1).toDateString();        
        if(searchText === "")
        {                          
        if(getrecent === "View All"){                    
            return getImgreffalgosaleArts;                                                
        }
        if(getrecent === "Recently added"){        
            let data = getImgreffalgosaleArts.filter((val)=>{                                                                                        
                return dateset === val.TimeStamp            
                //return (val.TimeStamp < currentdate || val.TimeStamp > weekdate);                
            })
            return data;                                        
        //   let data=getImgreffalgosaleArts.reverse().filter((val)=> (weekdate) <= (val.TimeStamp) || (val.TimeStamp) >= dateset)        
        //   return data;        
        }
        if(getrecent === "Low to High"){
          let data=getImgreffalgosaleArts.sort((a,b)=>{ return parseFloat(a.NFTPrice/100000000) - parseFloat(b.NFTPrice/100000000)})          
          return data;
        }
        if(getrecent ===  "High to Low"){
          let data=getImgreffalgosaleArts.sort((a,b)=>{ return parseFloat(b.NFTPrice/100000000) - parseFloat(a.NFTPrice/100000000)})          
          return data;
        }
        }
        else{
                let data = getImgreffalgosaleArts.filter((val)=>{
                if(val.NFTName === "" || val.NFTName === null || val.NFTName === undefined){    
                }else{
                let val1 = (val.NFTName).toLowerCase().includes(searchText.toLocaleLowerCase())                                
                return val1
                }            
            })                                    
            return data;
        }                
        return getImgreffalgosaleArts
    }

    const filterdata4=()=>{
        let dateset=new Date().toDateString();
        let today= new Date();
        let weekdate=new Date(today.getFullYear(), today.getMonth(), today.getDate()-1).toDateString();        
        if(searchText === "")
        {                          
        if(getrecent === "View All"){                    
            return getImgreffalgosalePhotography;                                                
        }
        if(getrecent === "Recently added"){        
            let data = getImgreffalgosalePhotography.filter((val)=>{                                                                                        
                return dateset === val.TimeStamp            
                //return (val.TimeStamp < currentdate || val.TimeStamp > weekdate);                
            })
            return data;                                        
        //   let data=getImgreffalgosalePhotography.reverse().filter((val)=> (weekdate) <= (val.TimeStamp) || (val.TimeStamp) >= dateset)        
        //   return data;        
        }
        if(getrecent === "Low to High"){
            let data=getImgreffalgosalePhotography.sort((a,b)=>{ return parseFloat(a.NFTPrice/100000000) - parseFloat(b.NFTPrice/100000000)})            
            return data;
          }
          if(getrecent ===  "High to Low"){
            let data=getImgreffalgosalePhotography.sort((a,b)=>{ return parseFloat(b.NFTPrice/100000000) - parseFloat(a.NFTPrice/100000000)})            
            return data;
          }
        }
        else{
                let data = getImgreffalgosalePhotography.filter((val)=>{
                if(val.NFTName === "" || val.NFTName === null || val.NFTName === undefined){    
                }else{
                let val1 = (val.NFTName).toLowerCase().includes(searchText.toLocaleLowerCase())                                
                return val1
                }            
            })                                    
            return data;
        }                        
    }

    const filterdata5=()=>{
        let dateset=new Date().toDateString();
        let today= new Date();
        let weekdate=new Date(today.getFullYear(), today.getMonth(), today.getDate()-1).toDateString();        
        if(searchText === "")
        {
        if(getrecent === "View All"){                    
            return getImgreffalgosaleTradingCards;                                                
        }                          
        if(getrecent === "Recently added"){        
            let data = getImgreffalgosaleTradingCards.filter((val)=>{                                                                                        
                return dateset === val.TimeStamp            
                //return (val.TimeStamp < currentdate || val.TimeStamp > weekdate);                
            })
            return data;                                        
        //   let data=getImgreffalgosaleTradingCards.reverse().filter((val)=> (weekdate) <= (val.TimeStamp) || (val.TimeStamp) >= dateset)        
        //   return data;        
        }
        if(getrecent === "Low to High"){
          let data=getImgreffalgosaleTradingCards.sort((a,b)=>{ return parseFloat(a.NFTPrice/100000000) - parseFloat(b.NFTPrice/100000000)})         
          return data;
        }
        if(getrecent ===  "High to Low"){
          let data=getImgreffalgosaleTradingCards.sort((a,b)=>{ return parseFloat(b.NFTPrice/100000000) - parseFloat(a.NFTPrice/100000000)})          
          return data;
        }
        }
        else{
                let data = getImgreffalgosaleTradingCards.filter((val)=>{
                if(val.NFTName === "" || val.NFTName === null || val.NFTName === undefined){    
                }else{
                let val1 = (val.NFTName).toLowerCase().includes(searchText.toLocaleLowerCase())                                
                return val1
                }            
            })                                    
            return data;
        }                
        return getImgreffalgosaleTradingCards
    }

    const decrementSize=()=>{
        if(pageSize >= 16){
        setPageSize(pageSize-4)
        }        
    }       
    


    const dbcallalgoCount=async()=>{             
        let c=0;
        firebase.auth().signInAnonymously().then((response)=>{      
          firebase.database().ref("imagerefAlgolt").on("value", (data) => {
            if (data) {
              data.forEach((d) => {                
                  c=c+1                
                });        
              }
              setgetImgreffalgoCount(c)              
            });      
        })                      
    }      
    useEffect(()=>{dbcallalgoCount()},[])

    const filterdata2static1=()=>{
        if(searchText === "")
        {                  
        let data=getImgreffalgosale.sort((a,b)=>{ return parseFloat(a.nftPrice/100000000) - parseFloat(b.nftPrice/100000000)})        
        return data;
        }
        else{
                let data = getImgreffalgosale.filter((val)=>{
                if(val.nftName === "" || val.nftName === null || val.nftName === undefined){    
                }else{
                let val1 = (val.nftName).toLowerCase().includes(searchText.toLocaleLowerCase())                
                return val1
                    }            
            })            
            return data;
        }                        
    }
    const filterdata2static2=()=>{
        if(searchText === "")
        {                  
        let data=getImgreffalgosaleSports.sort((a,b)=>{ return parseFloat(a.NFTPrice/100000000) - parseFloat(b.NFTPrice/100000000)})          
        return data;
        }
        else{
                let data = getImgreffalgosaleSports.filter((val)=>{
                if(val.NFTName === "" || val.NFTName === null || val.NFTName === undefined){    
                }else{
                let val1 = (val.NFTName).toLowerCase().includes(searchText.toLocaleLowerCase())                
                return val1
                    }            
            })            
            return data;
        }                        
    }
    const filterdata2static3=()=>{
        if(searchText === "")
        {                  
        let data=getImgreffalgosalePet.sort((a,b)=>{ return parseFloat(a.NFTPrice/100000000) - parseFloat(b.NFTPrice/100000000)})          
        return data;
        }
        else{
                let data = getImgreffalgosalePet.filter((val)=>{
                if(val.NFTName === "" || val.NFTName === null || val.NFTName === undefined){    
                }else{
                let val1 = (val.NFTName).toLowerCase().includes(searchText.toLocaleLowerCase())                
                return val1
                    }            
            })            
            return data;
        }                        
    }
    const filterdata2static4=()=>{
        if(searchText === "")
        {                  
        let data=getImgreffalgosalePhotography.sort((a,b)=>{ return parseFloat(a.NFTPrice/100000000) - parseFloat(b.NFTPrice/100000000)})          
        return data;
        }
        else{
                let data = getImgreffalgosalePhotography.filter((val)=>{
                if(val.NFTName === "" || val.NFTName === null || val.NFTName === undefined){    
                }else{
                let val1 = (val.NFTName).toLowerCase().includes(searchText.toLocaleLowerCase())                
                return val1
                    }            
            })            
            return data;
        }                
    }
    const filterdata2static5=()=>{
        if(searchText === "")
        {                  
        let data=getImgreffalgosaleTradingCards.sort((a,b)=>{ return parseFloat(a.NFTPrice/100000000) - parseFloat(b.NFTPrice/100000000)})          
        return data;
        }
        else{
                let data = getImgreffalgosaleTradingCards.filter((val)=>{
                if(val.NFTName === "" || val.NFTName === null || val.NFTName === undefined){    
                }else{
                let val1 = (val.NFTName).toLowerCase().includes(searchText.toLocaleLowerCase())                
                return val1
                    }            
            })            
            return data;
        }                        
    }
    const filterdata2static6=()=>{
        if(searchText === "")
        {                  
        let data=getImgreffalgosaleArts.sort((a,b)=>{ return parseFloat(a.NFTPrice/100000000) - parseFloat(b.NFTPrice/100000000)})          
        return data;
        }
        else{
                let data = getImgreffalgosaleArts.filter((val)=>{
                if(val.NFTName === "" || val.NFTName === null || val.NFTName === undefined){    
                }else{
                let val1 = (val.NFTName).toLowerCase().includes(searchText.toLocaleLowerCase())                
                return val1
                    }            
            })            
            return data;
        }                
    }


    return (
        <Layout>
            <div className='sidebar-inner d-none d-xl-flex align-items-start flex-wrap'>
            <Link to="/top-categories">Trending Collections</Link>
                <Link to="/top-nftcollection">NFT Collections</Link>
                
                <Link className="active" to="/genesis-market">Royalty NFTs</Link>  
            </div>
            <Container>
            <ToastContainer position='bottom-right' draggable = {false} transition={Zoom} autoClose={4000} closeOnClick = {false}/>        
                <div className='nft-tabs'>
                    <InputGroup className="input-group-search float-md-end">
                        <Form.Control placeholder="Search" value={searchText} onChange={(e) => setSearchText(e.target.value)}/>
                        <Button variant="outline-secondary" id="button-addon2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                            </svg>
                        </Button>
                    </InputGroup>
                    <Tabs defaultActiveKey="all" id="uncontrolled-tab-example" className='dashboard-tabs'>
                        <Tab eventKey="all" title="Explore">
                            <div className='d-flex mt-4 mb-3 align-items-start flex-wrap'>
                                <Link to='#' className='d-flex link-pill mb-2 me-3 align-items-center '>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-files" viewBox="0 0 16 16">
                                    <path d="M13 0H6a2 2 0 0 0-2 2 2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 13V4a2 2 0 0 0-2-2H5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1zM3 4a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4z"/>
                                </svg>
                                Collections
                                </Link>
                                <Link to='#' className='d-flex link-pill mb-2 me-3 align-items-center '>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-files" viewBox="0 0 16 16">
                                    <path d="M13 0H6a2 2 0 0 0-2 2 2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 13V4a2 2 0 0 0-2-2H5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1zM3 4a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4z"/>
                                </svg>
                                Avatar
                                </Link>
                                <Link to='#' className='d-flex link-pill mb-2 me-3 align-items-center '>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-files" viewBox="0 0 16 16">
                                    <path d="M13 0H6a2 2 0 0 0-2 2 2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 13V4a2 2 0 0 0-2-2H5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1zM3 4a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4z"/>
                                </svg>
                                Entity
                                </Link>
                                <Link to='#' className='d-flex link-pill mb-2 me-3 align-items-center '>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-files" viewBox="0 0 16 16">
                                    <path d="M13 0H6a2 2 0 0 0-2 2 2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 13V4a2 2 0 0 0-2-2H5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1zM3 4a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4z"/>
                                </svg>
                                Equipment
                                </Link>
                                <Link to='#' className='d-flex link-pill mb-2 me-3 align-items-center '>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-files" viewBox="0 0 16 16">
                                    <path d="M13 0H6a2 2 0 0 0-2 2 2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 13V4a2 2 0 0 0-2-2H5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1zM3 4a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4z"/>
                                </svg>
                                Art
                                </Link>
                                <Link to='#' className='d-flex link-pill mb-2 me-3 align-items-center '>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-files" viewBox="0 0 16 16">
                                    <path d="M13 0H6a2 2 0 0 0-2 2 2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 13V4a2 2 0 0 0-2-2H5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1zM3 4a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4z"/>
                                </svg>
                                LAND & Estate
                                </Link>
                            </div>
                            <div className='d-flex justify-content-end mb-3'>
                            <Dropdown>
                                <Dropdown.Toggle variant='dark' className='noarrow' id="dropdown-basic">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi ms-0 me-2 bi-sort-down-alt" viewBox="0 0 16 16">
                                        <path d="M3.5 3.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 12.293V3.5zm4 .5a.5.5 0 0 1 0-1h1a.5.5 0 0 1 0 1h-1zm0 3a.5.5 0 0 1 0-1h3a.5.5 0 0 1 0 1h-3zm0 3a.5.5 0 0 1 0-1h5a.5.5 0 0 1 0 1h-5zM7 12.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7a.5.5 0 0 0-.5.5z"/>
                                    </svg> Sort
                                </Dropdown.Toggle>

                                <Dropdown.Menu className='list-unstyled' align="end">
                                    <Form.Check 
                                        type='radio'
                                        id="sort 4"
                                        label="View All"
                                        name="sort"
                                        onChange={()=>{setrecent("View All")}}
                                    />
                                    <Form.Check 
                                        type='radio'
                                        id="sort 1"
                                        label="24 hours"
                                        name="sort"
                                        onChange={()=>{setrecent("Recently added")}}
                                    />
                                    <Form.Check 
                                        type='radio'
                                        id="sort 2"
                                        name="sort"
                                        label="Price low - high"
                                        onChange={()=>{setrecent("Low to High")}}
                                    />
                                    <Form.Check 
                                        type='radio'
                                        id="sort 3"
                                        name="sort"
                                        label="Price high - low"
                                        onChange={()=>{setrecent("High to Low")}}
                                    />
                                </Dropdown.Menu>
                            </Dropdown>
                            </div>
                            <Row>
                            {getImgreffalgosale === null || getImgreffalgosale === "" || getImgreffalgosale === undefined || getImgreffalgosale[0] === null || getImgreffalgosale[0] === "" || getImgreffalgosale[0] === undefined || filterdata()[0] === null || filterdata()[0] === "" || filterdata()[0] === undefined ? (
                                <>
                                {filterdata2static1().map((x, index) => {  
                                    if(index<pageSize)    
                                    return(
                                        <GExploreTab x={x}/>                                     
                                    )
                                })}      
                                </>
                            ) : (
                            <>
                            {filterdata().map((x, index) => {   
                                if(index<pageSize)                
                                return(
                                    <GExploreTab x={x}/>                                     
                                )
                            })}              
                            </>
                            )}                  
                            </Row>

                            {getImgreffalgosale.length <= 10 ? (
                                <></>
                            ):(
                                <div className='pagination justify-content-end d-flex align-items-center'>                                
                                <Button variant='page' onClick={()=>{decrementSize()}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#fff" class="bi m-0 bi-chevron-left" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                                    </svg>
                                </Button>
                                <Button variant='page' onClick={()=>{setPageSize(pageSize+4)}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#fff" class="bi m-0 bi-chevron-right" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                                    </svg>
                                </Button>
                            </div>

                            ) }                            
                        </Tab>
{/*                         
                        <Tab eventKey="Sports" title="Sports">
                            <div className='d-flex mt-4 mb-3 align-items-start flex-wrap'>
                                <Link to='/' className='d-flex link-pill mb-2 me-3 align-items-center '>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-files" viewBox="0 0 16 16">
                                    <path d="M13 0H6a2 2 0 0 0-2 2 2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 13V4a2 2 0 0 0-2-2H5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1zM3 4a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4z"/>
                                </svg>
                                Collections
                                </Link>
                                <Link to='/' className='d-flex link-pill mb-2 me-3 align-items-center '>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-files" viewBox="0 0 16 16">
                                    <path d="M13 0H6a2 2 0 0 0-2 2 2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 13V4a2 2 0 0 0-2-2H5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1zM3 4a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4z"/>
                                </svg>
                                Avatar
                                </Link>
                                <Link to='/' className='d-flex link-pill mb-2 me-3 align-items-center '>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-files" viewBox="0 0 16 16">
                                    <path d="M13 0H6a2 2 0 0 0-2 2 2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 13V4a2 2 0 0 0-2-2H5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1zM3 4a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4z"/>
                                </svg>
                                Entity
                                </Link>
                                <Link to='/' className='d-flex link-pill mb-2 me-3 align-items-center '>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-files" viewBox="0 0 16 16">
                                    <path d="M13 0H6a2 2 0 0 0-2 2 2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 13V4a2 2 0 0 0-2-2H5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1zM3 4a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4z"/>
                                </svg>
                                Equipment
                                </Link>
                                <Link to='/' className='d-flex link-pill mb-2 me-3 align-items-center '>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-files" viewBox="0 0 16 16">
                                    <path d="M13 0H6a2 2 0 0 0-2 2 2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 13V4a2 2 0 0 0-2-2H5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1zM3 4a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4z"/>
                                </svg>
                                Art
                                </Link>
                                <Link to='/' className='d-flex link-pill mb-2 me-3 align-items-center '>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-files" viewBox="0 0 16 16">
                                    <path d="M13 0H6a2 2 0 0 0-2 2 2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 13V4a2 2 0 0 0-2-2H5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1zM3 4a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4z"/>
                                </svg>
                                LAND & Estate
                                </Link>
                            </div>
                            <div className='d-flex justify-content-end mb-3'>
                            <Dropdown>
                                <Dropdown.Toggle variant='dark' className='noarrow' id="dropdown-basic">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi ms-0 me-2 bi-sort-down-alt" viewBox="0 0 16 16">
                                        <path d="M3.5 3.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 12.293V3.5zm4 .5a.5.5 0 0 1 0-1h1a.5.5 0 0 1 0 1h-1zm0 3a.5.5 0 0 1 0-1h3a.5.5 0 0 1 0 1h-3zm0 3a.5.5 0 0 1 0-1h5a.5.5 0 0 1 0 1h-5zM7 12.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7a.5.5 0 0 0-.5.5z"/>
                                    </svg> Sort
                                </Dropdown.Toggle>

                                <Dropdown.Menu className='list-unstyled' align="end">
                                    <Form.Check 
                                        type='radio'
                                        id="sort 4"
                                        label="View All"
                                        name="sort"
                                        onChange={()=>{setrecent("View All")}}
                                    />
                                    <Form.Check 
                                        type='radio'
                                        id="sort 1"
                                        label="24 hours"
                                        name="sort"                                        
                                        onChange={()=>{setrecent("Recently added")}}
                                    />
                                    <Form.Check 
                                        type='radio'
                                        id="sort 2"
                                        name="sort"
                                        label="Price low - high"
                                        onChange={()=>{setrecent("Low to High")}}
                                    />
                                    <Form.Check 
                                        type='radio'
                                        id="sort 3"
                                        name="sort"
                                        label="Price high - low"
                                        onChange={()=>{setrecent("High to Low")}}
                                    />
                                </Dropdown.Menu>
                            </Dropdown>
                            </div>
                            <Row>
                            {getImgreffalgosaleSports === null || getImgreffalgosaleSports === "" || getImgreffalgosaleSports === undefined || getImgreffalgosaleSports[0] === null || getImgreffalgosaleSports[0] === "" || getImgreffalgosaleSports[0] === undefined || filterdata1()[0] === null || filterdata1()[0] === "" || filterdata1()[0] === undefined ? (
                                <>
                                {filterdata2static2().map((x, index) => {  
                                    if(index<pageSize)    
                                    return(
                                        <GSportsTab x={x}/>                                     
                                    )
                                })}      
                                </>
                            ) : (
                            <>
                            {filterdata1().map((x, index) => {  
                                if(index<pageSize)                                                 
                                return(
                                    <GSportsTab x={x}/>                                                                                                                                                                                             
                                )
                            })}   
                            </>
                            )}                             
                            </Row>

                            {getImgreffalgosaleSports.length <= 12 ? (
                                <></>
                            ):(
                                <div className='pagination justify-content-end d-flex align-items-center'>                                
                                <Button variant='page' onClick={()=>{decrementSize()}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#fff" class="bi m-0 bi-chevron-left" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                                    </svg>
                                </Button>
                                <Button variant='page' onClick={()=>{setPageSize(pageSize+4)}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#fff" class="bi m-0 bi-chevron-right" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                                    </svg>
                                </Button>
                            </div>

                            ) }                            
                        </Tab>
                        <Tab eventKey="Pet" title="Pet">
                            <div className='d-flex mt-4 mb-3 align-items-start flex-wrap'>
                                <Link to='/' className='d-flex link-pill mb-2 me-3 align-items-center '>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-files" viewBox="0 0 16 16">
                                    <path d="M13 0H6a2 2 0 0 0-2 2 2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 13V4a2 2 0 0 0-2-2H5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1zM3 4a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4z"/>
                                </svg>
                                Collections
                                </Link>
                                <Link to='/' className='d-flex link-pill mb-2 me-3 align-items-center '>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-files" viewBox="0 0 16 16">
                                    <path d="M13 0H6a2 2 0 0 0-2 2 2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 13V4a2 2 0 0 0-2-2H5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1zM3 4a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4z"/>
                                </svg>
                                Avatar
                                </Link>
                                <Link to='/' className='d-flex link-pill mb-2 me-3 align-items-center '>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-files" viewBox="0 0 16 16">
                                    <path d="M13 0H6a2 2 0 0 0-2 2 2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 13V4a2 2 0 0 0-2-2H5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1zM3 4a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4z"/>
                                </svg>
                                Entity
                                </Link>
                                <Link to='/' className='d-flex link-pill mb-2 me-3 align-items-center '>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-files" viewBox="0 0 16 16">
                                    <path d="M13 0H6a2 2 0 0 0-2 2 2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 13V4a2 2 0 0 0-2-2H5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1zM3 4a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4z"/>
                                </svg>
                                Equipment
                                </Link>
                                <Link to='/' className='d-flex link-pill mb-2 me-3 align-items-center '>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-files" viewBox="0 0 16 16">
                                    <path d="M13 0H6a2 2 0 0 0-2 2 2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 13V4a2 2 0 0 0-2-2H5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1zM3 4a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4z"/>
                                </svg>
                                Art
                                </Link>
                                <Link to='/' className='d-flex link-pill mb-2 me-3 align-items-center '>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-files" viewBox="0 0 16 16">
                                    <path d="M13 0H6a2 2 0 0 0-2 2 2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 13V4a2 2 0 0 0-2-2H5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1zM3 4a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4z"/>
                                </svg>
                                LAND & Estate
                                </Link>
                            </div>
                            <div className='d-flex justify-content-end mb-3'>
                            <Dropdown>
                                <Dropdown.Toggle variant='dark' className='noarrow' id="dropdown-basic">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi ms-0 me-2 bi-sort-down-alt" viewBox="0 0 16 16">
                                        <path d="M3.5 3.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 12.293V3.5zm4 .5a.5.5 0 0 1 0-1h1a.5.5 0 0 1 0 1h-1zm0 3a.5.5 0 0 1 0-1h3a.5.5 0 0 1 0 1h-3zm0 3a.5.5 0 0 1 0-1h5a.5.5 0 0 1 0 1h-5zM7 12.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7a.5.5 0 0 0-.5.5z"/>
                                    </svg> Sort
                                </Dropdown.Toggle>

                                <Dropdown.Menu className='list-unstyled' align="end">
                                    <Form.Check 
                                        type='radio'
                                        id="sort 4"
                                        label="View All"
                                        name="sort"
                                        onChange={()=>{setrecent("View All")}}
                                    />
                                    <Form.Check 
                                        type='radio'
                                        id="sort 1"
                                        label="24 hours"
                                        name="sort"                                        
                                        onChange={()=>{setrecent("Recently added")}}
                                    />
                                    <Form.Check 
                                        type='radio'
                                        id="sort 2"
                                        name="sort"
                                        label="Price low - high"
                                        onChange={()=>{setrecent("Low to High")}}
                                    />
                                    <Form.Check 
                                        type='radio'
                                        id="sort 3"
                                        name="sort"
                                        label="Price high - low"
                                        onChange={()=>{setrecent("High to Low")}}
                                    />
                                </Dropdown.Menu>
                            </Dropdown>
                            </div>
                            <Row>
                            {getImgreffalgosalePet === null || getImgreffalgosalePet === "" || getImgreffalgosalePet === undefined || getImgreffalgosalePet[0] === null || getImgreffalgosalePet[0] === "" || getImgreffalgosalePet[0] === undefined || filterdata2()[0] === null || filterdata2()[0] === "" || filterdata2()[0] === undefined ? (
                                <>
                                {filterdata2static3().map((x, index) => {  
                                    if(index<pageSize)    
                                    return(
                                        <GPetTab x={x}/>                                     
                                    )
                                })}      
                                </>
                            ) : (
                            <>
                            {filterdata2().map((x, index) => {  
                                if(index<pageSize)                 
                                return( 
                                    <GPetTab x={x}/>                                                                                                             
                                )
                            })}  
                            </>
                            )}                              
                            </Row>

                            {getImgreffalgosalePet.length <= 12 ? (
                                <></>
                            ):(
                                <div className='pagination justify-content-end d-flex align-items-center'>                                
                                <Button variant='page' onClick={()=>{decrementSize()}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#fff" class="bi m-0 bi-chevron-left" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                                    </svg>
                                </Button>
                                <Button variant='page' onClick={()=>{setPageSize(pageSize+4)}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#fff" class="bi m-0 bi-chevron-right" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                                    </svg>
                                </Button>
                            </div>

                            ) }                            
                        </Tab>
                        <Tab eventKey="Photography" title="Photography">
                            <div className='d-flex justify-content-end mb-3'>
                            <Dropdown>
                                <Dropdown.Toggle variant='dark' className='noarrow' id="dropdown-basic">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi ms-0 me-2 bi-sort-down-alt" viewBox="0 0 16 16">
                                        <path d="M3.5 3.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 12.293V3.5zm4 .5a.5.5 0 0 1 0-1h1a.5.5 0 0 1 0 1h-1zm0 3a.5.5 0 0 1 0-1h3a.5.5 0 0 1 0 1h-3zm0 3a.5.5 0 0 1 0-1h5a.5.5 0 0 1 0 1h-5zM7 12.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7a.5.5 0 0 0-.5.5z"/>
                                    </svg> Sort
                                </Dropdown.Toggle>

                                <Dropdown.Menu className='list-unstyled' align="end">
                                    <Form.Check 
                                        type='radio'
                                        id="sort 4"
                                        label="View All"
                                        name="sort"
                                        onChange={()=>{setrecent("View All")}}
                                    />
                                    <Form.Check 
                                        type='radio'
                                        id="sort 1"
                                        label="24 hours"
                                        name="sort"                                    
                                        onChange={()=>{setrecent("Recently added")}}
                                    />
                                    <Form.Check 
                                        type='radio'
                                        id="sort 2"
                                        name="sort"
                                        label="Price low - high"
                                        onChange={()=>{setrecent("Low to High")}}
                                    />
                                    <Form.Check 
                                        type='radio'
                                        id="sort 3"
                                        name="sort"
                                        label="Price high - low"
                                        onChange={()=>{setrecent("High to Low")}}
                                    />
                                </Dropdown.Menu>
                            </Dropdown>
                            </div>
                            <Row>
                            {getImgreffalgosalePhotography === null || getImgreffalgosalePhotography === "" || getImgreffalgosalePhotography === undefined || getImgreffalgosalePhotography[0] === null || getImgreffalgosalePhotography[0] === "" || getImgreffalgosalePhotography[0] === undefined || filterdata4()[0] === null || filterdata4()[0] === "" || filterdata4()[0] === undefined ? (
                                <>
                                {filterdata2static4().map((x, index) => {  
                                    if(index<pageSize)    
                                    return(
                                        <GPhotographyTab x={x}/>                                     
                                    )
                                })}      
                                </>
                            ) : (
                            <>
                            {filterdata4().map((x, index) => {  
                                if(index<pageSize)                 
                                return(       
                                    <GPhotographyTab x={x}/>                                                                                                       
                                )
                            })}    
                            </>
                            )}                            
                            </Row>

                            {getImgreffalgosalePhotography.length <= 12 ? (
                                <></>
                            ):(
                                <div className='pagination justify-content-end d-flex align-items-center'>                                
                                <Button variant='page' onClick={()=>{decrementSize()}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#fff" class="bi m-0 bi-chevron-left" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                                    </svg>
                                </Button>
                                <Button variant='page' onClick={()=>{setPageSize(pageSize+4)}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#fff" class="bi m-0 bi-chevron-right" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                                    </svg>
                                </Button>
                            </div>

                            ) }                            
                        </Tab>       
                        <Tab eventKey="Trading Cards" title="Trading Cards">
                            <div className='d-flex justify-content-end mb-3'>
                            <Dropdown>
                                <Dropdown.Toggle variant='dark' className='noarrow' id="dropdown-basic">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi ms-0 me-2 bi-sort-down-alt" viewBox="0 0 16 16">
                                        <path d="M3.5 3.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 12.293V3.5zm4 .5a.5.5 0 0 1 0-1h1a.5.5 0 0 1 0 1h-1zm0 3a.5.5 0 0 1 0-1h3a.5.5 0 0 1 0 1h-3zm0 3a.5.5 0 0 1 0-1h5a.5.5 0 0 1 0 1h-5zM7 12.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7a.5.5 0 0 0-.5.5z"/>
                                    </svg> Sort
                                </Dropdown.Toggle>

                                <Dropdown.Menu className='list-unstyled' align="end">
                                    <Form.Check 
                                        type='radio'
                                        id="sort 4"
                                        label="View All"
                                        name="sort"
                                        onChange={()=>{setrecent("View All")}}
                                    />
                                    <Form.Check 
                                        type='radio'
                                        id="sort 1"
                                        label="24 hours"
                                        name="sort"                                        
                                        onChange={()=>{setrecent("Recently added")}}
                                    />
                                    <Form.Check 
                                        type='radio'
                                        id="sort 2"
                                        name="sort"
                                        label="Price low - high"                                        
                                        onChange={()=>{setrecent("Low to High")}}
                                    />
                                    <Form.Check 
                                        type='radio'
                                        id="sort 3"
                                        name="sort"
                                        label="Price high - low"
                                        onChange={()=>{setrecent("High to Low")}}
                                    />
                                </Dropdown.Menu>
                            </Dropdown>
                            </div>
                            <Row>
                            {getImgreffalgosaleTradingCards === null || getImgreffalgosaleTradingCards === "" || getImgreffalgosaleTradingCards === undefined || getImgreffalgosaleTradingCards[0] === null || getImgreffalgosaleTradingCards[0] === "" || getImgreffalgosaleTradingCards[0] === undefined || filterdata5()[0] === null || filterdata5()[0] === "" || filterdata5()[0] === undefined ? (
                                <>
                                {filterdata2static5().map((x, index) => {  
                                    if(index<pageSize)    
                                    return(
                                        <GTradingCardTab x={x}/>                                     
                                    )
                                })}      
                                </>
                            ) : (
                            <>
                            {filterdata5().map((x, index) => {  
                                if(index<pageSize)                 
                                return(       
                                    <GTradingCardTab x={x}/>                                                                                                       
                                )
                            })}  
                            </>
                            )}                              
                            </Row>

                            {getImgreffalgosaleTradingCards.length <= 12 ? (
                                <></>
                            ):(
                                <div className='pagination justify-content-end d-flex align-items-center'>                                
                                <Button variant='page' onClick={()=>{decrementSize()}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#fff" class="bi m-0 bi-chevron-left" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                                    </svg>
                                </Button>
                                <Button variant='page' onClick={()=>{setPageSize(pageSize+4)}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#fff" class="bi m-0 bi-chevron-right" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                                    </svg>
                                </Button>
                            </div>

                            ) }                            
                        </Tab>   
                        <Tab eventKey="Arts" title="Arts">
                            <div className='d-flex justify-content-end mb-3'>
                            <Dropdown>
                                <Dropdown.Toggle variant='dark' className='noarrow' id="dropdown-basic">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi ms-0 me-2 bi-sort-down-alt" viewBox="0 0 16 16">
                                        <path d="M3.5 3.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 12.293V3.5zm4 .5a.5.5 0 0 1 0-1h1a.5.5 0 0 1 0 1h-1zm0 3a.5.5 0 0 1 0-1h3a.5.5 0 0 1 0 1h-3zm0 3a.5.5 0 0 1 0-1h5a.5.5 0 0 1 0 1h-5zM7 12.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7a.5.5 0 0 0-.5.5z"/>
                                    </svg> Sort
                                </Dropdown.Toggle>

                                <Dropdown.Menu className='list-unstyled' align="end">
                                    <Form.Check 
                                        type='radio'
                                        id="sort 4"
                                        label="View All"
                                        name="sort"
                                        onChange={()=>{setrecent("View All")}}
                                    />
                                    <Form.Check 
                                        type='radio'
                                        id="sort 1"
                                        label="24 hours"
                                        name="sort"                                        
                                        onChange={()=>{setrecent("Recently added")}}
                                    />
                                    <Form.Check 
                                        type='radio'
                                        id="sort 2"
                                        name="sort"
                                        label="Price low - high"
                                        onChange={()=>{setrecent("Low to High")}}
                                    />
                                    <Form.Check 
                                        type='radio'
                                        id="sort 3"
                                        name="sort"
                                        label="Price high - low"
                                        onChange={()=>{setrecent("High to Low")}}
                                    />
                                </Dropdown.Menu>
                            </Dropdown>
                            </div>
                            <Row>
                            {getImgreffalgosaleArts === null || getImgreffalgosaleArts === "" || getImgreffalgosaleArts === undefined || getImgreffalgosaleArts[0] === null || getImgreffalgosaleArts[0] === "" || getImgreffalgosaleArts[0] === undefined || filterdata3()[0] === null || filterdata3()[0] === "" || filterdata3()[0] === undefined ? (
                                <>
                                {filterdata2static6().map((x, index) => {  
                                    if(index<pageSize)    
                                    return(
                                        <GArtTab x={x}/>                                     
                                    )
                                })}      
                                </>
                            ) : (
                            <>
                            {filterdata3().map((x, index) => {  
                                if(index<pageSize)                 
                                return(    
                                    <GArtTab x={x}/>                                                                         
                                )
                            })}     
                            </>
                            )}                           
                            </Row>

                            {getImgreffalgosaleArts.length <= 12 ? (
                                <></>
                            ):(
                                <div className='pagination justify-content-end d-flex align-items-center'>                                
                                <Button variant='page' onClick={()=>{decrementSize()}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#fff" class="bi m-0 bi-chevron-left" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                                    </svg>
                                </Button>
                                <Button variant='page' onClick={()=>{setPageSize(pageSize+4)}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#fff" class="bi m-0 bi-chevron-right" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                                    </svg>
                                </Button>
                            </div>

                            ) }                            
                        </Tab>                                             */}
                    </Tabs>
                </div>
            </Container>
        </Layout>
    )
}

export default GenesisMarket;