import {expect} from 'chai';
import sinon from 'sinon';
import * as actions from '../actions/index';
describe('stock fetch suite', () => {
  let sandbox;
  let server;
  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    server = sandbox.useFakeServer();
  });
  afterEach(() => {
    server.restore();
    sandbox.restore();
  });
  it('should check for errors', (done) => {
      const hasErrored = false;
    const expectedStockFetchingAction = {
      type: 'ITEMS_HAS_ERRORED',
      hasErrored
    }
    actions.getStocks1().
      then(() => {
        expect(actions.itemsHasErrored(false))
          .to.equal(expectedStockFetchingAction) })
      .then(done, done);
    setTimeout(() => server.respond([200,
      { 'Content-Type': 'application/json' },
      '[]']), 0);
  });
  it('should check if stocks has been fetched', (done) => {
      const items = {};
    const expectedStockFetchingAction = {
      type: 'STOCKS_FETCH_DATA_SUCCESS',
      items
    }
    actions.getStocks1().
      then(() => {
        expect(actions.stockFetchDataSuccess(items))
          .to.equal(expectedStockFetchingAction) })
      .then(done, done);
    setTimeout(() => server.respond([200,
      { 'Content-Type': 'application/json' },
      '[]']), 0);
  });
});

describe('order fetch suite', () => {
  let sandbox;
  let server;
  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    server = sandbox.useFakeServer();
  });
  afterEach(() => {
    server.restore();
    sandbox.restore();
  });
  it('should check for errors', (done) => {
      const hasErrored = false;
    const expectedOrderFetchingAction = {
      type: 'ITEMS_HAS_ERRORED',
      hasErrored
    }
    actions.getOrders1().
      then(() => {
        expect(actions.itemsHasErrored(false))
          .to.equal(expectedOrderFetchingAction) })
      .then(done, done);
    setTimeout(() => server.respond([200,
      { 'Content-Type': 'application/json' },
      '[]']), 0);
  });
  it('should check if orders has been fetched', (done) => {
      const orders = {};
    const expectedOrderFetchingAction = {
      type: 'ORDERS_FETCH_DATA_SUCCESS',
      orders
    }
    actions.getOrders1().
      then(() => {
        expect(actions.ordersFetchDataSuccess(orders))
          .to.equal(expectedOrderFetchingAction) })
      .then(done, done);
    setTimeout(() => server.respond([200,
      { 'Content-Type': 'application/json' },
      '[]']), 0);
  });
});