---
layout:     post
title:      "什么是transformer"
subtitle:   ""
date:       2024-06-03 12:00:00
author:     "SJJ"
header-img: "img/post-bg-android.jpg"
tags:
    - transformer
    - token
---

$$Attention(Q,K,V)=softmax(QKTdk)V$$
<p></p>
$$Attention(Q,K,V)=softmax(QKTdk)V$$
<p></p>
the dimensions of input x will not be changed by multi-head attention.

As mentioned before, we hope that the last vector of matrix after a seirs of process has the information of all of the context. so that we can forecast the output word just referring to this last vector. this process is showed in Fig. 3.2
![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/df1a269b282149879d72031de443decc.png)

**Fig. 3.2 unembedding**

each row of this matrix for each word in the vocabulary has the same number of elements of the embedding dimensions. So, there are another 50,257×12,288 weights in embedding matrix.

***reference***
[^1] [小黑黑讲AI 2024 Transformer模型详解，Attention is all you need](https://www.bilibili.com/video/BV14m421u7EM/)
[^2] [3Blue1Brown 2024 直观解释transformer](https://www.bilibili.com/video/BV13z421U7cs)
