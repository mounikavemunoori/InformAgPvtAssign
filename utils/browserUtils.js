


export class BrowserUtils{
    constructor(page){
        this.page=page

    }
    /**
     * @Desc Clicks on element
     * @param {*} element - String 
     * @param {*} timeout - Waits for some time to before do the browser action
     */
    async clickOnELement(element, timeout){
        timeout=timeout!=undefined?timeout:0
        await this.page.locator(element).waitFor({ state: 'visible', timeout: timeout });
        await this.page.locator(element).click()
    }

    /**
     * @Desc Inputs the value to the elements
     * @param {*} element element - String
     * @param {*} value 
     * @param timeout -- Waits for some time to before do the browser action
     */
    async enterInputField(element, value, timeout){
        timeout=timeout!=undefined?timeout:0
        await this.page.locator(element).waitFor({ state: 'visible', timeout: timeout });
        await this.page.fill(element, value)
    }

    /**
     * @Desc Gets the element inner text
     * @param element
     * @returns {string}
     */
    async getElementTextContent(element, timeout){
        console.log("timeeee-->",element)
        timeout=timeout!=undefined?timeout:0
        await this.page.locator(element).waitFor({ state: 'visible', timeout: timeout });
        return await this.page.locator(element).textContent()
    }
      /**
     * @Desc Navigato to the main application URL
     * @param None
     * @returns None
     */
    async navigateToBrowser() {
        await this.page.context().clearCookies()
        await this.page.goto('', { viewport: null });
        await this.waitUntilDOMLoaded()
    }

    /**
     * @Desc Wait until the page's DOM content is loaded
     * @returns None
     */
    async waitUntilDOMLoaded() {
        await this.page.waitForLoadState('domcontentloaded');
    }

    async isElementDisplayed(element){
        return await this.page.locator(element).isVisible()
    }

    /**
     * @Desc Gets the text of the elements
     * @param selector
     * @returns {*}
     */
    async getAllElementText(selector, timeOut) {
        timeOut = timeOut != undefined ? timeOut : 0
       await this.page.locator(element).waitFor({ state: 'visible', timeout: timeOut });
        const elementTexts = await this.page.$$eval(selector, (elements) => {
            return elements.map((element) => element.innerText);
        });
        return elementTexts;
    }

    async clickOnKey(key){
        switch(key){
            case 'Enter':
                await this.page.keyboard.press('Enter');
                break
            default:
                console.log("Please provide the valid key")
        }
    }
}