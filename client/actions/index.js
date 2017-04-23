import axios from 'axios'

export function itemsHasErrored(bool) {
    return {
        type: 'ITEMS_HAS_ERRORED',
        hasErrored: bool
    };
}

export function itemsIsLoading(bool) {
    return {
        type: 'ITEMS_IS_LOADING',
        isLoading: bool
    };
}

export function itemsFetchDataSuccess(items) {
    return {
        type: 'ITEMS_FETCH_DATA_SUCCESS',
        items
    };
}

export function traderFetchDataSuccess(traders) {
    return {
        type: 'TRADERS_FETCH_DATA_SUCCESS',
        traders
    };
}

export function stockFetchDataSuccess(items) {
    return {
        type: 'STOCKS_FETCH_DATA_SUCCESS',
        
        items
    };
}

export function ordersFetchDataSuccess(orders) {
    return {
        type: 'ORDERS_FETCH_DATA_SUCCESS',
        orders
    };
}

export function setMap(type,items){
    console.log(items);
    return{
        type,
        items
    };
}

export function getStocks(url){
    return (dispatch) => {
             return axios({
			url: url,
			timeout: 20000,
			method: 'get',
			responseType: 'json'
		})
			.then(function(response) {
				dispatch(stockFetchDataSuccess(response.data));
			})
			.catch(function(response){
				dispatch(itemsHasErrored(response.data));
        })
      }
}
export function getStocks1(url){
   
             return axios({
			url: url,
			timeout: 20000,
			method: 'get',
			responseType: 'json'
		})
			.then(function(response) {
				dispatch(stockFetchDataSuccess(response.data));
			})
			.catch(function(response){
				dispatch(itemsHasErrored(response.data));
				// dispatch(pushState(null,'/error'));
        })
      }

export function deleteOrders(url){
    return (dispatch) => {
             return axios({
			url: url,
			timeout: 20000,
			method: 'delete',
			responseType: 'json'
		})
      }
}

export function getTraders(url,data=undefined) {
    return (dispatch) => {
        if(data){
      return axios({
			url: url,
			timeout: 0,
			method: 'post',
            data,
			responseType: 'json'
		})
			.then(function(response) {
				dispatch(itemsFetchDataSuccess(response.data));
			})
			.catch(function(response){
   
				dispatch(itemsHasErrored(false));
        })}
        else if(!data){
             return axios({
			url: url,
			timeout: 20000,
			method: 'get',
			responseType: 'json'
		})
			.then(function(response) {
                console.log(response.data);
				dispatch(traderFetchDataSuccess(response.data));
			})
			.catch(function(response){
				dispatch(itemsHasErrored(response.data));
        })
        }
	
    };
}

export function selectUser(user){
    return {
        type:'SELECT_USER_NAME',
        user
    }
}

export function getOrders(url) {
    return (dispatch) => {
      return axios({
			url: url,
			timeout: 20000,
			method: 'get',
			responseType: 'json'
		})
			.then(function(response) {
                console.log('inseide getorders')
               dispatch(setMap("SET_MAP",response.data));
                
				dispatch(ordersFetchDataSuccess(response.data));
			})
			.catch(function(response){
				dispatch(itemsHasErrored(false));
        })}
}
export function getOrders1(url) {
    
      return axios({
			url: url,
			timeout: 20000,
			method: 'get',
			responseType: 'json'
		})
			.then(function(response) {
                console.log('inseide getorders')
               dispatch(setMap("SET_MAP",response.data));
                
				dispatch(ordersFetchDataSuccess(response.data));
			})
            // .then(function(response){
            //     console.log("response",response.data);
                
            //         dispatch(setMap(response.data));
            // })
			.catch(function(response){
				dispatch(itemsHasErrored(false));
        })}

export function changeView(view){
    return {
        type:'VIEW_CHANGED',
        view
    }
}

export function updateOrderSocket(msg,data={}){
    return {
        type:msg,
        data
    }
}

export function notify(){
    return{
        type:'NOTIFICATION'
    }
}

export function notifyMessage(msgObj){
    return{
        type:'NOTIFICATION_MESSAGE',
        msgObj
    }
}

export function clearNotifications(){
    return{
        type:"CLEAR_NOTIFICATIONS"
    }
}

