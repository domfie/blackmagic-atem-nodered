# How to Use
In general the operation of the node is dependent on the ATEM it's self. This node stores information such as the input properties, keyer information etc but the ATEM is expected to update the information stored. The node is seperated into several commands that can be performed that all follow the research by SKAARHOJ found at https://www.skaarhoj.com/fileadmin/BMDPROTOCOL.html.
## General Command Layout
The general command layout is the same for most functions as seen below. In general the "raw" part of the command defines the raw information passed by the ATEM. The "cmd" portion defines what command has been found and processed with the "data" being the outputted information from the supported command.
```
//Received Information Format
var msg.payload = {
    "cmd": "The command",
    "raw": {
        "flag": "The flag of the packet that was sent",
        "length": "The length of the packet",
        "name": "The command name",
        "packet": "The raw packet"
    },
    "data": {
        "The data outputted by a supported Command."
    },
}
//Send Information Format
var msg.payload = {
    "cmd": "The command",
    "data": {
        "The data outputted by a supported Command. Note if this is empty it will return allstored data"
    },
}
```

## Example setting the program input to 0 on ME 0
```
[{"id":"78488d8.fa1d574","type":"function","z":"4ecf69fc.958c48","name":"Change Program Input On ME 0 To Input 1","func":"var msg1 = {\n    \"payload\": {\n        \"cmd\": \"programInput\",\n        \"data\": {\n            \"ME\": 0,\n            \"videoSource\": {\n                \"id\": 0\n            }\n        }\n    }\n}\nreturn msg1;","outputs":1,"noerr":0,"x":611,"y":180,"wires":[["6e96c850.4b84c8"]]},{"id":"6e96c850.4b84c8","type":"atem-atem","z":"4ecf69fc.958c48","name":"ATEM","network":"3260f992.1b9866","outputMode":"all","x":858,"y":179,"wires":[["a9196221.5360f"]]},{"id":"2b3e1a40.2130e6","type":"inject","z":"4ecf69fc.958c48","name":"","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"x":348,"y":180,"wires":[["78488d8.fa1d574"]]},{"id":"a9196221.5360f","type":"debug","z":"4ecf69fc.958c48","name":"","active":true,"console":"false","complete":"false","x":1019,"y":179,"wires":[]},{"id":"b9195ab8.f950f8","type":"comment","z":"4ecf69fc.958c48","name":"Remember to change the ip address","info":"Open ATEM and edit the network and set \nthe ip address of the atem.\n\nThe IP Address can be found in the ATEM setup utility","x":862.5,"y":129,"wires":[]},{"id":"3260f992.1b9866","type":"atem-network","z":"","name":"Test ATEM","ipAddress":"0.0.0.0"}]
```

## Raw Command (Get/Set)
Performs a raw command to the ATEM. The commands can be found at https://www.skaarhoj.com/fileadmin/BMDPROTOCOL.html.
### cmd = "raw"
### name = The name of the command to be passed
### packet = The raw buffer of the packet to be sent

```
//This will set ME 0 to input 0
var msg = {
    "payload": {
        "cmd": "raw",
        "data": {
            "name": "CPgI",
            "packet": new Buffer.from([0, 0, 0, 0])
        }
    }
}
```

## Status (Automatic)
States the current state of the node
### msg.topic = "status"
### msg.payload.connectionStatus = The current connection state
### msg.payload.errorInformation = The error information
disconnected - Disconnected
connecting - Attempting to handshake
initalising - Gathering information
connected - Connected
error - A error has occured

## Inital (Automatic)
When all information is gained from the ATEM spit out the read values
### msg.topic = "initial"
### msg.payload.cmd = The command
### msg.payload.data = The commands data (Look at the command in this doc)

## Program Input (Get/Set)
Changes the program input on a ME
### cmd = "programInput"
### ME = The ME to perform the action on
Where the MEs start at 0. So ME 1 is 0
### videoSource = The video source to change the ME to
This can contain either the id, shortName or longName
Integer of the macro id starting at 0

```
//This will set input 0 (Blk) to ME 0
var msg = {
    "payload": {
        "cmd": "programInput",
        "data": {
            "ME": 0,
            "videoSource": {
                id: 0,
                shortName: "blk",
                longName: "black" //(Only one of the above is requred)
            }
        }
    }
}
```

