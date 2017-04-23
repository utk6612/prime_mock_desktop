import React from 'react';
import ReactDOM from 'react-dom';
import {BootstrapTable,TableHeaderColumn,BSTable} from 'react-bootstrap-table';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import * as links from '../commonComponents/app.config';

class TableComponent extends React.Component{
    constructor(props){
        super(props);
        this.state={
            search:''
        }
    }


    componentDidMount(){
        this.props.getOrders(links.orders);
    }
    priceFormatter(cell, row) {
        return `<i class='glyphicon glyphicon-usd'></i> ${cell}`;
    }

createCustomModalHeader(onClose, onSave) {
    const headerStyle = {
      fontWeight: 'bold',
      fontSize: 'large',
      textAlign: 'center',
      backgroundColor: '#eeeeee'
    };
    return (
      <div className='modal-header' style={ headerStyle }>
        <h3>That is my custom header</h3>
        <button className='btn btn-info' onClick={ onClose }>Close it!</button>
      </div>
    );
  
}
    search(event){
        this.setState({search:event.target.value});
    }

    notify(){
        this.props.notify();
    }
  isExpandableRow(row) {
    return true;
  }

  expandComponent(row) {
    return (
      <pre>
            <p>ID:{row.id}</p>
            <p>Placed:{row.quantityPlaced}</p>
            <p>Executed:{row.quantityExecuted}</p>
            <p>Status:{row.status}</p>
            <p>Trader:{row.traderId}</p>
      </pre>
    );
  }

  expandComponent2(row){
      return(
          <pre>
            <p>Trader:{row.traderId}</p>
            <p>Priority:{row.priority}</p>
        </pre>
      );
  }    

    render(){

                const options = {
            insertModalHeader: this.createCustomModalHeader,
                  expandRowBgColor: 'rgb(242, 255, 163)'                  
    };
    var orders=this.props.orders;
    if(this.state.search)
    {
        orders=[];
    this.props.orders.map((item)=>{
        if(item.status.slice(0,this.state.search.length).toUpperCase().search(this.state.search.toUpperCase()) >=0
            || item.side.slice(0,this.state.search.length).toUpperCase().search(this.state.search.toUpperCase()) >=0
            || item.symbol.slice(0,this.state.search.length).toUpperCase().search(this.state.search.toUpperCase()) >=0
            || item.quantity.toString().slice(0,this.state.search.length).toUpperCase().search(this.state.search.toUpperCase()) >=0
            || item.id.toString().slice(0,this.state.search.length).toUpperCase().search(this.state.search.toUpperCase()) >=0
            || item.traderId.slice(0,this.state.search.length).toUpperCase().search(this.state.search.toUpperCase()) >=0)
        orders.push(item);
    })
    }
    const style={
        width:'100%',
        fontcolor:'black',
        checkbox: {
    marginBottom: 16,
  }

  
    }

        return (
           <div className="table container">
               <div>
                   <TextField style={style}
                            hintText="Search"
                                onChange={this.search.bind(this)}
                                             />
               </div>                              
            <div className="col-xs-12 hidden-xs hidden-sm">
                    <Checkbox label="Notifications" style={style.checkbox} checked={this.props.notification} onClick={this.notify.bind(this)}/>
               <div className="tableInside">     
              <BootstrapTable data={orders} options={options} hover pagination>
                <TableHeaderColumn dataField='id' isKey dataAlign="center">ID</TableHeaderColumn>
                <TableHeaderColumn dataField='creationTime' dataAlign="center">Creation Time</TableHeaderColumn>
                <TableHeaderColumn dataField='side' dataAlign="center">Side</TableHeaderColumn>
                <TableHeaderColumn dataField='symbol' dataAlign="center">Symbol</TableHeaderColumn>
                <TableHeaderColumn dataField='quantity' dataAlign="center">Quantity</TableHeaderColumn>
                <TableHeaderColumn dataField='quantityPlaced' dataAlign="center">Placed</TableHeaderColumn>
                <TableHeaderColumn dataField='quantityExecuted' dataAlign="center">Executed</TableHeaderColumn>
                <TableHeaderColumn dataField='limitPrice' dataAlign="center" dataFormat={ this.priceFormatter }>Limit Price</TableHeaderColumn>
                <TableHeaderColumn dataField='priority' dataAlign="center">Priority</TableHeaderColumn>
                <TableHeaderColumn dataField='status' dataAlign="center">Status</TableHeaderColumn>
                <TableHeaderColumn  dataField='traderId' dataAlign="center">Trader</TableHeaderColumn>                                                
            </BootstrapTable>
            </div>
            </div>

               <div className="col-xs-12 visible-xs">
                    <Checkbox label="Notifications" style={style.checkbox} checked={this.props.notification} onClick={this.notify.bind(this)}/>
              <BootstrapTable data={orders} options={options}  striped hover pagination
        expandableRow={ this.isExpandableRow.bind(this) }
        expandComponent={ this.expandComponent.bind(this) }
              >
                <TableHeaderColumn width='50' dataField='id' isKey dataAlign="center">ID</TableHeaderColumn>
              
                <TableHeaderColumn width='60' dataField='side' dataAlign="center">Side</TableHeaderColumn>
                <TableHeaderColumn width='80' dataField='symbol' dataAlign="center">Symbol</TableHeaderColumn>
                <TableHeaderColumn width='90' dataField='quantity' dataAlign="center">Quantity</TableHeaderColumn>
            
                <TableHeaderColumn width='90' dataField='limitPrice' dataAlign="center" dataFormat={ this.priceFormatter }>Limit Price</TableHeaderColumn>
                                                            
            </BootstrapTable>
            </div>

                <div className="col-xs-12 visible-sm">
                     <Checkbox label="Notifications" style={style.checkbox} checked={this.props.notification} onClick={this.notify.bind(this)}/>
              <BootstrapTable data={orders} options={options}  striped hover pagination
        expandableRow={ this.isExpandableRow.bind(this) }
        expandComponent={ this.expandComponent2.bind(this) }              
              >
                <TableHeaderColumn dataField='id' isKey dataAlign="center">ID</TableHeaderColumn>
                <TableHeaderColumn dataField='creationTime' dataAlign="center">Creation Time</TableHeaderColumn>
                <TableHeaderColumn dataField='side' dataAlign="center">Side</TableHeaderColumn>
                <TableHeaderColumn dataField='symbol' dataAlign="center">Symbol</TableHeaderColumn>
                <TableHeaderColumn dataField='quantity' dataAlign="center">Quantity</TableHeaderColumn>
                <TableHeaderColumn dataField='quantityPlaced' dataAlign="center">Placed</TableHeaderColumn>
                <TableHeaderColumn dataField='quantityExecuted' dataAlign="center">Executed</TableHeaderColumn>
                <TableHeaderColumn dataField='limitPrice' dataAlign="center" dataFormat={ this.priceFormatter }>Limit Price</TableHeaderColumn>
        
                <TableHeaderColumn dataField='status' dataAlign="center">Status</TableHeaderColumn>
                                                   
            </BootstrapTable>
            </div>
            </div>
        )
    }
};


export default TableComponent;