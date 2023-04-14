import React,{useState,useEffect} from 'react';
import Layout from './LayoutT';
import { Card, Col, Container, Row, Tabs, Tab, Badge, Button, InputGroup, Form, Dropdown,Modal} from 'react-bootstrap';
import { ToastContainer, Toast, Zoom, Bounce, toast} from 'react-toastify';
import firebase from '../../NFTFolder/firebase';
import { Link ,useHistory} from 'react-router-dom';
import GNFTTradingCardTab from './GNFTTradingCardTab';
import LandUpdate from './landPrice';
import LandBuy from './landBuy';
import ButtonLoad from 'react-bootstrap-button-loader';
import GNFTPhotographyTab from './GNFTPhotographyTab';
import GNFTSportsTab from './GNFTSportsTab';
import GNFTExploreTab from './GNFTExploreTab';
import map1 from '../../assets/images/map1.png';
import map2 from '../../assets/images/map2.png';
import map3 from '../../assets/images/map3.png';
import map4 from '../../assets/images/map4.png';
import map5 from '../../assets/images/map5.png';
import map6 from '../../assets/images/map6.png';
import map7 from '../../assets/images/map7.png';
import map8 from '../../assets/images/map8.png';
import landmap from '../../assets/images/landmap.png';
import u2 from '../../assets/images/u2.png';
import w5 from '../../assets/images/wi5.jpeg';
import Image from '../../assets/images/peacock.png';
import t18 from '../../assets/images/t8.png';
import { async } from 'q';
import web3 from '../../web3';
import { createLaunchpad, getallAvatar, getallLand, getallLandbywallet } from '../../awsdatafile';
import { landAbi } from '../../abi&contractfiles/abi';
import Compress from "react-image-file-resizer";
import { landAddress } from '../../abi&contractfiles/contractaddress';

