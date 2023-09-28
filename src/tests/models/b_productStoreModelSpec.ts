import { Product,ProductStore } from '../../models/product';

const store = new ProductStore();

describe("Products Store Model", () => {

    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });

    it('should have a show method', () => {
        expect(store.show).toBeDefined();
      });
    
      it('should have a create method', () => {
        expect(store.create).toBeDefined();
      });
    
      it('create method should add a product', async () => {
        const result = await store.create({
          name: 'Surfboard Manly',
          price: 360,
          category: 'shortboards'
        });
        expect(result).toEqual({ 
          id: 2,
          name: 'Surfboard Manly',
          price: 360,
          category: 'shortboards'
        });
      });

    it('index method should return a list of surfboards', async () => {
        const result = await store.index();
        expect(result).toEqual([
          {
          id: 1,
          name: 'Surfboard Hawaii',
          price: 350,
          category: 'longboards'
          }, 
          {
          id: 2,
          name: 'Surfboard Manly',
          price: 360,
          category: 'shortboards'
          },
    ]);
      });
    
      it('show method should return the correct surfboard', async () => {
        const result = await store.show(2);
        expect(result).toEqual({
          id: 2,
          name: 'Surfboard Manly',
          price: 360,
          category: 'shortboards'
        });
      });
})