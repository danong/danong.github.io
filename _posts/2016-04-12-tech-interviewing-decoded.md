---
layout: post
title: My Google Tech Interviewing Decoded Experience 
---

## Introduction

Last Friday (2016-04-07), I was invited to Google's new Sunnyvale campus for a new Google campus outreach program currently titled Tech Interviewing Decoded. Over the course of approximately five hours, Google hosted a number of talks, panels, and demos to "demystify the interview process and give you the opportunity to have your questions answered about launching your career in tech". Approximately 100-150 computer science/engineering students from four invited Bay Area universities attended the program. I suspect that many readers here would have liked the opportunity to attend such an event so I've written up a quick summary of the day.

## Mock Interview 'Demo' with Googlers

In my favorite segment, two Google interviewers demonstrated what the technical portion of a Google interview looks like along with tips on what interviewers are looking for. Both the interviewer and interviewee were named Jonathan so I'll refer to them as the interviewer and interviewee. I think it will be more useful if I describe some notable points rather than regurgitating the interviewer's code so the code/solution is left as an exercise to the reader (hah). 

Problem: Write a program that returns the length of the longest chain of consecutive numbers in a grid of natural numbers.

The interviewee began by asking clarifying questions about the problem. An interviewer may give you an intentionally ambiguous or vague problem to assess your attention to detail. Some questions asked in this demo included:

* Q: Can we assume that the grid is square (NxN rather than NxM)? A: Yes, let's say it's square for now.
* Q: Do we have to worry about the grid being so large that it can't fit in memory or anything like that? A: No, let's assume the grid is reasonably sized and will be given as a 2-D array (e.g. int Grid[n][n])

The interviewee then solved an example by hand on the whiteboard to ensure that he was on the same page as the interviewer. Working out a problem by hand is also a good way to gain some intuition on how to design an algorithm for the given problem.

It was only after asking questions and solving an example by hand that the interviewee began to actually write code. He began by writing a suboptimal but straightforward brute force solution: iterate through every element in the matrix and see what the longest chain of increasing, consecutive neighbors you can form from each starting point. Keep track of the maximum length encountered and return it after checking all starting points. While writing his solution, the interviewer called a function for finding the longest chain given a starting cell rather than writing the entire solution in one block. Writing modular code in an interview is not only neater but also opens the door to the possibility that the interviewer lets you skip fully implementing some functions. In this case, the interviewer only asked the interviewee to describe how he would implement his getLongestPath function. 

The interviewee then noted that this solution is inefficient and repeats work. Iterating through the grid takes \\(O(n^2)\\) time and finding the longest path takes \\(O(n)\\) so his solution is \\( O(n^3) \\). If I'm not wrong, there seemed to be some inconsistency on whether \\(n\\) referred to the dimension of the matrix (e.g. \\( n = 3 \\) for a 3x3 matrix) or the total number of elements in the matrix (e.g. \\( n = 9 \\) for a 3x3 matrix). He then came up with an \\(O(n)\\) by creating a custom data structure that maps the value of a cell to its index in the matrix (e.g. 1: (0,2), 2: (1,1), 3: (0,1), etc.). Since you only need to iterate through the grid once to fill in your data structure and iterate through the data structure once to find the longest chain, the new solution ran in \\(O(n)\\) time. Tip: if you see the opportunity to write a class or use some design pattern, you might as well take it to demonstrate your knowledge of the OOP paradigm. 

It's important to note that throughout the entire interview, the interviewee and interviewee were talking to each other almost continuously. Instead of standing silently while thinking to himself, the interviewee thought out loud so the interviewer could follow his thought process. The interviewee also described what he was attempting to do while writing each line of code. Communicating your thoughts in an interview has the added benefit of allowing your interviewer to give you feedback and hints if you're going in the wrong direction. Multiple Googlers emphasized that your interviewer will want to see you ace your interview and solve the problem so if they give you a hint, take it. They aren't trying to trick or mislead you. Remember that interviewers are also assessing if they would like to work with you and ignoring their hints could make you seem like a stubborn developer who has to do things his or her way.

Tip: identify possible errors or bugs as you work. For example, while writing code to get a cell's neighbors, the interviewee noted that there may be an off by one error when the cell is on the edge of the matrix and said he'd go back to fix it after getting the general algorithm down. This prevents the interviewer from asking you 'gotcha' type questions when you finish. It can also be useful for the interviewer to know that you recognize a problem area so he or she doesn't focus on an error he or she thinks you missed.

## Follow up Demo Q&A with Googlers

Following the interview, the two demonstrators answered questions and gave more tips on how to have a successful interview.

