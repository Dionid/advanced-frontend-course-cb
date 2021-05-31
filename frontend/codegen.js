const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    "schema": [
        {
            "https://advanced-course.herokuapp.com/v1/graphql": {
              "headers": {
                "Authorization": "Bearer " + process.env.AUTH_TOKEN
              }
            }
        }
    ],
    "overwrite": true,
    "documents": [
        "./src/**/*.tsx",
        "./src/**/*.ts"
    ],
    "generates": {
        "./src/libs/api/graphql.tsx": {
            "plugins": [
                "typescript",
                "typescript-operations",
                "typescript-react-apollo",
            ],
            "config": {
                "skipTypename": false,
                "withHooks": false,
                "withHOC": false,
                "withComponent": false
            }
        }
    }
};
