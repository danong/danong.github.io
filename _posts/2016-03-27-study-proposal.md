---
layout: post
title: Independent Study Proposal
---

## Introduction

Until recently, reinforcement learning algorithms performed poorly in complicated environments with large numbers of states. In 2013, DeepMind Technologies used Deep Q-Networks, a novel reinforcement learning algorithm that combines convolutional neural networks and Q-Learning, to reach superhuman performance in multiple Atari Games using only raw sensory input [[1]](http://arxiv.org/abs/1312.5602). 

The Deep Q-Learning algorithm presented in the DeepMind paper was only applied to single player Atari video games (i.e. single agent systems). In the real world, multiagent systems are more common than single agent systems. There has been recent success in applying Q-Networks to two agents in the Atari video game Pong [[2]](http://arxiv.org/abs/1511.08779). 
 
I, Daniel Ong, would like to build on this body of work by researching how deep reinforcement learning techniques can be applied to multiple agents in small-scale combat in the real-time strategy game StarCraft: Broodwar.

## Background

### Game Selection

StarCraft: Broodwar is a popular 1998 video game by Saffire and Blizzard Entertainment. Players control one of three races with the goal of eliminating other players. This involves gathering resources, researching new technologies, and building armies in real time. Additionally, StarCraft is a game of imperfect information as players can only see the area around their own units. All these factors combine to create a unique and challenging platform for AI research [[3](https://webdocs.cs.ualberta.ca/~cdavid/pdf/ecgg15_chapter-rts_ai.pdf) [4](http://webdocs.cs.ualberta.ca/~cdavid/starcraftaicomp/history.shtml)]. 

Human players divide the act of playing StarCraft into two categories: macromanagement and micromanagement. Macromanagement involves deciding on a strategy and producing units or buildings. Micromanagement involves moving and attacking with units. Creating a full StarCraft: Broodwar AI that manages both macromanagement and micromanagement would be beyond the scope of a quarter long undergraduate project so I choose to focus on the micromanagement of small groups of units.

### Deep Reinforcement Learning

Q-Learning is a reinforcement learning technique used to find an optimal action-selection policy. In each step, an agent knows its current state, \\(s\\), and can take an action, \\(a\\). Good performance is awarded with some reward, \\(r\\). We define a Q function as:

$$ Q^{*} \left( s,a \right) =  \mathbb{E}_{s' \sim \varepsilon} \left[ r + \gamma \max_{a'} Q^{*} \left( s', a' \right) \middle| s,a\right] $$

where \\(\gamma\\) is the learning parameter with a value between 0 and 1. When \\(\gamma\\) is low, the agent tends to consider immediate rewards. When \\(\gamma\\) is high, the agent tends to also consider future rewards.

For any given state, our agent takes the action with the highest $Q^{*}$ value until it reaches the goal state. We can insert the agent into different initial states and let the agent find the goal repeatedly. As our agent repeatedly explores the environment, it learns from experience. 
 
While it may be possible to create a function \\(Q^{*}\\) that perfectly represents simple environments, it is practically impossible for complex environments like StarCraft. Instead, we use a neural network, or Q-net, to create a function approximator \\(Q(s, a; \theta)\\) where \\(\theta\\) represents the parameters of our Q-net. The loss function we use to train our Q-net is defined as:

$$ L_{i} \left( \theta_{i} \right) =  \mathbb{E}_{s, a \sim p \left( \cdot \right) } \left[ \left( y_{i} - Q \left( s, a; \theta_{i} \right) \right) ^2 \right] $$
where \\(y\\) is the expected reward of the state using parameters of our Q from the previous iteration [[1]](http://www.danielslater.net/2016/03/deep-q-learning-pong-with-tensorflow.html?).

DeepMind's deep Q-learning algorithm combines Q-learning as defined above with a deep convolutional neural network and experience replay [[1]](http://arxiv.org/abs/1312.5602). 

## Purpose of the study

This study is focused on learning about deep reinforcement learning techniques and adapting them to work on multiple agents in complex environments. Specifically, I will study an algorithm such as DeepMind's Deep Q-Learning algorithm and apply it to multiple units in StarCraft:Broodwar small scale combat situations. Using BWAPI, a free and open source C++ framework for interacting with StarCraft: Broodwar, I will set up a combat scenarios (e.g. 3 Marines against 6 Zerglings) on flat terrain and measure the  effectiveness of my learning agents by comparing win rates to the default StarCraft: Broodwar AI. 

## Objectives
This independent study is intended to provide Daniel Ong with an opportunity to conduct original research while enrolled as an undergraduate student. At the end of the Spring 2016 quarter, I will have:

* Acquired knowledge on state of the art deep reinforcement learning techniques
* Produced code to implement deep reinforcement learning for small scale combat in StarCraft: Broodwar
* Produced a professional paper/report on my work
* Become more professional in work and research habits

## Feasibility

StarCraft AI is a difficult topic so I limit the scope of this project to small scale combat micromanagement and concentrate on a single method/algorithm. There are several significant challenges working against my success and advantages working for my success that I have identified. 

### Challenges

#### Lack of Adviser

As of the time of writing, I currently do not have a Professor/Adviser for this study. While I am willing to attempt this study on my own, the guidance of an adviser would be invaluable. 

#### Hardware Limitations

Performing deep reinforcement learning is computationally expensive. Training a single agent in Pong reportedly takes multiple days even with a good GPU [[1]](http://www.danielslater.net/2016/03/deep-q-learning-pong-with-tensorflow.html?). I only have a single Nvidia GTX 750M at my disposable. 

Nvidia has a Hardware Grant program which grants projects a single GPU. Students are not allowed to submit Hardware Grant Requests so I would need to a faculty Professor/Adviser to submit a Hardware Grant Request for the project. Obviously, approval is not guaranteed. Waiting multiple days to see results would be a major inconvenience but it would not be insurmountable.

### Advantages

#### StarCraft Domain Knowledge

Having played competitive StarCraft: Broodwar from 2007 through 2010, I have strong domain knowledge which could potentially be incorporated into my algorithm to improve performance and speed up training times. I also have some familiarity with StarCraft map-making and programming in BWAPI, which are necessary skills for this project.

#### Machine Learning and AI Domain Knowledge

I have some familiarity with both machine learning and AI. Over the summer, I completed the Stanford University Machine Learning course which can be found on Coursera. I also completed COEN 166 Artificial Intelligence last quarter.

#### Availability

I already completed all major and core requirements to graduate with the exception of the upper division requirement (9 units short).  I plan on taking COEN 169 Web Information Management and CSCI 183 Data Science this upcoming quarter for a total of 9 units technical units. While I am currently also enrolled in two art courses, I should have a lighter course workload than usual.

## Conclusion

By undertaking this project, I will not only enrich my education, but also research the possible applications of state of the art algorithms and possibly create a proof of concept. This may even be an opportunity to publish a paper. I believe the independent study/research project outlined above is challenging but attainable.