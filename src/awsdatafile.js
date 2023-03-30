import axios from "axios";


export const createprofile = async(walletaddress,type,profileName,twittername,profileUrl,bio,imagepath,bgimagePath,email) =>{

    let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    let datas = {

        "algoAddress": walletaddress,
       
        "accountType": type,
        "profileName": profileName,
        "twitterName": twittername,
        "profileURL": profileUrl,
        "bio": bio,
        "profileImagePath": imagepath,
        "bgvImagePath": bgimagePath,
        "profileImageAsString": "vsdvsvsdv",
        "bgvImageAsString": "",
        "followers": [],
        "following": [],
        "validuser": 1,
        "email": email,
        "passwd": "hvhds"
}

const options2 = {
    method: 'POST',
    url: '/platform/v1/userinfo',
    headers: {
      'x-api-key': `${key}`    
    },
    data: datas
  };
  
  axios.request(options2).then(function (response2) {
   console.log("response",response2);
  //  window.location.reload();
  }).catch(function (error) {
      console.error("done2",error);
  });
    
}

export const getuserDetailsbywallet = async(address) =>{
   
    let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
      //Get method start
      try{
        let response2 = await fetch(`/platform/v1/userinfo/${address}`, 
        {
            headers: {
                'x-api-key': `${key}`    
              },
          }
          )
        //console.log(response2);
        
          const data2 = await response2.json();
        console.log("Api inside", data2)
        return {data2};
      }catch(err){
        console.log("vercelerrro",err)
      }
       
}
export const getAlluserDetails = async() =>{
   
  let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
    //Get method start
    
      let response2 = await fetch(`/platform/v1/userinfo`, 
    {
        headers: {
            'x-api-key': `${key}`    
          },
      }
      )
    //console.log(response2);
      const data2 = await response2.json();
    console.log("Api inside", data2)
    return {data2};
}

export const putbgImagebywallet = async(algoaddr,imagepath) =>{
   
    let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
     
      axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
     let datas = {
        "algoAddress":algoaddr,
        "bgvImagePath":imagepath
     }
        const options2 = {
            method: 'PUT',
            url: '/platform/v1/userinfo',
            headers: {
              'x-api-key': `${key}`    
            },
            data: datas
          };
          
          axios.request(options2).then(function (response2) {
           console.log("response",response2);
          //  window.location.reload();
          }).catch(function (error) {
              console.error("done2",error);
          });
}


//create events
export const createevents = async(name,descr,email,starttime,endtime,rewards,walletaddrr,imagepath) =>{

    let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    let datas = {
        "name": name,
        "description":descr,
        "email":email,
        "startTime":starttime,
        "endTime":endtime,
        "rewards":rewards,
        "walletAddress":walletaddrr,
        "imagePath":imagepath,
        "status":"created",
        "approvalStatus":"No"
        }

const options2 = {
    method: 'POST',
    url: '/platform/v1/events',
    headers: {
      'x-api-key': `${key}`    
    },
    data: datas
  };
  
  axios.request(options2).then(function (response2) {
   console.log("response",response2);
  //  window.location.reload();
  }).catch(function (error) {
      console.error("done2",error);
  });
    
}

export const getEventbywallet = async(address) =>{
   
    let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
      //Get method start
      
        let response2 = await fetch(`/platform/v1/events/${address}`, 
      {
          headers: {
              'x-api-key': `${key}`    
            },
        }
        )
      //console.log(response2);
        const data2 = await response2.json();
      console.log("Api inside", data2)
      return {data2};
}

export const putEventStatus = async(keyid,status) =>{
   
    let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
     
      axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
     let datas = {
        "keyId":keyid,
        "approvalStatus":status
    }
        const options2 = {
            method: 'PUT',
            url: '/platform/v1/events',
            headers: {
              'x-api-key': `${key}`    
            },
            data: datas
          };
          
          axios.request(options2).then(function (response2) {
           console.log("response",response2);
          //  window.location.reload();
          }).catch(function (error) {
              console.error("done2",error);
          });
}

export const getAllEvents = async() =>{
   
    let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
      //Get method start
      
        let response2 = await fetch(`/platform/v1/events`, 
      {
          headers: {
              'x-api-key': `${key}`    
            },
        }
        )
      //console.log(response2);
        const data2 = await response2.json();
      console.log("Api inside", data2)
      return {data2};
}

//user visists
export const uservisist = async() =>{
   
    let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
      //Get method start
      
        let response2 = await fetch(`/platform/v1/visitinfo`, 
      {
          headers: {
              'x-api-key': `${key}`    
            },
        }
        )
      //console.log(response2);
        const data2 = await response2.json();
      console.log("Api inside", data2)
      return {data2};
    }
export const createUserVisits = async(ipAddress,algoaddre,networkType,wallettype,pagename) =>{

    let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    let datas = {

        "ipAddress":ipAddress,
        "algoAddress":algoaddre,
        "networkType":networkType,
        "walletType":wallettype,
        "pageName":pagename
        }

const options2 = {
    method: 'POST',
    url: '/platform/v1/visitinfo',
    headers: {
        'x-api-key': `${key}`    
    },
    data: datas
    };
    
    axios.request(options2).then(function (response2) {
    console.log("response",response2);
    //  window.location.reload();
    }).catch(function (error) {
        console.error("done2",error);
    });
    
}

//Activity table
export const createActivityTable = async(algoaddre,txntype,nftaddress,txhash,page) =>{

    let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    let datas = {
        "walletAddress": algoaddre,
        "txnType": txntype,
        "nftAddress": nftaddress,
        "txnHash": txhash,
        "txnPage": page
    }

const options2 = {
    method: 'POST',
    url: '/platform/v1/activity',
    headers: {
        'x-api-key': `${key}`    
    },
    data: datas
    };
    
    axios.request(options2).then(function (response2) {
    console.log("response",response2);
    //  window.location.reload();
    }).catch(function (error) {
        console.error("done2",error);
    });
    
}


