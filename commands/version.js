module.exports = {
  get: "_ver",
  cmd: "version",
  data: {},
  close() {
    this.data = {};
  },
  initializeData(data, flag, commandList) {
    var command = {"payload":{"data":{}}};
    this.processData(data, flag, command, commandList);
  },
  processData(data, flag, command, commandList) {
    command.payload.cmd = this.cmd;
    command.payload.data.version = data.readUInt16BE(0) + "." + data.readUInt16BE(2);
    this.data.version = command.payload.data.version;
    if(flag != commandList.flags.sync){return false;}
    return true;
  },
  sendData(command, commandList) {
    var msg = {
      "direction": "node",
      "command": {
        "payload": {
          "cmd": this.cmd,
          "data": this.data
        }
      }
    }
    
    return msg;
  }
}