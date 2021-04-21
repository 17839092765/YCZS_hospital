function onReady() {
  //此时可以调用接口了
  __g.camera.get((r) => {
    var str = `OnReady Get Camera: ${r.x}, ${r.y}, ${r.z}, ${r.pitch}, ${r.yaw}, ${r.roll}`
    log(str)
  })

  __g.misc.setApiVersionReceived(function() {
    var spanVer = document.getElementById("spanVer")
    spanVer.innerText = ` S${this.apiVersion}C${this.sdkVersion}`
    if (this.apiVersion != this.sdkVersion) {
      spanVer.innerHTML = ` S${this.apiVersion}<font color=red><b>C${this.sdkVersion}</b></font>`
      logWithColor(
        "red",
        "<b>JS SDK版本和云渲染服务器版本不一致，可能造成接口调用错误，请确认!</b>\n"
      )
    } else {
      spanVer.innerHTML = ` S${this.apiVersion}C${this.sdkVersion}`
    }
  })
}

var __fn = null
var __editor
var __currentTileLayerActor = null //当前点选的TileLayer Actor
var __isFirstClearCode = true
var __loginDuration //用户登录时长限制，到达时长时，自动退出（断开视频流连接），需要重新登录
var __timeLimitOnly = false

function getQueryVariable(v) {
  let query = location.search.substring(1)
  let vars = query.split("&")
  for (let i = 0; i < vars.length; i++) {
    let pair = vars[i].split("=")
    if (pair[0] == v) return pair[1]
  }
  return undefined
}

function getMatchServerConfig(host, fn, callbackIndex) {
  if ("WebSocket" in window) {
    var url = `ws://${host}`
    __fn = fn

    var ws = new WebSocket(url)
    ws.onopen = function() {
      this.send(
        JSON.stringify({
          command: 6,
          callbackIndex: callbackIndex,
        })
      )
    }
    ws.onmessage = function(event) {
      var o = JSON.parse(event.data)
      __fn(o)
    }
    ws.onclose = function() {}
    ws.onerror = function(event) {}
  } else {
    this.log("Not Support WebSocket!")
  }
}

function increaseHeight(val, cat) {
  var h = __editor.getScrollInfo().height
  if (h < 128 && val < 0) {
    logWithColor("Purple", "编辑器最小高度为：128")
    return
  }

  if (h > 628 && val > 0) {
    logWithColor("Purple", "编辑器最大高度为：628")
    return
  }

  h += val
  if (typeof localStorage != "undefined")
    localStorage.setItem("CodeMirrorHeight", h)
  __editor.setSize("100%", h)

  onResize()
}

//检查用户是否需要用户登录
function checkLogin() {
  if (__timeLimitOnly) {
    //开始计时，时间到了以后，自动跳转到登录界面
    setTimeout(function() {
      test_ac_destroy()
    }, __loginDuration * 60 * 1000)
    alert(`体验时长${__loginDuration}分钟`)
  } else {
    // let loginDataStr = localStorage.getItem("loginData");
    // if (loginDataStr) {
    //     let loginData = JSON.parse(loginDataStr);
    //     localStorage.setItem("prevURL", location.href);
    //     $.ajax({
    //         url: '/checkLogin',
    //         type: 'get',
    //         cache: false,
    //         headers: {
    //             "Authorization": "Bearer " + loginData.token
    //         },
    //         success: function (res) {
    //             if (res.code == 1) {
    //                 location.href = "login.html";
    //             }
    //             else {
    //                 //开始计时，时间到了以后，自动跳转到登录界面
    //                 setTimeout(function () {
    //                     location.href = "login.html";
    //                 }, res.duration * 60 * 1000);
    //                 alert(`用户已登录，剩余体验时长${res.duration}分钟`)
    //             }
    //         },
    //         error: function (e) {
    //             location.href = "login.html";
    //         }
    //     });
    // }
    // else
    //     location.href = "login.html";
  }
}

function init(withPlayer, withInterface) {
  //检查用户权限
  // if (location.protocol != "file:") {
  //   $.get("/getLoginInfo", function(data) {
  //     if (data.enableAuth) {
  //       __loginDuration = data.duration
  //       __timeLimitOnly = data.timeLimitOnly
  //       checkLogin()
  //     }
  //   })
  // }

  var spanVer = document.getElementById("spanVer")
  if (spanVer) spanVer.innerHTML = ` S300C${AcApiVersion}`

  // ToolTip.init({
  //   delay: 0,
  //   fadeDuration: 250,
  //   textColor: "#fff",
  //   shadowColor: "#f0fff0",
  //   fontSize: "9pt",
  //   theme: "dark",
  // })

  if (typeof CodeMirror != "undefined") {
    __editor = CodeMirror.fromTextArea(
      document.getElementById("textAreaCode"),
      {
        //定义CodeMirror代码编辑器
        lineNumbers: true,
        lineWrapping: true, // 自动换行
        styleActiveLine: true, // 当前行背景高亮
        matchBrackets: true,
        indentWithTabs: true,
        theme: "mdn-like",
        mode: "text/typescript",
      }
    )
    __editor.on("focus", function() {
      if (__isFirstClearCode) {
        __isFirstClearCode = false
        __editor.setValue("")
      }
    })

    if (typeof localStorage != "undefined") {
      let h = localStorage.getItem("CodeMirrorHeight")
      if (h) __editor.setSize("100%", h)
    }
    onResize()

    let str = ""
    str += "使用说明：\n"
    str += "    （1）此处代码编辑区域，可在此处编辑原始JSON、JS代码\n"
    str += "             或者点击左侧超链接，然后在此处修改显示的JS代码\n\n"
    str += "    （2）点击上方的增加高度、减少高度，可以调整编辑器的\n"
    str += "             大小，大小会保存，下次启动会继续有效。\n\n"
    str += '    （3）可以在"ac_conf.js"中修改WebSocket的IP、端口，\n'
    str += "            然后刷新页面生效。 或者可以在左上角修改IP、端口，\n"
    str += "             然后点击连接按钮连接到指定服务器。\n"
    str += ""
    __editor.setValue(str)
  }

  if (location.search.indexOf("ms") != -1) {
    //页面地址加参数： http://192.168.1.222/int.html?ms
    getMatchServerConfig(HostConfig.MatchServer, function(o) {
      if (o.result == 0) {
        if (withPlayer) {
          new AirCityPlayer(o.instanceId, "player", HostConfig.Token, true)
        }
        if (withInterface) {
          var ace = new AirCityCloud(o.instanceId, onReady, log)
          ace.setEventCallback(onEvent)

          //更新页面显示
          let host = AirCityCloud.getHostFromInstanceId(o.instanceId)
          if (host) {
            document.getElementById("txtIP").value = host[0]
            document.getElementById("txtPort").value = host[1]
          }
        }
      } else {
        alert("云渲染资源已满，请稍候再试")
      }
    })
  } else {
    if (withPlayer) {
      let host = HostConfig.instanceId
        ? HostConfig.instanceId
        : HostConfig.AirCityPlayer
      let acp = new AirCityPlayer(host, "player", HostConfig.Token, true, true)
      //AirCityPlayer对象增加方法enableAutoAdjustResolution，可以设置启用或关闭视频窗口缩放时
      //自动调整分辨率的功能。这个功能默认是启用的，如果想关闭此功能，可以在初始化的时候调用enableAutoAdjustResolution(false)
      //acp.enableAutoAdjustResolution(false);
    }
    if (withInterface) {
      let host = HostConfig.instanceId
        ? HostConfig.instanceId
        : HostConfig.AirCityAPI
      var ace = new AirCityCloud(host, onReady, log)
      ace.useColorLog = true
      ace.setEventCallback(onEvent)
    }
  }
}

var iReconnect = 0
function log(s, nnl) {
  // if (s.indexOf("Reconnecting...") != -1) {
  //   document.getElementById("infoPanel").className = "waiting"
  //   clearScreen()
  //   s += ++iReconnect
  // }
  // if (s.indexOf("Connected!") != -1) {
  //   iReconnect = 0
  //   document.getElementById("infoPanel").className = ""
  // }
  // var e = document.getElementById("infoPanel")
  // var notAutoClear = document.getElementById("cbNotAutoClear").checked
  // e.innerHTML += s + (nnl ? "" : "\n")
  // if (e.innerHTML.length > 1024 * 10 && !notAutoClear) e.innerHTML = ""
  // e.scrollTop = e.scrollHeight + 100
}

function logWithColor(color, text, nnl) {
  log(`<font color="${color}">${text}</font>`, nnl)
}

function clearScreen() {
  document.getElementById("infoPanel").innerHTML = ""
}

function showAllCommands() {
  clearScreen()

  var index = 0
  var count = 0
  for (var v in CommandType) count++

  var tmpCmdArr = []

  log("{")
  log("//按值排序：")
  for (var v in CommandType) {
    ++index

    if (index < count / 2) {
      log(`\t${v}: ${CommandType[v]}`)
    } else if (index == count / 2) {
      log("")
    } else {
      tmpCmdArr.push(v)
    }
  }

  log("//按名称排序：")
  tmpCmdArr.sort()
  for (var cmd of tmpCmdArr) {
    log(`\t${cmd}: ${CommandType[cmd]}`)
  }

  log("}")

  var e = document.getElementById("infoPanel")
  e.scrollTop = 0
}

function onEvent(data) {
  if (data.eventtype == "LeftMouseButtonClick") {
    if (data.Type == "TileLayer") {
      __currentTileLayerActor = {
        id: data.Id,
        objectId: data.ObjectID,
      }
    }
  }

  //for test
  let str = "OnEvent: " + data.eventtype + ", " + data.Type + ", " + data.Id
  log(str)
}

function call(fn) {
  var notExec = document.getElementById("cbNotExecute").checked
  if (!notExec) {
    try {
      fn()
    } catch (e) {
      logWithColor("red", e)
    }
  }

  var str = fn.toString()
  var n1 = str.indexOf("{")
  var n2 = str.lastIndexOf("}")
  var strBody = str.substring(n1 + 1, n2)

  __editor.setValue(strBody)
  __isFirstClearCode = false
}

function execCode() {
  var text = __editor.getValue()
  try {
    eval(text)
  } catch (e) {
    logWithColor("red", e.message)
    logWithColor("red", e.stack)
  }
}

function clearCode() {
  __editor.setValue("")
  __isFirstClearCode = false
}

