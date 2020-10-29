import React, { Component } from 'react';
import $ from "jquery";
import NavBar from '../nav/NavBar';
import UserPool from '../User/UserPool'
import MenuList from './MenuList';
// import MainFoodImage from './images/MainFoodImage.jpg'

// import 'bootstrap/dist/css/bootstrap.css';

interface Props {
}
interface State {
    name: string;
    city: string;
    menuName: string;
    menuPrice: string;
    menuDescription: string;
    user: any;
    myList: any;
    currentRestaurant: any;
}

class MyRestaurant extends Component<Props, State> {

    constructor(props: any) {
        super(props);
        this.state = {
            name: '',
            city: '',
            user: '',
            menuName: '',
            menuPrice: '',
            menuDescription: '',
            myList: {},
            currentRestaurant: '',
            // data:'',
        }
        // this.handleChange = this.handleChange.bind(this);
    }
    async componentDidMount() {
        const cognitoUser = await UserPool.getCurrentUser()
        this.setState({ user: cognitoUser });
        if (!cognitoUser) {
            window.location.replace('/');
        } else {
            var myHeaders = new Headers();
            // add content type header to object
            myHeaders.append("Content-Type", "application/json");
            // using built in JSON utility package turn object to string and store in a variable
            var raw = JSON.stringify({
                "UserCode": this.state.user.username
            });
            // create a JSON object with parameters for API call and store in a variable
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
            };
            const response = await fetch('https://151ajzrz8c.execute-api.us-west-2.amazonaws.com/dev', requestOptions);
            const body = await response.json();
            this.setState({ myList: body })
        }
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

