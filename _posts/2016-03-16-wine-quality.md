---
layout: post
title: Wine Quality and pH Dependency
---

## Introduction

Wine experts claim that a wine's pH level is "critical not only to its flavor but to nearly every aspect of the wine" ([source](http://winemakersacademy.com/importance-ph-wine-making/)). While I'm not a sommelier and I don't have some crazy collection of wines to sample, I can use statistics to determine if there is a dependency between the pH level and the quality of Vinho Verde red wine. 

$H_0=$ The pH level is independent of quality

$H_a=$ The two categorization schemes are dependent.

## Source Data

I use data on wine hosted on the UCI Machine Learning Repository ([source](https://archive.ics.uci.edu/ml/datasets/Wine+Quality)). For this test, we only use columns 9 (pH) and 12 (quality).




{% highlight python %}
import pandas as pd
import numpy as np
from scipy.stats import chi2_contingency

data = pd.read_csv('winequalityred.csv', delimiter=';', usecols=(8, 11))
test = data.groupby( [pd.cut(data['pH'], np.arange(0.5, 9, 0.5)), 'quality'] )
print(test.size())


    pH        quality
    (2.5, 3]  4            1
              5           17
              6           12
              7            3
              8            2
    (3, 3.5]  3            8
              4           40
              5          596
              6          561
              7          177
              8           14
    (3.5, 4]  3            2
              4           12
              5           68
              6           63
              7           19
              8            2
    (4, 4.5]  6            2
    dtype: int64
{% endhighlight %}


## Contingency Table

Our current contingency table looks like this:


|              | (2.5, 3] | (3, 3.5] | (3.5, 4] | (4, 4.5] |
|--------------|----------|----------|----------|----------|
| 3            | 0        | 8        | 2        | 0        |
| 4            | 1        | 40       | 12       | 0        |
| 5            | 17       | 596      | 68       | 0        |
| 6            | 12       | 561      | 63       | 2        |
| 7            | 3        | 177      | 19       | 0        |
| 8            | 2        | 14       | 2        | 0        |


Since the counts for some cells are a low (below 5), I regroup my data as follows:


|        | (2.5, 3] | (3, 3.5] | (3.5, 4.5] |
|-------:|----------|----------|------------|
| (3, 5) | 18       | 644      | 82         |
| (6, 8) | 17       | 752      | 86         |


Now I compute the test statistic $X^2$ and p-value using Sci Py.




{% highlight python %}
obs = np.array([[18, 644, 82], [17, 752, 86]])
chi2, p, dof, expected = chi2_contingency(obs)
print("Chi 2 value:", chi2)
print("P value:", p)
print("Degrees of freedom:", dof)
print("Expected values:", expected)


    Chi 2 value: 0.777415781381
    P value: 0.677932271421
    Degrees of freedom: 2
    Expected values: [[  16.28517824  649.54596623   78.16885553]
     [  18.71482176  746.45403377   89.83114447]]
{% endhighlight %}

## Conclusion

As you can see, the $X^2$ value is only 0.777 which leads to a p-value of 0.6779. There is weak evidence against the null hypothesis so we fail to reject the claim that pH level is independent of quality for Vinho Verde red wine. 