import React,{ useEffect ,useState,useContext} from "react";
import { Link, useHistory } from "react-router-dom";
import {  Col, Container,Row,Button } from "reactstrap";
import ButtonLoad from 'react-bootstrap-button-loader';
import Compress from "react-image-file-resizer";
import Layout from '../components/DashboardNew/LayoutT';
import { ToastContainer, Zoom, toast} from 'react-toastify';
import fireDb from '../NFTFolder/firebase'
import launchpadDetails from '../components/DashboardNew/snippets/launchpad.json'
import {DataContext} from "../App";
const axios = require('axios');

const CreateClub = () => {  
    const value = useContext(DataContext);
    let history=useHistory();     
    const [getFile,setFile] = useState("") 
    const[loader, setLoader] = useState(false);
    const handleShowLoad = () => setLoader(true);
    const handleHideLoad = () => setLoader(false);              
    const[Name,setName]=useState("");    
    const[Address,setAddress]=useState("");
    const[Email,setEmail]=useState("");
    const[BoardName1,setBoardName1]=useState("");
    const[BoardName2,setBoardName2]=useState("");    
    const [getState,setStates] = useState("");  
    const [getZone,setZone] = useState("");          
    const [Imgname,setImgname] = useState("")
    const [Img,setImg] = useState("")
    const [CurrentExit,setCurrentExit] = useState([]);  
    console.log("Dataget",CurrentExit)
    const [showTestLoading, setshowTestLoading] = React.useState(false);  
    console.log("Test",showTestLoading)        
    
    const dbcallalgo=async()=>{      
      let req = [];
      if(localStorage.getItem("EAWalletAddress")  === null || localStorage.getItem("EAWalletAddress")  === "" || localStorage.getItem("EAWalletAddress")  === " " || localStorage.getItem("EAWalletAddress") === undefined || localStorage.getItem("EAWalletAddress") === ''){
      }
      else{      
        try{  
          //fireDb.auth().signInAnonymously().then(async(response)=>{           
          const hasRestaurant = await fireDb.database()
            .ref(`organizationclub/${localStorage.getItem('EAWalletAddress')}`)
            .orderByKey().limitToFirst(1).once('value')
            .then(res => res.exists());
            console.log("NewIdea",hasRestaurant)      
        //fireDb.auth().signInAnonymously().then((response)=>{      
        if(hasRestaurant){
          fireDb.database().ref("organizationclub").child(localStorage.getItem("EAWalletAddress")).on("value", (data) => {
            if (data) {            
              data.forEach((d) => {                
                let value=d.val();              
                req.push(            
                  {
                  "dbkey":value.dbkey,
                  "createdDate": value.createdDate,
                  "Name": value.Name,                  
                  "Location": value.Location,                  
                  "Email": value.Email,                  
                  "BOD1": value.BOD1,                  
                  "BOD2": value.BOD2,                  
                  "State": value.State,                
                  "Zone": value.Zone,                    
                  "algoAddress": value.algoAddress,                  
                  "selfiePath": value.selfiePath,            
                  "kycStatus":value.kycStatus,
                  "reviewedBy": value.reviewedBy,
                  "approvedBy": value.approvedBy,
                  "submittedDate": value.submittedDate,
                  "reviewedDate": value.reviewedDate,
                  "approvedDate": value.approvedDate,   
                  "identity":value.identity,                                             
                  "base64Image": value.base64Image,
                  "assetId": value.assetId,                  
                  "ipfslink":value.ipfslink,
                  "encrypted":value.encrypted,
                  "Password":value.Password,
                  "PasswordKey":value.PasswordKey,
                  "pinataUpload":value.pinataUpload,
                  "pinataNFTupload":value.pinataNFTupload,                                
                })                
                setCurrentExit(req);
                setshowTestLoading(true)
                });        
              }
              else{
                setshowTestLoading(false)
              }
              //setCurrentExit(false);
          });
        }else{          
          setCurrentExit([""]);
          setshowTestLoading(false)
        }        
        //})
        //})
        }catch{          
        }         
        } 
       
    }      
    useEffect(()=>{dbcallalgo()},[])

    const captureFile =async(event) => {
      event.stopPropagation()
      event.preventDefault()
      const file = event.target.files[0]
      setImgname(file.name)
      setFile(file)
      let reader = new window.FileReader()
      try{
      Compress.imageFileResizer(file, 500,500 , 'JPEG', 200, 0,
      uri => {        
        setImg(uri)
      },
      'base64'
      );
      reader.readAsArrayBuffer(file)      
    }catch (err) {
    }
    };
    

    const UploadDb=async()=>{            
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
        else if(BoardName1 === ""){          
          toast.dismiss()
          toast.warning(`Please enter BOD-1`,{autoClose: 5000});            
          handleHideLoad()                     
        }        
        else if(BoardName2 === ""){          
          toast.dismiss()
          toast.warning(`Please enter BOD-2`,{autoClose: 5000});            
          handleHideLoad()                     
        }        
        else if(Address === ""){
          toast.dismiss()
          toast.warning(`Please enter Location`,{autoClose: 5000});            
          handleHideLoad()                                         
        }
        else if(Email === ""){
          toast.dismiss()
          toast.warning(`Please enter Email`,{autoClose: 5000});            
          handleHideLoad()                                                   
        }        
        else if(getZone === ""){
          toast.dismiss()
          toast.warning(`Please Select Zone`,{autoClose: 5000});            
          handleHideLoad()                                                                                 
        }
        else if(getState === ""){
          toast.dismiss()
          toast.warning(`Please Select State`,{autoClose: 5000});            
          handleHideLoad()                                                                                 
        }        
        else if(Img === ""){
          toast.dismiss()
          toast.warning(`Please Upload Image`,{autoClose: 5000});            
          handleHideLoad()                                                                                                     
        }   
        else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(Email))){
          toast.warning(`Please Enter Valid E-mail`,{autoClose:5000})            
          handleHideLoad()            
        } 
        else if(showTestLoading === false){     
          console.log("CurreentE",CurrentExit)          
          toast.dismiss()               
            handleShowLoad()     
            let today = new Date();
            let dd = String(today.getDate()).padStart(2, '0');
            let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            let yyyy = today.getFullYear();
            today = mm + '/' + dd + '/' + yyyy;                                                                                                 
            // const formData = new FormData();
            // formData.append("file",getFile);
            // const resFile = await axios({
            //   method: "post",
            //   url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
            //   data: formData,
            //   headers: {
            //       'pinata_api_key': value[0].pinataapikey,
            //       'pinata_secret_api_key': value[0].pinatasecretkey,
            //       "Content-Type": "multipart/form-data"
            //   },
            // });
            // const realipfsurl = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;                  
            // const addnfturl = `ipfs://${resFile.data.IpfsHash}`
            // const CryptoJS = require("crypto-js");              
            // let encrypted = CryptoJS.AES.encrypt(PasswordEny,PasswordEny).toString();
            console.log("EnyPassword");
            //asset optin end here
              //fireDb.auth().signInAnonymously().then((response)=>{      
                let ref2=fireDb.database().ref(`organizationclub/${localStorage.getItem('EAWalletAddress')}`);            
                const db = ref2.push().key;                                                
                ref2.child(db).set({
                  "dbkey":db,
                  "createdDate": today,
                  "Name": Name,                  
                  "Location": Address,                  
                  "Email": Email,                  
                  "BOD1": BoardName1,                  
                  "BOD2": BoardName2,                  
                  "State": getState,                
                  "Zone": getZone,                    
                  "algoAddress": localStorage.getItem("EAWalletAddress"),                  
                  "selfiePath": Img,            
                  "kycStatus": "create",
                  "reviewedBy": "pending",
                  "approvedBy": "",
                  "submittedDate": today,
                  "reviewedDate": "",
                  "approvedDate": "",
                  "identity":Img,                              
                  "base64Image":Img,
                  "assetId": "",                  
                  "ipfslink":"",
                  "encrypted":"",
                  "Password":"",
                  "PasswordKey":"",
                  "pinataUpload":"realipfsurl",
                  "pinataNFTupload":"addnfturl",                                
                })
                  .then(async()=>{                    
                            toast.success("Register Club successful",{autoClose: 5000});                 
                            handleHideLoad() 
                            await sleep(5000)
                            history.push('/createteam')                          
                            })                                                            
        }       
        else{
          toast.dismiss()
          toast.warning(`Your Profile Already Create`,{autoClose: 5000});            
          handleHideLoad()                                                                                                                                                 
          }                             
    }                 
    const handleChange = (event) => {
      setZone(event.target.value);
    };
    const handleChange2 = (event) => {
      setStates(event.target.value);
    };
    
    
    const toastDiv = (txId) =>
    (
    <div>
         <p> Transaction is successful &nbsp;<a style={{color:'#133ac6'}} href={txId} target="_blank" rel="noreferrer"><br/><p style={{fontWeight: 'bold'}}>View in Algoexplorer <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M11.7176 3.97604L1.69366 14L0.046875 12.3532L10.0697 2.32926H1.23596V0H14.0469V12.8109H11.7176V3.97604Z" fill="#133ac6"/>
          </svg></p></a></p>  
     </div>
    );

    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

