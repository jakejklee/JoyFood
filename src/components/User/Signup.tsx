import React, { Component } from 'react';
// import 'bootstrap/dist/css/bootstrap.css';

interface Props {
}
interface State {
}

class Signup extends Component<Props, State> {

    constructor(props: any) {
        super(props);
        this.state = {
            // data:'',
        }
        // this.handleChange = this.handleChange.bind(this);
    }


    //   componentDidUpdate(prevProps: Props) {
    //     if (this.footerRef) {
    //       this.footerRef.focus();
    //     }


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


    render() {
        return (


            <div className="modal-body">
                <p>Modal body text goes here.</p>
            </div>

        );
    }
}
export default Signup;
