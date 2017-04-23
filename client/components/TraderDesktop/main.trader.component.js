import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import HeaderComponent from '../commonComponents/headerComponent';
import TableComponent from './table.component';
import ChartComponent from './chartComponent';
import Websocket from 'react-websocket';
import cookie from 'react-cookie';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import * as firebase from 'firebase';
class TraderMainComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            id: 'AM',
            expired: "yes"
        }
    }
    componentWillMount() {
        this.getUser();
    }
    getUser() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var username = user.email.toUpperCase().slice(0, 2);
                console.log("users", username);

                if (this.props.params.id === username) {
                    this.setState({
                        loggedIn: true,
                        id: username,
                        expired: "no"
                    });
                }
                else {
                    this.setState({
                        loggedIn: true,
                        id: username,
                        expired: "yes"
                    });
                }
            } else {
                this.setState({
                    loggedIn: false,
                    expired: "yes"
                });
            }
        });
    };




    handleData(data) {
        var date = new Date();
        data = data.substring(2, data.length);
        data = JSON.parse(data);
        this.props.updateOrderSocket(data[0], data[1]);


        if (data[0] === 'orderCreatedEvent' || data[0] === 'allOrdersDeletedEvent') {
            if (data[0] === 'allOrdersDeletedEvent') {
                if (this.props.notification)
                    NotificationManager.error('All trades Deleted!', 'Deleted', 3000);
                this.props.notifyMessage({ mess: 'All trades Deleted', date: date.toLocaleString(), color: "bg-danger" });
            }
            this.props.setMap(data[0] + "_map", data[1]);
        }

        else if (this.props.notification && data[1].status === 'Executed') {
            var mess1 = `ID: ${data[1].orderId},
                Trader:${this.props.getMap.get(data[1].orderId).traderId},
                Stock: ${this.props.getMap.get(data[1].orderId).symbol}`;


            NotificationManager.success(mess1, 'Executed!', 3000);
        }


        else if (data[1].quantityExecuted > 8 || data[1].quantityPlaced > 8) {
            if (data[0] === 'executionCreatedEvent') {
                var mess1, mess2;
                mess2 = `${data[1].quantityExecuted} stocks of ${this.props.getMap.get(data[1].orderId).symbol} 
                    (ID:${data[1].orderId}) by ${this.props.getMap.get(data[1].orderId).traderId}
                    are Executed!`
                this.props.notifyMessage({ mess: mess2, date: date.toLocaleString(), color: "bg-success" });
            }
            else if (data[1].status === 'Placed' || data[0] === 'placementCreatedEvent') {
                var mess1, mess2;
                mess1 = `ID: ${data[1].orderId},
                Trader:${this.props.getMap.get(data[1].orderId).traderId},
                Stock: ${this.props.getMap.get(data[1].orderId).symbol}`;
                mess2 = `${data[1].quantityPlaced} stocks of ${this.props.getMap.get(data[1].orderId).symbol} 
                    (ID:${data[1].orderId}) by ${this.props.getMap.get(data[1].orderId).traderId}
                    are Placed!`
                this.props.notifyMessage({ mess: mess2, date: date.toLocaleString(), color: "bg-info" });
            }
        }
    }



    render() {
        var view;
        if (this.props.view == 1) {
            view = <TableComponent {...this.props} />
        }
        else if (this.props.view == 0) {
            view = <ChartComponent {...this.props} />;
        }
        if (this.state.loggedIn && this.props.params.id === this.state.id)
            return (
                <div className="Trader">
                    <HeaderComponent {...this.props} />
                    {view}
                    <Websocket url='ws://localhost:8080/socket.io/?transport=websocket'
                        onMessage={this.handleData.bind(this)} />
                    <NotificationContainer />
                </div>

            )
        else if (this.state.expired === "yes" && this.state.loggedIn) {
            return (<div>
                <h1 className="fontColor">Session Expired!</h1>
            </div>)
        }
        else {

            return (
                <h1 className="fontColor">Loading...</h1>
            )

        }
    }
};


export default TraderMainComponent;