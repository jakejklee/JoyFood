import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import $ from "jquery";
// import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js'
// import NavBar from './nav/NavBar';

interface Props {
    onOrder: boolean;
    rID: string;
}
interface State {
    email: string;
    password: string;
    user: any;
    restaurantData: any;
    activeData: any;
    menuData: any;
}

class RestaurantList extends Component<Props, State> {

    constructor(props: any) {
        super(props);
        this.state = {
            email: '',
            password: '',
            user: '',
            restaurantData: '',
            activeData: '',
            menuData: {},
        }

        // this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount = async () => {
        const response = await fetch('https://h4smy9dr1f.execute-api.us-west-2.amazonaws.com/dev');
        const body = await response.json();
        // const currURL = window.location.href;
        // const activeID = currURL.split('?');
        this.setState({ restaurantData: body, activeData: this.props.rID })
        console.log((body))
    }

    activeItem = (id: string, menu: any) => {
        console.log(id)
        console.log(this.state.activeData)
        console.log(menu)
        if (this.state.activeData) {
            $('#' + this.state.activeData).removeClass('active');
        }
        $('#' + id).addClass('active');
        this.setState({ activeData: id, menuData: menu })
    }

    renderRestaurantList = () => {
        const data = this.state.restaurantData;
        const dataArray: any = [];


        if (data) {
            data.forEach((element: any) => {
                const id = element.RestaurantName + element.CityName;
                const reId = id.replace(/"/g, '').replace(" ", '');
                dataArray.push(
                    <a key={reId} id={reId} href="#"
                        className={this.state.activeData === reId ?
                            "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"}

                        onClick={() => this.activeItem(reId, element)}>
                        <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-1">{element.RestaurantName.replace(/"/g, '')}</h5>
                        </div>
                        <p className="mb-1">{element.CityName.replace(/"/g, '')}</p>
                    </a>
                )
            });
        } else {
            dataArray.push(<div>
                loading
            </div>)
        }
        return dataArray;
    }

    render() {
        return (
            <div className='container' style={{ marginTop: 30, height: '100%' }}>
                <div className="list-group" style={{ maxHeight: '50%', overflow: 'scroll' }}>
                    {this.renderRestaurantList()}

                </div>
                <Link to={{
                    pathname: "/restaurantdetail",
                    state: this.state.menuData, // your data array of objects
                }}
                    className={this.props.onOrder ? 'hidden' : "list-group-item list-group-item-action"}
                    style={{
                        textAlign: 'center', backgroundColor: '#28a745',
                        borderRadius: 5, cursor: 'pointer', color: 'white'
                    }}>
                    <h5>See Menu</h5>
                </Link>
            </div>
        );
    }
}
export default RestaurantList;
