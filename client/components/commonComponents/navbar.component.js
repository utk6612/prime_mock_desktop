import React from 'react';
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';
import RaisedButton from 'material-ui/RaisedButton';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import DrawerComponent from './drawer.component';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import * as links from './app.config'
import { NotificationContainer, NotificationManager } from 'react-notifications';
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
  ModalFooter
} from 'react-modal-bootstrap';
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};
class NavigationComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      id: 0,
      open:false
    }

  }


    handleTouchTap(event){
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose(){
    this.setState({
      open: false
    });
  };
  componentDidMount() {
    console.log("inside did mount")
    this.props.getStocks(links.shares);

  }
  changeView(value) {
    this.props.changeView(!this.props.view);
  }
  openModal() {

    this.setState({
      isOpen: true,
      open:false
    });
  };

  hideModal() {
    this.setState({
      isOpen: false
    });
  };

  deleteOrder() {
    this.handleRequestClose();
    this.props.deleteOrders(links.orders)
    
  }


  refreshOrders() {
    this.handleRequestClose();
    this.props.getOrders(links.orders);
  }
  createOrder() {
    let orderSize = ReactDOM.findDOMNode(this.refs.orderNumber).value;
    if (this.props.notification) {
      if (orderSize > 1)
        NotificationManager.info(`${orderSize} orders created!`);
      else if (orderSize == 1)
        NotificationManager.info(`${orderSize} order created!`);
    }
    for (let i = 0; i < orderSize; i++) {
      let data = {
        side: "",
        symbol: "",
        quantity: 0,
        limitPrice: 0,
        traderId: this.props.params.id
      }
      let x = Math.ceil(Math.random() * 30);

      data.symbol = this.props.stocks[x - 1].symbol;
      if (Math.ceil(Math.random() * 2) === 1) {
        data.side = "buy"
      }
      else {
        data.side = "sell"
      }
      data.quantity = Math.ceil(Math.random() * 100);
      data.limitPrice = Math.ceil(Math.random() * 100);
      this.props.getTraders(links.orders, data)
    }
    this.setState({ isOpen: false });
  }

  render() {

    const style = {
      margin: 5,
      width: 90,
      height: 25,
      menu:{
        marginTop:15
      }
    };

    return (

      <div className="navDiv">
        <RaisedButton label="Trade" className="hidden-xs" primary={true} style={style} onClick={this.openModal.bind(this)} />
        <Modal isOpen={this.state.isOpen} onRequestHide={this.hideModal.bind(this)}>
          <ModalHeader>
            <ModalClose onClick={this.hideModal.bind(this)} />
            <ModalTitle>Create Multiple Trades</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <p>Enter number of trades</p>
            <input className='form-input form-control' type="text" ref="orderNumber" />
          </ModalBody>
          <ModalFooter>
            <button onClick={this.createOrder.bind(this)} className='btn btn-primary'>
              Create
    </button>
            <button className='btn btn-default' onClick={this.hideModal.bind(this)}>
              Cancel
    </button>
          </ModalFooter>
        </Modal>
        <RaisedButton label="Delete" className="hidden-xs " onClick={this.deleteOrder.bind(this)} secondary={true} style={style} />
        <RaisedButton label="Refresh" className="hidden-xs" style={style} onClick={this.refreshOrders.bind(this)} />
        <DrawerComponent {...this.props} />
        <span className="pull-right hello hidden-xs">
          <button className={(this.props.view) ? "iconsSelected" : "icons"} onClick={this.changeView.bind(this, 1)}><i className={(this.props.view) ? "fa fa-table imgSelectedColor" : "fa fa-table"}></i></button>
          <button className={(this.props.view) ? "icons" : "iconsSelected"} onClick={this.changeView.bind(this, 0)}><i className={(this.props.view) ? "fa fa-bar-chart" : "fa fa-bar-chart imgSelectedColor"}></i></button>
        </span>
        <span className="visible-xs col-xs-12 container-fluid">
          <div className="col-xs-5 pull-left">
<RaisedButton
          onClick={this.handleTouchTap.bind(this)}
          label="Menu"
          primary={true}
          style={style.menu}
        />
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleRequestClose.bind(this)}
        >
          <Menu>
            <MenuItem primaryText="Trade" onClick={this.openModal.bind(this)}/>
            <MenuItem primaryText="Delete All" onClick={this.deleteOrder.bind(this)}/>
            <MenuItem primaryText="Refresh" onClick={this.refreshOrders.bind(this)}/>
          </Menu>
        </Popover>
        </div>
        <div className="col-xs-5 pull-right">
        <RaisedButton
          onClick={this.changeView.bind(this)}
          label="View"
          style={style.menu}
          secondary={true}
        />
        </div>
        </span>
        <NotificationContainer />
      </div>

    )
  }
};


export default NavigationComponent;