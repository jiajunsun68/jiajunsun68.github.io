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
# what is token
$$Attention(Q,K,V)=softmax(QKTdk)V$$
the dimensions of input x will not be changed by multi-head attention.
$$Attention(Q,K,V)=softmax(QKTdk)V$$
 this process is showed in Fig. 1
![在这里插入图片描述](/img/SJJ.png)

**Fig. 1 unembedding**

So, there are another 50,257×12,288 weights in embedding matrix.

***reference***
[^1] [小黑黑讲AI 2024 Transformer模型详解，Attention is all you need](https://www.bilibili.com/video/BV14m421u7EM/)

