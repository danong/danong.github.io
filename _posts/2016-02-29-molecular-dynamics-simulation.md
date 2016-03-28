---
layout: post
title: Molecular Dynamics Simulation
---

I recently wrote a discrete molecular dynamics simulation as a project for my simulations course. The Lennard-Jones potential is commonly used to model the interaction of between molecules.

<center><iframe src="//giphy.com/embed/KJes8CXWKg2JO" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></center>
<center><i> Example simulation </i></center>

## Prerequisites
* Have Python 2.7 or greater installed
* A basic understanding of programming in Python
* Have [Pygame](http://pygame.org/hifi.html) installed: I used this particular [package](http://anaconda.org/krisvanneste/pygame)

## Lennard-Jones Potential
The Lennard-Jones Potential is defined as:

$$V_{LJ} = 4 \epsilon \left[ \left( \frac{\sigma}{r} \right) ^{12} - \left( \frac{\sigma}{r} \right) ^{6} \right]  $$

where ε is the depth of the potential well, σ is the finite distance at which the inter-particle potential is zero, and r is the distance between the particles ([source](https://en.wikipedia.org/wiki/Lennard-Jones_potential)). 

<center><img src="https://upload.wikimedia.org/wikipedia/commons/5/51/12-6-Lennard-Jones-Potential.svg" width="50%" height="50%" alt="Lennard Jones Potential"></center>
<center><i>By Olaf Lenz, Rainald62 [GFDL (http://www.gnu.org/copyleft/fdl.html), CC-BY-SA-3.0 (http://creativecommons.org/licenses/by-sa/3.0/) or CC BY-SA 2.5-2.0-1.0 (http://creativecommons.org/licenses/by-sa/2.5-2.0-1.0)], via Wikimedia Commons</i></center>

When we differentiate the potential energy with respect to r, we can find the Lennard-Jones Force:

$$F_{LJ} = - 24 \epsilon \left[ 2 \left( \frac{\sigma^{12}}{r^{13}} \right) - 6 \left( \frac{\sigma^{6}}{r^{7}}\right)\right]$$

This form will be more useful when calculating the inter-particle forces.

## Basic Strategy
I simulate n particles by storing the position, speed, and angle of direction for each particle. For every particle, I calculate the LJ force it experiences from every other particle. I sum all a particle's force vectors to determine the overall force and use that overall force vector calculate the new position, angle, and speed of each particle. Once that calculation is complete for all particles, the program renders the screen with the updated position of the particles. Since I jump forward in discrete steps, this is a discrete event simulation. Since I render each step, the simulation looks smooth and continuous as long as there aren't too many particles on screen for my laptop to handle. The upper limit on my laptop seems to be around 200 particles.

Each particle should have n force vectors. n-1 Lennard-Jones force vectors from the n-1 other particles and a vector representing its current speed and direction.

## An Introduction to Pygame
Pygame is a FOSS Python module for writing video games. While I'm not exactly writing a game, Pygame is going to be really useful for rendering and visualizing our simulation. Peter Collingridge wrote an excellent tutorial on simulating the trajectory of a cannonball in Pygame which can be found [here](http://www.petercollingridge.co.uk/pygame-physics-simulation). Rather than repeating information, I recommend going through parts 1 through 5 in his tutorial to create a basic Pygame window and a Particle class. 
 
## Helper functions
I'm going to need a couple of helper functions. First, I define a function to add two vectors (code from the beginning of part 6 of Peter Collingridge's tutorial). Next, I define a function which returns the angle between two particles. This is essential for figuring out which direction Lennard-Jones force points in. Of course, I'm also going to need a function which calculates the LJ force. A function which returns the scalar distance between two particles will be helpful too.

{% highlight python %}
def add_vector((angle1, length1), (angle2, length2)):
    """Return the resultant sum of two vectors
    Parameters:
        (angle1, length1): Angle and length of first vector
        (angle2, length2): Angle and length of second vector
    """
    x_component = math.sin(angle1) * length1 + math.sin(angle2) * length2
    y_component = math.cos(angle1) * length1 + math.cos(angle2) * length2
    length = math.hypot(x_component, y_component)
    angle = 0.5 * math.pi - math.atan2(y_component, x_component)
    return angle, length

def find_angle(a, b):
    """Find angle between two particles
    Parameters:
        a (Particle): first particle
        b (Particle): second particle
    """
    return math.atan2((b.y-a.y), (b.x-a.x)) + math.pi/2

def lj_force(epsilon, sigma, r):
    """Return the lj force of two particles. This is the derivative of the LJ Potential with respect to r

    Parameters:
        epsilon: depth of the potential well
        sigma: finite distance at which the inter-particle potential is zero
        r: distance between the particles
    """
    return (-24 * epsilon) * (2 *(sigma**12 / r**13) -(sigma**6 / r**7))


def particle_distance(a, b):
    """Return the distance of two particles

    Parameters:
        a (Particle): first particle
        b (Particle): second particle
    """
    return math.sqrt((a.x-b.x)**2 + (a.y-b.y)**2)
{% endhighlight %}

## Putting it all together
I iterate through all the combinations of 2 particles to calculate and add the Lennard Jones forces between each particle. Then, all I have to do is calculate each particle's new position, check if the particle bounced off the side of the boundary, and render the frame.

{% highlight python %}
# calculate inter-particle forces
for a, b in itertools.combinations(my_particles, 2):
	temp_lj_force = lj_force(epsilon, sigma, particle_distance(a, b))
	temp_angle = find_angle(a, b)
	(a.angle, a.speed) = add_vector((a.angle, a.speed), (temp_angle, temp_lj_force))
	(b.angle, b.speed) = add_vector((b.angle, b.speed), (temp_angle+math.pi, temp_lj_force))

# fill screen with updated particles
for particle in my_particles:
	particle.move()
	particle.bounce()
	particle.display()
{% endhighlight %}

## A discrete problem
If you run the code as is right now, you'll occasionally see particles whizzing around at ridiculous speeds before the program crashes. What's going wrong? How do we fix this? Unfortunately, this bug is an inherent issue with our strategy of discretizing time. Imagine a world with 2 particles. We look at our starting time and calculate the Lennard-Jones force between the two particles. We calculate their velocity vectors, and assume that they move in that direction and at that speed until the next time frame. We then jump forward to that time frame and calculate the new velocity vectors. Realistically, the velocity vectors would continuously be changing as the two particles move in relation to each other. The problem occurs when two particles move too close to one another during a time jump. Suddenly, the Lennard-Jones force between them is huge and they go rocketing off in different directions. The higher the speed of a particle, the more likely it is to suddenly appear next to another particle instead of being gradually pushed away. So, the problem compounds as more and more particles begin speeding up to ridiculous values and eventually, the variables for their position and speed overflow.  

{% highlight %}
OverflowError: Python int too large to convert to C long
{% endhighlight %}

<i>Example overflow :( </i>

To be honest, I don't yet know how to best fix this problem. It might be necessary to do integration to calculate the accurate position of each vector but that's very computationally expensive. I've tried introducing drag but that made it difficult for stationary particles to begin moving while barely reducing the speed of the rogue particles.

Since it's currently tax season in the US, I decided to implement a sort of incremental tax bracket on a particle's speed. After a particle exceeds a certain speed limit, I take the log of the marginal speed to slow it down. Since the log of a number doesn't converge (i.e. the limit does not exist), a particle's speed could still go to infinity. Nonetheless, this approach seems to be an effective way of keeping the simulation under control. 

You can find the full code on [GitHub](https://github.com/danong/particle_simulation/blob/master/single_particle_simulation.py). If you have any suggestions or improvements, please leave a comment, send me an email, or submit a pull request. As always, thanks for reading!


