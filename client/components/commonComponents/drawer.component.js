import React from 'react';
import ReactDOM from 'react-dom';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
export default class DrawerComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      open: false,
      searchInput: ''
     };
  }

  handleToggle() { this.setState({ open: !this.state.open }) };

  handleClose() { this.setState({ open: false }) };

  handleClear() {
    this.props.clearNotifications();
  }

      search(event) {
        this.setState({ searchInput: event.target.value })
    }
  render() {
    const style = {
      fontsize: 10,
      width: 20,
      height: 20,
      padding: 0,
      margin: 5,
      left: -28,

    };
 var cleft = -650;
    var ctop = 0;
    if(this.state.open)
    {
      cleft=0;
    }
    var ctrans = 'translate('+cleft+'px, '+ctop+'px)';
    
    const drawerStyle = {
      width: "40%",
      transform: ctrans 
    }
    const buttonStyle = {
      marginTop: 23,
      padding: 0,
      height: 25
    }

    const clearButton = {
      backgroundColor: "#EF5350"
    }
    const closeButton = {
      backgroundColor: "#9E9E9E"
    }
    const drawerItem={
      backgroundColor:"black",
      color:"white"
    }

    var messages = this.props.nMessage.map((item, index) => {
      if(this.state.searchInput && item.mess.toUpperCase().search(this.state.searchInput.toUpperCase())>=0)
        return (<div ><MenuItem className="bg-info" onClick={this.handleClose.bind(this)} > <b>{item.mess}</b><p className="text-right menuItem">{item.date}</p>
        </MenuItem><Divider /></div>)
        else if(this.state.searchInput.length === 0)
      return (<div ><MenuItem className="bg-info" onClick={this.handleClose.bind(this)} ><b> {item.mess}</b><p className="text-right menuItem">{item.date}</p>
        </MenuItem><Divider /></div>)
    })
    return (
      <span className="hidden-xs">
        <IconButton tooltip="Notifications" style={buttonStyle} onClick={this.handleToggle.bind(this)}>
          <NotificationsIcon />
        </IconButton>
        <Badge
          badgeContent={this.props.nMessage.length}
          secondary={true}
          badgeStyle={style}
        ></Badge>

        <Drawer open={this.state.open} disableSwipeToOpen={false} containerStyle={drawerStyle} width={500} docked={false}
          onRequestChange={(open) => this.setState({ open })}>
          <FlatButton label="Close" style={closeButton} fullWidth={true} onClick={this.handleClose.bind(this)} />
          <FlatButton label="Clear" style={clearButton} fullWidth={true} onClick={this.handleClear.bind(this)} />
          <TextField
            hintText="Search" onChange={this.search.bind(this)} fullWidth={true}
          />
          {messages}
        </Drawer>
      </span>
    );
  }
}