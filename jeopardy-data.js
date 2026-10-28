/* =========================================================
   IEEE JEOPARDY QUESTIONS - edit / add your own!
   Each clue: [points, "clue text", "correct answer", ["wrong1","wrong2","wrong3"]]
   5 categories x 5 clues (100 to 500).
   ========================================================= */
const CATS=[
 {name:"IEEE BASICS",clues:[
  [100,"Complete the name: Institute of ______ and Electronics Engineers.","Electrical",["Electronic","Energy","Embedded"]],
  [200,"IEEE was formed in this year when two older institutes merged.","1963",["1884","1912","1971"]],
  [300,"IEEE's operations center is located in this New Jersey town.","Piscataway",["Princeton","Newark","Trenton"]],
  [400,"In 1963 the AIEE merged with this institute to form IEEE.","Institute of Radio Engineers",["Institute of Radar Engineers","Institute of Robotics Engineers","Institute of Radio Electricians"]],
  [500,"IEEE calls itself the world's largest organization of this type.","Technical professional organization",["Engineering university","Electronics manufacturer","Standards-only consortium"]]]},
 {name:"STANDARDS",clues:[
  [100,"IEEE 802.11 is better known by this consumer name.","Wi-Fi",["Bluetooth","Ethernet","USB"]],
  [200,"IEEE 802.3 defines this wired networking technology.","Ethernet",["Wi-Fi","FireWire","HDMI"]],
  [300,"IEEE 754 defines how computers do this kind of arithmetic.","Floating-point arithmetic",["Wireless encryption","Image compression","Memory addressing"]],
  [400,"IEEE 1394 is known by this Apple brand name.","FireWire",["Thunderbolt","Lightning","MagSafe"]],
  [500,"IEEE 802.15.1 was based on this short-range wireless technology.","Bluetooth",["Zigbee","NFC","Infrared"]]]},
 {name:"IEEE RESOURCES",clues:[
  [100,"IEEE Xplore is IEEE's digital one of these, full of papers and standards.","Library",["Store","Radio station","Game arcade"]],
  [200,"This is IEEE's flagship magazine covering technology news.","IEEE Spectrum",["IEEE Wired","IEEE Digest","IEEE Weekly"]],
  [300,"This is IEEE's highest award.","Medal of Honor",["Nobel Prize","Turing Award","Fields Medal"]],
  [400,"This is the highest grade of IEEE membership.","Fellow",["Senior Member","Associate Member","Graduate Member"]],
  [500,"IEEE members follow this document that guides professional conduct.","Code of Ethics",["Engineering Charter","Terms of Trade","Standards Oath"]]]},
 {name:"ENGINEERING 101",clues:[
  [100,"This is the unit of electrical resistance.","Ohm",["Volt","Watt","Farad"]],
  [200,"V = I × R is known as this law.","Ohm's Law",["Faraday's Law","Newton's Law","Coulomb's Law"]],
  [300,"This logic gate outputs 1 only when both inputs are 1.","AND",["OR","XOR","NOT"]],
  [400,"This 1947 Bell Labs invention replaced vacuum tubes.","Transistor",["Laser","Integrated circuit","LED"]],
  [500,"This law says chip transistor counts double roughly every two years.","Moore's Law",["Ohm's Law","Murphy's Law","Metcalfe's Law"]]]},
 {name:"ACRONYM SOUP",clues:[
  [100,"LED stands for this.","Light Emitting Diode",["Low Energy Display","Linear Electric Driver","Light Energy Device"]],
  [200,"CPU stands for this.","Central Processing Unit",["Central Program Utility","Computer Power Unit","Core Processing Utility"]],
  [300,"VLSI stands for this.","Very Large Scale Integration",["Variable Logic System Interface","Very Low Signal Input","Virtual Layer Silicon Integration"]],
  [400,"FPGA stands for this.","Field-Programmable Gate Array",["Fast Processing Graphics Adapter","Fixed Power Gate Amplifier","Field Programmed General Architecture"]],
  [500,"MOSFET stands for this.","Metal-Oxide-Semiconductor Field-Effect Transistor",["Metal-Oxide-Silicon Fast-Electron Transistor","Micro-Oxide Semiconductor Field-Effect Timer","Multi-Output Switching Field-Effect Transistor"]]]}
];