## Preview Input (Get/Set)
Changes the preview input on a ME
### cmd = "previewInput"
### ME = The ME to perform the action on
Where the MEs start at 0. So ME 1 is 0
### videoSource = The video source to change the ME to
This can contain either the id, shortName or longName
Integer of the macro id starting at 0

```
//This will set input 0 (Blk) to ME 0
var msg = {
    "payload": {
        "cmd": "previewInput",
        "data": {
            "ME": 0,
            "videoSource": {
                id: 0,
                shortName: "blk",
                longName: "black" //(Only one of the above is requred)
            }
        }
    }
}
```

## Input Property (Get/Set)
Gets the properties of a input
### cmd = "inputProperty"
### id = The id of the input
### longName = The long name of the input
### shortName = The short name of the input
### avaliableExternalPortTypes = The avaliable external port types for the input
### externalPortTypes = The external port types set to the input
### portType = The port type of the input
### avaliability = The avaliability of the input
### MEAvaliabiity = The avaliability for MEs for the input
### inTransition = The input is in transition somewhere
### framesRemaining = If the input is in transition how many frames are left
### position = If the input is in transition what is the fader position
### tallys = The list of tallys
### tallys.programTally.state = If the input is live on the program on a ME
### tallys.programTally.ID = What ME the input is live on
### tallys.previewTally.state = If the input is live on the preview on a ME
### tallys.previewTally.ID = What ME the input is live on
### tallys.downstreamKeyerTallyFill.state = If the input is live on the keyer
### tallys.downstreamKeyerTallyFill.ID = What keyer it is live on
### tallys.downstreamKeyerTallyKey.state = If the input is live on the keyer
### tallys.downstreamKeyerTallyKey.ID = What keyer it is live on
### tallys.upstreamKeyerTallyFill.state = If the input is live on the keyer
### tallys.upstreamKeyerTallyFill.ID = What keyer it is live on
### tallys.upstreamKeyerTallyKey.state = If the input is live on the keyer
### tallys.upstreamKeyerTallyKey.ID = What keyer it is live on

```
//This will ask for all input properties
var msg = {
    "payload": {
        "cmd": "inputProperty",
        "data": {}
    }
}
```

## Perform Cut (Set)
Performs a cut transition on a ME
### cmd = "performCut"
### ME = The ME to perform the action on
Where the MEs start at 0. So ME 1 is 0

```
//This will perform a cut on ME 0
var msg = {
    "payload": {
        "cmd": "performCut",
        "data": {
            "ME": 0
        }
    }
}
```

## Perform Auto (Set)
Performs a auto transition on a ME
### cmd = "performAuto"
### ME = The ME to perform the action on
Where the MEs start at 0. So ME 1 is 0

```
//This will perform a cut on ME 0
var msg = {
    "payload": {
        "cmd": "performAuto",
        "data": {
            "ME": 0
        }
    }
}
```

## Downstream Keyer (Get/Set)
Controls the downstream keyers
### cmd = "downstreamKeyer"
### keyer[x] = The keyer
Where x is the keyer number 0 - 4
### id = The keyer id
### state = The keyer state
### keyer[x].fillSource = The fill source of this keyer
### keyer[x].keySource = The key source of this keyer
### keyer[x].state = The keyer state
### keyer[x].inTransition = If this keyer is in transition
### keyer[x].isAutoTransitioning = If this keyer is in a auto transition
### keyer[x].framesRemaining = The amount of frames remaining for the transition

```
//This will turn downstream keyer 0 on air
var msg = {
    "payload": {
        "cmd": "downstreamKeyer",
        "data": {
            "id": 0,
            "state: true
        }
    }
}
```

## Upstream Keyer (Get/Set)
Controls the upstream keyers
### cmd = "upstreamKeyer"
### keyer[x] = The keyer
Where x is the keyer number 0 - 4
### keyerId = The keyer id
### keyerState = The keyer state
### keyer[x].fillSource = The fill source of this keyer
### keyer[x].keySource = The key source of this keyer
### keyer[x].onAir = If this keyer is onAir
### keyer[x].inTransition = If this keyer is in transition
### keyer[x].isAutoTransitioning = If this keyer is in a auto transition
### keyer[x].framesRemaining = The amount of frames remaining for the transition