    addNewData = () => {
        const usercode = this.state.user.username

        var myHeaders = new Headers();
        // add content type header to object
        myHeaders.append("Content-Type", "application/json");
        // using built in JSON utility package turn object to string and store in a variable
        var raw = JSON.stringify({
            "RestaurantName": this.state.name,
            "CityName": this.state.city,
            "UserCode": usercode,
            "menu": []
        });
        // create a JSON object with parameters for API call and store in a variable
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
        };
        // make API call with parameters and use promises to get response
        fetch("https://c3n8opwf90.execute-api.us-west-2.amazonaws.com/dev", requestOptions)
            .then(response => response.text())
            .then(result => console.log(JSON.parse(result)))
            .catch(error => console.log('error', error))
            .then(() => window.location.reload());


    }
    renderRestaurantDetail = (num: number) => {
        this.setState({ currentRestaurant: this.state.myList.Items[num] })
        // const menuData = this.state.myList.Items[num].menu;

    }

    renderMyList = () => {
        const myList = this.state.myList.Items;
        const myListArray: any = [];
        for (let i = 0; i < this.state.myList.Count; i++) {

            myListArray.push(
                <a key={i} href="#" className="list-group-item list-group-item-action"
                    onClick={() => this.renderRestaurantDetail(i)}>
                    <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">{myList[i].RestaurantName.replace(/"/g, '')}</h5>
                    </div>
                    <p className="mb-1">{myList[i].CityName.replace(/"/g, '')}</p>
                </a>

                // <div style={{borderBottom:'1px solid black'}}>
                //     <div><h3>{myList[i].RestaurantName}</h3></div>
                //     <div>{myList[i].CityName}</div>
                // </div>
            )
        }
        return (
            <div className='container' style={{ marginTop: 30 }}>
                <div className="list-group" style={{ maxHeight: '50%', overflow: 'scroll' }}>
                    {myListArray}
                </div>
                <a href="#" className="list-group-item list-group-item-action"
                    style={{
                        textAlign: 'center', backgroundColor: '#28a745',
                        borderRadius: 5, cursor: 'pointer', color: 'white'
                    }} onClick={() => this.renderModal('#addRestaurantModal')}>
                    <h5>New Restaurant</h5>
                </a>
            </div>
        );
    }

    addMenuData = (name: string, cName: string, num: number) => {

        var myHeaders = new Headers();
        // add content type header to object
        myHeaders.append("Content-Type", "application/json");
        // using built in JSON utility package turn object to string and store in a variable
        var raw = JSON.stringify({
            "RestaurantName": name.replace(/"/g, ''),
            "CityName": cName.replace(/"/g, ''),
            "menu": {
                "menuName": this.state.menuName,
                "menuPrice": this.state.menuPrice,
                "menuDescription": this.state.menuDescription,
                "menuNum": num
            }
        });
        console.log(raw)
        // create a JSON object with parameters for API call and store in a variable
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
        };
        // make API call with parameters and use promises to get response
        fetch("https://aiz6cg67v6.execute-api.us-west-2.amazonaws.com/dev", requestOptions)
            .then(response => response.text())
            .then(result => console.log(JSON.parse(result)))
            .catch(error => console.log('error', error));

        this.setState({ menuDescription: '', menuName: '', menuPrice: '' })
        this.closeModal('#addMenuModal')
        
    }

    renderMenuList = () => {
        const menuList = this.state.currentRestaurant.menu
        const listArr: any = [];
        menuList.forEach((element: any) => {
            listArr.push(
                <div key={element[0].menuName} className='row' style={{
                    marginTop: 10,
                }}>
                    <div className='col-10'
                        style={{
                            color: '#6c757d', border: '1px solid #6c757d', borderTopLeftRadius: 10,
                            borderBottomLeftRadius: 10
                        }}
                    ><h4>{element[0].menuName}</h4>
                        <h6>${element[0].menuPrice.replace(/"/g, '')}</h6>
                        <span>{element[0].menuDescription}</span></div>
                    <div className='col-2 btn btn-secondary'
                        style={{
                            borderTopLeftRadius: 0, borderBottomLeftRadius: 0,
                            borderTopRightRadius: 10, borderBottomRightRadius: 10,
                            display: 'flex', justifyContent: 'center', alignItems: 'center'
                        }}>
                        <h3>Edit</h3>
                    </div>
                </div>
            )
        });

        return listArr;
    }

    render() {
        const currData = this.state.currentRestaurant
        return (
            <div className=''
                // <div
                style={{
                    // backgroundImage: `url(${MainFoodImage})`,
                    // backgroundPosition: 'center',
                    // backgroundRepeat: 'no-repeat',
                    // backgroundSize: 'cover',
                    // border: '1px solid black',
                    height: 1000,
                    // height: '100%',
                    // marginTop: '30px',
                    paddingBottom: '10px'
                }}>
                <div>
                    <NavBar></NavBar>
                </div>
                <div className='container'>
                    <div className='row'>
                        <div className='col-4'>
                            {this.renderMyList()}
                        </div>
                        <div className='col-8' style={{ marginTop: 30 }}>
                            {this.state.currentRestaurant ?
                                <div>
                                    <div className='row'>
                                        <div className='col'>
                                            <h2>{this.state.currentRestaurant.RestaurantName.replace(/"/g, '')}</h2>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col btn btn-outline-primary w-50'
                                            onClick={() => this.renderModal('#addMenuModal')}>Add Munu</div>
                                        <div className='col btn btn-outline-success w-50'>Manage Orders</div>
                                    </div>

                                    {/* {this.renderMenuList()} */}
                                    <MenuList
                                        onOrder={false}
                                        menuList={this.state.currentRestaurant}
                                    ></MenuList>

                                    {/* <div className='row' style={{
                                        marginTop: 10,

                                    }}>
                                        <div className='col-10'
                                            style={{
                                                color: '#6c757d', border: '1px solid #6c757d', borderTopLeftRadius: 10,
                                                borderBottomLeftRadius: 10
                                            }}
                                        ><h4>Menu name</h4>
                                            <h6>$9.99</h6>
                                            <span>Description</span></div>
                                        <div className='col-2 btn btn-secondary'
                                            style={{
                                                borderTopLeftRadius: 0, borderBottomLeftRadius: 0,
                                                borderTopRightRadius: 10, borderBottomRightRadius: 10,
                                                display: 'flex', justifyContent: 'center', alignItems: 'center'
                                            }}>
                                            <h3>Edit</h3>
                                        </div>
                                    </div> */}

                                </div>
                                :
                                <h3>Select a restaurant from the list for detail</h3>
                            }
                            {/* <button className='btn btn-primary' onClick={() => this.renderModal('#addRestaurantModal')}>New Restaurant</button> */}
                        </div>
                    </div>
                </div>

                {/* add restaurant modal */}
                <div className="modal" id="addRestaurantModal" tabIndex={-1}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">New Restaurant</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close"
                                    onClick={() => { this.closeModal('#addRestaurantModal') }}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {/* <form> */}
                                <div className="form-group">
                                    <label >Name</label>
                                    <input type="text" className="form-control" placeholder='Enter restaurant name'
                                        onChange={event => this.setState({ name: event.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label>City</label>
                                    <input type="text" className="form-control" placeholder='Enter city name'
                                        onChange={event => this.setState({ city: event.target.value })} />
                                </div>
                                <button className="btn btn-primary" style={{ float: 'right' }}
                                    onClick={() => this.addNewData()}>Add New Restaurant</button>
                                {/* </form> */}
                            </div>
                        </div>
                    </div>
                </div>

                {/* add menu modal */}
                <div className="modal" id="addMenuModal" tabIndex={-1}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">New Menu</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close"
                                    onClick={() => { this.closeModal('#addMenuModal') }}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {/* <form> */}
                                <div className="form-group">
                                    <label >Name</label>
                                    <input type="text" className="form-control" placeholder='Enter menu name'
                                        value={this.state.menuName}
                                        onChange={event => this.setState({ menuName: event.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label>Price</label>
                                    <input type="text" className="form-control" placeholder='Enter price'
                                        value={this.state.menuPrice}
                                        onChange={event => this.setState({ menuPrice: event.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label>Description</label>
                                    <input type="text" className="form-control" placeholder='Description and ingredient'
                                        value={this.state.menuDescription}
                                        onChange={event => this.setState({ menuDescription: event.target.value })} />
                                </div>
                                <button className="btn btn-primary" style={{ float: 'right' }}
                                    onClick={() => this.addMenuData(currData.RestaurantName, currData.CityName, currData.menu.length)}>
                                    Add New Menu</button>
                                {/* </form> */}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}
export default MyRestaurant;
