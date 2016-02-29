---
layout: post
title: Tutorial: Single Server Queue Simulation (Python)
---

The single server queue is the most basic model in queueing theory. This tutorial teaches beginner computer scientists how to simulate a single server queue. Learning to simulate a single server queue is a great introduction to both queueing theory and discrete event simulation!

## Prerequisites
* Have Python 2.7 or greater installed
* A basic understanding of programming in Python
* Familiarity with statistics and [probability distributions](https://en.wikipedia.org/wiki/Probability_distribution).

## A Basic Queue
Take a grocery store with one checkout aisle as an example of a single server queue. Customers randomly join the queue according to some probability distribution. The cashier, who can only serve a single person at a time, takes some randomly distributed amount of time to serve the first person in line. The store allows customers to join the line until some set closing time. After the closing time, nobody can join the queue but the cashier will continue to work until the queue is empty. In this tutorial, we will be using the exponential distribution for both arrival and departure times.


<center><a href="/images/2016-02-18-single-server-queue/queue.jpg">
  <img src="/images/2016-02-18-single-server-queue/queue.jpg" alt="Queueing for the bus">
</a></center>
<center><i>Queueing for the bus. Tokyo, 2015</i></center>

## Applications
Found at your local gas station, ATM, and more, single server queues are every around us. Single server queues aren't just applicable to retail situations. They can also be applied to industrial applications like factory production lines. Furthermore, by chaining multiple single server queues in parallel or series to create more sophisticated queueing systems, we model many more real world queueing systems such as traffic, server loads, etc. 

## Implementation
Our basic strategy is quite simple. Instead of incrementing through time, we will jump forward to the time of the next event (e.g. arrival or departure) and randomly generate the time of the next event as needed. This strategy works because nothing in our model between arrivals and departures. Unfortunately, there are multiple possible cases that can happen which we'll need consider one at a time. Still, this will be a relatively simple, short, and efficient simulation! 

Recall, the exponential distribution describes the inter-arrival times of a homogenous Poisson process. For simplicity's sake, we'll be using the exponential distribution to generate both arrival and departure times. The probability density function is:

$$f(x;\lambda) = \lambda e^{-\lambda x}, x >= 0$$

We could use inverse transform sampling to generate random numbers from an exponential distribution but we'll just be using the `expovariate(lambda)` function found in Python's inbuilt `random` module.
 
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
* `lambd_in`: Lambda for arrivals
* `lambda_out`: Lambda for departures

### Initialization
At the start of our simulation (`t = 0`), there is nobody in line and we have yet to serve anybody. We generate the time of our next arrival with `time_arrive = random.expovariate(lambd_in)` and set the time of our next departure to infinity. This makes sense because there is currently nobody in line. We will be waiting forever for the next person to depart when there is nobody in line! We can arbitrarily choose values for our closing time and lambdas. 
{% highlight python %}
lambd_in = 0.5
lambd_out = 0.4
closing_time = 100

t = 0             
num_arrivals = 0
num_departures = 0
n = 0
time_depart = float('inf')
time_arrive = random.expovariate(lambd_in)
departures = []
arrivals = []
overtime = 0
{% endhighlight %}

Now we enter a loop which repeats as long as either the current time is below the closing time or the queue isn't empty.

`while t < closing_time or n >= 0`

There are four possible ways things could happen that we have to look at and program individually.

### Case 1 - An arrival occurs before the next departure and closing time
If the next event to occur is an arrival, we move time along to the time of that arrival, `time_arrive`. We also increment our counter variables for the number of arrivals and the number of people in line. Finally, we generate a new arrival time for the subsequent arrival.

{% highlight python %}
t = time_arrive
num_arrivals += 1 
n += 1 
time_arrive = random.expovariate(lambd_in) + t
{% endhighlight %}

If the queue was previously empty, we have to generate a new departure time since the person that just arrived is in the front of the queue and will be the next departure.
{% highlight python %}
if n == 1:
	Y = random.expovariate(lambd_out)
	time_depart = t + Y
arrivals.append(t)
{% endhighlight %}

### Case 2 - A departure occurs before the next arrival and closing time
Again, we move time along to the time of the next event, which is a departure in this case. Since someone has been served and has left the line, we decrement `n` and increment num_departures. 

{% highlight python %}
# advance time to next departure
t = time_depart
n -= 1
num_departures += 1
{% endhighlight %}

If the queue is now empty, we have to set the time of the next departure to infinity. This is just like what we did during initialization. If the queue isn't empty, we generate the time of the next departure.
{% highlight python %}
if n == 0:
	time_depart = float('inf')
else:
	Y = random.expovariate(lambd_out)
	time_depart = t + Y
departures.append(t)
{% endhighlight %}

### Case 3 - The next arrival or departure occurs after the closing time and the queue *isn't* empty
Since the next event occurs after the closing time, we can now ignore when the next arrival. Remember, we aren't admitting anybody to our queue after the closing time but we will continue to serve the people already in the queue. This case is very similar to case 2 since we only look departures.

{% highlight python %}
t = time_depart
n -= 1
num_departures += 1
if n > 0:
	Y = random.expovariate(lambd_out)
	td = t + Y
departures.append(t)
{% endhighlight %}

Note that we only generate a new departure time if there are still people left in the queue.

### Case 4 - The next arrival or departure occurs after the closing time and the queue *is* empty
Our simulation is over! All we need to do is calculate the amount of time after closing that our store stayed opened and break out of the while loop.

{% highlight python %}
overtime = max(t-closing_time, 0)
break
{% endhighlight %}

And we're done! You can find the full code [here](https://gist.github.com/danong/32d162d3b9aec5739a62). 

## Analysis of queue lengths
It might be interesting to see how the maximum queue length is affected by `lambd_in` and `lambda_out` so I modified our simulation to try values of lambda from 0 to 2 and graph the results. 

<center><a href="/images/2016-02-18-single-server-queue/ssqueue_scatter.png">
  <img src="/images/2016-02-18-single-server-queue/ssqueue_scatter.png" alt="Scatter Plot">
</a></center>
<center><p><i>Results of simulation</i></p></center>

As we can see the maximum queue length stays low until the arrival $$\lambda$$ exceeds the departure $$\lambda$$. Then, the maximum queue length begins to increase linearly with the arrival $$\lambda$$. This makes sense since the expected value of an exponential distribution is given by $$E(X) = \lambda^{-1}$$!  

Here is the [full code](https://gist.github.com/danong/08c9efffeeec30ad429e) for this mini-experiment. I hope you find this tutorial helpful and interesting. Thanks for reading!