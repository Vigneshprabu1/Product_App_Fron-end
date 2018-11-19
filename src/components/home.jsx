import React, { Component } from 'react';
import axios from 'axios';
import Bottom1 from "../components/images/bottom1.jpg";
import Bottom2 from "../components/images/bottom2.jpg";
import Bottom3 from "../components/images/bottom3.jpg";
import Bottom4 from "../components/images/bottom4.jpg";
import Mid from "../components/images/mid.jpg";
import BB1 from '../components/images/bb1.jpg';
import Bot_1 from '../components/images/bot_1.jpg';
import Bot_2 from '../components/images/bot_2.jpg';
//import './men.css';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

function searchingfor(term) {
  return function (x) {
    return x.name.toLowerCase().includes(term.toLowerCase()) || !term;
  }
}

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat1:0,
      lon1:0,
      articles: [],
      listData: [],
      listData1: [],
      combine: new Set(),
      data1: "",
      searchterm:"",
      address:'',
      //
      provider: new Set(),
      userdata: [],
      combine1: [],
      combine2:  {
        Id1: Number,
        img: String,
        name: String,
        price: Number,

        prodCategory: String,
        shopCategory: String,
        shortDesc: String,
        longDesc: String,
        size: Number,
        rating: Number,
        discount: Number,
        BrandName: String,
        sku: String,
        tax: Number,
        prodId: Number,
        total: Number,
        available: Number,
        shopName: String,


      }
    };

    
    this.join = this.join.bind(this);
   
    this.getmyposition = this.getmyposition.bind(this);
    
    this.searchHandler=this.searchHandler.bind(this);
    this.distance=this.distance.bind(this);
    var cust_id = null;

    this.state.userdata = JSON.parse(localStorage.getItem("user"));
   
   
    if (this.state.userdata) {
      this.cust_id = this.state.userdata.uid;
    }
    console.log(this.cust_id);



  }

  handleChange = address => {
    this.setState({ address });
  };
 
 handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng =>{ 
        this.setState({lat1:latLng.lat,lon1:latLng.lng});
        console.log('Success', latLng);
        console.log(this.state.lat1,this.state.lon1)
        this.join();
      }).catch(error => console.error('Error', error));

     
      
  };
  
  distance(pid){
    
    var radlat1 = Math.PI * this.state.lat1/180
    var radlat2 = Math.PI * pid.lat/180
    var theta = this.state.lon1-pid.lon
    var radtheta = Math.PI * theta/180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180/Math.PI
    dist = dist * 60 * 1.1515
    if (true) { dist = dist * 1.609344 }
    // if (unit=="M") { dist = dist * 0.8684 }
    // return dist;
    
    console.log(dist)
    if(dist<25){
      this.setState(({ combine }) => ({
        combine: new Set(combine.add(pid))
      }));
     
    }
    this.setState({combine:this.state.combine})
  }

  getmyposition=async()=>{
    var location = 0;
    var latitude = 0;
    var longitude = 0;
    
    if (window.navigator && window.navigator.geolocation) {
      location = window.navigator.geolocation
    
    if (location) {
     location.getCurrentPosition( (position) =>{
       console.info(position);
     this.setState({lat1:position.coords.latitude});
   this.setState({lon1:position.coords.longitude})
     // this.setState({lat1:position.coords.latitude,lon1:position.coords.longitude}) 
      // latitude = position.coords.latitude;
      //    longitude = position.coords.longitude;
     // return position.coords.latitude;
        //this.setState({lat1:latitude});
       this.join()
        return this.state.lat1,this.state.lon1

         
      })
      // await this.join();
       
      console.log(this.state.lon1)
      
    }

  }
 
 // console.log(this.state.provider)
 
  
   
 

  }
  
  searchHandler(event){
      this.setState({searchterm:event.target.value});
  }
  

    // console.log(pid);
  
  view1(pid) {
    if (this.state.userdata != undefined) {
      console.log("here add to cart");
      this.state.cust_id = this.state.userdata.uid;
      console.log(this.state.cust_id)
      var product = Object.assign(pid, { cust_id: this.state.cust_id });
      this.state.combine1.push(pid);
      //<Cart combine1={this.props.combine1} ></Cart>

      console.log(this.state.combine1)
      localStorage.setItem("manoj", JSON.stringify(this.state.combine1));
      this.props.history.push('/order');
    }
    else {
      alert("please sign in first")
    }
  }
  
  componentDidMount() {
     this.get();
  //this.getmyposition();

  }
  async    get() {
    await axios.get("http://192.168.1.130:3001/provider").then(response => {
      this.setState({ listData1: response.data });
      console.log(this.state.listData1);
       localStorage.setItem('selected',JSON.stringify(this.state.listData1));
       console.log(JSON.parse(localStorage.getItem("selected")));
      this.join2();
    })



  }
  async join() {
    this.setState({combine:new Set()});
   await  this.state.listData1.map(a=>{
      this.distance(a);
     })
    console.log(this.state.combine);
    let c=[];
    Array.from(this.state.combine).map((a,index)=>{
      c[index]=(Object.assign({},a));
      })

    localStorage.setItem('selected',JSON.stringify(c));
    console.log(JSON.parse(localStorage.getItem("selected")));
  //   this.state.listData.map(ld => {
  //     this.state.combine.map(ld1 => {
  //       this.state.combine[0].price.map((a,index)=>{
  //       if (ld.prodId == ld1.prodId[index]) {
  //          this.state.provider.push(Object.assign({}, ld,  { quantity: 0 }));

  //       }
  //     })
  //   })
 
  // })
    console.log(this.state.listData)
    for(var i=0;i<this.state.listData.length;i++){
      let arr=Array.from(this.state.combine);
      if(arr.length==0){
        this.setState({provider:new Set()});
      }
      for(var j=0;j<arr.length;j++){
        for(var k=0;k<arr[0].prodId.length;k++){
         
          if(this.state.listData[i].prodId===arr[j].prodId[k]){
            // this.state.provider.push(this.state.listData[i]);
            console.log("hey");
            
            this.setState(({ provider }) => ({
                  provider: new Set(provider.add(this.state.listData[i]))
                }));

          }
        }
      }
    }
     let b=[];
    console.log(this.state.provider);
    Array.from(this.state.provider).map((a,index)=>{
    b[index]=(Object.assign(a,{quantity:0}));
    })
    console.log(b)
    if(Array.from(this.state.provider).length==0){
      this.setState({articles:[]});
    }
    console.log(this.state.provider);
    
    this.setState({articles:b})
    console.log(this.state.articles);
  


    //this 
  }
  async join2() {

    var response = await axios.get("http://node-api-011.herokuapp.com/products")
    // console.log(response1);  
    this.setState({ listData: await response.data });
    console.log(this.state.listData)
     this.state.listData.map(a=>{
       this.state.articles.push(Object.assign(a,{quantity:0}));
     })
    this.setState({articles:this.state.articles});
    console.log(this.state.articles)
  
  //  this.join();
  }

