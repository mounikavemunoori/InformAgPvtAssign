
import { test, expect, request } from '@playwright/test';

const BASE_URL = 'http://pumpmaster:3000';
let api;

test.describe('Pump Master CRUD operations', ()=>{
    test.beforeAll(async () => {
    api = await request.newContext({
      baseURL: BASE_URL,
      extraHTTPHeaders: {
        'Content-Type': 'application/json'
      }
  });
});

   test('GET /pumps - should return pumps list', async()=>{
        const response = await api.get('/pumps')
        expect(response.status()).toEqual(200)
        expect(response.ok()).toBeTruthy()
        const pumps = await response.json()
        expect(Array.isArray(pumps)).toBeTruthy()
        console.log(pumps)
   })

   test('POST / pumps - should create a pump', async()=>{
        const newPump = {
        name: 'Pump New',
        type: 'Rotary',
        area: 'Block C'
        };
        const response = await api.post('/pumps', {data:newPump})
        expect(response.status()).toBe(201)
        expect(response.ok()).toBeTruthy()
        const created = await response.json()
        expect(created.name).toBe('Pump New')
   })

   test('PUT /pumps/:id - should update a pump', async () => {
        const updatedPump = {
        name: 'Updated Pump',
        type: 'Submersible',
        area: 'Block Z'
        };
        const response = await api.put('/pumps/1', { data: updatedPump });
        console.log("put response", response.status())
        expect(response.ok()).toBeTruthy();
        const updated = await response.json();
        expect(updated.name).toBe('Updated Pump');
  });

   test('DELETE /pumps/:id - should delete a pump', async () => {
        const response = await api.delete('/pumps/2');
        expect(response.ok()).toBeTruthy();
  });

    test.afterAll(async()=>{
        await api.dispose()
    })

})
