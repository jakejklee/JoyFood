import React, { Component } from 'react';
import UserPool from '../User/UserPool'
// import $ from "jquery";
import NavBar from '../nav/NavBar';
import MenuList from './MenuList';
import { forEachChild } from 'typescript';
// import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js'
// import NavBar from './nav/NavBar';

interface Props {
    menuList: any;
}
interface State {
    email: string;
    password: string;
    user: any;
    restaurantData: any;
    currentData: any;
    activeData: any;
}
class RestaurantDetail extends Component<Props, State> {

    constructor(props: any) {
        super(props);
        const data = props.location.state;
        this.state = {
            email: '',
            password: '',
            user: '',
            restaurantData: '',
            currentData: data,
            activeData: '',
        }
    }

    async componentDidMount() {
        const response = await fetch('https://h4smy9dr1f.execute-api.us-west-2.amazonaws.com/dev');
        const body = await response.json();
        // const currURL = window.location.href;
        // const activeID = currURL.split('?');
        this.setState({ restaurantData: body })
        console.log((body))
    }

    renderRestaurantDetail = (data: any, id: string) => {
        this.setState({ currentData: data, activeData: id })
        // const menuData = this.state.myList.Items[num].menu;

    }

    renderMyList = () => {
        const myList = this.state.restaurantData;
        const myListArray: any = [];
        if (myList) {
            myList.forEach((element: any) => {
                const id = element.RestaurantName + element.CityName;
                const reId = id.replace(/"/g, '').replace(" ", '');
                myListArray.push(
                    <a key={reId} href="#"
                        className={this.state.activeData === reId ?
                            "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"}
                        onClick={() => this.renderRestaurantDetail(element, reId)}>
                        <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-1">{element.RestaurantName.replace(/"/g, '')}</h5>
                        </div>
                        <p className="mb-1">{element.CityName.replace(/"/g, '')}</p>
                    </a>
                )
            });
        }
        return (
            <div className='container' style={{ marginTop: 30 }}>
                <div className="list-group" style={{ maxHeight: '50%', overflow: 'scroll' }}>
                    {myListArray}
                </div>
            </div>
        );
    }

    render() {
        console.log(this.props)
        console.log(this.state.currentData)
        const cData = this.state.currentData
        let reId = ''
        // if (cData) {
        //     const id = cData.RestaurantName + cData.CityName;
        //     reId = id.replace(/"/g, '').replace(" ", '');
        // }
        return (
            <div>
                <NavBar></NavBar>
                <div className='container' style={{ marginTop: 30, height: 1000 }}>
                    <h5>Restaurant Menu</h5>
                    <div className='row h-100'>
                        <div className='col-5'>
                            {this.renderMyList()}
                        </div>
                        <div className='col-7'>
                            {this.state.currentData ?
                                <div>
                                    <h2>{this.state.currentData.RestaurantName.replace(/"/g, '')}</h2>
                                    {/* <div className='row'>
                                        <div className='col btn btn-outline-primary w-50'
                                            >Order Food</div>
                                        <div className='col btn btn-outline-success w-50'>Reset Order</div>
                                    </div> */}
                                    <MenuList
                                        menuList={this.state.currentData}
                                        onOrder={true}
                                        ></MenuList>
                                </div>
                                :
                                <h3>Select a restaurant for menu</h3>
                            }
                        </div>

                    </div>
                </div>
            </div >
        );
    }
}
export default RestaurantDetail;
