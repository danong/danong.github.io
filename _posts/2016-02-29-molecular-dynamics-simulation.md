---
layout: post
title: Molecular Dynamics Simulation
---

I recently wrote a molecular dynamics simulation as a project for my simulations course. The Lennad-Jones potential is commonly used to model the interaction of between molecules.

<iframe src="//giphy.com/embed/KJes8CXWKg2JO" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
<i> Example simulation </i>

## Prerequisites
* Have Python 2.7 or greater installed
* A basic understanding of programming in Python
* Have [Pygame](http://pygame.org/hifi.html) installed: I used this particular [package](http://anaconda.org/krisvanneste/pygame)

## Lennad-Jones Potential
The Lennad-Jones Potential is defined as:

$$V_{LJ} = 4 \epsilon \left[ \left( \frac{\sigma}{r} \right) ^{12} - \left( \frac{\sigma}{r} \right) ^{6} \right]  $$

where ε is the depth of the potential well, σ is the finite distance at which the inter-particle potential is zero, and r is the distance between the particles ([source](https://en.wikipedia.org/wiki/Lennard-Jones_potential)). 

<img src="https://upload.wikimedia.org/wikipedia/commons/5/51/12-6-Lennard-Jones-Potential.svg" alt="Lennad Jones Potential">
<center><i>By Olaf Lenz, Rainald62 [GFDL (http://www.gnu.org/copyleft/fdl.html), CC-BY-SA-3.0 (http://creativecommons.org/licenses/by-sa/3.0/) or CC BY-SA 2.5-2.0-1.0 (http://creativecommons.org/licenses/by-sa/2.5-2.0-1.0)], via Wikimedia Commons</i></center>

When we differentiate the potential energy with respect to r, we can find the Lennad-Jones Force:

$$F_{LJ} = - 24 \epsilon \left[ 2 \left( \frac{\sigma^{12}}{r^{13}} \right) - 6 \left( \frac{\sigma^{6}}{r^{7}}\right)\right]$$

This form will be more useful when calculating the inter-particle forces.

## An Introduction to Pygame
Pygame is a FOSS Python module for writing video games. While we aren't writing a game per say, Pygame is going to be really useful for rendering and visualizing our simulation. Peter Collingridge wrote an excellent tutorial on simulating the trajectory of a cannonball in Pygame which can be found [here](http://www.petercollingridge.co.uk/pygame-physics-simulation). Rather than repeating information, I recommend going through parts 1 through 5 in his tutorial to create a basic Pygame window and a Particle class. 
 

{% highlight python %}
overtime = max(t-closing_time, 0)
break
{% endhighlight %}