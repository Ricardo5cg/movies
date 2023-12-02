<h1 align="center">Welcome to Movies List 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.0.0-blue.svg?cacheSeconds=2592000" />
</p>

> This project consists of a list of 1000 movies. The user can see the full detail of each movie by opening a popup, can also filter the movies by the top 10 revenue and top 10 revenue by each year.

### ✨ [Demo](https://movies-rankings-app.netlify.app/)

## Install

```sh
npm install
```

## Usage

```sh
npm run dev
```

## Observations
> Initially, I began by implementing 'lazy loading' functionality by fetching 15 movies in each instance. However, I encountered a limitation with the API as it lacked a filter to retrieve the top 10 movies based on revenue. Consequently, I ended up fetching all the movies in one go and storing the data in a useState, which was somewhat counterintuitive. Nonetheless, this approach allowed me to demonstrate my ability to implement 'lazy loading' and utilize API parameters. Additionally, I made some minor adjustments to the filters style to ensure that the 'clear icon' remained visible and wasn't obscured by the dropdown.


## Author

👤 **Ricardo Gonçalves**

* Website: https://ricardocg.com/
* Github: [@Ricardo5cg](https://github.com/Ricardo5cg)