# Simple Angular 1.5 Seed with a new router

There are many AngularJS seeds, but they either brings too much complexity and have many features which one will never use or does not contain what you need.

And this is just another one which contains a skeleton for Angular 1.5 App along with new Router. It also contains sample hello world app
that can modify and extends into something more complex.

This seed does not contain any CSS framework as its more individual choice. If you want to use HTML5 bootstrap or even you want to bring over twitter bootstrap it’s all up to you.

They are great frameworks to make the deployment easier (webpack, browserify) but those I like to use e.g. for the TypeScript AngularJS project
where you have modules. Without having some module loader you will not be able to run them when you use import or require.
I just do not like putting require('xxx') into Angular 1.x code + at the time of putting together this project I could not find good alternatives to some of the gulp tasks,
like userref, templatecache, etc.



## Project structure

Project is structured to capture more practical side of the development, where they are parts which are changed really often and parts, which do not change much, and they do not need to be part of your sources where you do actual coding.

### Directory Layout




```
config/                    --> contains configuration for GULP build and KARMA test
dist/                    --> will be created once you run release task and final structure will be generated
src/                    --> Contains source that will be changed quite often JS | HTML |CSS
    app/                   --> Here is will be your app
      app.html                 --> Base template. Here you usually start your layout and initial app structure
      app.js               --> Base AngularJS App that will init everything and redirect to default page
      app.scss               --> styles for the base template

    common/                --> Contains common parts for your application that are not specific to specific page.
        components/        --> Component directories, the new angular router requires 1 component per dir.
        rest/             -->  place to store factories dealing with REST API, we need to have all on 1 place
                                Good name could be also resources. Since we are in HTTP world where all is resources
        security/        --> placeholder for any security related files
                                 - Interceptors modifying headers
                                 - login dialogs that pop -ups when server retrieves error code, etc.
                                 - etcs.
        services/        --> placeholder for services files.
                                - Services can be appSettings
                                - Storage
                                - Communicating with some 3 party provides (e.g. google services, map api, facebook)
                                - Some Utility services

                                Basically the main difference between REST (which will be also services/factories)
                                 is this will not deal with your domain model.


test/                    --> Contains test files
www/                    --> www contains more or less static files that does not change that often like src/ therefore
                            I am keeping them outside of sources.
    ccs/                  -->  will be created by build task form sass
    images/               --> static directory for images
    js/                  -->  will be created by build task form sass
    lib/                 --> Contains bower components

```

## Installation

Run following commands

```
npm install
bower install
```

## Run Application

```
    gulp serve
```


## Create release files

```
    gulp release
```


## Run Tests

```
    gulp test
```
