import React, { Component } from 'react';
import Login from './User/Login';
import Signup from './User/Signup';
import UserPool from './User/UserPool'
import $ from "jquery";
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js'

// import 'bootstrap/dist/css/bootstrap.css';

interface Props {
}
interface State {
    email: string;
    password: string;
    user: any;
}

class MainPage extends Component<Props, State> {

    constructor(props: any) {
        super(props);
        this.state = {
            email: '',
            password: '',
            user: '',
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


    //   private renderDetail = () => {
    //     const roomInfo = this.chatStore.getCurrentChatRoom();

    //     const topic = roomInfo.topic || 'No topic';
    //     const channelName = roomInfo.channels[this.chatStore.currChannelID].name;

    //     return (
    //       <Row className="h-100 mx-auto border border-secondary col-12">
    //         <Col className="d-flex align-items-center col-9 chatroom-title">
    //           <Link to='/home'>
    //             <Button variant="link"
    //               className="backbtn-space"
    //               onClick={this.props.openChatPage}
    //             >
    //               <FontAwesomeIcon className="backbtn-icon" icon={faArrowLeft} />
    //             </Button>
    //           </Link>
    //           <Alert className="bgGray-4 colorWhite" style={{ borderRadius: '10px', padding: '8px 20px', marginBottom: 0 }}>
    //             <span className="mr-1">
    //               {window.matchMedia('(min-width: 768px)').matches ? topic : this.truncateTopic(topic)}
    //             </span>
    //             <Badge variant="secondary">{channelName}</Badge>
    //           </Alert>
    //         </Col>
    //         <Col className="d-flex justify-content-end align-items-center col-3 icon-style">
    //           <Button
    //             onClick={this.sidebarStore.openChatStats}
    //             variant="link"
    //             style={{ textDecoration: 'none' }}
    //             className="btn-space-left"
    //           >
    //             <FontAwesomeIcon className="backbtn-icon" icon={faChartBar} />
    //           </Button>
    //           <Button onClick={this.sidebarStore.openChatDetail} variant="link" style={{ textDecoration: 'none' }}>
    //             <FontAwesomeIcon className="backbtn-icon" icon={faInfoCircle} />
    //           </Button>
    //         </Col>
    //       </Row>
    //     );
    //   };


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

    render() {
        return (
            // <div className='container'
            <div
                style={{
                    border: '1px solid black',
                    height: '100%',
                    marginTop: '30px',
                    paddingBottom: '10px'
                }}>
                <div className='row justify-content-md-center'>
                    <div className='col col-md-auto'>
                    <form onSubmit={this.onLoginSubmit}>
                                    <input type='text' placeholder='Enter address'></input>
                                    
                                    <button type='submit'>Search</button>
                                </form>
                    </div>
                </div>

                <div className='row justify-content-md-center' hidden={this.state.user ? false : true}>
                    <div className='col col-md-auto'>
                        <button type='button' className='btn btn-warning' onClick={() => this.logOut()}>Logout</button>
                    </div>
                </div>
                <div className='row justify-content-md-center' hidden={this.state.user ? true : false}>
                    <div className='col col-md-auto'>
                        <button type='button' className='btn btn-primary' data-toggle='modal'
                            data-target='#loginModal' onClick={() => { this.renderModal('#loginModal') }}>Login</button> or
                    </div>
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
                                <form onSubmit={this.onLoginSubmit}>
                                    <input type='email' placeholder='email' onChange={event => this.setState({ email: event.target.value })}></input>
                                    <input type='password' placeholder='password' onChange={event => this.setState({ password: event.target.value })}></input>
                                    <button type='submit'>Login</button>
                                </form>
                                <Login></Login>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => { this.renderModal('#loginModal') }}>Close</button>
                                    <button type="button" className="btn btn-primary">Save changes</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='col col-md-auto'>
                        <button type='button' className='btn btn-success' data-toggle='modal'
                            data-target='#signupModal' onClick={() => { this.renderModal('#signupModal') }}>Sign up</button>
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
                                    <form onSubmit={this.onSignupSubmit}>
                                        <input type='email' placeholder='email' onChange={event => this.setState({ email: event.target.value })}></input>
                                        <input type='password' placeholder='password' onChange={event => this.setState({ password: event.target.value })}></input>
                                        <button type='submit'>Sign up</button>
                                    </form>
                                    <Signup></Signup>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal"
                                            onClick={() => { this.closeModal('#signupModal') }}>Close</button>
                                        <button type="button" className="btn btn-primary">Save changes</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}
export default MainPage;