* Q: Will your interviewer run your code? A: Maybe. Some people take notes and run your code later while some don't. If you see your interviewer typing during your interview, it is highly unlikely that he or she is transcribing your code into an IDE however. They're most likely just taking notes.
* Q: How important is syntax? A: You want to show that you know the programming language you're using but it's not like missing a semi-colon is going to ruin your chances.
* Q: What language do you have to code in? A: Your recruiter should talk to you about what language you would like to code in beforehand and you'll be matched with an interviewer who is familiar with that language. We don't recommend trying to do an interview in some obscure language. You're definitely safe if you code in C++, Java, or Python.
* Q: Is it always a good idea to work on the obvious brute-force approach before giving a better or optimal solution? A: Not really. It's impressive if you can briefly describe the obvious solution and its time complexity before going right into a better solution. In this context, the interview from the demo wasn't actually the strongest interview a candidate could have given.
* Q: What if you get a problem that you have no idea how to approach? A: Try to stay calm. Panicking is going to hurt you even more. It's especially important to ask questions, do an example or two, and communicate your thought process to your interviewer.
* Q: I failed an interview in the past. Why didn't I get any feedback on what I did wrong? A: Legal reasons. If you're interviewing again, try to show noticeable improvement. It looks really bad if you fail to solve a problem that you failed to solve in a previous attempt.

## Googler Panel

Following the mock interview, four Googlers took the stage and opened the floor to questions.

* Q: What are some tips that you have for current students? A: Show your passion for CS by participating in organizations and events outside of classes. Work on your own projects or contribute to open source. Study hard and practice for interviews. Try to get as many internships and experience under your belt as possible.
* Q: What are some tips for people trying to get a job at Google? A: Persevere - I waited 5 years before I first applied to Google and when they finally hired me. Make your life easier by letting your know interviewer know if you're having any problems that they could accommodate. Practice interviewing on a whiteboard and do as many interviews as you can; the general tech interview form is pretty similar across companies so there's a lot of skill transfer.
* Q: How is the work-life balance at Google? Do you ever feel burned out? A: Google is so large that the atmosphere/pressure varies from team to team. All the panelists agreed that they had good work-life balance and a lot of stress they feel is self-induced.
* Q: I'm interested in CS education. Are there opportunities for this at Google? A: Again, Google is large. A better question would be what field isn't Google interested in? To your specific example, I know that Google often sends people to teach at historically black colleges and universities. 

## Spotlight Talks

Two Googlers gave slightly longer talks specifically about what they do at Google. The first speech was by someone who entered Google through the Engineering Residency program. The Engineering Residency program is a yearlong training where residents are attached to 2 different teams for training and hands on experience. Apparently it has a ~90% conversion rate and many residents like their first team enough that they choose to stick with it and convert to a full time role. This was the case for our first speaker and she ended up on the Chrome for Android UI team where she worked on implementing features such as the close all tabs button for Android on tablets. She is currently working on features such as split screen support on the upcoming Google N. 

The second speech was largely about the importance of data health, the process of building systems to monitor Google's data systems, and how Google deals with system failures. Rather than naively recording all system logs and informing everybody about the failure, Google has systems in place to identify the root cause of problems and only notifies teams that will be negatively impacted. He also talked about some of the techniques (e.g. power capping) that Google uses to reduce costs in their data centers. 

## Ask a Recruiter! Q&A

The final panel consisted of four recruiters who took questions about the whole recruitment process.

* Q: How long do you spend on each resume? A: Resumes are actually sent to a dedicated resume screening team in Houston who take 10-15 minutes per resume. If your resume makes it past that stage, it gets into our (a recruiter) hands. Since there is such a high volume of applicants, it isn't feasible for recruiters to spend too much time on every resume.
* Q: If I'm rejected, how long should I wait before reapplying? A: Officially it's a year but it doesn't have to be exactly one year to the date.
* Q: How important is it to include links to your portfolio/GitHub on your resume? A: It's definitely helpful. Many interviewers will take the time to look at a candidate's GitHub before interviews.
* Q: What are some resumes do's and don'ts? A: Definitely include your GPA. Unless you have industry experience, keep it to a single page. Be truthful about your knowledge or experience.
* Q: What is the minimum GPA needed to be competitive at Google? A: Google takes a holistic look at each candidate.
* Q: When is the best time to apply for an internship? A: As early as possible after the application opens. It's tempting to wait to give yourself more time to improve your resume but recruiters will have more time to spend on each applicant early in the application period and there are finite number of spots that get filled up over time.
* Q: I dropped out of a PhD program. Does this reflect badly on me or hurt my chances? A: Google is filled with people from non-traditional paths. I wouldn't worry about that at all.

## Closing

In addition to the scheduled talks, a few lucky people were selected for their own practice interviews. Sadly, I wasn't one of those ~20 people. Of course, no Silicon Valley event would be complete some company swag. All attendees received a bag full of Google swag that included a subtly branded Google notebook, plastic sunglasses, socks, and a 2200mAh external battery pack. Some lucky winners also won a free copy of Cracking the Coding Interview.

I thought the event was very well run. All the speakers and panels were good about keeping to the schedule and there was no dead or wasted time. One issue was that other Googlers kept accidentally connecting to the projector in our room. I suspect they have some sort of campus wide conference call/meeting network setup but it was pretty funny to see the projector switch from the presentation slides to some random person every now and then though. Thanks again for hosting this event, Google!

Let me know if you have any questions!

Disclaimer: I'm not associated with Google in any way. The opinions and views expressed are solely my own and do not reflect the view of Google or Alphabet. 