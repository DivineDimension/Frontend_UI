import { useEffect } from "react";
import { useState } from "react";
import { Link } from 'react-router-dom';
import { Card, Col, Container, Row, Tabs, Tab, Badge, Button, InputGroup, Form, Dropdown,Modal} from 'react-bootstrap';
import Layout from '../components/DashboardNew/LayoutT';
import fireDb from '../NFTFolder/firebase'
const View = () => {
    //let history = useHistory();            
    const[getrecent,setrecent]=useState("View All");    
    const[pageSize,setPageSize]=useState(12);     
    const[getImgreffalgoActivity,setgetImgreffalgoActivity]=useState([]);         
    console.log("DataEx",getImgreffalgoActivity)       

    const dbcallalgoActivity=async()=>{        
        let req = [];
        if(localStorage.getItem("EAWalletAddress")  === null || localStorage.getItem("EAWalletAddress")  === "" || localStorage.getItem("EAWalletAddress")  === " " || localStorage.getItem("wallet") === undefined || localStorage.getItem("EAWalletAddress") === ''){
        }
        else{            
        let getalgo=localStorage.getItem("EAWalletAddress");      
        //fireDb.auth().signInAnonymously().then((response)=>{              
        fireDb.database().ref("CreatedTokens").child(getalgo).on("value", (data) => {
            if (data) {
              data.forEach((d) => {                
                let value=d.val();                
                req.push(            
                  {                    
                    keyId:value.keyId,
                    Owner:value.Owner,                    
                    TokenAddress:value.TokenAddress,
                    Tokenname:value.Tokenname,
                    TokenSymbol:value.TokenSymbol,
                    Totalsupply:value.Totalsupply,
                    Minted:value.Minted,
                    Burned:value.Burned,  
                    date:value.date,                              
                })                
                });        
              }
              req.reverse()
              setgetImgreffalgoActivity(req);              
            });    
        //})              
        }        
    }      
    useEffect(()=>{dbcallalgoActivity()},[])

    const filterdata5=()=>{
        let dateset=new Date().toDateString();
        //let today= new Date();
        // let weekdate=new Date(today.getFullYear(), today.getMonth(), today.getDate()-1).toDateString();                
        if(getrecent === "View All"){                    
            return getImgreffalgoActivity;                                                
        }                          
        if(getrecent === "Recently added"){        
            let data = getImgreffalgoActivity.filter((val)=>{                                                                                        
                return dateset === val.TimeStamp                        
            })
            return data;                                                
        }
        if(getrecent === "Low to High"){
          let data=getImgreffalgoActivity.reverse().sort((a,b)=>{ return parseFloat(a.NFTPrice/1000000) - parseFloat(b.NFTPrice/1000000)})          
          return data;
        }
        if(getrecent ===  "High to Low"){
          let data=getImgreffalgoActivity.reverse().sort((a,b)=>{ return parseFloat(b.NFTPrice/1000000) - parseFloat(a.NFTPrice/1000000)})          
          return data;
        }                
        return getImgreffalgoActivity.reverse()
    }
    const decrementSize=()=>{
        if(pageSize >= 16){
        setPageSize(pageSize-4)
        }        
    }

    return (
        <Layout>
            <div className='sidebar-inner d-none d-xl-flex align-items-start flex-wrap'>
                <Link to="/my-NFT">Profile</Link>
                <Link to="/upcoming">Staking</Link>
                <Link to="/upcoming">Badges</Link>
                <Link className='active' to="/viewtoken">Inventory</Link>
                <Link className='active' to="/viewtoken">Claim</Link>
                <Link to="/avatar">Avatar</Link>
                <Link to="/create-artists">Settings</Link>
            </div>
        <div className="justify-content-center position-relative">
            <Link to="/" className="flat-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000" className="d-block" viewBox="0 0 16 16">
                    <path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z"/>
                </svg>    
            </Link>  
        <Container fluid>                                
        <Tabs defaultActiveKey="Activity" id="uncontrolled-tab-example" className='dashboard-tabs'>                       
                        <Tab eventKey="Activity" >                            
                            <Row>
                            {getImgreffalgoActivity === null || getImgreffalgoActivity === "" || getImgreffalgoActivity === undefined || getImgreffalgoActivity[0] === null || getImgreffalgoActivity[0] === "" || getImgreffalgoActivity[0] === undefined || filterdata5()[0] === null || filterdata5()[0] === "" || filterdata5()[0] === undefined ? (
                                <div className="no-found py-5p text-center">
                                <h2>No Data Found</h2>                            
                                <Link to="/createtoken" className='btn btn-primary'>Browse marketplace</Link>
                                </div>
                            ) : (
                            <>
                            {filterdata5().map((x, index) => {   
                                if(index<pageSize)                
                                return(                                     
                                    <Card className='card-dash p-3 d-block border-0'>
                                    <div className='activity-item d-flex align-items-center mb-3'>        
                                            <div className="activity-content">                                                                                                
                                                {x.Owner === "" || x.Owner === null || x.Owner === undefined ?(<>
                                                </>):(<>
                                                    <p style={{cursor: 'pointer'}} onClick={() => window.open(`https://mumbai.polygonscan.com/address/${x.Owner}`)}>  {x.Owner}</p>
                                                </>)}                                            
                                                {x.TokenAddress === "" || x.TokenAddress === null || x.TokenAddress === undefined ?(<>
                                                </>):(<>
                                                    <p style={{cursor: 'pointer'}} onClick={() => window.open(`https://mumbai.polygonscan.com/address/${x.TokenAddress}`)}>  {x.TokenAddress}</p>
                                                </>)}
                                                <p className="heading mb-0">{x.Tokenname}</p>
                                                <p className="heading mb-0">{x.TokenSymbol}</p>                                                
                                                <p className="heading mb-0">{x.Totalsupply}</p>   
                                                
                                            </div>
                                        </div>                                                                         
                                    </Card>                                                                        
                                )
                            })}  
                            </>
                            )}                                                              
                            </Row>

                            {getImgreffalgoActivity <= 10 ? (
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
                </Tabs>
        </Container>                            
        </div>
        </Layout>
    );
}

export default View;