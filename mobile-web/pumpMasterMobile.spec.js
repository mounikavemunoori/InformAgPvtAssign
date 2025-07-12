import {test, expect} from '@playwright/test'
const { LoginPage } = require("../pages/LoginPage");
const {BrowserUtils} = require("../utils/browserUtils")
const {PumpViewPage}=require("../pages/pumpViewPage")
const {AssertUtils} = require("../utils/assertUtils")

test.describe('Pump Master mobile - Valid Scenarios', ()=>{
    
  let browserUtils;
  let assertUtils;
  let pumpOverViewPage;
  let loginPage;

    test.beforeEach(async ({ page }) => {
        browserUtils = new BrowserUtils(page)
        pumpOverViewPage = new PumpViewPage(page)
        assertUtils = new AssertUtils(page)
        loginPage = new LoginPage(page)
        await browserUtils.navigateToBrowser()
        await loginPage.enterUserName('farmer')
        await loginPage.enterPassword("1234")
        await loginPage.clickOnLoginButton()
        const isPumpOverPageVisible = await pumpOverViewPage.isPumpOverPageVisible()
        assertUtils.assertTrue(isPumpOverPageVisible)
    })

    test('Validate that Secure Tenancy Login - success', async({page})=>{
        loginPage = new LoginPage(page)
        await browserUtils.navigateToBrowser()
        await loginPage.enterUserName('farmer')
        await loginPage.enterPassword("1234")
        await loginPage.clickOnLoginButton()
        const isPumpOverPageVisible = await pumpOverViewPage.isPumpOverPageVisible()
        assertUtils.assertTrue(isPumpOverPageVisible)
    })

    test('Pump Overview - shows pump table', async ({ page }) => {
        pumpOverViewPage = new PumpViewPage(page)
        const pumpTable = await pumpOverViewPage.getTableLength()
        expect(pumpTable).toBeGreaterThan(0)
  });
    
    test('Validate that Search pump functionality', async({page})=>{
        pumpOverViewPage = new PumpViewPage(page)
        await pumpOverViewPage.enterPumpNameinSearchField("Pump 1")
        const pumpDetails = await pumpOverViewPage.getPumpData("Pump 1")
        console.log("pump details", pumpDetails)
        assertUtils.assertTrue(pumpDetails.hasOwnProperty('Pump 1'))
    })

    test('Validate that Open Edit modal for a pump', async({page})=>{
        pumpOverViewPage = new PumpViewPage(page)
        await pumpOverViewPage.enterPumpNameinSearchField("Pump 1")
        const pumpDetails = await pumpOverViewPage.getPumpData("Pump 1")
        assertUtils.assertTrue(pumpDetails.hasOwnProperty('Pump 1'))
        // Click Edit for Pump 1
        await pumpOverViewPage.clickOnEdit()
        const isModalVisible = await pumpOverViewPage.isEditPumpModalDisplayed()
        assertUtils.assertTrue(isModalVisible)
        console.log("edit pump modal is displayed")

        // validating edit Pump modal values with table data
        console.log("pump details", pumpDetails)
        let popUpValue = await pumpOverViewPage.getEditPumpValue('Pump Name')
        assertUtils.assertContain(pumpDetails['Pump 1']['Pump Name'], popUpValue)

        popUpValue = await pumpOverViewPage.getEditPumpValue('Pump Type')
        console.log("popup value Pump Type-->", popUpValue)
        assertUtils.assertContain(pumpDetails['Pump 1']['Type'], popUpValue)

        popUpValue = await pumpOverViewPage.getEditPumpValue('Area')
        console.log("popup value Pump Type", popUpValue)
        assertUtils.assertContain(pumpDetails['Pump 1']['Area/Block'], popUpValue)

        popUpValue = await pumpOverViewPage.getEditPumpValue('Latitude / Longitude')
        assertUtils.assertContain(pumpDetails['Pump 1']['Latitude'], popUpValue)

        popUpValue = await pumpOverViewPage.getEditPumpValue('Offset (sec)')
        assertUtils.assertContain(pumpDetails['Pump 1']['Offset'], popUpValue)

        popUpValue = await pumpOverViewPage.getEditPumpValue('Offset (sec)')
        assertUtils.assertContain(pumpDetails['Pump 1']['Offset'], popUpValue)

        // updating the pump name
        await pumpOverViewPage.enterNewPumpName('Pump New Value')
        await pumpOverViewPage.clickOnSaveButton()

        // Validating the pump details after editing the pump value
        await pumpOverViewPage.enterPumpNameinSearchField("Pump New Value")
        pumpDetails = await pumpOverViewPage.getPumpData("Pump New Value")
        assertUtils.assertTrue(pumpDetails.hasOwnProperty('Pump New Value'))

    })

    test('Validate that Pump Page after edit the pump details', async({page})=>{
        // after saving all the edit details are appearing on over view page
        pumpOverViewPage = new PumpViewPage(page)
        await pumpOverViewPage.enterPumpNameinSearchField("Pump 2")
        const pumpDetails = await pumpOverViewPage.getPumpData("Pump 2")
        assertUtils.assertTrue(pumpDetails.hasOwnProperty('Pump 2'))
        const beforeDeletePumpTableCount = await pumpOverViewPage.getTableLength()
        // Clicking on Delete option
        await pumpOverViewPage.clickOnDeleteButton()
        const afterDeletePumpTableCount = await pumpOverViewPage.getTableLength()
        expect(beforeDeletePumpTableCount).not.toEqual(afterDeletePumpTableCount);
        //Validate that pump name was not present after deletion
        await pumpOverViewPage.enterPumpNameinSearchField("Pump 2")
        const tableCount = await pumpOverViewPage.getTableLength()
        // search results should be shown as zero 0
        assertUtils.assertEqual(tableCount, 0)
    })
})