function testSendJSON() {
  var text = __editor.getValue()

  try {
    var o = JSON.parse(text)
    if (!o) {
      log("JSON解析错误")
      return
    }

    __g.call(o)
  } catch (e) {
    logWithColor("red", e.message)
    logWithColor("red", e.stack)
  }
}

function onServerChanged() {
  let ip = document.getElementById("txtIP").value
  let port = document.getElementById("txtPort").value

  var exp = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
  var reg = ip.match(exp)
  if (reg != null) {
    if (/^\+?[1-9][0-9]*$/.test(port)) {
      __g.setHost(ip, port)
    }
  }
}

function onConnect() {
  let ip = document.getElementById("txtIP").value
  let port = document.getElementById("txtPort").value
  let valid = false

  var exp = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
  var reg = ip.match(exp)
  if (reg != null) {
    if (/^\+?[1-9][0-9]*$/.test(port)) {
      valid = true
    }
  }

  if (valid) {
    __g.destroy()
    __g.setHost(ip, port)
    __g.reconnect()
  } else {
    alert("IP或端口格式不正确！")
  }
}

/*-------------------------------------------------
  ac
--------------------------------------------------*/
function destroyPlayer() {
  if (__p) __p.destroy()
}

function test_ac_destroy() {
  __g.destroy()
  destroyPlayer()
}

function test_ac_quit() {
  __g.quit()
}

/*-------------------------------------------------
  camera
--------------------------------------------------*/
function test_camera_get() {
  __g.camera.get(function(response) {
    log("this is get camera callback function!")
  })
}

function test_camera_set() {
  //参数：x, y, z, heading, tilt
  __g.camera.set(-178.14, -8038.16, 250.47, 90.0, -50.0)
}

function test_camera_lookAt() {
  __distance += 200.0
  //lookAt参数：x, y, z, distance, heading, tilt
  __g.camera.lookAt(-913.18, -10852.01, 82.49, __distance, 90.0, -50.0)
}

function test_camera_lookAtBBox() {
  //[minx,miny,minz,maxx,maxy,maxz]
  let bbox = [1083.27, -12907.29, 81.79, 1308.18, -12759.77, 201.51]
  let heading = 90.0
  let tilt = -50.0
  __g.camera.lookAtBBox(bbox, heading, tilt)
}

function test_camera_playAnimation() {
  //参数：导览序号
  __g.misc.playAnimation(0)
}

function test_camera_stopAnimation() {
  __g.misc.stopAnimation()
}

/*-------------------------------------------------
  coord
--------------------------------------------------*/
let __distance = 100.0

function test_coord_screen2World() {
  __g.coord.screen2World(643.466, 392.872, (res) => {
    log("Screen2World Result: " + res.worldLocation)
  })
}

function test_coord_world2Screen() {
  __g.coord.world2Screen(-27.39, -9020.16, 82.69, (res) => {
    log("World2Screen Result: " + res.screenPosition)
  })
}

/*-------------------------------------------------
  infoTree
--------------------------------------------------*/
function test_layers_setVisibility() {
  //参数：LayerID是对象在图层树上的序号，从0开始
  let o1 = new LayerVisibleData(1, true)
  let o2 = new LayerVisibleData(2, false)
  __g.infoTree.setVisibility([o1, o2])
}

function test_layers_show() {
  __g.infoTree.show([
    "6C0888EC46B4C3D68635BF9E98628819",
    "B0D8D4AF42F9EFB9BA4B258F3A9BC410",
  ])
}

function test_layers_hide() {
  __g.infoTree.hide([
    "6C0888EC46B4C3D68635BF9E98628819",
    "B0D8D4AF42F9EFB9BA4B258F3A9BC410",
  ])
}

function test_layers_enableXRay() {
  let ids = [1, 2]
  let color = [1, 1, 1, 1]
  __g.infoTree.enableXRay(ids, color)
}

function test_layers_disableXRay() {
  let ids = [1, 2]
  __g.infoTree.disableXRay(ids)
}

function test_layers_addSomeTags() {
  let oaTags = new Array()

  for (let i = 0; i < 10; i++) {
    let o = new TagData(i)
    o.coordinate = [
      -100 + Math.random() * 250,
      -4300 + Math.random() * 250,
      5.47,
    ]
    o.imagePath = HostConfig.AbsolutePath + "/images/tag.png"
    o.imageSize = [28, 28]
    o.text = "T" + i.toString()
    oaTags.push(o)
    o.groupId = "group0"
  }

  let oaRadiation = new Array()
  for (let i = 0; i < 4; i++) {
    let o = new RadiationPointData(i)
    o.coordinate = [
      -100 + Math.random() * 250,
      -4300 + Math.random() * 250,
      5.47,
    ]
    o.radius = 50
    o.rippleNumber = 2
    o.color = [1, 0, 1, 1]
    o.brightness = 1.0
    o.groupId = "group0"
    oaRadiation.push(o)
  }

  let oaODLines = new Array()
  for (let i = 0; i < 4; i++) {
    let o = new ODLineData(i)
    o.color = [0, 0, 1, 1]
    o.coordinates = [
      [-100 + Math.random() * 250, -4300 + Math.random() * 250, 5.7],
      [-100 + Math.random() * 250, -4300 + Math.random() * 250, 5.7],
    ]
    o.flowRate = 1
    o.brightness = 0.8
    o.bendDegree = 0.5
    o.tiling = 0.5

    o.lineThickness = 2
    o.flowPointSizeScale = 5
    o.labelSizeScale = 100

    o.lineShape = 1 //ODLine模型样式 0:平面 1:柱体，默认值1
    o.lineStyle = 0 //ODLine材质样式 0:纯色 1:箭头，2:流动点，默认值0
    o.flowShape = 1 //ODLine发光点样式 0:无 1:球体，默认值0

    o.startPointShape = 0
    o.endPointShape = 0
    o.startLabelShape = 0
    o.endLabelShape = 0

    o.groupId = "group0"
    oaODLines.push(o)
  }

  let oaBeams = new Array()
  for (let i = 0; i < 2; i++) {
    let o = new BeamData(i)
    o.coordinates = [
      [-100 + Math.random() * 250, -4300 + Math.random() * 250, 8],
      [-100 + Math.random() * 250, -4300 + Math.random() * 250, 8],
      [-100 + Math.random() * 250, -4300 + Math.random() * 250, 8],
    ] //光流的polyline的坐标数组
    o.duration = 3 //光流粒子的生命周期
    o.thickness = 0.1 //光流线的宽度
    o.interval = 0.2 //光流粒子发射间隔
    o.velocity = 0.1 //光流粒子的速度
    o.color = [1, 0, 0, 1] //光流的颜色
    o.groupId = "group0"
    oaBeams.push(o)
  }

  let oaPolylines = new Array()
  for (let i = 0; i < 2; i++) {
    let o = new PolylineData(i)
    o.coordinates = [
      [-100 + Math.random() * 250, -4300 + Math.random() * 250, 8],
      [-100 + Math.random() * 250, -4300 + Math.random() * 250, 8],
      [-100 + Math.random() * 250, -4300 + Math.random() * 250, 8],
    ] //光流的polyline的坐标数组
    o.color = [0, 0, 1, 1]
    o.style = 1
    o.thickness = 15
    o.brightness = 0.8
    o.flowRate = 0.5
    o.groupId = "group0"
    oaPolylines.push(o)
  }

  let oaPolygons = new Array()
  for (let i = 0; i < 4; i++) {
    let o = new PolygonData(i)
    o.coordinates = [
      [-100 + Math.random() * 100, -4300 + Math.random() * 100, 8],
      [-100 + Math.random() * 100, -4300 + Math.random() * 100, 8],
      [-100 + Math.random() * 100, -4300 + Math.random() * 100, 8],
    ] //光流的polyline的坐标数组
    o.color = Color.Green //多边形的填充颜色
    o.frameThickness = 1
    o.groupId = "group0"
    oaPolygons.push(o)
  }

  __g.tag.clear()
  __g.polyline.clear()
  __g.odline.clear()
  __g.beam.clear()
  __g.radiationPoint.clear()
  __g.polygon.clear()

  __g.tag.add(oaTags)
  __g.polyline.add(oaPolylines)
  __g.odline.add(oaODLines)
  __g.beam.add(oaBeams)
  __g.radiationPoint.add(oaRadiation)
  __g.polygon.add(oaPolygons)

  __g.camera.set(-13.01, -4138.65, 304.78, -78, -83, 0)
}

function test_layers_showByGroupId() {
  __g.infoTree.showByGroupId("group0")
}

function test_layers_hideByGroupId() {
  __g.infoTree.hideByGroupId("group0")
}

function test_layers_highlightByGroupId() {
  __g.infoTree.highlightByGroupId("group0")
}

function test_layers_deleteByGroupId() {
  __g.infoTree.deleteByGroupId("group0")
}

function test_layers_get() {
  __g.infoTree.get((response) => {
    let str = response.infotree
    let o = JSON.parse(str)
    log(JSON.stringify(o))
  })
}

/*-------------------------------------------------
  cameraTour
--------------------------------------------------*/
function test_cameraTour_add() {
  let frames = []
  frames.push(
    new CameraTourKeyFrame(
      0,
      1.0,
      [-1232.84, 443.71, 2667.01],
      [-27.69, -65.72, 0]
    )
  )
  frames.push(
    new CameraTourKeyFrame(
      1,
      4.0,
      [3730.99, -2971.31, 1653.13],
      [-28.95, -112.0, 0]
    )
  )
  frames.push(
    new CameraTourKeyFrame(
      2,
      8.0,
      [1633.73, -8339.78, 921.05],
      [-28.9, -112.01, 0]
    )
  )
  frames.push(
    new CameraTourKeyFrame(
      3,
      12.0,
      [3175.11, -8883.62, 1080.79],
      [-33.78, -112, 0]
    )
  )

  let o = new CameraTourData("1", "test", 20, frames)
  __g.cameraTour.add(o)
}

function test_cameraTour_update() {}

function test_cameraTour_play() {
  __g.cameraTour.play("1")
}

function test_cameraTour_stop() {
  __g.cameraTour.stop("1")
}

function test_cameraTour_delete() {
  __g.cameraTour.delete("1")
}

/*-------------------------------------------------
  tileLayer
--------------------------------------------------*/
function test_tileLayer_add() {
  let location = [0, 0, 0]
  let rotation = [0, 0, 0]
  let scale = [1, 1, 1]
  let fileName = HostConfig.AbsolutePath + "\\media\\SDKDemo.3dt"
  let o = new TileLayerData("1", fileName, location, rotation, scale)
  __g.tileLayer.add(o)
}

