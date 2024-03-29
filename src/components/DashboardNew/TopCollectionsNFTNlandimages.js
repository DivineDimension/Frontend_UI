import React,{useState,useEffect} from 'react';
import Layout from './LayoutT';
import { Card, Col, Container, Row, Tabs, Tab, Badge, Button, InputGroup, Form, Dropdown,Modal} from 'react-bootstrap';
import { ToastContainer, Toast, Zoom, Bounce, toast} from 'react-toastify';
import firebase from '../../NFTFolder/firebase';
import GNFTTradingCardTab from './GNFTTradingCardTab';
import GNFTArtTab from './GNFTArtTab';
import GNFTPetTab from './GNFTPetTab';
import GNFTPhotographyTab from './GNFTPhotographyTab';
import GNFTSportsTab from './GNFTSportsTab';
import GNFTExploreTab from './GNFTExploreTab';
import islm from '../../assets/images/mesmerizing-shot-famous-historic-taj-mahal-agra-india.jpg';
import bud from '../../assets/images/Aachen Cathedral.jpg';
import scan from '../../assets/images/Stupa_Borobudur.jpg';
import mus from '../../assets/images/Humayun’s Tomb.jpg';
// import chr from '../../assets/images/brihadisvara.jpeg';
import chr from '../../assets/images/brTemple.png';
import hin from '../../assets/images/Fatehpur Sikri.jpg';
import w1 from '../../assets/images/wi1.jpeg';
import w2 from '../../assets/images/wi2.jpeg';
import w3 from '../../assets/images/wi3.jpeg';
import w4 from '../../assets/images/wi4.jpeg';
import w5 from '../../assets/images/wi5.jpeg';
import { createUserVisits } from '../../awsdatafile';


