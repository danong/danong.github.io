---
layout: post
title: Single Server Queue Tutorial
---

The single server queue is the most basic model in queueing theory. This tutorial teaches beginner computer scientists how to simulate a single server queue.

## Prerequisites
* Have Python 2.7 or greater installed
* A basic understanding of programming in Python
* Familiarity with statistics and [probability distributions](https://en.wikipedia.org/wiki/Probability_distribution).

## A Basic Queue
Imagine a grocery store with one checkout aisle. Customers randomly join the queue according to some probability distribution. The cashier, who can only serve a single person at a time, takes some randomly distributed amount of time to serve the first person in line. The store allows customers to join the line until some set closing time. After the closing time, nobody can join the queue but the cashier will continue to work until the queue is empty. In this tutorial, we will be using the exponential distribution for both arrival and departure times.

## Variables
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

## Initialization

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

## Case 1 - An arrival occurs before the next departure

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
## Case 2 - A departure occurs before the next arrival

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

## Case 3 - The next arrival or departure occurs after the closing time and there are the queue isn't empty

{% highlight python %}
t = td
n -= 1
nd += 1
if n > 0:
	Y = random.expovariate(lambd_out)
	td = t + Y
D.append(t){% endhighlight %}

## Case 4 - The next arrival or departure occurs after the closing time and there are the queue isn't empty

{% highlight python %}
Tp = max(t-T, 0)
break
{% endhighlight %}

## Analysis of queue lengths
Lorem ipsum

## Applications
Vivamus sagittis lacus vel augue rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.


