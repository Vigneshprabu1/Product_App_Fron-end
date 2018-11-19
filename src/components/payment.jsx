import React, { Component } from 'react';
import axios from 'axios';

import './checkout.css';
import StripeCheckout from 'react-stripe-checkout';
import StarRatingComponent from 'react-star-rating-component';
import PaypalExpressBtn from 'react-paypal-express-checkout';
import Modal from 'react-bootstrap4-modal';

const PAYMENT_SERVER_URL = '3RD_PARTY_SERVER';
const CURRENCY = 'USD';
class payment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedout: false,
            username: '',
            show: false,
            show1: false,
            newaddress: false,
            userdata: JSON.parse(localStorage.getItem("user")),
            delivery_address: "",
            listData: [],
            listData2: {
                "cust_id": 0,
                "product_name": "",
                "product_image": "",
                "product_category": "",
                "shop_category": "",
                "rating": 0,
                "size": 0,
                "price": 0,
                "quantity": 0,
                "brand_name": 0,
                "discount": 0,
                "tax": 0,
                "shop_name": "",
                "product_id": 0,
                "review": "",
                "total": 0,
                "order_status": "proceed",
                "provider_mobile_number": 0,
                "customer_mobile_number": 0,
                "delivery_address": "",
                "provider_id": 0,
                "payment_option": "",
                "customer_email": "",
                "invoice_number": "",
                "delivered_on": "45 minutes",

            },
            //rating:1,
            modal: false,
            listData1: {},
            combine: [],
            payment: "nothing",
            total: "",
            invoice_number: "",
            delivered_on: "45 mins",
            image: "",
            indexOf: 0,
        }
        this.state.listData = JSON.parse(localStorage.getItem("final"));
        this.confirmorder= this.confirmorder.bind(this);
        this.confirmorder1=this.confirmorder1.bind(this);
        //this.modal=this.modal.bind(this);

        console.log(this.state.modal);
        
    }
    onStarClick(nextValue, prevValue, name) {
        this.setState({ rating: nextValue });
    }
    close() {
        this.setState({ modal: false });
        this.confirmorder1();
    }
       
    confirmorder() {
        this.setState({modal:true});
        console.log("hello");
        console.log(this.state.modal);
        
    }
 async  confirmorder1() {
        console.log(this.state.listData);

        this.state.listData2.cust_id = this.state.listData[0].cust_id;
        this.state.listData2.product_name = this.state.listData[0].product_name;
        this.state.listData2.product_image = this.state.listData[0].product_image;
        this.state.listData2.product_category = this.state.listData[0].product_category;
        this.state.listData2.rating = this.state.listData[0].rating;
        this.state.listData2.shop_category = this.state.listData[0].shop_category;
        this.state.listData2.size = this.state.listData[0].size;
        this.state.listData2.price = this.state.listData[0].price;
        this.state.listData2.quantity = this.state.listData[0].quantity;
        this.state.listData2.brand_name = this.state.listData[0].brand_name;
        this.state.listData2.discount = this.state.listData[0].discount;
        this.state.listData2.tax = this.state.listData[0].tax;
        this.state.listData2.shop_name = this.state.listData[0].shop_name;
        this.state.listData2.product_id = this.state.listData[0].product_id;
        this.state.listData2.review = this.state.listData[0].review;
        this.state.listData2.total = this.state.listData[0].total;
        this.state.listData2.provider_mobile_number = this.state.listData[0].provider_mobile_number;
        this.state.listData2.customer_mobile_number = this.state.listData[0].customer_mobile_number;
        this.state.listData2.delivery_address = this.state.delivery_address;
        this.state.listData2.provider_id = this.state.listData[0].provider_id;
        this.state.listData2.payment_option = this.state.payment;
        this.state.listData2.customer_email = this.state.listData[0].customer_email;
        this.state.listData2.invoice_number = Date.now();


        this.state.invoice_number = Date.now();
        console.log(this.state.invoice_number);
        // var product = Object.assign(this.state.combine, { payment_option: this.state.payment,invoice_number:this.state.invoice_number,delivered_on:this.state.delivered_on });
        // var product1=Object.assign(this.state.listData,this.state.combine)
        console.log(this.product1);
        console.log(this.state.listData[0].product_id)
        console.log(this.state.listData1)
        console.log(this.state.listData2)
        axios.put("http://localhost:3001/provider/" + this.state.listData1.provider_id, this.state.listData1).then(response => {
            console.log(response);
        }).catch(error => console.log(error)
        )
        axios.post("http://localhost:3001/orders", this.state.listData2).then(response => {
            console.log(response);
        }).catch(error => console.log(error)
        )
        axios.get('http://api.msg91.com/api/sendhttp.php?country=91&sender=MSGIND&route=4&mobiles=' + this.state.listData2.customer_mobile_number + '&authkey=243177AyunGcNGL5bc6ed47&message=' + this.state.userdata.name + ' has purchased. Total amount is ' + this.state.listData2.total, { headers: { 'crossDomain': true, } });

    }
    onToken = (token) => {
        axios.post(PAYMENT_SERVER_URL,
            {
                description: "hiii",
                source: token.id & token,
                currency: CURRENCY,
                amount: ""
            })
            .then(200)
            .catch(400);
    }
  

    render() {
        const { rating } = this.state;
        const onSuccess = (payment) => {
            // Congratulation, it came here means everything's fine!
            		console.log("The payment was succeeded!", payment);
            		// You can bind the "payment" object's value to your state or props or whatever here, please see below for sample returned data
					this.state.paymentID=payment.paymentID;
					this.confirmOrder();
				}
 
        const onCancel = (data) => {
            // User pressed "cancel" or close Paypal's popup!
            console.log('The payment was cancelled!', data);
            // You can bind the "data" object's value to your state or props or whatever here, please see below for sample returned data
        }
 
        const onError = (err) => {
            // The main Paypal's script cannot be loaded or somethings block the loading of that script!
            console.log("Error!", err);
            // Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
            // => sometimes it may take about 0.5 second for everything to get set, or for the button to appear
        }
 
        let env = 'sandbox'; // you can set here to 'production' for production
        let currency = 'USD'; // or you can set this value from your props or state
        let total = 1; // same as above, this is the total amount (based on currency) to be paid by using Paypal express checkout
        // Document on Paypal's currency code: https://developer.paypal.com/docs/classic/api/currency_codes/
 
        const client = {
            sandbox:    'AZOydPphjOEGhm-gS8iPiBdESForP9ExEeUsUXQkOg4Y_TM97VH9ZKUrpUbkt_ePXbmCEm1wVC1-2vHm',
            production: 'YOUR-PRODUCTION-APP-ID',
        }
        // In order to get production's app-ID, you will have to send your app to Paypal for approval first
        // For sandbox app-ID (after logging into your developer account, please locate the "REST API apps" section, click "Create App"):
        //   => https://developer.paypal.com/docs/classic/lifecycle/sb_credentials/
        // For production app-ID:
        //   => https://developer.paypal.com/docs/classic/lifecycle/goingLive/
 
        // NB. You can also have many Paypal express checkout buttons on page, just pass in the correct amount and they will work!
        return (
            <div>
                {/* <!-- page --> */}
            
                <div className="page-head_agile_info_w3l" >
                    <div className="container" >
                        <h3>Payment <span>Page </span></h3>

                        <div className="services-breadcrumb">
                            <div className="agile_inner_breadcrumb">

                                <ul className="w3_short">
                                    <li><a href="/">Home</a><i>|</i></li>
                                    <li>Payment Page </li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
               

               {this.state.userdata!=undefined && this.state.listData!=undefined?(
                <div className="privacy">
                    <div className="container">
                        <h3 className="tittle-w3l">Payment
                            <span className="heading-style">
                                <i></i>
                                <i></i>
                                <i></i>
                            </span>
                        </h3>

                        <div className="checkout-right">
                            <div >
                                <ul className="nav nav-pills nav-fill navtop">
                                    {/* <li>Cash on delivery (COD)</li> */}
                                    <li className="nav-item">
                                        <a className="nav-link active" href="#menu1" data-toggle="tab">Cash on delivery</a>
                                    </li>
                                    {/* <li>Credit/Debit</li> */}
                                    <li className="nav-item">
                                        <a className="nav-link " href="#menu2" data-toggle="tab">Stripe Checkout</a>
                                    </li>

                                    {/* <li>Net Banking</li> */}
                                    <li className="nav-item">
                                        <a className="nav-link " href="#menu3" data-toggle="tab">Net Banking</a>
                                    </li>

                                    {/* <li>Paypal Account</li> */}
                                    <li className="nav-item">
                                        <a className="nav-link " href="#menu4" data-toggle="tab">Paypal Account</a>
                                    </li>

                                </ul>

                                <div className="tab-content float-right">

                                    <div className="tab-pane active" role="tabpanel" id="menu1">
                                        <div className="card">
                                            <div className="vertical_post check_box_agile">
                                                <h5>COD</h5>
                                                <div className="checkbox">
                                                    <div className="check_box_one cashon_delivery">
                                                        <label className="anim">
                                                            <button type="button" className="btn btn-primary" onClick={() => this.confirmorder1()}>COD</button>&nbsp;
                                                            {/* <button type="button" className="btn btn-primary btn-lg" data-toggle="modal" data-target="#smallShoes">
                                                                Click Me
                                                                </button> */}
                                                        <span> We also accept Credit/Debit card on delivery. Please Check with the agent.</span>
                                                        </label>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="tab-pane" role="tabpanel" id="menu2">
                                        <div className="card" style={{ textAlign: "center" }}>
                                            <form action="#" method="post" className="creditly-card-form agileinfo_form">
                                                <div className="creditly-wrapper wthree, w3_agileits_wrapper">
                                                    <div className="credit-card-wrapper">
                                                        <StripeCheckout
                                                            token={this.onToken}
                                                            stripeKey="pk_test_7Yx1hK8cWQh1flMaqeAiQTcv"
                                                            name="SmartShopping"
                                                            description="Shopping Product Application"
                                                            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRtpO609q3ZGjn8kwk1_IW1rfk1EDwkumw0eo-YV8Q5mqsNoD-xQ"
                                                            panelLabel="Donate"
                                                            amount={3900} // cents
                                                            currency="INR"
                                                            locale="auto"
                                                            zipCode={true}
                                                            billingAddress={true}
                                                        ><br />
                                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button type="button" className="btn btn-primary btn-lg"><i className="fab fa-cc-stripe"></i>&nbsp;Pay With Card</button>
                                                        </StripeCheckout>
                                                        {/* <button type="button" className="btn btn-primary btn-lg">
                                                            <span>Make a payment </span>
                                                        </button> */}
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="tab-pane" role="tabpanel" id="menu3">
                                        <div className="card" style={{ textAlign: "left" }}>
                                            <div className="vertical_post">
                                                <form action="#" method="post">
                                                    <h5>Select From Popular Banks</h5>
                                                    <div className="swit-radio">
                                                        <div className="check_box_one">
                                                            <div className="radio_one">
                                                                <label>
                                                                    <input type="radio" name="radio" checked="" />
                                                                    <i></i>Syndicate Bank</label>
                                                            </div>
                                                        </div>
                                                        <div className="check_box_one">
                                                            <div className="radio_one">
                                                                <label>
                                                                    <input type="radio" name="radio" />
                                                                    <i></i>Bank of Baroda</label>
                                                            </div>
                                                        </div>
                                                        <div className="check_box_one">
                                                            <div className="radio_one">
                                                                <label>
                                                                    <input type="radio" name="radio" />
                                                                    <i></i>Canara Bank</label>
                                                            </div>
                                                        </div>
                                                        <div className="check_box_one">
                                                            <div className="radio_one">
                                                                <label>
                                                                    <input type="radio" name="radio" />
                                                                    <i></i>ICICI Bank</label>
                                                            </div>
                                                        </div>
                                                        <div className="check_box_one">
                                                            <div className="radio_one">
                                                                <label>
                                                                    <input type="radio" name="radio" />
                                                                    <i></i>State Bank Of India</label>
                                                            </div>
                                                        </div>
                                                        <div className="clearfix"></div>
                                                    </div>
                                                    <h5>Or Select Other Bank</h5>
                                                    <div className="section_room_pay">
                                                        <select className="year">
                                                            <option value="">=== Other Banks ===</option>
                                                            <option value="ALB-NA">Allahabad Bank NetBanking</option>
                                                            <option value="ADB-NA">Andhra Bank</option>
                                                            <option value="BBK-NA">Bank of Bahrain and Kuwait NetBanking</option>
                                                            <option value="BBC-NA">Bank of Baroda Corporate NetBanking</option>
                                                            <option value="BBR-NA">Bank of Baroda Retail NetBanking</option>
                                                            <option value="BOI-NA">Bank of India NetBanking</option>
                                                            <option value="BOM-NA">Bank of Maharashtra NetBanking</option>
                                                            <option value="CSB-NA">Catholic Syrian Bank NetBanking</option>
                                                            <option value="CBI-NA">Central Bank of India</option>
                                                            <option value="CUB-NA">City Union Bank NetBanking</option>
                                                            <option value="CRP-NA">Corporation Bank</option>
                                                            <option value="DBK-NA">Deutsche Bank NetBanking</option>
                                                            <option value="DCB-NA">Development Credit Bank</option>
                                                            <option value="DC2-NA">Development Credit Bank - Corporate</option>
                                                            <option value="DLB-NA">Dhanlaxmi Bank NetBanking</option>
                                                            <option value="FBK-NA">Federal Bank NetBanking</option>
                                                            <option value="IDS-NA">Indusind Bank NetBanking</option>
                                                            <option value="IOB-NA">Indian Overseas Bank</option>
                                                            <option value="ING-NA">ING Vysya Bank (now Kotak)</option>
                                                            <option value="JKB-NA">Jammu and Kashmir NetBanking</option>
                                                            <option value="JSB-NA">Janata Sahakari Bank Limited</option>
                                                            <option value="KBL-NA">Karnataka Bank NetBanking</option>
                                                            <option value="KVB-NA">Karur Vysya Bank NetBanking</option>
                                                            <option value="LVR-NA">Lakshmi Vilas Bank NetBanking</option>
                                                            <option value="OBC-NA">Oriental Bank of Commerce NetBanking</option>
                                                            <option value="CPN-NA">PNB Corporate NetBanking</option>
                                                            <option value="PNB-NA">PNB NetBanking</option>
                                                            <option value="RSD-DIRECT">Rajasthan State Co-operative Bank-Debit Card</option>
                                                            <option value="RBS-NA">RBS (The Royal Bank of Scotland)</option>
                                                            <option value="SWB-NA">Saraswat Bank NetBanking</option>
                                                            <option value="SBJ-NA">SB Bikaner and Jaipur NetBanking</option>
                                                            <option value="SBH-NA">SB Hyderabad NetBanking</option>
                                                            <option value="SBM-NA">SB Mysore NetBanking</option>
                                                            <option value="SBT-NA">SB Travancore NetBanking</option>
                                                            <option value="SVC-NA">Shamrao Vitthal Co-operative Bank</option>
                                                            <option value="SIB-NA">South Indian Bank NetBanking</option>
                                                            <option value="SBP-NA">State Bank of Patiala NetBanking</option>
                                                            <option value="SYD-NA">Syndicate Bank NetBanking</option>
                                                            <option value="TNC-NA">Tamil Nadu State Co-operative Bank NetBanking</option>
                                                            <option value="UCO-NA">UCO Bank NetBanking</option>
                                                            <option value="UBI-NA">Union Bank NetBanking</option>
                                                            <option value="UNI-NA">United Bank of India NetBanking</option>
                                                            <option value="VJB-NA">Vijaya Bank NetBanking</option>
                                                        </select>
                                                    </div>
                                                    <input type="submit" value="PAY NOW" />
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane" role="tabpanel" id="menu4">
                                        <div className="card">
                                            <div id="tab4" className="tab-grid" style={{ display: "block" }}>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <img className="pp-img" src={require('../components/images/paypal.png')} alt="Image Alternative text" title="Image Title" />
                                                        <p>Important: You will be redirected to PayPal's website to securely complete your payment.</p>
                                                        <a className="btn btn-primary">Checkout via Paypal</a>
                                                    </div>
                                                    <div className="col-md-6 number-paymk">
                                                        <PaypalExpressBtn client={client} currency={'USD'} total={1.00} />
                                                    </div>
                                                    {/* <div class="col-md-6 number-paymk" style={{ textAlign: "left" }}>
                                                        <form class="cc-form">
                                                            <div class="clearfix">
                                                                <div class="form-group form-group-cc-number">
                                                                    <label>Card Number</label>
                                                                    <input class="form-control" placeholder="xxxx xxxx xxxx xxxx" type="text" />
                                                                    <span class="cc-card-icon"></span>
                                                                </div>
                                                                <div class="form-group form-group-cc-cvc">
                                                                    <label>CVV</label>
                                                                    <input class="form-control" placeholder="xxxx" type="text" />
                                                                </div>
                                                            </div>
                                                            <div class="clearfix">
                                                                <div class="form-group form-group-cc-name">
                                                                    <label>Card Holder Name</label>
                                                                    <input class="form-control" type="text" />
                                                                </div>
                                                                <div class="form-group form-group-cc-date">
                                                                    <label>Valid Thru</label>
                                                                    <input class="form-control" placeholder="mm/yy" type="text" />
                                                                </div>
                                                            </div>
                                                            <div class="checkbox checkbox-small">
                                                                <label>
                                                                    <input class="i-check" type="checkbox" checked="" />Add to My Cards</label>
                                                            </div>
                                                            <input type="submit" class="submit" value="Proceed Payment" />
                                                        </form>
                                                    </div> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>

                        </div>
                    </div>
                </div>
                ):( 
                    alert("You have not selected any items and provide your valid data")
                )}
                {/* <!-- The modal --> */}
                {/* <div class="modal fade" id="smallShoes" tabindex="-1" role="dialog" aria-labelledby="modalLabelSmall" aria-hidden="true">
                    <div class="modal-dialog modal-sm">
                        <div class="modal-content">

                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <h4 class="modal-title" id="modalLabelSmall">Modal Title</h4>
                            </div>

                            <div class="modal-body">
                                Modal content...
                            </div>

                        </div>
                    </div>
                </div> */}
                <Modal visible={this.state.modal} onClickBackdrop={this.modalBackdropClicked}>
                    <div className="modal-header">
                        <h5 className="modal-title">Red Alert!</h5>
                    </div>
                    <div className="modal-body">
                        <StarRatingComponent
                            name="rate1"
                            starCount={5}
                            value={rating}
                            onStarClick={this.onStarClick.bind(this)}
                        />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={() => this.close()}>
                            Close
                        </button>

                    </div>
                </Modal> 

                {/* <div class="container">
                    <ul class="nav nav-pills nav-fill navtop">
                        <li class="nav-item">
                            <a class="nav-link active" href="#menu1" data-toggle="tab">پرسش ها</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#menu2" data-toggle="tab">پاسخ ها</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#menu3" data-toggle="tab">نظرات</a>
                        </li>
                    </ul>
                    <div class="tab-content float-right">
                        <div class="tab-pane active" role="tabpanel" id="menu1">Created By Cytus ۱</div>
                        <div class="tab-pane" role="tabpanel" id="menu2">Created By Cytus ۲</div>
                        <div class="tab-pane" role="tabpanel" id="menu3">Created By Cytus ۳</div>
                    </div>
                </div> */}

            </div>
        );
    }
}

export default payment;