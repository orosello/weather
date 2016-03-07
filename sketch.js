/*
Tendency Weather Forecaster

This app tries to blend a weather information app with a stock quote app.
The idea is that not only the values are graphed, but also the tendecies for 
each value. The triangles face upward, downward or display a circle depending
on the change. For temperature, a detailed graph is plotted and the maximum 
and minimum temperatures are displayed and their time. If temperature is 
consistently on the rise or on the fall, only that value will show.

Another idea I abandoned, because it required two server calls and I couldn't 
figure out how to do them, was to do an app that tells you today's weather
relative to yesterday's weather. Usually past information is never shown on 
weather apps, but it's useful information to have. Yesterday I remember how I
felt and I can judge how I will feel if the app tells me that the weather will
get colder or warmer.*/

///// UPDATE 2 /////

/* This week's challage was to try to integrate the pixel reading from the sky
of a Cambridge webcam, but I coun't set up boilerplate code for accessing their
API. So eventually I loaded a progressive color palette that alters the background
according to the time of the day.

The second block was working on background animations. Last week's app was
perhaps too boring and I added a couple animations that augment the reflection
on your mobile device according to the weather conditions. There is currently one
for sunshine and another one for precipitation.*/

var forecastData;
var apiKey = 'cfcba39ef69758a99713180bc49d74c0';
//do not make requests on the draw loop, otherwise it will run out of daily calls


//define a background color according to time of day. Ideally, I wanted 
//to extract info from a webcam sky, but didn't manage.

var colorChart = ["#060709","#0d1520","#12192c","#14243d","#1e3054","#2d518f",
                  "#446fb3","#679ed6","#91c9ec","#bde3f6","#add9f2","#9ac5e8",
                  "#95c1e6","#86add8","#7ca1cd","#7ca1cd","#7398c5","#7483be",
                  "#374493","#262f66","#14183b","#0f131f","#111018","#060709"];
var bgcolor = colorChart[currentHour()];

//text(hexToRgb(hex))

var cnt = 0;
function setup() {
  createCanvas(375, 667);
}



function draw() {    
  
  
  
  var temp = forecastData.currently.temperature;
  var time = forecastData.currently.time;
  
  
  //altered states according
  shine();
  //raining();
  //snowing();
  //background(bgcolor);
  
  //temperature text display
  push();
  textFont("Helvetica");
  fill(255);
  textAlign(CENTER,CENTER);
  noStroke();
  textSize(140);
  var timeString = formatTime(forecastData.currently.time);
  text(Math.round(forecastData.currently.temperature),width/2,height/3);
  var tempNow = Math.round(forecastData.currently.temperature);
  textSize(30);
  
  //location
  text("Cambridge",width/2,height/3-100);
  var summaryString = forecastData.currently.summary;
  textSize(20);
  text(summaryString,width/2,height/3+80);
  textSize(15);
  
  //humidity
  textSize(12);
  text("Humidity",width*0.2,height/3+140);
  var humidity = forecastData.currently.humidity;
  humidity = Math.round(humidity*100)+"%";
  text(humidity,width*0.2,height/3+155);
  
  //wind
  text("Wind",width*0.5,height/3+140);
  var windSpeed = Math.round(forecastData.currently.windSpeed);
  windSpeed = windSpeed+" MPH";
  text(windSpeed,width*0.5,height/3+155);
  //pressure
  text("Pressure",width*0.8,height/3+140);
  var pressure = Math.round(forecastData.currently.pressure);
  pressure = pressure + " mB";
  text(pressure,width*0.8,height/3+155);
  //time
  textSize(14);
  text(getTime(),width/2,40);
  pop();
  
  
  //temperature graph
  
  
  push();
  
  
 

  push();
  noFill();
  stroke(255);
  strokeWeight(2);
  beginShape();
  
  var tempMax = -50;
  var tempMin = 100;
  
  for(var i = 0; i < 24; i++){
    var x = map(i,0,24,0,width);
    var y = map(forecastData.hourly.data[i].temperature,-20,100,height-10,300);
    if (forecastData.hourly.data[i].temperature > tempMax){
      tempMax = forecastData.hourly.data[i].temperature;
      tempMaxX = x;
      tempMaxY = y;
      tempMaxTime = String(forecastData.hourly.data[i].time);
      var colonPos = tempMaxTime.indexOf(":");
      tempMaxTime = tempMaxTime.slice(colonPos-2,colonPos);
      if(tempMaxTime <= 12){
        tempMaxTime = tempMaxTime + "AM";
      }else{
        tempMaxTime = tempMaxTime % 12;
        tempMaxTime = tempMaxTime + "PM";
      }
    };
    if (forecastData.hourly.data[i].temperature<tempMin){
      tempMin = forecastData.hourly.data[i].temperature;
      tempMinX = x;
      tempMinY = y;
      tempMinTime = String(forecastData.hourly.data[i].time);
      var colonPos = tempMinTime.indexOf(":");
      tempMinTime = tempMinTime.slice(colonPos-2,colonPos);
      if(tempMinTime <= 12){
        tempMinTime = tempMinTime + "AM";
      }else{
        tempMinTime = tempMinTime % 12;
        tempMinTime = tempMinTime + "PM";
      }
    };
    curveVertex(x,y);
  };
  endShape();
  
  pop();
  
  
  
  push();
  noStroke();
  
  //labels in graph
  var displacement = Math.round(((tempMinY - tempMaxY) / 2) * (-1));

  
  
  //temperature now
  var a = map(1,0,24,0,width);
  var b = map(forecastData.hourly.data[1].temperature,-20,100,height-10,300);
  ellipse(a,b,10,10);
  text("Now",a-7,b-13);
  text(tempNow+"°",a-7,b+20);
  
  //temperature min
  
  if (dist(a,b,tempMinX,tempMinY)>80){
 ellipse(tempMinX,tempMinY,10,10);
 text(tempMinTime,tempMinX-14,tempMinY-13);
 text(Math.round(tempMin)+"°",tempMinX-7,tempMinY+20);
  };
  
  //temperature max
  if (dist(a,b,tempMaxX,tempMaxY)>80){
  ellipse(tempMaxX,tempMaxY,10,10);
  text(tempMaxTime,tempMaxX-14,tempMaxY-13);
  text(Math.round(tempMax)+"°",tempMaxX-7,tempMaxY+20);
  };
  pop();
  
  
  
  //sliding rectangle animation for graph
  push();
  noStroke();
  cnt += 30;
  translate(cnt,0);
  rectMode(CENTER);
  fill(bgcolor);
  rect(width/2,550,400,300);
  pop();

  

pop();
  
pop();

//helper gridlines
//stroke(100,100,100)
//rect(200,520,width,0);
//rect(200,420,width,0);
//rect(200,620,width,0);

  
  
  
//getEvaluatedShape takes in 2 values and a column number

//shape for humidity
getEvaluatedShape(forecastData.daily.data[0].humidity,
                  forecastData.daily.data[1].humidity,
                  0);

//shape for wind
getEvaluatedShape(forecastData.daily.data[0].windSpeed,
                  forecastData.daily.data[1].windSpeed,
                  1);

//shape for pressure
getEvaluatedShape(forecastData.daily.data[0].pressure,
                  forecastData.daily.data[1].pressure,
                  2);
 
 

  
}

 
function fahrenheitToCelsius(fahrenheit){
  return Math.round((fahrenheit - 32) * 5/9);
  
};