return(
    <Layout>
      <ToastContainer position='bottom-right' draggable = {false} transition={Zoom} autoClose={4000} closeOnClick = {false}/>
      {localStorage.getItem('EAWalletAddress') === null || localStorage.getItem('EAWalletAddress') === undefined || localStorage.getItem('EAWalletAddress') === "" ? (
        <Container fluid>           
        <Row className="justify-content-center">
            <Col xl="8" lg="8" md="10" sm="12">
                <div className="card-bond">
                    <div className="p-3 card-bond-inner">
                      <center>
                    <h4 className="mb-3">please connect your wallet</h4>                                                                                                        
                      </center>
                    </div>
                </div>
            </Col>
        </Row>
        </Container>          
      ):(      
        <Container fluid>              
        <Row className="justify-content-center">
        <Col lg="7" md="10" sm="12">
        <div className="note mb-60 d-flex justify-content-center">                    
          <p><strong>Note:</strong> This is a TestNet version. Kindly refrain from uploading your original documents here.</p>
        </div>
        {CurrentExit === "" || CurrentExit === null || CurrentExit === undefined ? (        
          <Container fluid="md">                                              
          <form>
                <Row>
                  <Col xs={6} className="mb-3">
                    <label htmlFor="name">Club-Name:</label>
                    <input placeholder="Enter Club Name" type="text" className="form-control form-control-field border-0" id="name" onChange={event => setName( event.target.value)}/>                
                  </Col>              
                  <Col xs={6} className="mb-3">
                    <label htmlFor="address">Location:</label>
                    <input placeholder="Enter Location" type="text" className="form-control form-control-field border-0" id="address" onChange={event => setAddress( event.target.value)}/>                
                  </Col>
                  <Col xs={6} className="mb-3">
                    <label htmlFor="email">Email:</label>
                    <input placeholder="Email" type="email" className="form-control form-control-field border-0" id="email" onChange={event => setEmail( event.target.value)}/>                
                  </Col>              
                  <Col xs={6} className="mb-3">
                    <label htmlFor="citizenship">Board of Direct-1:</label>
                    <input placeholder="Enter Board of Direct-1:" type="text"  id="citizenship" className="form-control form-control-field border-0" onChange={event => setBoardName1( event.target.value)}/>                
                  </Col>              
                  <Col xs={6} className="mb-3">
                    <label htmlFor="citizenship">Board of Direct-2:</label>
                    <input placeholder="Enter Board of Direct-2:" type="text"  id="citizenship" className="form-control form-control-field border-0" onChange={event => setBoardName2( event.target.value)}/>                
                  </Col>              
                  <Col xs={6} className="mb-3">
                        <label htmlFor="top">Select State:</label>
                        {/* <input placeholder="type of proof" type="text"  id="top" className="form-control form-control-field border-0" onChange={event => setTypeOfProof( event.target.value)}/>                 */}
                        <select className="form-select border-0 p-0 bg-transparent noarrow" style={{color:'#808080'}} value={getState} onChange={handleChange2}>          
                        <option className="form-select border-0 p-0 bg-transparent noarrow" value= "WEST">WEST</option>                  
                        <option className="form-select border-0 p-0 bg-transparent noarrow" value= "EAST">EAST</option>                  
                        <option className="form-select border-0 p-0 bg-transparent noarrow" value= "SOUTH">SOUTH</option>                  
                        <option className="form-select border-0 p-0 bg-transparent noarrow" value= "NORTH">NORTH</option>                                      
                        </select>
                  </Col>
                  <Col xs={6} className="mb-3">
                        <label htmlFor="top">Select Zone:</label>                    
                        <select className="form-select border-0 p-0 bg-transparent noarrow" style={{color:'#808080'}} value={getZone} onChange={handleChange}>          
                        <option className="form-select border-0 p-0 bg-transparent noarrow" value= "WEST">WEST</option>                  
                        <option className="form-select border-0 p-0 bg-transparent noarrow" value= "EAST">EAST</option>                  
                        <option className="form-select border-0 p-0 bg-transparent noarrow" value= "SOUTH">SOUTH</option>                  
                        <option className="form-select border-0 p-0 bg-transparent noarrow" value= "NORTH">NORTH</option>                                      
                        </select>
                  </Col>             
                  <Col xs={12} md={6} className="mb-3">
                    <label htmlFor="fileid">Select Logo:</label>
                    <input type="file" name="tfile" id="fileid" onChange = {captureFile} className="form-control form-control-field border-0"/>                
                  </Col>                            
                </Row>            
               <ButtonLoad loading={loader} className='w-100 mb-3' onClick={()=>{UploadDb()}}>UPLOADS</ButtonLoad>                           
              </form>              
          </Container>
        ):(
        <>
            {CurrentExit[0] === null || CurrentExit[0] === "" || CurrentExit[0] === undefined ? (
              <Container fluid="md">                  
              <form>
                <Row>
                  <Col xs={6} className="mb-3">
                    <label htmlFor="name">Club-Name:</label>
                    <input placeholder="Enter Club Name" type="text" className="form-control form-control-field border-0" id="name" onChange={event => setName( event.target.value)}/>                
                  </Col>              
                  <Col xs={6} className="mb-3">
                    <label htmlFor="address">Location:</label>
                    <input placeholder="Enter Location" type="text" className="form-control form-control-field border-0" id="address" onChange={event => setAddress( event.target.value)}/>                
                  </Col>
                  <Col xs={6} className="mb-3">
                    <label htmlFor="email">Email:</label>
                    <input placeholder="Email" type="email" className="form-control form-control-field border-0" id="email" onChange={event => setEmail( event.target.value)}/>                
                  </Col>              
                  <Col xs={6} className="mb-3">
                    <label htmlFor="citizenship">Board of Direct-1:</label>
                    <input placeholder="Enter Board of Direct-1:" type="text"  id="citizenship" className="form-control form-control-field border-0" onChange={event => setBoardName1( event.target.value)}/>                
                  </Col>              
                  <Col xs={6} className="mb-3">
                    <label htmlFor="citizenship">Board of Direct-2:</label>
                    <input placeholder="Enter Board of Direct-2:" type="text"  id="citizenship" className="form-control form-control-field border-0" onChange={event => setBoardName2( event.target.value)}/>                
                  </Col>              
                  <Col xs={6} className="mb-3">
                        <label htmlFor="top">Select State:</label>
                        {/* <input placeholder="type of proof" type="text"  id="top" className="form-control form-control-field border-0" onChange={event => setTypeOfProof( event.target.value)}/>                 */}
                        <select className="form-select border-0 p-0 bg-transparent noarrow" style={{color:'#808080'}} value={getState} onChange={handleChange2}>          
                        <option className="form-select border-0 p-0 bg-transparent noarrow" value= "WEST">WEST</option>                  
                        <option className="form-select border-0 p-0 bg-transparent noarrow" value= "EAST">EAST</option>                  
                        <option className="form-select border-0 p-0 bg-transparent noarrow" value= "SOUTH">SOUTH</option>                  
                        <option className="form-select border-0 p-0 bg-transparent noarrow" value= "NORTH">NORTH</option>                                      
                        </select>
                  </Col>
                  <Col xs={6} className="mb-3">
                        <label htmlFor="top">Select Zone:</label>                    
                        <select className="form-select border-0 p-0 bg-transparent noarrow" style={{color:'#808080'}} value={getZone} onChange={handleChange}>          
                        <option className="form-select border-0 p-0 bg-transparent noarrow" value= "WEST">WEST</option>                  
                        <option className="form-select border-0 p-0 bg-transparent noarrow" value= "EAST">EAST</option>                  
                        <option className="form-select border-0 p-0 bg-transparent noarrow" value= "SOUTH">SOUTH</option>                  
                        <option className="form-select border-0 p-0 bg-transparent noarrow" value= "NORTH">NORTH</option>                                      
                        </select>
                  </Col>                               
                  <Col xs={12} md={6} className="mb-3">
                    <label htmlFor="fileid">Select Logo:</label>
                    <input type="file" name="tfile" id="fileid" onChange = {captureFile} className="form-control form-control-field border-0"/>                
                  </Col>                            
                </Row>            
               <ButtonLoad loading={loader} className='w-100 mb-3' onClick={()=>{UploadDb()}}>UPLOADS</ButtonLoad>                           
              </form>              
              </Container>
            ):(
              <Container fluid>           
              <Row className="justify-content-center">
                  <Col xl="8" lg="8" md="10" sm="12">
                      <div className="card-bond">
                          <div className="p-3 card-bond-inner">
                            <center>
                          <h4 className="mb-3">Club Details uploaded successfully</h4>                                                                                                        
                          <p className="mb-3">Click Below Button,Go to Upload Team-Details</p>   
                          <Link to="/createteam" ><Button variant="blue" className="text-white" >Create Team</Button></Link>
                            </center>
                          </div>
                      </div>
                  </Col>
              </Row>
              </Container>            
            )}
        </>
        )}
        </Col>
        </Row>
        </Container>        
      )}        
    </Layout>                      
)
}

export default CreateClub;