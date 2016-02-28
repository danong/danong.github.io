---
layout: post
title: Single Server Queue Tutorial (Python)
---

The single server queue is the most basic model in queueing theory. This tutorial teaches beginner computer scientists how to simulate a single server queue.

## Prerequisites
* Have Python 2.7 or greater installed
* A basic understanding of programming in Python
* Familiarity with statistics and [probability distributions](https://en.wikipedia.org/wiki/Probability_distribution).

## A Basic Queue
Take a grocery store with one checkout aisle as an example of a single server queue. Customers randomly join the queue according to some probability distribution. The cashier, who can only serve a single person at a time, takes some randomly distributed amount of time to serve the first person in line. The store allows customers to join the line until some set closing time. After the closing time, nobody can join the queue but the cashier will continue to work until the queue is empty. In this tutorial, we will be using the exponential distribution for both arrival and departure times.

## Applications
Found at your local gas station, ATM, and more, single server queues are every around us. Single server queues aren't just applicable to retail situations. They can also be applied to industrial applications like factory production lines. Furthermore, by chaining multiple single server queues in parallel or series to create more sophisticated queueing systems, we model many more real world queueing systems such as traffic, server loads, etc. 

## Implementation
Our basic strategy is quite simple. Instead of incrementing through time, we will jump forward to the time of the next event (e.g. arrival or departure) and randomly generate the time of the next event as needed. This strategy works because nothing in our model between arrivals and departures. Unfortunately, there are multiple possible cases that can happen which we'll need consider one at a time. Still, this will be a relatively simple, short, and efficient simulation! 

### Variables
We're going to need to keep track of a few key variables throughout this simulation:

* `t`: Current time
* `closing_time`: Closing time
* `num_arrivals`: Number of arrivals
* `num_departures`: Number of departures
* `n`: Number of customers in the queue
* `time_depart`: Service completion time of the customer presently being served
* `time_arrive`: Time of the next arrival
* `departures`: List of customer arrival times
* `arrivals`: List of departure times
* `overtime`: Time past the closing time that the last customer departs

### Initialization

{% highlight python %}
t = 0             
closing_time = 1000
num_arrivals = 0
num_departures = 0
n = 0
time_depart = float('inf')
time_arrive = random.expovariate(lambd_in)
departures = []
arrivals = []
overtime = 0
{% endhighlight %}

### Case 1 - An arrival occurs before the next departure

{% highlight python %}
t = 0             
closing_time = 1000
num_arrivals = 0
num_departures = 0
n = 0
time_depart = float('inf')
time_arrive = random.expovariate(lambd_in)
departures = []
arrivals = []
overtime = 0
{% endhighlight %}
### Case 2 - A departure occurs before the next arrival

{% highlight python %}
# advance time to next departure
t = td
n -= 1
nd += 1
if n == 0:
	td = float('inf')
else:
	Y = random.expovariate(lambd_out)
	td = t + Y
D.append(t)
# print("Departure ", nd, "at time ", t)
{% endhighlight %}

### Case 3 - The next arrival or departure occurs after the closing time and there are the queue isn't empty

{% highlight python %}
t = td
n -= 1
nd += 1
if n > 0:
	Y = random.expovariate(lambd_out)
	td = t + Y
D.append(t){% endhighlight %}

### Case 4 - The next arrival or departure occurs after the closing time and there are the queue isn't empty

{% highlight python %}
Tp = max(t-T, 0)
break
{% endhighlight %}

## Analysis of queue lengths
Lorem ipsum

[![placeholder](/images/ssqueue_scatter.png "Scatter Plot")](/images/ssqueue_scatter.png)
