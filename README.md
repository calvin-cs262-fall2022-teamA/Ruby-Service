# Ruby Service
Tables and queries with test data

Based on [CS262 monopoly-service](https://github.com/calvin-cs262-organization/monopoly-service) 

Service: https://be-a-ruby.herokuapp.com/

## GitHub Links
- [Team Organization](https://github.com/calvin-cs262-fall2022-teamA)
- [Project](https://github.com/calvin-cs262-fall2022-teamA/Ruby-Project)
- [Mobile Client](https://github.com/calvin-cs262-fall2022-teamA/Ruby-Client)

## Setting up Heroku
- [tutorial](https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up)

## Running Heroku Locally
```{bash}
heroku config:get DB_SERVER -s  >> .env
heroku config:get DB_PORT -s  >> .env
heroku config:get DB_USER -s  >> .env
heroku config:get DB_PASSWORD -s  >> .env
```
Confirm .env is in .gitignore
Change and save .env text encoding from UTF-16 to UTF-8 (VSCode bottom right blue bar)