function test_tileLayer_update() {
  __g.tileLayer.setTranslation("1", [100, 0, 0])
}

function test_tileLayer_delete() {
  __g.tileLayer.delete("1")
}

function test_tileLayer_focus() {
  __g.tileLayer.focus("1")
}

function test_tileLayer_show() {
  __g.tileLayer.show(__currentTileLayerActor.id)
}

function test_tileLayer_hide() {
  __g.tileLayer.hide(__currentTileLayerActor.id)
}

function test_tileLayer_enableXRay() {
  __g.tileLayer.enableXRay(__currentTileLayerActor.id, [1, 0, 1, 0.0381])
}

function test_tileLayer_disableXRay() {
  __g.tileLayer.disableXRay(__currentTileLayerActor.id)
}

function test_tileLayer_get() {
  __g.tileLayer.get("1")
}

function test_tileLayer_actor_check() {
  if (!__currentTileLayerActor) {
    logWithColor("red", "请先点选一个TileLayer Actor，再执行此操作")
    return false
  }
  return true
}

function test_tileLayer_actor_show() {
  if (test_tileLayer_actor_check())
    __g.tileLayer.showActor(
      __currentTileLayerActor.id,
      __currentTileLayerActor.objectId
    )
}

function test_tileLayer_actor_hide() {
  if (test_tileLayer_actor_check())
    __g.tileLayer.hideActor(
      __currentTileLayerActor.id,
      __currentTileLayerActor.objectId
    )
}

function test_tileLayer_actor_focus() {
  if (test_tileLayer_actor_check())
    __g.tileLayer.focusActor(
      __currentTileLayerActor.id,
      __currentTileLayerActor.objectId
    )
}

function test_tileLayer_actor_highlight() {
  if (test_tileLayer_actor_check())
    __g.tileLayer.highlightActor(
      __currentTileLayerActor.id,
      __currentTileLayerActor.objectId
    )
}

function test_tileLayer_actor_stopHighlight() {
  __g.tileLayer.stopHighlightActor()
}

function test_tileLayer_actor_showAllActors() {
  __g.tileLayer.showAllActors(__currentTileLayerActor.id)
}

function test_tileLayer_actor_hideAllActors() {
  __g.tileLayer.hideAllActors(__currentTileLayerActor.id)
}

function test_tileLayer_actor_enableClip() {
  __g.tileLayer.enableClip(__currentTileLayerActor.id)
}

function test_tileLayer_actor_disableClip() {
  __g.tileLayer.disableClip(__currentTileLayerActor.id)
}

function test_tileLayer_actor_setStyle() {
  let style = 3 //样式， 0：默认；1：X光；2：纯色；3：水晶体
  __g.tileLayer.setStyle(__currentTileLayerActor.id, style, Color.Red)
}

/*-------------------------------------------------
  tag
--------------------------------------------------*/
function test_tag_add() {
  //标签的ID，字符串值，也可以用数字（内部会自动转成字符串）
  let id = "p1"

  //坐标值：标签添加的位置
  let coord = [-178.14, -8038.16, 5.47]

  //图片路径，有3种格式：1）本地路径，2）网络路径，3）BASE64
  let imagePath = HostConfig.AbsolutePath + "/images/tag.png"
  //let imagePath = 'data:image/png;base64,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';

  //鼠标点击标签后弹出的网页的URL，也可以是本地视频文件，鼠标点击标签后会弹出视频播放窗口
  let url = HostConfig.AbsolutePath + "/int_popup.html"

  //图片的尺寸
  let imageSize = [28, 28]

  //标签显示的文字
  let text = "北京银行"

  //标签和文字的可见范围
  let range = [1, 8000.0]
  let textRange = 200

  //标签下方是否显示垂直牵引线
  let showLine = true

  let o = new TagData(
    id,
    coord,
    imagePath,
    imageSize,
    url,
    text,
    range,
    showLine
  )
  //设置文字颜色、背景颜色、
  o.textColor = Color.Black
  o.textBackgroundColor = Color.White
  o.textRange = textRange

  //鼠标悬停时的替换图片
  o.hoverImagePath = HostConfig.AbsolutePath + "/images/hilightarea.png"

  __g.tag.add(o)

  let o2 = o
  o2.id = "p2"
  o2.text = "招商银行"
  o2.coordinate[0] = -200
  __g.tag.add(o2)
}

function test_tag_update() {
  let id = "p1" //标签的ID，必须是之前已经创建过的标签才能Update，如果当前没有就忽略
  let coord = [-178.14, -8038.16, 5.47]
  let imagePath =
    "data:image/png;base64,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"
  let url = HostConfig.AbsolutePath + "/int_popup.html"
  let imageSize = [28, 28]
  let text = "北京银行"
  let range = [1, 8000.0]
  let showLine = false

  let o = new TagData(
    id,
    coord,
    imagePath,
    imageSize,
    url,
    text,
    range,
    showLine
  )
  o.textColor = Color.Blue
  o.textBackgroundColor = Color.Yellow

  __g.tag.update(o)
}

function test_tag_focus() {
  __g.tag.focus("p1")
}

function test_tag_focusAll() {
  __g.tag.focusAll()
}

function test_tag_show() {
  __g.tag.show("p1")
}

function test_tag_showAll() {
  __g.tag.showAll()
}

function test_tag_hideAll() {
  __g.tag.hideAll()
}

function test_tag_hide() {
  __g.tag.hide(["p1"])
}

function test_tag_clear() {
  __g.tag.clear()
}

function test_tag_delete() {
  __g.tag.delete(["p1", "p2"])
}

function test_tag_showPopupWindow() {
  __g.tag.showPopupWindow("p1")
}

function test_tag_hidePopupWindow() {
  __g.tag.hidePopupWindow("p1")
}

function test_tag_showAllPopupWindow() {
  __g.tag.showAllPopupWindow()
}

function test_tag_hideAllPopupWindow() {
  __g.tag.hideAllPopupWindow()
}

function test_tag_setCoordinate() {
  __g.tag.setCoordinate("p1", [-500.14, -8038.16, 5.47], () => {
    __g.tag.focus("p1")
  })
}

function test_tag_setImagePath() {
  let path = HostConfig.AbsolutePath + "/images/ctag.png"
  __g.tag.setImagePath("p1", path)
}

function test_tag_setImageSize() {
  __g.tag.setImageSize("p1", [64, 64])
}

function test_tag_setURL() {
  __g.tag.setURL("p1", "http://www.163.com")
}

function test_tag_setText() {
  __g.tag.setText("p1", "北京欢迎你")
}

function test_tag_setRange() {
  __g.tag.setRange("p1", [1, 300])
}

function test_tag_setTextColor() {
  __g.tag.setTextColor("p1", Color.Blue)
}

function test_tag_setTextBackgroundColor() {
  __g.tag.setTextBackgroundColor("p1", Color.Yellow)
}

function test_tag_setTextBorderColor() {
  __g.tag.setTextBorderColor("p1", Color.Red)
}

function test_tag_setShowLine() {
  __g.tag.setShowLine("p1", false)
}

function test_tag_get() {
  __g.tag.get("p1", (data) => {
    let str = `Get tag data result: \n id: ${data.id} \n text: ${data.text}`
    log(str)
  })

  __g.tag.get(["p1", "p2"], (dataArr) => {
    let o1 = dataArr["p1"]
    let o2 = dataArr["p2"]
    let str = `Get tag data result: \n id: ${o1.id} \n text: ${o1.text}`
    str += `\n id: ${o2.id} \n text: ${o2.text}`
    log(str)
  })
}

var __canvas

function test_tag_add_canvas() {
  __g.tag.delete("canvas_tag1")

  // 生成图片
  if (!__canvas) __canvas = document.createElement("canvas")

  let img = new Image()
  img.src = __base64_tagBg
  img.onload = () => {
    __canvas.width = img.width
    __canvas.height = img.height

    var ctx = __canvas.getContext("2d")
    ctx.drawImage(img, 0, 0)
    ctx.fillStyle = "#fff"
    ctx.font = "36px Bold Verdana"
    ctx.textBaseline = "middle"
    ctx.fillText("农村商业银行", 60, 50)

    let o = new TagData("canvas_tag1")
    o.coordinate = [5036.56, -4504.51, 370.19]
    o.imagePath = __canvas.toDataURL("image/jpg")
    o.imageSize = [165, 63]
    o.text = ""
    o.url = HostConfig.AbsolutePath + "/int_popup.html"
    o.range = [1, 8000.0]
    __g.tag.add(o, () => {
      __g.tag.focus("canvas_tag1")
    })
  }
}

/*-------------------------------------------------
  customTag
--------------------------------------------------*/
function test_ctag_add() {
  let id = "ct1"
  let coord = [-178.14, -8038.16, 5.47]
  let page =
    HostConfig.AbsolutePath +
    "/int_custom_tag.html?icon=images/ctag1.png&title=北医三院&address=海淀区花园北路"
  let contentWeb = new WebUIData(page, 220, 52)
  let popupWeb = new WebUIData(
    HostConfig.AbsolutePath + "/int_popup.html",
    600,
    480
  )
  let pivot = [0.5, 0.5]
  let range = [1, 5000]
  let o = new CustomTagData(id, coord, contentWeb, popupWeb, pivot, range)
  __g.ctag.add(
    o /*, __g.camera.lookAt(-178.14, -8038.16, 5.47, 1200, 90.0, -50.0)*/
  )
}

function test_ctag_update() {
  let id = "ct1"
  let coord = [-178.14, -8038.16, 5.47]
  let page =
    HostConfig.AbsolutePath +
    "/int_custom_tag.html?icon=images/ctag2.png&title=北京银行&address=朝阳区外馆斜街"
  let contentWeb = new WebUIData(page, 220, 52)
  let popupWeb = new WebUIData(
    HostConfig.AbsolutePath + "/int_popup.html",
    600,
    480
  )
  let pivot = [0.5, 0.5]
  let range = [1, 5000]
  let o = new CustomTagData(id, coord, contentWeb, popupWeb, pivot, range)
  __g.ctag.update(o)
}

function test_ctag_delete() {
  __g.ctag.delete("ct1")
}

function test_ctag_clear() {
  __g.ctag.clear()
}