```
//This will turn upstream keyer 0 on ME 0 on air
var msg = {
    "payload": {
        "cmd": "downstreamKeyer",
        "data": {
            "ME": 0,
            "id": 0,
            "state: true
        }
    }
}
```

## Aux Source (Get/Set)
Controls the aux sources
### cmd = "auxSource"
### id = The aux source id
### videoSource = The input source set to this aux input
### mask = If the mask is turned on or not (usually true)

```
//Gets the aux sources
var msg = {
    "payload": {
        "cmd": "auxSource",
        "data": {
            "id": x //This can be passed to get the specific aux source
        }
    }
}
```

```
//Sets the aux source to input 0 (black) on aux 0
var msg = {
    "payload": {
        "cmd": "auxSource",
        "data": {
            "id": 0,
            "videoSource": {
                "id": 0,
                "shortName": "blk",
                "longName": "black" // Only one of these is required
            },
            "mask": true
        }
    }
}
```

## Time (Get)
The time read from the ATEM
### cmd = "time"
### hour = The hour
### minute = The minute
### second = The second
### frame = The current frame number

```
//This will get the current time on the ATEM
var msg = {
    "payload": {
        "cmd": "time",
        "data": {}
    }
}
```

## Transition Position (Get/Set)
The current transition position
### cmd = "transitionPosition"
### ME = The ME the transition is current on
### inTransition = If the transition is transitioning
### framesRemaining = The frames remaining in the transition
### position = The current position of the transition
0 - 9999

```
//This will set the transition position on ME 0 to be half way
var msg = {
    "payload": {
        "cmd": "transitionPosition",
        "data": {
            "ME": 0,
            "position": 4999
        }
    }
}
```

## Super Source Box Control (Get/Set)
Controls the box control under the super source
- `cmd` "superSourceBox"
- `data` Array[superSourceID][boxID] where super source 1 box 3 will be Array[1][3]
- `superSourceID` the super source to change the box on
- `box` the box to change
- `enabled` should the box be enabled?
- `inputNumber` `videoSource` the input to set the box to (can be either a raw inputNumber or a videoSource object)
- `xPosition` the x position
- `yPosition` the y position
- `size` the size of the box
- `cropEnabled` should the crop be enabled?
- `cropTop` the top crop position
- `cropBottom` the bottom crop position
- `cropLeft` the left crop position
- `cropRight` the right crop position

### Example message from the ATEM
```
var msg = {
    "payload": {
        "cmd": "superSourceBox",
        "data": {
            //Super Source ID
            1: {
                //Box ID
                1: {
                    "enabled": true,
                    "inputNumber": 0,
                    "videoSource": {
                        "id": 0,
                        "longName": "black"
                    },
                    "xPosition": 15.0,
                    "yPosition": 20.0,
                    "size": 1.0,
                    "cropEnabled": true,
                    "cropTop": 1.0,
                    "cropBottom": 1.0,
                    "cropLeft": 1.0,
                    "cropRight": 1.0
                },
                2: {
                    ....
                }
            }
        }
    }
}
```

### Example request to the ATEM
```
//Request to set the super source box on super source 1 box 4 to change input
var msg = {
    "payload": {
        "cmd": "superSourceBox",
        "data": {
            "superSourceID": 1,
            "box": 4,
            "videoSource": {
                "id": 5
            }

            //You don't need to set everything if a parameter is not set it will set it to what was read in
        }
    }
}
```