export const getActivityByWallet = async(address) =>{
   
    let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
      //Get method start
      
        let response2 = await fetch(`/platform/v1/activity/${address}`, 
      {
          headers: {
              'x-api-key': `${key}`    
            },
        }
        )
      //console.log(response2);
        const data2 = await response2.json();
      console.log("Api inside", data2)
      return {data2};
}

//NFt details
export const createNFTDetails = async(address,nftaddress,type,descr,name,socialLink,imagePath,nfttype) =>{

    let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    let datas ={

        "creatorAddress":address,
        "nftAddress":nftaddress,
        "escrowAddress":"",
        "nftType":type,
        "nftDescription":descr,
        "nftName":name,
        "nftPrice":"", 
        "socialLink":socialLink, 
        "ownerAddress":address,
        "previousAddress":address,
        "saleDetails":"no", 
        "valid":nfttype,
        "imagePath":imagePath
     }

const options2 = {
    method: 'POST',
    url: '/platform/v1/nftdetails',
    headers: {
        'x-api-key': `${key}`    
    },
    data: datas
    };
    
    axios.request(options2).then(function (response2) {
    console.log("response",response2);
    //  window.location.reload();
    }).catch(function (error) {
        console.error("done2",error);
    });
    
}

export const getNFTDetailsByWallet = async(address) =>{
   
    let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
      //Get method start
      
        let response2 = await fetch(`/platform/v1/nftdetails/${address}`, 
      {
          headers: {
              'x-api-key': `${key}`    
            },
        }
        )
      //console.log(response2);
        const data2 = await response2.json();
      console.log("Api inside", data2)
      return {data2};
}

export const getNFTDetailsByTypeSale = async(type,sale) =>{
   
    let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
      //Get method start
     
        let response2 = await fetch(`/platform/v1/nftdetails/${type}/${sale}`, 
      {
          headers: {
              'x-api-key': `${key}`    
            },
        }
        )

      // let response2 = await fetch(`https://testapi1.stasisonline.in/platform/v1/nftdetails/${type}/${sale}`,{
      //   mode: 'no-cors',
      //   method: 'GET',
      //   headers:{
      //     'Access-Control-Allow-Origin': '*' ,
      //     'Content-Type':'application/json',
      //     'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
      //   }
      // })
      // console.log("response2",response2.Response);
        const data2 = await response2.json();
      console.log("response2 inside", data2)
      return {data2};
}

export const getNFTDetailsByAddressTypeSale = async(owner,type,sale) =>{
   
    let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
      //Get method start
      
        let response2 = await fetch(`/platform/v1/nftdetails/${owner}/${type}/${sale}`, 
        {
          headers: {
            'x-api-key': `${key}`    
          },
      })
      //console.log(response2);
        const data2 = await response2.json();
      console.log("Api inside", data2)
      return {data2};
}

export const putByPrice = async(price,keyid) =>{
   
    let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
     
      axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
     let datas = {
        "nftPrice":price, 
        "keyValue":keyid
        }
        const options2 = {
            method: 'PUT',
            url: '/platform/v1/nftdetails',
            headers: {
              'x-api-key': `${key}`    
            },
            data: datas
          };
          
          axios.request(options2).then(function (response2) {
           console.log("response",response2);
          //  window.location.reload();
          }).catch(function (error) {
              console.error("done2",error);
          });
}

export const putByEscrow = async(escrowadd,keyid) =>{
   
    let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
     
      axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
     let datas = {
        "escrowAddress":escrowadd,
        "keyValue":keyid       
        }
        const options2 = {
            method: 'PUT',
            url: '/platform/v1/nftescrow',
            headers: {
              'x-api-key': `${key}`    
            },
            data: datas
          };
          
          axios.request(options2).then(function (response2) {
           console.log("response",response2);
          //  window.location.reload();
          }).catch(function (error) {
              console.error("done2",error);
          });
}

export const putByOwner = async(owner,keyid) =>{
   
    let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
     
      axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
     let datas = {
        "ownerAddress":owner,
        "keyValue":keyid
        }
        const options2 = {
            method: 'PUT',
            url: '/platform/v1/nftowner',
            headers: {
              'x-api-key': `${key}`    
            },
            data: datas
          };
          
          axios.request(options2).then(function (response2) {
           console.log("response",response2);
          //  window.location.reload();
          }).catch(function (error) {
              console.error("done2",error);
          });
}

export const putBySale = async(sale,keyid) =>{
   
    let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
     
      axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
     let datas = {
        "saleDetails":sale, 
        "keyValue":keyid
        }
        const options2 = {
            method: 'PUT',
            url: '/platform/v1/nftsale',
            headers: {
              'x-api-key': `${key}`    
            },
            data: datas
          };
          
          axios.request(options2).then(function (response2) {
           console.log("response",response2);
          //  window.location.reload();
          }).catch(function (error) {
              console.error("done2",error);
          });
}

export const putByPreviousowner = async(previousAddress,keyid) =>{
   
    let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
     
      axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
     let datas = {
        "previousAddress":previousAddress,
        "keyValue":keyid
        }
        const options2 = {
            method: 'PUT',
            url: '/platform/v1/nftprevoius',
            headers: {
              'x-api-key': `${key}`    
            },
            data: datas
          };
          
          axios.request(options2).then(function (response2) {
           console.log("response",response2);
          //  window.location.reload();
          }).catch(function (error) {
              console.error("done2",error);
          });
}

