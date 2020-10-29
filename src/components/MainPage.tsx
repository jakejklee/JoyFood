import React, { Component } from 'react';
import UserPool from './User/UserPool'
import NavBar from './nav/NavBar';
import MainFoodImage from './images/MainFoodImage.jpg'
import RestaurantList from './Restaurant/RestaurantList'

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

    render() {
        return (
            <div className=''
                style={{
                    backgroundImage: `url(${MainFoodImage})`,
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    border: '1px solid black',
                    height: 1000,
                    paddingBottom: '10px'
                }}>
                <div>
                    <NavBar></NavBar>
                </div>
                <div className='row justify-content-end h-100'>
                    <div className='col'></div>
                    <div className='col'>
                        <RestaurantList
                            onOrder={false}
                            rID=''>
                        </RestaurantList>
                    </div>
                </div>


            </div>
        );
    }
}
export default MainPage;
