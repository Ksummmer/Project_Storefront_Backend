import { Order, OrderStore } from '../../models/order';

const store = new OrderStore();

describe("Orders Model", () => {

    it('should have index method', () => {
        expect(store.index).toBeDefined();
    });

    it('should have show method', () => {
        expect(store.show).toBeDefined();
      });
    
      it('should have create method', () => {
        expect(store.create).toBeDefined();
      });  

      it('should have showCurrentOrderbyUser method', () => {
        expect(store.showCurrentOrderbyUser).toBeDefined();
      });  

      it('should have addNewProduct method', () => {
        expect(store.addProduct).toBeDefined();
      });  
    
      it('create method should add an order', async () => {
        const result = await store.create({
          status: 'close',
          user_id: '2'
        });
        expect(result).toEqual({ 
          id: 2,
          status: 'close',
          user_id: '2'
        });
      });

      it('index method should return a list of orders', async () => {
        const result = await store.index();
        expect(result).toEqual([
          {
            id: 1,
            status: 'open',
            user_id: '3'
          },
          {
            id: 2,
            status: 'close',
            user_id: '2'
          }]);
      });
    
      it('show method should return the correct order', async () => {
        const result = await store.show(1);
        expect(result).toEqual({
          id: 1,
          status: 'open',
          user_id: '3'
        });
      });

      it('showCurrentOrderbyUser method should return the correct order', async () => {
        const result = await store.showCurrentOrderbyUser('2');
        expect(result).toEqual({
          id: 2,
          status: 'close',
          user_id: '2'
        });
      });

      it('addProduct method should add products to the correct order', async () => {
        const result = await store.addProduct({
          quantity: 1,
          order_id: '1',
          product_id: '2'
        });
        expect(result.id).toEqual(2);
      });
})