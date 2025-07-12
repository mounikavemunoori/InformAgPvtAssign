import {Page, expect} from "@playwright/test"
const {BrowserUtils}= require("../utils/browserUtils")

export class PumpViewPage extends BrowserUtils {
    constructor(page){
        super(page)
        this.page=page
        this.pumpsOverViewHeader="//h2[text()='Pumps']"
        this.searchField="input#search-input"
        this.tableList = "#pump-list"
        this.editButton= "//button[text()='Edit']",
        this.tableData="table tbody#pump-list tr"
        this.editPumpModal = "//h3[text()='Edit Pump']"
        this.popUpValues = function(value){
            return `(//label[text()="${value}"]//following-sibling::input)[1]`
        }
        this.tableRows = "table tbody tr"
        this.saveBtn = "#save-btn"
        this.deleteButton = "delete-btn"

    }
    async getPumpOverViewPageheader() {
        return await this.getElementTextContent(this.pumpsOverViewHeader)
    }

    async isPumpOverPageVisible(){
        return await this.isElementDisplayed(this.pumpsOverViewHeader)
    }

    async enterPumpNameinSearchField(pumpName){
        await this.enterInputField(this.searchField, pumpName,5000)
        await this.page.waitForTimeout(5000)
        await this.clickOnKey("Enter")
    }
    
    async getPumpNames(){
        return await this.getAllElementText(this.tableList, 3000)
    }

    async clickOnEdit(){
        await this.clickOnELement(this.editButton, 5000)
    }

    async getTableLength(){
        await this.page.locator('tr').first().waitFor();
        console.log(await this.page.locator('tr').count());
        return await this.page.locator('tr').count()
    }

    async getPumpData(pumpName){

        //Get header values
        const headerElements = await this.page.$$('table thead th')
        const headers=[]
        const  pumpDetails = {}
        let rowData ={}

        for(let i=0;i<headerElements.length;i++)
        {
            const text = await headerElements[i].textContent()
            headers.push(text.trim())
        }
        // get all rows in the table (excluding the header)
        const rows = await this.page.$$(this.tableData)
        
        for(const row of rows){
            const cells= await row.$$('td')
            let cellTexts =[]
            for(const cell of cells){
                const text = await cell.innerText()
                cellTexts.push(text.trim())
            }
            if(cellTexts[0].trim()===pumpName){
                
                for(let k=1;k<headers.length;k++)
                {
                    rowData[headers[k]]=cellTexts[k]
                }
                pumpDetails[cellTexts[0]]=rowData
                break
            }
        }
        console.log("pump details-->", pumpDetails)
        return pumpDetails
    }

    async clickOnEdit(){
        await this.clickOnELement(this.editButton)
    }

    async isEditPumpModalDisplayed(){
        return this.isElementDisplayed(this.editPumpModal)
    }

    async getEditPumpValue(value){
        return await this.getElementTextContent(await this.popUpValues(value), 5000)
    }

    async clickOnSaveButton(){
        await this.clickOnELement(this.saveBtn)
    }

    async clickOnDeleteButton() {
        await this.clickOnELement(this.deleteButton)
    }

    async enterNewPumpName(newPumpValue){
        await this.enterInputField(this.popUpValues(value), newPumpValue,5000)
    }

}