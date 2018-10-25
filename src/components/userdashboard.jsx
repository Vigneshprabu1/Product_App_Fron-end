import React, { Component } from 'react';
// import Profilelogo from "../components/images/pic.png";
import axios from 'axios';
// import Avatar from 'react-avatar-edit'

import './user.css';
class UserDashBoard extends Component {
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
            file: '',
            imagePreviewUrl: ''
        }
        this.state.userdata = JSON.parse(localStorage.getItem("user"));
        // console.log(this.state.userdata);
        this.addrtoggle = this.addrtoggle.bind(this);
        this.changeaddr = this.changeaddr.bind(this);
        // this.fileSelectedHander=this.fileSelectedHander.bind(this);

    }
    componentDidMount() {
        if (this.state.userdata != undefined) {
            axios.get("http://node-api-011.herokuapp.com/orders/" + this.state.userdata.uid).then(response => {
                console.log(response.data)
                this.setState({ listData: response.data });
                //  console.log(this.state.listData);

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
            console.log("sucessfully updated" + response);
        }).catch(error => console.log(error)
        )
    }
    logoutHandler = (e) => {
        localStorage.clear()
        window.location.reload();
        this.props.history.replace('/')
    }
    // fileSelectedHander =event=>{
    //     console.log(event.target.files[0]);

    // }
    _handleSubmit(e) {
        e.preventDefault();
        // TODO: do something with -> this.state.file
        console.log('handle uploading-', this.state.file);
        localStorage.setItem('handle uploading-', this.state.file.name);
        

    }

    _handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];
       // localStorage.setItem("image",e);

        reader.onloadend = () => {
          

            this.setState({
                file: file,
                 imagePreviewUrl: reader.result
                
            });
        }

        reader.readAsDataURL(file)
    }


    render() {
        let { imagePreviewUrl } = this.state;
        
        let $imagePreview = null;
        if (imagePreviewUrl) {
           localStorage.setItem("image", JSON.stringify(imagePreviewUrl));
            console.log(JSON.parse(localStorage.getItem("image")));
            //var imgAsDataURL = image2.toDataURL("image/png");
            var image2 =JSON.parse(localStorage.getItem("image"));
            //console.log(imgAsDataURL);
            
            $imagePreview = (<img src={image2} alt="Profile Photo"  class="avatar" />);
        } else {
            $imagePreview = (<div className="previewText"><img src="https://www.w3schools.com/howto/img_avatar.png" alt="Profile Photo" class="avatar" /></div>);
        }
        
        return (
            <div>

                <div className="container">
                    <h1>User Profile</h1>
                    <hr />
                    <div className="row">
                        {/* <!-- left column --> */}


                        <div className="col-md-5 ">
                            <div className="previewComponent">

                                {$imagePreview}
                                <form onSubmit={(e) => this._handleSubmit(e)}>
                                    <input className="fileInput"
                                        type="file"
                                        onChange={(e) => this._handleImageChange(e)} />
                                    <button className="submitButton"
                                        type="submit"
                                        onClick={(e) => this._handleSubmit(e)}>Upload Image</button>
                                </form>

                                {/* </div> */}
                                {/* <div>
                                        <img src="avatar.png" alt="Avatar" class="avatar"/>
                                        </div> */}
                            </div>
                        </div>

                        {/* <!-- edit form column --> */}
                        <div className="col-lg-5 personal-info">
                            {/* <div className="alert alert-info alert-dismissable">
                                <a className="panel-close close" data-dismiss="alert">×</a>
                                <i className="fa fa-coffee"></i>
                                This is an <strong>.alert</strong>. Use this to show important messages to the user.
                          </div> */}

                            <form className="form-horizontal" role="form">
                                {this.state.userdata == undefined ? (
                                    <div className="list-group">
                                        <div className="btn-group" role="group" aria-label="Basic example" >
                                            <button type="button" className="btn btn-primary" onClick={() => this.login()}>Login</button>
                                            <button type="button" className="btn btn-primary" onClick={() => this.signup()}>Sign up</button>

                                        </div>
                                    </div>

                                ) : (
                                        <div>
                                            <div className="text-center">
                                                <div className="form-group">
                                                    <label className="col-md-4 control-label">Name</label>
                                                    <div className="col-md-8">
                                                        <input className="form-control" type="text" value={this.state.userdata.name} />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-md-4 control-label">Email</label>
                                                    <div className="col-md-8">
                                                        <input className="form-control" type="text" value={this.state.userdata.email} />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-md-4 control-label">Address</label>
                                                    <div className="col-md-8">
                                                        <input className="form-control" type="text" value={this.state.userdata.address} />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="col-md-4 control-label">PhoneNo</label>
                                                    <div className="col-md-8">
                                                        <input className="form-control" type="text" value={this.state.userdata.phno} />
                                                    </div>
                                                </div>

                                                <div className="form-group">
                                                    <label className="col-md-4 control-label">Password:</label>
                                                    <div className="col-md-8">
                                                        <input className="form-control" type="password" value={this.state.userdata.password} />
                                                    </div>
                                                </div>
                                                <br />

                                                <div className="form-group">
                                                    <label className="col-md-4 control-label"></label>
                                                    <div className="col-md-6">
                                                        {/* <input type="button" className="btn btn-primary" value="Save Changes" /> */}
                                                        <span>
                                                            <input type="reset" className="btn btn-primary" onClick={e => this.logoutHandler(e)} value="LogOut" /></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                {/* <div className="form-group">
                                    <label className="col-lg-3 control-label">Time Zone:</label>
                                    <div className="col-lg-8">
                                        <div className="ui-select">
                                            <select id="user_time_zone" className="form-control">
                                                <option value="Hawaii">(GMT-10:00) Hawaii</option>
                                                <option value="Alaska">(GMT-09:00) Alaska</option>
                                                <option value="Pacific Time (US &amp; Canada)">(GMT-08:00) Pacific Time (US &amp; Canada)</option>
                                                <option value="Arizona">(GMT-07:00) Arizona</option>
                                                <option value="Mountain Time (US &amp; Canada)">(GMT-07:00) Mountain Time (US &amp; Canada)</option>
                                                <option value="Central Time (US &amp; Canada)" selected="selected">(GMT-06:00) Central Time (US &amp; Canada)</option>
                                                <option value="Eastern Time (US &amp; Canada)">(GMT-05:00) Eastern Time (US &amp; Canada)</option>
                                                <option value="Indiana (East)">(GMT-05:00) Indiana (East)</option>
                                            </select>
                                        </div>
                                    </div>
                                </div> */}

                            </form>

                            <div></div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default UserDashBoard;
