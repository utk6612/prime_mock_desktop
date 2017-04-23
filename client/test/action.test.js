import * as actions from '../actions/index'



describe('actions', () => {
  it('should create an action to check if item has errored', () => {
    const hasErrored = false;
    const expectedErrorAction = {
      type: 'ITEMS_HAS_ERRORED',
      hasErrored
    }
    expect(actions.itemsHasErrored(false)).toEqual(expectedErrorAction)
  })
  it('should create an action to check if item has loaded', () => {
    const isLoading = false;
    const expectedLoadingAction = {
      type: 'ITEMS_IS_LOADING',
      isLoading
    }
    expect(actions.itemsIsLoading(false)).toEqual(expectedLoadingAction)
  })
  it('should create an action to check if traders has been fetched', () => {
    const traders = {};
    const expectedTraderFetchingAction = {
      type: 'TRADERS_FETCH_DATA_SUCCESS',
      traders
    }
    expect(actions.traderFetchDataSuccess(traders)).toEqual(expectedTraderFetchingAction)
  })
  it('should create an action to check if stocks has been fetched', () => {
    const items = {};
    const expectedStockFetchingAction = {
      type: 'STOCKS_FETCH_DATA_SUCCESS',
      items
    }
    expect(actions.stockFetchDataSuccess(items)).toEqual(expectedStockFetchingAction)
  })
  it('should create an action to check if orders has been fetched', () => {
    const orders = {};
    const expectedOrdersFetchingAction = {
      type: 'ORDERS_FETCH_DATA_SUCCESS',
      orders
    }
    expect(actions.ordersFetchDataSuccess(orders)).toEqual(expectedOrdersFetchingAction)
  })
})