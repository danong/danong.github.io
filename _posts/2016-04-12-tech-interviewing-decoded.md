---
layout: post
title: Tech Interviewing Decoded Summary (Draft)
---

## Introduction

Last Friday (2016-04-07), I was invited to Google's new Sunnyvale campus for the first Tech Interviewing Decoded ever. Over the course of approximately five hours, Google hosted a number of talks, panels, and demos to "demystify the interview process and give you the opportunity to have your questions answered about launching your career in tech". Students from four Bay Area universities were invited and I'd estimate that around 100-200 people showed up. I suspect that many readers here would have liked the opportunity to attend such an event so I've written up a quick summary of the day. Let me know if you have any other questions!

The event kicked off with a giveaway. A few lucky winners who were sitting on specially marked chairs won a special gift bag that contained a copy of Cracking the Coding Interview.

## Mock Interview 'Demo' with Googlers

In my favorite segment, two Google interviewers demonstrated what the technical portion of a Google interview looks like along with tips on what interviewers are looking for. Both the interviewer and interviewee were named Jonathan so I'll just stick to referring to them as the interviewer and interviewee. I think it will be more useful if I describe some notable points rather than regurgitating the interviewer's code. The code is left as an exercise to the reader (hah). 

Problem: Write a program that returns the length of the the longest chain of consecutive numbers in a grid of natural numbers.

The interviewee began by asking clarifying questions about the problem. An interviewer may give you an intentionally ambiguous or vague problem to check if you're detail oriented or if you just leap into the problem. Some questions asked in this demo included:

* Q: Can we assume that the grid is square (NxN rather than NxM)? A: Yes, let's say it's square for now.
* Q: Do we have to worry about the grid being so large that it can't fit in memory or anything like that? A: No, let's assume the grid is reasonably sized and will be given as a 2-D array (e.g. int Grid[n][n])

The interviewee then solved an example by hand on the whiteboard to ensure that he was on the same page as the interviewer. Working out a problem by hand is also a good way to gain some intuition on how to design an algorithm for the given problem.

It was only after asking questions and solving an example by hand that the interviewee began to actually write code. He began by writing a suboptimal brute force solution: iterate through every element in the matrix and see what the longest chain of increasing, consecutive neighbors you can form from each starting point. Keep track of the maximum length encountered and return it after checking all starting points. While writing his solution, the interviewer called a function for finding the longest chain given a starting cell rather than writing the entire solution in one block. Writing modular code in an interivew is not only neater but also opens the door to the possiblity that the interviewer lets you skip fully implemeneting some functions. In this case, the interviewer only asked the interviewee to describe how he would implement his getLongestPath function. 

The interviewee then noted that this solution is inefficient and repeats work. Iterating through the grid takes \\(O(n^2)\\) time and finding the longest path takes \\(O(n)\\) so his solution is \\( O(n^3) \\). If I'm not wrong, there seemed to be some inconsistency on whether \\(n\\) refered to the dimension of the matrix or the total number of elements in the matrix). He then came up with an \\(O(n)\\)

It's important to note that throughout the entire interview, the interviewee and interviewee were talking to each other almost continuously. Instead of standing silently while thinking to himself, the interviewee thought out loud so the interviewer could follow his thought process. The interviewee also described what he was doing everytime while writing code so it was clear what he was attempting to do. Communicating your thoughts in an interview has the added benefit of allowing your interviewer to give you feedback and hints if you're going in the wrong direction. Multiple Googlers emphasized that your interviewer will want to see you ace your interview and solve the problem so if they give you a hint, take it. They aren't trying to trick or mislead you. Remember that interviewers are also assessing if they would like to work with you and ignoring their suggestions could make you seem like a stubborn developer who has to do things his way.

One final tip is to name possible errors of bugs as you work. For example, the interviewee noted that there may be an off by one error whlie writing code to get a cell's neighbors when the cell is on the edge of the matrix and said he'd go back to fix it after getting the general algorithm down. This prevents the interviewer from asking you 'gotcha' type questions when you finish. It can also be useful for the interviewer to know that you recognize a problem area so he or she doesn't get caught up thinking about an error in your solution.

##Follow up Demo Q&A with Googlers



## Googler Panel


## Lunch/Networking


## Spotlight Talks

## Ask a REcruiter! Q&A


## Closing
