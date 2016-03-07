# Tendency Weather Forecaster

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

This week's challage was to try to integrate the pixel reading from the sky
of a Cambridge webcam, but I coun't set up boilerplate code for accessing their
API. So eventually I loaded a progressive color palette that alters the background
according to the time of the day.
The second block was working on background animations. Last week's app was
perhaps too boring and I added a couple animations that augment the reflection
on your mobile device according to the weather conditions. There is currently one
for sunshine and another one for precipitation.