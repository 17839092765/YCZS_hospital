<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {
    //监听三维交互的返回事件
    onLoad() {
      // onResize();
      this.init(true, true);
    },
    onEvent(e) {
      console.log(e);
    },
    onResize() {
      // let leftPanel = document.getElementById('leftPanel');
      // let infoPanel = document.getElementById('infoPanel');
      // let player = document.getElementById('player');
      // player.style.width = `${window.innerWidth - leftPanel.clientWidth - 30}px`;
      // player.style.height = `${window.innerHeight - infoPanel.clientHeight - 50}px`;
    },
    initWebSocket() {
      //初始化weosocket
      const wsuri = "127.0.0.1:4322";
      this.websock = new AirCityAPI(wsuri, this.onReady, this.log);
      this.websock.setEventCallback(this.onEvent);
    },
    onReady() {
      //此时可以调用接口了
    },
    log() {},
    getMatchServerConfig(host, fn, callbackIndex) {
      console.log(1);
      if ("WebSocket" in window) {
        var url = `ws://${host}`;
        let __fn = fn;

        var ws = new WebSocket(url);
        ws.onopen = function() {
          this.send(
            JSON.stringify({
              command: 6,
              callbackIndex: callbackIndex,
            })
          );
        };
        ws.onmessage = function(event) {
          var o = JSON.parse(event.data);
          __fn(o);
        };
        ws.onclose = function() {};
        ws.onerror = function(event) {};
      } else {
        this.log("Not Support WebSocket!");
      }
    },
    init(withPlayer, withInterface) {
      let _this = this;

      this.getMatchServerConfig(HostConfig.MatchServer, function(o) {
        if (o.result == 0) {
          if (withPlayer) {
            new AirCityPlayer(o.instanceId, "player", HostConfig.Token, true);
          }
          if (withInterface) {
            var ace = new AirCityAPI(o.instanceId, _this.onReady, _this.log);
            ace.setEventCallback(_this.onEvent);
          }
        } else {
          if (withPlayer) {
            let host = HostConfig.instanceId
              ? HostConfig.instanceId
              : HostConfig.AirCityPlayer;
            let acp = new AirCityPlayer(
              host,
              "player",
              HostConfig.Token,
              true,
              true
            );
            //AirCityPlayer对象增加方法enableAutoAdjustResolution，可以设置启用或关闭视频窗口缩放时
            //自动调整分辨率的功能。这个功能默认是启用的，如果想关闭此功能，可以在初始化的时候调用enableAutoAdjustResolution(false)
            acp.enableAutoAdjustResolution(false);
          }
          if (withInterface) {
            let host = HostConfig.instanceId
              ? HostConfig.instanceId
              : HostConfig.AirCityAPI;
            var ace = new AirCityAPI(host, _this.onReady, _this.log);
            ace.useColorLog = true;
            __g.setEventCallback(_this.onEvent);
          }
        }
      });
    },
  },
  created() {
    // this.initWebSocket();
    window.addEventListener("load", this.onLoad, true);
    window.addEventListener("resize", this.onResize, true);
  },
  mounted() {},
  beforeCreate() {},
  beforeMount() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  activated() {},
  components: {},
};
</script>

<style lang="scss" scoped>
#app {
  width: 100%;
  height: 100%;
  font-size: 12px;
  color: #fff;
}
</style>
