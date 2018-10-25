import React, { Component } from 'react';
import axios from 'axios';

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedout: false,
            username: '',
            show: false,
            show1: false,
            newaddress: false,
            userdata: [],
            delivery_address: "",
            listData: [],
        }
        this.state.userdata = JSON.parse(localStorage.getItem("user"));
        console.log(this.state.userdata);
        this.addrtoggle = this.addrtoggle.bind(this);
        this.changeaddr = this.changeaddr.bind(this);
    }
    componentDidMount() {
        if (this.state.userdata != undefined) {
            axios.get("http://node-api-011.herokuapp.com/orders/" + this.state.userdata.uid).then(response => {
                console.log(response.data)
                this.setState({ listData: response.data });
                console.log(this.state.listData);

            })
        }

    }

    login() {
        this.props.history.push('/login');
        this.setState({ show: true });
        this.setState({ show1: false });

    }
    signup() {
        this.props.history.push('/signup');
        this.setState({ show1: true });
        this.setState({ show: false });
    }
    addrtoggle() {
        this.setState({ newaddress: true });
    }
    changeaddr() {
        var address = this.state.delivery_address;
        axios.put("http://node-api-011.herokuapp.com/users/" + this.state.userdata.uid, address).then(response => {
            this.refreshUser(response);
            console.log("sucessfully updated" + response);
        }).catch(error => console.log(error)
        )
    }
    logoutHandler = (e) => {
        localStorage.clear()
        window.location.reload();
        this.props.history.replace('/')
    }
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-sm navbar-dark bg-dark ">
                    <div className="navbar-header  ">
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
                                <a className="nav-link" href="/cart"><i className="fa fa-shopping-cart"></i> Cart</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link " href="/checkout">Checkout</a>
                            </li>
                            {this.state.userdata == undefined ? (
                                <div >
                                    <ul className=" navbar-nav ">
                                        <li className="nav-item">
                                            <a className="nav-link" href="/login"><span class="glyphicon glyphicon-log-in"></span> Login</a>
                                        </li>
                                        <li className="nav-item ">
                                            <a className="nav-link" href="/signup"><span class="glyphicon glyphicon-user"></span> Signup</a>
                                        </li>
                                    </ul>
                                </div>
                            ) : (
                                    <div >
                                        <ul className="navbar-nav ">
                                            <li className="nav-item">
                                                <a className="nav-link" href="/userdash"><i className="fa fa-user-circle fa-1x" aria-hidden="true"><span></span> {this.state.userdata.name}</i></a>
                                            </li>
                                        </ul>
                                        <ul className="navbar-nav">
                                            <li className="nav-item">
                                                <a className="nav-link" href="" onClick={e => this.logoutHandler(e)}><i className="fa fa-power-off" aria-hidden="true"> Logout</i></a>
                                            </li>
                                        </ul>
                                    </div>


                                )}


                        </ul>
                    </div>
                </nav>


            </div>
        )
    }
}
export default NavBar;

