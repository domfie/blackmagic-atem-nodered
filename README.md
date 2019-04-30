# Blackmagic ATEM control for Node Red
Provides control and feedback from a Blackmagic ATEM device
[Blackmagic](https://www.blackmagicdesign.com)

## Currently in testing
Please report any bugs that you may find. We will be using this in a automation system however won't be using all the functionality so tell me if you find any issues :) Below is some known issues.

- When connecting the user can still ask for inputs and this will return empty
- Handlle disconnections more obviously on the node side
- Handle when the atem is full of clients
- The longName and shortName fields of the inputs show garbage. This is because there needs to be a check to find the end of the string [Minor]

## Supported commands
- Aux Source
- Downstream Keyer
- Upstream Keyer
- Input Property
- Macro
- Auto
- Cut
- Preview Input
- Program Input
- Time
- Transition Position
- Version
- Raw Commands
- Tallying on the MEs and Keyers

Thanks to SKAARHOJ for the research into the commands! This is also where you can find a detail listing if you wish to use the raw command feature
[SKAARHOJ BMD Protocol](https://www.skaarhoj.com/fileadmin/BMDPROTOCOL.html)

## How to Use
In general just put a message node on the output and press buttons on the ATEM to find the values you wishing to get out of the ATEM.
I'll write up some proper documentation soon!

## Special Thanks
- Thanks to [SKAARHOJ](https://www.skaarhoj.com/) for the research and listing of the commands to control the ATEM
- Thanks to [Applest](https://github.com/applest) for some example code to help me get my head around some of the backend stuff