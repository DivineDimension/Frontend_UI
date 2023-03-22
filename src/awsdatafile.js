import axios from "axios";
export const uservisist = async() =>{
   
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
}

export const putuserDetailsbywallet = async(address) =>{
   
    let key = "BvXlBA50Iw58XBSBZltS2H5P9IwS76f9hojA6aE5";
      //Get method start
      
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
}