function test_ctag_focus() {
  __g.ctag.focus("ct1")
}

function test_ctag_focusAll() {
  __g.ctag.focusAll()
}

function test_ctag_show() {
  __g.ctag.show("ct1")
}

function test_ctag_hide() {
  __g.ctag.hide("ct1")
}

function test_ctag_showAll() {
  __g.ctag.showAll()
}

function test_ctag_hideAll() {
  __g.ctag.hideAll()
}

function test_ctag_get() {
  __g.ctag.get("ct1")
}

/*-------------------------------------------------
  polyline
--------------------------------------------------*/
function test_polyline_add() {
  let coords = [
    [872.16, -9485.86, 5.8],
    [864.77, -9196.58, 5.7],
    [624.34, -9209.29, 6.05],
    [482.58, -9373.57, 7.38],
  ]
  let color = Color.Red
  let style = 1
  let thickness = 150
  let brightness = 0.8
  let flowRate = 0.5
  let o = new PolylineData(
    "p1",
    color,
    coords,
    style,
    thickness,
    brightness,
    flowRate
  )
  o.depthTest = false
  __g.polyline.add(o)
}

function test_polyline_update() {
  __g.polyline.updateBegin()
  __g.polyline.setStyle("p1", 4)
  __g.polyline.setColor("p1", Color.Yellow)
  __g.polyline.setThickness("p1", 10)
  __g.polyline.setBrightness("p1", 0.5)
  __g.polyline.setFlowRate("p1", 0.8)
  __g.polyline.setDepthTest("p1", true)
  __g.polyline.updateEnd()
}

function test_polyline_delete() {
  __g.polyline.delete("p1")
}

function test_polyline_clear() {
  __g.polyline.clear()
}

function test_polyline_focus() {
  __g.polyline.focus("p1")
}

function test_polyline_show() {
  __g.polyline.show("p1")
}

function test_polyline_showAll() {
  __g.polyline.showAll()
}

function test_polyline_hide() {
  __g.polyline.hide("p1")
}

function test_polyline_hideAll() {
  __g.polyline.hideAll()
}

function test_polyline_highlight() {}

function test_polyline_get() {
  __g.polyline.get("p1")
}

/*-------------------------------------------------
  odline
--------------------------------------------------*/
function test_odline_add() {
  let o = new ODLineData("od1")
  o.color = Color.Green
  o.coordinates = [
    [-133.82, -8531.6, 5.7],
    [2102.68, -8574.97, 5.7],
  ]
  o.flowRate = 1
  o.brightness = 10
  o.bendDegree = 0.5
  o.tiling = 0.5

  o.lineThickness = 15
  o.flowPointSizeScale = 30
  o.labelSizeScale = 1000

  o.lineShape = 1 //ODLine模型样式 0:平面 1:柱体，默认值1
  o.lineStyle = 0 //ODLine材质样式 0:纯色 1:箭头，2:流动点，默认值0
  o.flowShape = 1 //ODLine发光点样式 0:无 1:球体，默认值0

  o.startPointShape = 1
  o.endPointShape = 1
  o.startLabelShape = 1
  o.endLabelShape = 1

  __g.odline.add(o)
}

function test_odline_update() {
  let o = new ODLineData("od1")
  o.color = [1, 0, 1, 1]
  o.coordinates = [
    [-133.82, -8531.6, 5.7],
    [2102.68, -8574.97, 5.7],
  ]
  o.flowRate = 1
  o.brightness = 0.8
  o.bendDegree = 0.5
  o.tiling = 1.0

  o.lineThickness = 15
  o.flowPointSizeScale = 50
  o.labelSizeScale = 100

  o.lineShape = 1 //ODLine模型样式 0:平面 1:柱体，默认值1
  o.lineStyle = 2 //ODLine材质样式 0:纯色 1:箭头，2:流动点，默认值0
  o.flowShape = 1 //ODLine发光点样式 0:无 1:球体，默认值0

  o.startPointShape = 1
  o.endPointShape = 1
  o.startLabelShape = 0
  o.endLabelShape = 0

  __g.odline.update(o)
}

function test_odline_delete() {
  __g.odline.delete("od1")
}

function test_odline_clear() {
  __g.odline.clear()
}

function test_odline_focus() {
  __g.odline.focus("od1")
}

function test_odline_show() {
  __g.odline.show("od1")
}

function test_odline_showAll() {
  __g.odline.showAll()
}

function test_odline_hide() {
  __g.odline.hide("od1")
}

function test_odline_hideAll() {
  __g.odline.hideAll()
}

function test_odline_get() {
  __g.odline.get("od1")
}

/*-------------------------------------------------
  polygon
--------------------------------------------------*/
function test_polygon_add() {
  let coords1 = [
    [2084.75, -8474.21, 5.7],
    [2133.45, -8556.37, 5.7],
    [2278.18, -8436.39, 5.7],
    [2152.5, -8361.8, 5.7],
  ]

  let coords2 = [
    [
      [9665.22, -11366.88, 5.7],
      [9765.4, -4511.22, 5.7],
      [4155.2, -4036.94, 5.7],
      [3098, -11010.32, 5.7],
      [6445.79, -12717.28, 6.78],
    ],
    [
      [8706.9, -9457.89, 5.7],
      [8824.84, -8055.4, 6.64],
      [7619.37, -8859.47, 6.72],
    ],
    [
      [5744.8, -7795.59, 5.7],
      [6205.21, -5724.74, 5.7],
      [4460.01, -5839.38, 6.05],
      [3966.28, -7712.46, 7.17],
    ],
  ]

  let coords3 = [
    //part1
    [
      [
        [9665.22, -11366.88, 5.7],
        [9765.4, -4511.22, 5.7],
        [4155.2, -4036.94, 5.7],
        [3098, -11010.32, 5.7],
        [6445.79, -12717.28, 6.78],
      ],
      [
        [8706.9, -9457.89, 5.7],
        [8824.84, -8055.4, 6.64],
        [7619.37, -8859.47, 6.72],
      ],
      [
        [5744.8, -7795.59, 5.7],
        [6205.21, -5724.74, 5.7],
        [4460.01, -5839.38, 6.05],
        [3966.28, -7712.46, 7.17],
      ],
    ],

    //part2
    [
      [
        [-4477.25, -4353.11, 5.7],
        [-1803.2, -6744.65, 5.7],
        [-562.18, -4590.14, 5.7],
        [-2271.85, -2595.33, 5.7],
      ],
      [
        [-2867.3, -4342.53, 5.7],
        [-2381.34, -5043.33, 5.7],
        [-1723.21, -4566.1, 6.25],
        [-1938.83, -3757.59, 5.7],
      ],
    ],
  ]

  let color = [0, 0, 1, 1] //多边形的填充颜色
  let frameColor = Color.Red
  let frameThickness = 10
  let o = new PolygonData("1", color, coords1, frameColor, frameThickness)
  o.depthTest = false
  __g.polygon.add(o)
}

function test_polygon_update() {
  let coords = [
    [
      [2084.75, -8474.21, 5.7],
      [2133.45, -8556.37, 5.7],
      [2270.38, -8499.91, 5.7],
      [2278.18, -8436.39, 5.7],
      [2152.5, -8361.8, 5.7],
    ],
    [
      [2188.48, -8418.16, 7.42],
      [2168.73, -8461.96, 6.75],
      [2199.68, -8475.66, 8.66],
      [2215.46, -8446.06, 8.47],
    ],
  ]
  let color = Color.Yellow
  let o = new PolygonData("1", color, coords)
  o.depthTest = false
  __g.polygon.update(o)
}

function test_polygon_glow() {
  let ids = ["1", "2"]
  let duration = 2
  __g.polygon.glow(ids, duration)
}

function test_polygon_highlight() {
  let ids = ["1", "2"]
  __g.polygon.highlight(ids)
}

function test_polygon_delete() {
  let ids = ["1", "2"]
  __g.polygon.delete(ids)
}

function test_polygon_clear() {
  __g.polygon.clear()
}

function test_polygon_focus() {
  __g.polygon.focus("1")
}

function test_polygon_show() {
  let ids = ["1", "2"]
  __g.polygon.show(ids)
}

function test_polygon_hide() {
  let ids = ["1", "2"]
  __g.polygon.hide(ids)
}

function test_polygon_get() {
  __g.polygon.get("1")
}

/*-------------------------------------------------
  polygon3d
--------------------------------------------------*/
function test_polygon3d_add(fn) {
  let coords = [
    [9665.22, -11366.88, 5.7],
    [9765.4, -4511.22, 5.7],
    [4155.2, -4036.94, 5.7],
    [3098, -11010.32, 5.7],
    [6445.79, -12717.28, 6.78],
  ]
  let color = [1, 0, 1, 1] //颜色值
  let height = 500 //3D多边形的高度
  let intensity = 4.0 //亮度
  let type = 1 //3DPolygon的样式
  let o = new Polygon3DData("1", type, coords, color, height, intensity)
  __g.polygon3d.add(o, fn)
}

function test_polygon3d_update() {
  let coords = [
    //part1
    [
      [
        [9665.22, -11366.88, 5.7],
        [9765.4, -4511.22, 5.7],
        [4155.2, -4036.94, 5.7],
        [3098, -11010.32, 5.7],
        [6445.79, -12717.28, 6.78],
      ],
      [
        [8706.9, -9457.89, 5.7],
        [8824.84, -8055.4, 6.64],
        [7619.37, -8859.47, 6.72],
      ],
      [
        [5744.8, -7795.59, 5.7],
        [6205.21, -5724.74, 5.7],
        [4460.01, -5839.38, 6.05],
        [3966.28, -7712.46, 7.17],
      ],
    ],

    //part2
    [
      [
        [-4477.25, -4353.11, 5.7],
        [-1803.2, -6744.65, 5.7],
        [-562.18, -4590.14, 5.7],
        [-2271.85, -2595.33, 5.7],
      ],
      [
        [-2867.3, -4342.53, 5.7],
        [-2381.34, -5043.33, 5.7],
        [-1723.21, -4566.1, 6.25],
        [-1938.83, -3757.59, 5.7],
      ],
    ],
  ]
  let color = [1, 1, 0, 1] //颜色值
  let height = 300 //3D多边形的高度
  let intensity = 3.0 //亮度
  let type = 1
  let o = new Polygon3DData("1", type, coords, color, height, intensity)
  __g.polygon3d.update(o)
}

