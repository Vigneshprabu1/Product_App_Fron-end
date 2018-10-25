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

import './home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      listData: [],
      listData1: [],
      combine: [],
      data1: "",
      //
      userdata: [],
      combine1: [],
      combine2: [] = {
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

    this.del = this.del.bind(this);
    this.join = this.join.bind(this);
    this.view = this.view.bind(this);
        // var j;
        // var key = NaN;
        //  var cust_id = null;
    this.state.userdata = JSON.parse(localStorage.getItem("user"));
     




  }
  totalPrice(pid, j) {
    // for(var i=0;i<this.listData.length;i++){
    //   this.total += (this.listData[i].price * this.listData[i].quantity);
    // }
    pid.total = (pid.price * pid.quantity);
    console.log(pid)
    this.state.listData[j].total = pid.total;

  }

  add(pid) {
       console.log(pid);
       console.log(this.state.listData)
    for (var i = 0; i < this.state.listData.length; i++) {
      if (this.state.combine[i].Id1 === pid.Id1) {
        this.j = i;
        if (this.state.combine[i].quantity < this.state.combine[i].available) {




          //this.listData[i].quantity += 1;
          this.state.combine[i].quantity += 1;
          this.state.listData[i].available -= 1;
          this.state.combine[i].available = this.state.listData[i].available;

        }
      }
    }


    // console.log(pid);
    console.log(pid)
    console.log(this.j)
    this.totalPrice(pid, this.j);
    if (pid.Id1 != this.key) {
      this.state.combine1.push(pid);
      this.key = pid.Id1;
    }
    else {
      pid.quantity += 1;
      for (var k = 0; k < this.state.combine1.length; k++) {

      }
    }
    //this.data.getp(this.product);

    alert("Your selected:" + this.state.combine[this.j].quantity + "itemsAnd Total Price is:$" + this.state.listData[this.j].total);
    // console.log(jj[this.j].quantity);
     this.view();
  }
  del(pid) {
    console.log(pid);
    for (var i = 0; i < this.state.combine.length; i++) {
      if (this.state.listData[i].Id1 === pid.Id1) {
        this.j = i;
        if (this.state.combine[i].quantity > 0) {




          //this.listData[i].quantity += 1;
          this.state.combine[i].quantity -= 1;
          this.state.listData[i].available += 1;
          this.state.combine[i].available = this.state.listData[i].available;

        }
      }
    }


    // console.log(pid);
    this.totalPrice(pid, this.j);

    this.state.combine1.pop();
    //this.data.getp(this.product);

    alert("Your selected:" + this.state.combine[this.j].quantity + "itemsAnd Total Price is:₹" + this.state.listData[this.j].total);
    // console.log(jj[this.j].quantity);

  }
  view1(pid){
    if (this.state.userdata != undefined) {
      console.log("here add to cart");
      this.state.combine1.push(pid);
      //<Cart combine1={this.props.combine1} ></Cart>
      var product = Object.assign(this.state.combine1, { cust_id: this.cust_id });
      localStorage.setItem("manoj", JSON.stringify(this.state.combine1));
      this.props.history.push('/order');
    }
    else {
      alert("please sign in first")
    }
  }
  view() {
    //this.cust_id= this.state.userdata.uid;
   // console.log(this.state.userdata.uid)
    if (this.state.userdata != undefined) {
      console.log("here add to cart");
      //<Cart combine1={this.props.combine1} ></Cart>
      // var product = Object.assign(this.state.combine1, { cust_id: this.cust_id });
      
      
      localStorage.setItem("manoj", JSON.stringify(this.state.combine1));
      console.log(this.state.combine1)
      // var product=Object.assign(,this.state.combine2,this.state.combine1); 
      console.log(this.state.listData)
      this.state.listData.map(a =>
        axios.put("http://node-api-011.herokuapp.com/products/" + a.Id1, a).then(response => {
          console.log(response);
        }).catch(error => console.log(error)
        ))

      var product = Object.assign(this.state.combine1, { cust_id: this.cust_id });
      console.log(this.state.combine1)
      this.state.combine1.map(a =>
        axios.post("http://node-api-011.herokuapp.com/orders/", a).then(response => {
          console.log(response);
        }).catch(error => console.log(error)
        ))

    }
    else {
      alert("please sign in first")
    }
  }

  componentDidMount() {
    this.get();



  }
  async    get() {
    await axios.get("http://node-api-011.herokuapp.com/shops").then(response => {
      this.setState({ listData1: response.data });
      console.log(this.state.listData1);
      this.join2();
    })



  }
  join() {
    console.log(this.state.listData);
    console.log(this.state.listData1);
    this.state.listData.map(ld => {
      this.state.listData1.map(ld1 => {
        if (ld.shopName == ld1.shopname) {
          this.state.combine.push(Object.assign({}, ld, ld1, { quantity: 0 }));
        }
      })
    })
    // var obj = 
    //       console.log(obj);

    console.log(this.state.combine);
    this.setState(this.state.combine);


    //this 
  }
  async join2() {

    var response = await axios.get("http://node-api-011.herokuapp.com/products")
    // console.log(response1);  
    this.setState({ listData: await response.data });
    console.log(this.state.listData)


    this.join();
  }



  render() {



    return (
      <div style={{backgroundColor:"#ffffff"}}  >
        <div id="myCarousel" className="carousel slide" data-ride="carousel">
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
                                <i className="fa fa-shield" ></i>
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
                </div> <br/> <br/>

                {/* --/grids-- */}
                
     <div className="resp-tabs-container" style={{backgroundColor:"#ffffff"}}>
        <h3 className="wthree_text_info">New <span>Arrivals</span></h3>
                                {/* --/tab_one-- */}
                                <div className="row" >
                                {this.state.combine.map(item =>( 
                                    <div className="col-md-3 product-men">
                                        <div className="men-pro-item simpleCart_shelfItem">
                                            <div className="men-thumb-item" >
                                                <img src={item.img} alt="" style={{width:"150",height:"100"}}/>
                                                {/* <img src={item.img} alt="" className="pro-image-back" style={{width:"150",height:"100"}}/> */}
                                                <div className="men-cart-pro">
                                                    <div className="inner-men-cart-pro">
                                                        <a href= "/" className="link-product-add-cart">Quick View</a>
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
                                                            <input type="submit" name="submit" value="Add to cart" onClick={() => { this.view1(item) }}  className="button" />
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
             </div>

    );
  }

}

export default Home;