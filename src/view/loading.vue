<template>
    <div style="height: 100%;background-color:#F0EFF5;" class="centetn">
        <div id="loading_div">
            <div class="loading"></div>
        </div>
    </div>
</template>
<style>
    .centetn #loading_div{
        width: 100%;
        height: 100%;
        position: absolute;
        background: rgba(255, 255, 255, 0.8);
        top: 0;
        left: 0;
        z-index: 111;
    }
    .centetn #loading_div .loading{
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 1.5rem;
        border: 2px solid transparent;
        border-top: 2px solid #0000008f;
        position: absolute;
        top: 35%;
        left: 50%;
        transform:rotate(0deg);
        animation:myfirst .5s both infinite;
        -moz-animation:myfirst .5s both infinite; 
        -webkit-animation:myfirst .5s both infinite; 
        -o-animation:myfirst .5s both infinite; 
    }
    
    @keyframes myfirst
    {
    0%   {transform:rotate(0deg);}
    25%  {transform:rotate(72deg);}
    50%  {transform:rotate(144deg);}
    75% {transform:rotate(230deg);}
    100% {transform:rotate(360deg);}
    }
    
    @-webkit-keyframes myfirst /* Safari and Chrome */
    {
        0%   {transform:rotate(0deg);}
    25%  {transform:rotate(72deg);}
    50%  {transform:rotate(144deg);}
    75% {transform:rotate(230deg);}
    100% {transform:rotate(360deg);}
    }

</style>
