# PlaywrightAutomation

### In this automation task , used the playwright with javascript
## Step1: Create a directory , use below command
 ```
 mkdir playwrightAutomation
 ```
 ## Step2 : Change to created directory, use below command

 ```
 cd playwrightAutomation
 ```
 ## Step3: Install the nodejs in system
 
 ## Step4: Install the playwright use below command
 ```
  npm init playwright
 ```
 ## Select "Javascript" for below option(Press "Enter" key after selecting the option)
  ```
    Do you want to use TypeScript or JavaScript? · JavaScript
  ```
 ## Type "tests" instead of e2e for below option(Press "Enter" key after selecting the option)
  I have created the test scripts under tests folder
```
  Where to put your end-to-end tests? · tests
```
## Select "false" for below option(Press "Enter" key after selecting the option)
```
Add a GitHub Actions workflow? (y/N) · false
```
## Select "Y" for below option(Press "Enter" key after selecting the option)
```
  Install Playwright browsers (can be done manually via 'npx playwright install')? (Y/n) · true
```
## Please update the below piece of code in playwright.config.js
Here Defining the BaseURL for accessing the gloabally in the framework
```
 use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',
    baseURL: 'https://pumpmaster.login/'
  },

```

## Increate the timeout in  playwright.config.js
If faces any timeout issues during test execution, increase global timeout in config file

Earlier it had "30000" changed to "300000"
```
// Global test timeout (in milliseconds)
timeout: 300000,
```
## Update the "tests" folder name in playwright.config.js to run test cases under tests folder
```
  testDir: './tests',
```
 ## Below commands will help to run different ways in playwright
 #  Runs the end-to-end tests. 
 ```
  npx playwright test
 ```
#  Starts the interactive UI mode.
```
  npx playwright test --ui
```
# Runs the tests only on Desktop Chrome. 
```
  npx playwright test --project=chromium
```   
# Runs the tests in debug mode.
```
  npx playwright test --debug
```
# Auto generate tests with Codegen.
  ```
    npx playwright codegen
  ```
# Run the tests with headed mode
```
  npx playwright  test --headed
```
# Run the tests with specific file and only on one particular platform use below command
Here Using "Chromium"
```
npx playwright  test --headed --project=chromium tests/spumpMaster.spec.js
```


Here created different configs for api and web
# Run API tests
npx playwright test --config=playwright.config.api.js

# Run Web tests
npx playwright test --config=playwright.config.web.js

# Run Mobile tests
npx playwright test --config=playwright.config.mobile.js