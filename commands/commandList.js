module.exports = {
  flags: {
    sync: 0x01,
    connect: 0x02,
    full: 0x03,
    repeat: 0x04,
    initializing: 0x05,
    unknown: 0x06,
    heartbeat: 0x11,
    error: 0x08,
    ack: 0x16
  },
  transitionStyles: {
    mix: 0x00,
    dip: 0x01,
    wipe: 0x02,
    dve: 0x03,
    sting: 0x04
  },
  tallyStates: {
    none: 0x00,
    program: 0x01,
    preview: 0x02
  },
  connectionStates: {
    disconnected: 0x00,
    connecting: 0x01,
    initializing: 0x02,
    connected: 0x03
  },
  cameraOptions: {
    adjustmentDomain: {
      lens: 0x00,
      camera: 0x01,
      chip: 0x08
    },
    lensFeature: {
      focus: 0x00,
      autoFocused: 0x01,
      iris: 0x03,
      zoom: 0x09
    },
    cameraFeature: {
      gain: 0x01,
      whiteBalance: 0x02,
      shutter: 0x05,
      gainValues: {
        "+0db": 760,
        "+6db": 1272,
        "+12db": 2296,
        "+18db": 4344,
        "+24db": 8440,
      },
      whiteBalance: {
        "3200K": 3200,
        "4500K": 4500,
        "5000K": 5000,
        "5600K": 5600,
        "6500K": 6500,
        "7500K": 7500
      },
      shutter: {
        "1/50": 20000,
        "1/60": 16667,
        "1/75": 13333,
        "1/90": 11111,
        "1/100": 10000,
        "1/120": 8333,
        "1/150": 6667,
        "1/180": 5556,
        "1/250": 4000,
        "1/360": 2778,
        "1/500": 2000,
        "1/725": 1379,
        "1/1000": 1000,
        "1/1450": 690,
        "1/2000": 500,
      }
    },
    chipFeature: {
      lift: 0x00,
      gamma: 0x01,
      gain: 0x02,
      aperture: 0x03,
      contrast: 0x04,
      lum: 0x05,
      hueSaturation: 0x06
    }
  },

  packets: {
      // requestHandshake: new Buffer([
      //   0x10, 0x14, 0x53, 0xAB,
      //   0x00, 0x00, 0x00, 0x00,
      //   0x00, 0x3A, 0x00, 0x00,
      //   0x01, 0x00, 0x00, 0x00,
      //   0x00, 0x00, 0x00, 0x00
      // ]),
      // handshakeAnswerback: new Buffer([
      //   0x80, 0x0C, 0x53, 0xAB,
      //   0x00, 0x00, 0x00, 0x00,
      //   0x00, 0x03, 0x00, 0x00
      // ])
      requestHandshake: new Buffer([
        0x10, 0x14, 0x00, 0x00, //The two last bits need to be a random id
        0x00, 0x00, 0x00, 0x00,
        0x00, 0x26, 0x00, 0x00,
        0x01, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00
      ]),
      handshakeAccepted: new Buffer([
        0x10, 0x14, 0x00, 0x00 //The two last bits need to be the random id
        // 0x00, 0x00, 0x00, 0x00, 
        // 0x00, 0x00, 0x00, 0x00
      ]),
      handshakeAnswerback: new Buffer([
        0x80, 0x0c, 0x00, 0x00, ////The two last bits need to be the random id
        0x00, 0x00, 0x00, 0x00,
        0x00, 0xfa, 0x00, 0x00
      ]),
      disconnect: new Buffer([
        0x10, 0x14, 0x00, 0x00, ////The two last bits need to be the random id
        0x00, 0x00, 0x00, 0x00,
        0x00, 0xf6, 0x00, 0x00,
        0x04, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00
      ])
  },
  //Check if a variable is not null or undefined
  exists: function(variable) {
    return variable !== null && variable !== undefined;
  },
  list: {
      version: require("./version.js"),
      time: require("./time.js"),
      programInput: require("./programInput.js"),
      previewInput: require("./previewInput.js"),
      inputProperty: require("./inputProperty.js"),
      performCut: require("./performCut.js"),
      performAuto: require("./performAuto.js"),
      transitionPosition: require("./transitionPosition.js"),
      upstreamKeyer: require("./upstreamKeyer.js"),
      downstreamKeyer: require("./downstreamKeyer.js"),
      auxSource: require("./auxSource.js"),
      macroAction: require("./macroAction.js"),
      downstreamKeyerConfig: require("./downstreamKeyerConfig.js"),
      upstreamKeyerConfig: require("./upstreamKeyerConfig.js"),
      warning: require("./warning.js"),
      topology: require("./topology.js"),
      macroProperties: require("./macroProperties.js"),
      transitionMix: require("./transitionMix.js"),
      //cameraControl: require("./cameraControl.js")
      //superSource: require("./superSource.js")
  },
  //Return the get for set and set for get command name
  findInvertedDirectionName(name) {
    for(var key in this.list) {
      if(this.list[key].get.toUpperCase() == name.toUpperCase()) {
        return this.list[key].set;
      }
      if(this.list[key].set.toUpperCase() == name.toUpperCase()) {
        return this.list[key].get;
      }
    }
  },
  findFlag(id) {
    for(var key in this.flags) {
        if(this.flags[key] == parseInt(id)) {
            return key;
        }
    }
    return id;
  },
  findCommand(name){
    for(var key in this.list) {
        if(this.list[key].get.toUpperCase() == name.toUpperCase()) {
            return this.list[key];
        }
        if(key.toUpperCase() == name.toUpperCase()) {
            return this.list[key];
        }
    }
    return null;
  },
  close(){
    for(var key in this.list) {
      this.list[key].close();
    }
  }
}