import PostCard from './snippets/PostCard';
import PostCardduplicate from './snippets/PostCardduplicate';
const TopCollectionsNFTN = () => {
    useEffect(() => {
        document.title = "DivineDimension | Map"
    }, [])    
    const[pageSize,setPageSize]=useState(12);   
    const handleShowLoad = () => setLoader(true);
    const handleHideLoad = () => setLoader(false);
    const[loader, setLoader] = useState(false);     
    const [searchText, setSearchText] = React.useState('');    
    const[getrecent,setrecent]=useState("View All");            
    const[getImgreffalgoCount,setgetImgreffalgoCount]=useState([]);    
    const[getImgreffalgosale,setgetImgreffalgosale]=useState([]);    
    const[getImgreffalgosaleSports,setgetImgreffalgosaleSports]=useState([]);    
    const[getImgreffalgosalePet,setgetImgreffalgosalePet]=useState([]);    
    const[getImgreffalgosaleArts,setgetImgreffalgosaleArts]=useState([]);   
    const [getprices,setprices]=useState("") 
    const[getImgreffalgosalePhotography,setgetImgreffalgosalePhotography]=useState([]);
    const[ownedLand,setOwnedLand]=useState([]);  
    const[upComing,setupComing]=useState([]);
    const[completed,setcompleted]=useState([]);
    console.log("onwedland",ownedLand)  
    const[allLand,setAllLand]=useState([]); 

    const [Img,setImg] = useState("")    
    const [Imgname,setImgname] = useState("") 
    const [getFile,setFile] = useState("") 
    const [Name,setName] = useState("");
    const [Description,setDescription] = useState("");
    const[Email,setEmail]=useState("");
    const[startingDate,setStartingDate] = useState("");  
    const[endingDate,setEndingingDate] = useState("");  
    const[rewards,setRewards] = useState("");
    const[sprice,setPrice] = useState("");

    useEffect(()=>{getlandbywallet()},[])
   

    
   const getlandbywallet = async() =>{

    let upcoming = [
        {
         name:"Cultural Adventurer NFT",
         startTime:"1681800472",
         endTime:"1688398664",
         deployerAddr:"0x98c76c6286e9373f775ca68bd671df9adef7867ac8cd24167f571a6f060bcd66",
         ownerAddr:"0xdf47ac52cd9e0e78b95ae6ce91c09e4ea512cb034231e8ef315f75dbf1de2ec9",
         totalSale:150,
         imgurl:t18,
         price:"1.5"
        } ,
        {
            name:"Cultural NFT",
            startTime:"1681800472",
            endTime:"1688398664",
            deployerAddr:"0x98c76c6286e9373f775ca68bd671df9adef7867ac8cd24167f571a6f060bcd66",
            ownerAddr:"0xdf47ac52cd9e0e78b95ae6ce91c09e4ea512cb034231e8ef315f75dbf1de2ec9",
            totalSale:1000,
            imgurl:w5,
            price:"3"
        } 

        
    ]
    setupComing(upcoming);

    let comple = [
        {
         name:"World Voyager",
         startTime:"1677957800",
         endTime:"1681257845",
         deployerAddr:"0x98c76c6286e9373f775ca68bd671df9adef7867ac8cd24167f571a6f060bcd66",
         ownerAddr:"0xdf47ac52cd9e0e78b95ae6ce91c09e4ea512cb034231e8ef315f75dbf1de2ec9",
         totalSale:1000,
         imgurl:u2,
         price:"2"
        } 

        
    ]
    setcompleted(comple);
    if(localStorage.getItem("EAWalletAddress") === null || localStorage.getItem("EAWalletAddress") === ""|| localStorage.getItem("EAWalletAddress") === undefined){

    }
    else{
        // let ownedland = await getallLandbywallet(localStorage.getItem("walletAddress"));
        // console.log("onwedland",ownedland)
        // setOwnedLand(ownedland.data2);
        let k = [
               {
                name:"Divine Explorer NFT",
                startTime:"1681368652",
                endTime:"1686398664",
                deployerAddr:"0x98c76c6286e9373f775ca68bd671df9adef7867ac8cd24167f571a6f060bcd66",
                ownerAddr:"0xdf47ac52cd9e0e78b95ae6ce91c09e4ea512cb034231e8ef315f75dbf1de2ec9",
                totalSale:100,
                imgurl:Image,
                price:"0.1"
               } 
            //    {
            //     name:"Cultural Adventurer NFT",
            //     startTime:"1686398664",
            //     endTime:"1686398664",
            //     deployerAddr:"0x98c76c6286e9373f775ca68bd671df9adef7867ac8cd24167f571a6f060bcd66",
            //     ownerAddr:"0xdf47ac52cd9e0e78b95ae6ce91c09e4ea512cb034231e8ef315f75dbf1de2ec9",
            //     totalSale:250,
            //     imgurl:t18,
            //     price:"0.02"
            //    } 
            ]
           
        // let allLand = await getallAvatar();
        // console.log("allLand",allLand.data2)
        // setAllLand(allLand.data2);
        setAllLand(k);
    }
    
   }

   const updatePrice = async() =>{
    const accounts = await web3.eth.getAccounts();
    const landcontract = new web3.eth.Contract(landAbi, landAddress);
    // let hash =  await landcontract.methods.putForSale(,getprices).send({from:accounts[0]});
   }


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


const clearImage = () =>{
    setImg("")
  }
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


  const submitform = async() =>{
    if(localStorage.getItem("EAWalletAddress") === null || localStorage.getItem("EAWalletAddress") === undefined || localStorage.getItem("EAWalletAddress") === ""){
        toast.dismiss()
        toast.warning(`please connect your wallet`,{autoClose: 5000});            
        handleHideLoad()           
      }                
      else if(Name === ""){          
        toast.dismiss()
        toast.warning(`Please enter Club-Name`,{autoClose: 5000});            
        handleHideLoad()                     
      }
      else if(Description === ""){          
        toast.dismiss()
        toast.warning(`Please enter Description`,{autoClose: 5000});            
        handleHideLoad()                     
      } 
      else if(startingDate === ""){          
        toast.dismiss()
        toast.warning(`Please enter startingDate`,{autoClose: 5000});            
        handleHideLoad()                     
      }        
      else if(endingDate === ""){          
        toast.dismiss()
        toast.warning(`Please enter endingDate`,{autoClose: 5000});            
        handleHideLoad()                     
      }        
      
      else if(Email === ""){
        toast.dismiss()
        toast.warning(`Please enter Email`,{autoClose: 5000});            
        handleHideLoad()                                                   
      }        
      else if(rewards === ""){
        toast.dismiss()
        toast.warning(`Please enter rewards`,{autoClose: 5000});            
        handleHideLoad()                                                                                 
      }
            
      else if(Img === ""){
        toast.dismiss()
        toast.warning(`Please Upload Image`,{autoClose: 5000});            
        handleHideLoad()                                                                                                     
      }   
      else{
        handleShowLoad();
        let k =   await createLaunchpad(Name,Description,Email,startingDate,endingDate,rewards,localStorage.getItem("EAWalletAddress"),Img,sprice);
        toast.success("Launchpad Created successful",{autoClose: 5000});                 
        handleHideLoad() ;
        await sleep(5000);
        window.location.reload(false);
      }
  }

     


    return (    

        <Layout>
            <div className='sidebar-inner d-none d-xl-flex align-items-start flex-wrap'>
            {/* <Link to="/map">Map</Link>
                <Link to="/create-land">Create Land</Link> */}
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
                    <Tabs defaultActiveKey="Launchpad" id="uncontrolled-tab-example" className='dashboard-tabs'>
                    {/* <Tab eventKey="all" title="Explore">
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
                            
                            <Col className='position-relative'>
                                <div className='map-controls d-flex flex-column align-items-center'>
                                    <button onClick={()=>zoomin()}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                                        </svg>
                                    </button>
                                    <button onClick={()=>zoomout()}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-dash-lg" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z"/>
                                        </svg>
                                    </button>
                                </div>
                                 <img src={landmap} id="geeks" GFG="250"></img>  
                            </Col>
                                                
                            </Row>

                         
                   
                        </Tab> */}

                        <Tab eventKey="Launchpad" title="Upcoming">
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
                         
                            {upComing === "" || upComing === null || upComing === undefined || upComing === "undefined" ? 
                         (<></>):(<>
                         {upComing.map((r,i)=>{
                            return(
                                <>
                               {/* {r.status === "yes" ?
                               (<>
                               
                               </>):(<> */}
                               
                                {/* <LandBuy x={r}/> */}
                                <PostCardduplicate x ={r}></PostCardduplicate>
                               {/* </>)} */}
                               </>)})}
                               </>)}
                              
                              
                            
                            </Row>
                           
                        
                              
                              
                          
                          


                           
                        </Tab>
                        <Tab eventKey="Live" title="Live">
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
                         
                            {allLand === "" || allLand === null || allLand === undefined || allLand === "undefined" ? 
                         (<></>):(<>
                         {allLand.map((r,i)=>{
                            return(
                                <>
                               {/* {r.status === "yes" ?
                               (<>
                               
                               </>):(<> */}
                               
                                {/* <LandBuy x={r}/> */}
                                <PostCard x ={r}></PostCard>
                               {/* </>)} */}
                               </>)})}
                               </>)}
                              
                              
                            {/* {getImgreffalgosale === null || getImgreffalgosale === "" || getImgreffalgosale === undefined || getImgreffalgosale[0] === null || getImgreffalgosale[0] === "" || getImgreffalgosale[0] === undefined || filterdata()[0] === null || filterdata()[0] === "" || filterdata()[0] === undefined ? (
                                <>
                                {filterdata2static1().map((x, index) => {  
                                    if(index<pageSize)    
                                    return(
                                        <GNFTExploreTab x={x}/>                                     
                                    )
                                })}      
                                </>
                            ) : (
                            <>
                            {filterdata().map((x, index) => {   
                                if(index<pageSize)                
                                return(
                                    <GNFTExploreTab x={x}/>                                     
                                )
                            })}              
                            </>
                            )}                   */}
                            </Row>
                            <br/>
                            
                          


                           
                        </Tab>
                        <Tab eventKey="Completed" title="Completed">
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
                         
                            {completed === "" || completed === null || completed === undefined || completed === "undefined" ? 
                         (<></>):(<>
                         {completed.map((r,i)=>{
                            return(
                                <>
                               {/* {r.status === "yes" ?
                               (<>
                               
                               </>):(<> */}
                               
                                {/* <LandBuy x={r}/> */}
                                <PostCardduplicate x ={r}></PostCardduplicate>
                               {/* </>)} */}
                               </>)})}
                               </>)}
                              
                              
                            
                            </Row>
                            <br/>
                          


                           
                        </Tab>
                        <Tab eventKey="Apply" title="Apply for Launchpad">
                        <Layout>
                            <Container>
                               {/* <center> <h2>Apply Form</h2></center> */}
                               <center>
                               <Form>
                               <Col xs={6} className="mb-3">
                               <div className='mb-3'>
                                    <label>Launchpad Name</label>
                                    <input id="inputID" type="text" placeholder='Enter the launchpad name' className="form-control form-control-field border-0" onChange={event => setName( event.target.value)}/>
                                </div>
                                </Col>              
                  <Col xs={6} className="mb-3">
                                <div className='mb-3'>
                                    <label>Launchpad Description</label>
                                    <textarea id="inputID" rows="4" placeholder='Write something about your launchpad' className="form-control form-control-field border-0"  onChange={event => setDescription( event.target.value)}/>
                                </div>
                                </Col>              
                  <Col xs={6} className="mb-3">
                    <label htmlFor="email">Email:</label>
                    <input placeholder="Email" type="email" className="form-control form-control-field border-0" id="email" onChange={event => setEmail( event.target.value)}/>                
                  </Col>              
                  <Col xs={6} className="mb-3">
                    <label htmlFor="citizenship">Starting Date:</label>
                    <input placeholder="Enter Board of Direct-1:" type="date"  id="startdate" className="form-control form-control-field border-0" onChange={event => setStartingDate( event.target.value)}/>                
                  </Col>              
                  <Col xs={6} className="mb-3">
                    <label htmlFor="citizenship">Ending Date:</label>
                    <input placeholder="Enter Board of Direct-2:" type="date"  id="enddate" className="form-control form-control-field border-0" onChange={event => setEndingingDate( event.target.value)}/>                
                  </Col>  
                  <Col xs={6} className="mb-3">
                    <label htmlFor="rewards">Total Sale:</label>
                    <input placeholder="Total Sale" type="text" className="form-control form-control-field border-0" id="rewards" onChange={event => setRewards( event.target.value)}/>                
                  </Col>  
                  <Col xs={6} className="mb-3">
                    <label htmlFor="rewards">Price:</label>
                    <input placeholder="Price" type="text" className="form-control form-control-field border-0" id="rewards" onChange={event => setPrice( event.target.value)}/>                
                  </Col>  
                            <label>Image</label>
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
</Form>
</center>
<center><ButtonLoad loading={loader} onClick={()=>submitform()}>Submit</ButtonLoad></center>

                            </Container>
                            </Layout>  
                         
                          
                            
                            <Row>
                        
                     
                      
                           
                              
                            
                            </Row>
                            <br/>
                          


                           
                        </Tab>
                    
                      
                             
                                                                 
                    </Tabs>
                </div>
            </Container>
        </Layout>

        
    )
}

export default TopCollectionsNFTN;