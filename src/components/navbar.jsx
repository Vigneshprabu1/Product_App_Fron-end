import React, { Component } from 'react';
import top1 from "../components/images/top1.jpg";
import top2 from "../components/images/top2.jpg";
//import { a } from "react-router-dom";

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedout: false,
            articles: [],
            username: '',
            show: false,
            show1: false,
            newaddress: false,
            userdata: [],
            delivery_address: "",
            listData: [],
            listData1: [],
        }
        this.state.userdata = JSON.parse(localStorage.getItem("user"));
        console.log(this.state.userdata);
    }

    logoutHandler = (e) => {
        localStorage.clear()
        window.location.reload();
        this.props.history.replace('/');
    }


    render() {
        return (
            <div >
                {/* <nav className="navbar navbar-expand-md navbar-dark bg-dark" >
                    <div className="navbar-header">
                        <a className="navbar-brand" href="">Smart Shopping</a>
                    </div>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto">


                            <li className="nav-item active">
                                <a className="nav-link" href="/">Home</a>
                            </li>
                            <li className="nav-item ">
                                <a className="nav-link" href="/men">Men's Wear</a>  
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/women">Women's Wear</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/cart"><i className="fa fa-shopping-cart"></i>&nbsp;Cart</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link " href="/checkout">Checkout</a>
                            </li>
                            {this.state.userdata == undefined ? (
                                <div >
                                    <ul className=" navbar-nav ">
                                        <li className="nav-item">
                                            <a className="nav-link" href="/login"><span class="glyphicon glyphicon-log-in"></span>&nbsp;&nbsp;Login</a>
                                        </li>
                                        <li className="nav-item ">
                                            <a className="nav-link" href="/signup"><span class="glyphicon glyphicon-user"></span>&nbsp; Signup</a>
                                        </li>
                                    </ul>
                                </div>
                            ) : (
                                    <div >
                                        <ul className="navbar-nav ">
                                            <li className="nav-item">
                                                <a className="nav-link" href="/userdash"><i className="fa fa-user-circle fa-1x" aria-hidden="true"><span></span>&nbsp;&nbsp;{this.state.userdata.name}</i></a>
                                            </li>
                                        </ul>
                                        <ul className="navbar-nav">
                                            <li className="nav-item">
                                                <a className="nav-link" href="" onClick={e => this.logoutHandler(e)}><i className="fa fa-power-off" aria-hidden="true">&nbsp;&nbsp;Logout</i></a>
                                            </li>
                                        </ul>
                                    </div>


                                )}


                        </ul>
                    </div>

                </nav> */}




                {/* <div className=" ban-top">
                    <div className="container">
                        <div className="top_nav_left">
                            <nav className="navbar navbar-default">
                                <div className="container-fluid">
                                    <div className="navbar-header">
                                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                                            <span className="sr-only">Toggle navigation</span>
                                            <span className="icon-bar"></span>
                                            <span className="icon-bar"></span>
                                            <span className="icon-bar"></span>
                                        </button>
                                    </div>

                                    <div className="collapse navbar-collapse menu--shylock" id="bs-example-navbar-collapse-2">
                                        <ul className="nav navbar-nav menu__list">
                                            <li className="active menu__item menu__item--current"><a className="menu__link" href="/">Home <span className="sr-only">(current)</span></a></li>
                                            
                                            <li className="dropdown menu__item">
                                                <a href="" className="dropdown-toggle menu__link" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                                    Men's wear <span className="caret"></span></a>
                                                <ul className="dropdown-menu multi-column columns-3">
                                                    <div className="agile_inner_drop_nav_info">
                                                        <div className="col-sm-6 multi-gd-img1 multi-gd-text ">
                                                            <a href="men"><img src={top2} alt=" " /></a>
                                                        </div>
                                                        <div className="col-sm-3 multi-gd-img">
                                                            <ul className="multi-column-dropdown "  >
                                                                <li><a href={"/men"}>Clothing</a></li>
                                                                <li><a href={"/men"}>Wallets</a></li>
                                                                <li><a href={"/men"}>Footwear</a></li>
                                                                <li><a href={"/men"}>Watches</a></li>
                                                                <li><a href={"/men"}>Accessories</a></li>
                                                                <li><a href={"/men"}>Bags</a></li>
                                                                <li><a href={"/men"}>Caps & Hats</a></li>
                                                            </ul>
                                                        </div>
                                                        <div className="clearfix"></div>
                                                    </div>
                                                </ul>
                                            </li>
                                            <li className="dropdown menu__item">
                                                <a href="" className="dropdown-toggle menu__link" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Women's wear <span className="caret"></span></a>
                                                <ul className="dropdown-menu multi-column columns-3">
                                                    <div className="agile_inner_drop_nav_info">
                                                        <div className="col-sm-4 multi-gd-img">
                                                            <ul className="multi-column-dropdown">
                                                                <li><a href={"/women"}>Clothing</a></li>
                                                                <li><a href={"/women"}>Wallets</a></li>
                                                                <li><a href={"/women"}>Footwear</a></li>
                                                                <li><a href={"/women"}>Watches</a></li>
                                                                <li><a href={"/women"}>Accessories</a></li>
                                                                <li><a href={"/women"}>Bags</a></li>
                                                                <li><a href={"/women"}>Caps & Hats</a></li>
                                                            </ul>
                                                        </div>
                                                      
                                                        <div className="col-sm-6 multi-gd-img multi-gd-text ">
                                                            <a href={"/women"}><img src={top1} alt=" " /></a>
                                                        </div>
                                                        <div className="clearfix"></div>
                                                    </div>
                                                </ul>
                                            </li>
                                            <li className=" menu__item"><a className="menu__link" href={"/cart"}><i className="fa fa-shopping-cart">Cart</i></a></li>
                                            <li className=" menu__item"><a className="menu__link" href="/checkout">Checkout</a></li>
                                            
                                            {this.state.userdata == undefined ? (
                                                <div className="collapse navbar-collapse menu--shylock">
                                                    <ul className="nav navbar-nav menu__list"> <li className=" menu__item"><a className="menu__link" href={"/login"}><span class="glyphicon glyphicon-log-in"></span>&nbsp;&nbsp;Login</a></li>
                                                        <li className=" menu__item"><a className="menu__link" href={"/signup"}><span class="glyphicon glyphicon-user"></span>&nbsp;Signup</a></li>
                                                    </ul>
                                                </div>
                                            ):(
                                                 <div className="collapse navbar-collapse menu--shylock">
                                                    <ul className="nav navbar-nav menu__list">
                                                        <li className=" menu__item"><a className="menu__link" href={"/userdash"}><i className="fa fa-user-circle fa-1x" aria-hidden="true"><span></span>&nbsp;&nbsp;{this.state.userdata.name}</i></a></li>
                                                        <li className=" menu__item"><a className="menu__link" href="" onClick={e => this.logoutHandler(e)}><i className="fa fa-power-off" aria-hidden="true">&nbsp;&nbsp;Logout</i></a></li>
                                                    </ul>
                                                </div>
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </nav>
                        </div>
                        
                        <div className="clearfix"></div>
                    </div>
                </div> */}
                <div className=" ban-top">
                    <div className="container">
                        <div className="top_nav_left">
                            <nav className="navbar navbar-default">
                                <div className="container-fluid">

                                    <div className="navbar-header"  >
                                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                                            <span className="sr-only">Toggle navigation</span>
                                            <span className="icon-bar"></span>
                                            <span className="icon-bar"></span>
                                            <span className="icon-bar"></span>
                                        </button>
                                    </div>

                                    <div className="collapse navbar-collapse menu--shylock" id="bs-example-navbar-collapse-1">
                                        <ul className="nav navbar-nav menu__list">
                                            <li className="active menu__item menu__item--current"><a className="menu__link" href="/">Home <span className="sr-only">(current)</span></a></li>
                                            {/* <li className=" menu__item"><a className="menu__link" to="about.html">About</a></li> */}
                                            <li className="dropdown menu__item">
                                                <a href="" className="dropdown-toggle menu__link" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                                    Men's wear <span className="caret"></span></a>
                                                <ul className="dropdown-menu multi-column columns-3">
                                                    <div className="agile_inner_drop_nav_info">
                                                        <div className="col-sm-6 multi-gd-img1 multi-gd-text ">
                                                            <a href="men"><img src={top2} alt=" " /></a>
                                                        </div>
                                                        <div className="col-sm-3 multi-gd-img">
                                                            <ul className="multi-column-dropdown "  >
                                                                <li><a href={"/men"}>Clothing</a></li>
                                                                <li><a href={"/men"}>Wallets</a></li>
                                                                <li><a href={"/men"}>Footwear</a></li>
                                                                <li><a href={"/men"}>Watches</a></li>
                                                                <li><a href={"/men"}>Accessories</a></li>
                                                                <li><a href={"/men"}>Bags</a></li>
                                                                <li><a href={"/men"}>Caps & Hats</a></li>
                                                            </ul>
                                                        </div>
                                                        {/* <div className="col-sm-3 multi-gd-img">
                                                            <ul className="multi-column-dropdown">
                                                                <li><a href={"/men"}>Jewellery</a></li>
                                                                <li><a href={"/men"}>Sunglasses</a></li>
                                                                <li><a href={"/men"}>Perfumes</a></li>
                                                                <li><a href={"/men"}>Beauty</a></li>
                                                                <li><a href={"/men"}>Shirts</a></li>
                                                                <li><a href={"/men"}>Sunglasses</a></li>
                                                                <li><a href={"/men"}>Swimwear</a></li>
                                                            </ul>
                                                        </div> */}
                                                        <div className="clearfix"></div>
                                                    </div>
                                                </ul>
                                            </li>
                                            <li className="dropdown menu__item">
                                                <a href="" className="dropdown-toggle menu__link" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Women's wear <span className="caret"></span></a>
                                                <ul className="dropdown-menu multi-column columns-3">
                                                    <div className="agile_inner_drop_nav_info">
                                                        <div className="col-sm-3 multi-gd-img">
                                                            <ul className="multi-column-dropdown">
                                                                <li><a href={"/women"}>Clothing</a></li>
                                                                <li><a href={"/women"}>Wallets</a></li>
                                                                <li><a href={"/women"}>Footwear</a></li>
                                                                <li><a href={"/women"}>Watches</a></li>
                                                                <li><a href={"/women"}>Accessories</a></li>
                                                                <li><a href={"/women"}>Bags</a></li>
                                                                <li><a href={"/women"}>Caps & Hats</a></li>
                                                            </ul>
                                                        </div>
                                                        {/* <div className="col-sm-3 multi-gd-img">
                                                            <ul className="multi-column-dropdown">
                                                                <li><a href={"/women"}>Jewellery</a></li>
                                                                <li><a href={"/women"}>Sunglasses</a></li>
                                                                <li><a href={"/women"}>Perfumes</a></li>
                                                                <li><a href={"/women"}>Beauty</a></li>
                                                                <li><a href={"/women"}>Shirts</a></li>
                                                                <li><a href={"/women"}>Sunglasses</a></li>
                                                                <li><a href={"/women"}>Swimwear</a></li>
                                                            </ul>
                                                        </div> */}
                                                        <div className="col-sm-6 multi-gd-img multi-gd-text ">
                                                            <a href={"/women"}><img src={top1} alt=" " /></a>
                                                        </div>
                                                        <div className="clearfix"></div>
                                                    </div>
                                                </ul>
                                            </li>
                                            <li className=" menu__item"><a className="menu__link" href={"/cart"}><i className="fa fa-shopping-cart">Cart</i></a></li>
                                            <li className=" menu__item"><a className="menu__link" href="/checkout">Checkout</a></li>

                                            {this.state.userdata == undefined ? (
                                                <div >
                                                    <ul className="nav navbar-nav menu__list">
                                                        <li className=" menu__item"><a className="menu__link" href={"/login"}><span class="glyphicon glyphicon-log-in"></span>&nbsp;&nbsp;Login</a></li>
                                                        <li className=" menu__item"><a className="menu__link" href={"/signup"}><span class="glyphicon glyphicon-user"></span>&nbsp;Signup</a></li>
                                                    </ul>
                                                </div>
                                            ) : (
                                                    <div >
                                                        <ul className="nav navbar-nav menu__list">
                                                            <li className=" menu__item"><a className="menu__link" href={"/userdash"}><i className="fa fa-user-circle fa-1x" aria-hidden="true"><span></span>&nbsp;&nbsp;{this.state.userdata.name}</i></a></li>
                                                            <li className=" menu__item"><a className="menu__link" href="" onClick={e => this.logoutHandler(e)}><i className="fa fa-power-off" aria-hidden="true">&nbsp;&nbsp;Logout</i></a></li>
                                                        </ul>
                                                    </div>
                                                )}

                                            {/* <li className=" menu__item"><a className="menu__link" to={"/contact"}>Contact</a></li> */}
                                        </ul>
                                    </div>
                                </div>
                            </nav>
                        </div>
                        {/* <div className="top_nav_right">
                            <div className="wthreecartaits wthreecartaits2 cart cart box_1">
                                <form action="/cart" className="last">
                                    <button className="w3view-cart" type="submit"  value=""><i className="fa fa-cart-arrow-down" aria-hidden="true"></i></button>
                                </form>

                            </div>
                        </div> */}
                        <div className="clearfix"></div>
                    </div>
                </div>

            </div>
        )
    }
}
export default NavBar;

