import * as reducers from '../reducers/items'

describe('traders reducer', () => {
  it('should return the traders state', () => {
    expect(
      reducers.traderItems([], {
        type: 'TRADERS_FETCH_DATA_SUCCESS',
        traders: {}
      })
    ).toEqual({})
  })

  it('should return the stocks state', () => {
    expect(
      reducers.stockItems([], {
        type: 'STOCKS_FETCH_DATA_SUCCESS',
        items: {}
      })
    ).toEqual({})
  })

  it('should return the new user state', () => {
    expect(
      reducers.newUser([], {
        type: 'SELECT_USER_NAME',
        user: {}
      })
    ).toEqual({})
  })

  it('should return the fetched orders state', () => {
    expect(
      reducers.orders([], {
        type: 'ORDERS_FETCH_DATA_SUCCESS',
        orders: {}
      })
    ).toEqual({})
  })

  it('should return the new orders state', () => {
    expect(
      reducers.orders([], {
        type: 'orderCreatedEvent',
        data: {}
      })
    ).toEqual([{}])
  })

})