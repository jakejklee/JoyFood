import React, { Component } from 'react';
import $ from "jquery";
// import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js'
import UserPool from '../User/UserPool'
import AIPList from '../AIPFunction/APIList'

interface Props {
    onOrder: boolean;
    menuList: any;
}
interface State {
    email: string;
    password: string;
    user: any;
    restaurantData: any;
    activeData: any;
    orderList: any;
}

class MenuList extends Component<Props, State> {

    constructor(props: any) {
        super(props);
        this.state = {
            email: '',
            password: '',
            user: '',
            restaurantData: '',
            activeData: props.menuList,
            orderList: [],
            // data:'',
        }
        // this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount = async () => {
        const cognitoUser = await UserPool.getCurrentUser()
        this.setState({ user: cognitoUser });
        // const response = await fetch('https://h4smy9dr1f.execute-api.us-west-2.amazonaws.com/dev');
        // const body = await response.json();
        // const currURL = window.location.href;
        // const activeID = currURL.split('?');
        // this.setState({ restaurantData: body, activeData: activeID[1] })
        // console.log((body))
    }

    // activeItem = (id: string) => {
    //     console.log(id)
    //     console.log(this.state.activeData)
    //     if (this.state.activeData) {
    //         $('#' + this.state.activeData).removeClass('active');
    //     }
    //     $('#' + id).addClass('active');
    //     this.setState({ activeData: id })
    // }

    orderHandleChange = (event: any, element: any) => {

        let currentOrder = this.state.orderList
        for (let i = 0; i < currentOrder.length; i++) {
            if (currentOrder[i].name === element.menuName) {
                currentOrder.splice(i, 1)
            }
        }
        console.log(event.target.value)
        console.log(currentOrder)
        if (event.target.value > 0) {
            console.log('in')
            const order = {
                name: element.menuName,
                price: element.menuPrice,
                orderNum: event.target.value
            }
            currentOrder.push(order);
        }
        this.setState({ orderList: currentOrder })
    }

    renderMenuList = () => {
        const menuList = this.props.menuList.menu
        const listArr: any = [];

        if (menuList) {
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
                        {this.props.onOrder ?
                            <div className='col-2'
                                style={{
                                    border: '1px solid #6c757d', borderLeft: '0',
                                    borderTopLeftRadius: 0, borderBottomLeftRadius: 0,
                                    borderTopRightRadius: 10, borderBottomRightRadius: 10,
                                    display: 'flex', justifyContent: 'center', alignItems: 'center'
                                }}>
                                <select className="form-control"
                                    onChange={(event) => this.orderHandleChange(event, element[0])}>
                                    <option>0</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    <option>6</option>
                                    <option>7</option>
                                    <option>7</option>
                                    <option>9</option>
                                    <option>10</option>
                                </select>
                            </div>
                            :
                            <div className='col-2 btn btn-secondary'
                                style={{
                                    borderTopLeftRadius: 0, borderBottomLeftRadius: 0,
                                    borderTopRightRadius: 10, borderBottomRightRadius: 10,
                                    display: 'flex', justifyContent: 'center', alignItems: 'center'
                                }}>
                                <h3>Edit</h3>
                            </div>
                        }
                    </div>
                );
            })
        } else {
            listArr.push(<div>
                loading
            </div>)
        }
        if (this.props.onOrder) {

            return (
                <div>
                    <div className='row'>
                        <div className='col btn btn-outline-primary w-50'
                            onClick={() => this.orderFood()}
                        >Order Food</div>
                        <div className='col btn btn-outline-success w-50'
                            onClick={() => this.resetOrder()}>Reset Order</div>
                    </div>
                    {listArr}
                </div>
            );
        } else {
            return (
                listArr
            );
        }

    }
    reloadMenuList=()=>{
        window.location.reload()
    }

    orderFood = () => {
        console.log(this.state.orderList)
        if (this.state.orderList.length > 0) {
            this.renderModal('#placeOrderModal')
        }
    }
    resetOrder = () => {
        $('select').val(0);
        this.setState({ orderList: [] })
    }

    placeOrder = () => {
        const user = this.state.user;
        const rData = this.state.activeData;
        const orderList = this.state.orderList;
        const now = new Date()
        const data = {
            userCode: user.username,
            restaurantName: rData.RestaurantName,
            cityName: rData.CityName,
            orderTime: now,
            order: orderList,
            orderNum: ''
        }

        console.log(data)
        console.log(this.state.orderList)
        console.log(this.state.activeData)

    }

    renderOrderList = () => {
        const list = this.state.orderList;
        const orderArray: any = [];
        let totalPrice: number = 0;

        list.forEach((element: any) => {
            const menuTotal = element.price.replace(/"/g, '') * element.orderNum
            totalPrice += menuTotal
            orderArray.push(
                <div className='row' style={{ borderBottom: '1px solid #dee2e6', padding: 10 }}>
                    <div className='col-7'>
                        <h5>{element.name.replace(/"/g, '')}</h5>
                    </div>
                    <div className='col'>
                        <h5>${element.price.replace(/"/g, '')}X {element.orderNum}</h5>
                    </div>
                    <div className='col'>
                        <h5>${menuTotal.toFixed(2)}</h5>
                    </div>
                </div>
            )
        });
        return (
            <div>
                {orderArray}
                <div className='row' style={{ borderBottom: '1px solid #dee2e6', padding: 10 }}>
                    <div className='col-7'>

                    </div>
                    <div className='col'>
                        <h5>Total:</h5>
                    </div>
                    <div className='col'>
                        <h5>${totalPrice.toFixed(2)}</h5>
                    </div>
                </div>
            </div>

        )
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

    render() {

        return (
            <div>
                {this.renderMenuList()}
                {/* place order modal */}
                <div className="modal" id="placeOrderModal" tabIndex={-1}>
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Place Order</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close"
                                    onClick={() => { this.closeModal('#placeOrderModal') }}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {this.renderOrderList()}
                                {
                                    this.state.user ?
                                        <button className="btn btn-primary" style={{ float: 'right', marginTop: 10 }}
                                            onClick={() => this.placeOrder()}>
                                            Place Order</button>
                                        :
                                        <button className="btn btn-primary" disabled style={{ float: 'right', marginTop: 10 }}
                                        >
                                            Login Required</button>
                                }
                                {/* </form> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default MenuList;