const TopCollectionsNFTN = () => {
    useEffect(() => {
        document.title = "DivineDimension | Avatar"
    }, [])    
    const[pageSize,setPageSize]=useState(12);     
    const [searchText, setSearchText] = React.useState('');    
    const[getrecent,setrecent]=useState("View All");            
    const[getImgreffalgoCount,setgetImgreffalgoCount]=useState([]);    
    const[getImgreffalgosale,setgetImgreffalgosale]=useState([]);    
    const[getImgreffalgosaleSports,setgetImgreffalgosaleSports]=useState([]);    
    const[getImgreffalgosalePet,setgetImgreffalgosalePet]=useState([]);    
    const[getImgreffalgosaleArts,setgetImgreffalgosaleArts]=useState([]);    
    const[getImgreffalgosalePhotography,setgetImgreffalgosalePhotography]=useState([]);
    const[getImgreffalgosaleTradingCards,setgetImgreffalgosaleTradingCards]=useState([]);    


   useEffect(()=>{getip()},[])
   const getip = async() =>{
    if(localStorage.getItem("EAWalletAddress")  === null || localStorage.getItem("EAWalletAddress")  === "" || localStorage.getItem("EAWalletAddress")  === " " || localStorage.getItem("wallet") === undefined || localStorage.getItem("EAWalletAddress") === ''){

    }else{
        let uv = await createUserVisits(localStorage.getItem("EAWalletAddress"),"Aptos",localStorage.getItem("EAWalletName"),"Virtual Tourism");
    }
   }
     



    return (    

        <Layout>
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
                        <Tab eventKey="all" title="Heritages">
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
                            <Col xxl={3} md={4} sm={6} xs={12} className='mb-4'>
                            <Card className='card-dash p-3 d-block border-0'>  
                                 <img src={w1} className='img-fluid'
                                                // width={100} height={100}
                                                ></img>  
                                                </Card>                                              
                                                             
                                </Col>
                                <Col xxl={3} md={4} sm={6} xs={12} className='mb-4'>
                            <Card className='card-dash p-3 d-block border-0'>  
                                 <img src={w2} className='img-fluid'
                                                // width={100} height={100}
                                                ></img>  
                                                </Card>                                              
                                                             
                                </Col>
                                <Col xxl={3} md={4} sm={6} xs={12} className='mb-4'>
                            <Card className='card-dash p-3 d-block border-0'>  
                                 <img src={w3} className='img-fluid'
                                                // width={100} height={100}
                                                ></img>  
                                                </Card>                                              
                                                             
                                </Col>
                                <Col xxl={3} md={4} sm={6} xs={12} className='mb-4'>
                            <Card className='card-dash p-3 d-block border-0'>  
                                 <img src={w5} className='img-fluid'
                                                // width={100} height={100}
                                                ></img>  
                                                </Card>                                              
                                                             
                                </Col>
                                <Col xxl={3} md={4} sm={6} xs={12} className='mb-4'>
                            <Card className='card-dash p-3 d-block border-0'>  
                                 <img src={w4} className='img-fluid'
                                                // width={100} height={100}
                                                ></img>  
                                                </Card>                                              
                                                             
                                </Col>
                              
                                </Row>
                                {/* <Row> */}
                                {/* <Col xxl={3} md={4} sm={6} xs={12} className='mb-4'>
                            <Card className='card-dash p-3 d-block border-0'>  
                                 <img src={chr} className='img-fluid'
                                                // width={100} height={100}
                                                ></img>  
                                                </Card>                                              
                                                             
                                </Col> */}
                                
                                {/* </Row> */}
                               
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
                        <Tab eventKey="UNESCO" title="UNESCO centers">
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
                            {/* <Col xxl={3} md={4} sm={6} xs={12} className='mb-4'>
                            <Card className='card-dash p-3 d-block border-0'>  
                                 <img src={islm} className='img-fluid'
                                                // width={100} height={100}
                                                ></img>  
                                                </Card>                                              
                                                             
                                </Col> */}
                                {/* <Col xxl={3} md={4} sm={6} xs={12} className='mb-4'>
                            <Card className='card-dash p-3 d-block border-0'>  
                                 <img src={bud} className='img-fluid'
                                                // width={100} height={100}
                                                ></img>  
                                                </Card>                                              
                                                             
                                </Col> */}
                                  <Col xxl={6} md={6} sm={6} xs={24} className='mb-2'>
                                    <Card className='card-dash p-3 d-block border-0'>  
                                    <div>
                                                                        
                                        </div>
                                        <br/>                                                                    
                                        <div className='card-img text-center mb-2'>                                            
                                                <img src={chr} alt="image" className='img-fluid' />                                            
                                        </div>
                                        <div className='d-flex mb-2 justify-content-between flex-wrap align-items-center'>                                        
                                        </div>                                        
                                        {/* <h4 className='mb-2'>{x.Name} <br /><span className='text-success'><h6> */}
                                                                                      
                                            {/* </h6></span></h4>                                         */}
                                        {/* <h6 className='mb-2'>{x.Description}</h6> */}
                                     <center><a href='https://divinedimension.itch.io/bigtempleavatar' target="_blank" rel="noreferrer">View</a>
                                        </center>   
                                            {/* <a href='https://divinedimension.itch.io/bigtemple' target="_blank" rel="noreferrer">View</a> */}
                                        {/* {x.NFTPrice === "" || x.NFTPrice === null || x.NFTPrice === undefined ?(
                                            <>                                                                                        
                                            <Button variant="blue" className='w-100' s>Buy NFT</Button>                                        
                                            </>
                                        ):(
                                            <Link to={{
                                                pathname: "/NFTn-details",            
                                                state:{allData:x}                                                
                                            }}>
                                            <Button variant="blue" className='w-100'>Buy NFT</Button>
                                            </Link>
                                        )}  */}
                                        
                                    </Card>
                                    
                                    </Col>
                                    <Col xxl={6} md={6} sm={6} xs={24} className='mb-2'>
                                    <Card className='card-dash p-3 d-block border-0'>  
                                    <div>
                                                                        
                                        </div>
                                        <br/>                                                                    
                                        <div className='card-img text-center mb-2'>                                            
                                                <img src={hin} alt="image" className='img-fluid' />                                            
                                        </div>
                                        <div className='d-flex mb-2 justify-content-between flex-wrap align-items-center'>                                        
                                        </div>                                        
                                        {/* <h4 className='mb-2'>{x.Name} <br /><span className='text-success'><h6> */}
                                                                                      
                                            {/* </h6></span></h4>                                         */}
                                        {/* <h6 className='mb-2'>{x.Description}</h6> */}
                                       
                                            {/* <a href='https://divinedimension.itch.io/bigtemple' target="_blank" rel="noreferrer">View</a> */}
                                        {/* {x.NFTPrice === "" || x.NFTPrice === null || x.NFTPrice === undefined ?(
                                            <>                                                                                        
                                            <Button variant="blue" className='w-100' s>Buy NFT</Button>                                        
                                            </>
                                        ):(
                                            <Link to={{
                                                pathname: "/NFTn-details",            
                                                state:{allData:x}                                                
                                            }}>
                                            <Button variant="blue" className='w-100'>Buy NFT</Button>
                                            </Link>
                                        )}  */}
                                        
                                    </Card>
                                    
                                    </Col>
                               
                              
                                </Row>
                                <Row>
                                {/* <Col xxl={3} md={4} sm={6} xs={12} className='mb-4'>
                            <Card className='card-dash p-3 d-block border-0'>  
                                 <img src={chr} className='img-fluid'
                                                // width={100} height={100}
                                                ></img>  
                                                </Card>                                              
                                                             
                                </Col> */}
                                {/* <Col xxl={3} md={4} sm={6} xs={12} className='mb-4'>
                            <Card className='card-dash p-3 d-block border-0'>  
                                 <img src={mus} className='img-fluid'
                                                // width={100} height={100}
                                                ></img>  
                                                </Card>                                              
                                                             
                                </Col> */}
                                </Row>
                               
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