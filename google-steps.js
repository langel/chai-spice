var rtePage = require('../pages/google.js');
var marvin = require('marvin-js');
var keys = require('selenium-webdriver').Key;
var by = require('selenium-webdriver').By;
var driver = require('marvin-js').session.getDriver();

var chai = require('chai');
var expect = require('chai').expect;


exports.define = function(steps) {

  steps.given('I visit google', function() {
    rtePage.visit();
  });

  steps.when('I type ducks', function() {
    rtePage.input.sendKeys('ducks' + keys.ENTER);
  });

  steps.then('I should see results', function() {
    driver.findElements(by.css('h3 > a')).then((links) => {
      let result_array = links.map(x => x.getText())
      return Promise.all(result_array).then((texts) => {
        let results_count = links.length
        console.log(texts);
        texts.forEach((text) => {
          expect(text).to.exist;
        });
        expect(results_count).to.equal(9);
      })
    })
  })
/*
    co(function *(){
      let links = yield driver.findElements(by.css('h3 > a'));
      links.map(x => 
        co(function *(){
          let text = yield x.getText();
          console.log(text);
          expect(text).to.be.empty();
        })
      )
    })
    */
}
