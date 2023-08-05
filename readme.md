# Quote Generator App

## Description
This is a simple quote generator app made using Node.js. It utilizes the API provided by [API Ninja](https://api-ninjas.com/api/quotes) to fetch quotes from a vast database. The app also includes a feature to send quotes directly to an email of your choice, implemented using Nodemailer. Additionally, there are plans to integrate a database to allow users to subscribe and receive daily quotes using node-cron.

## How to Use
To use the app, follow the steps below:

1. Sign up on [API Ninja](https://api-ninjas.com/register) to create your account.
2. After signing up, you will find your API key in your profile.
3. Open the `server.js` file and locate the variable named `apiKey`.
4. Replace the placeholder value for `apiKey` with your actual API key from API Ninja.
5. Save the `server.js` file.

>Alternatively, you can store the API key in an environment variable or a `.config` file to securely access it.

Please note that the app is currently in progress, and additional features like the integration with a database are being implemented.

## Acknowledgements
This app is powered by the API provided by [API Ninja](https://api-ninjas.com/api/quotes).

## License
This app is licensed under the [MIT License](https://opensource.org/licenses/MIT).