function test_polygon3d_delete() {
  let ids = ["0", "1"]
  __g.polygon3d.delete(ids)
}

function test_polygon3d_clear() {
  __g.polygon3d.clear()
}

function test_polygon3d_glow() {
  let ids = ["0", "1"]
  let duration = 2
  __g.polygon3d.glow(ids, duration)
}

function test_polygon3d_highlight() {
  let ids = ["0", "1"]
  __g.polygon3d.highlight(ids)
}

function test_polygon3d_focus() {
  __g.polygon3d.focus("1")
}

function test_polygon3d_show() {
  __g.polygon3d.show("1")
}

function test_polygon3d_hide() {
  __g.polygon3d.hide("1")
}

function test_polygon3d_get() {
  __g.polygon3d.get("1")
}

/*-------------------------------------------------
  heatmap
--------------------------------------------------*/
function getRandNumBetween(min, max) {
  return Math.round((Math.random() * (max - min) + min) * 10) / 10
}

var __tidUpdateHeatMap = undefined

function test_heatmap_add() {
  clearInterval(__tidUpdateHeatMap)
  __g.tag.clear(
    __g.heatmap.clear(() => {
      {
        let bbox = [1083.27, -12907.29, -10, 1308.18, -12759.77, 201.51]
        let range = [0, 100]
        let data = []
        let tagData = []
        for (let i = 0; i < 100; i++) {
          let x = getRandNumBetween(bbox[0], bbox[3]) //minX ~ maxX
          let y = getRandNumBetween(bbox[1], bbox[4]) //minY ~ maxY
          let z = 0
          let coord = [x, y, z] //热力点的坐标
          let radius = Math.random() * 40 //热力点影像半径范围
          let heatValue = Math.random() * 100 //热力值
          let o = new HeatMapPointData(`${i}`, coord, radius, heatValue)
          data.push(o)
        }
        __g.tag.add(tagData)
        __g.heatmap.add("heatmap1", bbox, range, data)
      }

      {
        let bbox = [1383.27, -12607.29, -700, 1608.18, -12459.77, 501.51]
        let range = [0, 100]
        let data = []
        let tagData = []
        for (let i = 0; i < 100; i++) {
          let x = getRandNumBetween(bbox[0], bbox[3]) //minX ~ maxX
          let y = getRandNumBetween(bbox[1], bbox[4]) //minY ~ maxY
          let z = 0
          let coord = [x, y, z] //热力点的坐标
          {
            //添加热力点定位标签
            let imagePath =
              "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1816424559,1043488893&fm=26&gp=0.jpg"
            tagData.push(
              new TagData(
                `${i}`,
                coord,
                imagePath,
                [28, 28],
                "",
                "",
                [1, 8000.0],
                false
              )
            )
          }
          let radius = Math.random() * 40 //热力点影像半径范围
          let heatValue = Math.random() * 100 //热力值
          let o = new HeatMapPointData(`${i}`, coord, radius, heatValue)
          data.push(o)
        }
        __g.tag.add(tagData)
        __g.heatmap.add("heatmap2", bbox, range, data)
      }
    })
  )
}

function test_heatmap_update() {
  __tidUpdateHeatMap = setInterval(() => {
    let data = []
    for (let i = 0; i < 100; i++) {
      let o = {}
      o.id = `${i}`
      o.heatValue = Math.random() * 100
      data.push(o)
    }
    __g.heatmap.update("heatmap1", null, null, data)
  }, 1000)
}

function test_heatmap_delete() {
  clearInterval(__tidUpdateHeatMap)
  __g.heatmap.delete("heatmap1")
}

function test_heatmap_clear() {
  clearInterval(__tidUpdateHeatMap)
  __g.tag.clear()
  __g.heatmap.clear()
}

function test_heatmap_focus() {
  __g.heatmap.focus("heatmap1", 100)
}

function test_heatmap_show() {
  __g.heatmap.show("heatmap1")
}

function test_heatmap_hide() {
  __g.heatmap.hide("heatmap1")
}

function test_heatmap_get() {
  __g.heatmap.get("heatmap1")
}

/*-------------------------------------------------
  beam
--------------------------------------------------*/
function test_beam_add() {
  let o1, o2
  {
    let coords = [
      [-178, -8040, 8],
      [958, -7980, 8],
      [-198, -7340, 8],
    ] //光流的polyline的坐标数组
    let duration = 3 //光流粒子的生命周期
    let thickness = 0.8 //光流线的宽度
    let interval = 0.5 //光流粒子发射间隔
    let velocity = 5 //光流粒子的速度
    let color = [1, 0, 0, 1] //光流的颜色
    o1 = new BeamData(
      "1",
      duration,
      thickness,
      interval,
      velocity,
      color,
      coords
    )
  }
  {
    let coords = [
      [207300, -330000, 140000],
      [587600, -330000, 140000],
      [597600, -524400, 140000],
    ]
    let duration = 4
    let thickness = 0.5
    let interval = 2
    let velocity = 4
    let color = [0, 0, 1]
    o2 = new BeamData(
      "2",
      duration,
      thickness,
      interval,
      velocity,
      color,
      coords
    )
  }
  __g.beam.add([o1, o2])
}

function test_beam_update() {
  let o1, o2
  {
    let coords = [
      [-178, -8040, 8],
      [958, -7980, 8],
      [-198, -7340, 8],
    ]
    let duration = 5
    let thickness = 3
    let interval = 0.2
    let velocity = 5
    let color = Color.Blue
    o1 = new BeamData(
      "1",
      duration,
      thickness,
      interval,
      velocity,
      color,
      coords
    )
  }
  {
    let coords = [
      [207300, -330000, 140000],
      [587600, -330000, 140000],
      [597600, -524400, 140000],
    ]
    let duration = 5
    let thickness = 1
    let interval = 2
    let velocity = 4
    let color = [0, 0, 1]
    o2 = new BeamData(
      "2",
      duration,
      thickness,
      interval,
      velocity,
      color,
      coords
    )
  }
  __g.beam.update([o1, o2])
}

function test_beam_delete() {
  let ids = ["0", "1"]
  __g.beam.delete(ids)
}

function test_beam_focus() {
  __g.beam.focus("1")
}

function test_beam_clear() {
  __g.beam.clear()
}

function test_beam_get() {
  __g.beam.get(["1", "2"])
}

function test_beam_setThickness() {
  __g.beam.setThickness("1", 5)
}

/*-------------------------------------------------
  highlightArea
--------------------------------------------------*/
function test_highlightArea_add() {
  let coords3 = [
    //part1
    [
      [
        [9665.22, -11366.88, 5.7],
        [9765.4, -4511.22, 5.7],
        [4155.2, -4036.94, 5.7],
        [3098, -11010.32, 5.7],
        [6445.79, -12717.28, 6.78],
      ],
      [
        [8706.9, -9457.89, 5.7],
        [8824.84, -8055.4, 6.64],
        [7619.37, -8859.47, 6.72],
      ],
      [
        [5744.8, -7795.59, 5.7],
        [6205.21, -5724.74, 5.7],
        [4460.01, -5839.38, 6.05],
        [3966.28, -7712.46, 7.17],
      ],
    ],

    //part2
    [
      [
        [-4477.25, -4353.11, 5.7],
        [-1803.2, -6744.65, 5.7],
        [-562.18, -4590.14, 5.7],
        [-2271.85, -2595.33, 5.7],
      ],
      [
        [-2867.3, -4342.53, 5.7],
        [-2381.34, -5043.33, 5.7],
        [-1723.21, -4566.1, 6.25],
        [-1938.83, -3757.59, 5.7],
      ],
    ],
  ]

  let color = [1, 0, 0, 0.8] //多边形高亮颜色
  let heightRange = [0.0, 100.0] //高亮染色区域可以限定一个高度范围，也就是Z坐标的区间，只有Z值这这个区间的模型才会被染色
  let intensity = 5.0 //高亮颜色的强度
  let o = new HighlightAreaData("1", coords3, color, heightRange, intensity)
  __g.highlightArea.add(o)
}

function test_highlightArea_delete() {
  __g.highlightArea.delete("1")
}

function test_highlightArea_update() {
  let coords = [
    [
      [9665.22, -11366.88, 5.7],
      [9765.4, -4511.22, 5.7],
      [4155.2, -4036.94, 5.7],
      [3098, -11010.32, 5.7],
      [6445.79, -12717.28, 6.78],
    ],
    [
      [8706.9, -9457.89, 5.7],
      [8824.84, -8055.4, 6.64],
      [7619.37, -8859.47, 6.72],
    ],
  ]
  let color = [1, 0, 1, 0.5]
  let heightRange = [0.0, 200.0]
  let intensity = 8.0
  let o = new HighlightAreaData("1", coords, color, heightRange, intensity)
  __g.highlightArea.update(o)
}

function test_highlightArea_clear() {
  __g.highlightArea.clear()
}

function test_highlightArea_focus() {
  __g.highlightArea.focus("1")
}

function test_highlightArea_show() {
  __g.highlightArea.show("1")
}

function test_highlightArea_hide() {
  __g.highlightArea.hide("1")
}

function test_highlightArea_get() {
  __g.highlightArea.get("1")
}

/*-------------------------------------------------
  radiationPoint
--------------------------------------------------*/
function test_radiationPoint_add() {
  let coordinate = [-178.14, -8038.16, 5.47]
  let radius = 300
  let rippleNumber = 2
  let color = [1, 0, 1, 1]
  let brightness = 0.8
  let o = new RadiationPointData(
    "1",
    coordinate,
    radius,
    rippleNumber,
    color,
    brightness
  )
  __g.radiationPoint.add(o)
}

function test_radiationPoint_update() {
  let coordinate = [-178.14, -8038.16, 5.47]
  let radius = 300
  let rippleNumber = 2
  let color = [1, 0, 0, 1]
  let brightness = 0.5
  let o = new RadiationPointData(
    "1",
    coordinate,
    radius,
    rippleNumber,
    color,
    brightness
  )
  __g.radiationPoint.update(o)
}

function test_radiationPoint_delete() {
  let ids = ["0", "1"]
  __g.radiationPoint.delete(ids)
}

function test_radiationPoint_clear() {
  __g.radiationPoint.clear()
}

function test_radiationPoint_focus() {
  __g.radiationPoint.focus("1")
}

function test_radiationPoint_focusAll() {
  __g.radiationPoint.focusAll()
}

function test_radiationPoint_hide() {
  __g.radiationPoint.hide("1")
}

