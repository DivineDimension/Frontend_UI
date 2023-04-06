import React,{useState,useEffect} from 'react';
import Layout from './LayoutT';
import { Card, Col, Container, Row, Tabs, Tab, Badge, Button, InputGroup, Form, Dropdown,Modal} from 'react-bootstrap';
import { ToastContainer, Toast, Zoom, Bounce, toast} from 'react-toastify';
import firebase from '../../NFTFolder/firebase';
import { Link ,useHistory} from 'react-router-dom';
import GNFTTradingCardTab from './GNFTTradingCardTab';
import LandUpdate from './landPrice';
import LandBuy from './landBuynew';
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
import plus from '../../assets/images/plusicon.png';
import minus from '../../assets/images/minusicon.png';
import { async } from 'q';
import web3 from '../../web3';
import { getallAvatarSale, getallLand, getallLandbywallet, getallLandSale } from '../../awsdatafile';
import { landAbi } from '../../abi&contractfiles/abi';
import { landAddress } from '../../abi&contractfiles/contractaddress';
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
    console.log("onwedland",ownedLand)  
    const[allLand,setAllLand]=useState([]); 
    const zoomin = async() => {
        var GFG = document.getElementById("geeks");
        var currHeight = GFG.clientHeight;
        var currwidth = GFG.clientWidth;
        console.log("currnhe",currHeight)
            GFG.style.height = (currHeight + 40) + "px";
            GFG.style.width = (currwidth + 40) + "px";
    }
    const zoomout = async() => {
        var GFG = document.getElementById("geeks");
        var currHeight = GFG.clientHeight;
        var currwidth = GFG.clientWidth;
            GFG.style.height = (currHeight - 40) + "px";
            GFG.style.width = (currwidth - 40) + "px";
    }

    useEffect(()=>{getlandbywallet()},[])
   const getlandbywallet = async() =>{
    if(localStorage.getItem("walletAddress") === null || localStorage.getItem("walletAddress") === ""|| localStorage.getItem("walletAddress") === undefined){

    }
    else{
        let ownedland = await getallLandSale("yes");
        console.log("getallLandSale",ownedland)
        setOwnedLand(ownedland.data2);
        let allLand = await getallLandSale("no");
        console.log("onwedland",allLand)
        setAllLand(allLand.data2);
    }
    
   }

   const updatePrice = async() =>{
    const accounts = await web3.eth.getAccounts();
    const landcontract = new web3.eth.Contract(landAbi, landAddress);
    // let hash =  await landcontract.methods.putForSale(,getprices).send({from:accounts[0]});
   }
     


    return (    

        <Layout>
            <div className='sidebar-inner d-none d-xl-flex align-items-start flex-wrap'>
            <Link to="/map">Map</Link>
                {/* <Link to="/create-land">Create Land</Link> */}
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
                            {/* <Button > */}
                            {/* <img src={plus} onClick={()=>zoomin()} width={50}></img>    &nbsp; */}
		{/* Zoom-In */}
	{/* </Button> */}
	
	{/* <Button  > */}
                            {/* <img src={minus} onClick={()=>zoomout()} width={50}></img> */}
		{/* Zoom-Out */}
	{/* </Button> */}
                            <Row>
                            {/* <Col xxl={3} md={4} sm={6} xs={12} className='mb-4'> */}
                            {/* <Card className='card-dash p-3 d-block border-0'>   */}
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
                                                {/* </Card>
                            //  className='img-fluid'
                                                // width={100} height={100}
                                                                                               */}
                                                             
                                {/* </Col> */}
                            {/* {getImgreffalgosaleSports === null || getImgreffalgosaleSports === "" || getImgreffalgosaleSports === undefined || getImgreffalgosaleSports[0] === null || getImgreffalgosaleSports[0] === "" || getImgreffalgosaleSports[0] === undefined || filterdata1()[0] === null || filterdata1()[0] === "" || filterdata1()[0] === undefined ? (
                                <>
                                {filterdata2static2().map((x, index) => {  
                                    if(index<pageSize)    
                                    return(
                                        <GNFTSportsTab x={x}/>                                     
                                    )
                                })}      
                                </>
                            ) : (
                            <>
                            {filterdata1().map((x, index) => {  
                                if(index<pageSize)                                                 
                                return(
                                    <GNFTSportsTab x={x}/>                                                                                                                                                                                             
                                )
                            })}   
                            </>
                            )}                              */}
                            </Row>

                            {/* {getImgreffalgosaleSports.length <= 12 ? (
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

                            ) }                             */}
                   
                        </Tab>

                        <Tab eventKey="Buyland" title="Buy Land">
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
                               {r.status ==="yes" ?
                               (<>
                               
                               </>):(<>
                                <LandBuy x={r}/>
                               </>)}
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

                            {/* {getImgreffalgosale.length <= 10 ? (
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

                            ) }                             */}
                        </Tab>
                        <Tab eventKey="Auction" title="Land Auction">
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
                         {ownedLand === "" || ownedLand === null || ownedLand === undefined || ownedLand === "undefined" ? 
                         (<>
                        
                         </>):(<>
                         {ownedLand.map((r,i)=>{
                            return(
                
                                <>

                               {r.status === "no" ?
                               (<>
                                <LandUpdate x={r}/>
                               </>):(<>
                               
                               </>)}
                               
                                 {/* <GNFTExploreTab x={r}/>    */}
                                {/* <Col xxl={3} md={4} sm={6} xs={12} className='mb-4'>
                            <Card className='card-dash p-3 d-block border-0'> 
                            <div className='card-img text-center mb-2'>    
                                 <img src={r.imagePath} className='img-fluid'
                                                // width={100} height={100}
                                                ></img>  
                                                </div>
                                                <div className='d-flex mb-2 justify-content-between flex-wrap align-items-center'>                        
                    </div>
                    <h5 className='mb-2'>{r.name} <br />
                                        </h5>
                                                <div className="input-group-max d-flex align-items-center text-nowrap px-3 input-group-max-lg w-100">
                        <input type="number" placeholder='Enter Price' className='form-control' value={((getprices))} onChange={event => setprices((event.target.value))} />
                        </div>
                        <div className='d-flex mb-2 justify-content-between flex-wrap align-items-center'>                        
                    </div>
                    
                        <ButtonLoad loading={loader} variant="blue" className='w-100' onClick={()=>updatePrice()} ><Link to={{
                                                pathname: "/price-update",            
                                                state:{allData:r}                                                
                                            }}>Update Price and Put for Sale</Link></ButtonLoad>                                        
                                                </Card>                                              
                                                             
                                </Col> */}
                                </>
                            )
                         })}
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

                            {/* {getImgreffalgosale.length <= 10 ? (
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

                            ) }                             */}
                        </Tab>
                      
                             
                                                                 
                    </Tabs>
                </div>
            </Container>
        </Layout>

        
    )
}

export default TopCollectionsNFTN;