function formatTime(timeField) {
  var d = new Date();
  d.setTime(timeField);
  return d.getHours();
  };
  
function currentHour(){
  //returns currentHour from computer
  var unixTimestamp = Date.now();
  var today = new Date(unixTimestamp);
  var currentH = today.getHours();
  return currentH;
};

function getTime(){
  var formatMinute = 0;
  if (minute()<10){
    formatMinute = "0"+minute();
  }else{
    formatMinute = minute();
  }
  var miliTime = hour()+":"+formatMinute;
  return miliTime
  };

function getShape(code){
  if (code === 0) {
    //draw a circle
    push();
    noStroke();
    ellipse(5,7,10,10);
    pop();
    
  }else if (code === 1){
    //draw triangle pointing up
    push();
    noStroke();
    beginShape();
    vertex(0,10);
    vertex(5,0);
    vertex(10,10);
    endShape();
    pop();
    
  }else{
    //draw triangle pointing down
    push();
    noStroke();
    translate(10,13);
    rotate(PI);
    beginShape();
    vertex(0,10);
    vertex(5,0);
    vertex(10,10);
    endShape();
    pop();
  }
};

function columnTranslate(colNumber){
  if (colNumber === 0) {
    translate(70,335)
  }else if(colNumber === 1){
    translate(width/2-5,335)
  }else{
    translate(297,335)
  }
};

function getTranslatedShape(code,colNumber){
  //INPUTS code 0 == circle, code 1 == triangle up, code 2 == triangle down
  //colNumber is the column where the shape will be drawn
  //OUTPUTS translated geometry
  push();
  columnTranslate(colNumber);
  getShape(code);
  pop();
  
};

function evalParameters(varA,varB){
  if (varA === varB){
    return 0;
  }else if(varA > varB){
    return 1;
  }else{
    return 2;
  }
};

function getEvaluatedShape(varA,varB,column){
  //IN takes in 2 variables and a column number
  //OUT shape according to the size of the values
  getTranslatedShape(evalParameters(varA,varB),column);
}


////background animations

function snowing() {
  push();
  background(bgcolor);
  x = random(width)
  y = random(height)
  var v1 = createVector(x,y);
  noStroke();
  fill(255,255,255,15);
  ellipse(v1.x,v1.y,20,20);
  pop();
}