function test_radiationPoint_show() {
  __g.radiationPoint.show("1")
}

function test_radiationPoint_get() {
  __g.radiationPoint.get("1")
}

/*-------------------------------------------------
  customObject
--------------------------------------------------*/
let __co_location
function test_customObject_add() {
  let pakFilePath = HostConfig.AbsolutePath + "/media/test.pak"
  let assetPath = "/Game/Common/Asset_Bank/Mesh/Car/BP_Car_JiuHuChe"
  __co_location = [-148.14, -7370.16, 9.47]
  let rotation = [0, 0, 0]
  let scale = [1, 1, 1]
  let smoothMotion = 0 //1: 平滑插值，0: 跳跃
  let o = new CustomObjectData(
    "o1",
    pakFilePath,
    assetPath,
    __co_location,
    rotation,
    scale,
    smoothMotion
  )
  __g.customObject.add(o)
}

function test_customObject_update() {
  test_customObject_setPos()
}

function test_customObject_delete() {
  __g.customObject.delete("o1")
}

function test_customObject_focus() {
  __g.customObject.focus("o1", 30)
}

function test_customObject_show() {
  __g.customObject.show("o1")
}

function test_customObject_hide() {
  __g.customObject.hide("o1")
}

function test_customObject_get() {
  __g.customObject.get("o1")
}

function test_customObject_setPos() {
  __co_location[0] += 5.0
  __g.customObject.setLocation("o1", __co_location, test_customObject_focus)
}

var __co_scale = [1, 1, 1]
function test_customObject_setScale() {
  __co_scale[0] += 0.2
  __co_scale[1] += 0.2
  __co_scale[2] += 0.2
  __g.customObject.setScale("o1", __co_scale)
}

/*-------------------------------------------------
  videoProjection
--------------------------------------------------*/
function test_vp_add() {
  let o = new VideoProjectionData()
  o.id = "vp1"
  o.videoURL = HostConfig.AbsolutePath + "/media/traffic.mov"
  o.location = [66.14, -7288.16, 9.47]
  o.rotation = [-50, 0, 0]
  o.fov = 90
  o.aspectRatio = 1.77
  o.distance = 100
  __g.vp.add(o)
}

function test_vp_update() {
  let o = new VideoProjectionData()
  o.id = "vp1"
  o.videoURL = HostConfig.AbsolutePath + "/media/traffic.mov"
  o.location = [66.14, -7288.16, 9.47]
  o.rotation = [-50, 0, 0]
  o.fov = 90
  o.aspectRatio = 2
  o.distance = 100
  __g.vp.update(o)
}

function test_vp_focus() {
  __g.vp.focus("vp1")
}

function test_vp_show() {
  __g.vp.show("vp1")
}

function test_vp_hide() {
  __g.vp.hide("vp1")
}

function test_vp_get() {
  __g.vp.get("vp1")
}

function test_vp_delete() {
  __g.vp.delete("vp1")
}

/*-------------------------------------------------
  panorama
--------------------------------------------------*/
function test_panorama_add() {
  let o = new PanoramaData(
    "p1",
    HostConfig.AbsolutePath + "/media/panorama.jpg",
    [4440.45, 3741.73, 100],
    75
  )
  __g.panorama.add(o)
}

function test_panorama_update() {
  let o = new PanoramaData(
    "p1",
    HostConfig.AbsolutePath + "/media/panorama-1.jpg",
    [4440.45, 3741.73, 100],
    75
  )
  __g.panorama.update(o)
}

function test_panorama_delete() {
  __g.panorama.delete("p1")
}

function test_panorama_clear() {
  __g.panorama.clear()
}

function test_panorama_focus() {
  __g.panorama.focus("p1")
}

function test_panorama_get() {
  __g.panorama.get("p1")
}

/*-------------------------------------------------
  decal
--------------------------------------------------*/
function test_decal_add() {
  let o = new DecalData("d1")
  o.order = 1
  o.texturePath = HostConfig.AbsolutePath + "/media/decal.jpg"
  o.location = [66.14, -7288.16, 9.47]
  o.rotation = [-90, 180, 0]
  o.scale = [1, 1, 1]
  __g.decal.add(o)
}

function test_decal_update() {
  let o = new DecalData("d1")
  o.order = 1
  o.texturePath = HostConfig.AbsolutePath + "/media/decal.jpg"
  o.location = [66.14, -7288.16, 9.47]
  o.rotation = [-90, 180, 0]
  o.scale = [0.5, 0.5, 0.5]
  __g.decal.update(o)
}

function test_decal_delete() {
  __g.decal.delete("d1")
}

function test_decal_clear() {
  __g.decal.clear()
}

function test_decal_focus() {
  __g.decal.focus("d1")
}

function test_decal_focusAll() {
  __g.decal.focusAll()
}

function test_decal_get() {
  __g.decal.get("d1")
}

/*-------------------------------------------------
  viewshed
--------------------------------------------------*/
function test_viewshed_add() {
  let o = new ViewshedData("v1")
  o.coordinate = [5235.26, 4256.03, -20.47]
  o.fov = 70
  o.radius = 1000
  o.direction = 120
  __g.viewshed.add(o)
}

function test_viewshed_update() {
  let o = new ViewshedData("v1")
  o.coordinate = [5235.26, 4256.03, -20.47]
  o.fov = 55
  o.radius = 2000
  o.direction = 135
  __g.viewshed.update(o)
}

function test_viewshed_delete() {
  __g.viewshed.delete("v1")
}

function test_viewshed_clear() {
  __g.viewshed.clear()
}

function test_viewshed_focus() {
  __g.viewshed.focus("v1")
}

function test_viewshed_focusAll() {
  __g.viewshed.focusAll()
}

function test_viewshed_get() {
  __g.viewshed.get("v1")
}

/*-------------------------------------------------
  misc
--------------------------------------------------*/
function test_misc_setDateTime() {
  //参数：year, month, day, hour, minute, second, daynightLoop
  __g.misc.setDateTime(2019, 1, 1, 10, 0, 0, false)
}

function test_misc_addImageButton() {
  let x = 100
  let y = 100
  let width = 64
  let height = 64
  let normalImage = "D:/Data/1.jpg"
  let hoverImage = "D:/Data/2.jpg"
  let tooltip = "测试"
  let o = new ImageButtonData(
    1,
    x,
    y,
    width,
    height,
    normalImage,
    hoverImage,
    tooltip
  )
  __g.misc.addImageButtons(o)
}

function test_misc_deleteImageButton() {
  let ids = [0, 1]
  __g.misc.deleteImageButtons(ids)
}

function test_misc_addAnimatedImageButton() {
  let x = 100 //图片按钮的位置:x坐标
  let y = 100 //图片按钮的位置:y坐标
  let width = 208 //图片按钮的宽度，单位像素
  let height = 150 //图片按钮的高度，单位像素
  let imageSequecePath = "D:/tmp3/loopplay2s" //序列贴图的目录
  let imageSequeceLength = 2 //序列贴图的图片数量，也就是帧数
  let loop = true //是否循环播放序列贴图
  let interactable = true //是否可以用鼠标点击操作
  let o = new AnimatedImageButtonData(
    1,
    x,
    y,
    width,
    height,
    imageSequecePath,
    imageSequeceLength,
    loop,
    interactable
  )
  __g.misc.addAnimatedImageButtons(o)
}

let __uiVisible = true
function test_misc_setMainUIVisibility() {
  __uiVisible = !__uiVisible
  __g.misc.setMainUIVisibility(__uiVisible)
}

let __queryEnabled = false
function test_misc_setQueryToolState() {
  __queryEnabled = !__queryEnabled
  __g.misc.setQueryToolState(__queryEnabled)
}

function test_misc_playVideo() {
  __g.misc.playVideo(
    1,
    20,
    20,
    400,
    300,
    HostConfig.AbsolutePath + "/media/traffic.mov"
  )
}

function test_misc_stopPlayVideo() {
  __g.misc.stopPlayVideo(1)
}

function test_misc_playMovie() {
  __g.misc.playMovie(HostConfig.AbsolutePath + "/media/traffic.mov")
}

function test_misc_stopMovie() {
  __g.misc.stopMovie()
}

function test_misc_callBPFunction() {
  let f = new BPFunctionData()
  f.actorTag = "custombpactor"
  f.objectName = "BlueprintCube_2"
  f.functionName = "TestBPFunction"
  f.paramType = BPFuncParamType.Vector
  f.paramValue = [1, 0, 0]
  __g.misc.callBPFunction(f)
}

function test_misc_setWindowResolution() {
  __g.misc.setWindowResolution(800, 600)
}

function test_misc_enterReportMode() {
  __g.misc.enterReportMode()
}

function test_misc_exitReportMode() {
  __g.misc.exitReportMode()
}

function test_misc_showAllFoliages() {
  __g.misc.showAllFoliages()
}

function test_misc_hideAllFoliages() {
  __g.misc.hideAllFoliages()
}

/*-------------------------------------------------
  tools
--------------------------------------------------*/
function test_tools_startPolygonClip() {
  let coords1 = [
    [14568.25, -15901.38, 0],
    [14366.85, -15872.15, 0],
    [14428.1, -16030.33, 0],
  ]

  let coords2 = [
    [
      [9665.22, -11366.88, 5.7],
      [9765.4, -4511.22, 5.7],
      [4155.2, -4036.94, 5.7],
      [3098, -11010.32, 5.7],
      [6445.79, -12717.28, 6.78],
    ],
    [
      [8706.9, -9457.89, 5.7],
      [8824.84, -8055.4, 6.64],
      [7619.37, -8859.47, 6.72],
    ],
    [
      [5744.8, -7795.59, 5.7],
      [6205.21, -5724.74, 5.7],
      [4460.01, -5839.38, 6.05],
      [3966.28, -7712.46, 7.17],
    ],
  ]

  let coords3 = [
    //part1
    [
      [
        [9665.22, -11366.88, 5.7],
        [9765.4, -4511.22, 5.7],
        [4155.2, -4036.94, 5.7],
        [3098, -11010.32, 5.7],
        [6445.79, -12717.28, 6.78],
      ],
      [
        [8706.9, -9457.89, 5.7],
        [8824.84, -8055.4, 6.64],
        [7619.37, -8859.47, 6.72],
      ],
      [
        [5744.8, -7795.59, 5.7],
        [6205.21, -5724.74, 5.7],
        [4460.01, -5839.38, 6.05],
        [3966.28, -7712.46, 7.17],
      ],
    ],

    //part2
    [
      [
        [-4477.25, -4353.11, 5.7],
        [-1803.2, -6744.65, 5.7],
        [-562.18, -4590.14, 5.7],
        [-2271.85, -2595.33, 5.7],
      ],
      [
        [-2867.3, -4342.53, 5.7],
        [-2381.34, -5043.33, 5.7],
        [-1723.21, -4566.1, 6.25],
        [-1938.83, -3757.59, 5.7],
      ],
    ],
  ]

  __g.misc.startPolygonClip(coords1)
}

