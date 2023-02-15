# Scandiweb Junior Developer test redone!

React(Create React App) e-commerce web app. Entry React developer Test by Scandiweb.

## Description

This is an upgraded version of the [Entry react dev test](https://github.com/kalush89/albert-kombol-entry-react-dev-test). It still fetches data via Graphql with the aid of the Scandiweb made @tilework/opus graphql client, and now it makes use of Redux Toolkit for state management. Among several other features that the above mentioned tools bring to life are product listing, add/remove from cart, add and reduce quantity in cart, product description, etc.

## Getting Started

### Built with

- ReactJS(CRA)
- CSS Grid
- Flexbox
- GraphQL
- @tilework/opus
- Redux Toolkit
- React Router 6

### Learning points/ fixes

- [x] Not possible to distinguish white color attribute: Now able to distinguish the white color attribute.
- [x] Currency should also be opened on arrow click near currency icon: A click on the area on or around the currency symbol and chevron drops down the currency list.
- [x] Price should always have 2 digits after dot: Price always had two digits after the dot.
- [x] Minicart should close on clickoutside: Minicart closes on click outside dropdown area.
- [x] Too much duplicated requests and not needed requests, please check network tab: Irelevant requests cleared.
- [x] On category page should happen current category request and on product page current product request: Achieved.
- [x] Please dont use dangerouslySetInnerHtml or sanitize data, it have this name for a reason: dangerouslySetInnerHtml or sanitize data completely avoided.
- [x] Please remove all hardcoded data: Hardcoded data replaced with dynamic content.
- [x] Please fix code to not have different function for each category: Functions removed.
- [x] Please fix eslint errors: Fixed.
 

### Installing

* npm install

### Start Server

* npm start

### Build For Production

* npm run build

## Authors

Albert Kombol  
[@kombolofficial](https://twitter.com/kombolofficial)


## Acknowledgments

* [@tilework/opus](https://www.npmjs.com/package/@tilework/opus)
* [Sabe](https://sabe.io/tutorials/how-to-create-modal-popup-box)
* [dev.to](https://dev.to/code_mystery/image-slider-using-html-css-and-javascript-5dfn)
* [udemy](https://www.udemy.com/course/complete-react-developer-zero-to-mastery/learn/lecture/15189776#overview)
* [Flexbox cheat sheat](https://css-tricks.com/flexbox-cheat-sheet/)
