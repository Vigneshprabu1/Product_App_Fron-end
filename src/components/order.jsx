import React, { Component } from 'react';
import axios from 'axios';
import './order.css'
import StarRatingComponent from 'react-star-rating-component';
class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listData: [],
            listData1: [],
            listData2:[],
            combine: [],
            count: 0,
            selected_provider:[],
            product_quantity:0,
            quantitySeleceted: 0,
            userData: [], 
            rating: 3,
            userdata: JSON.parse(localStorage.getItem("user")),
            combine1: {},
            orders:{},
            indexOf:0,
        }
        this.state.combine = JSON.parse(localStorage.getItem("manoj"));
        this.state.listData2=JSON.parse(localStorage.getItem("selected"));
        console.log(this.state.listData2);
          console.log(this.state.combine)
          console.log(this.state.combine[0].cust_id);
       // console.log(this.state.listData);
      //    console.log(this.state.combine[0].prodId)
         this.add=this.add.bind(this);
         this.del=this.del.bind(this);
         var index=null;
         var provider_id=null;
          // this.state.indexof=this.state.listData[0].prodId.indexOf(this.state.combine[0].prodId);
          // console.log(this.state.indexof)
      }
      componentDidMount(){
          console.log(this.state.listData2);
          
          for(var i=0;i<this.state.listData2.length;i++){
            var k=this.state.listData2[i].prodId.indexOf(this.state.combine[0].prodId);
             if(this.state.combine[0].prodId==this.state.listData2[i].prodId[k]){
                this.state.listData.push(this.state.listData2[i]); 
             } 
          }
        this.setState({listData:this.state.listData});
        console.log(this.state.listData)
    }
    // async get() {
    //     if (this.state.combine != undefined) {
    //         this.state.combine.map(a => {
    //             console.log(a.prodId)
    //             axios.get("http://192.168.1.147:3001/provider/" + a.prodId).then(response => {
    //                 this.setState({ listData: response.data });
    //                 console.log(a.prodId)
    //                 console.log(this.state.listData);
    //                 //this.join2();
    //             })
    //         })
    //     }
    //     else {

    //     }

    // }
    // join() {
    //     console.log(this.state.listData);
    //     console.log(this.state.listData1);
    //     this.state.listData.map(ld => {
    //         this.state.listData1.map(ld1 => {
    //             if (ld.shopName == ld1.shopname) {
    //                 this.state.combine.push(Object.assign({}, ld, ld1, { quantity: 0 }));
    //             }
    //         })
    //     })
      
    //     console.log(this.state.combine);
    //     this.setState(this.state.combine);


       
    // }
    // async join2() {

    //     var response = await axios.get("http://node-api-011.herokuapp.com/products") 
    //     this.setState({ listData: await response.data });
    //     console.log(this.state.listData)


    //     this.join();
    // }
    add(pid) {
        console.log(this.state.combine[0].quantity);
        if (this.provider_id != undefined) {
            for (var i = 0; i < this.state.listData.length; i++) {

                if (this.provider_id === this.state.listData[i].provider_id) {
                    if (this.state.listData[i].available[this.index] != 0) {
                        this.state.combine[0].quantity = this.state.combine[0].quantity + 1;
                        this.state.combine[0].total = this.state.combine[0].quantity * this.state.listData[i].price[this.index];
                        this.state.combine1.available[this.index] = this.state.combine1.available[this.index] - 1;
                        this.setState(this.state.combine);
                        console.log(this.state.combine[0].quantity);
                        
                    }
                    else {
                        alert("out of stock")
                    }
                }
            }
        } else {
            alert("Select Provider First")
        }
    }
   
    del(pid){
        if(this.provider_id!=undefined){
            for(var i=0;i<this.state.listData.length;i++)
            {
                
                if(this.provider_id===this.state.listData[i].provider_id){
    
                if(this.state.combine[0].quantity>0){
                    console.log("hiii");
                    this.state.combine[0].quantity=this.state.combine[0].quantity-1;
                    this.state.combine[0].total=this.state.combine[0].quantity*this.state.listData[i].price[this.index];
                    this.state.combine1.available[this.index]=this.state.combine1.available[this.index]+1;
                    console.log( this.state.combine1.available[this.index]);
                    this.setState(this.state.combine);
                    console.log(this.state.combine);
                    }
                    else{
                        alert("select a  valid quantity")
                    }
                }
            }
        }else{
            alert("select provider first")
        }
      }
    selectprovider(a, i) {
        // console.log(a);
        // console.log(a.product_name);
         console.log(a.provider_id);
        this.provider_id = a.provider_id;
       // this.index = a.indexOf;
        this.index=a.prodId.indexOf(this.state.combine[0].prodId);
        console.log(this.index);
        
        // this.moreByProvider();
        // console.log(this.state.moreByProvider);
        this.state.selected_provider=a;

        this.state.combine1 = Object.assign({}, a);
        this.setState({ combine1: this.state.combine1 });
        console.log(this.provider_id)
        this.setState({product_id:a.product_id});
      
        // console.log(((this.state.orders.quantity) && (this.state.orders.product_id === this.state.product_id) && (this.state.orders.provider_id === this.state.provider_id)));
        console.log(a);
        
        // this.state.combine1.available[this.index] = this.state.combine1.available[this.index] - this.state.combine[0].quantity;
        // console.log(this.state.combine1)
    }
   
    // moreByProvider(){
    //     console.log(this.state.selected_provider.provider_id);
    // }
   
    //add cart
    addCart(p, i) {
        //let a = this.state.cartShow[i] = true;
        //console.log(p);
        this.state.selected_provider=p;
        this.moreByProvider();
        console.log(this.state.selected_provider);
        this.setState({ indexOf: p.indexOf });
        this.setState({ price: p.price[p.indexOf] });
        this.setState({ provider_address: p.provider_address });
        this.setState({available:p.available[p.indexOf]});
        this.setState({provider_mobile_number:p.provider_mobile_number});
        // var price=this.state.p[0].price
        // this.setState({price:price})
        this.setState({ i: i });
        //this.setState({ a });
        this.setState({ modalShow: true });
        this.moreByProvider();
        //alert(id + ' ' +id1);
        console.log(this.state.cart.quantity[this.state.i]);
        console.log("cart ",this.state.cart.food_id[this.state.i]);
        console.log("porduct id ", this.state.food_id);
        console.log("cart provider id ",this.state.cart.provider_id);
        console.log("provider id ",this.state.provider_id);
        console.log(((this.state.cart.quantity[this.state.i]) && (this.state.cart.food_id[this.state.i] === this.state.food_id) && (this.state.cart.provider_id[this.state.i] === this.state.provider_id)));
    }
  
    buy() {
        localStorage.setItem("provider", JSON.stringify(this.state.combine1));
        var i=this.state.i;
        if((parseInt(this.state.orders.cust_id)) === (parseInt(this.state.cust_id))){
            console.log(this.state.orders);
        } if(!((parseInt(this.state.orders.cust_id)) === (parseInt(this.state.cust_id)))){    
                this.state.orders.cust_id = this.state.userdata.uid,
                this.state.orders.product_name = this.state.combine[0].name,
                this.state.orders.product_image = this.state.combine[0].img,
                this.state.orders.product_category = this.state.combine[0].prodCategory,
                this.state.orders.shop_category = this.state.combine[0].shopCategory,
                this.state.orders.rating = this.state.combine[0].rating,
                this.state.orders.size = this.state.combine[0].size,
                this.state.orders.price = this.state.combine[0].price,
                this.state.orders.quantity = this.state.combine[0].quantity,
                this.state.orders.brand_name = this.state.combine[0].BrandName,
                this.state.orders.discount = this.state.combine[0].discount,
                this.state.orders.tax = this.state.combine[0].tax,
                this.state.orders.shop_name = this.state.combine[0].shopname,
                this.state.orders.product_id = this.state.combine[0].prodId,
                this.state.orders.review = this.state.combine[0].review,
                this.state.orders.total = this.state.combine[0].total,
                this.state.orders.order_status = this.state.combine1.provider_mobile_number,
                this.state.orders.provider_mobile_number = this.state.userdata.phno,
                this.state.orders.customer_mobile_number = this.state.userdata.phno,
                this.state.orders.delivery_address = this.state.userdata.address,
                this.state.orders.provider_id = this.provider_id,
                this.state.orders.payment_option = "online",
                this.state.orders.customer_email = this.state.userdata.email,
                this.state.userData.push(this.state.orders);;   
                console.log(this.state.orders);
        }
        console.log(this.state.userData)
        localStorage.setItem("final", JSON.stringify(this.state.userData));
        localStorage.setItem("orders",JSON.stringify(this.state.orders));
        this.props.history.push("/");
        console.log(this.state.orders);
    }
    // onStarClick(nextValue, prevValue, name) {
    //     this.setState({rating: nextValue});
    //   }
    render() {
        const { rating } = this.state;
        return (
            <div>
                {/* {this.state.listData2.length!=null?( */}
                <div>
            {this.state.combine == undefined ? (alert("pls signin first")) : (
                    <div class="container">
                        {this.state.combine.map((a) =>
                            <div class="card">
                                <div class="container-fliud">
                                    <div class=" row">

                                        <div class="preview col-md-6">

                                            <div class="preview-pic tab-content">
                                                <div class="tab-pane active" id="pic-1"><img src={a.img} style={{ width: "250px", height: "252px" }} /></div>
                                                <div class="tab-pane" id="pic-2"><img src={a.img} style={{ width: "250px", height: "252px" }} /></div>
                                                <div class="tab-pane" id="pic-3"><img src={a.img} style={{ width: "250px", height: "252px" }} /></div>
                                                <div class="tab-pane" id="pic-4"><img src={a.img} style={{ width: "250px", height: "252px" }} /></div>
                                                <div class="tab-pane" id="pic-5"><img src={a.img} style={{ width: "250px", height: "252px" }} /></div>
                                            </div>
                                            <ul class="preview-thumbnail nav nav-tabs">
                                                <li class="active"><a data-target="#pic-1" data-toggle="tab"><img src={a.img} style={{ width: "200px", height: "46px" }}/></a></li>
                                                <li><a data-target="#pic-2" data-toggle="tab"><img src={a.img} style={{ width: "200px", height: "46px" }}/></a></li>
                                                <li><a data-target="#pic-3" data-toggle="tab"><img src={a.img} style={{ width: "200px", height: "46px" }} /></a></li>
                                                <li><a data-target="#pic-4" data-toggle="tab"><img src={a.img} style={{ width: "200px", height: "46px" }} /></a></li>
                                                <li><a data-target="#pic-5" data-toggle="tab"><img src={a.img} style={{ width: "200px", height: "46px" }} /></a></li>
                                            </ul>
                                        </div>
                                        <div class="details col-md-6">
                                            <h3 class="product-title">{a.name}</h3>
                                            <div class="rating">
                                            <div class="start">
                                            {/* <h2>Rating from state: {a.rating}</h2> */}
                                                    <StarRatingComponent
                                                        name="rate2"
                                                        editing={false}
                                                        renderStarIcon={() => <span><i class="fa fa-star" aria-hidden="true"></i></span>}
                                                        starCount={5}
                                                        value={a.rating}
                                                    />
                                            </div>
                                                <span class="review-no">41 reviews</span>
                                            </div>
                                            <p class="product-description">Suspendisse quos? Tempus cras iure temporibus? Eu laudantium cubilia sem sem! Repudiandae et! Massa senectus enim minim sociosqu delectus posuere.</p>
                                            <h4 class="price">current price: <span>₹{a.price}</span></h4>
                                            <p class="vote"><strong>91%</strong> of buyers enjoyed this product! <strong>(87 votes)</strong></p>
                                            <h5 class="sizes">sizes:
                                                <span class="size" data-toggle="tooltip" title="small">s</span>
                                                <span class="size" data-toggle="tooltip" title="medium">m</span>
                                                <span class="size" data-toggle="tooltip" title="large">l</span>
                                                <span class="size" data-toggle="tooltip" title="xtra large">xl</span>
                                            </h5>
                                            <h5 class="colors">colors:
                                                <span class="color orange not-available" data-toggle="tooltip" title="Not In store"></span>
                                                <span class="color green" data-toggle="tooltip"></span>
                                                <span class="color blue" data-toggle="tooltip"></span>
                                            </h5> &nbsp;
                                            <div class="columns" >
                                                <span class="input-btn ">
                                                    <button type="button" class="btn btn-default btn-number" data-type="plus" data-field="quant[1] " onClick={() => this.add(a.Id1)}>
                                                        <span class="glyphicon-plus"></span>
                                                    </button>&nbsp;
                                                </span>  {a.quantity} 
                                                <span class="input-btn">&nbsp;&nbsp;
                                                    <button type="button" class="btn btn-danger btn-number" data-type="minus" data-field="quant[2]" onClick={() => this.del(a.Id1)}>
                                                        <span class=" glyphicon-minus"></span>
                                                    </button>
                                                </span>
                                            </div>  &nbsp;
                                            <div class="action ">
                                                <button class="add-to-cart btn btn-default" type="button" onClick={() => this.buy()}> Shop Now</button>&nbsp;
                                             <button class="like btn btn-default" type="button" onClick={() => this.addCart()}><span class="fa fa-heart"></span></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div class="card mb-3">
                            <table className="table table-responsive " style={{align:"center",margin:"auto"}} >
                                <thead >
                                    <tr>
                                        <th >#</th>   
                                        <th>Price</th>
                                        <th>Provider name</th>
                                        <th>Available</th>
                                        <th>Provider Address</th>
                                    </tr>
                                </thead>
                                <tbody id="myTable">
                                    {this.state.listData.map((a, index) =>
                                        <tr>
                                            <td> <input type="radio" name="Radio" id={a.product_id} onChange={() => this.selectprovider(a, index)} /></td>
                                            <td>₹{a.price[a.prodId.indexOf(this.state.combine[0].prodId)]}</td>

                                            <td>{a.provider_name}</td>
                                            <td>{a.available[a.prodId.indexOf(this.state.combine[0].prodId)]}</td>
                                            <td>{a.provider_address}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                     

                    </div>
                )}
            </div>
            
            
            </div>

        )
    }


}
export default Order;