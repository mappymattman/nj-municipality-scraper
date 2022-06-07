# nj-municipality-scraper
Web Scraper to pull Municipality &amp; County of a provided NJ street address.

Setup:
1. Clone repo
2. npm install
3. Create a .env with the following variable:
  1. PORT="8001" (Replace with your preferred port)
4. npm run start
5. POST to /nj with the following body:
  {
    "address": "219 Morris Blvd",
    "city": "MANAHAWKIN",
    "state": "NJ",
    "zip": "08050"
  }
  
## TODO:
1. Handle addresses that aren't found
2. Take in just a street address, return an array of found addresses (with city/state/zip)
