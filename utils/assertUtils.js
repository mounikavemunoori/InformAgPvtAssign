import {expect} from "@playwright/test"

export class AssertUtils{
    constructor(page){
        this.page=page
    }
    async assertEqual(actualValue, expectedValue){
        expect(actualValue).toEqual(expectedValue, `"${actualValue} is not matched with ${expectedValue}"`)
        console.log(`${actualValue} value is matched with ${expectedValue} value`)
    }
    async assertContain(actualValue, expectedValue){
        expect(actualValue).toContain(expectedValue,`"${actualValue} value doesnot contain the ${expectedValue}" value`);
        console.log(`${actualValue} value does contain the ${expectedValue} value`)
    }
    async assertHavingTitle(title){
        await expect(this.page).toHaveTitle(title, `Opened Chatbot application title is not matching with expected title as "${title}"`);
        console.log(`Opened Chatbot application title is matching with expected title "${title}"`)
    }

    async assertTrue(booleanValue) {
        expect(booleanValue).toBeTruthy()
        console.log("Boolean value is dispplayed as expected")
    }
}