import {Page, expect} from "@playwright/test"
const {BrowserUtils} = require('../utils/browserUtils')

export class LoginPage extends BrowserUtils {
    constructor(page){
        super(page)
        this.page=page
        this.username='#username'
        this.password='#password'
        this.loginButton='#login-btn'
    }
    async enterUserName(username){
        await this.enterInputField(this.username, username)
    }

    async enterPassword(password){
        await this.enterInputField(this.password, password)
    }

    async clickOnLoginButton(){
        await this.clickOnELement(this.loginButton)
    }
}