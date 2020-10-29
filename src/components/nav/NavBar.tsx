import React, { Component } from 'react';
import UserPool from '../User/UserPool'
import $ from "jquery";
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js'

// import 'bootstrap/dist/css/bootstrap.css';

interface Props {
}
interface State {
    email: string;
    password: string;
    user: any;
    dropdown: boolean;
}

class NavBar extends Component<Props, State> {

    constructor(props: any) {
        super(props);
        this.state = {
            email: '',
            password: '',
            user: '',
            dropdown: false,
            // data:'',
        }
        // this.handleChange = this.handleChange.bind(this);
    }


    componentDidMount() {
        const cognitoUser = UserPool.getCurrentUser()
        this.setState({ user: cognitoUser })
        console.log(cognitoUser)
    }

    onSignupSubmit = (event: any) => {

        event.preventDefault();
        UserPool.signUp(this.state.email, this.state.password, [], [], (err: any, data: any) => {
            if (err) {
                console.log(err);
            } else {
                console.log(data)
                var myHeaders = new Headers();
                // add content type header to object
                myHeaders.append("Content-Type", "application/json");
                // using built in JSON utility package turn object to string and store in a variable
                var raw = JSON.stringify({ "UserCode": data.userSub, "UserEmail": this.state.email });
                // create a JSON object with parameters for API call and store in a variable
                var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                };
                // make API call with parameters and use promises to get response
                fetch("https://vxcraakjtf.execute-api.us-west-2.amazonaws.com/dev", requestOptions)
                    .then(response => response.text())
                    .then(result => console.log(JSON.parse(result)))
                    .catch(error => console.log('error', error));

                this.closeModal('#signupModal');
            }
        });

    }
    onLoginSubmit = (event: any) => {
        event.preventDefault();
        const user = new CognitoUser({
            Username: this.state.email,
            Pool: UserPool
        });

        const authDetails = new AuthenticationDetails({
            Username: this.state.email,
            Password: this.state.password,
        })

        user.authenticateUser(authDetails, {
            onSuccess: data => {
                console.log(data);
                this.closeModal('#loginModal');
                window.location.reload();
                // this.setState({ user: data })
            },
            onFailure: err => {
                console.log(err);
            },
            newPasswordRequired: data => {
                console.log(data);
            },
        })
    }

    logOut = () => {
        if (this.state.user) {
            this.state.user.signOut();
        }
        window.location.reload();
    }



    renderModal = (modalID: string) => {
        $(modalID).toggle({
            show: true,
        });
    }

    closeModal = (modalID: string) => {
        $(modalID).toggle({
            show: false,
        });

    }

    toggleDropdown = () => {
        this.setState({ dropdown: !this.state.dropdown })
    }

    render() {
        return (
            // <div className='container'
            <div
                style={{
                    border: '1px solid black',
                    height: '50px',
                    paddingTop: 5,
                    backgroundColor: 'rgba(0,0,0,0.5)'
                    // marginTop: '30px',
                    // paddingBottom: '10px'
                }}>
                <div className='row text-center align-middle text-white'>
                    <div className='col'></div>
                    <div className='col'>
                        <a href='/' className='text-decoration-none text-white'>
                            <h2 className=''>JINFOOD</h2>
                            {/* <h2 className='font-weight-bold'>JINFOOD</h2> */}
                        </a>
                    </div>
                    <div className='col' hidden={this.state.user ? true : false}>
                        <div className='row float-right mr-3' style={{ paddingTop: 5 }}>
                            <div className='col'
                                onClick={() => this.renderModal('#loginModal')}
                                style={{ cursor: 'pointer' }}>
                                <h4 className='font-weight-bold'>LOGIN</h4>
                            </div>
                            <div className='col' style={{ paddingTop: 5 }}>
                                <h6>or</h6>
                            </div>
                            <div className='col' onClick={() => this.renderModal('#signupModal')}
                                style={{ cursor: 'pointer' }}>
                                <h4 className='font-weight-bold'>SIGNUP</h4>
                            </div>
                        </div>
                    </div>
                    <div className='col' hidden={this.state.user ? false : true}>
                        <div className="btn-group">
                            <button type="button" className="btn btn-secondary dropdown-toggle"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                                style={{
                                    border: '0px', backgroundColor: 'transparent',
                                    fontWeight: 'bolder', marginTop: 5
                                }}
                                onClick={() => { this.toggleDropdown() }}>
                                Account
                            </button>
                            <div className={this.state.dropdown ? "dropdown-menu show" : 'dropdown-menu'}>
                                <a className="dropdown-item" href="/myrestaurant">My Restaurant</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="#">Orders</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item"
                                    href='#'
                                    onClick={() => this.logOut()}>Logout</a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* login modal */}
                <div className="modal" id="loginModal" tabIndex={-1}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Login</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close"
                                    onClick={() => { this.closeModal('#loginModal') }}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={this.onLoginSubmit}>
                                    <div className="form-group">
                                        <label >Email address</label>
                                        <input type="email" className="form-control" placeholder='Enter email'
                                            onChange={event => this.setState({ email: event.target.value })} />
                                    </div>
                                    <div className="form-group">
                                        <label>Password</label>
                                        <input type="password" className="form-control" placeholder='Enter password'
                                            onChange={event => this.setState({ password: event.target.value })} />
                                    </div>
                                    <button type="submit" className="btn btn-primary" style={{ float: 'right' }}>Login</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                {/* signup modal */}
                <div className="modal" id="signupModal" tabIndex={-1}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Sign up</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close"
                                    onClick={() => { this.closeModal('#signupModal') }}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={this.onSignupSubmit}>
                                    <div className="form-group">
                                        <label >Email address</label>
                                        <input type="email" className="form-control" placeholder='Enter email'
                                            onChange={event => this.setState({ email: event.target.value })} />
                                    </div>
                                    <div className="form-group">
                                        <label>Password</label>
                                        <input type="password" className="form-control" placeholder='Enter password'
                                            onChange={event => this.setState({ password: event.target.value })} />
                                    </div>
                                    <button type="submit" className="btn btn-primary" style={{ float: 'right' }}>Sign up</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default NavBar;
