/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var Vector2 = require('vector2');
var ajax = require('ajax');

// Show splash screen while waiting for data

var splashWindow = new UI.Window();
  // Text element to inform user
  var text = new UI.Text({
    position: new Vector2(0, 20),
    size: new Vector2(144, 168),
    text:'Downloading Exchange data...',
    font:'GOTHIC_28_BOLD',
    color:'white',
    textOverflow:'wrap',
    textAlign:'center',
    backgroundColor:'black'
  });

// Add to splashWindow and show
splashWindow.add(text);
splashWindow.show();
// Construct URL

var URL = 'https://blockchain.info/es/ticker?cors=true';

// Make the request
ajax(
  {
    url: URL,
    type: 'json'
  },
  function(data) {
    // Success!
    splashWindow.hide();

    // Extract data
    
    var count = 0;
    
    var buy = String(data.USD.buy);
    var sell = String(data.USD.sell);
    var last = String(data.USD.last);
    var min15 = String(data.USD['15m']);
    var symbol = String(data.USD.symbol);
    var btc = (1/data.USD.last).toFixed(5);
    var listcur = [];
    for (var k in data){
      if (data.hasOwnProperty(k)) {
        var row = {};
        row.cur = k;
        row.buy = data[k].buy;
        row.sell = data[k].sell;
        row.last = data[k].last;
        row.min15 = data[k]['15m'];
        row.symbol = data[k].symbol;
        row.btc   = (1/data[k].last).toFixed(5);
        listcur.push(row);
      }
    }
    // Always upper-case first letter of description

    // Show to user
    var main = new UI.Card({
      title: 'BTC / USD',
      subtitle: last+symbol,
      body: '15 min ago: '+min15
      //action: {
      //  up: 'images/action_icon_plus.png',
      //  down: 'images/action_icon_minus.png'
      //}        

    });
    
    main.show();   
    count = 0;

    main.on('click', 'up', function(e) {
      if (count > 0){
        count--;
      }else{
        count = 0;
      }
      var card = new UI.Card();
      card.title('BTC / '+ listcur[count].cur);
      card.subtitle(listcur[count].last+listcur[count].symbol);
      card.body('15 min ago: '+listcur[count].min15);
      card.show();
      
      card.on('click', 'down', function(e) {
        count++;
        var card = new UI.Card();
        card.title('BTC / '+ listcur[count].cur);
        card.subtitle(listcur[count].last+listcur[count].symbol);
        card.body('15 min ago: '+listcur[count].min15);
        card.show();
      });
      card.on('click', 'up', function(e) {
        if (count > 0){
          count--;
        }else{
          count = 0;
        }
        var card = new UI.Card();
        card.title('BTC / '+ listcur[count].cur);
        card.subtitle(listcur[count].last+listcur[count].symbol);
        card.body('15 min ago: '+listcur[count].min15);
        card.show();
      });
      
      card.on('click', 'select', function(e) {
        var wind = new UI.Window({
          fullscreen: true,
        });
        var title = new UI.Text({
          position: new Vector2(0,0),
          size: new Vector2(140,20),
          font: 'gothic-28-bold',
          text: '1 BTC',
          textAlign: 'center'
        });
        var textfield = new UI.Text({
          position: new Vector2(5,30),
          size: new Vector2(144, 100),
          font: 'gothic-18-bold',
          text: 'Buy:'+listcur[count].buy+' '+listcur[count].symbol+'\nSell:'+listcur[count].sell+' '+listcur[count].symbol+'\n1 '+listcur[count].cur+':'+listcur[count].btc+' BTC',
          textAlign: 'left'
        });
        wind.add(title);
        wind.add(textfield);
        wind.show();
      });
      
    });

    main.on('click', 'down', function(e) {
      count++;
      var card = new UI.Card();
      card.title('BTC / '+ listcur[count].cur);
      card.subtitle(listcur[count].last+listcur[count].symbol);
      card.body('15 min ago: '+listcur[count].min15);
      card.show();
      
      card.on('click', 'down', function(e) {
        count++;
        card.title('BTC / '+ listcur[count].cur);
        card.subtitle(listcur[count].last+listcur[count].symbol);
        card.body('15 min ago: '+listcur[count].min15);
        card.show();
      });
      card.on('click', 'up', function(e) {
        if (count > 0){
          count--;
        }else{
          count = 0;
        }
        card.title('BTC / '+ listcur[count].cur);
        card.subtitle(listcur[count].last+listcur[count].symbol);
        card.body('15 min ago: '+listcur[count].min15);
        card.show();
      });
      
      card.on('click', 'select', function(e) {
        var wind = new UI.Window({
          fullscreen: true,
        });
        var title = new UI.Text({
          position: new Vector2(0,0),
          size: new Vector2(140,20),
          font: 'gothic-28-bold',
          text: '1 BTC',
          textAlign: 'center'
        });
        var textfield = new UI.Text({
          position: new Vector2(5,30),
          size: new Vector2(144, 100),
          font: 'gothic-18-bold',
          text: 'Buy:'+listcur[count].buy+' '+listcur[count].symbol+'\nSell:'+listcur[count].sell+' '+listcur[count].symbol+'\n1 '+listcur[count].cur+':'+listcur[count].btc+' BTC',
          textAlign: 'left'
        });
        wind.add(title);
        wind.add(textfield);
        wind.show();
      });
      
      
      
    });
    
    main.on('click', 'select', function(e) {
      var wind = new UI.Window({
        fullscreen: true,
      });
      var title = new UI.Text({
        position: new Vector2(0,0),
        size: new Vector2(140,20),
        font: 'gothic-28-bold',
        text: '1 BTC',
        textAlign: 'center'
      });
      var textfield = new UI.Text({
        position: new Vector2(5,30),
        size: new Vector2(144, 100),
        font: 'gothic-18-bold',
        text: 'Buy:'+buy+' '+symbol+'\nSell:'+sell+' '+symbol+'\n1 '+symbol+':'+btc+' BTC',
        textAlign: 'left'
      });
      wind.add(title);
      wind.add(textfield);
      wind.show();
    });
    
  },
  function(error) {
    // Failure!
    console.log('Failed fetching weather data: ' + error);
  }
);