function test_tools_stopClip() {
  __g.misc.stopClip()
}

function test_misc_setMeasurement() {
  //options的每个属性都是可选的
  let options = {
    lineSize: 3.0,
    pointSize: 8.0,
    textColor: Color.Yellow,
    pointColor: [0, 0, 1, 0.3],
    lineColor: Color.Red,
    areaColor: [0, 1, 0, 0.3],
    showCoordinateText: false,
  }
  __g.tools.setMeasurement(MeasurementMode.Coordinate, options)
}

function test_misc_enterMeasurement() {
  __g.tools.enterMeasurement()
}

function test_misc_exitMeasurement() {
  __g.tools.exitMeasurement()
}

/*-------------------------------------------------
  settings
--------------------------------------------------*/
function test_settings_setMapMode() {
  __g.settings.setMapMode(
    MapMode.BigMap,
    {
      //地图模式相关的参数，具体请参考API帮助文档
      coordType: 0,
      mapPont: [0, 0],
      longitude: 0.0,
      latitude: 0.0,
      style: "http://192.168.1.29:82/B34兴趣点_居名点",
      renderMode: 0,
    },
    () => {
      log("设置大地图模式完成")
    }
  )
}

function test_settings_getMapMode() {
  __g.settings.getMapMode()
}

function test_settings_setMapURL() {
  __g.settings.setMapURL("mapbox://styles/mapbox/streets-v10")
}

function test_settings_setHighlightColor() {
  __g.settings.highlightColor(Color.Red)
}

function test_settings_setFovX() {
  __g.settings.setFovX(75)
}

function test_settings_setOceanColor() {
  __g.settings.setOceanColor(Color.Blue)
}

/*-------------------------------------------------
  weather
--------------------------------------------------*/
function test_weather_getParams() {
  __g.weather.getParams()
}

function test_weather_setDateTime() {
  __g.weather.setDateTime(2020, 9, 9, 16, 8, false)
}

function test_weather_setRainParam() {
  __g.weather.setRainParam(1, 1, 1)
}

function test_weather_setSnowParam() {
  __g.weather.setSnowParam(1, 1, 1)
}

function test_weather_disableRainSnow() {
  __g.weather.disableRainSnow()
}

function test_weather_setFogParam() {
  __g.weather.setFogParam(1, 1, 0)
}

function test_weather_setCloudDensity() {
  __g.weather.setCloudDensity(0.8)
}

let __isDarkMode = false
function test_weather_setDarkMode() {
  __isDarkMode = !__isDarkMode
  __g.weather.setDarkMode(__isDarkMode)
}

/*-------------------------------------------------
  editHelper
--------------------------------------------------*/
function test_editHelper_setParam() {
  let lineType = 0 //0：直线，1：曲线
  let buildType = 1 //0：画多点线段， 1：画多边形
  let drawType = 1 //0：线  1：平面
  let color = Color.Red //绘制颜色
  let drawThickness = 10.0 //当DrawType为线时设置无效
  __g.editHelper.setParam(lineType, buildType, drawType, color, drawThickness)
}

function test_editHelper_start() {
  __g.editHelper.start()
}

function test_editHelper_cancel() {
  __g.editHelper.cancel()
}

function test_editHelper_finish() {
  __g.editHelper.finish(true, (response) => {
    buildType = response.buildType
    switch (buildType) {
      case 0:
        {
          let o = new PolylineData(Math.random())
          o.coordinates = response.coordinates
          o.color = Color.Red
          o.style = 2
          o.thickness = 10
          o.brightness = 1
          o.flowRate = 0.5
          __g.polyline.add(o)
        }
        break

      case 1:
        {
          let color = Color.Blue //多边形的填充颜色
          let frameColor = Color.Red
          let frameThickness = 1
          let o = new PolygonData(
            Math.random(),
            color,
            response.coordinates,
            frameColor,
            frameThickness
          )
          __g.polygon.add(o)
        }
        break
    }
  })
}

/*-------------------------------------------------
  测试用例
--------------------------------------------------*/
var __roads = undefined
var __lands = undefined
let __shpCenter = [662219.645, 3262845.555, 0.0]

function showRoad(show) {
  var ids = []
  for (var a in __roads) {
    ids.push(__roads[a].id)
  }

  if (show) {
    __g.polyline.show(ids)
  } else {
    __g.polyline.hide(ids)
  }
}

function addRoad() {
  __g.polyline.clear()

  var roadCount = dataLuZhongXingXian.features.length
  var oa = []
  for (var i = 0; i < roadCount; i++) {
    var featrue = dataLuZhongXingXian.features[i]
    var geometry = featrue.geometry
    var coordinates = geometry.coordinates
    let coords = coordinates[0] //多边形的坐标数组
    for (var j = 0; j < coords.length; j++) {
      coords[j][0] -= __shpCenter[0]
      coords[j][1] -= __shpCenter[1]
      coords[j][1] = -coords[j][1]

      coords[j][0] += 250
      coords[j][1] -= 2550

      coords[j].push(251)
    }

    var properties = featrue.properties

    var exponent = properties["拥堵指数"]
    let color = [0, 1, 0, 1]
    if (exponent !== null) {
      switch (exponent) {
        case 0: {
          color = [0, 1, 0, 1]
          break
        }
        case 1: {
          color = [1, 1, 0, 1]
          break
        }
        case 2: {
          color = [1, 1, 0, 1]
          break
        }
        case 3: {
          color = [0, 1, 0, 1]
          break
        }
        default: {
          color = [0.5, 0.0, 0.5, 1]
          break
        }
      }
    }

    let style = 4
    let thickness = 2
    let brightness = 0.0
    let flowRate = 0.0
    var roadId = "road" + i
    let o = new PolylineData(
      roadId,
      color,
      coords,
      style,
      thickness,
      brightness,
      flowRate
    )
    oa.push(o)
  }

  __roads = oa
  __g.polyline.add(oa, () => {
    __g.polyline.focus("road0", 1000)
  })
}

function showLandPolygons(show) {
  var ids = []
  for (var a in __lands) {
    ids.push(__lands[a].id)
  }

  if (show) {
    __g.polygon3d.show(ids)
  } else {
    __g.polygon3d.hide(ids)
  }
}

function getRandom(start, end, fixed = 0) {
  let differ = end - start
  let random = Math.random()
  return (start + differ * random).toFixed(fixed)
}

function addLandPolygons() {
  __g.polygon3d.clear()

  var landCount = dikuai.features.length
  var oa = []
  var typeColors = {}

  for (var i = 0; i < landCount; i++) {
    var featrue = dikuai.features[i]
    var geometry = featrue.geometry
    var coordinates = geometry.coordinates
    let coords = coordinates[0][0] //多边形的坐标数组

    for (var j = 0; j < coords.length; j++) {
      coords[j][0] -= __shpCenter[0]
      coords[j][1] -= __shpCenter[1]
      coords[j][1] = -coords[j][1]

      coords[j][0] += 250
      coords[j][1] -= 2550

      coords[j].push(235)
    }

    var properties = featrue.properties
    var landType = properties["用地类"]

    let color = [] //颜色值
    if (typeColors[landType] === undefined) {
      var r = getRandom(10, 255) / 255
      var g = getRandom(50, 255) / 255
      var b = getRandom(60, 255) / 255
      color = [r, g, b, 0.5]
      typeColors[landType] = color
    } else {
      color = typeColors[landType]
    }

    let height = 100 //3D多边形的高度
    let intensity = 4.0 //亮度
    let type = 1 //3DPolygon的样式
    let o = new Polygon3DData(
      "dikuai" + i,
      type,
      coords,
      color,
      height,
      intensity
    )
    oa.push(o)
  }
  __lands = oa
  __g.polygon3d.add(oa, () => {
    __g.polygon3d.focus("dikuai0", 1000)
  })
}

function testcase_highlightArea_crash() {
  __g.highlightArea.clear()

  let coords = [
    [-2785.06, -13556.48, 5.7],
    [8156.87, -14242.93, 5.7],
    [8881.75, -7989.53, 5.82],
    [4221, -5911.65, 5.7],
    [-3369.15, -5128.73, 5.7],
  ]
  let color = [1, 0, 0, 0.8] //多边形高亮颜色
  let heightRange = [0.0, 100.0] //高亮染色区域可以限定一个高度范围，也就是Z坐标的区间，只有Z值这这个区间的模型才会被染色
  let intensity = 5.0 //高亮颜色的强度
  let o = new HighlightAreaData("1", coords, color, heightRange, intensity)
  __g.highlightArea.add(o, function() {
    __g.highlightArea.focus("1")
  })

  setInterval(function() {
    __g.camera.get(function(response) {
      log("this is get camera callback function!")
    })
  }, 1000)
}

function testcase_simulate_building_process() {
  let tileLayerId = "619B2DB74CB1A81EFD9AAF9F98CFE5AD"
  __g.tileLayer.hideAllActors(tileLayerId)

  let index = 0
  let timer = setInterval(() => {
    __g.tileLayer.showActor(tileLayerId, __buildingActors[index])
    if (++index > __buildingActors.length) {
      clearInterval(timer)
      __g.tileLayer.showAllActors(tileLayerId)
    }
  }, 300)
}

