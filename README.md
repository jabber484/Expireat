# Project2720

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


## About This Project

#### Workload Distribution
Johnson: Frontend
Xaviera: Backend

#### Basic How-To

##### Front-end
###### Structure
* Auth Service hold user info at background
* Page swictch according to auth status
* Each element is a separtate module

##### Back-end
###### Introduction
Nodejs together with Mongodb is chosen. Also, to cooporate with Angular, cors module is in used. Other used module include crypto (login), bodyParser (for request body) and express.

###### Config
Storing database URL.

###### Models
Defining Mongoose schemas and created models for convenience on export.

###### Routes
Defining receiving what kind of HTTP request on which URL should give out what actions on it.

###### Controllers
Collection of actions in database, such as CRUD. Response is handled by res.json to send back to Angular, such that they can be further edited in subscribe function.

#### Data Schema
Figures is included in asset/schema.png.

#### Frameworks and Libraries
* Express
* Nodejs
* Mongodb
* Mongoose
* Angular 7
* Bootstrap 4
* Angular Datatable
* Font Awesome
* Roboto(Font)

#### TO-DO
* Visible Response
* Data cache
* Admin Login


## Guide on using

#### User-mode
Sample credential: `test test`
* Can read 'About This Project' with Navigation.
* Event list view auto load the event list.
* Clicking the arrow of respecting field can trigger sorting in either direction.
* Typing words in Search input would auto update the event list with matched records.
* Clicking on events will show the detail and provided a textarea for input comments.
* Add to favourite can add event into favourite list and check in `show fav list` button.

#### Admin-mode
Admin mode is accessed through link `/admin`.
* Could perform the sorting and searching as normal users in event list.
* In admin features, clicking into record will show detail and allow to make changes(update), and delete.
* Add records in admin features show new input field for creating records.
* Flush data will flush new government data into database.
* Upload csv would upload new data of event and override current database data.
