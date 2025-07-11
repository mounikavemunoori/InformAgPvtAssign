import {test, expect} from '@playwright/test'

test.describe('Pump Master Demo - Various Test Cases ', async()=>{

    test.beforeEach('Login into pump master', async({page})=>{
        await page.goto("/")
    })
    test('Validate that Login with Invalid credentials shows error', async({page})=>{
        console.log("I am on Pump master Login")
        

    })

})