## Camera Control (Get/Set)
Controls a camera
- `cmd` "cameraControl"
- `data` Array[cameraId]
- `iris` The current iris value in percentage (0-100%). Set value to `auto` for auto iris
- `focus` The current focus value in percentage (0-100%). Set value to `auto` for auto focus
- `gain` The gain value of the camera (-12, -6, 0, +6, +12, 18, 24)db
- `whiteBalance` The white balance of the camera (Integer)
- `zoomSpeed` The current zoom speed in percentage (-100% - 100%). Send 0% to stop
- `zoomPosition` Move the zoom to a set position (0-100%)
- `lift[red,green,blue,yellow]` Sets the lift value of the camera (-1.0 - 1.0)
- `gamma[red,green,blue,yellow]` Sets the gamma value of the camera (-1.0 - 1.0)
- `gain[red,green,blue,yellow]` Sets the gain value of the camera (0 - 4.0)
- `lumMix` Sets the lum mix of the camera (0 - 100%)
- `hue` Sets the hue of the camera (0 - 100%)
- `shutter` The shutter speed ("1/24", "1/25", "1/30", "1/50", "1/60", "1/75", "1/90", "1/100", "1/120", "1/150", "1/180", "1/250", "1/360", "1/500", "1/725", "1/1000", "1/1450", "1/2000")
- `contrast` Sets the contrast on the camera (0 - 100%)
- `saturation` Sets the saturation of the camera (0 - 100%)

### Example message from the ATEM
```
var msg = {
    "payload": {
        "cmd": "cameraControl",
        "data": {
            //Camera ID
            1: {
                "iris": 0,
                "focus": 0,
                "overallGain": "0db",
                "whiteBalance": 5600,
                "zoomSpeed": 0,
                "lift": {
                    "red": 0.0,
                    "green": 0.0,
                    "blue": 0.0,
                    "yellow": 0.0
                },
                "gamma": {
                    "red": 0.0,
                    "green": 0.0,
                    "blue": 0.0,
                    "yellow": 0.0
                },
                "gain": {
                    "red": 0.0,
                    "green": 0.0,
                    "blue": 0.0,
                    "yellow": 0.0
                },
                "lumMix": 0,
                "hue": 50,
                "shutter": "1/75",
                "contrast": 50,
                "saturation": 0,
                "zoomPosition" 0
            },
            2: {
                ....
            }
        }
    }
}
```

### Example request to from the ATEM
```
//Request camera 1 to reset to defaults
var msg = {
    "payload": {
        "cmd": "cameraControl",
        "data": {
            "cameraID": 1,
                "iris": 0,
                "overallGain": "6db",
                "whiteBalance": 5700,
                "lift": {
                    "red": 0.0,
                    "green": 0.0,
                    "blue": 0.0,
                    "yellow": 0.0
                },
                "gamma": {
                    "red": 0.0,
                    "green": 0.0,
                    "blue": 0.0,
                    "yellow": 0.0
                },
                "gain": {
                    "red": 1.0,
                    "green": 1.0,
                    "blue": 1.0,
                    "yellow": 1.0
                },
                "lumMix": 0,
                "hue": 0,
                "shutter": "1/50",
                "contrast": 50,
                "saturation": 50
        }
    }
}
```


## Audio Mixer input (Get/Set)
Contorls a audio mixer input
- `cmd` "audioMixerInput"
- `data` Array[audioMixerID]
- `id` The ID of this audio mixer input
- `input` A object containing the video input relevent to this audio input (See inputProperty for more information)
- `type` The type of channel
- `fromMediaPlayer` Is this channel from the media player?
- `plugType` The type of plug this channel comes from
- `mixOption` What is the mix option
- `volume` The volume of the channel 0-100%

### Example message from the ATEM
```
var msg = {
    "payload": {
        "cmd": "audioMixerInput",
        "data": {
            //Mixer Channel
            1: {
                "id": 1,
                "input": [inputProperty Object],
                "type": "externalVideo",
                "fromMediaPlayer": false,
                "plugType": "sdi",
                "mixOption": "off",
                "volume": 50,
                "balance": 0
            },
            2: {
                ....
            }
        }
    }
}
```

### Example request to the ATEM
```
//Request channel 1 to be half volume
var msg = {
    "payload": {
        "cmd": "audioMixerInput",
        "data": {
            //You can pass either a raw id or a input containing it's id or short/long name
            "id": 1,
            "input": {
                "id": 1,
                "shortName": "CAM1"
            },
            "volume": 50,
            "balance": 0
        }
    }
```

## Audio Mixer Monitor (Get/Set)
Contorls a audio mixer input
- `cmd` "audioMixerMonitor"
- `data` 
- `enabled` If the audio monitor is enabled
- `volume` The volume of the audio monitor (0-100%)
- `muteEnabled` If the audio monitor is muted
- `soloEnabled` If the audio monitor is set to solo
- `soloInput` The solo input of the monitor where `id` is the id of the selected input and `input` is the audioMixerInput object of the input (See audioMixerInput for more)
- `dimEnabled` If the dim is enabled