getaddress(e){
        
}


  render() {



    return (
      <div >
        <div className="header-bot">
          <div className="header-bot_inner_wthreeinfo_header_mid">
          <br/>
            <div className="col-md-4 header-middle">
              <form >
              <input type="search"  onChange={this.searchHandler} placeholder="search by productname" />
                {/* <input type="search" name="search"  placeholder="Search here..." onChange={this.searchHandler} /> */}
                {/* <input type="submit" value="search"  onChange={()=>this.searchHandler()} style={{ height: "47px" }} /> */}
                {/* <i class="fa fa-location-arrow" aria-hidden="true"></i> */}
                <div className="clearfix"></div>
              </form>
            </div>
            
            <div className="col-md-5 logo_agile">
              <h1><a href="/"><span>S</span>martShopping <i className="fa fa-shopping-bag top_logo_agile_bag" aria-hidden="true"></i></a></h1>
            </div>
            <br/>
           &nbsp;&nbsp;
            <div className="col-md-2 agileits-social top_content">
            <PlacesAutocomplete
              value={this.state.address}
              onChange={this.handleChange}
              onSelect={this.handleSelect}
            >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
      <div className="search-container">
      <div className="col-md-15 header-middle">
    <form>
      <input type="search" placeholder="Search.." name="search"  style={{ width:'80%',height:"35px"}}
       {...getInputProps({
                  placeholder: 'Search Places ...',
                  className: 'location-search-input',
                  
                })}/>
      <button type="button"  onClick={()=>this.getmyposition()} style={{width:"20%", height:"35px",content:"\f124"}}><i className="fa fa-location-arrow"></i></button>
    </form>
    </div>
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
          
        )}
      </PlacesAutocomplete>
     
            </div>
            
            <div className="clearfix"></div>
          </div>
        </div><br />
        <div id="myCarousel " className="carousel slide " data-ride="carousel">
          {/* ---Indicators---- */}

          <ol className="carousel-indicators">
            <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
            <li data-target="#myCarousel" data-slide-to="1" className=""></li>
            <li data-target="#myCarousel" data-slide-to="2" className=""></li>
            <li data-target="#myCarousel" data-slide-to="3" className=""></li>
            <li data-target="#myCarousel" data-slide-to="4" className=""></li>
          </ol>
          <div className="carousel-inner" role="listbox">
            <div className="item active">
              <div >
                <div className="carousel-caption">
                  <h3>The Biggest <span>Sale</span></h3>
                  <p>Special for today</p>
                  <a className="hvr-outline-out button2" href="">Shop Now </a>
                </div>
              </div>
            </div>
            <div className="item item2">
              <div >
                <div className="carousel-caption">
                  <h3>Summer <span>Collection</span></h3>
                  <p>New Arrivals On Sale</p>
                  <a className="hvr-outline-out button2" href="">Shop Now </a>
                </div>
              </div>
            </div>
            <div className="item item3">
              <div >
                <div className="carousel-caption">
                  <h3>The Biggest <span>Sale</span></h3>
                  <p>Special for today</p>
                  <a className="hvr-outline-out button2" href="">Shop Now </a>
                </div>
              </div>
            </div>
            <div className="item item4">
              <div >
                <div className="carousel-caption">
                  <h3>Summer <span>Collection</span></h3>
                  <p>New Arrivals On Sale</p>
                  <a className="hvr-outline-out button2" href="">Shop Now </a>
                </div>
              </div>
            </div>
            <div className="item item5">
              <div >
                <div className="carousel-caption">
                  <h3>The Biggest <span>Sale</span></h3>
                  <p>Special for today</p>
                  <a className="hvr-outline-out button2" href="">Shop Now </a>
                </div>
              </div>
            </div>
          </div>
          <a className="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
            <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a className="right carousel-control" href="#myCarousel" role="button" data-slide="next">
            <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
          </a>
          {/*  ----The Modal----  */}

        </div>
        {/*-----728x90--- */}
        <div className="banner_bottom_agile_info">
          <div className="container">
            <div className="banner_bottom_agile_info_inner_w3ls">
              <div className="col-md-6 wthree_banner_bottom_grid_three_left1 grid">
                <figure className="effect-roxy">
                  <img src={Bottom1} alt=" " className="img-responsive" />
                  <figcaption>
                    <h3><span>F</span>all Ahead</h3>
                    <p>New Arrivals</p>
                  </figcaption>
                </figure>
              </div>
              <div className="col-md-6 wthree_banner_bottom_grid_three_left1 grid">
                <figure className="effect-roxy">
                  <img src={Bottom2} alt=" " className="img-responsive" />
                  <figcaption>
                    <h3><span>F</span>all Ahead</h3>
                    <p>New Arrivals</p>
                  </figcaption>
                </figure>
              </div>
              <div className="clearfix"></div>
            </div>
          </div>
        </div>
        {/* schedule-bottom  */}

        <div className="schedule-bottom">
          <div className="col-md-6 agileinfo_schedule_bottom_left">
            <img src={Mid} alt=" " className="img-responsive" />
          </div>
          <div className="col-md-6 agileits_schedule_bottom_right">
            <div className="w3ls_schedule_bottom_right_grid">
              <h3>Save up to <span>50%</span> in this week</h3>
              <p>Suspendisse varius turpis efficitur erat laoreet dapibus.
					Mauris sollicitudin scelerisque commodo.Nunc dapibus mauris sed metus finibus posuere.</p>
              <div className="col-md-4 w3l_schedule_bottom_right_grid1">
                <i className="fa fa-user" ></i>
                <h4>Customers</h4>
                <h5 className="counter">653</h5>
              </div>
              <div className="col-md-4 w3l_schedule_bottom_right_grid1">
                <i className="fa fa-calendar" aria-hidden="true"></i>
                <h4>Events</h4>
                <h5 className="counter">823</h5>
              </div>
              <div className="col-md-4 w3l_schedule_bottom_right_grid1">
                <i className="fas fa-shield-alt"></i>
                <h4>Awards</h4>
                <h5 className="counter">45</h5>
              </div>
              <div className="clearfix"> </div>
            </div>
          </div>
          <div className="clearfix"> </div>
        </div>
        {/* -- //schedule-bottom -- */}
        {/* -- banner-bootom-w3-agileits -- */}
        <div className="banner-bootom-w3-agileits">
          <div className="container">
            {/* ---728x90--- */}

            <h3 className="wthree_text_info">What's <span>Trending</span></h3>

            <div className="col-md-5 bb-grids bb-left-agileits-w3layouts">
              <a href="women.html">
                <div className="bb-left-agileits-w3layouts-inner grid">
                  <figure className="effect-roxy">
                    <img src={BB1} alt=" " className="img-responsive" />
                    <figcaption>
                      <h3><span>S</span>ale </h3>
                      <p>Upto 55%</p>
                    </figcaption>
                  </figure>
                </div>
              </a>
            </div>
            <div className="col-md-7 bb-grids bb-middle-agileits-w3layouts">
              <div className="bb-middle-agileits-w3layouts grid">
                <figure className="effect-roxy">
                  <img src={Bottom3} alt=" " className="img-responsive" />
                  <figcaption>
                    <h3><span>S</span>ale </h3>
                    <p>Upto 55%</p>
                  </figcaption>
                </figure>
              </div>
              <div className="bb-middle-agileits-w3layouts forth grid">
                <figure className="effect-roxy">
                  <img src={Bottom4} alt=" " className="img-responsive" />
                  <figcaption>
                    <h3><span>S</span>ale </h3>
                    <p>Upto 65%</p>
                  </figcaption>
                </figure>
              </div>
              <div className="clearfix"></div>
            </div>
          </div>
        </div>
        {/* --/grids-- */}
        <div className="agile_last_double_sectionw3ls">
          <div className="col-md-6 multi-gd-img multi-gd-text ">
            <a href={"/women"}><img src={Bot_1} alt=" " /><h4>Flat <span>50%</span> offer</h4></a>

          </div>
          <div className="col-md-6 multi-gd-img multi-gd-text ">
            <a href={"/women"}><img src={Bot_2} alt=" " /><h4>Flat <span>50%</span> offer</h4></a>
          </div>
          <div className="clearfix"></div>
        </div> <br /> <br />

        {/* --/grids-- */}

        <div className="resp-tabs-container" style={{ backgroundColor: "#ffffff" }}>
          <h3 className="wthree_text_info">New <span>Arrivals</span></h3>
          {/* --/tab_one-- */}
          <div className="row">
          {this.state.articles.filter(searchingfor(this.state.searchterm)).map(item => (
              <div className="col-md-3 product-men">
                <div className="men-pro-item simpleCart_shelfItem">
                  <div className="men-thumb-item " >
                    <img src={item.img} alt="" style={{ width: "250px", height: "300px" }} />

                    {/* <img src={item.img} alt="" className="pro-image-front" style={{ width: "250px", height: "300px" }} />
                    <img src={item.img} alt="" className="pro-image-back" style={{ width: "250px", height: "300px" }} /> */}
                   
                    <div className="men-cart-pro">
                      <div className="inner-men-cart-pro">
                        <a href="/" className="link-product-add-cart">Quick View</a>
                      </div>
                    </div>

                  </div>
                  <div className="item-info-product ">
                    <h4><a href={"/single"}>{item.name}</a></h4>
                    <div className="info-product-price">
                      <span className="item_price">₹{item.price}</span>
                      {/* <del>$69.71</del> */}
                    </div>
                    <div className="snipcart-details top_brand_home_details item_add single-item hvr-outline-out button2">

                      <fieldset>
                        <input type="hidden" name="cmd" value="_cart" />
                        <input type="hidden" name="add" value="1" />
                        <input type="hidden" name="business" value=" " />
                        <input type="hidden" name="item_name" value="Formal Blue Shirt" />
                        <input type="hidden" name="amount" value="30.99" />
                        <input type="hidden" name="discount_amount" value="1.00" />
                        <input type="hidden" name="currency_code" value="USD" />
                        <input type="hidden" name="return" value=" " />
                        <input type="hidden" name="cancel_return" value=" " />
                        <input type="submit" name="submit" value="Add to cart" onClick={() => { this.view1(item) }} className="button" />
                      </fieldset>

                    </div>

                  </div>
                </div>
              </div>
            ))}
            <div className="clearfix"></div>
            </div>
          {/* --//tab_one-- */}
        </div>
        <div className="sale-w3ls">
                        <div className="container">
                            <h6>We Offer Flat <span>40%</span> Discount</h6>

                            <a className="hvr-outline-out button2" href={"/single"}>Shop Now </a>
                        </div>
                    </div>
                    {/* <!-- //we-offer --> */}
                    {/* <!--/grids--> */}
                    <div className="coupons">
                        <div className="coupons-grids text-center">
                            <div className="w3layouts_mail_grid">
                                <div className="col-md-3 w3layouts_mail_grid_left">
                                    <div className="w3layouts_mail_grid_left1 hvr-radial-out">
                                        <i className="fa fa-truck" aria-hidden="true"></i>
                                    </div>
                                    <div className="w3layouts_mail_grid_left2">
                                        <h3>FREE SHIPPING</h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur</p>
                                    </div>
                                </div>
                                <div className="col-md-3 w3layouts_mail_grid_left">
                                    <div className="w3layouts_mail_grid_left1 hvr-radial-out">
                                        <i className="fa fa-headphones" aria-hidden="true"></i>
                                    </div>
                                    <div className="w3layouts_mail_grid_left2">
                                        <h3>24/7 SUPPORT</h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur</p>
                                    </div>
                                </div>
                                <div className="col-md-3 w3layouts_mail_grid_left">
                                    <div className="w3layouts_mail_grid_left1 hvr-radial-out">
                                        <i className="fa fa-shopping-bag" aria-hidden="true"></i>
                                    </div>
                                    <div className="w3layouts_mail_grid_left2">
                                        <h3>MONEY BACK GUARANTEE</h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur</p>
                                    </div>
                                </div>
                                <div className="col-md-3 w3layouts_mail_grid_left">
                                    <div className="w3layouts_mail_grid_left1 hvr-radial-out">
                                        <i className="fa fa-gift" aria-hidden="true"></i>
                                    </div>
                                    <div className="w3layouts_mail_grid_left2">
                                        <h3>FREE GIFT COUPONS</h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur</p>
                                    </div>
                                </div>
                                <div className="clearfix"> </div>
                            </div>

                        </div>
                    </div>
                    {/* <!--grids--> */}
      </div>

    );
  }

}

export default Home;