/*-------------------------------------------------
  压力测试
--------------------------------------------------*/
function test_stress_add_1000_tags() {
  clearScreen()

  let oa = new Array()

  for (let i = 0; i < 1000; i++) {
    let x = Math.ceil(Math.random() * 200) //1-200的随机数
    let y = Math.ceil(Math.random() * 200) //1-200的随机数

    //设置参数
    let id = i //标签的ID，字符串值，也可以用数字（内部会自动转成字符串）
    let coord = [x, y, 5.47] //坐标值：标签添加的位置
    let imagePath =
      "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1816424559,1043488893&fm=26&gp=0.jpg" //图片路径，可以是本地路径，也支持网络路径
    let url = HostConfig.AbsolutePath + "/int_popup.html" //鼠标点击标签后弹出的网页的URL，也可以是本地视频文件，鼠标点击标签后会弹出视频播放窗口
    let imageSize = [28, 28] //图片的尺寸
    let text = `T${i}` //标签显示的文字
    let range = [1, 8000.0] //标签的可见范围
    let showLine = true //标签下方是否显示垂直牵引线

    let o = new TagData(
      id,
      coord,
      imagePath,
      imageSize,
      url,
      text,
      range,
      showLine
    )
    o.textColor = [0, 0, 0, 1] //设置文字颜色

    oa.push(o)
  }

  __g.tag.add(oa, function() {
    __g.tag.focusAll()
  })
}

function test_stress_update_1000_tags() {
  clearScreen()

  __g.tag.updateBegin()
  for (let i = 0; i < 1000; i++) {
    __g.tag.setTextBackgroundColor(i, Color.Yellow)
  }
  __g.tag.updateEnd(function() {
    log("update finished!")
  })
}

function test_stress_update_tagpos_500() {
  clearScreen()

  __g.tag.clear(() => {
    let o = new TagData(
      "t1",
      [-178.14, -8038.16, 5.47],
      null,
      null,
      null,
      "迪蒙大厦",
      [1, 8000],
      true
    )
    __g.tag.add(o, () => {
      __g.tag.focus(
        "t1",
        500,
        setTimeout(() => {
          let i = 0
          let tid = setInterval(() => {
            if (i++ > 500) clearInterval(tid)
            log(`${i} times`)
            __g.tag.setCoordinate("t1", [-178.14 + i * 5, -8038.16, 5.47])
          }, 50)
        }, 1000)
      ) //focus
    }) //add
  }) //clear
}

function test_stress_add_heatmap_3000() {
  clearInterval(__tidUpdateHeatMap)
  __g.tag.clear(
    __g.heatmap.clear(() => {
      let bbox = [1083.27, -12907.29, -1000, 1308.18, -12759.77, 201.51]
      let range = [0, 100]
      let data = []
      let pointCount = 2000 //热力点数量
      for (let i = 0; i < pointCount; i++) {
        let x = getRandNumBetween(bbox[0], bbox[3]) //minX ~ maxX
        let y = getRandNumBetween(bbox[1], bbox[4]) //minY ~ maxY
        let z = 0
        let coord = [x, y, z] //热力点的坐标
        let radius = Math.random() * 8 //热力点影像半径范围
        let heatValue = Math.random() * 100 //热力值
        let o = new HeatMapPointData(`${i}`, coord, radius, heatValue)
        data.push(o)
      }
      __g.heatmap.add("heatmap1", bbox, range, data, () => {
        __tidUpdateHeatMap = setInterval(() => {
          let data = []
          for (let i = 0; i < pointCount; i++) {
            let o = {}
            o.id = `${i}`
            o.heatValue = Math.random() * 100
            data.push(o)
          }
          __g.heatmap.update("heatmap1", null, null, data)
        }, 1000)
      })
    })
  )
}

var dataId = []

function test_stress_add_delete_focus() {
  __g.tag.delete(dataId, function() {
    dataId = []
    //设置参数
    let data = []
    for (let i = 1; i < 800; i++) {
      dataId.push(i)
      let id = i //标签的ID，字符串值，也可以用数字（内部会自动转成字符串）
      let coord = [1800 + i * 100, -3500 + i * 100, 100] //坐标值：标签添加的位置
      let imagePath = HostConfig.AbsolutePath + "/images/tag.png" //图片路径，可以是本地路径，也支持网络路径
      let url = HostConfig.AbsolutePath + "/int_popup.html"
      let imageSize = [28, 28] //图片的尺寸
      let text = "西丽街道已上报事件：131123" + i //标签显示的文字
      let range = [1, 80000.0] //标签的可见范围
      let showLine = false //标签下方是否显示垂直牵引线
      var o = new TagData(
        id,
        coord,
        imagePath,
        imageSize,
        null,
        text,
        range,
        showLine
      )
      o.textColor = Color.Black //设置文字颜色
      o.textBackgroundColor = Color.White
      data.push(o)
    }

    __g.tag.add(data, __g.tag.focus(dataId))
  })
}

function test_stress_add_800_polygon() {
  __g.polygon.clear()
  let color = Color.Yellow //多边形的填充颜色
  let frameColor = Color.Blue
  let frameThickness = 500
  let o = new PolygonData(
    "p800",
    color,
    __coords800,
    Color.Blue,
    frameThickness
  )
  __g.polygon.add(o, function() {
    __g.polygon.focus("p800")
  })
}

function test_stress_add_800_3dpolygon() {
  __g.polygon3d.clear()
  let color = [1, 0, 1, 1] //颜色值
  let height = 5000 //3D多边形的高度
  let intensity = 4.0 //亮度
  let type = 1 //3DPolygon的样式
  let o = new Polygon3DData("p800", type, __coords800, color, height, intensity)
  __g.polygon3d.add(o, function() {
    __g.polygon3d.focus("p800")
  })
}

function test_stress_add_10000_polygon() {
  __g.polygon.clear()
  let color = Color.Blue //多边形的填充颜色
  let frameColor = Color.Red
  let frameThickness = 500
  let o = new PolygonData("p1w", color, __coords1w, frameColor, frameThickness)
  __g.polygon.add(o, function() {
    __g.polygon.focus("p1w")
  })
}

function test_stress_add_10000_3dpolygon() {
  __g.polygon3d.clear()
  let color = Color.Blue //颜色值
  let height = 5000 //3D多边形的高度
  let intensity = 4.0 //亮度
  let type = 1 //3DPolygon的样式
  let o = new Polygon3DData("p1w", type, __coords1w, color, height, intensity)
  __g.polygon3d.add(o, function() {
    __g.polygon3d.focus("p1w")
  })
}

function test_stress_polygon_from_geojson() {
  __g.polygon.clear()

  let count = zoneBoundary.geometries.length
  for (let i = 0; i < count; i++) {
    let coords = zoneBoundary.geometries[i].coordinates[0]
    let color = Color.Yellow
    let frameColor = Color.Red
    let frameThickness = 500
    let o = new PolygonData(i, color, coords, frameColor, frameThickness)
    __g.polygon.add(o)

    if (i == 0) __g.polygon.focus(0)
  }
}

function test_stress_3dpolygon_from_geojson(fn) {
  __g.polygon3d.clear()

  let count = zoneBoundary.geometries.length
  let oa = []
  for (let i = 0; i < count; i++) {
    let coords = zoneBoundary.geometries[i].coordinates[0]
    let color = Color.Blue //颜色值
    let height = 8000 //3D多边形的高度
    let intensity = 4.0 //亮度
    let type = i //3DPolygon的样式
    let o = new Polygon3DData(i, type, coords, color, height, intensity)
    oa.push(o)
  }
  __g.polygon3d.add(oa, function() {
    __g.polygon3d.focus(0, 0, () => {
      if (fn) fn(oa)
    })
  })
}

function test_stress_polyline_show_hide_frequently() {
  __g.polyline.clear()

  let count = zoneBoundary.geometries.length
  let oa = []
  for (let i = 0; i < count; i++) {
    let o = new PolylineData(i)
    o.coordinates = zoneBoundary.geometries[i].coordinates[0]
    o.color = Color.Red
    o.style = 2
    o.thickness = 1000
    o.brightness = 1
    o.flowRate = 0.5
    oa.push(o)
  }
  __g.polyline.add(oa, function() {
    __g.polyline.focus(0, 0, () => {
      alert("Polyline创建完成，点击OK开始显隐测试")
      for (let i = 0; i < 100; i++) {
        for (let o of oa) {
          if (i % 2 == 0) __g.polyline.show(o.id)
          else __g.polyline.hide(o.id)
        }
      }
    })
  })
}

function test_stress_polygon_show_hide_frequently() {
  __g.polygon.clear()

  let count = zoneBoundary.geometries.length
  let oa = []
  for (let i = 0; i < count; i++) {
    let color = Color.Blue //多边形的填充颜色
    let frameColor = Color.Red
    let frameThickness = 500
    let o = new PolygonData(
      i,
      color,
      zoneBoundary.geometries[i].coordinates[0],
      frameColor,
      frameThickness
    )
    oa.push(o)
  }
  __g.polygon.add(oa, function() {
    __g.polygon.focus(0, 0, () => {
      alert("Polygon创建完成，点击OK开始显隐测试")
      for (let i = 0; i < 100; i++) {
        for (let o of oa) {
          if (i % 2 == 0) __g.polygon.show(o.id)
          else __g.polygon.hide(o.id)
        }
      }
    })
  })
}

function test_stress_3dpolygon_show_hide_frequently() {
  test_stress_3dpolygon_from_geojson(function(oa) {
    alert("3DPolygon创建完成，点击OK开始显隐测试")
    for (let i = 0; i < 100; i++) {
      for (let o of oa) {
        if (i % 2 == 0) __g.polygon3d.show(o.id)
        else __g.polygon3d.hide(o.id)
      }
    }
  })
}

function test_stress_3dpolygon_show_hide_frequently2() {
  let i = 0
  test_polygon3d_add(function() {
    test_polygon3d_focus()
    setInterval(() => {
      if (++i % 2) test_polygon3d_hide()
      else test_polygon3d_show()
    }, 500)
  })
}

function test_stress_callback_frequently() {
  for (let i = 0; i < 10; i++) {
    __g.camera.get((r) => {
      let str = `get camera callback, callbackIndex: ${r.callbackIndex}`
      log(str)
    })
  }
}

function test_stress_playVideo_frequently() {
  let isfirst = true
  let index = 0

  setInterval(function() {
    for (let i = 0; i < 3; i++) {
      if (!isfirst) __g.misc.stopPlayVideo("test" + i)

      __g.misc.playVideo(
        "test" + i,
        400 * i,
        0,
        400,
        300,
        "rtsp://192.168.1.4:555/live"
      )
      isfirst = false
    }
  }, 3000)
}

function test_stress_add_update_delete_3dpolygon() {
  __g.camera.set(9665.22, -11366.88, 1800, 0, 0, 0)
  setInterval(function() {
    __g.polygon3d.clear(() => {
      test_polygon3d_add(test_polygon3d_update)
    })
  }, 100)
}
