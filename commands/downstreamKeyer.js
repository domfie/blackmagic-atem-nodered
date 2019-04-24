module.exports = {
  get: "DskS",
  set: "CDsL",
  cmd: "downstreamKeyer",
  data: {},
  close() {
    this.data = {};
  },
  initializeData(data, flag, commandList) {
    var command = {"payload":{"data":{}}};
    this.processData(data, flag, command, commandList, false);
  },
  processData(data, flag, command, commandList, sendTallyUpdates=true) {
    if(flag != commandList.flags.sync){return false;}
    command.payload.cmd = this.cmd;

    if(this.data["keyer" + data[0]] == undefined || this.data["keyer" + data[0]] == null) {
      this.data["keyer" + data[0]] = {};
      this.data["keyer" + data[0]].fillSource = undefined;
      this.data["keyer" + data[0]].keySource = undefined;
    }
    this.data["keyer" + data[0]].onAir = data[1] == 0x01;
    this.data["keyer" + data[0]].inTransition = data[2] == 0x01;
    this.data["keyer" + data[0]].isAutoTransitioning = data[3] == 0x01;
    this.data["keyer" + data[0]].framesRemaining = data[4];

    commandList.list.inputProperty.updateTallysKeyer(data[0], "downstreamKeyerTallyFill", this.data["keyer" + data[0]].fillSource,  data[1] == 0x01, sendTallyUpdates);
    commandList.list.inputProperty.updateTallysKeyer(data[0], "downstreamKeyerTallyKey", this.data["keyer" + data[0]].keySource,  data[1] == 0x01, sendTallyUpdates);
    command.payload.data["keyer" + data[0]] = this.data["keyer" + data[0]];
    return true;
  },
  sendData(command, commandList) {
    var error = null;
    var msg = {
      "direction": "node",
      "name": this.set,
      "command": {
        "payload": {
          "cmd": this.cmd,
          "data": "The data was not filled"
        }
      }
    }

    //If the data is null return the value
    if(command.payload.data == undefined || command.payload.data == null) {error="The data parameter was null";}
    else {
      if(command.payload.data.keyerId == undefined || command.payload.data.keyerId == null) {
        msg.direction = "node";
        msg.command.payload.data = this.data;
      }
      else if(command.payload.data.keyerState == undefined || command.payload.data.keyerState == null) {
        msg.direction = "node";
        msg.command.payload.data = this.data["keyer" + command.payload.data.keyerId];
      }
      else {
        var packet = Buffer.alloc(4).fill(0);
        packet[0] = command.payload.data.keyerId;
        packet[1] = command.payload.data.keyerState ? 1 : 0;
        msg.direction = "server";
        msg.command.packet = packet;
      }
    }

    if(error != null) {
      var msg = {
        "direction": "node",
        "command": {
          "payload": {
            "cmd": this.cmd,
            "data": error
          }
        }
      }
    }
    return msg;
  },
  //Add more keyer information
  addKeyerInformation(keyerId, fillSource, keySource, commandList) {
    var keyer = this.data["keyer" + keyerId];
    if(keyer != undefined && keyer != null) {
      keyer.fillSource = fillSource;
      keyer.keySource = keySource;
      commandList.list.inputProperty.updateTallysKeyer(keyerId, "downstreamKeyerTallyFill", this.data["keyer" + keyerId].fillSource, keyer.onAir, false);
      commandList.list.inputProperty.updateTallysKeyer(keyerId, "downstreamKeyerTallyKey", this.data["keyer" + keyerId].keySource, keyer.onAir, false);
    }
  }
}