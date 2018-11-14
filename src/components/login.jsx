import React, { Component } from 'react';
import axios from 'axios';
import './login.css';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userdata1: {},
            userdata2: [],
        }
        this.login = this.login.bind(this);

    }
    componentDidMount() {

        axios.get('http://node-api-011.herokuapp.com/users').then(
            response => {
                console.log("successfully get", response);
                this.interval = setInterval(() => this.setState({ time: Date.now() }), 1000);
                this.setState({ userdata2: response.data })
            }
        ).catch(error => {
            console.log(error)
        })
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    login() {

        var login = false;
        this.state.userdata2.map(a => {
            if ((a.name === this.state.userdata1.name) && (a.password === this.state.userdata1.password)) {
                alert("successfully logged in" + " " + this.state.userdata1.name);
                localStorage.setItem('user', JSON.stringify(a));
                window.location.reload();
                this.props.history.push("/");
                login = true;

            }

        })
        if (login === false) {

            alert("invalid username or password");

        }

    }


    render() {
        return (
            <div>
                <div className="container">


                    <div className="omb_login">
                        <h3 className="omb_authTitle">Login or <a href="">Sign up</a></h3>
                        <div className="row omb_row-sm-offset-3 omb_socialButtons">
                            <div className="col-xs-4 col-sm-3">
                                <a href="" className="btn omb_btn-facebook">
                                <i class="fab fa-facebook fa-fw"></i>
                                    <span className="hidden-xs">Facebook</span>
                                </a>
                            </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <div className="col-xs-4 col-sm-2">
                                <a href="" className="btn  omb_btn-google">
                                <i class="fab fa-google fa-fw"></i> 
                                    <span className="hidden-xs">Google+</span>
                                </a>
                            </div>
                        </div>

                        <div className="row omb_row-sm-offset-3 omb_loginOr">
                            <div className="col-xs-12 col-sm-6">
                                <hr className="omb_hrOr" />
                                <span className="omb_spanOr">or</span>
                            </div>
                        </div>

                        <div className="row omb_row-sm-offset-3">
                            <div className="col-xs-12 col-sm-6">
                                <form className="omb_loginForm"  autoComplete="off" >
                                    <div className="input-group">
                                        <span className="input-group-addon"><i className="fa fa-user"></i></span>
                                        <input type="text" className="form-control" name="username" placeholder="Username" onChange={event => this.setState({ userdata1: Object.assign(this.state.userdata1, { "name": event.target.value }) })} />
                                    </div>
                                    <span className="help-block"></span>

                                    <div className="input-group">
                                        <span className="input-group-addon"><i className="fa fa-lock"></i></span>
                                        <input type="password" className="form-control" name="password" placeholder="Password" onChange={event => this.setState({ userdata1: Object.assign(this.state.userdata1, { "password": event.target.value }) })} />
                                    </div>
                                    
                                    <div className="col-xs-12 ">
                                        <label className="checkbox">
                                            <input type="checkbox" value="remember-me" />Remember Me
			                        	</label>
                                        <p className="omb_forgotPwd">
                                            <a href="">Forgot password?</a>
                                        </p>
                                    </div>
                                    <button className=" btn-lg btn-primary btn-block" type="submit" onClick={() => this.login()+this.refreshPage}>Login</button>
                                </form>
                            </div>
                        </div>

                    </div>



                </div> 
           
                {/* <br /><br />
                <div class="container">
                    <div class="d-flex justify-content-center h-100">
                        <div class="card"><br />
                            <div class="card-header">
                                <h3>Sign In</h3>
                                <div class="d-flex justify-content-end social_icon">
                                    <span><i class="fab fa-facebook-square"></i></span>
                                    <span><i class="fab fa-google-plus-square"></i></span>
                                   
                                </div>
                            </div>
                            <div class="card-body">
                                <form>
                                    <div class="input-group form-group">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"><i class="fas fa-user"></i></span>
                                        </div>
                                        <input type="text" className="form-control" name="username" placeholder="Username" onChange={event => this.setState({ userdata1: Object.assign(this.state.userdata1, { "name": event.target.value }) })} />

                                    </div>
                                    <div class="input-group form-group">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"><i class="fas fa-key"></i></span>
                                        </div>
                                        <input type="password" className="form-control" name="password" placeholder="Password" onChange={event => this.setState({ userdata1: Object.assign(this.state.userdata1, { "password": event.target.value }) })} />
                                    </div>
                                    <div class="row align-items-center remember">
                                        <input type="checkbox" />Remember Me
					</div>
                                    <div class="form-group">
                                        <input type="submit" value="Login" class="btn float-right login_btn" onClick={() => this.login() + this.refreshPage} />
                                    </div>
                                </form>
                            </div>
                            <div class="card-footer">

                                <div class="d-flex justify-content-center">
                                    <a href="#">Forgot your password?</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
                
                        </div>
                        )
                    }
                
                }
export default Login;