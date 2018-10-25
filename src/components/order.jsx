import React, { Component } from 'react';
import axios from 'axios';
import './order.css'
class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listData: [],
            listData1: [],
            combine: [],
            userData: [],
            userdata: JSON.parse(localStorage.getItem("user")),
            combine1: {},
            orders: {},
        }
        this.state.combine = JSON.parse(localStorage.getItem("manoj"));
        //   if(localStorage.getItem("final")){
        //       this.state.orders = JSON.parse(localStorage.getItem("final"));
        //       console.log(this.state.orders);

        //   }
        //    console.log("haii")
        //   console.log(this.state.combine);
        //   console.log(this.state.userdata);
        //    console.log(this.state.combine[0].prodId)
        console.log(this.state.combine);

        this.add = this.add.bind(this);
        this.del = this.del.bind(this);
        // var index = null;
        // var provider_id = null;

    }
    componentDidMount() {
        this.get();
    }
    async get() {
        if (this.state.combine != undefined) {
            this.state.combine.map(a => {
                console.log(a.prodId)
                axios.get("http://192.168.1.147:3001/provider/" + a.prodId).then(response => {
                    this.setState({ listData: response.data });
                    console.log(a.prodId)
                    console.log(this.state.listData);
                    //this.join2();
                })
            })
        }
        else {

        }

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
    add(pid) {
        console.log(this.state.combine[0].quantity);
        if (this.provider_id != undefined) {
            for (var i = 0; i < this.state.listData.length; i++) {

                if (this.provider_id === this.state.listData[i].provider_id) {
                    if (this.state.listData[i].available[this.state.listData[i].indexOf] != 0) {
                        this.state.combine[0].quantity = this.state.combine[0].quantity + 1;
                        this.state.combine[0].total = this.state.combine[0].quantity * this.state.listData[i].price[this.state.listData[i].indexOf];
                        this.state.combine1.available[this.state.listData[i].indexOf] = this.state.combine1.available[this.state.listData[i].indexOf] - 1;
                        this.setState(this.state.combine);
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
    del(pid) {
        if (this.provider_id != undefined) {
            for (var i = 0; i < this.state.listData.length; i++) {

                if (this.provider_id === this.state.listData[i].provider_id) {
                    if (this.state.combine[0].quantity > 0) {
                        this.state.combine[0].quantity = this.state.combine[0].quantity - 1;
                        this.state.combine[0].total = this.state.combine[0].quantity * this.state.listData[i].price[this.state.listData[i].indexOf];
                        this.state.combine1.available[this.state.listData[i].indexOf] = this.state.combine1.available[this.state.listData[i].indexOf] + 1;
                        this.setState(this.state.combine);
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
    selectprovider(a, i) {
        console.log(a);
        console.log(a.product_name);
        console.log(a.provider_id);
        this.provider_id = a.provider_id;
        this.index = a.indexOf;
        this.state.combine1 = Object.assign({}, a);
        this.setState({ combine1: this.state.combine1 });
        console.log(this.provider_id)
        // this.state.combine1.available[this.index] = this.state.combine1.available[this.index] - this.state.combine[0].quantity;
        // console.log(this.state.combine1)
    }
    buy() {
        localStorage.setItem("provider", JSON.stringify(this.state.combine1));
        for (var j = 0; j < this.state.combine.length; j++) {
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
                this.state.userData.push(this.state.orders);
        }
        console.log(this.state.userData)
        localStorage.setItem("final", JSON.stringify(this.state.userData));
        this.props.history.push("/");

    }
    render() {
        return (
            <div>
                {this.state.combine == undefined ? (alert("pls signin first")) : (
                    <div>



                        {this.state.combine.map((a) =>
                            <div>

                                <img src={a.img} className="img-thumbnail" style={{ width: "300px", height: "300px" }} />
                                <h3>Name:<br />{a.name}</h3><br />
                                <h3>Price:<br />₹{a.price}</h3>

                                <span class="input-group-btn">
                                    <button type="button" class="btn btn-default btn-number" data-type="plus" data-field="quant[1] " onClick={() => this.add(a.Id1)}>
                                        <span class="glyphicon-plus"></span>
                                    </button>
                                </span> <h> {a.quantity} </h>
                                <span class="input-group-btn">
                                    <button type="button" class="btn btn-danger btn-number" data-type="minus" data-field="quant[2]" onClick={() => this.del(a.Id1)}>
                                        <span class=" glyphicon-minus"></span>
                                    </button>
                                </span>
                            </div>


                        )}
                        <div className="container">
                            {/* <table className=" table ">
                            <thead >
                                <tr>
                                    <th></th>
                                    <th>price</th>
                                    <th>Provider name</th>
                                    <th>available</th>
                                    <th>provider address</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.listData.map((a, index) =>
                                    <tr>
                                        <td> <input type="radio" name="Radio" id={a.product_id} onChange={() => this.selectprovider(a, index)} /></td>
                                        <td>₹{a.price[a.indexOf]}</td>


                                        <td>{a.provider_name}</td>
                                        <td>{a.available[a.indexOf]}</td>
                                        <td>{a.provider_address}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table> */}
<br/>
                            <table className="table">
                                <thead >
                                    <tr>
                                        <th></th>
                                        <th>price</th>
                                        <th>Provider name</th>
                                        <th>available</th>
                                        <th>provider address</th>
                                    </tr>
                                </thead>
                                <tbody id="myTable">
                                    {this.state.listData.map((a, index) =>
                                        <tr>
                                            <td> <input type="radio" name="Radio" id={a.product_id} onChange={() => this.selectprovider(a, index)} /></td>
                                            <td>₹{a.price[a.indexOf]}</td>


                                            <td>{a.provider_name}</td>
                                            <td>{a.available[a.indexOf]}</td>
                                            <td>{a.provider_address}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <button className="btn btn-outline-success" onClick={() => this.buy()}>Shop Now</button>


                    </div>
                )}
            </div>
        )
    }


}
export default Order;