<template>
  <div ref="home" id="menu">
    <div ref="list" id="list">
      <img src="" class="iconfont icon-feiji" />
      <img class="iconfont icon-chongwushe" src="" />
      <img class="iconfont icon-niao" src="" />
      <img class="iconfont icon-lifangtilitiduomiantifangkuai2" src="" />
    </div>
    <div class="iconfont icon-youxi" id="home"></div>
  </div>
</template>

<script>
export default {
  name: "CreepreWebOthermenu",
  components: {},
  data() {
    return {
      onOff: true,
      r: 100,
    };
  },
  mounted() {
    let this_ = this;
    let hom = this_.$refs.home;
    let imgs = this_.$refs.list.getElementsByTagName("img");

    for (var i = 0; i < imgs.length; i++) {
      imgs[i].onclick = function () {
        this.style.transition = "0.3s";
        this.style.transform = " scale(1.5) ";
        this.style.opacity = 0;
        const className = this.className.slice(9, this.className.length);
        this_.nav(className, this_);
      };
    }
    hom.onclick = function () {
      if (this_.onOff) {
        this.style.WebkitTransform = "rotate(-720deg)";
        for (var i = 0; i < imgs.length; i++) {
          var olt = this_.toLT(this_.r, (90 / 4) * i);
          imgs[i].style.transition = 0.3 + i * 0.1 + "s";
          imgs[i].style.left = -olt.l + "px";
          imgs[i].style.top = -olt.t + "px";
          imgs[i].style.opacity = 1;
          imgs[i].style.WebkitTransform = "rotate(-720deg)";
        }
      } else {
        this.style.WebkitTransform = "rotate(720deg)";
        for (var j = 0; j < imgs.length; j++) {
          imgs[j].style.transition = 0.3 + (imgs.length - 1 - j) * 0.1 + "s";
          imgs[j].style.left = 0 + "px";
          imgs[j].style.top = 0 + "px";
          imgs[j].style.opacity = 0;
          imgs[j].style.WebkitTransform = "rotate(0deg)";
        }
      }
      this_.onOff = !this_.onOff;
    };
  },

  methods: {
    toLT: (iR, iDeg) => {
      return {
        l: Math.round(Math.sin((iDeg / 180) * Math.PI) * iR),
        t: Math.round(Math.cos((iDeg / 180) * Math.PI) * iR),
      };
    },
    nav: (className, this_) => {
      if (className === "icon-chongwushe") {
        // 贪吃蛇
        this_.$router.replace("/game/blogTanChiShe");
      } else if (className === "icon-feiji") {
        // 飞机大战
        this_.$router.replace("/game/blogFeiJi");
      } else if (className === "icon-lifangtilitiduomiantifangkuai2") {
        // 别踩白块
        this_.$router.replace("/game/FangKuai");
      } else if (className === "icon-niao") {
        // 飞翔小鸟
        this_.$router.replace("/game/XiaoNiao");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#menu {
  width: 0.5rem;
  height: 0.5rem;
  position: fixed;
  right: 0.18rem;
  bottom: 0.2rem;
  #list {
    height: 0.42rem;
    width: 0.42rem;
    position: relative;
    margin: 0.04rem;
    img {
      position: absolute;
      left: 0;
      top: 0;
      transition: 0.5s all ease;
      opacity: 0;
      font-size: 0.3rem;
      color: $my-theme-box-shadow;
      &:hover {
        cursor: pointer;
      }
    }
  }
  #home {
    width: 0.4rem;
    height: 0.4rem;
    border-radius: 0.25rem;
    color: rgb(49, 177, 236);
    font-size: 0.4rem;
    text-align: center;
    line-height: 0.4rem;
    position: absolute;
    left: 0;
    top: 0;
    transition: 1s;
    &:active {
      transform: scale(1.05);
    }
    &:hover {
      cursor: pointer;
    }
  }
}
@media screen and (max-width: 640px) {
  #menu {
    right: 0.4rem;
    bottom: 1.8rem;
    z-index: 999;
    #list {
      img {
        font-size: 0.4rem;
      }
    }
    #home {
      background-position: center;
    }
  }
}
</style>