function raining() {
  push();
  background(bgcolor);
  x = random(width);
  y = random(height);
  var v1 = createVector(x,y);
  noStroke();
  fill(255,255,255,50);
  ellipse(v1.x,v1.y,20,20);
  pop();
}

var x0 = 200;
var y0 = 0;
var y0_speed=5;
function rain(){

  push();
  //Blank out the background
  //fill(255,10);
  fill(bgcolor);
  rect(0,0,width,height);
  noStroke();
   
  //Check if the ball is off the screen
  if(y0 > height+15)  //15 is the radius of the ball
  {
    y0 = -15; //Move it back to just above the screen
    x0 = random(width); //Pick a new random horizontal location on the canvas
    y0_speed = random(1,8); //Pick a new random speed between 3 and 7
  }
   
  //Move the ball
  y0 += this.y0_speed; //Increase the balls y value by the variable
                  //y0_speed each time through the loop
   
  //Draw the ball
  fill(0,0,255);
  ellipse(x0, y0, 30,30);
  pop();
  
}

var velocity = 0;
function shine() {
  push();
  background(bgcolor);
  //text(velocity,width/2,height/2);

  fill(255,255,255,10)
  noStroke();
  rect(velocity,0,150,height)

  if(velocity >= width){
    velocity *= -10;

  }else{
    velocity += random(20,50);
  }
  pop();
};





function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}


//-- You can ignore everything past this point if you'd like --//

function preload() {
  if (apiKey) {
    //MIT Coordinates
    var url = 'https://api.forecast.io/forecast/'
            + apiKey + '/42.359318,-71.092727';
    loadJSON(url, loadCallback, 'jsonp');
  }
  else {
    loadJSON('cachedForecastForBoston.json', loadCallback);
  }
}

function loadCallback(data) {
  forecastData = data;
  
  // Reformat current date
  if (forecastData.currently) {
    forecastData.currently.time =
      formatTime(forecastData.currently.time);
  }
  
  // Reformat minute date
  if (forecastData.minutely && forecastData.minutely.data) {
    for (minuteIdx = 0; minuteIdx < forecastData.minutely.data.length; minuteIdx++) {
      forecastData.minutely.data[minuteIdx].time = 
        formatTime(forecastData.minutely.data[minuteIdx].time);
    }
  }
  
  // Reformat hourly date
  if (forecastData.hourly && forecastData.hourly.data) {
    for (hourIdx = 0; hourIdx < forecastData.hourly.data.length; hourIdx++) {
      forecastData.hourly.data[hourIdx].time = 
        formatTime(forecastData.hourly.data[hourIdx].time);
    }
  }
  
  // Reformat daily date
  if (forecastData.daily && forecastData.daily.data) {
    var dailyData = forecastData.daily.data
    for (dayIdx = 0; dayIdx < dailyData.length; dayIdx++) {
      dailyData[dayIdx].time = 
        formatTime(dailyData[dayIdx].time);
      
      // sunrise
      if (dailyData[dayIdx].sunriseTime) {
        dailyData[dayIdx].sunriseTime =
          formatTime(dailyData[dayIdx].sunriseTime);
      }
      
      // sunset
      if (dailyData[dayIdx].sunsetTime) {
        dailyData[dayIdx].sunsetTime =
          formatTime(dailyData[dayIdx].sunsetTime);
      }
      
      // max precipitation time
      if (dailyData[dayIdx].precipIntensityMaxTime) {
        dailyData[dayIdx].precipIntensityMaxTime = 
        formatTime(dailyData[dayIdx].precipIntensityMaxTime);
      }
      
      // min temp time
      if (dailyData[dayIdx].temperatureMinTime) {
        dailyData[dayIdx].temperatureMinTime = 
        formatTime(dailyData[dayIdx].temperatureMinTime);
      }
      
      // max temp time
      if (dailyData[dayIdx].temperatureMaxTime) {
        dailyData[dayIdx].temperatureMaxTime = 
        formatTime(dailyData[dayIdx].temperatureMaxTime);
      }
      
      // apparent min temp time
      if (dailyData[dayIdx].apparentTemperatureMinTime) {
        dailyData[dayIdx].apparentTemperatureMinTime = 
        formatTime(dailyData[dayIdx].apparentTemperatureMinTime);
      }
      
      // apparent max temp time
      if (dailyData[dayIdx].apparentTemperatureMaxTime) {
        dailyData[dayIdx].apparentTemperatureMaxTime = 
        formatTime(dailyData[dayIdx].apparentTemperatureMaxTime);
      }
    }
  }
  
  // Reformat alerts date
  if (forecastData.alerts) {
    for (alertIdx = 0; alertIdx < forecastData.alerts.length; alertIdx++) {
      forecastData.alerts[alertIdx].time = 
        formatTime(forecastData.alerts[alertIdx].time);
    }
  }
  
  // Convenience method for formatting time
  function formatTime(timeField) {
      var d = new Date();
      d.setTime(timeField*1000);
      return d;
  }
}