import React,{useState,useEffect} from 'react';
import Layout from './LayoutT';
import { Link ,useHistory} from 'react-router-dom';
import { Card, Col, Container, Row, Button, Form,Modal} from 'react-bootstrap';
import ButtonLoad from 'react-bootstrap-button-loader';
import { ToastContainer, Zoom, toast} from 'react-toastify';
import firebase from '../../NFTFolder/firebase';
import Compress from "react-image-file-resizer";
import { createLandDetails, createprofile } from '../../awsdatafile';
import { async } from 'q';
import web3 from '../../web3';
import { landAbi } from '../../abi&contractfiles/abi';
import { landAddress } from '../../abi&contractfiles/contractaddress';


const CreateArtists = () => {
    useEffect(() => {
        document.title = "DivineDimension | Create Artists"
    }, [])
    let history=useHistory();
    const[loader, setLoader] = useState(false);
    const handleShowLoad = () => setLoader(true);
    const handleHideLoad = () => setLoader(false);    
    const [UserName,setUserName] = useState("");    
    const [longitude,setlongi] = useState("");  
    const [latitude,setlatitude] = useState("");  
    const [SocialUrl,setSocialUrl] = useState("");
    const [Twitter,setTwitter] = useState("");
    const [Email,setEmail] = useState("");
    const [Bio,setBio] = useState("");    
    const[getIProfile,setgetIProfile]=useState([""]);  
    console.log("ProfileAlready",getIProfile) 
    const [Img,setImg] = useState("")    
    const [Imgname,setImgname] = useState("") 
    const [descrp,setdescrp] = useState("") 
    
    const landcontract = new web3.eth.Contract(landAbi, landAddress);
    // useEffect(() => {fetchcontract()},[])
    // const fetchcontract = async() =>{
    //     const landcontract = new web3.eth.Contract(landAbi, landAddress);
    //     let assetid = await landcontract.methods.encodeTokenId(1,1).call();
    //     console.log("assetid",assetid)
    // }

    const setlati = async(x) => {
        let ext = await landcontract.methods.exists(longitude,x).call();
        // console.log("exixits",ext)
        if(ext){
            toast.warn("Choose another longitude or latitude")
        }
        else{
            setlatitude(x)
        }
    }
    
          
    const captureFile =async(event) => {
        event.stopPropagation()
        event.preventDefault()
        const file = event.target.files[0]
        setImgname(file.name)
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
    };
  
    // const CreateArtist = async() =>{
    //     let succ = await createprofile();
    // }
    const CreateArtist = async() =>{
        handleShowLoad();
        let ext = await landcontract.methods.exists(longitude,latitude).call();
        if(UserName === null || UserName === "" || UserName === undefined){            
            toast.warning(`please enter land name`,{autoClose:5000})
            handleHideLoad()
        }
        if(descrp === null || descrp === "" || descrp === undefined){            
            toast.warning(`please enter descrp`,{autoClose:5000})
            handleHideLoad()
        }
        else if(latitude === null || latitude === "" || latitude === undefined){            
            toast.warning(`please enter latitude`,{autoClose:5000})
            handleHideLoad()
        }
        else if(longitude === null || longitude === "" || longitude === undefined){            
            toast.warning(`please enter longitude`,{autoClose:5000})
            handleHideLoad()
        }
        else if(ext){            
            toast.warning(`please choose different longitude or latitude`,{autoClose:5000})
            handleHideLoad()
        }
        
        else if(Img === "" || Img === null || Img === undefined){            
            toast.warning(`please Upload Image`,{autoClose:5000})
            handleHideLoad()
        }
        else if(localStorage.getItem("walletAddress") === null || localStorage.getItem("walletAddress") === undefined || localStorage.getItem("walletAddress") === "" || localStorage.getItem("walletAddress") === " " ){            
            toast.warning(`please connect your wallet`,{autoClose:5000})
            handleHideLoad()
        }else {     
            //firebase.auth().signInAnonymously().then((response)=>{           
            // let ref2=firebase.database().ref(`EPuserprofile/${localStorage.getItem('EAWalletAddress')}`);                    
            // let dateset=new Date().toDateString();
            // ref2.set({
            // Imageurl:Img,bgurl:"",
            // UserName:UserName,Customurl:"",walletAddress:localStorage.getItem('EAWalletAddress'),
            // TimeStamp:dateset,Twittername:Twitter,Personalsiteurl:SocialUrl,Email:Email,Bio:Bio,valid:""})
            // .then(async()=>{             
            //     handleHideLoad()                
            //     toast.dismiss()
            //     toast.success(`Updated Details of The Artist`,{autoClose:5000})
            //     handleHideLoad()
            //     await sleep(2000)
            //     done()
            // }).catch((err) => {                                    
            //     handleHideLoad()                
            //     toast.error(`your browser appearing issue`,{autoClose:3000})
            //     handleHideLoad()
            //     done()
            // });  
            try{
                const accounts = await web3.eth.getAccounts();
               let hash =  await landcontract.methods.assignNewParcel(longitude,latitude,accounts[0]).send({from:accounts[0]});
                // on('transactionHash',function(hash){      
                console.log("hash",hash.transactionHash)
                let assetid = await landcontract.methods.encodeTokenId(longitude,latitude).call();
                
                // //  let id = "https://mumbai.polygonscan.com/tx/" + hash;
                // //  toast.success(toastDiv(id));
                // //  toast.success(`Transaction Success ${hash}`);
                //  // window.location.reload();
                //  firstrender();
                //  handleHideMint();
                //  setenteredamount("")
                //  setelemreward("")
                //  setelemmint("")
                 
                //  })
                await createLandDetails(UserName,descrp,latitude,longitude,assetid,localStorage.getItem('walletAddress'),Img,localStorage.getItem('walletAddress'))
                handleHideLoad()                
                toast.dismiss()
                toast.success(`Updated Details of The Artist`,{autoClose:5000})
                handleHideLoad()
                await sleep(2000);
                done()
            }catch(err){
                handleHideLoad()                
                toast.error(`your browser appearing issue`,{autoClose:3000})
                handleHideLoad()
                done()
            }
            //})             
        }
         
    }

   
 
    const done=()=>{    
        history.push("/my-NFT")
        window.location.reload(false);    
    } 
    const clearImage = () =>{
        setImg("")
      }
      function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
     }
  
    return (
        <Layout>
            {/* <div className='sidebar-inner d-none d-xl-flex align-items-start flex-wrap'>
                <Link to="/my-NFT">Profile</Link>
                <Link to="/upcoming">Staking</Link>
                <Link to="/upcoming">Badges</Link>
                <Link to="/viewtoken">Inventory</Link>
                <Link to="/viewtoken">Claim</Link>
                <Link to="/avatar">Avatar</Link>
                <Link className='active' to="/create-artists">Settings</Link>
            </div> */}
            <div className='sidebar-inner d-none d-xl-flex align-items-start flex-wrap'>
            <Link to="/map">Map</Link>
                <Link to="/create-land">Create Land</Link>
            </div>
            <Container>
            <ToastContainer position='bottom-right' draggable = {false} transition={Zoom} autoClose={4000} closeOnClick = {false}/>
                <Row className='justify-content-center'>
                    <Col md={10} lg={7}>
                        <Card className='card-dash border-0 d-block'>
                            <div>
                                {/* <h3 className='mb-1'>ASA Artists</h3> */}
                                <p>Create Land</p>
                            </div>
                            <hr className='my-4' />

                               <Form>
                               <div className='mb-3'>
                                    <label>Enter Land name </label>                                    
                                        <input type="text" id="inputID" placeholder='Enter the land name'  className="form-control form-control-field border-0" onChange={event => setUserName( event.target.value)}/>
                                </div>
                                <div className='mb-3'>
                                    <label>Enter Description </label>                                    
                                        <input type="text" id="inputID" placeholder='Enter the land Description'  className="form-control form-control-field border-0" onChange={event => setdescrp( event.target.value)}/>
                                </div>
                                <div className='mb-3'>
                                    <label>Choose Longitude </label>                                    
                                        <input type="number" id="inputID" placeholder='Enter the longitude value'  className="form-control form-control-field border-0" onChange={event => setlongi( event.target.value)}/>
                                </div>
                                {longitude?(<>
                                    <div className='mb-3'>
                                    <label>Choose Latitude</label>                                    
                                        <input type="number" id="inputID" placeholder='Enter the Latitude value' className="form-control form-control-field border-0" onChange={event => setlati( event.target.value)}/>                                    
                                </div>
                                </>):(<></>)}
                                
                                
                                
                                <div className='mb-3'>
                                    <label>Your avatar</label>
                                    <div className='upload-box text-center'>                                    
                                      {Img === null || Img === "" || Img === undefined ?(
                                        <>                                        
                                        <input id="upload" type="file" hidden onChange = {captureFile}/>
                                        <label htmlFor='upload'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi mb-3 bi-upload" viewBox="0 0 16 16">
                                                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                                                <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
                                            </svg>
                                            <p id="inputID">Support file : png/img</p>
                                        </label>
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
                                </div>
                                {}
                                <ButtonLoad loading={loader} className='w-100' onClick={()=>{CreateArtist()}}>Create Land</ButtonLoad>
                            </Form>
                                                     
                        </Card>
                    </Col>
                </Row>              
            </Container>
        </Layout>
    )
}

export default CreateArtists;