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
# 1. what is token[^2]

the inputs of model are broken up into a brunch of little pieces called 'token’s which are associated as vectors as showed in Fig. 1![Fig. 1.1 tokens](https://img-blog.csdnimg.cn/direct/df5044dcdfe84fa19662c2189e817141.png)

**Fig. 1.1 tokens**

Usually, tokens are words or punctuation in GPT3 and the process from token to vector are learnable which means that embedding is learnable as showed in Fig. 2
![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/fe5af2e8f02346599dc967e09e88160b.png)

**Fig. 1.2 embedding matrix**

# 2. architecture of transformer model[^1]

![Fig. 2.1 transformer](https://img-blog.csdnimg.cn/direct/f4ee7a853e6541c48117453d4f9ba323.png)

**Fig. 2.1 transformer**

for example, there is an application of English2Chinese translation.
![Fig. 2.2 an example](https://img-blog.csdnimg.cn/direct/2a8e1122f7654f13bf61eb9bec2f164a.png)

**Fig. 2.2 an example**

## 2.1 inputs and outputs

### 2.1.1 inputs

the real inputs of the model are inputs*in**p**u**t**s* and outputs(shifted−right)*o**u**tp**u**t**s*(*s**hi**f**t**e**d*−*r**i**g**h**t*) at the bottom of Fig. 1. the real output of the model is output−probilities*o**u**tp**u**t*−*p**ro**bi**l**i**t**i**es* at the top of Fig. 1.

### 2.1.2 input embedding and output embedding

as showed in Fig. 2, “are u ok? " and " 你好吗” will be embedded as a matrix. Each word has 12,288 dimensions in GPT3[^2].
![Fig. 2.3 embedding](https://img-blog.csdnimg.cn/direct/b576ce6760c448e59da84f18975ce1f5.png)

**Fig. 2.3 embedding**

## 2.2 positional encoding

as showed in Fig. 2.3 and Fig. 1.2, the vectors are simply coming from embedding matrix so the transformer will not know the positional information of words in inputs*in**p**u**t**s* and outputs(shifted−right)*o**u**tp**u**t**s*(*s**hi**f**t**e**d*−*r**i**g**h**t*). In other words, you can read each vector as just a word without its location information. So, transformer model will make a process called positional encoding to ‘add’ positional information to inputs*in**p**u**t**s* and outputs(shifted−right)*o**u**tp**u**t**s*(*s**hi**f**t**e**d*−*r**i**g**h**t*). as showed in formula 1.
![formula 2.1](https://img-blog.csdnimg.cn/direct/fc542909dcb54b95be50fe5e569826dc.png)

**formula 2.1**

pos*p**os* is the order of word., 2i2*i* and 2i+12*i*+1 implied the order of odd and even. d*d* implied the number of words which is intend that the dimensions of positional matrix are the same as those of the inputs*in**p**u**t**s* and outputs(shifted−right)*o**u**tp**u**t**s*(*s**hi**f**t**e**d*−*r**i**g**h**t*) embedded matrix for addition as showed in formula 2.
![formula 2.2](https://img-blog.csdnimg.cn/direct/4dce94af573f47b1be61c99a5d609e26.png)

**formula 2.2**

after this, each vector of this matrix seems not to be a word but a word plus its location information.
In addition, we hope that the last vector of matrix after a seirs of process has the information of all of the context. so that we can forecast the output word just referring to this last vector.

## 2.3 encoder and decoder

![Fig. 2.4 encoder and decoder](https://img-blog.csdnimg.cn/direct/fe39c931197644a8b591d577decb0a19.png)

**Fig. 2.4 encoder and decoder**

matrix figured by the use of multi-head attention will be added to inputs*in**p**u**t**s* and outputs(shifted−right)*o**u**tp**u**t**s*(*s**hi**f**t**e**d*−*r**i**g**h**t*) matrix.

### 2.3.1 feed forward (or multi-layer perceptron[^2])

![Fig. 2.5 feed forward](https://img-blog.csdnimg.cn/direct/2a4d4c4a1a1444709553d89cbe53c5aa.png)

**Fig. 2.5 feed forward**

in this layer, the vectors don’t talk to each other anymore and they all go through the same operation in parallel.

## 2.4 multi-head attention

as showed in Fig. 5, Attention blocks allow vectors to talk to each other and pass information back and forth to update their values.
![Fig. 2.6 multi-head attention](https://img-blog.csdnimg.cn/direct/760d7248ee044592b00bcf3c96536ff7.png)

**Fig. 2.6 multi-head attention**

the input of Attention will be figured by three linear layers: V, K, Q for feature shifting. Then the algorithm called Scaled Dot Product Attention will be used to combine the data of V, K, Q. h*h* in Fig. 6 is the number of head of multi-head Attention.
![Fig. 2.7 the process of multi-head Attention](https://img-blog.csdnimg.cn/direct/11da48e7764d4838a1a12315337e4627.png)

**Fig. 2.7 the process of multi-head Attention**

$$Attention(Q,K,V)=softmax(QKTdk)VAttention(*Q*,*K*,*V*)=softmax(*d**k**Q**K**T*)*V*$$
the dimensions of input x will not be changed by multi-head attention.

### 2.4.1 SoftMax

![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/c7e05130de56475d922ea5116195f6e0.png)

**Fig. 2.8 SoftMax**

the advantage of SoftMax is that if one of the numbers is meaningfully bigger than the rest, then in the output the corresponding term dominates the distribution.

# 3. learnable weights of transformer[^2]

GPT 3, for example, has 175B weights which are organized into just under 28,000 distinct matrices. and those matrices in turn fall into 8 different categories as showed in Fig.1
![8 different matrices](https://img-blog.csdnimg.cn/direct/3eee74fc529a46e7aa849524173ba86a.png)

**Fig. 3.1 eight different matrices**

## 3.1 embedding matrix

As showed in **Fig. 1.2** there are 50,257 tokens and each token has 12,288 dimensions. So, there are 50,257×12,288 weights in embedding matrix.

## 3.2 unembedding matrix

As mentioned before, we hope that the last vector of matrix after a seirs of process has the information of all of the context. so that we can forecast the output word just referring to this last vector. this process is showed in Fig. 3.2
![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/df1a269b282149879d72031de443decc.png)

**Fig. 3.2 unembedding**

each row of this matrix for each word in the vocabulary has the same number of elements of the embedding dimensions. So, there are another 50,257×12,288 weights in embedding matrix.

***reference***
[^1] [小黑黑讲AI 2024 Transformer模型详解，Attention is all you need](https://www.bilibili.com/video/BV14m421u7EM/)
[^2] [3Blue1Brown 2024 直观解释transformer](https://www.bilibili.com/video/BV13z421U7cs)