### Example message from the ATEM
```
var msg = {
    "payload": {
        "cmd": "audioMixerMonitor",
        "data": {
            "enabled": true,
            "volume": 100,
            "muteEnabled": false,
            "soloEnabled": true,
            "soloInput": {
                "id": 1,
                "input": [audioMixerInput Object]
            },
            "dimEnabled": false
        }
    }
}
```

### Example request to the ATEM
```
//Request to change the solo input and set the volume to half
var msg = {
    "payload": {
        "cmd": "audioMixerMonitor",
        "data": {
            "enabled": true,
            "volume": 50,
            "muteEnabled": false,
            "soloEnabled": true,
            "soloInput": 1 or "soloInput": "CAM1", //Both are valid
            "dimEnabled": false
        }
    }
```

## Multiviewer Input (Get/Set) (Currently not tested!)
Contorls a audio mixer input
- `cmd` "multiViewerInput"
- `data` An array containing each multiviewer

- `Data object`
- `id` The multiviewer id
- `windows` An array containing each window

- `Windows object`
- `index` The window index number
- `inputId` The input id set to the window
- `videoSource` The video source set to the window (See inputProperty for more information)

### Example message from the ATEM
```
var msg = {
    "payload": {
        "cmd": "multiViewerInput",
        "data": {
            "id": 0,
            "windows": {
                "index": 0,
                "inputId": 0,
                "videoSource": [inputProperty Object]
            },
            {
                "index": 1,
                "inputId": 2,
                "videoSource": [inputProperty Object]
            }
            ...
        },
        {
            "id": 1,
            "windows": {
                "index": 0,
                "inputId": 0,
                "videoSource": [inputProperty Object]
            },
            ...
        }
        ...
    }
}
```

### Example request to the ATEM
```
//Request to set multiviewer 1, window 1, to input 1
var msg = {
    "payload": {
        "cmd": "multiViewerInput",
        "data": {
            "multiViewerId": 0,
            "windowIndex": 0,
            "input": {
                "id": 1,
                "shortName": "CAM1"
            }
            or
            "inputId": 1
        }
    }
```


## Version (Get)
The current version of the ATEM
### cmd = "version"

```
//This will get the current version of the ATEM
var msg = {
    "payload": {
        "cmd": "version",
        "data": {}
    }
}
```

## Macro Action (Set)
Performs a maro
### cmd = "macroAction"
### macroId = the macro id
Integer of the macro id starting at 0
### action = the type of action
- "run" - Runs the command
- "stop" - Stops the command
- "stoprecording" - Stops recoding a macro
- "insertwaitforuser" - Inserts a wait for the user
- "continue" - Continue the marco after a pause
- "deletemacro" - Deletes the macro
### running = If the macro is currently running
### wairing = If the macro is currently waiting
### isLooping = If the macro is looping
### macroProperties = The properties of the macro (see below)
### macroProperties.isUsed = If the macro is used
### macroProperties.name = The name of the macro
### macroProperties.description = The description

```
//This will run macro 0
var msg = {
    "payload": {
        "cmd": "macroAction",
        "data": {
            "macroId": 0,
            "action": "run"
        }
    }
}
```

## Warning (Get)
If the atem sends a warning
### cmd = "warning"
### warningMessage = The warning message

```
//This will get the last warning message received if there was one
var msg = {
    "payload": {
        "cmd": "warning",
        "data": {}
    }
}
```

## Topology (Get)
The topology of the ATEM
### cmd = "topology"
### MEs = The amount of MEs
### sources = The amount of sources
### colorGenerators = The amount of color generators
### AUXBusses = The amount of aux busses
### downstreamKeyers = The amount of downstream keyers
### stingers = The amount of stingers
### DVEs = The amount of DVEs
### superSources = The amount of super sources
### hasSDOutput = As a SD output

```
//This will get the last warning message received if there was one
var msg = {
    "payload": {
        "cmd": "topology",
        "data": {}
    }
}
```
