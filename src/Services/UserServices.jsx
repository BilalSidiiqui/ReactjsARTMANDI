import GenericServices from "./genericService";
import jwtDecode from "jwt-decode";
import { createContext } from "react";



class UserServices extends GenericServices {
  constructor() {
    super();
  }

  login = (username, password) =>
    new Promise((resolve, reject) => {
      this.post("/login/", { username, password }).then((person) => {
        localStorage.setItem("user_id", person.user_id);
        localStorage.setItem("username",person.username);
        resolve(person);
        
      });
    });

  register = (username, email, password, confirmPassword) =>
  new Promise((resolve, reject) => {
    this.post("/register/", { username, email, password, confirmPassword }).then((token) => {
      resolve(token);
    });
  });


  logout = () => {
    localStorage.removeItem("user_id", "");
  };

  addProduct = (title, description, image, category, start_price,created_by,end_date) =>
    this.post("/Listing/?format=api", {
      title,
      description,
      image,
      category,
      start_price,
      created_by,
      end_date,
    });

  addComment = (user,comment,listing)=>this.post("/Comment/?format=api",{
    user,
    comment,
    listing
  });
  
  closeBid = (listing)=>this.post("/closebid/",{listing}).then((getinfo)=>{
    localStorage.setItem("bid",getinfo.bid)
    localStorage.setItem("user",getinfo.user);
  })
  
  
  ;


  addBid = (user,bid_price,listing)=>this.post("/Bid/?format=api",{
    user,
    bid_price,
    listing
  });
  

  isLoggedIn = () => {
    console.log(localStorage.getItem("user_id"));
    
    return localStorage.getItem("user_id") ? true : false;
  };
  getLoggedInUser = () => {
    try {
      const jwt = localStorage.getItem("token");
      return jwtDecode(jwt);
    } catch (ex) {
      return null;
    }
  };
}

let userServices = new UserServices();
export default userServices;
