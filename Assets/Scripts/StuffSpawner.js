#pragma strict

var Thing1 : GameObject;
var Thing2 : GameObject;
var Thing3 : GameObject;

var Thing5 : GameObject;
var Thing6 : GameObject;

var TheP0 : GameObject;

var AmmoBot : GameObject;
var TheAmmoBot : GameObject;

var Snyns : GameObject;
var TheSnyns : GameObject;

var TheKatovariDropPod : GameObject;

var NPC000 : GameObject;
static var TheNPC000N = 0;
var NPC001 : GameObject;
static var TheNPC001N = 0;
var NPC002 : GameObject;
static var TheNPC002N = 0;
var NPC003 : GameObject;
static var TheNPC003N = 0;
var NPC004 : GameObject;
static var TheNPC004N = 0;
var NPC005 : GameObject;
static var TheNPC005N = 0;
var NPC006 : GameObject;
var TheNPC006 : GameObject;
var NPC007 : GameObject;
var TheNPC007 : GameObject;
var NPC008 : GameObject;
var TheNPC008 : GameObject;
var TheNPC009 : GameObject;
static var TheNPC009N = 0;
var TheNPC0091 : GameObject;
static var TheNPC0091N = 0;

var TheNPC0800 : GameObject;
var TheNPC0801 : GameObject;
var TheNPC0802 : GameObject;
var TheNPC0803 : GameObject;
var TheNPC0804 : GameObject;
var TheNPC0805 : GameObject;
static var TheNPC0805N = 0;

var NPC080 : GameObject;
var TheNPC080 : GameObject;

var NPC081 : GameObject;
var TheNPC081 : GameObject;
var NPC082 : GameObject;
var TheNPC082 : GameObject;

var NPC00 : GameObject;
var TheNPC00 : GameObject;
var NPC01 : GameObject;
var TheNPC01 : GameObject;
var NPC02 : GameObject;
var TheNPC02 : GameObject;
var NPC03 : GameObject;
var TheNPC03 : GameObject;
var NPC04 : GameObject;
var TheNPC04 : GameObject;
var NPC05 : GameObject;
var TheNPC05 : GameObject;

var NPC10 : GameObject;
var TheNPC10 : GameObject;

var NPC20 : GameObject;
var TheNPC20 : GameObject;
var NPC21 : GameObject;
var TheNPC21 : GameObject;
var TheNPC22 : GameObject;
var TheNPC23 : GameObject;
var TheNPC24 : GameObject;
var TheNPC25 : GameObject;
var TheNPC26 : GameObject;
var TheNPC27 : GameObject;

var NPC300 : GameObject;
var TheNPC300 : GameObject;
var NPC301 : GameObject;
var TheNPC301 : GameObject;
var NPC302 : GameObject;
var TheNPC302 : GameObject;
var NPC303 : GameObject;
var TheNPC303 : GameObject;
var NPC310 : GameObject;
var TheNPC310 : GameObject;
var NPC31 : GameObject;
var TheNPC31 : GameObject;
var NPC32 : GameObject;
var TheNPC32 : GameObject;
var NPC33 : GameObject;
var TheNPC33 : GameObject;
var NPC34 : GameObject;
var TheNPC34 : GameObject;
var NPC35 : GameObject;
var TheNPC35 : GameObject;
var NPC36 : GameObject;
var TheNPC36 : GameObject;
var NPC37 : GameObject;
var TheNPC37 : GameObject;
var NPC39 : GameObject;
var TheNPC39 : GameObject;
var NPC39Once : boolean;

var NPC40 : GameObject;
var TheNPC40 : GameObject;
var NPC41 : GameObject;
var TheNPC41 : GameObject;
var NPC42 : GameObject;
var TheNPC42 : GameObject;
var NPC43 : GameObject;
var TheNPC43 : GameObject;
var NPC44 : GameObject;
var TheNPC44 : GameObject;
var NPC45 : GameObject;
var TheNPC45 : GameObject;

var NPC50 : GameObject;
var TheNPC50 : GameObject;
var NPC51 : GameObject;
var TheNPC51 : GameObject;
var NPC52 : GameObject;
var TheNPC52 : GameObject;
var NPC53 : GameObject;
var TheNPC53 : GameObject;
var TheNPC54 : GameObject;
var TheNPC55 : GameObject;
var TheNPC56 : GameObject;
var TheNPC57 : GameObject;

var NPC60 : GameObject;
var TheNPC60 : GameObject;
var NPC61 : GameObject;
var TheNPC61 : GameObject;
var NPC62 : GameObject;
var TheNPC62 : GameObject;
var NPC63 : GameObject;
var TheNPC63 : GameObject;

var NPC70 : GameObject;
var TheNPC70 : GameObject;
var NPC71 : GameObject;
var TheNPC71 : GameObject;
var NPC72 : GameObject;
var TheNPC72 : GameObject;
var NPC73 : GameObject;
var TheNPC73 : GameObject;
var NPC74 : GameObject;
var TheNPC74 : GameObject;
var NPC75 : GameObject;
var TheNPC75 : GameObject;
var NPC76 : GameObject;
var TheNPC76 : GameObject;
var NPC77 : GameObject;
var TheNPC77 : GameObject;
var NPC78 : GameObject;
var TheNPC78 : GameObject;
var NPC79 : GameObject;
var TheNPC79 : GameObject;

var NPC90 : GameObject;
var TheNPC90 : GameObject;
var NPC91 : GameObject;
var TheNPC91 : GameObject;
var NPC92 : GameObject;
var TheNPC92 : GameObject;
var NPC93 : GameObject;
var TheNPC93 : GameObject;
var NPC94 : GameObject;
var TheNPC94 : GameObject;
var NPC95 : GameObject;
var TheNPC95 : GameObject;

var P0SpawnChanceIn = 8;

var PH0SpawnChanceIn = 8;

var NPC000SpawnChanceIn = 8;
var NPC001SpawnChanceIn = 8;
var NPC002SpawnChanceIn = 8;
var NPC003SpawnChanceIn = 8;
var NPC004SpawnChanceIn = 8;
var NPC005SpawnChanceIn = 8;
var NPC006SpawnChanceIn = 8;
var NPC007SpawnChanceIn = 8;
var NPC008SpawnChanceIn = 8;
var NPC009SpawnChanceIn = 8;
var NPC0091SpawnChanceIn = 8;

var NPC0800SpawnChanceIn = 8;
var NPC0801SpawnChanceIn = 8;
var NPC0802SpawnChanceIn = 8;
var NPC0803SpawnChanceIn = 8;
var NPC0804SpawnChanceIn = 8;
var NPC0805SpawnChanceIn = 8;

var NPC080SpawnChanceIn = 8;
var NPC081SpawnChanceIn = 8;
var NPC082SpawnChanceIn = 8;

var NPC00SpawnChanceIn = 8;
var NPC01SpawnChanceIn = 8;
var NPC02SpawnChanceIn = 8;
var NPC03SpawnChanceIn = 8;
var NPC04SpawnChanceIn = 8;
var NPC05SpawnChanceIn = 8;

var NPC10SpawnChanceIn = 8;

var NPC20SpawnChanceIn = 8;
var NPC21SpawnChanceIn = 8;
var NPC22SpawnChanceIn = 8;
var NPC23SpawnChanceIn = 8;
var NPC24SpawnChanceIn = 8;
var NPC25SpawnChanceIn = 8;
var NPC26SpawnChanceIn = 8;
var NPC27SpawnChanceIn = 8;

var NPC300SpawnChanceIn = 8;
var NPC301SpawnChanceIn = 8;
var NPC302SpawnChanceIn = 8;
var NPC303SpawnChanceIn = 8;
var NPC310SpawnChanceIn = 8;
var NPC31SpawnChanceIn = 8;
var NPC32SpawnChanceIn = 8;
var NPC33SpawnChanceIn = 8;
var NPC34SpawnChanceIn = 8;
var NPC35SpawnChanceIn = 8;
var NPC36SpawnChanceIn = 8;
var NPC37SpawnChanceIn = 8;
var NPC39SpawnChanceIn = 8;

var NPC40SpawnChanceIn = 8;
var NPC41SpawnChanceIn = 8;
var NPC42SpawnChanceIn = 8;
var NPC43SpawnChanceIn = 8;
var NPC44SpawnChanceIn = 8;
var NPC45SpawnChanceIn = 8;

var NPC50SpawnChanceIn = 8;
var NPC51SpawnChanceIn = 8;
var NPC52SpawnChanceIn = 8;
var NPC53SpawnChanceIn = 8;
var NPC54SpawnChanceIn = 8;
var NPC55SpawnChanceIn = 8;
var NPC56SpawnChanceIn = 8;
var NPC57SpawnChanceIn = 8;

var NPC60SpawnChanceIn = 8;
var NPC61SpawnChanceIn = 8;
var NPC62SpawnChanceIn = 8;
var NPC63SpawnChanceIn = 8;

var NPC70SpawnChanceIn = 8;
var NPC71SpawnChanceIn = 8;
var NPC72SpawnChanceIn = 8;
var NPC73SpawnChanceIn = 8;
var NPC74SpawnChanceIn = 8;
var NPC75SpawnChanceIn = 8;
var NPC76SpawnChanceIn = 8;
var NPC77SpawnChanceIn = 8;
var NPC78SpawnChanceIn = 8;
var NPC79SpawnChanceIn = 8;

var NPC90SpawnChanceIn = 8;
var NPC91SpawnChanceIn = 8;
var NPC92SpawnChanceIn = 8;
var NPC93SpawnChanceIn = 8;
var NPC94SpawnChanceIn = 8;
var NPC95SpawnChanceIn = 8;

//Statics --------------------------------------------------------------

var P0StaticSpawnChanceIn = 8;

var PH0StaticSpawnChanceIn = 8;

var NPC000StaticSpawnChanceIn = 8;
var NPC001StaticSpawnChanceIn = 8;
var NPC002StaticSpawnChanceIn = 8;
var NPC003StaticSpawnChanceIn = 8;
var NPC004StaticSpawnChanceIn = 8;
var NPC005StaticSpawnChanceIn = 8;
var NPC006StaticSpawnChanceIn = 8;
var NPC007StaticSpawnChanceIn = 8;
var NPC008StaticSpawnChanceIn = 8;
var NPC009StaticSpawnChanceIn = 8;
var NPC0091StaticSpawnChanceIn = 8;

var NPC0800StaticSpawnChanceIn = 8;
var NPC0801StaticSpawnChanceIn = 8;
var NPC0802StaticSpawnChanceIn = 8;
var NPC0803StaticSpawnChanceIn = 8;
var NPC0804StaticSpawnChanceIn = 8;
var NPC0805StaticSpawnChanceIn = 8;

var NPC080StaticSpawnChanceIn = 8;
var NPC081StaticSpawnChanceIn = 8;
var NPC082StaticSpawnChanceIn = 8;

var NPC00StaticSpawnChanceIn = 8;
var NPC01StaticSpawnChanceIn = 8;
var NPC02StaticSpawnChanceIn = 8;
var NPC03StaticSpawnChanceIn = 8;
var NPC04StaticSpawnChanceIn = 8;
var NPC05StaticSpawnChanceIn = 8;

var NPC10StaticSpawnChanceIn = 8;

var NPC20StaticSpawnChanceIn = 8;
var NPC21StaticSpawnChanceIn = 8;
var NPC22StaticSpawnChanceIn = 8;
var NPC23StaticSpawnChanceIn = 8;
var NPC24StaticSpawnChanceIn = 8;
var NPC25StaticSpawnChanceIn = 8;
var NPC26StaticSpawnChanceIn = 8;
var NPC27StaticSpawnChanceIn = 8;

var NPC300StaticSpawnChanceIn = 8;
var NPC301StaticSpawnChanceIn = 8;
var NPC302StaticSpawnChanceIn = 8;
var NPC303StaticSpawnChanceIn = 8;
var NPC310StaticSpawnChanceIn = 8;
var NPC31StaticSpawnChanceIn = 8;
var NPC32StaticSpawnChanceIn = 8;
var NPC33StaticSpawnChanceIn = 8;
var NPC34StaticSpawnChanceIn = 8;
var NPC35StaticSpawnChanceIn = 8;
var NPC36StaticSpawnChanceIn = 8;
var NPC37StaticSpawnChanceIn = 8;
var NPC39StaticSpawnChanceIn = 8;

var NPC40StaticSpawnChanceIn = 8;
var NPC41StaticSpawnChanceIn = 8;
var NPC42StaticSpawnChanceIn = 8;
var NPC43StaticSpawnChanceIn = 8;
var NPC44StaticSpawnChanceIn = 8;
var NPC45StaticSpawnChanceIn = 8;

var NPC50StaticSpawnChanceIn = 8;
var NPC51StaticSpawnChanceIn = 8;
var NPC52StaticSpawnChanceIn = 8;
var NPC53StaticSpawnChanceIn = 8;
var NPC54StaticSpawnChanceIn = 8;
var NPC55StaticSpawnChanceIn = 8;
var NPC56StaticSpawnChanceIn = 8;
var NPC57StaticSpawnChanceIn = 8;

var NPC60StaticSpawnChanceIn = 8;
var NPC61StaticSpawnChanceIn = 8;
var NPC62StaticSpawnChanceIn = 8;
var NPC63StaticSpawnChanceIn = 8;

var NPC70StaticSpawnChanceIn = 8;
var NPC71StaticSpawnChanceIn = 8;
var NPC72StaticSpawnChanceIn = 8;
var NPC73StaticSpawnChanceIn = 8;
var NPC74StaticSpawnChanceIn = 8;
var NPC75StaticSpawnChanceIn = 8;
var NPC76StaticSpawnChanceIn = 8;
var NPC77StaticSpawnChanceIn = 8;
var NPC78StaticSpawnChanceIn = 8;
var NPC79StaticSpawnChanceIn = 8;

var NPC90StaticSpawnChanceIn = 8;
var NPC91StaticSpawnChanceIn = 8;
var NPC92StaticSpawnChanceIn = 8;
var NPC93StaticSpawnChanceIn = 8;
var NPC94StaticSpawnChanceIn = 8;
var NPC95StaticSpawnChanceIn = 8;

var AberrantAbettor : GameObject;

var AgrianVigil : GameObject;
var TheAgrianVigil : GameObject;

var PiriView : Transform;

var PiriPoint : Transform;

var SpawnSource : Transform;
var SpawnSourceS : Transform;

var SpawnPos : Transform;

var AltRot : Transform;

var AltaltRot : Transform;

var TripleAltTF : Transform;

var TripleAltParentTF : Transform;

var HugeSpawnPos1 : Transform;
var HugeSpawnPos2 : Transform;
var HugeSpawnPos3 : Transform;
var HugeSpawnPos4 : Transform;
var HugeSpawnPos5 : Transform;
var HugeSpawnPos6 : Transform;
var HugeSpawnPos7 : Transform;
var HugeSpawnPos8 : Transform;

var SpawningBig : boolean;

var Obscured : boolean;

var AreaSpace : boolean;

var AreaNum = 0;

var VelClamp = 1;

var Vel2 : float = 1;

var MovingFast : boolean;

var IsInPerson : boolean;

var VelBreak = 0;

var Count = 60;

var LowSpawnDist = 50;

var BigSpawnDist = 4000;

var HeightLimit = 2000;

var savedRotY : float = 0;

var targetLayers : LayerMask;

var targetLayers2 : LayerMask;

function Start(){

PiriView = PlayerInformation.instance.PhysCam;

AreaNum = WorldInformation.instance.AreaCode;

AreaSpace = WorldInformation.instance.AreaSpace;

transform.parent = null;

var SpawnPos = GameObject.Find("HugeSpawn1");
if (SpawnPos){
HugeSpawnPos1 = GameObject.Find("HugeSpawn1").transform;
HugeSpawnPos2 = GameObject.Find("HugeSpawn2").transform;
HugeSpawnPos3 = GameObject.Find("HugeSpawn3").transform;
HugeSpawnPos4 = GameObject.Find("HugeSpawn4").transform;
HugeSpawnPos5 = GameObject.Find("HugeSpawn5").transform;
HugeSpawnPos6 = GameObject.Find("HugeSpawn6").transform;
HugeSpawnPos7 = GameObject.Find("HugeSpawn7").transform;
HugeSpawnPos8 = GameObject.Find("HugeSpawn8").transform;
}

TheNPC000N = 0;
TheNPC001N = 0;
TheNPC002N = 0;
TheNPC003N = 0;
TheNPC004N = 0;
TheNPC005N = 0;
TheNPC009N = 0;
TheNPC0091N = 0;
TheNPC0805N = 0;

//Planet Pirizuka
if(AreaNum == 0){

HeightLimit = 2000;

//Objects
P0SpawnChanceIn = 0; //PagesGobnard

//Phenomenons
PH0SpawnChanceIn = 0; //Dust Devil

//Civilians & Creatures
NPC000SpawnChanceIn = 0; //Peuktato
NPC001SpawnChanceIn = 0; //Peuktorb
NPC002SpawnChanceIn = 0; //Peuktuber
NPC003SpawnChanceIn = 0; //Peuknyth
NPC004SpawnChanceIn = 0; //Peuknyil
NPC005SpawnChanceIn = 0; //Peukopede
NPC006SpawnChanceIn = 0; //Big Peukopede
NPC007SpawnChanceIn = 0; //Svibra Cloud
NPC008SpawnChanceIn = 0; //Big Svibra Cloud
NPC009SpawnChanceIn = 0; //Cykin
NPC0091SpawnChanceIn = 0; //Turgkin
NPC0800SpawnChanceIn = 0; //Oot1
NPC0801SpawnChanceIn = 0; //Oot2
NPC0802SpawnChanceIn = 0; //Oot3
NPC0803SpawnChanceIn = 0; //Oot4
NPC0804SpawnChanceIn = 0; //OotDut1
NPC0805SpawnChanceIn = 0; //OotDut1Group
NPC080SpawnChanceIn = 0; //Shadowfinger Ootkin
NPC081SpawnChanceIn = 0; //Athnian Ootkin 1
NPC082SpawnChanceIn = 0; //Athnian Ootkin 2
NPC00SpawnChanceIn = 0; //Afazis Terracruiser EC-1
NPC01SpawnChanceIn = 0; //TAK B-l4
NPC02SpawnChanceIn = 0; //Ezyfus Bejsirf Apta
NPC03SpawnChanceIn = 0; //Carbondyle Fecuda C.211
NPC04SpawnChanceIn = 0; //Slavoico BImG-500
NPC05SpawnChanceIn = 0; //Carbondyle Fecuda C.115
//PrincipalCharacters
NPC10SpawnChanceIn = 0; //Someone
//Agrians
NPC20SpawnChanceIn = 0; //Enforcer
NPC21SpawnChanceIn = 0; //Sentinel
NPC22SpawnChanceIn = 0; //Agent
NPC23SpawnChanceIn = 0; //Executor
NPC24SpawnChanceIn = 0; //SuperExecutor
NPC25SpawnChanceIn = 0; //Helirotor
NPC26SpawnChanceIn = 0; //Annihilator
NPC27SpawnChanceIn = 0; //Distributor
//Terrahyptians
NPC300SpawnChanceIn = 0; //LevNav Eos
NPC301SpawnChanceIn = 0; //LevNav Ithis
NPC302SpawnChanceIn = 0; //LevNav MAL
NPC303SpawnChanceIn = 0; //LevNav Darion
NPC310SpawnChanceIn = 0; //Bothunter
NPC31SpawnChanceIn = 0; //Valiant
NPC32SpawnChanceIn = 0; //FecarB1
NPC33SpawnChanceIn = 0; //DasNavCruiser
NPC34SpawnChanceIn = 0; //TRN RD-1
NPC35SpawnChanceIn = 0; //TLFAdamant
NPC36SpawnChanceIn = 0; //TLF Fughunter
NPC37SpawnChanceIn = 0; //TLF LRCM Neutralizer
NPC39SpawnChanceIn = 0; //TRN Zerana
//Aberrants
NPC40SpawnChanceIn = 0; //Abettor
NPC41SpawnChanceIn = 0; //Gunner
NPC42SpawnChanceIn = 0; //Militant
NPC43SpawnChanceIn = 0; //Marauder
NPC44SpawnChanceIn = 0; //Mercenary
NPC45SpawnChanceIn = 0; //Cruiser
//Slavuics
NPC50SpawnChanceIn = 0; //Civilian
NPC51SpawnChanceIn = 0; //Watchmen
NPC52SpawnChanceIn = 0; //Mistitor
NPC53SpawnChanceIn = 0; //Civilian2
NPC54SpawnChanceIn = 0; //Snositor
NPC55SpawnChanceIn = 0; //Vanguard
NPC56SpawnChanceIn = 0; //Smertnik
NPC57SpawnChanceIn = 0; //Satnik
//Al-Atiba
NPC60SpawnChanceIn = 0; //Van
NPC61SpawnChanceIn = 0; //Guncarrier
NPC62SpawnChanceIn = 0; //Bejsirf
NPC63SpawnChanceIn = 0; //Microcruiser
//MevNavs
NPC70SpawnChanceIn = 0; //Scout Drone
NPC71SpawnChanceIn = 0; //Battle Drone
NPC72SpawnChanceIn = 0; //Cannon Drone
NPC73SpawnChanceIn = 0; //Squire
NPC74SpawnChanceIn = 0; //Archer
NPC75SpawnChanceIn = 0; //Scabbard
NPC76SpawnChanceIn = 0; //Warmonger
NPC77SpawnChanceIn = 0; //Knight
NPC78SpawnChanceIn = 0; //Deus
NPC79SpawnChanceIn = 0; //Eschatos
//Dutvutanians
NPC90SpawnChanceIn = 0; //DutvutanianCivilian1
NPC91SpawnChanceIn = 0; //DutvutanianCivilian2
NPC92SpawnChanceIn = 0; //DutvutanianCivilian3
NPC93SpawnChanceIn = 0; //DutvutanianIntelShip1
NPC94SpawnChanceIn = 0; //DutvutanianPolice1
NPC95SpawnChanceIn = 0; //DutvutanianObmurat1

AgrianVigil = null;
}
//Maedracan Desert
if(AreaNum == 1){

HeightLimit = 2000;

//Objects
P0SpawnChanceIn = 24; //PagesGobnard

//Phenomenons
PH0SpawnChanceIn = 8; //Dust Devil

//Civilians & Creatures
NPC000SpawnChanceIn = 0; //Peuktato
NPC001SpawnChanceIn = 0; //Peuktorb
NPC002SpawnChanceIn = 0; //Peuktuber
NPC003SpawnChanceIn = 0; //Peuknyth
NPC004SpawnChanceIn = 0; //Peuknyil
NPC005SpawnChanceIn = 0; //Peukopede
NPC006SpawnChanceIn = 0; //Big Peukopede
NPC007SpawnChanceIn = 0; //Svibra Cloud
NPC008SpawnChanceIn = 0; //Big Svibra Cloud
NPC009SpawnChanceIn = 0; //Cykin
NPC0091SpawnChanceIn = 0; //Turgkin
NPC0800SpawnChanceIn = 0; //Oot1
NPC0801SpawnChanceIn = 0; //Oot2
NPC0802SpawnChanceIn = 0; //Oot3
NPC0803SpawnChanceIn = 0; //Oot4
NPC0804SpawnChanceIn = 0; //OotDut1
NPC0805SpawnChanceIn = 0; //OotDut1Group
NPC080SpawnChanceIn = 0; //Shadowfinger Ootkin
NPC081SpawnChanceIn = 0; //Athnian Ootkin 1
NPC082SpawnChanceIn = 0; //Athnian Ootkin 2
NPC00SpawnChanceIn = 800; //Afazis Terracruiser EC-1
NPC01SpawnChanceIn = 400; //TAK B-l4
NPC02SpawnChanceIn = 250; //Ezyfus Bejsirf Apta
NPC03SpawnChanceIn = 4800; //Carbondyle Fecuda C.211
NPC04SpawnChanceIn = 800; //Slavoico BImG-500
NPC05SpawnChanceIn = 1600; //Carbondyle Fecuda C.115
//PrincipalCharacters
NPC10SpawnChanceIn = 0; //Someone
//Agrians
NPC20SpawnChanceIn = 100; //Enforcer
NPC21SpawnChanceIn = 150; //Sentinel
NPC22SpawnChanceIn = 400; //Agent
NPC23SpawnChanceIn = 800; //Executor
NPC24SpawnChanceIn = 9000; //SuperExecutor
NPC25SpawnChanceIn = 700; //Helirotor
NPC26SpawnChanceIn = 1; //Annihilator
NPC27SpawnChanceIn = 1; //Distributor
//Terrahyptians
NPC300SpawnChanceIn = 0; //LevNav Eos
NPC301SpawnChanceIn = 0; //LevNav Ithis
NPC302SpawnChanceIn = 0; //LevNav MAL
NPC303SpawnChanceIn = 0; //LevNav Darion
NPC310SpawnChanceIn = 200; //Bothunter
NPC31SpawnChanceIn = 4000; //Valiant
NPC32SpawnChanceIn = 3000; //FecarB1
NPC33SpawnChanceIn = 7000; //DasNavCruiser
NPC34SpawnChanceIn = 0; //TRN RD-1
NPC35SpawnChanceIn = 1; //TLFAdamant
NPC36SpawnChanceIn = 4000; //TLF Fughunter
NPC37SpawnChanceIn = 1; //TLF LRCM Neutralizer
NPC39SpawnChanceIn = 256; //TRN Zerana
//Aberrants
NPC40SpawnChanceIn = 100; //Abettor
NPC41SpawnChanceIn = 100; //Gunner
NPC42SpawnChanceIn = 100; //Militant
NPC43SpawnChanceIn = 400; //Marauder
NPC44SpawnChanceIn = 600; //Mercenary
NPC45SpawnChanceIn = 1000; //Cruiser
//Slavuics
NPC50SpawnChanceIn = 200; //Civilian
NPC51SpawnChanceIn = 250; //Watchmen
NPC52SpawnChanceIn = 2000; //Mistitor
NPC53SpawnChanceIn = 200; //Civilian2
NPC54SpawnChanceIn = 800; //Snositor
NPC55SpawnChanceIn = 300; //Vanguard
NPC56SpawnChanceIn = 1; //Smertnik
NPC57SpawnChanceIn = 300; //Satnik
//Al-Atiba
NPC60SpawnChanceIn = 350; //Van
NPC61SpawnChanceIn = 400; //Guncarrier
NPC62SpawnChanceIn = 500; //Bejsirf
NPC63SpawnChanceIn = 800; //Microcruiser
//MevNavs
NPC70SpawnChanceIn = 300; //Scout Drone
NPC71SpawnChanceIn = 500; //Battle Drone
NPC72SpawnChanceIn = 600; //Cannon Drone
NPC73SpawnChanceIn = 300; //Squire
NPC74SpawnChanceIn = 600; //Archer
NPC75SpawnChanceIn = 800; //Scabbard
NPC76SpawnChanceIn = 400; //Warmonger
NPC77SpawnChanceIn = 1000; //Knight
NPC78SpawnChanceIn = 9000; //Deus
NPC79SpawnChanceIn = 1; //Eschatos
//Dutvutanians
NPC90SpawnChanceIn = 0; //DutvutanianCivilian1
NPC91SpawnChanceIn = 0; //DutvutanianCivilian2
NPC92SpawnChanceIn = 0; //DutvutanianCivilian3
NPC93SpawnChanceIn = 1; //DutvutanianIntelShip1
NPC94SpawnChanceIn = 0; //DutvutanianPolice1
NPC95SpawnChanceIn = 1; //DutvutanianObmurat1
}
//Anod Outpost
if(AreaNum == 2){

HeightLimit = 2000;

//Objects
P0SpawnChanceIn = 16; //PagesGobnard

//Phenomenons
PH0SpawnChanceIn = 8; //Dust Devil

//Civilians & Creatures
NPC000SpawnChanceIn = 0; //Peuktato
NPC001SpawnChanceIn = 0; //Peuktorb
NPC002SpawnChanceIn = 0; //Peuktuber
NPC003SpawnChanceIn = 0; //Peuknyth
NPC004SpawnChanceIn = 0; //Peuknyil
NPC005SpawnChanceIn = 0; //Peukopede
NPC006SpawnChanceIn = 0; //Big Peukopede
NPC007SpawnChanceIn = 0; //Svibra Cloud
NPC008SpawnChanceIn = 0; //Big Svibra Cloud
NPC009SpawnChanceIn = 0; //Cykin
NPC0091SpawnChanceIn = 0; //Turgkin
NPC0800SpawnChanceIn = 0; //Oot1
NPC0801SpawnChanceIn = 0; //Oot2
NPC0802SpawnChanceIn = 0; //Oot3
NPC0803SpawnChanceIn = 0; //Oot4
NPC0804SpawnChanceIn = 0; //OotDut1
NPC0805SpawnChanceIn = 0; //OotDut1Group
NPC080SpawnChanceIn = 0; //Shadowfinger Ootkin
NPC081SpawnChanceIn = 0; //Athnian Ootkin 1
NPC082SpawnChanceIn = 0; //Athnian Ootkin 2
NPC00SpawnChanceIn = 200; //Afazis Terracruiser EC-1
NPC01SpawnChanceIn = 300; //TAK B-l4
NPC02SpawnChanceIn = 200; //Ezyfus Bejsirf Apta
NPC03SpawnChanceIn = 3000; //Carbondyle Fecuda C.211
NPC04SpawnChanceIn = 800; //Slavoico BImG-500
NPC05SpawnChanceIn = 1000; //Carbondyle Fecuda C.115
//PrincipalCharacters
NPC10SpawnChanceIn = 0; //Someone
//Agrians
NPC20SpawnChanceIn = 150; //Enforcer
NPC21SpawnChanceIn = 150; //Sentinel
NPC22SpawnChanceIn = 400; //Agent
NPC23SpawnChanceIn = 1000; //Executor
NPC24SpawnChanceIn = 1; //SuperExecutor
NPC25SpawnChanceIn = 1; //Helirotor
NPC26SpawnChanceIn = 1; //Annihilator
NPC27SpawnChanceIn = 1; //Distributor
//Terrahyptians
NPC300SpawnChanceIn = 0; //LevNav Eos
NPC301SpawnChanceIn = 0; //LevNav Ithis
NPC302SpawnChanceIn = 0; //LevNav MAL
NPC303SpawnChanceIn = 0; //LevNav Darion
NPC310SpawnChanceIn = 200; //Bothunter
NPC31SpawnChanceIn = 400; //Valiant
NPC32SpawnChanceIn = 1000; //FecarB1
NPC33SpawnChanceIn = 8; //DasNavCruiser
NPC34SpawnChanceIn = 0; //TRN RD-1
NPC35SpawnChanceIn = 1; //TLFAdamant
NPC36SpawnChanceIn = 1000; //TLF Fughunter
NPC37SpawnChanceIn = 1; //TLF LRCM Neutralizer
NPC39SpawnChanceIn = 128; //TRN Zerana
//Aberrants
NPC40SpawnChanceIn = 200; //Abettor
NPC41SpawnChanceIn = 100; //Gunner
NPC42SpawnChanceIn = 400; //Militant
NPC43SpawnChanceIn = 1000; //Marauder
NPC44SpawnChanceIn = 2000; //Mercenary
NPC45SpawnChanceIn = 4000; //Cruiser
//Slavuics
NPC50SpawnChanceIn = 1000; //Civilian
NPC51SpawnChanceIn = 850; //Watchmen
NPC52SpawnChanceIn = 3500; //Mistitor
NPC53SpawnChanceIn = 1500; //Civilian2
NPC54SpawnChanceIn = 5000; //Snositor
NPC55SpawnChanceIn = 1000; //Vanguard
NPC56SpawnChanceIn = 1; //Smertnik
NPC57SpawnChanceIn = 500; //Satnik
//Al-Atiba
NPC60SpawnChanceIn = 1000; //Van
NPC61SpawnChanceIn = 1500; //Guncarrier
NPC62SpawnChanceIn = 1000; //Bejsirf
NPC63SpawnChanceIn = 3000; //Microcruiser
//MevNavs
NPC70SpawnChanceIn = 2000; //Scout Drone
NPC71SpawnChanceIn = 3000; //Battle Drone
NPC72SpawnChanceIn = 3000; //Cannon Drone
NPC73SpawnChanceIn = 3000; //Squire
NPC74SpawnChanceIn = 3000; //Archer
NPC75SpawnChanceIn = 4000; //Scabbard
NPC76SpawnChanceIn = 4000; //Warmonger
NPC77SpawnChanceIn = 8000; //Knight
NPC78SpawnChanceIn = 0; //Deus
NPC79SpawnChanceIn = 1; //Eschatos
//Dutvutanians
NPC90SpawnChanceIn = 0; //DutvutanianCivilian1
NPC91SpawnChanceIn = 0; //DutvutanianCivilian2
NPC92SpawnChanceIn = 0; //DutvutanianCivilian3
NPC93SpawnChanceIn = 1; //DutvutanianIntelShip1
NPC94SpawnChanceIn = 0; //DutvutanianPolice1
NPC95SpawnChanceIn = 1; //DutvutanianObmurat1
}
//Jaéden Agracoast
if(AreaNum == 3){

HeightLimit = 2000;

//Objects
P0SpawnChanceIn = 16; //PagesGobnard

//Phenomenons
PH0SpawnChanceIn = 8; //Dust Devil

//Civilians & Creatures
NPC000SpawnChanceIn = 0; //Peuktato
NPC001SpawnChanceIn = 0; //Peuktorb
NPC002SpawnChanceIn = 0; //Peuktuber
NPC003SpawnChanceIn = 0; //Peuknyth
NPC004SpawnChanceIn = 0; //Peuknyil
NPC005SpawnChanceIn = 0; //Peukopede
NPC006SpawnChanceIn = 0; //Big Peukopede
NPC007SpawnChanceIn = 0; //Svibra Cloud
NPC008SpawnChanceIn = 0; //Big Svibra Cloud
NPC009SpawnChanceIn = 0; //Cykin
NPC0091SpawnChanceIn = 0; //Turgkin
NPC0800SpawnChanceIn = 0; //Oot1
NPC0801SpawnChanceIn = 0; //Oot2
NPC0802SpawnChanceIn = 0; //Oot3
NPC0803SpawnChanceIn = 0; //Oot4
NPC0804SpawnChanceIn = 0; //OotDut1
NPC0805SpawnChanceIn = 0; //OotDut1Group
NPC080SpawnChanceIn = 0; //Shadowfinger Ootkin
NPC081SpawnChanceIn = 0; //Athnian Ootkin 1
NPC082SpawnChanceIn = 0; //Athnian Ootkin 2
NPC00SpawnChanceIn = 300; //Afazis Terracruiser EC-1
NPC01SpawnChanceIn = 250; //TAK B-l4
NPC02SpawnChanceIn = 150; //Ezyfus Bejsirf Apta
NPC03SpawnChanceIn = 2000; //Carbondyle Fecuda C.211
NPC04SpawnChanceIn = 500; //Slavoico BImG-500
NPC05SpawnChanceIn = 700; //Carbondyle Fecuda C.115
//PrincipalCharacters
NPC10SpawnChanceIn = 0; //Someone
//Agrians
NPC20SpawnChanceIn = 100; //Enforcer
NPC21SpawnChanceIn = 100; //Sentinel
NPC22SpawnChanceIn = 500; //Agent
NPC23SpawnChanceIn = 1000; //Executor
NPC24SpawnChanceIn = 1; //SuperExecutor
NPC25SpawnChanceIn = 800; //Helirotor
NPC26SpawnChanceIn = 1; //Annihilator
NPC27SpawnChanceIn = 1; //Distributor
//Terrahyptians
NPC300SpawnChanceIn = 1; //LevNav Eos
NPC301SpawnChanceIn = 200; //LevNav Ithis
NPC302SpawnChanceIn = 1; //LevNav MAL
NPC303SpawnChanceIn = 1; //LevNav Darion
NPC310SpawnChanceIn = 200; //Bothunter
NPC31SpawnChanceIn = 300; //Valiant
NPC32SpawnChanceIn = 500; //FecarB1
NPC33SpawnChanceIn = 0; //DasNavCruiser
NPC34SpawnChanceIn = 0; //TRN RD-1
NPC35SpawnChanceIn = 1; //TLFAdamant
NPC36SpawnChanceIn = 1000; //TLF Fughunter
NPC37SpawnChanceIn = 1; //TLF LRCM Neutralizer
NPC39SpawnChanceIn = 128; //TRN Zerana
//Aberrants
NPC40SpawnChanceIn = 200; //Abettor
NPC41SpawnChanceIn = 100; //Gunner
NPC42SpawnChanceIn = 150; //Militant
NPC43SpawnChanceIn = 500; //Marauder
NPC44SpawnChanceIn = 800; //Mercenary
NPC45SpawnChanceIn = 1500; //Cruiser
//Slavuics
NPC50SpawnChanceIn = 1000; //Civilian
NPC51SpawnChanceIn = 850; //Watchmen
NPC52SpawnChanceIn = 3500; //Mistitor
NPC53SpawnChanceIn = 1500; //Civilian2
NPC54SpawnChanceIn = 5000; //Snositor
NPC55SpawnChanceIn = 1000; //Vanguard
NPC56SpawnChanceIn = 1; //Smertnik
NPC57SpawnChanceIn = 500; //Satnik
//Al-Atiba
NPC60SpawnChanceIn = 500; //Van
NPC61SpawnChanceIn = 800; //Guncarrier
NPC62SpawnChanceIn = 800; //Bejsirf
NPC63SpawnChanceIn = 1500; //Microcruiser
//MevNavs
NPC70SpawnChanceIn = 600; //Scout Drone
NPC71SpawnChanceIn = 800; //Battle Drone
NPC72SpawnChanceIn = 800; //Cannon Drone
NPC73SpawnChanceIn = 700; //Squire
NPC74SpawnChanceIn = 800; //Archer
NPC75SpawnChanceIn = 1500; //Scabbard
NPC76SpawnChanceIn = 1000; //Warmonger
NPC77SpawnChanceIn = 3000; //Knight
NPC78SpawnChanceIn = 9000; //Deus
NPC79SpawnChanceIn = 1; //Eschatos
//Dutvutanians
NPC90SpawnChanceIn = 0; //DutvutanianCivilian1
NPC91SpawnChanceIn = 0; //DutvutanianCivilian2
NPC92SpawnChanceIn = 0; //DutvutanianCivilian3
NPC93SpawnChanceIn = 1; //DutvutanianIntelShip1
NPC94SpawnChanceIn = 0; //DutvutanianPolice1
NPC95SpawnChanceIn = 1; //DutvutanianObmurat1
}
//Central Athnias
if(AreaNum == 4){

HeightLimit = 2000;

//Objects
P0SpawnChanceIn = 24; //PagesGobnard

//Phenomenons
PH0SpawnChanceIn = 0; //Dust Devil

//Civilians & Creatures
NPC000SpawnChanceIn = 0; //Peuktato
NPC001SpawnChanceIn = 0; //Peuktorb
NPC002SpawnChanceIn = 0; //Peuktuber
NPC003SpawnChanceIn = 0; //Peuknyth
NPC004SpawnChanceIn = 0; //Peuknyil
NPC005SpawnChanceIn = 0; //Peukopede
NPC006SpawnChanceIn = 0; //Big Peukopede
NPC007SpawnChanceIn = 0; //Svibra Cloud
NPC008SpawnChanceIn = 0; //Big Svibra Cloud
NPC009SpawnChanceIn = 0; //Cykin
NPC0091SpawnChanceIn = 0; //Turgkin
NPC0800SpawnChanceIn = 300; //Oot1
NPC0801SpawnChanceIn = 300; //Oot2
NPC0802SpawnChanceIn = 100; //Oot3
NPC0803SpawnChanceIn = 100; //Oot4
NPC0804SpawnChanceIn = 0; //OotDut1
NPC0805SpawnChanceIn = 0; //OotDut1Group
NPC080SpawnChanceIn = 0; //Shadowfinger Ootkin
NPC081SpawnChanceIn = 256; //Athnian Ootkin 1
NPC082SpawnChanceIn = 256; //Athnian Ootkin 2
NPC00SpawnChanceIn = 200; //Afazis Terracruiser EC-1
NPC01SpawnChanceIn = 200; //TAK B-l4
NPC02SpawnChanceIn = 100; //Ezyfus Bejsirf Apta
NPC03SpawnChanceIn = 2000; //Carbondyle Fecuda C.211
NPC04SpawnChanceIn = 800; //Slavoico BImG-500
NPC05SpawnChanceIn = 750; //Carbondyle Fecuda C.115
//PrincipalCharacters
NPC10SpawnChanceIn = 0; //Someone
//Agrians
NPC20SpawnChanceIn = 100; //Enforcer
NPC21SpawnChanceIn = 100; //Sentinel
NPC22SpawnChanceIn = 1; //Agent
NPC23SpawnChanceIn = 1; //Executor
NPC24SpawnChanceIn = 1; //SuperExecutor
NPC25SpawnChanceIn = 0; //Helirotor
NPC26SpawnChanceIn = 1; //Annihilator
NPC27SpawnChanceIn = 1; //Distributor
//Terrahyptians
NPC300SpawnChanceIn = 0; //LevNav Eos
NPC301SpawnChanceIn = 0; //LevNav Ithis
NPC302SpawnChanceIn = 0; //LevNav MAL
NPC303SpawnChanceIn = 0; //LevNav Darion
NPC310SpawnChanceIn = 300; //Bothunter
NPC31SpawnChanceIn = 150; //Valiant
NPC32SpawnChanceIn = 500; //FecarB1
NPC33SpawnChanceIn = 0; //DasNavCruiser
NPC34SpawnChanceIn = 1; //TRN RD-1
NPC35SpawnChanceIn = 1; //TLFAdamant
NPC36SpawnChanceIn = 1000; //TLF Fughunter
NPC37SpawnChanceIn = 1; //TLF LRCM Neutralizer
NPC39SpawnChanceIn = 64; //TRN Zerana
//Aberrants
NPC40SpawnChanceIn = 4000; //Abettor
NPC41SpawnChanceIn = 6000; //Gunner
NPC42SpawnChanceIn = 8000; //Militant
NPC43SpawnChanceIn = 0; //Marauder
NPC44SpawnChanceIn = 0; //Mercenary
NPC45SpawnChanceIn = 0; //Cruiser
//Slavuics
NPC50SpawnChanceIn = 700; //Civilian
NPC51SpawnChanceIn = 450; //Watchmen
NPC52SpawnChanceIn = 3500; //Mistitor
NPC53SpawnChanceIn = 850; //Civilian2
NPC54SpawnChanceIn = 5000; //Snositor
NPC55SpawnChanceIn = 2000; //Vanguard
NPC56SpawnChanceIn = 1; //Smertnik
NPC57SpawnChanceIn = 500; //Satnik
//Al-Atiba
NPC60SpawnChanceIn = 3000; //Van
NPC61SpawnChanceIn = 6000; //Guncarrier
NPC62SpawnChanceIn = 6000; //Bejsirf
NPC63SpawnChanceIn = 0; //Microcruiser
//MevNavs
NPC70SpawnChanceIn = 2000; //Scout Drone
NPC71SpawnChanceIn = 3000; //Battle Drone
NPC72SpawnChanceIn = 3500; //Cannon Drone
NPC73SpawnChanceIn = 4000; //Squire
NPC74SpawnChanceIn = 5000; //Archer
NPC75SpawnChanceIn = 5000; //Scabbard
NPC76SpawnChanceIn = 5000; //Warmonger
NPC77SpawnChanceIn = 9000; //Knight
NPC78SpawnChanceIn = 0; //Deus
NPC79SpawnChanceIn = 1; //Eschatos
//Dutvutanians
NPC90SpawnChanceIn = 0; //DutvutanianCivilian1
NPC91SpawnChanceIn = 0; //DutvutanianCivilian2
NPC92SpawnChanceIn = 0; //DutvutanianCivilian3
NPC93SpawnChanceIn = 1; //DutvutanianIntelShip1
NPC94SpawnChanceIn = 0; //DutvutanianPolice1
NPC95SpawnChanceIn = 1; //DutvutanianObmurat1
}
//Dark Keigan Sanis
if(AreaNum == 5){

HeightLimit = 2000;

//Objects
P0SpawnChanceIn = 48; //PagesGobnard

//Phenomenons
PH0SpawnChanceIn = 0; //Dust Devil

//Civilians & Creatures
NPC000SpawnChanceIn = 300; //Peuktato
NPC001SpawnChanceIn = 32; //Peuktorb
NPC002SpawnChanceIn = 64; //Peuktuber
NPC003SpawnChanceIn = 200; //Peuknyth
NPC004SpawnChanceIn = 600; //Peuknyil
NPC005SpawnChanceIn = 100; //Peukopede
NPC006SpawnChanceIn = 600; //Big Peukopede
NPC007SpawnChanceIn = 32; //Svibra Cloud
NPC008SpawnChanceIn = 512; //Big Svibra Cloud
NPC009SpawnChanceIn = 0; //Cykin
NPC0091SpawnChanceIn = 0; //Turgkin
NPC0800SpawnChanceIn = 16; //Oot1
NPC0801SpawnChanceIn = 16; //Oot2
NPC0802SpawnChanceIn = 16; //Oot3
NPC0803SpawnChanceIn = 16; //Oot4
NPC0804SpawnChanceIn = 0; //OotDut1
NPC0805SpawnChanceIn = 0; //OotDut1Group
NPC080SpawnChanceIn = 200; //Shadowfinger Ootkin
NPC081SpawnChanceIn = 0; //Athnian Ootkin 1
NPC082SpawnChanceIn = 0; //Athnian Ootkin 2
NPC00SpawnChanceIn = 1000; //Afazis Terracruiser EC-1
NPC01SpawnChanceIn = 0; //TAK B-l4
NPC02SpawnChanceIn = 0; //Ezyfus Bejsirf Apta
NPC03SpawnChanceIn = 4000; //Carbondyle Fecuda C.211
NPC04SpawnChanceIn = 0; //Slavoico BImG-500
NPC05SpawnChanceIn = 2000; //Carbondyle Fecuda C.115
//PrincipalCharacters
NPC10SpawnChanceIn = 0; //Someone
//Agrians
NPC20SpawnChanceIn = 500; //Enforcer
NPC21SpawnChanceIn = 400; //Sentinel
NPC22SpawnChanceIn = 1; //Agent
NPC23SpawnChanceIn = 1; //Executor
NPC24SpawnChanceIn = 1; //SuperExecutor
NPC25SpawnChanceIn = 0; //Helirotor
NPC26SpawnChanceIn = 1; //Annihilator
NPC27SpawnChanceIn = 1; //Distributor
//Terrahyptians
NPC300SpawnChanceIn = 0; //LevNav Eos
NPC301SpawnChanceIn = 0; //LevNav Ithis
NPC302SpawnChanceIn = 0; //LevNav MAL
NPC303SpawnChanceIn = 0; //LevNav Darion
NPC310SpawnChanceIn = 1000; //Bothunter
NPC31SpawnChanceIn = 0; //Valiant
NPC32SpawnChanceIn = 3000; //FecarB1
NPC33SpawnChanceIn = 0; //DasNavCruiser
NPC34SpawnChanceIn = 0; //TRN RD-1
NPC35SpawnChanceIn = 0; //TLFAdamant
NPC36SpawnChanceIn = 1000; //TLF Fughunter
NPC37SpawnChanceIn = 1; //TLF LRCM Neutralizer
NPC39SpawnChanceIn = 0; //TRN Zerana
//Aberrants
NPC40SpawnChanceIn = 1000; //Abettor
NPC41SpawnChanceIn = 1000; //Gunner
NPC42SpawnChanceIn = 1000; //Militant
NPC43SpawnChanceIn = 0; //Marauder
NPC44SpawnChanceIn = 0; //Mercenary
NPC45SpawnChanceIn = 0; //Cruiser
//Slavuics
NPC50SpawnChanceIn = 0; //Civilian
NPC51SpawnChanceIn = 0; //Watchmen
NPC52SpawnChanceIn = 0; //Mistitor
NPC53SpawnChanceIn = 0; //Civilian2
NPC54SpawnChanceIn = 0; //Snositor
NPC55SpawnChanceIn = 0; //Vanguard
NPC56SpawnChanceIn = 1; //Smertnik
NPC57SpawnChanceIn = 0; //Satnik
//Al-Atiba
NPC60SpawnChanceIn = 4000; //Van
NPC61SpawnChanceIn = 8000; //Guncarrier
NPC62SpawnChanceIn = 0; //Bejsirf
NPC63SpawnChanceIn = 0; //Microcruiser
//MevNavs
NPC70SpawnChanceIn = 0; //Scout Drone
NPC71SpawnChanceIn = 0; //Battle Drone
NPC72SpawnChanceIn = 0; //Cannon Drone
NPC73SpawnChanceIn = 0; //Squire
NPC74SpawnChanceIn = 0; //Archer
NPC75SpawnChanceIn = 0; //Scabbard
NPC76SpawnChanceIn = 0; //Warmonger
NPC77SpawnChanceIn = 0; //Knight
NPC78SpawnChanceIn = 0; //Deus
NPC79SpawnChanceIn = 0; //Eschatos
//Dutvutanians
NPC90SpawnChanceIn = 0; //DutvutanianCivilian1
NPC91SpawnChanceIn = 0; //DutvutanianCivilian2
NPC92SpawnChanceIn = 0; //DutvutanianCivilian3
NPC93SpawnChanceIn = 1; //DutvutanianIntelShip1
NPC94SpawnChanceIn = 0; //DutvutanianPolice1
NPC95SpawnChanceIn = 1; //DutvutanianObmurat1
}
//Acrityrda
if(AreaNum == 6){

HeightLimit = 1100;

//Objects
P0SpawnChanceIn = 96; //PagesGobnard

//Phenomenons
PH0SpawnChanceIn = 0; //Dust Devil

//Civilians & Creatures
NPC000SpawnChanceIn = 32; //Peuktato
NPC001SpawnChanceIn = 32; //Peuktorb
NPC002SpawnChanceIn = 32; //Peuktuber
NPC003SpawnChanceIn = 32; //Peuknyth
NPC004SpawnChanceIn = 32; //Peuknyil
NPC005SpawnChanceIn = 32; //Peukopede
NPC006SpawnChanceIn = 64; //Big Peukopede
NPC007SpawnChanceIn = 64; //Svibra Cloud
NPC008SpawnChanceIn = 0; //Big Svibra Cloud
NPC009SpawnChanceIn = 0; //Cykin
NPC0091SpawnChanceIn = 0; //Turgkin
NPC0800SpawnChanceIn = 8; //Oot1
NPC0801SpawnChanceIn = 8; //Oot2
NPC0802SpawnChanceIn = 8; //Oot3
NPC0803SpawnChanceIn = 8; //Oot4
NPC0804SpawnChanceIn = 0; //OotDut1
NPC0805SpawnChanceIn = 0; //OotDut1Group
NPC080SpawnChanceIn = 64; //Shadowfinger Ootkin
NPC081SpawnChanceIn = 0; //Athnian Ootkin 1
NPC082SpawnChanceIn = 0; //Athnian Ootkin 2
NPC00SpawnChanceIn = 0; //Afazis Terracruiser EC-1
NPC01SpawnChanceIn = 0; //TAK B-l4
NPC02SpawnChanceIn = 0; //Ezyfus Bejsirf Apta
NPC03SpawnChanceIn = 0; //Carbondyle Fecuda C.211
NPC04SpawnChanceIn = 0; //Slavoico BImG-500
NPC05SpawnChanceIn = 0; //Carbondyle Fecuda C.115
//PrincipalCharacters
NPC10SpawnChanceIn = 0; //Someone
//Agrians
NPC20SpawnChanceIn = 0; //Enforcer
NPC21SpawnChanceIn = 0; //Sentinel
NPC22SpawnChanceIn = 0; //Agent
NPC23SpawnChanceIn = 0; //Executor
NPC24SpawnChanceIn = 0; //SuperExecutor
NPC25SpawnChanceIn = 0; //Helirotor
NPC26SpawnChanceIn = 0; //Annihilator
NPC27SpawnChanceIn = 0; //Distributor
//Terrahyptians
NPC300SpawnChanceIn = 0; //LevNav Eos
NPC301SpawnChanceIn = 0; //LevNav Ithis
NPC302SpawnChanceIn = 0; //LevNav MAL
NPC303SpawnChanceIn = 0; //LevNav Darion
NPC310SpawnChanceIn = 0; //Bothunter
NPC31SpawnChanceIn = 0; //Valiant
NPC32SpawnChanceIn = 0; //FecarB1
NPC33SpawnChanceIn = 0; //DasNavCruiser
NPC34SpawnChanceIn = 0; //TRN RD-1
NPC35SpawnChanceIn = 0; //TLFAdamant
NPC36SpawnChanceIn = 0; //TLF Fughunter
NPC37SpawnChanceIn = 0; //TLF LRCM Neutralizer
NPC39SpawnChanceIn = 0; //TRN Zerana
//Aberrants
NPC40SpawnChanceIn = 0; //Abettor
NPC41SpawnChanceIn = 0; //Gunner
NPC42SpawnChanceIn = 0; //Militant
NPC43SpawnChanceIn = 0; //Marauder
NPC44SpawnChanceIn = 0; //Mercenary
NPC45SpawnChanceIn = 0; //Cruiser
//Slavuics
NPC50SpawnChanceIn = 0; //Civilian
NPC51SpawnChanceIn = 0; //Watchmen
NPC52SpawnChanceIn = 0; //Mistitor
NPC53SpawnChanceIn = 0; //Civilian2
NPC54SpawnChanceIn = 0; //Snositor
NPC55SpawnChanceIn = 0; //Vanguard
NPC56SpawnChanceIn = 1; //Smertnik
NPC57SpawnChanceIn = 0; //Satnik
//Al-Atiba
NPC60SpawnChanceIn = 0; //Van
NPC61SpawnChanceIn = 0; //Guncarrier
NPC62SpawnChanceIn = 0; //Bejsirf
NPC63SpawnChanceIn = 0; //Microcruiser
//MevNavs
NPC70SpawnChanceIn = 0; //Scout Drone
NPC71SpawnChanceIn = 0; //Battle Drone
NPC72SpawnChanceIn = 0; //Cannon Drone
NPC73SpawnChanceIn = 0; //Squire
NPC74SpawnChanceIn = 0; //Archer
NPC75SpawnChanceIn = 0; //Scabbard
NPC76SpawnChanceIn = 0; //Warmonger
NPC77SpawnChanceIn = 0; //Knight
NPC78SpawnChanceIn = 0; //Deus
NPC79SpawnChanceIn = 0; //Eschatos
//Dutvutanians
NPC90SpawnChanceIn = 0; //DutvutanianCivilian1
NPC91SpawnChanceIn = 0; //DutvutanianCivilian2
NPC92SpawnChanceIn = 0; //DutvutanianCivilian3
NPC93SpawnChanceIn = 0; //DutvutanianIntelShip1
NPC94SpawnChanceIn = 0; //DutvutanianPolice1
NPC95SpawnChanceIn = 0; //DutvutanianObmurat1
AgrianVigil = null;
}
//Knug
if(AreaNum == 7){

HeightLimit = 1100;

//Objects
P0SpawnChanceIn = 0; //PagesGobnard

//Phenomenons
PH0SpawnChanceIn = 0; //Dust Devil

//Civilians & Creatures
NPC000SpawnChanceIn = 32; //Peuktato
NPC001SpawnChanceIn = 32; //Peuktorb
NPC002SpawnChanceIn = 32; //Peuktuber
NPC003SpawnChanceIn = 32; //Peuknyth
NPC004SpawnChanceIn = 32; //Peuknyil
NPC005SpawnChanceIn = 32; //Peukopede
NPC006SpawnChanceIn = 64; //Big Peukopede
NPC007SpawnChanceIn = 64; //Svibra Cloud
NPC008SpawnChanceIn = 0; //Big Svibra Cloud
NPC009SpawnChanceIn = 0; //Cykin
NPC0091SpawnChanceIn = 0; //Turgkin
NPC0800SpawnChanceIn = 8; //Oot1
NPC0801SpawnChanceIn = 8; //Oot2
NPC0802SpawnChanceIn = 0; //Oot3
NPC0803SpawnChanceIn = 0; //Oot4
NPC0804SpawnChanceIn = 0; //OotDut1
NPC0805SpawnChanceIn = 0; //OotDut1Group
NPC080SpawnChanceIn = 64; //Shadowfinger Ootkin
NPC081SpawnChanceIn = 0; //Athnian Ootkin 1
NPC082SpawnChanceIn = 0; //Athnian Ootkin 2
NPC00SpawnChanceIn = 0; //Afazis Terracruiser EC-1
NPC01SpawnChanceIn = 0; //TAK B-l4
NPC02SpawnChanceIn = 0; //Ezyfus Bejsirf Apta
NPC03SpawnChanceIn = 0; //Carbondyle Fecuda C.211
NPC04SpawnChanceIn = 0; //Slavoico BImG-500
NPC05SpawnChanceIn = 0; //Carbondyle Fecuda C.115
//PrincipalCharacters
NPC10SpawnChanceIn = 0; //Someone
//Agrians
NPC20SpawnChanceIn = 0; //Enforcer
NPC21SpawnChanceIn = 0; //Sentinel
NPC22SpawnChanceIn = 0; //Agent
NPC23SpawnChanceIn = 0; //Executor
NPC24SpawnChanceIn = 0; //SuperExecutor
NPC25SpawnChanceIn = 0; //Helirotor
NPC26SpawnChanceIn = 0; //Annihilator
NPC27SpawnChanceIn = 0; //Distributor
//Terrahyptians
NPC300SpawnChanceIn = 0; //LevNav Eos
NPC301SpawnChanceIn = 0; //LevNav Ithis
NPC302SpawnChanceIn = 0; //LevNav MAL
NPC303SpawnChanceIn = 0; //LevNav Darion
NPC310SpawnChanceIn = 0; //Bothunter
NPC31SpawnChanceIn = 0; //Valiant
NPC32SpawnChanceIn = 0; //FecarB1
NPC33SpawnChanceIn = 0; //DasNavCruiser
NPC34SpawnChanceIn = 0; //TRN RD-1
NPC35SpawnChanceIn = 0; //TLFAdamant
NPC36SpawnChanceIn = 0; //TLF Fughunter
NPC37SpawnChanceIn = 0; //TLF LRCM Neutralizer
NPC39SpawnChanceIn = 0; //TRN Zerana
//Aberrants
NPC40SpawnChanceIn = 0; //Abettor
NPC41SpawnChanceIn = 0; //Gunner
NPC42SpawnChanceIn = 0; //Militant
NPC43SpawnChanceIn = 0; //Marauder
NPC44SpawnChanceIn = 0; //Mercenary
NPC45SpawnChanceIn = 0; //Cruiser
//Slavuics
NPC50SpawnChanceIn = 0; //Civilian
NPC51SpawnChanceIn = 0; //Watchmen
NPC52SpawnChanceIn = 0; //Mistitor
NPC53SpawnChanceIn = 0; //Civilian2
NPC54SpawnChanceIn = 0; //Snositor
NPC55SpawnChanceIn = 0; //Vanguard
NPC56SpawnChanceIn = 1; //Smertnik
NPC57SpawnChanceIn = 0; //Satnik
//Al-Atiba
NPC60SpawnChanceIn = 0; //Van
NPC61SpawnChanceIn = 0; //Guncarrier
NPC62SpawnChanceIn = 0; //Bejsirf
NPC63SpawnChanceIn = 0; //Microcruiser
//MevNavs
NPC70SpawnChanceIn = 0; //Scout Drone
NPC71SpawnChanceIn = 0; //Battle Drone
NPC72SpawnChanceIn = 0; //Cannon Drone
NPC73SpawnChanceIn = 0; //Squire
NPC74SpawnChanceIn = 0; //Archer
NPC75SpawnChanceIn = 0; //Scabbard
NPC76SpawnChanceIn = 0; //Warmonger
NPC77SpawnChanceIn = 0; //Knight
NPC78SpawnChanceIn = 0; //Deus
NPC79SpawnChanceIn = 0; //Eschatos
//Dutvutanians
NPC90SpawnChanceIn = 0; //DutvutanianCivilian1
NPC91SpawnChanceIn = 0; //DutvutanianCivilian2
NPC92SpawnChanceIn = 0; //DutvutanianCivilian3
NPC93SpawnChanceIn = 0; //DutvutanianIntelShip1
NPC94SpawnChanceIn = 0; //DutvutanianPolice1
NPC95SpawnChanceIn = 0; //DutvutanianObmurat1
AgrianVigil = null;
}
//Agratyrda
if(AreaNum == 8){

HeightLimit = 2000;

//Objects
P0SpawnChanceIn = 128; //PagesGobnard

//Phenomenons
PH0SpawnChanceIn = 0; //Dust Devil

//Civilians & Creatures
NPC000SpawnChanceIn = 0; //Peuktato
NPC001SpawnChanceIn = 0; //Peuktorb
NPC002SpawnChanceIn = 0; //Peuktuber
NPC003SpawnChanceIn = 0; //Peuknyth
NPC004SpawnChanceIn = 0; //Peuknyil
NPC005SpawnChanceIn = 0; //Peukopede
NPC006SpawnChanceIn = 0; //Big Peukopede
NPC007SpawnChanceIn = 0; //Svibra Cloud
NPC008SpawnChanceIn = 0; //Big Svibra Cloud
NPC009SpawnChanceIn = 0; //Cykin
NPC0091SpawnChanceIn = 0; //Turgkin
NPC0800SpawnChanceIn = 0; //Oot1
NPC0801SpawnChanceIn = 0; //Oot2
NPC0802SpawnChanceIn = 0; //Oot3
NPC0803SpawnChanceIn = 0; //Oot4
NPC0804SpawnChanceIn = 0; //OotDut1
NPC0805SpawnChanceIn = 0; //OotDut1Group
NPC080SpawnChanceIn = 0; //Shadowfinger Ootkin
NPC081SpawnChanceIn = 0; //Athnian Ootkin 1
NPC082SpawnChanceIn = 0; //Athnian Ootkin 2
NPC00SpawnChanceIn = 0; //Afazis Terracruiser EC-1
NPC01SpawnChanceIn = 0; //TAK B-l4
NPC02SpawnChanceIn = 0; //Ezyfus Bejsirf Apta
NPC03SpawnChanceIn = 0; //Carbondyle Fecuda C.211
NPC04SpawnChanceIn = 0; //Slavoico BImG-500
NPC05SpawnChanceIn = 0; //Carbondyle Fecuda C.115
//PrincipalCharacters
NPC10SpawnChanceIn = 0; //Someone
//Agrians
NPC20SpawnChanceIn = 2; //Enforcer
NPC21SpawnChanceIn = 2; //Sentinel
NPC22SpawnChanceIn = 2; //Agent
NPC23SpawnChanceIn = 0; //Executor
NPC24SpawnChanceIn = 0; //SuperExecutor
NPC25SpawnChanceIn = 0; //Helirotor
NPC26SpawnChanceIn = 0; //Annihilator
NPC27SpawnChanceIn = 0; //Distributor
//Terrahyptians
NPC300SpawnChanceIn = 0; //LevNav Eos
NPC301SpawnChanceIn = 0; //LevNav Ithis
NPC302SpawnChanceIn = 0; //LevNav MAL
NPC303SpawnChanceIn = 0; //LevNav Darion
NPC310SpawnChanceIn = 0; //Bothunter
NPC31SpawnChanceIn = 0; //Valiant
NPC32SpawnChanceIn = 0; //FecarB1
NPC33SpawnChanceIn = 0; //DasNavCruiser
NPC34SpawnChanceIn = 0; //TRN RD-1
NPC35SpawnChanceIn = 0; //TLFAdamant
NPC36SpawnChanceIn = 0; //TLF Fughunter
NPC37SpawnChanceIn = 0; //TLF LRCM Neutralizer
NPC39SpawnChanceIn = 0; //TRN Zerana
//Aberrants
NPC40SpawnChanceIn = 0; //Abettor
NPC41SpawnChanceIn = 0; //Gunner
NPC42SpawnChanceIn = 0; //Militant
NPC43SpawnChanceIn = 0; //Marauder
NPC44SpawnChanceIn = 0; //Mercenary
NPC45SpawnChanceIn = 0; //Cruiser
//Slavuics
NPC50SpawnChanceIn = 0; //Civilian
NPC51SpawnChanceIn = 0; //Watchmen
NPC52SpawnChanceIn = 0; //Mistitor
NPC53SpawnChanceIn = 0; //Civilian2
NPC54SpawnChanceIn = 0; //Snositor
NPC55SpawnChanceIn = 0; //Vanguard
NPC56SpawnChanceIn = 0; //Smertnik
NPC57SpawnChanceIn = 0; //Satnik
//Al-Atiba
NPC60SpawnChanceIn = 0; //Van
NPC61SpawnChanceIn = 0; //Guncarrier
NPC62SpawnChanceIn = 0; //Bejsirf
NPC63SpawnChanceIn = 0; //Microcruiser
//MevNavs
NPC70SpawnChanceIn = 0; //Scout Drone
NPC71SpawnChanceIn = 0; //Battle Drone
NPC72SpawnChanceIn = 0; //Cannon Drone
NPC73SpawnChanceIn = 0; //Squire
NPC74SpawnChanceIn = 0; //Archer
NPC75SpawnChanceIn = 0; //Scabbard
NPC76SpawnChanceIn = 0; //Warmonger
NPC77SpawnChanceIn = 0; //Knight
NPC78SpawnChanceIn = 0; //Deus
NPC79SpawnChanceIn = 0; //Eschatos
//Dutvutanians
NPC90SpawnChanceIn = 0; //DutvutanianCivilian1
NPC91SpawnChanceIn = 0; //DutvutanianCivilian2
NPC92SpawnChanceIn = 0; //DutvutanianCivilian3
NPC93SpawnChanceIn = 0; //DutvutanianIntelShip1
NPC94SpawnChanceIn = 0; //DutvutanianPolice1
NPC95SpawnChanceIn = 0; //DutvutanianObmurat1
}
//Agratyrda Highway
if(AreaNum == 9){

HeightLimit = 2000;

//Objects
P0SpawnChanceIn = 96; //PagesGobnard

//Phenomenons
PH0SpawnChanceIn = 0; //Dust Devil

//Civilians & Creatures
NPC000SpawnChanceIn = 0; //Peuktato
NPC001SpawnChanceIn = 0; //Peuktorb
NPC002SpawnChanceIn = 0; //Peuktuber
NPC003SpawnChanceIn = 0; //Peuknyth
NPC004SpawnChanceIn = 0; //Peuknyil
NPC005SpawnChanceIn = 0; //Peukopede
NPC006SpawnChanceIn = 0; //Big Peukopede
NPC007SpawnChanceIn = 0; //Svibra Cloud
NPC008SpawnChanceIn = 0; //Big Svibra Cloud
NPC009SpawnChanceIn = 0; //Cykin
NPC0091SpawnChanceIn = 0; //Turgkin
NPC0800SpawnChanceIn = 0; //Oot1
NPC0801SpawnChanceIn = 0; //Oot2
NPC0802SpawnChanceIn = 0; //Oot3
NPC0803SpawnChanceIn = 0; //Oot4
NPC0804SpawnChanceIn = 0; //OotDut1
NPC0805SpawnChanceIn = 0; //OotDut1Group
NPC080SpawnChanceIn = 0; //Shadowfinger Ootkin
NPC081SpawnChanceIn = 0; //Athnian Ootkin 1
NPC082SpawnChanceIn = 0; //Athnian Ootkin 2
NPC00SpawnChanceIn = 0; //Afazis Terracruiser EC-1
NPC01SpawnChanceIn = 0; //TAK B-l4
NPC02SpawnChanceIn = 0; //Ezyfus Bejsirf Apta
NPC03SpawnChanceIn = 0; //Carbondyle Fecuda C.211
NPC04SpawnChanceIn = 0; //Slavoico BImG-500
NPC05SpawnChanceIn = 0; //Carbondyle Fecuda C.115
//PrincipalCharacters
NPC10SpawnChanceIn = 0; //Someone
//Agrians
NPC20SpawnChanceIn = 2; //Enforcer
NPC21SpawnChanceIn = 2; //Sentinel
NPC22SpawnChanceIn = 2; //Agent
NPC23SpawnChanceIn = 0; //Executor
NPC24SpawnChanceIn = 0; //SuperExecutor
NPC25SpawnChanceIn = 0; //Helirotor
NPC26SpawnChanceIn = 0; //Annihilator
NPC27SpawnChanceIn = 0; //Distributor
//Terrahyptians
NPC300SpawnChanceIn = 0; //LevNav Eos
NPC301SpawnChanceIn = 0; //LevNav Ithis
NPC302SpawnChanceIn = 0; //LevNav MAL
NPC303SpawnChanceIn = 0; //LevNav Darion
NPC310SpawnChanceIn = 0; //Bothunter
NPC31SpawnChanceIn = 0; //Valiant
NPC32SpawnChanceIn = 0; //FecarB1
NPC33SpawnChanceIn = 0; //DasNavCruiser
NPC34SpawnChanceIn = 0; //TRN RD-1
NPC35SpawnChanceIn = 0; //TLFAdamant
NPC36SpawnChanceIn = 0; //TLF Fughunter
NPC37SpawnChanceIn = 0; //TLF LRCM Neutralizer
NPC39SpawnChanceIn = 0; //TRN Zerana
//Aberrants
NPC40SpawnChanceIn = 0; //Abettor
NPC41SpawnChanceIn = 0; //Gunner
NPC42SpawnChanceIn = 0; //Militant
NPC43SpawnChanceIn = 0; //Marauder
NPC44SpawnChanceIn = 0; //Mercenary
NPC45SpawnChanceIn = 0; //Cruiser
//Slavuics
NPC50SpawnChanceIn = 0; //Civilian
NPC51SpawnChanceIn = 0; //Watchmen
NPC52SpawnChanceIn = 0; //Mistitor
NPC53SpawnChanceIn = 0; //Civilian2
NPC54SpawnChanceIn = 0; //Snositor
NPC55SpawnChanceIn = 0; //Vanguard
NPC56SpawnChanceIn = 0; //Smertnik
NPC57SpawnChanceIn = 0; //Satnik
//Al-Atiba
NPC60SpawnChanceIn = 0; //Van
NPC61SpawnChanceIn = 0; //Guncarrier
NPC62SpawnChanceIn = 0; //Bejsirf
NPC63SpawnChanceIn = 0; //Microcruiser
//MevNavs
NPC70SpawnChanceIn = 0; //Scout Drone
NPC71SpawnChanceIn = 0; //Battle Drone
NPC72SpawnChanceIn = 0; //Cannon Drone
NPC73SpawnChanceIn = 0; //Squire
NPC74SpawnChanceIn = 0; //Archer
NPC75SpawnChanceIn = 0; //Scabbard
NPC76SpawnChanceIn = 0; //Warmonger
NPC77SpawnChanceIn = 0; //Knight
NPC78SpawnChanceIn = 0; //Deus
NPC79SpawnChanceIn = 0; //Eschatos
//Dutvutanians
NPC90SpawnChanceIn = 0; //DutvutanianCivilian1
NPC91SpawnChanceIn = 0; //DutvutanianCivilian2
NPC92SpawnChanceIn = 0; //DutvutanianCivilian3
NPC93SpawnChanceIn = 0; //DutvutanianIntelShip1
NPC94SpawnChanceIn = 0; //DutvutanianPolice1
NPC95SpawnChanceIn = 0; //DutvutanianObmurat1
}
//Kabrius Estrellite
if(AreaNum == 10){

HeightLimit = 2000;

//Objects
P0SpawnChanceIn = 0; //PagesGobnard

//Phenomenons
PH0SpawnChanceIn = 0; //Dust Devil

//Civilians & Creatures
NPC000SpawnChanceIn = 0; //Peuktato
NPC001SpawnChanceIn = 0; //Peuktorb
NPC002SpawnChanceIn = 0; //Peuktuber
NPC003SpawnChanceIn = 0; //Peuknyth
NPC004SpawnChanceIn = 0; //Peuknyil
NPC005SpawnChanceIn = 0; //Peukopede
NPC006SpawnChanceIn = 0; //Big Peukopede
NPC007SpawnChanceIn = 0; //Svibra Cloud
NPC008SpawnChanceIn = 0; //Big Svibra Cloud
NPC009SpawnChanceIn = 0; //Cykin
NPC0091SpawnChanceIn = 0; //Turgkin
NPC0800SpawnChanceIn = 0; //Oot1
NPC0801SpawnChanceIn = 0; //Oot2
NPC0802SpawnChanceIn = 0; //Oot3
NPC0803SpawnChanceIn = 0; //Oot4
NPC0804SpawnChanceIn = 0; //OotDut1
NPC0805SpawnChanceIn = 0; //OotDut1Group
NPC080SpawnChanceIn = 0; //Shadowfinger Ootkin
NPC081SpawnChanceIn = 0; //Athnian Ootkin 1
NPC082SpawnChanceIn = 0; //Athnian Ootkin 2
NPC00SpawnChanceIn = 0; //Afazis Terracruiser EC-1
NPC01SpawnChanceIn = 0; //TAK B-l4
NPC02SpawnChanceIn = 0; //Ezyfus Bejsirf Apta
NPC03SpawnChanceIn = 0; //Carbondyle Fecuda C.211
NPC04SpawnChanceIn = 0; //Slavoico BImG-500
NPC05SpawnChanceIn = 0; //Carbondyle Fecuda C.115
//PrincipalCharacters
NPC10SpawnChanceIn = 0; //Someone
//Agrians
NPC20SpawnChanceIn = 0; //Enforcer
NPC21SpawnChanceIn = 0; //Sentinel
NPC22SpawnChanceIn = 0; //Agent
NPC23SpawnChanceIn = 0; //Executor
NPC24SpawnChanceIn = 0; //SuperExecutor
NPC25SpawnChanceIn = 0; //Helirotor
NPC26SpawnChanceIn = 1; //Annihilator
NPC27SpawnChanceIn = 0; //Distributor
//Terrahyptians
NPC300SpawnChanceIn = 0; //LevNav Eos
NPC301SpawnChanceIn = 0; //LevNav Ithis
NPC302SpawnChanceIn = 0; //LevNav MAL
NPC303SpawnChanceIn = 0; //LevNav Darion
NPC310SpawnChanceIn = 0; //Bothunter
NPC31SpawnChanceIn = 0; //Valiant
NPC32SpawnChanceIn = 0; //FecarB1
NPC33SpawnChanceIn = 0; //DasNavCruiser
NPC34SpawnChanceIn = 0; //TRN RD-1
NPC35SpawnChanceIn = 0; //TLFAdamant
NPC36SpawnChanceIn = 0; //TLF Fughunter
NPC37SpawnChanceIn = 0; //TLF LRCM Neutralizer
NPC39SpawnChanceIn = 0; //TRN Zerana
//Aberrants
NPC40SpawnChanceIn = 0; //Abettor
NPC41SpawnChanceIn = 0; //Gunner
NPC42SpawnChanceIn = 0; //Militant
NPC43SpawnChanceIn = 0; //Marauder
NPC44SpawnChanceIn = 0; //Mercenary
NPC45SpawnChanceIn = 0; //Cruiser
//Slavuics
NPC50SpawnChanceIn = 0; //Civilian
NPC51SpawnChanceIn = 0; //Watchmen
NPC52SpawnChanceIn = 0; //Mistitor
NPC53SpawnChanceIn = 0; //Civilian2
NPC54SpawnChanceIn = 0; //Snositor
NPC55SpawnChanceIn = 0; //Vanguard
NPC56SpawnChanceIn = 0; //Smertnik
NPC57SpawnChanceIn = 0; //Satnik
//Al-Atiba
NPC60SpawnChanceIn = 0; //Van
NPC61SpawnChanceIn = 0; //Guncarrier
NPC62SpawnChanceIn = 0; //Bejsirf
NPC63SpawnChanceIn = 0; //Microcruiser
//MevNavs
NPC70SpawnChanceIn = 0; //Scout Drone
NPC71SpawnChanceIn = 0; //Battle Drone
NPC72SpawnChanceIn = 0; //Cannon Drone
NPC73SpawnChanceIn = 0; //Squire
NPC74SpawnChanceIn = 0; //Archer
NPC75SpawnChanceIn = 0; //Scabbard
NPC76SpawnChanceIn = 0; //Warmonger
NPC77SpawnChanceIn = 0; //Knight
NPC78SpawnChanceIn = 0; //Deus
NPC79SpawnChanceIn = 0; //Eschatos
//Dutvutanians
NPC90SpawnChanceIn = 0; //DutvutanianCivilian1
NPC91SpawnChanceIn = 0; //DutvutanianCivilian2
NPC92SpawnChanceIn = 0; //DutvutanianCivilian3
NPC93SpawnChanceIn = 1; //DutvutanianIntelShip1
NPC94SpawnChanceIn = 0; //DutvutanianPolice1
NPC95SpawnChanceIn = 1; //DutvutanianObmurat1
AgrianVigil = null;
}
//Sunfront Peninsula
if(AreaNum == 11){

HeightLimit = 2000;

//Objects
P0SpawnChanceIn = 12; //PagesGobnard

//Phenomenons
PH0SpawnChanceIn = 0; //Dust Devil

//Civilians & Creatures
NPC000SpawnChanceIn = 0; //Peuktato
NPC001SpawnChanceIn = 0; //Peuktorb
NPC002SpawnChanceIn = 0; //Peuktuber
NPC003SpawnChanceIn = 0; //Peuknyth
NPC004SpawnChanceIn = 0; //Peuknyil
NPC005SpawnChanceIn = 0; //Peukopede
NPC006SpawnChanceIn = 0; //Big Peukopede
NPC007SpawnChanceIn = 0; //Svibra Cloud
NPC008SpawnChanceIn = 0; //Big Svibra Cloud
NPC009SpawnChanceIn = 0; //Cykin
NPC0091SpawnChanceIn = 0; //Turgkin
NPC0800SpawnChanceIn = 0; //Oot1
NPC0801SpawnChanceIn = 0; //Oot2
NPC0802SpawnChanceIn = 0; //Oot3
NPC0803SpawnChanceIn = 0; //Oot4
NPC0804SpawnChanceIn = 0; //OotDut1
NPC0805SpawnChanceIn = 0; //OotDut1Group
NPC080SpawnChanceIn = 0; //Shadowfinger Ootkin
NPC081SpawnChanceIn = 0; //Athnian Ootkin 1
NPC082SpawnChanceIn = 0; //Athnian Ootkin 2
NPC00SpawnChanceIn = 100; //Afazis Terracruiser EC-1
NPC01SpawnChanceIn = 100; //TAK B-l4
NPC02SpawnChanceIn = 50; //Ezyfus Bejsirf Apta
NPC03SpawnChanceIn = 1800; //Carbondyle Fecuda C.211
NPC04SpawnChanceIn = 700; //Slavoico BImG-500
NPC05SpawnChanceIn = 700; //Carbondyle Fecuda C.115
//PrincipalCharacters
NPC10SpawnChanceIn = 0; //Someone
//Agrians
NPC20SpawnChanceIn = 150; //Enforcer
NPC21SpawnChanceIn = 200; //Sentinel
NPC22SpawnChanceIn = 1; //Agent
NPC23SpawnChanceIn = 1; //Executor
NPC24SpawnChanceIn = 1; //SuperExecutor
NPC25SpawnChanceIn = 0; //Helirotor
NPC26SpawnChanceIn = 1; //Annihilator
NPC27SpawnChanceIn = 1; //Distributor
//Terrahyptians
NPC300SpawnChanceIn = 500; //LevNav Eos
NPC301SpawnChanceIn = 200; //LevNav Ithis
NPC302SpawnChanceIn = 2000; //LevNav MAL
NPC303SpawnChanceIn = 6000; //LevNav Darion
NPC310SpawnChanceIn = 500; //Bothunter
NPC31SpawnChanceIn = 0; //Valiant
NPC32SpawnChanceIn = 3000; //FecarB1
NPC33SpawnChanceIn = 0; //DasNavCruiser
NPC34SpawnChanceIn = 0; //TRN RD-1
NPC35SpawnChanceIn = 0; //TLFAdamant
NPC36SpawnChanceIn = 0; //TLF Fughunter
NPC37SpawnChanceIn = 0; //TLF LRCM Neutralizer
NPC39SpawnChanceIn = 128; //TRN Zerana
//Aberrants
NPC40SpawnChanceIn = 8000; //Abettor
NPC41SpawnChanceIn = 8000; //Gunner
NPC42SpawnChanceIn = 8000; //Militant
NPC43SpawnChanceIn = 0; //Marauder
NPC44SpawnChanceIn = 0; //Mercenary
NPC45SpawnChanceIn = 0; //Cruiser
//Slavuics
NPC50SpawnChanceIn = 1000; //Civilian
NPC51SpawnChanceIn = 2000; //Watchmen
NPC52SpawnChanceIn = 5000; //Mistitor
NPC53SpawnChanceIn = 1500; //Civilian2
NPC54SpawnChanceIn = 5000; //Snositor
NPC55SpawnChanceIn = 2000; //Vanguard
NPC56SpawnChanceIn = 1; //Smertnik
NPC57SpawnChanceIn = 1000; //Satnik
//Al-Atiba
NPC60SpawnChanceIn = 4000; //Van
NPC61SpawnChanceIn = 8000; //Guncarrier
NPC62SpawnChanceIn = 8000; //Bejsirf
NPC63SpawnChanceIn = 0; //Microcruiser
//MevNavs
NPC70SpawnChanceIn = 2000; //Scout Drone
NPC71SpawnChanceIn = 4000; //Battle Drone
NPC72SpawnChanceIn = 5000; //Cannon Drone
NPC73SpawnChanceIn = 6000; //Squire
NPC74SpawnChanceIn = 6000; //Archer
NPC75SpawnChanceIn = 6000; //Scabbard
NPC76SpawnChanceIn = 6000; //Warmonger
NPC77SpawnChanceIn = 0; //Knight
NPC78SpawnChanceIn = 0; //Deus
NPC79SpawnChanceIn = 1; //Eschatos
//Dutvutanians
NPC90SpawnChanceIn = 0; //DutvutanianCivilian1
NPC91SpawnChanceIn = 0; //DutvutanianCivilian2
NPC92SpawnChanceIn = 0; //DutvutanianCivilian3
NPC93SpawnChanceIn = 1; //DutvutanianIntelShip1
NPC94SpawnChanceIn = 0; //DutvutanianPolice1
NPC95SpawnChanceIn = 1; //DutvutanianObmurat1
}
//Oyhurat Island
if(AreaNum == 12){

HeightLimit = 2000;

//Objects
P0SpawnChanceIn = 48; //PagesGobnard

//Phenomenons
PH0SpawnChanceIn = 8; //Dust Devil

//Civilians & Creatures
NPC000SpawnChanceIn = 0; //Peuktato
NPC001SpawnChanceIn = 0; //Peuktorb
NPC002SpawnChanceIn = 0; //Peuktuber
NPC003SpawnChanceIn = 0; //Peuknyth
NPC004SpawnChanceIn = 0; //Peuknyil
NPC005SpawnChanceIn = 0; //Peukopede
NPC006SpawnChanceIn = 0; //Big Peukopede
NPC007SpawnChanceIn = 0; //Svibra Cloud
NPC008SpawnChanceIn = 0; //Big Svibra Cloud
NPC009SpawnChanceIn = 0; //Cykin
NPC0091SpawnChanceIn = 0; //Turgkin
NPC0800SpawnChanceIn = 0; //Oot1
NPC0801SpawnChanceIn = 0; //Oot2
NPC0802SpawnChanceIn = 0; //Oot3
NPC0803SpawnChanceIn = 0; //Oot4
NPC0804SpawnChanceIn = 0; //OotDut1
NPC0805SpawnChanceIn = 0; //OotDut1Group
NPC080SpawnChanceIn = 0; //Shadowfinger Ootkin
NPC081SpawnChanceIn = 0; //Athnian Ootkin 1
NPC082SpawnChanceIn = 0; //Athnian Ootkin 2
NPC00SpawnChanceIn = 800; //Afazis Terracruiser EC-1
NPC01SpawnChanceIn = 400; //TAK B-l4
NPC02SpawnChanceIn = 250; //Ezyfus Bejsirf Apta
NPC03SpawnChanceIn = 6000; //Carbondyle Fecuda C.211
NPC04SpawnChanceIn = 800; //Slavoico BImG-500
NPC05SpawnChanceIn = 2000; //Carbondyle Fecuda C.115
//PrincipalCharacters
NPC10SpawnChanceIn = 0; //Someone
//Agrians
NPC20SpawnChanceIn = 100; //Enforcer
NPC21SpawnChanceIn = 150; //Sentinel
NPC22SpawnChanceIn = 400; //Agent
NPC23SpawnChanceIn = 800; //Executor
NPC24SpawnChanceIn = 9000; //SuperExecutor
NPC25SpawnChanceIn = 700; //Helirotor
NPC26SpawnChanceIn = 1; //Annihilator
NPC27SpawnChanceIn = 1; //Distributor
//Terrahyptians
NPC300SpawnChanceIn = 0; //LevNav Eos
NPC301SpawnChanceIn = 0; //LevNav Ithis
NPC302SpawnChanceIn = 0; //LevNav MAL
NPC303SpawnChanceIn = 0; //LevNav Darion
NPC310SpawnChanceIn = 200; //Bothunter
NPC31SpawnChanceIn = 4000; //Valiant
NPC32SpawnChanceIn = 3000; //FecarB1
NPC33SpawnChanceIn = 7000; //DasNavCruiser
NPC34SpawnChanceIn = 1; //TRN RD-1
NPC35SpawnChanceIn = 1; //TLFAdamant
NPC36SpawnChanceIn = 4000; //TLF Fughunter
NPC37SpawnChanceIn = 1; //TLF LRCM Neutralizer
NPC39SpawnChanceIn = 256; //TRN Zerana
//Aberrants
NPC40SpawnChanceIn = 100; //Abettor
NPC41SpawnChanceIn = 100; //Gunner
NPC42SpawnChanceIn = 100; //Militant
NPC43SpawnChanceIn = 400; //Marauder
NPC44SpawnChanceIn = 600; //Mercenary
NPC45SpawnChanceIn = 1000; //Cruiser
//Slavuics
NPC50SpawnChanceIn = 300; //Civilian
NPC51SpawnChanceIn = 350; //Watchmen
NPC52SpawnChanceIn = 3000; //Mistitor
NPC53SpawnChanceIn = 300; //Civilian2
NPC54SpawnChanceIn = 1000; //Snositor
NPC55SpawnChanceIn = 400; //Vanguard
NPC56SpawnChanceIn = 1; //Smertnik
NPC57SpawnChanceIn = 400; //Satnik
//Al-Atiba
NPC60SpawnChanceIn = 350; //Van
NPC61SpawnChanceIn = 400; //Guncarrier
NPC62SpawnChanceIn = 500; //Bejsirf
NPC63SpawnChanceIn = 800; //Microcruiser
//MevNavs
NPC70SpawnChanceIn = 300; //Scout Drone
NPC71SpawnChanceIn = 500; //Battle Drone
NPC72SpawnChanceIn = 600; //Cannon Drone
NPC73SpawnChanceIn = 300; //Squire
NPC74SpawnChanceIn = 600; //Archer
NPC75SpawnChanceIn = 800; //Scabbard
NPC76SpawnChanceIn = 400; //Warmonger
NPC77SpawnChanceIn = 1000; //Knight
NPC78SpawnChanceIn = 9000; //Deus
NPC79SpawnChanceIn = 1; //Eschatos
//Dutvutanians
NPC90SpawnChanceIn = 0; //DutvutanianCivilian1
NPC91SpawnChanceIn = 0; //DutvutanianCivilian2
NPC92SpawnChanceIn = 0; //DutvutanianCivilian3
NPC93SpawnChanceIn = 1; //DutvutanianIntelShip1
NPC94SpawnChanceIn = 0; //DutvutanianPolice1
NPC95SpawnChanceIn = 1; //DutvutanianObmurat1
}
//Keordis
if(AreaNum == 13){

HeightLimit = 1100;

//Objects
P0SpawnChanceIn = 0; //PagesGobnard

//Phenomenons
PH0SpawnChanceIn = 0; //Dust Devil

//Civilians & Creatures
NPC000SpawnChanceIn = 0; //Peuktato
NPC001SpawnChanceIn = 0; //Peuktorb
NPC002SpawnChanceIn = 32; //Peuktuber
NPC003SpawnChanceIn = 0; //Peuknyth
NPC004SpawnChanceIn = 0; //Peuknyil
NPC005SpawnChanceIn = 0; //Peukopede
NPC006SpawnChanceIn = 0; //Big Peukopede
NPC007SpawnChanceIn = 0; //Svibra Cloud
NPC008SpawnChanceIn = 0; //Big Svibra Cloud
NPC009SpawnChanceIn = 0; //Cykin
NPC0091SpawnChanceIn = 0; //Turgkin
NPC0800SpawnChanceIn = 12; //Oot1
NPC0801SpawnChanceIn = 12; //Oot2
NPC0802SpawnChanceIn = 12; //Oot3
NPC0803SpawnChanceIn = 12; //Oot4
NPC0804SpawnChanceIn = 0; //OotDut1
NPC0805SpawnChanceIn = 0; //OotDut1Group
NPC080SpawnChanceIn = 128; //Shadowfinger Ootkin
NPC081SpawnChanceIn = 0; //Athnian Ootkin 1
NPC082SpawnChanceIn = 0; //Athnian Ootkin 2
NPC00SpawnChanceIn = 0; //Afazis Terracruiser EC-1
NPC01SpawnChanceIn = 0; //TAK B-l4
NPC02SpawnChanceIn = 0; //Ezyfus Bejsirf Apta
NPC03SpawnChanceIn = 0; //Carbondyle Fecuda C.211
NPC04SpawnChanceIn = 0; //Slavoico BImG-500
NPC05SpawnChanceIn = 0; //Carbondyle Fecuda C.115
//PrincipalCharacters
NPC10SpawnChanceIn = 0; //Someone
//Agrians
NPC20SpawnChanceIn = 0; //Enforcer
NPC21SpawnChanceIn = 0; //Sentinel
NPC22SpawnChanceIn = 0; //Agent
NPC23SpawnChanceIn = 0; //Executor
NPC24SpawnChanceIn = 0; //SuperExecutor
NPC25SpawnChanceIn = 0; //Helirotor
NPC26SpawnChanceIn = 0; //Annihilator
NPC27SpawnChanceIn = 0; //Distributor
//Terrahyptians
NPC300SpawnChanceIn = 0; //LevNav Eos
NPC301SpawnChanceIn = 0; //LevNav Ithis
NPC302SpawnChanceIn = 0; //LevNav MAL
NPC303SpawnChanceIn = 0; //LevNav Darion
NPC310SpawnChanceIn = 0; //Bothunter
NPC31SpawnChanceIn = 0; //Valiant
NPC32SpawnChanceIn = 0; //FecarB1
NPC33SpawnChanceIn = 0; //DasNavCruiser
NPC34SpawnChanceIn = 0; //TRN RD-1
NPC35SpawnChanceIn = 0; //TLFAdamant
NPC36SpawnChanceIn = 0; //TLF Fughunter
NPC37SpawnChanceIn = 0; //TLF LRCM Neutralizer
NPC39SpawnChanceIn = 0; //TRN Zerana
//Aberrants
NPC40SpawnChanceIn = 0; //Abettor
NPC41SpawnChanceIn = 0; //Gunner
NPC42SpawnChanceIn = 0; //Militant
NPC43SpawnChanceIn = 0; //Marauder
NPC44SpawnChanceIn = 0; //Mercenary
NPC45SpawnChanceIn = 0; //Cruiser
//Slavuics
NPC50SpawnChanceIn = 0; //Civilian
NPC51SpawnChanceIn = 0; //Watchmen
NPC52SpawnChanceIn = 0; //Mistitor
NPC53SpawnChanceIn = 0; //Civilian2
NPC54SpawnChanceIn = 0; //Snositor
NPC55SpawnChanceIn = 0; //Vanguard
NPC56SpawnChanceIn = 1; //Smertnik
NPC57SpawnChanceIn = 0; //Satnik
//Al-Atiba
NPC60SpawnChanceIn = 0; //Van
NPC61SpawnChanceIn = 0; //Guncarrier
NPC62SpawnChanceIn = 0; //Bejsirf
NPC63SpawnChanceIn = 0; //Microcruiser
//MevNavs
NPC70SpawnChanceIn = 0; //Scout Drone
NPC71SpawnChanceIn = 0; //Battle Drone
NPC72SpawnChanceIn = 0; //Cannon Drone
NPC73SpawnChanceIn = 0; //Squire
NPC74SpawnChanceIn = 0; //Archer
NPC75SpawnChanceIn = 0; //Scabbard
NPC76SpawnChanceIn = 0; //Warmonger
NPC77SpawnChanceIn = 0; //Knight
NPC78SpawnChanceIn = 0; //Deus
NPC79SpawnChanceIn = 0; //Eschatos
//Dutvutanians
NPC90SpawnChanceIn = 0; //DutvutanianCivilian1
NPC91SpawnChanceIn = 0; //DutvutanianCivilian2
NPC92SpawnChanceIn = 0; //DutvutanianCivilian3
NPC93SpawnChanceIn = 0; //DutvutanianIntelShip1
NPC94SpawnChanceIn = 0; //DutvutanianPolice1
NPC95SpawnChanceIn = 0; //DutvutanianObmurat1
AgrianVigil = null;
}
//Outer Azecreas
if(AreaNum == 14){

HeightLimit = 2000;

//Objects
P0SpawnChanceIn = 24; //PagesGobnard

//Phenomenons
PH0SpawnChanceIn = 0; //Dust Devil

//Civilians & Creatures
NPC000SpawnChanceIn = 0; //Peuktato
NPC001SpawnChanceIn = 0; //Peuktorb
NPC002SpawnChanceIn = 0; //Peuktuber
NPC003SpawnChanceIn = 0; //Peuknyth
NPC004SpawnChanceIn = 0; //Peuknyil
NPC005SpawnChanceIn = 0; //Peukopede
NPC006SpawnChanceIn = 0; //Big Peukopede
NPC007SpawnChanceIn = 0; //Svibra Cloud
NPC008SpawnChanceIn = 0; //Big Svibra Cloud
NPC009SpawnChanceIn = 0; //Cykin
NPC0091SpawnChanceIn = 0; //Turgkin
NPC0800SpawnChanceIn = 6000; //Oot1
NPC0801SpawnChanceIn = 6000; //Oot2
NPC0802SpawnChanceIn = 2000; //Oot3
NPC0803SpawnChanceIn = 2000; //Oot4
NPC0804SpawnChanceIn = 0; //OotDut1
NPC0805SpawnChanceIn = 0; //OotDut1Group
NPC080SpawnChanceIn = 0; //Shadowfinger Ootkin
NPC081SpawnChanceIn = 0; //Athnian Ootkin 1
NPC082SpawnChanceIn = 0; //Athnian Ootkin 2
NPC00SpawnChanceIn = 200; //Afazis Terracruiser EC-1
NPC01SpawnChanceIn = 200; //TAK B-l4
NPC02SpawnChanceIn = 100; //Ezyfus Bejsirf Apta
NPC03SpawnChanceIn = 2000; //Carbondyle Fecuda C.211
NPC04SpawnChanceIn = 800; //Slavoico BImG-500
NPC05SpawnChanceIn = 700; //Carbondyle Fecuda C.115
//PrincipalCharacters
NPC10SpawnChanceIn = 0; //Someone
//Agrians
NPC20SpawnChanceIn = 200; //Enforcer
NPC21SpawnChanceIn = 200; //Sentinel
NPC22SpawnChanceIn = 1; //Agent
NPC23SpawnChanceIn = 1; //Executor
NPC24SpawnChanceIn = 1; //SuperExecutor
NPC25SpawnChanceIn = 0; //Helirotor
NPC26SpawnChanceIn = 1; //Annihilator
NPC27SpawnChanceIn = 1; //Distributor
//Terrahyptians
NPC300SpawnChanceIn = 0; //LevNav Eos
NPC301SpawnChanceIn = 0; //LevNav Ithis
NPC302SpawnChanceIn = 0; //LevNav MAL
NPC303SpawnChanceIn = 0; //LevNav Darion
NPC310SpawnChanceIn = 600; //Bothunter
NPC31SpawnChanceIn = 300; //Valiant
NPC32SpawnChanceIn = 200; //FecarB1
NPC33SpawnChanceIn = 0; //DasNavCruiser
NPC34SpawnChanceIn = 1; //TRN RD-1
NPC35SpawnChanceIn = 1; //TLFAdamant
NPC36SpawnChanceIn = 600; //TLF Fughunter
NPC37SpawnChanceIn = 1; //TLF LRCM Neutralizer
NPC39SpawnChanceIn = 8; //TRN Zerana
//Aberrants
NPC40SpawnChanceIn = 0; //Abettor
NPC41SpawnChanceIn = 0; //Gunner
NPC42SpawnChanceIn = 0; //Militant
NPC43SpawnChanceIn = 0; //Marauder
NPC44SpawnChanceIn = 0; //Mercenary
NPC45SpawnChanceIn = 0; //Cruiser
//Slavuics
NPC50SpawnChanceIn = 1500; //Civilian
NPC51SpawnChanceIn = 3000; //Watchmen
NPC52SpawnChanceIn = 7000; //Mistitor
NPC53SpawnChanceIn = 2000; //Civilian2
NPC54SpawnChanceIn = 6000; //Snositor
NPC55SpawnChanceIn = 3000; //Vanguard
NPC56SpawnChanceIn = 0; //Smertnik
NPC57SpawnChanceIn = 1000; //Satnik
//Al-Atiba
NPC60SpawnChanceIn = 0; //Van
NPC61SpawnChanceIn = 0; //Guncarrier
NPC62SpawnChanceIn = 0; //Bejsirf
NPC63SpawnChanceIn = 0; //Microcruiser
//MevNavs
NPC70SpawnChanceIn = 4000; //Scout Drone
NPC71SpawnChanceIn = 0; //Battle Drone
NPC72SpawnChanceIn = 0; //Cannon Drone
NPC73SpawnChanceIn = 8000; //Squire
NPC74SpawnChanceIn = 0; //Archer
NPC75SpawnChanceIn = 0; //Scabbard
NPC76SpawnChanceIn = 9000; //Warmonger
NPC77SpawnChanceIn = 0; //Knight
NPC78SpawnChanceIn = 0; //Deus
NPC79SpawnChanceIn = 1; //Eschatos
//Dutvutanians
NPC90SpawnChanceIn = 0; //DutvutanianCivilian1
NPC91SpawnChanceIn = 0; //DutvutanianCivilian2
NPC92SpawnChanceIn = 0; //DutvutanianCivilian3
NPC93SpawnChanceIn = 1; //DutvutanianIntelShip1
NPC94SpawnChanceIn = 0; //DutvutanianPolice1
NPC95SpawnChanceIn = 1; //DutvutanianObmurat1
}
//DutvutanOutpost1
if(AreaNum == 15){

HeightLimit = 2000;

//Objects
P0SpawnChanceIn = 0; //PagesGobnard

//Phenomenons
PH0SpawnChanceIn = 0; //Dust Devil

//Civilians & Creatures
NPC000SpawnChanceIn = 0; //Peuktato
NPC001SpawnChanceIn = 0; //Peuktorb
NPC002SpawnChanceIn = 0; //Peuktuber
NPC003SpawnChanceIn = 0; //Peuknyth
NPC004SpawnChanceIn = 0; //Peuknyil
NPC005SpawnChanceIn = 0; //Peukopede
NPC006SpawnChanceIn = 0; //Big Peukopede
NPC007SpawnChanceIn = 0; //Svibra Cloud
NPC008SpawnChanceIn = 0; //Big Svibra Cloud
NPC009SpawnChanceIn = 64; //Cykin
NPC0091SpawnChanceIn = 128; //Turgkin
NPC0800SpawnChanceIn = 0; //Oot1
NPC0801SpawnChanceIn = 0; //Oot2
NPC0802SpawnChanceIn = 0; //Oot3
NPC0803SpawnChanceIn = 0; //Oot4
NPC0804SpawnChanceIn = 8; //OotDut1
NPC0805SpawnChanceIn = 32; //OotDut1Group
NPC080SpawnChanceIn = 0; //Shadowfinger Ootkin
NPC081SpawnChanceIn = 0; //Athnian Ootkin 1
NPC082SpawnChanceIn = 0; //Athnian Ootkin 2
NPC00SpawnChanceIn = 0; //Afazis Terracruiser EC-1
NPC01SpawnChanceIn = 0; //TAK B-l4
NPC02SpawnChanceIn = 0; //Ezyfus Bejsirf Apta
NPC03SpawnChanceIn = 0; //Carbondyle Fecuda C.211
NPC04SpawnChanceIn = 0; //Slavoico BImG-500
NPC05SpawnChanceIn = 0; //Carbondyle Fecuda C.115
//PrincipalCharacters
NPC10SpawnChanceIn = 0; //Someone
//Agrians
NPC20SpawnChanceIn = 0; //Enforcer
NPC21SpawnChanceIn = 0; //Sentinel
NPC22SpawnChanceIn = 0; //Agent
NPC23SpawnChanceIn = 0; //Executor
NPC24SpawnChanceIn = 0; //SuperExecutor
NPC25SpawnChanceIn = 0; //Helirotor
NPC26SpawnChanceIn = 0; //Annihilator
NPC27SpawnChanceIn = 0; //Distributor
//Terrahyptians
NPC300SpawnChanceIn = 0; //LevNav Eos
NPC301SpawnChanceIn = 0; //LevNav Ithis
NPC302SpawnChanceIn = 0; //LevNav MAL
NPC303SpawnChanceIn = 0; //LevNav Darion
NPC310SpawnChanceIn = 0; //Bothunter
NPC31SpawnChanceIn = 0; //Valiant
NPC32SpawnChanceIn = 0; //FecarB1
NPC33SpawnChanceIn = 0; //DasNavCruiser
NPC34SpawnChanceIn = 0; //TRN RD-1
NPC35SpawnChanceIn = 0; //TLFAdamant
NPC36SpawnChanceIn = 0; //TLF Fughunter
NPC37SpawnChanceIn = 0; //TLF LRCM Neutralizer
NPC39SpawnChanceIn = 0; //TRN Zerana
//Aberrants
NPC40SpawnChanceIn = 0; //Abettor
NPC41SpawnChanceIn = 0; //Gunner
NPC42SpawnChanceIn = 0; //Militant
NPC43SpawnChanceIn = 0; //Marauder
NPC44SpawnChanceIn = 0; //Mercenary
NPC45SpawnChanceIn = 0; //Cruiser
//Slavuics
NPC50SpawnChanceIn = 0; //Civilian
NPC51SpawnChanceIn = 0; //Watchmen
NPC52SpawnChanceIn = 0; //Mistitor
NPC53SpawnChanceIn = 0; //Civilian2
NPC54SpawnChanceIn = 0; //Snositor
NPC55SpawnChanceIn = 0; //Vanguard
NPC56SpawnChanceIn = 0; //Smertnik
NPC57SpawnChanceIn = 0; //Satnik
//Al-Atiba
NPC60SpawnChanceIn = 0; //Van
NPC61SpawnChanceIn = 0; //Guncarrier
NPC62SpawnChanceIn = 0; //Bejsirf
NPC63SpawnChanceIn = 0; //Microcruiser
//MevNavs
NPC70SpawnChanceIn = 0; //Scout Drone
NPC71SpawnChanceIn = 0; //Battle Drone
NPC72SpawnChanceIn = 0; //Cannon Drone
NPC73SpawnChanceIn = 0; //Squire
NPC74SpawnChanceIn = 0; //Archer
NPC75SpawnChanceIn = 0; //Scabbard
NPC76SpawnChanceIn = 0; //Warmonger
NPC77SpawnChanceIn = 0; //Knight
NPC78SpawnChanceIn = 0; //Deus
NPC79SpawnChanceIn = 0; //Eschatos
//Dutvutanians
NPC90SpawnChanceIn = 100; //DutvutanianCivilian1
NPC91SpawnChanceIn = 200; //DutvutanianCivilian2
NPC92SpawnChanceIn = 300; //DutvutanianCivilian3
NPC93SpawnChanceIn = 100; //DutvutanianIntelShip1
NPC94SpawnChanceIn = 1000; //DutvutanianPolice1
NPC95SpawnChanceIn = 9000; //DutvutanianObmurat1
AgrianVigil = null;
}
//Arena
if(AreaNum == 64){

HeightLimit = 2000;

//Objects
P0SpawnChanceIn = 0; //PagesGobnard

//Phenomenons
PH0SpawnChanceIn = 0; //Dust Devil

//Civilians & Creatures
NPC000SpawnChanceIn = 0; //Peuktato
NPC001SpawnChanceIn = 0; //Peuktorb
NPC002SpawnChanceIn = 0; //Peuktuber
NPC003SpawnChanceIn = 0; //Peuknyth
NPC004SpawnChanceIn = 0; //Peuknyil
NPC005SpawnChanceIn = 0; //Peukopede
NPC006SpawnChanceIn = 0; //Big Peukopede
NPC007SpawnChanceIn = 0; //Svibra Cloud
NPC008SpawnChanceIn = 0; //Big Svibra Cloud
NPC009SpawnChanceIn = 0; //Cykin
NPC0091SpawnChanceIn = 0; //Turgkin
NPC0800SpawnChanceIn = 0; //Oot1
NPC0801SpawnChanceIn = 0; //Oot2
NPC0802SpawnChanceIn = 0; //Oot3
NPC0803SpawnChanceIn = 0; //Oot4
NPC0804SpawnChanceIn = 0; //OotDut1
NPC0805SpawnChanceIn = 0; //OotDut1Group
NPC080SpawnChanceIn = 0; //Shadowfinger Ootkin
NPC081SpawnChanceIn = 0; //Athnian Ootkin 1
NPC082SpawnChanceIn = 0; //Athnian Ootkin 2
NPC00SpawnChanceIn = 0; //Afazis Terracruiser EC-1
NPC01SpawnChanceIn = 0; //TAK B-l4
NPC02SpawnChanceIn = 0; //Ezyfus Bejsirf Apta
NPC03SpawnChanceIn = 0; //Carbondyle Fecuda C.211
NPC04SpawnChanceIn = 0; //Slavoico BImG-500
NPC05SpawnChanceIn = 0; //Carbondyle Fecuda C.115
//PrincipalCharacters
NPC10SpawnChanceIn = 0; //Someone
//Agrians
NPC20SpawnChanceIn = 0; //Enforcer
NPC21SpawnChanceIn = 0; //Sentinel
NPC22SpawnChanceIn = 0; //Agent
NPC23SpawnChanceIn = 0; //Executor
NPC24SpawnChanceIn = 0; //SuperExecutor
NPC25SpawnChanceIn = 0; //Helirotor
NPC26SpawnChanceIn = 0; //Annihilator
NPC27SpawnChanceIn = 0; //Distributor
//Terrahyptians
NPC300SpawnChanceIn = 0; //LevNav Eos
NPC301SpawnChanceIn = 0; //LevNav Ithis
NPC302SpawnChanceIn = 0; //LevNav MAL
NPC303SpawnChanceIn = 0; //LevNav Darion
NPC310SpawnChanceIn = 0; //Bothunter
NPC31SpawnChanceIn = 0; //Valiant
NPC32SpawnChanceIn = 0; //FecarB1
NPC33SpawnChanceIn = 0; //DasNavCruiser
NPC34SpawnChanceIn = 0; //TRN RD-1
NPC35SpawnChanceIn = 0; //TLFAdamant
NPC36SpawnChanceIn = 0; //TLF Fughunter
NPC37SpawnChanceIn = 1; //TLF LRCM Neutralizer
NPC39SpawnChanceIn = 0; //TRN Zerana
//Aberrants
NPC40SpawnChanceIn = 0; //Abettor
NPC41SpawnChanceIn = 0; //Gunner
NPC42SpawnChanceIn = 0; //Militant
NPC43SpawnChanceIn = 0; //Marauder
NPC44SpawnChanceIn = 0; //Mercenary
NPC45SpawnChanceIn = 0; //Cruiser
//Slavuics
NPC50SpawnChanceIn = 0; //Civilian
NPC51SpawnChanceIn = 0; //Watchmen
NPC52SpawnChanceIn = 0; //Mistitor
NPC53SpawnChanceIn = 0; //Civilian2
NPC54SpawnChanceIn = 0; //Snositor
NPC55SpawnChanceIn = 0; //Vanguard
NPC56SpawnChanceIn = 0; //Smertnik
NPC57SpawnChanceIn = 0; //Satnik
//Al-Atiba
NPC60SpawnChanceIn = 0; //Van
NPC61SpawnChanceIn = 0; //Guncarrier
NPC62SpawnChanceIn = 0; //Bejsirf
NPC63SpawnChanceIn = 0; //Microcruiser
//MevNavs
NPC70SpawnChanceIn = 0; //Scout Drone
NPC71SpawnChanceIn = 0; //Battle Drone
NPC72SpawnChanceIn = 0; //Cannon Drone
NPC73SpawnChanceIn = 0; //Squire
NPC74SpawnChanceIn = 0; //Archer
NPC75SpawnChanceIn = 0; //Scabbard
NPC76SpawnChanceIn = 0; //Warmonger
NPC77SpawnChanceIn = 0; //Knight
NPC78SpawnChanceIn = 0; //Deus
NPC79SpawnChanceIn = 0; //Eschatos
//Dutvutanians
NPC90SpawnChanceIn = 0; //DutvutanianCivilian1
NPC91SpawnChanceIn = 0; //DutvutanianCivilian2
NPC92SpawnChanceIn = 0; //DutvutanianCivilian3
NPC93SpawnChanceIn = 0; //DutvutanianIntelShip1
NPC94SpawnChanceIn = 0; //DutvutanianPolice1
NPC95SpawnChanceIn = 0; //DutvutanianObmurat1
AgrianVigil = null;
}

//Static Settings --------------------------------------------------------------

//Objects
P0StaticSpawnChanceIn = P0SpawnChanceIn; //PagesGobnard

//Phenomenons
PH0StaticSpawnChanceIn = PH0SpawnChanceIn; //Dust Devil

//Civilians & Creatures
NPC000StaticSpawnChanceIn = NPC000SpawnChanceIn; //Peuktato
NPC001StaticSpawnChanceIn = NPC001SpawnChanceIn; //Peuktorb
NPC002StaticSpawnChanceIn = NPC002SpawnChanceIn; //Peuktuber
NPC003StaticSpawnChanceIn = NPC003SpawnChanceIn; //Peuknyth
NPC004StaticSpawnChanceIn = NPC004SpawnChanceIn; //Peuknyil
NPC005StaticSpawnChanceIn = NPC005SpawnChanceIn; //Peukopede
NPC006StaticSpawnChanceIn = NPC006SpawnChanceIn; //Big Peukopede
NPC007StaticSpawnChanceIn = NPC007SpawnChanceIn; //Svibra Cloud
NPC008StaticSpawnChanceIn = NPC008SpawnChanceIn; //Big Svibra Cloud
NPC009StaticSpawnChanceIn = NPC009SpawnChanceIn; //Cykin
NPC0091StaticSpawnChanceIn = NPC0091SpawnChanceIn; //Turgkin
NPC0800StaticSpawnChanceIn = NPC0800SpawnChanceIn; //Oot1
NPC0801StaticSpawnChanceIn = NPC0801SpawnChanceIn; //Oot2
NPC0802StaticSpawnChanceIn = NPC0802SpawnChanceIn; //Oot1
NPC0803StaticSpawnChanceIn = NPC0803SpawnChanceIn; //Oot2
NPC0804StaticSpawnChanceIn = NPC0804SpawnChanceIn; //OotDut1
NPC0805StaticSpawnChanceIn = NPC0805SpawnChanceIn; //OotDut1Group
NPC080StaticSpawnChanceIn = NPC080SpawnChanceIn; //Shadowfinger Ootkin
NPC081StaticSpawnChanceIn = NPC081SpawnChanceIn; //Athnian Ootkin 1
NPC082StaticSpawnChanceIn = NPC082SpawnChanceIn; //Athnian Ootkin 2
NPC00StaticSpawnChanceIn = NPC00SpawnChanceIn; //Afazis Terracruiser EC-1
NPC01StaticSpawnChanceIn = NPC01SpawnChanceIn; //TAK B-l4
NPC02StaticSpawnChanceIn = NPC02SpawnChanceIn; //Ezyfus Bejsirf Apta
NPC03StaticSpawnChanceIn = NPC03SpawnChanceIn; //Carbondyle Fecuda C.211
NPC04StaticSpawnChanceIn = NPC04SpawnChanceIn; //Slavoico BImG-500
NPC05StaticSpawnChanceIn = NPC05SpawnChanceIn; //Carbondyle Fecuda C.115
//PrincipalCharacters
NPC10StaticSpawnChanceIn = NPC10SpawnChanceIn; //Someone
//Agrians
NPC20StaticSpawnChanceIn = NPC20SpawnChanceIn; //Enforcer
NPC21StaticSpawnChanceIn = NPC21SpawnChanceIn; //Sentinel
//Terrahyptians
NPC300StaticSpawnChanceIn = NPC300SpawnChanceIn; //LevNav Eos
NPC301StaticSpawnChanceIn = NPC301SpawnChanceIn; //LevNav Ithis
NPC302StaticSpawnChanceIn = NPC302SpawnChanceIn; //LevNav MAL
NPC303StaticSpawnChanceIn = NPC303SpawnChanceIn; //LevNav Darion
NPC310StaticSpawnChanceIn = NPC310SpawnChanceIn; //Bothunter
NPC31StaticSpawnChanceIn = NPC31SpawnChanceIn; //Valiant
NPC32StaticSpawnChanceIn = NPC32SpawnChanceIn; //FecarB1
NPC33StaticSpawnChanceIn = NPC33SpawnChanceIn; //DasNavCruiser
NPC34StaticSpawnChanceIn = NPC34SpawnChanceIn; //TRN RD-1
NPC35StaticSpawnChanceIn = NPC35SpawnChanceIn; //TLFAdamant
NPC36StaticSpawnChanceIn = NPC36SpawnChanceIn; //TLF Fughunter
NPC37StaticSpawnChanceIn = NPC37SpawnChanceIn; //TLF LRCM Neutralizer
NPC39StaticSpawnChanceIn = NPC39SpawnChanceIn; //TRN Zerana
//Aberrants
NPC40StaticSpawnChanceIn = NPC40SpawnChanceIn; //Abettor
NPC41StaticSpawnChanceIn = NPC41SpawnChanceIn; //Gunner
NPC42StaticSpawnChanceIn = NPC42SpawnChanceIn; //Militant
NPC43StaticSpawnChanceIn = NPC43SpawnChanceIn; //Marauder
NPC44StaticSpawnChanceIn = NPC44SpawnChanceIn; //Mercenary
NPC45StaticSpawnChanceIn = NPC45SpawnChanceIn; //Cruiser
//Slavuics
NPC50StaticSpawnChanceIn = NPC50SpawnChanceIn; //Civilian
NPC51StaticSpawnChanceIn = NPC51SpawnChanceIn; //Watchmen
NPC52StaticSpawnChanceIn = NPC52SpawnChanceIn; //Mistitor
NPC53StaticSpawnChanceIn = NPC53SpawnChanceIn; //Civilian2
NPC54StaticSpawnChanceIn = NPC54SpawnChanceIn; //Snositor
NPC55StaticSpawnChanceIn = NPC55SpawnChanceIn; //Vanguard
NPC56StaticSpawnChanceIn = NPC56SpawnChanceIn; //Smertnik
//Akbars
NPC60StaticSpawnChanceIn = NPC60SpawnChanceIn; //Van
NPC61StaticSpawnChanceIn = NPC61SpawnChanceIn; //Guncarrier
NPC62StaticSpawnChanceIn = NPC62SpawnChanceIn; //Bejsirf
NPC63StaticSpawnChanceIn = NPC63SpawnChanceIn; //Microcruiser
//MevNavs
NPC70StaticSpawnChanceIn = NPC70SpawnChanceIn; //Sprite
NPC71StaticSpawnChanceIn = NPC71SpawnChanceIn; //Battle Drone
NPC72StaticSpawnChanceIn = NPC72SpawnChanceIn; //Cannon Drone
NPC73StaticSpawnChanceIn = NPC73SpawnChanceIn; //Squire
NPC74StaticSpawnChanceIn = NPC74SpawnChanceIn; //Archer
NPC75StaticSpawnChanceIn = NPC75SpawnChanceIn; //Scabbard
NPC76StaticSpawnChanceIn = NPC76SpawnChanceIn; //Warmonger
NPC77StaticSpawnChanceIn = NPC77SpawnChanceIn; //Knight
NPC78StaticSpawnChanceIn = NPC78SpawnChanceIn; //Deus
//Dutvutanians
NPC90StaticSpawnChanceIn = NPC90SpawnChanceIn; //Dutvutanian Civilian 1
NPC91StaticSpawnChanceIn = NPC91SpawnChanceIn; //Dutvutanian Civilian 2
NPC92StaticSpawnChanceIn = NPC92SpawnChanceIn; //Dutvutanian Civilian 3
NPC93StaticSpawnChanceIn = NPC93SpawnChanceIn; //DutvutanianIntelShip1
NPC94StaticSpawnChanceIn = NPC94SpawnChanceIn; //DutvutanianPolice1
NPC95StaticSpawnChanceIn = NPC95SpawnChanceIn; //DutvutanianObmurat1

//Spawn();

}

function FixedUpdate(){

Vel2 = WorldInformation.vehicleSpeed * 0.02;

VelClamp = Mathf.Clamp(Vel2,1,6);

if(Count > 0)
Count -= VelClamp;

if(Count < 1){
Spawn();
Count = 60;
}

if(SpawningBig){
var SBhit : RaycastHit;
var SBhit2 : RaycastHit;

if(!AreaSpace){

if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * BigSpawnDist, -transform.up, SBhit, HeightLimit, targetLayers)){

TripleAltParentTF.position = SBhit.point;
TripleAltParentTF.localPosition.y += 1;

AltaltRot.eulerAngles += Vector3(0, 2, 0);
Debug.DrawRay (SBhit.point + SpawnSource.up * 8, AltaltRot.forward * 150, Color.red);
if (Physics.Raycast (SBhit.point + SpawnSource.up * 8, AltaltRot.forward, 150, targetLayers))
Obscured = true;

if(TripleAltTF.localPosition.z > 1000){
TripleAltParentTF.eulerAngles += Vector3(0, 60, 0);
TripleAltTF.localPosition.z = 0;
}

if(Physics.Raycast(TripleAltTF.position + TripleAltTF.up * 1000, -TripleAltTF.up, SBhit2, 2000, targetLayers)){
TripleAltTF.localPosition.z += 20;
Debug.DrawRay (SBhit2.point + SpawnSource.up * 20, -AltaltRot.up * 40, Color.red);
if (!Physics.Raycast (SBhit2.point + SpawnSource.up * 20, -AltaltRot.up, 40, targetLayers))
Obscured = true;
}

}

}else{

AltaltRot.eulerAngles += Vector3(0, 2, 0);
Debug.DrawRay (SpawnSource.position + SpawnSource.forward * BigSpawnDist, AltaltRot.forward * 300, Color.red);
if (Physics.Raycast (SpawnSource.position + SpawnSource.forward * BigSpawnDist, AltaltRot.forward, 300, targetLayers))
Obscured = true;
Debug.DrawRay (SpawnSource.position + SpawnSource.forward * BigSpawnDist + SpawnSource.up * 8, AltaltRot.forward * 300, Color.red);
if (Physics.Raycast (SpawnSource.position + SpawnSource.forward * BigSpawnDist + SpawnSource.up * 8, AltaltRot.forward, 300, targetLayers))
Obscured = true;
Debug.DrawRay (SpawnSource.position + SpawnSource.forward * BigSpawnDist - SpawnSource.up * 8, AltaltRot.forward * 300, Color.red);
if (Physics.Raycast (SpawnSource.position + SpawnSource.forward * BigSpawnDist - SpawnSource.up * 8, AltaltRot.forward, 300, targetLayers))
Obscured = true;
Debug.DrawRay (SpawnSource.position + SpawnSource.forward * BigSpawnDist + SpawnSource.up * 16, AltaltRot.forward * 300, Color.red);
if (Physics.Raycast (SpawnSource.position + SpawnSource.forward * BigSpawnDist + SpawnSource.up * 16, AltaltRot.forward, 300, targetLayers))
Obscured = true;
Debug.DrawRay (SpawnSource.position + SpawnSource.forward * BigSpawnDist - SpawnSource.up * 16, AltaltRot.forward * 300, Color.red);
if (Physics.Raycast (SpawnSource.position + SpawnSource.forward * BigSpawnDist - SpawnSource.up * 16, AltaltRot.forward, 300, targetLayers))
Obscured = true;
Debug.DrawRay (SpawnSource.position + SpawnSource.forward * BigSpawnDist + SpawnSource.up * 24, AltaltRot.forward * 300, Color.red);
if (Physics.Raycast (SpawnSource.position + SpawnSource.forward * BigSpawnDist + SpawnSource.up * 24, AltaltRot.forward, 300, targetLayers))
Obscured = true;
Debug.DrawRay (SpawnSource.position + SpawnSource.forward * BigSpawnDist - SpawnSource.up * 24, AltaltRot.forward * 300, Color.red);
if (Physics.Raycast (SpawnSource.position + SpawnSource.forward * BigSpawnDist - SpawnSource.up * 24, AltaltRot.forward, 300, targetLayers))
Obscured = true;
Debug.DrawRay (SpawnSource.position + SpawnSource.forward * BigSpawnDist + SpawnSource.up * 32, AltaltRot.forward * 300, Color.red);
if (Physics.Raycast (SpawnSource.position + SpawnSource.forward * BigSpawnDist + SpawnSource.up * 32, AltaltRot.forward, 300, targetLayers))
Obscured = true;
Debug.DrawRay (SpawnSource.position + SpawnSource.forward * BigSpawnDist - SpawnSource.up * 32, AltaltRot.forward * 300, Color.red);
if (Physics.Raycast (SpawnSource.position + SpawnSource.forward * BigSpawnDist - SpawnSource.up * 32, AltaltRot.forward, 300, targetLayers))
Obscured = true;

}

}

}

function Spawn(){
var hit : RaycastHit;

if(Vel2 > 0.5){
MovingFast = true;
VelBreak = 0;
}else{
VelBreak += 1;
if(VelBreak > 4)
MovingFast = false;
}

if(WorldInformation.playerLevel == 0)
IsInPerson = true;
else
IsInPerson = false;

if(AgrianNetwork.Alert){
if(NPC22SpawnChanceIn > 0)
NPC22SpawnChanceIn = 4;
}

if(AgrianNetwork.instance.SubdueTarget){
if(NPC27SpawnChanceIn > 0)
NPC27SpawnChanceIn = 4;
}

if(TerrahyptianNetwork.AlertLVL1 > 0){
if(NPC31SpawnChanceIn > 0)
NPC31SpawnChanceIn = 16;

//var Load1 = Resources.Load("Prefabs/Angy", GameObject) as GameObject;
//var TGO1 = Instantiate(Load1, transform.position, transform.rotation);
//TGO1.GetComponent(AngyScript).myText = "c3 > c" + TerrahyptianNetwork.AlertLVL1;

TerrahyptianNetwork.AlertLVL1 = 0;
}

if(TerrahyptianNetwork.AlertLVL2 > 0){
   
if(NPC300SpawnChanceIn > 0)
NPC300SpawnChanceIn = 16;

if(NPC301SpawnChanceIn > 0)
NPC301SpawnChanceIn = 64;

if(NPC302SpawnChanceIn > 0)
NPC302SpawnChanceIn = 64;

if(NPC303SpawnChanceIn > 0)
NPC303SpawnChanceIn = 64;
   
if(NPC33SpawnChanceIn > 0 && NPC33SpawnChanceIn < 3000)
NPC33SpawnChanceIn = 16;

if(NPC34SpawnChanceIn > 0)
NPC34SpawnChanceIn = 16;

if(NPC35SpawnChanceIn > 0)
NPC35SpawnChanceIn = 16;

if(NPC36SpawnChanceIn > 0)
NPC36SpawnChanceIn = 16;

if(NPC37SpawnChanceIn > 0)
NPC37SpawnChanceIn = 16;

//var Load2 = Resources.Load("Prefabs/BigAngy", GameObject) as GameObject;
//var TGO2 = Instantiate(Load2, transform.position, transform.rotation);
//TGO2.GetComponent(AngyScript).myText = "c3 > c" + TerrahyptianNetwork.AlertLVL2;

TerrahyptianNetwork.AlertLVL2 = 0;
}


if(CallAssistance.IsCargoing){
if(NPC32SpawnChanceIn > 1)
NPC32SpawnChanceIn = 4;
}

if(AgrianNetwork.instance.AlertTime > 120){
if(NPC20SpawnChanceIn > 0)
NPC20SpawnChanceIn = 8;
if(NPC21SpawnChanceIn > 0)
NPC21SpawnChanceIn = 8;
if(NPC22SpawnChanceIn > 0)
NPC22SpawnChanceIn = 8;
if(AgrianNetwork.instance.AlertTime > 240)
if(NPC23SpawnChanceIn > 0)
NPC23SpawnChanceIn = 4;
if(AgrianNetwork.instance.AlertTime > 500)
if(NPC26SpawnChanceIn > 0)
NPC26SpawnChanceIn = 4;
}

if(SlavuicNetwork.TC1DeathRow > 300 && SlavuicNetwork.TC1DeathRow < 600){
if(NPC52SpawnChanceIn > 1 && NPC52SpawnChanceIn < 4000)
NPC52SpawnChanceIn = 4;
}

if(SlavuicNetwork.TC1DeathRow > 600){
if(NPC56SpawnChanceIn > 0)
NPC56SpawnChanceIn = 4;
}

if(MevNavNetwork.AlertLVL1 > 0){
if(NPC70SpawnChanceIn > 1 && NPC70SpawnChanceIn < 1000)
NPC70SpawnChanceIn = 32;
if(NPC77SpawnChanceIn > 1 && NPC77SpawnChanceIn < 5000)
NPC77SpawnChanceIn = 64;

//var Load3 = Resources.Load("Prefabs/Angy", GameObject) as GameObject;
//var TGO3 = Instantiate(Load3, transform.position, transform.rotation);
//TGO3.GetComponent(AngyScript).myText = "c7 > c" + MevNavNetwork.AlertLVL1;

MevNavNetwork.AlertLVL1 = 0;
}

if(MevNavNetwork.AlertLVL2 > 0){
if(NPC78SpawnChanceIn > 1)
NPC78SpawnChanceIn = 128;

//var Load4 = Resources.Load("Prefabs/BigAngy", GameObject) as GameObject;
//var TGO4 = Instantiate(Load4, transform.position, transform.rotation);
//TGO4.GetComponent(AngyScript).myText = "c7 > c" + MevNavNetwork.AlertLVL2;

MevNavNetwork.AlertLVL2 = 0;
}

if(MevNavNetwork.AlertLVL3 > 2){
if(NPC79SpawnChanceIn > 0)
NPC79SpawnChanceIn = 8;

NPC70SpawnChanceIn = 4;
NPC71SpawnChanceIn = 4;
NPC72SpawnChanceIn = 4;
NPC73SpawnChanceIn = 4;
NPC74SpawnChanceIn = 4;
NPC75SpawnChanceIn = 4;
NPC76SpawnChanceIn = 4;
NPC77SpawnChanceIn = 4;
NPC78SpawnChanceIn = 4;

//var Load4 = Resources.Load("Prefabs/BigAngy", GameObject) as GameObject;
//var TGO4 = Instantiate(Load4, transform.position, transform.rotation);
//TGO4.GetComponent(AngyScript).myText = "c7 > c" + MevNavNetwork.AlertLVL2;

}

if(DutvutanianNetwork.TC1CriminalLevel > 120){
if(NPC93SpawnChanceIn > 1)
NPC93SpawnChanceIn = 8;
if(DutvutanianNetwork.TC1CriminalLevel > 480)
if(NPC94SpawnChanceIn > 1)
NPC94SpawnChanceIn = 32;
if(DutvutanianNetwork.TC1CriminalLevel > 1400)
if(NPC95SpawnChanceIn > 0)
NPC95SpawnChanceIn = 32;
}

if(DutvutanianNetwork.TC2CriminalLevel > 120){
if(NPC93SpawnChanceIn > 1)
NPC93SpawnChanceIn = 8;
if(DutvutanianNetwork.TC2CriminalLevel > 480)
if(NPC94SpawnChanceIn > 1)
NPC94SpawnChanceIn = 32;
if(DutvutanianNetwork.TC2CriminalLevel > 1400)
if(NPC95SpawnChanceIn > 0)
NPC95SpawnChanceIn = 32;
}


if(!SpawningBig){

transform.LookAt(PlayerInformation.instance.PiriPresence);

transform.position = PlayerInformation.instance.PiriPresence.position;

transform.eulerAngles.x = 0;
transform.eulerAngles.z = 0;

savedRotY = transform.eulerAngles.y;

//Services
if(TheAmmoBot == null && CallAssistance.IsAmmoing){

if(VelClamp > 1){
transform.eulerAngles.y = savedRotY;
transform.eulerAngles.y += Random.Range (-60, 60);
}else{
transform.eulerAngles = Vector3(0, Random.Range (-180, 180), 0);
}

if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * 1800, -transform.up, hit, HeightLimit, targetLayers)){
if(!hit.collider.name.Contains ("Wa")){


SpawnPos.transform.localEulerAngles = Vector3(0, Random.Range (70, 110), 0);
TheAmmoBot = Instantiate(AmmoBot, hit.point + SpawnSource.up * 2, SpawnPos.rotation);

}
}
}

if(TheSnyns == null && CallAssistance.IsSnynsing){
if(!WorldInformation.PiriPodPresent){

transform.eulerAngles = Vector3(0, Random.Range (-180, 180), 0);

if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * 2000, -transform.up, hit, HeightLimit, targetLayers)){

var PrefabionaiseSnyns = Resources.Load("VesselPrefabs/Vessel1338", GameObject) as GameObject;

SpawnPos.transform.localEulerAngles = Vector3(0, Random.Range (70, 110), 0);
TheSnyns = Instantiate(PrefabionaiseSnyns, hit.point + SpawnSource.up * 4, SpawnPos.rotation);

}
}
}





if(TheKatovariDropPod == null && CallAssistance.IsKatovariying){

transform.eulerAngles = Vector3(0, Random.Range (-180, 180), 0);

if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * 12000, -transform.up, hit, HeightLimit, targetLayers)){

var PrefabionaiseKatovariDropPod = Resources.Load("NPCs/KatovariDropPod", GameObject) as GameObject;

SpawnPos.transform.localEulerAngles = Vector3(0, Random.Range (70, 110), 0);
TheKatovariDropPod = Instantiate(PrefabionaiseKatovariDropPod, hit.point + SpawnSource.up * 128, SpawnPos.rotation);

}

}





//[Peuktato]===========================================================================================================================
if(TheNPC000N < 3 && NPC000SpawnChanceIn > 1){

var randomValue000 : int = Random.Range(0, NPC000SpawnChanceIn);

if(VelClamp > 1){
transform.eulerAngles.y = savedRotY;
transform.eulerAngles.y += Random.Range (-60, 60);
}else{
transform.eulerAngles = Vector3(0, Random.Range (-180, 180), 0);
}

if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * Random.Range (25, 400), -transform.up, hit, HeightLimit, targetLayers)){
if(!hit.collider.name.Contains ("Wa")){

var CHP000 : Vector3 = hit.point + SpawnSource.up * 2;

if(Vector3.Distance(CHP000, PiriView.position) < 300)
if(!Physics.Linecast (CHP000, PiriView.position, targetLayers)){
NPC000SpawnChanceIn = 3;
return;
}

switch (randomValue000) {
case 2:
SpawnPos.transform.localEulerAngles = Vector3(0, Random.Range (70, 110), 0);
var TheNPC000 = Instantiate(NPC000, hit.point + SpawnSource.up * 2, SpawnPos.rotation);
SpawnPos.transform.position = TheNPC000.transform.position;
NPC000SpawnChanceIn = NPC000StaticSpawnChanceIn;
break;
}
}
}else{
NPC000SpawnChanceIn = 3;
}
}

//[Peuktorb]===========================================================================================================================
if(TheNPC001N < 3 && NPC001SpawnChanceIn > 1){

var randomValue001 : int = Random.Range(0, NPC001SpawnChanceIn);

if(VelClamp > 1){
transform.eulerAngles.y = savedRotY;
transform.eulerAngles.y += Random.Range (-60, 60);
}else{
transform.eulerAngles = Vector3(0, Random.Range (-180, 180), 0);
}

if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * Random.Range (25, 400), -transform.up, hit, HeightLimit, targetLayers)){
if(!hit.collider.name.Contains ("Wa")){

var CHP001 : Vector3 = hit.point + SpawnSource.up * 2;

if(Vector3.Distance(CHP001, PiriView.position) < 300)
if(!Physics.Linecast (CHP001, PiriView.position, targetLayers)){
NPC001SpawnChanceIn = 3;
return;
}

switch (randomValue001) {
case 2:
SpawnPos.transform.localEulerAngles = Vector3(0, Random.Range (70, 110), 0);
var TheNPC001 = Instantiate(NPC001, hit.point + SpawnSource.up * 2, SpawnPos.rotation);
SpawnPos.transform.position = TheNPC001.transform.position;
NPC001SpawnChanceIn = NPC001StaticSpawnChanceIn;
break;
}
}
}else{
NPC001SpawnChanceIn = 3;
}
}

//[Peuktuber]===========================================================================================================================
if(TheNPC002N < 4 && NPC002SpawnChanceIn > 1){

var randomValue002 : int = Random.Range(0, NPC002SpawnChanceIn);

if(VelClamp > 1){
transform.eulerAngles.y = savedRotY;
transform.eulerAngles.y += Random.Range (-60, 60);
}else{
transform.eulerAngles = Vector3(0, Random.Range (-180, 180), 0);
}

if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * Random.Range (25, 200), -transform.up, hit, HeightLimit, targetLayers)){
if(!hit.collider.name.Contains ("Wa")){

var CHP002 : Vector3 = hit.point + SpawnSource.up * 2;

if(Vector3.Distance(CHP002, PiriView.position) < 100)
if(!Physics.Linecast (CHP002, PiriView.position, targetLayers)){
NPC002SpawnChanceIn = 3;
return;
}

switch (randomValue002) {
case 2:
SpawnPos.transform.localEulerAngles = Vector3(0, Random.Range (70, 110), 0);
var TheNPC002 = Instantiate(NPC002, hit.point + SpawnSource.up * 1, SpawnPos.rotation);
SpawnPos.transform.position = TheNPC002.transform.position;
NPC002SpawnChanceIn = NPC002StaticSpawnChanceIn;
break;
}
}
}else{
NPC002SpawnChanceIn = 3;
}
}

//[Peuknyth]===========================================================================================================================
if(TheNPC003N < 2 && NPC003SpawnChanceIn > 1){

var randomValue003 : int = Random.Range(0, NPC003SpawnChanceIn);

if(VelClamp > 1){
transform.eulerAngles.y = savedRotY;
transform.eulerAngles.y += Random.Range (-60, 60);
}else{
transform.eulerAngles = Vector3(0, Random.Range (-180, 180), 0);
}

if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * Random.Range (25, 200), -transform.up, hit, HeightLimit, targetLayers)){
if(!hit.collider.name.Contains ("Wa")){

var CHP003 : Vector3 = hit.point + SpawnSource.up * 2;

if(Vector3.Distance(CHP003, PiriView.position) < 100)
if(!Physics.Linecast (CHP003, PiriView.position, targetLayers)){
NPC003SpawnChanceIn = 3;
return;
}

switch (randomValue003) {
case 2:
SpawnPos.transform.localEulerAngles = Vector3(0, Random.Range (70, 110), 0);
var TheNPC003 = Instantiate(NPC003, hit.point + SpawnSource.up * 1, SpawnPos.rotation);
SpawnPos.transform.position = TheNPC003.transform.position;
NPC003SpawnChanceIn = NPC003StaticSpawnChanceIn;
break;
}
}
}else{
NPC003SpawnChanceIn = 3;
}
}

//[Peuknyil]===========================================================================================================================
if(TheNPC004N < 2 && NPC004SpawnChanceIn > 1){

var randomValue004 : int = Random.Range(0, NPC004SpawnChanceIn);

if(VelClamp > 1){
transform.eulerAngles.y = savedRotY;
transform.eulerAngles.y += Random.Range (-60, 60);
}else{
transform.eulerAngles = Vector3(0, Random.Range (-180, 180), 0);
}

if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * Random.Range (25, 1000), -transform.up, hit, HeightLimit, targetLayers)){
if(!hit.collider.name.Contains ("Wa") && !hit.collider.name.Contains ("Pa")){

var CHP004 : Vector3 = hit.point + SpawnSource.up * 2;

if(Vector3.Distance(CHP004, PiriView.position) < 900)
if(!Physics.Linecast (CHP004, PiriView.position, targetLayers)){
NPC004SpawnChanceIn = 3;
return;
}

switch (randomValue004) {
case 2:
SpawnPos.transform.localEulerAngles = Vector3(0, Random.Range (70, 110), 0);
var TheNPC004 = Instantiate(NPC004, hit.point + SpawnSource.up * 2, SpawnPos.rotation);
SpawnPos.transform.position = TheNPC004.transform.position;
NPC004SpawnChanceIn = NPC004StaticSpawnChanceIn;
break;
}
}
}else{
NPC004SpawnChanceIn = 3;
}
}

//[Peukopede]===========================================================================================================================
if(TheNPC005N < 3 && NPC005SpawnChanceIn > 1){

var randomValue005 : int = Random.Range(0, NPC005SpawnChanceIn);

if(VelClamp > 1){
transform.eulerAngles.y = savedRotY;
transform.eulerAngles.y += Random.Range (-60, 60);
}else{
transform.eulerAngles = Vector3(0, Random.Range (-180, 180), 0);
}

if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * Random.Range (25, 600), -transform.up, hit, HeightLimit, targetLayers)){
if(!hit.collider.name.Contains ("Wa")){


var CHP005 : Vector3 = hit.point + SpawnSource.up * 2;

if(Vector3.Distance(CHP005, PiriView.position) < 500)
if(!Physics.Linecast (CHP005, PiriView.position, targetLayers)){
NPC005SpawnChanceIn = 3;
return;
}

switch (randomValue005) {
case 2:
SpawnPos.transform.localEulerAngles = Vector3(0, Random.Range (70, 110), 0);
var TheNPC005 = Instantiate(NPC005, hit.point + SpawnSource.up * 2, SpawnPos.rotation);
SpawnPos.transform.position = TheNPC005.transform.position;
NPC005SpawnChanceIn = NPC005StaticSpawnChanceIn;
break;
}
}
}else{
NPC005SpawnChanceIn = 3;
}
}

//[Big Peukopede]===========================================================================================================================
if(TheNPC006 == null && NPC006SpawnChanceIn > 1){

var randomValue006 : int = Random.Range(0, NPC006SpawnChanceIn);

if(VelClamp > 1){
transform.eulerAngles.y = savedRotY;
transform.eulerAngles.y += Random.Range (-60, 60);
}else{
transform.eulerAngles = Vector3(0, Random.Range (-180, 180), 0);
}

if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * Random.Range (25, 800), -transform.up, hit, HeightLimit, targetLayers)){
if(!hit.collider.name.Contains ("Wa") && !hit.collider.name.Contains ("Pa")){

var CHP006 : Vector3 = hit.point + SpawnSource.up * 2;

if(Vector3.Distance(CHP006, PiriView.position) < 700)
if(!Physics.Linecast (CHP006, PiriView.position, targetLayers)){
NPC006SpawnChanceIn = 3;
return;
}

switch (randomValue006) {
case 2:
SpawnPos.transform.localEulerAngles = Vector3(0, Random.Range (70, 110), 0);
TheNPC006 = Instantiate(NPC006, hit.point + SpawnSource.up * 3, SpawnPos.rotation);
SpawnPos.transform.position = TheNPC006.transform.position;
NPC006SpawnChanceIn = NPC006StaticSpawnChanceIn;
break;
}
}
}else{
NPC006SpawnChanceIn = 3;
}
}

//[Svibra Cloud]===========================================================================================================================
if(TheNPC007 == null && NPC007SpawnChanceIn > 1){

var randomValue007 : int = Random.Range(0, NPC007SpawnChanceIn);

if(VelClamp > 1){
transform.eulerAngles.y = savedRotY;
transform.eulerAngles.y += Random.Range (-60, 60);
}else{
transform.eulerAngles = Vector3(0, Random.Range (-180, 180), 0);
}

if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * Random.Range (LowSpawnDist, 200), -transform.up, hit, HeightLimit, targetLayers)){
if(!hit.collider.name.Contains ("Wa")){

var CHP007 : Vector3 = hit.point + SpawnSource.up * 2;

if(Vector3.Distance(CHP007, PiriView.position) < 100)
if(!Physics.Linecast (CHP007, PiriView.position, targetLayers)){
NPC007SpawnChanceIn = 3;
return;
}

switch (randomValue007) {
case 2:
SpawnPos.transform.localEulerAngles = Vector3(0, Random.Range (70, 110), 0);
TheNPC007 = Instantiate(NPC007, hit.point + SpawnSource.up * 2, SpawnPos.rotation);
SpawnPos.transform.position = TheNPC007.transform.position;
NPC007SpawnChanceIn = NPC007StaticSpawnChanceIn;
break;
}
}
}else{
NPC007SpawnChanceIn = 3;
}
}

//[Big Svibra Cloud]===========================================================================================================================
if(TheNPC008 == null && NPC008SpawnChanceIn > 1){

var randomValue008 : int = Random.Range(0, NPC008SpawnChanceIn);

if(VelClamp > 1){
transform.eulerAngles.y = savedRotY;
transform.eulerAngles.y += Random.Range (-60, 60);
}else{
transform.eulerAngles = Vector3(0, Random.Range (-180, 180), 0);
}

if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * Random.Range (LowSpawnDist, 600), -transform.up, hit, HeightLimit, targetLayers)){
if(!hit.collider.name.Contains ("Wa")){

var CHP008 : Vector3 = hit.point + SpawnSource.up * 2;

if(Vector3.Distance(CHP008, PiriView.position) < 500)
if(!Physics.Linecast (CHP008, PiriView.position, targetLayers)){
NPC008SpawnChanceIn = 3;
return;
}

switch (randomValue008) {
case 2:
SpawnPos.transform.localEulerAngles = Vector3(0, Random.Range (70, 110), 0);
TheNPC008 = Instantiate(NPC008, hit.point + SpawnSource.up * 3, SpawnPos.rotation);
SpawnPos.transform.position = TheNPC008.transform.position;
NPC008SpawnChanceIn = NPC008StaticSpawnChanceIn;
break;
}
}
}else{
NPC008SpawnChanceIn = 3;
}
}

//[Cykin]===========================================================================================================================
if(TheNPC009N < 3 && NPC009SpawnChanceIn > 1){

var Spawnionaise009 = Resources.Load("NPCs/CykinDut", GameObject) as GameObject;

var randomValue009 : int = Random.Range(0, NPC009SpawnChanceIn);

if(VelClamp > 1){
transform.eulerAngles.y = savedRotY;
transform.eulerAngles.y += Random.Range (-60, 60);
}else{
transform.eulerAngles = Vector3(0, Random.Range (-180, 180), 0);
}

if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * Random.Range (128, 256) + -SpawnSource.up * 997, -transform.up, hit, HeightLimit, targetLayers)){

switch (randomValue009) {
case 2:
SpawnPos.transform.localEulerAngles = Vector3(0, Random.Range (70, 110), 0);
TheNPC009 = Instantiate(Spawnionaise009, hit.point + SpawnSource.up * Random.Range (2, 5), SpawnPos.rotation);
SpawnPos.transform.position = TheNPC009.transform.position;
NPC009SpawnChanceIn = NPC009StaticSpawnChanceIn;
break;
}

}
}

//[Cethin]===========================================================================================================================


//[Turgkin]===========================================================================================================================
if(TheNPC0091N < 3 && NPC0091SpawnChanceIn > 1){

var Spawnionaise0091 = Resources.Load("NPCs/TurgkinDut", GameObject) as GameObject;

var randomValue0091 : int = Random.Range(0, NPC0091SpawnChanceIn);

if(VelClamp > 1){
transform.eulerAngles.y = savedRotY;
transform.eulerAngles.y += Random.Range (-60, 60);
}else{
transform.eulerAngles = Vector3(0, Random.Range (-180, 180), 0);
}

if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * Random.Range (256, 512) + -SpawnSource.up * 997, -transform.up, hit, HeightLimit, targetLayers)){

switch (randomValue0091) {
case 2:
SpawnPos.transform.localEulerAngles = Vector3(0, Random.Range (70, 110), 0);
TheNPC0091 = Instantiate(Spawnionaise0091, hit.point + SpawnSource.up * Random.Range (0.5, 3), SpawnPos.rotation);
SpawnPos.transform.position = TheNPC0091.transform.position;
NPC0091SpawnChanceIn = NPC0091StaticSpawnChanceIn;
break;
}

}
}

//[Ootped]===========================================================================================================================
if(WorldInformation.IsOotkinSick){

var SpawnionaiseOotped = Resources.Load("NPCs/Ootped", GameObject) as GameObject;

var randomValueOotped : int = Random.Range(0, 8);

if(VelClamp > 1){
transform.eulerAngles.y = savedRotY;
transform.eulerAngles.y += Random.Range (-60, 60);
}else{
transform.eulerAngles = Vector3(0, Random.Range (-180, 180), 0);
}

if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * Random.Range (25, 50), -transform.up, hit, HeightLimit, targetLayers)){

switch (randomValueOotped) {
case 2:
SpawnPos.transform.localEulerAngles = Vector3(0, Random.Range (70, 110), 0);
var TheOotped = Instantiate(SpawnionaiseOotped, hit.point + SpawnSource.up * 0.3, SpawnPos.rotation);
SpawnPos.transform.position = TheOotped.transform.position;
break;
}

}
}

//[Oot1]===========================================================================================================================
if(TheNPC0800 == null && NPC0800SpawnChanceIn > 1){

var Spawnionaise0800 = Resources.Load("NPCs/Oot1", GameObject) as GameObject;

var randomValue0800 : int = Random.Range(0, NPC0800SpawnChanceIn);

if(VelClamp > 1){
transform.eulerAngles.y = savedRotY;
transform.eulerAngles.y += Random.Range (-60, 60);
}else{
transform.eulerAngles = Vector3(0, Random.Range (-180, 180), 0);
}

if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * Random.Range (4, 64) + -SpawnSource.up * 997, -transform.up, hit, HeightLimit, targetLayers)){

switch (randomValue0800) {
case 2:
SpawnPos.transform.localEulerAngles = Vector3(0, Random.Range (70, 110), 0);
TheNPC0800 = Instantiate(Spawnionaise0800, hit.point + SpawnSource.up * Random.Range (0.5, 3), SpawnPos.rotation);
SpawnPos.transform.position = TheNPC0800.transform.position;
NPC0800SpawnChanceIn = NPC0800StaticSpawnChanceIn;
break;
}

}
}

//[Oot2]===========================================================================================================================
if(TheNPC0801 == null && NPC0801SpawnChanceIn > 1){

var Spawnionaise0801 = Resources.Load("NPCs/Oot2", GameObject) as GameObject;

var randomValue0801 : int = Random.Range(0, NPC0801SpawnChanceIn);

if(VelClamp > 1){
transform.eulerAngles.y = savedRotY;
transform.eulerAngles.y += Random.Range (-60, 60);
}else{
transform.eulerAngles = Vector3(0, Random.Range (-180, 180), 0);
}

if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * Random.Range (4, 64) + -SpawnSource.up * 997, -transform.up, hit, HeightLimit, targetLayers)){

switch (randomValue0801) {
case 2:
SpawnPos.transform.localEulerAngles = Vector3(0, Random.Range (70, 110), 0);
TheNPC0801 = Instantiate(Spawnionaise0801, hit.point + SpawnSource.up * Random.Range (0.5, 3), SpawnPos.rotation);
SpawnPos.transform.position = TheNPC0801.transform.position;
NPC0801SpawnChanceIn = NPC0801StaticSpawnChanceIn;
break;
}

}
}

//[Oot3]===========================================================================================================================
if(TheNPC0802 == null && NPC0802SpawnChanceIn > 1){

var Spawnionaise0802 = Resources.Load("NPCs/Oot3", GameObject) as GameObject;

var randomValue0802 : int = Random.Range(0, NPC0802SpawnChanceIn);

if(VelClamp > 1){
transform.eulerAngles.y = savedRotY;
transform.eulerAngles.y += Random.Range (-60, 60);
}else{
transform.eulerAngles = Vector3(0, Random.Range (-180, 180), 0);
}

if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * Random.Range (4, 64) + -SpawnSource.up * 997, -transform.up, hit, HeightLimit, targetLayers)){

switch (randomValue0802) {
case 2:
SpawnPos.transform.localEulerAngles = Vector3(0, Random.Range (70, 110), 0);
TheNPC0802 = Instantiate(Spawnionaise0802, hit.point + SpawnSource.up * Random.Range (0.5, 3), SpawnPos.rotation);
SpawnPos.transform.position = TheNPC0802.transform.position;
NPC0802SpawnChanceIn = NPC0802StaticSpawnChanceIn;
break;
}

}
}

//[Oot4]===========================================================================================================================
if(TheNPC0803 == null && NPC0803SpawnChanceIn > 1){

var Spawnionaise0803 = Resources.Load("NPCs/Oot4", GameObject) as GameObject;

var randomValue0803 : int = Random.Range(0, NPC0803SpawnChanceIn);

if(VelClamp > 1){
transform.eulerAngles.y = savedRotY;
transform.eulerAngles.y += Random.Range (-60, 60);
}else{
transform.eulerAngles = Vector3(0, Random.Range (-180, 180), 0);
}

if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * Random.Range (4, 64) + -SpawnSource.up * 997, -transform.up, hit, HeightLimit, targetLayers)){

switch (randomValue0803) {
case 2:
SpawnPos.transform.localEulerAngles = Vector3(0, Random.Range (70, 110), 0);
TheNPC0803 = Instantiate(Spawnionaise0803, hit.point + SpawnSource.up * Random.Range (0.5, 3), SpawnPos.rotation);
SpawnPos.transform.position = TheNPC0803.transform.position;
NPC0803SpawnChanceIn = NPC0803StaticSpawnChanceIn;
break;
}

}
}

//[OotDut1]===========================================================================================================================
if(NPC0804SpawnChanceIn > 1){

var Spawnionaise0804 = Resources.Load("NPCs/OotDut1", GameObject) as GameObject;

var randomValue0804 : int = Random.Range(0, NPC0804SpawnChanceIn);

if(VelClamp > 1){
transform.eulerAngles.y = savedRotY;
transform.eulerAngles.y += Random.Range (-60, 60);
}else{
transform.eulerAngles = Vector3(0, Random.Range (-180, 180), 0);
}

if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * Random.Range (4, 64) + -SpawnSource.up * 997, -transform.up, hit, HeightLimit, targetLayers)){

switch (randomValue0804) {
case 2:

// VicinityChecker ==================================================================
var gos : GameObject[];
gos = GameObject.FindGameObjectsWithTag("Archoneutralizer");
var closest : Vector3;
var distance = Mathf.Infinity;
var position = transform.position;

closest = Vector3(0,0,1000000);
 
for (var go : GameObject in gos) {
var diff = (go.transform.position - position);
var curDistance = diff.sqrMagnitude;

if (curDistance < distance) {
closest = go.transform.position;
distance = curDistance;
}
}

//Debug.Log(closest);
// ==================================================================================
if(Vector3.Distance(hit.point, closest) > 64){
SpawnPos.transform.localEulerAngles = Vector3(0, Random.Range (70, 110), 0);
TheNPC0804 = Instantiate(Spawnionaise0804, hit.point + SpawnSource.up * Random.Range (0.5, 3), SpawnPos.rotation);
SpawnPos.transform.position = TheNPC0804.transform.position;
NPC0804SpawnChanceIn = NPC0804StaticSpawnChanceIn;
}
break;
}

}
}

//[OotDut1Group]===========================================================================================================================
if(TheNPC0805N < 24 && NPC0805SpawnChanceIn > 1){


var Spawnionaise0805 = Resources.Load("NPCs/OotDut1Group1", GameObject) as GameObject;

var randomValue0805S : int = Random.Range(0, 3);

switch (randomValue0805S) {
case 0:
Spawnionaise0805 = Resources.Load("NPCs/OotDut1Group1", GameObject) as GameObject;
break;
case 1:
Spawnionaise0805 = Resources.Load("NPCs/OotDut1Group2", GameObject) as GameObject;
break;
case 2:
Spawnionaise0805 = Resources.Load("NPCs/OotDut1Group3", GameObject) as GameObject;
break;
}

var randomValue0805 : int = Random.Range(0, NPC0805SpawnChanceIn);

if(VelClamp > 1){
transform.eulerAngles.y = savedRotY;
transform.eulerAngles.y += Random.Range (-60, 60);
}else{
transform.eulerAngles = Vector3(0, Random.Range (-180, 180), 0);
}

if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * Random.Range (256, 500), -transform.up, hit, HeightLimit, targetLayers)){

switch (randomValue0805) {
case 2:
SpawnPos.transform.localEulerAngles = Vector3(0, Random.Range (70, 110), 0);
TheNPC0805 = Instantiate(Spawnionaise0805, hit.point + SpawnSource.up * 2, SpawnPos.rotation);
SpawnPos.transform.position = TheNPC0805.transform.position;
break;
}

}
}

//[Shadowfinger Ootkin]===========================================================================================================================
if(TheNPC080 == null && NPC080SpawnChanceIn > 1){

var randomValue080 : int = Random.Range(0, NPC080SpawnChanceIn);

if(VelClamp > 1){
transform.eulerAngles.y = savedRotY;
transform.eulerAngles.y += Random.Range (-60, 60);
}else{
transform.eulerAngles = Vector3(0, Random.Range (-180, 180), 0);
}

if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * Random.Range (25, 100), -transform.up, hit, HeightLimit, targetLayers)){
if(!hit.collider.name.Contains ("Wa")){

switch (randomValue080) {
case 2:
SpawnPos.transform.localEulerAngles = Vector3(0, Random.Range (70, 110), 0);
TheNPC080 = Instantiate(NPC080, hit.point + SpawnSource.up * 3, SpawnPos.rotation);
SpawnPos.transform.position = TheNPC080.transform.position;
NPC080SpawnChanceIn = NPC080StaticSpawnChanceIn;
break;
}
}
}else{
NPC080SpawnChanceIn = 3;
}
}

//[Athnian Ootkin 1]===========================================================================================================================
if(TheNPC081 == null && NPC081SpawnChanceIn > 1){

var randomValue081 : int = Random.Range(0, NPC081SpawnChanceIn);

if(VelClamp > 1){
transform.eulerAngles.y = savedRotY;
transform.eulerAngles.y += Random.Range (-60, 60);
}else{
transform.eulerAngles = Vector3(0, Random.Range (-180, 180), 0);
}

if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * Random.Range (25, 200), -transform.up, hit, HeightLimit, targetLayers)){
if(!hit.collider.name.Contains ("Wa")){

switch (randomValue081) {
case 2:
SpawnPos.transform.localEulerAngles = Vector3(0, Random.Range (70, 110), 0);
TheNPC081 = Instantiate(NPC081, hit.point + SpawnSource.up * 2, SpawnPos.rotation);
SpawnPos.transform.position = TheNPC081.transform.position;
NPC081SpawnChanceIn = NPC081StaticSpawnChanceIn;
break;
}
}
}else{
NPC081SpawnChanceIn = 3;
}
}

//[Athnian Ootkin 2]===========================================================================================================================
if(TheNPC082 == null && NPC082SpawnChanceIn > 1){

var randomValue082 : int = Random.Range(0, NPC082SpawnChanceIn);

if(VelClamp > 1){
transform.eulerAngles.y = savedRotY;
transform.eulerAngles.y += Random.Range (-60, 60);
}else{
transform.eulerAngles = Vector3(0, Random.Range (-180, 180), 0);
}

if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * Random.Range (25, 200), -transform.up, hit, HeightLimit, targetLayers)){
if(!hit.collider.name.Contains ("Wa")){

switch (randomValue082) {
case 2:
SpawnPos.transform.localEulerAngles = Vector3(0, Random.Range (70, 110), 0);
TheNPC082 = Instantiate(NPC082, hit.point + SpawnSource.up * 2, SpawnPos.rotation);
SpawnPos.transform.position = TheNPC082.transform.position;
NPC082SpawnChanceIn = NPC082StaticSpawnChanceIn;
break;
}
}
}else{
NPC082SpawnChanceIn = 3;
}
}

//[Afazis Terracruiser EC-1]===========================================================================================================================
if(TheNPC00 == null && NPC00SpawnChanceIn > 1){

var randomValue00 : int = Random.Range(0, NPC00SpawnChanceIn);

if(VelClamp > 1){
transform.eulerAngles.y = savedRotY;
transform.eulerAngles.y += Random.Range (-60, 60);
}else{
transform.eulerAngles = Vector3(0, Random.Range (-180, 180), 0);
}

if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * 1800, -transform.up, hit, HeightLimit, targetLayers)){
if(!hit.collider.name.Contains ("Wa")){

switch (randomValue00) {
case 2:
SpawnPos.transform.localEulerAngles = Vector3(0, Random.Range (70, 110), 0);
TheNPC00 = Instantiate(NPC00, hit.point + SpawnSource.up * 2, SpawnPos.rotation);
SpawnPos.transform.position = TheNPC00.transform.position;
break;
}
}
}
}

//[TAK B-l4]===========================================================================================================================
if(TheNPC01 == null && NPC01SpawnChanceIn > 1){

var randomValue01 : int = Random.Range(0, NPC01SpawnChanceIn);

if(VelClamp > 1){
transform.eulerAngles.y = savedRotY;
transform.eulerAngles.y += Random.Range (-60, 60);
}else{
transform.eulerAngles = Vector3(0, Random.Range (-180, 180), 0);
}

if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * 1800, -transform.up, hit, HeightLimit, targetLayers)){
if(!hit.collider.name.Contains ("Wa")){

switch (randomValue01) {
case 2:
SpawnPos.transform.localEulerAngles = Vector3(0, Random.Range (70, 110), 0);
TheNPC01 = Instantiate(NPC01, hit.point + SpawnSource.up * 2, SpawnPos.rotation);
SpawnPos.transform.position = TheNPC01.transform.position;
break;
}
}
}
}

//[Ezyfus Bejsirf Apta]===========================================================================================================================
if(TheNPC02 == null && NPC02SpawnChanceIn > 1){

var randomValue02 : int = Random.Range(0, NPC02SpawnChanceIn);

if(VelClamp > 1){
transform.eulerAngles.y = savedRotY;
transform.eulerAngles.y += Random.Range (-60, 60);
}else{
transform.eulerAngles = Vector3(0, Random.Range (-180, 180), 0);
}

if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * 1800, -transform.up, hit, HeightLimit, targetLayers)){
if(!hit.collider.name.Contains ("Wa")){

switch (randomValue02) {
case 2:
SpawnPos.transform.localEulerAngles = Vector3(0, Random.Range (70, 110), 0);
TheNPC02 = Instantiate(NPC02, hit.point + SpawnSource.up * 2, SpawnPos.rotation);
SpawnPos.transform.position = TheNPC02.transform.position;
break;
}
}
}
}

//[Carbondyle Fecuda C.211]===========================================================================================================================
if(TheNPC03 == null && NPC03SpawnChanceIn > 1){

var randomValue03 : int = Random.Range(0, NPC03SpawnChanceIn);

if(VelClamp > 1){
transform.eulerAngles.y = savedRotY;
transform.eulerAngles.y += Random.Range (-60, 60);
}else{
transform.eulerAngles = Vector3(0, Random.Range (-180, 180), 0);
}

if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * 1800, -transform.up, hit, HeightLimit, targetLayers)){
if(!hit.collider.name.Contains ("Wa")){

switch (randomValue03) {
case 2:
SpawnPos.transform.localEulerAngles = Vector3(0, Random.Range (70, 110), 0);
TheNPC03 = Instantiate(NPC03, hit.point + SpawnSource.up * 2, SpawnPos.rotation);
SpawnPos.transform.position = TheNPC03.transform.position;
break;
}
}
}
}

//[Slavoico BImG-500]===========================================================================================================================
if(TheNPC04 == null && NPC04SpawnChanceIn > 1){

var randomValue04 : int = Random.Range(0, NPC04SpawnChanceIn);

if(VelClamp > 1){
transform.eulerAngles.y = savedRotY;
transform.eulerAngles.y += Random.Range (-60, 60);
}else{
transform.eulerAngles = Vector3(0, Random.Range (-180, 180), 0);
}

if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * 2500, -transform.up, hit, HeightLimit, targetLayers)){
if(!hit.collider.name.Contains ("Wa")){

switch (randomValue04) {
case 2:
SpawnPos.transform.localEulerAngles = Vector3(0, Random.Range (70, 110), 0);
TheNPC04 = Instantiate(NPC04, hit.point + SpawnSource.up * 4, SpawnPos.rotation);
SpawnPos.transform.position = TheNPC04.transform.position;
break;
}
}
}
}

//[Carbondyle Fecuda C.115]===========================================================================================================================
if(TheNPC05 == null && NPC05SpawnChanceIn > 1){

var randomValue05 : int = Random.Range(0, NPC05SpawnChanceIn);

if(VelClamp > 1){
transform.eulerAngles.y = savedRotY;
transform.eulerAngles.y += Random.Range (-60, 60);
}else{
transform.eulerAngles = Vector3(0, Random.Range (-180, 180), 0);
}

if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * 1800, -transform.up, hit, HeightLimit, targetLayers)){
if(!hit.collider.name.Contains ("Wa")){

switch (randomValue05) {
case 2:
SpawnPos.transform.localEulerAngles = Vector3(0, Random.Range (70, 110), 0);
TheNPC05 = Instantiate(NPC05, hit.point + SpawnSource.up * 2, SpawnPos.rotation);
SpawnPos.transform.position = TheNPC05.transform.position;
break;
}
}
}
}

//[Someone]===========================================================================================================================
if(TheNPC10 == null && NPC10SpawnChanceIn > 1){

var randomValue10 : int = Random.Range(0, NPC10SpawnChanceIn);

if(VelClamp > 1){
transform.eulerAngles.y = savedRotY;
transform.eulerAngles.y += Random.Range (-60, 60);
}else{
transform.eulerAngles = Vector3(0, Random.Range (-180, 180), 0);
}

if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * 1800, -transform.up, hit, HeightLimit, targetLayers)){
if(!hit.collider.name.Contains ("Wa")){

switch (randomValue10) {
case 2:
SpawnPos.transform.localEulerAngles = Vector3(0, Random.Range (70, 110), 0);
TheNPC10 = Instantiate(NPC10, hit.point + SpawnSource.up * 2, SpawnPos.rotation);
SpawnPos.transform.position = TheNPC10.transform.position;
break;
}
}
}
}

//[Enforcer]===========================================================================================================================
if(TheNPC20 == null && NPC20SpawnChanceIn > 1){

var randomValue20 : int = Random.Range(0, NPC20SpawnChanceIn);

if(VelClamp > 1){
transform.eulerAngles.y = savedRotY;
transform.eulerAngles.y += Random.Range (-60, 60);
}else{
transform.eulerAngles = Vector3(0, Random.Range (-180, 180), 0);
}

if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * 1800, -transform.up, hit, HeightLimit, targetLayers)){
if(!hit.collider.name.Contains ("Wa")){

switch (randomValue20) {
case 2:
SpawnPos.transform.localEulerAngles = Vector3(0, Random.Range (70, 110), 0);
TheNPC20 = Instantiate(NPC20, hit.point + SpawnSource.up * 2, SpawnPos.rotation);
SpawnPos.transform.position = TheNPC20.transform.position;
break;
}
}
}else{
if(Physics.Raycast(SpawnSource.position + -SpawnSource.up * 1100 + SpawnSource.forward * 1800, transform.up, hit, HeightLimit, targetLayers)){

switch (randomValue20) {
case 2:
SpawnPos.transform.localEulerAngles = Vector3(0, Random.Range (70, 110), 0);
TheNPC20 = Instantiate(NPC20, hit.point + -SpawnSource.up * 4, SpawnPos.rotation);
SpawnPos.transform.position = TheNPC20.transform.position;
break;
}

}
}
}

//[Sentinel]===========================================================================================================================
if(TheNPC21 == null && NPC21SpawnChanceIn > 1){

var randomValue21 : int = Random.Range(0, NPC21SpawnChanceIn);

if(VelClamp > 1){
transform.eulerAngles.y = savedRotY;
transform.eulerAngles.y += Random.Range (-60, 60);
}else{
transform.eulerAngles = Vector3(0, Random.Range (-180, 180), 0);
}

if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * 1800, -transform.up, hit, HeightLimit, targetLayers)){
if(!hit.collider.name.Contains ("Wa")){

switch (randomValue21) {
case 2:
SpawnPos.transform.localEulerAngles = Vector3(0, Random.Range (70, 110), 0);
TheNPC21 = Instantiate(NPC21, hit.point + SpawnSource.up * 2, SpawnPos.rotation);
SpawnPos.transform.position = TheNPC21.transform.position;
break;
}
}
}else{
if(Physics.Raycast(SpawnSource.position + -SpawnSource.up * 1100 + SpawnSource.forward * 1800, transform.up, hit, HeightLimit, targetLayers)){

switch (randomValue21) {
case 2:
SpawnPos.transform.localEulerAngles = Vector3(0, Random.Range (70, 110), 0);
TheNPC21 = Instantiate(NPC21, hit.point + -SpawnSource.up * 4, SpawnPos.rotation);
SpawnPos.transform.position = TheNPC21.transform.position;
break;
}

}
}
}

//if(AreaNum == 14)
//transform.eulerAngles = Vector3(0, Random.Range (-270, -90), 0);
//else
//if(VelClamp > 1)
//transform.localEulerAngles.y += Random.Range (-60, 60);
//else
//transform.eulerAngles = Vector3(0, Random.Range (-180, 180), 0);
//
//if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * 100, -transform.up, hit, HeightLimit, targetLayers)){
//var Load = Resources.Load("Prefabs/ThreatCursor", GameObject) as GameObject;
//
//var TGO = Instantiate(Load, hit.point + SpawnSource.up * 2, SpawnPos.rotation);
//}


//[Agent]===========================================================================================================================
if(TheNPC22 == null && NPC22SpawnChanceIn > 1){

var randomValue22 : int = Random.Range(0, NPC22SpawnChanceIn);

if(AreaNum == 14)
transform.eulerAngles = Vector3(0, Random.Range (-270, -90), 0);
else
if(VelClamp > 1){
transform.eulerAngles.y = savedRotY;
transform.eulerAngles.y += Random.Range (-60, 60);
}else{
transform.eulerAngles = Vector3(0, Random.Range (-180, 180), 0);
}

if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * 6000, -transform.up, hit, HeightLimit, targetLayers)){

switch (randomValue22) {
case 2:
BigSpawnDist = 6000;
BigSpawn22();
return;
break;
}

}
}

//[Executor]===========================================================================================================================
if(TheNPC23 == null && NPC23SpawnChanceIn > 1){

var randomValue23 : int = Random.Range(0, NPC23SpawnChanceIn);

if(AreaNum == 14)
transform.eulerAngles = Vector3(0, Random.Range (-270, -90), 0);
else
if(VelClamp > 1){
transform.eulerAngles.y = savedRotY;
transform.eulerAngles.y += Random.Range (-60, 60);
}else{
transform.eulerAngles = Vector3(0, Random.Range (-180, 180), 0);
}

if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * 8000, -transform.up, hit, HeightLimit, targetLayers)){

switch (randomValue23) {
case 2:
BigSpawnDist = 8000;
BigSpawn23();
return;
break;
}

}
}

//[SuperExecutor]===========================================================================================================================
if(TheNPC24 == null && NPC24SpawnChanceIn > 1){

var randomValue24 : int = Random.Range(0, NPC24SpawnChanceIn);

if(VelClamp > 1){
transform.eulerAngles.y = savedRotY;
transform.eulerAngles.y += Random.Range (-60, 60);
}else{
transform.eulerAngles = Vector3(0, Random.Range (-180, 180), 0);
}

if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * 12000, -transform.up, hit, HeightLimit, targetLayers)){

switch (randomValue24) {
case 2:
BigSpawnDist = 12000;
BigSpawn24();
return;
break;
}

}
}

//[Helirotor]===========================================================================================================================
if(TheNPC25 == null && NPC25SpawnChanceIn > 1){

var Spawnionaise25 = Resources.Load("NPCs/AgrianHelirotor", GameObject) as GameObject;

var randomValue25 : int = Random.Range(0, NPC25SpawnChanceIn);

if(VelClamp > 1){
transform.eulerAngles.y = savedRotY;
transform.eulerAngles.y += Random.Range (-60, 60);
}else{
transform.eulerAngles = Vector3(0, Random.Range (-180, 180), 0);
}

if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * 3500, -transform.up, hit, HeightLimit, targetLayers)){
if(!hit.collider.name.Contains ("Wa")){

switch (randomValue25) {
case 2:
SpawnPos.transform.localEulerAngles = Vector3(0, Random.Range (70, 110), 0);
TheNPC25 = Instantiate(Spawnionaise25, hit.point + SpawnSource.up * 8, SpawnPos.rotation);
SpawnPos.transform.position = TheNPC25.transform.position;
break;
}
}
}
}

//[Annihilator]===========================================================================================================================
if(TheNPC26 == null && NPC26SpawnChanceIn > 1){

var randomValue26 : int = Random.Range(0, NPC26SpawnChanceIn);

if(AreaNum == 14)
transform.eulerAngles = Vector3(0, Random.Range (-270, -90), 0);
else
if(VelClamp > 1){
transform.eulerAngles.y = savedRotY;
transform.eulerAngles.y += Random.Range (-60, 60);
}else{
transform.eulerAngles = Vector3(0, Random.Range (-180, 180), 0);
}

if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * 8000, -transform.up, hit, HeightLimit, targetLayers)){

switch (randomValue26) {
case 2:
BigSpawnDist = 8000;
BigSpawn26();
return;
break;
}

}
}

//[Distributor]===========================================================================================================================
if(TheNPC27 == null && NPC27SpawnChanceIn > 1){

var randomValue27 : int = Random.Range(0, NPC27SpawnChanceIn);

if(AreaNum == 14)
transform.eulerAngles = Vector3(0, Random.Range (-270, -90), 0);
else
if(VelClamp > 1){
transform.eulerAngles.y = savedRotY;
transform.eulerAngles.y += Random.Range (-60, 60);
}else{
transform.eulerAngles = Vector3(0, Random.Range (-180, 180), 0);
}

if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * 6000, -transform.up, hit, HeightLimit, targetLayers)){

switch (randomValue27) {
case 2:
BigSpawnDist = 6000;
BigSpawn27();
return;
break;
}

}
}

//[LevNav Eos]===========================================================================================================================
if(TheNPC300 == null && NPC300SpawnChanceIn > 1){

var Spawnionaise300 = Resources.Load("NPCs/LevNavClouter0", GameObject) as GameObject;

var randomValue300 : int = Random.Range(0, NPC300SpawnChanceIn);

if(VelClamp > 1){
transform.eulerAngles.y = savedRotY;
transform.eulerAngles.y += Random.Range (-60, 60);
}else{
transform.eulerAngles = Vector3(0, Random.Range (-180, 180), 0);
}

if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * 3000, -transform.up, hit, HeightLimit, targetLayers)){
if(!hit.collider.name.Contains ("Wa")){

switch (randomValue300) {
case 2:
SpawnPos.transform.localEulerAngles = Vector3(0, Random.Range (70, 110), 0);
TheNPC300 = Instantiate(Spawnionaise300, hit.point + SpawnSource.up * 4, SpawnPos.rotation);
SpawnPos.transform.position = TheNPC300.transform.position;
break;
}
}
}
}

//[LevNav Ithis]===========================================================================================================================
if(TheNPC301 == null && NPC301SpawnChanceIn > 1){

var Spawnionaise301 = Resources.Load("NPCs/LevNav_Ithis", GameObject) as GameObject;

var randomValue301 : int = Random.Range(0, NPC301SpawnChanceIn);

if(VelClamp > 1){
transform.eulerAngles.y = savedRotY;
transform.eulerAngles.y += Random.Range (-60, 60);
}else{
transform.eulerAngles = Vector3(0, Random.Range (-180, 180), 0);
}

if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * 3000, -transform.up, hit, HeightLimit, targetLayers)){

switch (randomValue301) {
case 2:
SpawnPos.transform.localEulerAngles = Vector3(0, Random.Range (70, 110), 0);
TheNPC301 = Instantiate(Spawnionaise301, hit.point + SpawnSource.up * 256, SpawnPos.rotation);
SpawnPos.transform.position = TheNPC301.transform.position;
break;
}

}
}

//[LevNav MAL]===========================================================================================================================
if(TheNPC302 == null && NPC302SpawnChanceIn > 1){

var Spawnionaise302 = Resources.Load("NPCs/LevNavLoucurat0", GameObject) as GameObject;

var randomValue302 : int = Random.Range(0, NPC302SpawnChanceIn);

if(VelClamp > 1){
transform.eulerAngles.y = savedRotY;
transform.eulerAngles.y += Random.Range (-60, 60);
}else{
transform.eulerAngles = Vector3(0, Random.Range (-180, 180), 0);
}

if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * 3000, -transform.up, hit, HeightLimit, targetLayers)){

switch (randomValue302) {
case 2:
SpawnPos.transform.localEulerAngles = Vector3(0, Random.Range (70, 110), 0);
TheNPC302 = Instantiate(Spawnionaise302, hit.point + SpawnSource.up * 8, SpawnPos.rotation);
SpawnPos.transform.position = TheNPC302.transform.position;
break;
}

}
}

//[LevNav Darion]===========================================================================================================================
if(TheNPC303 == null && NPC303SpawnChanceIn > 1){

var randomValue303 : int = Random.Range(0, NPC303SpawnChanceIn);

if(VelClamp > 1){
transform.eulerAngles.y = savedRotY;
transform.eulerAngles.y += Random.Range (-60, 60);
}else{
transform.eulerAngles = Vector3(0, Random.Range (-180, 180), 0);
}

if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * 8000, -transform.up, hit, HeightLimit, targetLayers)){

switch (randomValue303) {
case 2:
BigSpawnDist = 8000;
BigSpawn303();
return;
break;
}

}
}

//[Bothunter]===========================================================================================================================
if(TheNPC310 == null && NPC310SpawnChanceIn > 1){

var Spawnionaise310 = Resources.Load("NPCs/TLF_Bothunter", GameObject) as GameObject;

var randomValue310 : int = Random.Range(0, NPC310SpawnChanceIn);

if(VelClamp > 1){
transform.eulerAngles.y = savedRotY;
transform.eulerAngles.y += Random.Range (-60, 60);
}else{
transform.eulerAngles = Vector3(0, Random.Range (-180, 180), 0);
}

if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * 1800, -transform.up, hit, HeightLimit, targetLayers)){
if(!hit.collider.name.Contains ("Wa")){

switch (randomValue310) {
case 2:
SpawnPos.transform.localEulerAngles = Vector3(0, Random.Range (70, 110), 0);
TheNPC310 = Instantiate(Spawnionaise310, hit.point + SpawnSource.up * 2, SpawnPos.rotation);
SpawnPos.transform.position = TheNPC310.transform.position;
break;
}
}
}
}

//[Valiant]===========================================================================================================================
if(TheNPC31 == null && NPC31SpawnChanceIn > 1){

var randomValue31 : int = Random.Range(0, NPC31SpawnChanceIn);

if(VelClamp > 1){
transform.eulerAngles.y = savedRotY;
transform.eulerAngles.y += Random.Range (-60, 60);
}else{
transform.eulerAngles = Vector3(0, Random.Range (-180, 180), 0);
}

if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * 3000, -transform.up, hit, HeightLimit, targetLayers)){
if(!hit.collider.name.Contains ("Wa")){

switch (randomValue31) {
case 2:
SpawnPos.transform.localEulerAngles = Vector3(0, Random.Range (70, 110), 0);
TheNPC31 = Instantiate(NPC31, hit.point + SpawnSource.up * 4, SpawnPos.rotation);
SpawnPos.transform.position = TheNPC31.transform.position;
break;
}
}
}
}

//[FecarB1]===========================================================================================================================
if(TheNPC32 == null && NPC32SpawnChanceIn > 1){

var randomValue32 : int = Random.Range(0, NPC32SpawnChanceIn);

if(VelClamp > 1){
transform.eulerAngles.y = savedRotY;
transform.eulerAngles.y += Random.Range (-60, 60);
}else{
transform.eulerAngles = Vector3(0, Random.Range (-180, 180), 0);
}

if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * 5000, -transform.up, hit, HeightLimit, targetLayers)){
if(!hit.collider.name.Contains ("Wa")){

switch (randomValue32) {
case 2:
BigSpawnDist = 5000;
BigSpawn32();
return;
break;
}
}
}
}

//[DasNavCruiser]===========================================================================================================================
if(TheNPC33 == null && NPC33SpawnChanceIn > 1){

var randomValue33 : int = Random.Range(0, NPC33SpawnChanceIn);

if(VelClamp > 1){
transform.eulerAngles.y = savedRotY;
transform.eulerAngles.y += Random.Range (-60, 60);
}else{
transform.eulerAngles = Vector3(0, Random.Range (-180, 180), 0);
}

if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * 6000, -transform.up, hit, HeightLimit, targetLayers)){
if(!hit.collider.name.Contains ("Wa")){

switch (randomValue33) {
case 2:
BigSpawnDist = 6000;
BigSpawn33();
return;
break;
}
}
}
}

//[TRN RD-1]===========================================================================================================================
if(TheNPC34 == null && NPC34SpawnChanceIn > 1){

var randomValue34 : int = Random.Range(0, NPC34SpawnChanceIn);

if(VelClamp > 1){
transform.eulerAngles.y = savedRotY;
transform.eulerAngles.y += Random.Range (-60, 60);
}else{
transform.eulerAngles = Vector3(0, Random.Range (-180, 180), 0);
}

if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * 3500, -transform.up, hit, HeightLimit, targetLayers)){
if(!hit.collider.name.Contains ("Wa")){

switch (randomValue34) {
case 2:
BigSpawnDist = 3500;
BigSpawn34();
return;
break;
}
}
}
}

//[TLF Adamant]===========================================================================================================================
if(TheNPC35 == null && NPC35SpawnChanceIn > 1){

var randomValue35 : int = Random.Range(0, NPC35SpawnChanceIn);

if(VelClamp > 1){
transform.eulerAngles.y = savedRotY;
transform.eulerAngles.y += Random.Range (-60, 60);
}else{
transform.eulerAngles = Vector3(0, Random.Range (-180, 180), 0);
}

if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * 6000, -transform.up, hit, HeightLimit, targetLayers)){
if(!hit.collider.name.Contains ("Wa")){

switch (randomValue35) {
case 2:
BigSpawnDist = 6000;
BigSpawn35();
return;
break;
}
}
}
}

//[Fughunter]===========================================================================================================================
if(TheNPC36 == null && NPC36SpawnChanceIn > 1){

var Spawnionaise36 = Resources.Load("NPCs/TLF_Fughunter", GameObject) as GameObject;

var randomValue36 : int = Random.Range(0, NPC36SpawnChanceIn);

if(VelClamp > 1){
transform.eulerAngles.y = savedRotY;
transform.eulerAngles.y += Random.Range (-60, 60);
}else{
transform.eulerAngles = Vector3(0, Random.Range (-180, 180), 0);
}

if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * 1800, -transform.up, hit, HeightLimit, targetLayers)){
if(!hit.collider.name.Contains ("Wa")){

switch (randomValue36) {
case 2:
SpawnPos.transform.localEulerAngles = Vector3(0, Random.Range (70, 110), 0);
TheNPC36 = Instantiate(Spawnionaise36, hit.point + SpawnSource.up * 4, SpawnPos.rotation);
SpawnPos.transform.position = TheNPC36.transform.position;
break;
}
}
}
}

//[TLF LRCM Neutralizer]===========================================================================================================================
if(TheNPC37 == null && NPC37SpawnChanceIn > 1){
if(TerrahyptianNetwork.instance.NukeMarker){

var Spawnionaise37 = Resources.Load("NPCs/TLF_CM1", GameObject) as GameObject;

var randomValue37 : int = Random.Range(0, NPC37SpawnChanceIn);

if(VelClamp > 1){
transform.eulerAngles.y = savedRotY;
transform.eulerAngles.y += Random.Range (-60, 60);
}else{
transform.eulerAngles = Vector3(0, Random.Range (-180, 180), 0);
}

if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * 6000, -transform.up, hit, HeightLimit, targetLayers)){
if(!hit.collider.name.Contains ("Wa")){

switch (randomValue37) {
case 2:
SpawnPos.transform.localEulerAngles = Vector3(0, Random.Range (70, 110), 0);
TheNPC37 = Instantiate(Spawnionaise37, hit.point + SpawnSource.up * 64, SpawnPos.rotation);
SpawnPos.transform.position = TheNPC37.transform.position;
break;
}
}
}
}
}

//[TRN Zerana]===========================================================================================================================
if(TheNPC39 == null && NPC39SpawnChanceIn > 1 && !NPC39Once){

var randomValue39 : int = Random.Range(0, NPC39SpawnChanceIn);
var randomPos39 : int = Random.Range(1, 8);

switch (randomValue39) {
case 2:

var Spawnionaise39 = Resources.Load("NPCs/TRNZerana", GameObject) as GameObject;

switch (randomPos39) {
case 1:

SpawnPos.transform.localEulerAngles = Vector3(0, Random.Range (-180, 180), 0);
TheNPC39 = Instantiate(Spawnionaise39, HugeSpawnPos1.position, SpawnPos.rotation);
break;
}
switch (randomPos39) {
case 2:

SpawnPos.transform.localEulerAngles = Vector3(0, Random.Range (-180, 180), 0);
TheNPC39 = Instantiate(Spawnionaise39, HugeSpawnPos2.position, SpawnPos.rotation);
break;
}
switch (randomPos39) {
case 3:

SpawnPos.transform.localEulerAngles = Vector3(0, Random.Range (-180, 180), 0);
TheNPC39 = Instantiate(Spawnionaise39, HugeSpawnPos3.position, SpawnPos.rotation);
break;
}
switch (randomPos39) {
case 4:

SpawnPos.transform.localEulerAngles = Vector3(0, Random.Range (-180, 180), 0);
TheNPC39 = Instantiate(Spawnionaise39, HugeSpawnPos4.position, SpawnPos.rotation);
break;
}
switch (randomPos39) {
case 5:

SpawnPos.transform.localEulerAngles = Vector3(0, Random.Range (-180, 180), 0);
TheNPC39 = Instantiate(Spawnionaise39, HugeSpawnPos5.position, SpawnPos.rotation);
break;
}
switch (randomPos39) {
case 6:

SpawnPos.transform.localEulerAngles = Vector3(0, Random.Range (-180, 180), 0);
TheNPC39 = Instantiate(Spawnionaise39, HugeSpawnPos6.position, SpawnPos.rotation);
break;
}
switch (randomPos39) {
case 7:

SpawnPos.transform.localEulerAngles = Vector3(0, Random.Range (-180, 180), 0);
TheNPC39 = Instantiate(Spawnionaise39, HugeSpawnPos7.position, SpawnPos.rotation);
break;
}
switch (randomPos39) {
case 8:

SpawnPos.transform.localEulerAngles = Vector3(0, Random.Range (-180, 180), 0);
TheNPC39 = Instantiate(Spawnionaise39, HugeSpawnPos8.position, SpawnPos.rotation);
break;
}
break;
}

NPC39Once = true;

}

//[Abettor]===========================================================================================================================
if(NPC40SpawnChanceIn > 1){

var randomValue40 : int = Random.Range(0, NPC40SpawnChanceIn);

if(VelClamp > 1){
transform.eulerAngles.y = savedRotY;
transform.eulerAngles.y += Random.Range (-60, 60);
}else{
transform.eulerAngles = Vector3(0, Random.Range (-180, 180), 0);
}

if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * 500, -transform.up, hit, HeightLimit, targetLayers)){
if(!hit.collider.name.Contains ("Wa")){

switch (randomValue40) {
case 2:
SpawnPos.transform.localEulerAngles = Vector3(0, Random.Range (70, 110), 0);
TheNPC40 = Instantiate(NPC40, hit.point + SpawnSource.up * 2, AltRot.rotation);
SpawnPos.transform.position = TheNPC40.transform.position;
break;
}
}
}
}

//[Gunner]===========================================================================================================================
if(NPC41SpawnChanceIn > 1){

var randomValue41 : int = Random.Range(0, NPC41SpawnChanceIn);

if(VelClamp > 1){
transform.eulerAngles.y = savedRotY;
transform.eulerAngles.y += Random.Range (-60, 60);
}else{
transform.eulerAngles = Vector3(0, Random.Range (-180, 180), 0);
}

if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * 1800, -transform.up, hit, HeightLimit, targetLayers)){
if(!hit.collider.name.Contains ("Wa")){

switch (randomValue41) {
case 2:
SpawnPos.transform.localEulerAngles = Vector3(0, Random.Range (70, 110), 0);
TheNPC41 = Instantiate(NPC41, hit.point + SpawnSource.up * 2, SpawnPos.rotation);
SpawnPos.transform.position = TheNPC41.transform.position;
break;
}
}
}
}

//[Militant]===========================================================================================================================
if(NPC42SpawnChanceIn > 1){

var randomValue42 : int = Random.Range(0, NPC42SpawnChanceIn);

if(VelClamp > 1){
transform.eulerAngles.y = savedRotY;
transform.eulerAngles.y += Random.Range (-60, 60);
}else{
transform.eulerAngles = Vector3(0, Random.Range (-180, 180), 0);
}

if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * 1800, -transform.up, hit, HeightLimit, targetLayers)){
if(!hit.collider.name.Contains ("Wa")){

switch (randomValue42) {
case 2:
SpawnPos.transform.localEulerAngles = Vector3(0, Random.Range (70, 110), 0);
TheNPC42 = Instantiate(NPC42, hit.point + SpawnSource.up * 2, SpawnPos.rotation);
SpawnPos.transform.position = TheNPC42.transform.position;
break;
}
}
}
}

//[Marauder]===========================================================================================================================
if(TheNPC43 == null && NPC43SpawnChanceIn > 1){

var randomValue43 : int = Random.Range(0, NPC43SpawnChanceIn);

if(VelClamp > 1){
transform.eulerAngles.y = savedRotY;
transform.eulerAngles.y += Random.Range (-60, 60);
}else{
transform.eulerAngles = Vector3(0, Random.Range (-180, 180), 0);
}

if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * 4000, -transform.up, hit, HeightLimit, targetLayers)){
if(!hit.collider.name.Contains ("Wa")){

switch (randomValue43) {
case 2:
BigSpawnDist = 4000;
BigSpawn43();
return;
break;
}
}
}
}

//[Mercenary]===========================================================================================================================
if(TheNPC44 == null && NPC44SpawnChanceIn > 1){

var randomValue44 : int = Random.Range(0, NPC44SpawnChanceIn);

if(VelClamp > 1){
transform.eulerAngles.y = savedRotY;
transform.eulerAngles.y += Random.Range (-60, 60);
}else{
transform.eulerAngles = Vector3(0, Random.Range (-180, 180), 0);
}

if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * 4000, -transform.up, hit, HeightLimit, targetLayers)){
if(!hit.collider.name.Contains ("Wa")){

switch (randomValue44) {
case 2:
BigSpawnDist = 4000;
BigSpawn44();
return;
break;
}
}
}
}

//[Cruiser]===========================================================================================================================
if(TheNPC45 == null && NPC45SpawnChanceIn > 1){

var randomValue45 : int = Random.Range(0, NPC45SpawnChanceIn);

if(VelClamp > 1){
transform.eulerAngles.y = savedRotY;
transform.eulerAngles.y += Random.Range (-60, 60);
}else{
transform.eulerAngles = Vector3(0, Random.Range (-180, 180), 0);
}

if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * 4000, -transform.up, hit, HeightLimit, targetLayers)){
if(!hit.collider.name.Contains ("Wa")){

switch (randomValue45) {
case 2:
BigSpawnDist = 4000;
BigSpawn45();
return;
break;
}
}
}
}

//[Civilian]===========================================================================================================================
if(TheNPC50 == null && NPC50SpawnChanceIn > 1){

var randomValue50 : int = Random.Range(0, NPC50SpawnChanceIn);

if(VelClamp > 1){
transform.eulerAngles.y = savedRotY;
transform.eulerAngles.y += Random.Range (-60, 60);
}else{
transform.eulerAngles = Vector3(0, Random.Range (-180, 180), 0);
}

if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * 1800, -transform.up, hit, HeightLimit, targetLayers)){
if(!hit.collider.name.Contains ("Wa")){

switch (randomValue50) {
case 2:
SpawnPos.transform.localEulerAngles = Vector3(0, Random.Range (70, 110), 0);
TheNPC50 = Instantiate(NPC50, hit.point + SpawnSource.up * 2, SpawnPos.rotation);
SpawnPos.transform.position = TheNPC50.transform.position;
break;
}
}
}
}

//[Watchmen]===========================================================================================================================
if(TheNPC51 == null && NPC51SpawnChanceIn > 1){

var randomValue51 : int = Random.Range(0, NPC51SpawnChanceIn);

if(VelClamp > 1){
transform.eulerAngles.y = savedRotY;
transform.eulerAngles.y += Random.Range (-60, 60);
}else{
transform.eulerAngles = Vector3(0, Random.Range (-180, 180), 0);
}

if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * 1800, -transform.up, hit, HeightLimit, targetLayers)){
if(!hit.collider.name.Contains ("Wa")){

switch (randomValue51) {
case 2:
SpawnPos.transform.localEulerAngles = Vector3(0, Random.Range (70, 110), 0);
TheNPC51 = Instantiate(NPC51, hit.point + SpawnSource.up * 2, SpawnPos.rotation);
SpawnPos.transform.position = TheNPC51.transform.position;
break;
}
}
}
}

//[Mistitor]===========================================================================================================================
if(TheNPC52 == null && NPC52SpawnChanceIn > 1){

var randomValue52 : int = Random.Range(0, NPC52SpawnChanceIn);

if(VelClamp > 1){
transform.eulerAngles.y = savedRotY;
transform.eulerAngles.y += Random.Range (-60, 60);
}else{
transform.eulerAngles = Vector3(0, Random.Range (-180, 180), 0);
}

if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * 2500, -transform.up, hit, HeightLimit, targetLayers)){
if(!hit.collider.name.Contains ("Wa")){

switch (randomValue52) {
case 2:
SpawnPos.transform.localEulerAngles = Vector3(0, Random.Range (70, 110), 0);
TheNPC52 = Instantiate(NPC52, hit.point + SpawnSource.up * 3, SpawnPos.rotation);
SpawnPos.transform.position = TheNPC52.transform.position;
break;
}
}
}
}

//[Civilian2]===========================================================================================================================
if(TheNPC53 == null && NPC53SpawnChanceIn > 1){

var randomValue53 : int = Random.Range(0, NPC53SpawnChanceIn);

if(VelClamp > 1){
transform.eulerAngles.y = savedRotY;
transform.eulerAngles.y += Random.Range (-60, 60);
}else{
transform.eulerAngles = Vector3(0, Random.Range (-180, 180), 0);
}

if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * 1800, -transform.up, hit, HeightLimit, targetLayers)){
if(!hit.collider.name.Contains ("Wa")){

switch (randomValue53) {
case 2:
SpawnPos.transform.localEulerAngles = Vector3(0, Random.Range (70, 110), 0);
TheNPC53 = Instantiate(NPC53, hit.point + SpawnSource.up * 2, SpawnPos.rotation);
SpawnPos.transform.position = TheNPC53.transform.position;
break;
}
}
}
}

//[Snositor]===========================================================================================================================
if(TheNPC54 == null && NPC54SpawnChanceIn > 1){

var Spawnionaise54 = Resources.Load("NPCs/SlavuicSnositor", GameObject) as GameObject;

var randomValue54 : int = Random.Range(0, NPC54SpawnChanceIn);

if(VelClamp > 1){
transform.eulerAngles.y = savedRotY;
transform.eulerAngles.y += Random.Range (-60, 60);
}else{
transform.eulerAngles = Vector3(0, Random.Range (-180, 180), 0);
}

if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * 2500, -transform.up, hit, HeightLimit, targetLayers)){
if(!hit.collider.name.Contains ("Wa")){

switch (randomValue54) {
case 2:
SpawnPos.transform.localEulerAngles = Vector3(0, Random.Range (70, 110), 0);
TheNPC54 = Instantiate(Spawnionaise54, hit.point + SpawnSource.up * 3, SpawnPos.rotation);
SpawnPos.transform.position = TheNPC54.transform.position;
break;
}
}
}
}

//[Vanguard]===========================================================================================================================
if(TheNPC55 == null && NPC55SpawnChanceIn > 1){

var Spawnionaise55 = Resources.Load("NPCs/SlavuicVanguard", GameObject) as GameObject;

var randomValue55 : int = Random.Range(0, NPC55SpawnChanceIn);

if(VelClamp > 1){
transform.eulerAngles.y = savedRotY;
transform.eulerAngles.y += Random.Range (-60, 60);
}else{
transform.eulerAngles = Vector3(0, Random.Range (-180, 180), 0);
}

if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * 1800, -transform.up, hit, HeightLimit, targetLayers)){
if(!hit.collider.name.Contains ("Wa")){

switch (randomValue55) {
case 2:
SpawnPos.transform.localEulerAngles = Vector3(0, Random.Range (70, 110), 0);
TheNPC55 = Instantiate(Spawnionaise55, hit.point + SpawnSource.up * 2, SpawnPos.rotation);
SpawnPos.transform.position = TheNPC55.transform.position;
break;
}
}
}
}

//[Smertnik]===========================================================================================================================
if(!MovingFast && IsInPerson){
if(TheNPC56 == null && NPC56SpawnChanceIn > 1){

var Spawnionaise56 = Resources.Load("NPCs/SlavuicSmertnik", GameObject) as GameObject;

var randomValue56 : int = Random.Range(0, NPC56SpawnChanceIn);

if(VelClamp > 1){
transform.eulerAngles.y = savedRotY;
transform.eulerAngles.y += Random.Range (-60, 60);
}else{
transform.eulerAngles = Vector3(0, Random.Range (-180, 180), 0);
}

//MaxSpawnDist = 330;
//MaxSpawnDist = 100;

if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * Random.Range (25, 330), -transform.up, hit, HeightLimit, targetLayers)){
if(!hit.collider.name.Contains ("Wa")){

var CHP56 : Vector3 = hit.point + SpawnSource.up * 2;

if(Vector3.Distance(CHP56, PiriView.position) < 300)
if(!Physics.Linecast (CHP56, PiriView.position, targetLayers)){
NPC56SpawnChanceIn = 3;
return;
}

switch (randomValue56) {
case 2:
SpawnPos.transform.localEulerAngles = Vector3(0, Random.Range (70, 110), 0);
TheNPC56 = Instantiate(Spawnionaise56, hit.point + SpawnSource.up * 2, SpawnPos.rotation);
SpawnPos.transform.position = TheNPC56.transform.position;
NPC56SpawnChanceIn = NPC56StaticSpawnChanceIn;
break;
}
}
}else{
NPC56SpawnChanceIn = 3;
}
}
}

//[Satnik]===========================================================================================================================
if(TheNPC57 == null && NPC57SpawnChanceIn > 1){

var Spawnionaise57 = Resources.Load("NPCs/SlavuicSatnik", GameObject) as GameObject;

var randomValue57 : int = Random.Range(0, NPC57SpawnChanceIn);

if(VelClamp > 1){
transform.eulerAngles.y = savedRotY;
transform.eulerAngles.y += Random.Range (-60, 60);
}else{
transform.eulerAngles = Vector3(0, Random.Range (-180, 180), 0);
}

if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * 5000, -transform.up, hit, HeightLimit, targetLayers)){

switch (randomValue57) {
case 2:
SpawnPos.transform.localEulerAngles = Vector3(0, Random.Range (70, 110), 0);
TheNPC57 = Instantiate(Spawnionaise57, hit.point + SpawnSource.up * 500, SpawnPos.rotation);
SpawnPos.transform.position = TheNPC57.transform.position;
break;
}

}
}

//[Van]===========================================================================================================================
if(TheNPC60 == null && NPC60SpawnChanceIn > 1){

var randomValue60 : int = Random.Range(0, NPC60SpawnChanceIn);

if(VelClamp > 1){
transform.eulerAngles.y = savedRotY;
transform.eulerAngles.y += Random.Range (-60, 60);
}else{
transform.eulerAngles = Vector3(0, Random.Range (-180, 180), 0);
}

if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * 1800, -transform.up, hit, HeightLimit, targetLayers)){
if(!hit.collider.name.Contains ("Wa") && !hit.collider.name.Contains ("T5")){

switch (randomValue60) {
case 2:
SpawnPos.transform.localEulerAngles = Vector3(0, Random.Range (70, 110), 0);
TheNPC60 = Instantiate(NPC60, hit.point + SpawnSource.up * 2, SpawnPos.rotation);
SpawnPos.transform.position = TheNPC60.transform.position;
break;
}
}
}
}

//[Guncarrier]===========================================================================================================================
if(TheNPC61 == null && NPC61SpawnChanceIn > 1){

var randomValue61 : int = Random.Range(0, NPC61SpawnChanceIn);

if(VelClamp > 1){
transform.eulerAngles.y = savedRotY;
transform.eulerAngles.y += Random.Range (-60, 60);
}else{
transform.eulerAngles = Vector3(0, Random.Range (-180, 180), 0);
}

if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * 1800, -transform.up, hit, HeightLimit, targetLayers)){
if(!hit.collider.name.Contains ("Wa") && !hit.collider.name.Contains ("T5")){

switch (randomValue61) {
case 2:
SpawnPos.transform.localEulerAngles = Vector3(0, Random.Range (70, 110), 0);
TheNPC61 = Instantiate(NPC61, hit.point + SpawnSource.up * 2, SpawnPos.rotation);
SpawnPos.transform.position = TheNPC61.transform.position;
break;
}
}
}
}

//[Bejsirf]===========================================================================================================================
if(TheNPC62 == null && NPC62SpawnChanceIn > 1){

var randomValue62 : int = Random.Range(0, NPC62SpawnChanceIn);

if(VelClamp > 1){
transform.eulerAngles.y = savedRotY;
transform.eulerAngles.y += Random.Range (-60, 60);
}else{
transform.eulerAngles = Vector3(0, Random.Range (-180, 180), 0);
}

if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * 1800, -transform.up, hit, HeightLimit, targetLayers)){
if(!hit.collider.name.Contains ("Wa") && !hit.collider.name.Contains ("T5")){

switch (randomValue62) {
case 2:
SpawnPos.transform.localEulerAngles = Vector3(0, Random.Range (70, 110), 0);
TheNPC62 = Instantiate(NPC62, hit.point + SpawnSource.up * 2, SpawnPos.rotation);
SpawnPos.transform.position = TheNPC62.transform.position;
break;
}
}
}
}

//[Microcruiser]===========================================================================================================================
if(TheNPC63 == null && NPC63SpawnChanceIn > 1){

var randomValue63 : int = Random.Range(0, NPC63SpawnChanceIn);

if(VelClamp > 1){
transform.eulerAngles.y = savedRotY;
transform.eulerAngles.y += Random.Range (-60, 60);
}else{
transform.eulerAngles = Vector3(0, Random.Range (-180, 180), 0);
}

if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * 6000, -transform.up, hit, HeightLimit, targetLayers)){
if(!hit.collider.name.Contains ("Wa") && !hit.collider.name.Contains ("T5")){

switch (randomValue63) {
case 2:
BigSpawnDist = 6000;
BigSpawn63();
return;
break;
}
}
}
}

//[Sprite]===========================================================================================================================
if(TheNPC70 == null && NPC70SpawnChanceIn > 1){

var randomValue70 : int = Random.Range(0, NPC70SpawnChanceIn);

if(VelClamp > 1){
transform.eulerAngles.y = savedRotY;
transform.eulerAngles.y += Random.Range (-60, 60);
}else{
transform.eulerAngles = Vector3(0, Random.Range (-180, 180), 0);
}

if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * 1000, -transform.up, hit, HeightLimit, targetLayers)){
if(!hit.collider.name.Contains ("Wa")){

switch (randomValue70) {
case 2:
SpawnPos.transform.localEulerAngles = Vector3(0, Random.Range (70, 110), 0);
TheNPC70 = Instantiate(NPC70, hit.point + SpawnSource.up * 8, SpawnPos.rotation);
SpawnPos.transform.position = TheNPC70.transform.position;
break;
}
}
}
}

//[Battle Drone]===========================================================================================================================
if(TheNPC71 == null && NPC71SpawnChanceIn > 1){

var randomValue71 : int = Random.Range(0, NPC71SpawnChanceIn);

if(VelClamp > 1){
transform.eulerAngles.y = savedRotY;
transform.eulerAngles.y += Random.Range (-60, 60);
}else{
transform.eulerAngles = Vector3(0, Random.Range (-180, 180), 0);
}

if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * 1300, -transform.up, hit, HeightLimit, targetLayers)){
if(!hit.collider.name.Contains ("Wa") && !hit.collider.name.Contains ("T5")){

switch (randomValue71) {
case 2:
SpawnPos.transform.localEulerAngles = Vector3(0, Random.Range (70, 110), 0);
TheNPC71 = Instantiate(NPC71, hit.point + SpawnSource.up * 2, SpawnPos.rotation);
SpawnPos.transform.position = TheNPC71.transform.position;
break;
}
}
}
}

//[Cannon Drone]===========================================================================================================================
if(TheNPC72 == null && NPC72SpawnChanceIn > 1){

var randomValue72 : int = Random.Range(0, NPC72SpawnChanceIn);

if(VelClamp > 1){
transform.eulerAngles.y = savedRotY;
transform.eulerAngles.y += Random.Range (-60, 60);
}else{
transform.eulerAngles = Vector3(0, Random.Range (-180, 180), 0);
}

if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * 1300, -transform.up, hit, HeightLimit, targetLayers)){
if(!hit.collider.name.Contains ("Wa") && !hit.collider.name.Contains ("T5")){

switch (randomValue72) {
case 2:
SpawnPos.transform.localEulerAngles = Vector3(0, Random.Range (70, 110), 0);
TheNPC72 = Instantiate(NPC72, hit.point + SpawnSource.up * 2, SpawnPos.rotation);
SpawnPos.transform.position = TheNPC72.transform.position;
break;
}
}
}
}

//[Squire]===========================================================================================================================
if(TheNPC73 == null && NPC73SpawnChanceIn > 1){

var randomValue73 : int = Random.Range(0, NPC73SpawnChanceIn);

if(VelClamp > 1){
transform.eulerAngles.y = savedRotY;
transform.eulerAngles.y += Random.Range (-60, 60);
}else{
transform.eulerAngles = Vector3(0, Random.Range (-180, 180), 0);
}

if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * 1800, -transform.up, hit, HeightLimit, targetLayers)){
if(!hit.collider.name.Contains ("Wa") && !hit.collider.name.Contains ("T5")){

switch (randomValue73) {
case 2:
SpawnPos.transform.localEulerAngles = Vector3(0, Random.Range (70, 110), 0);
TheNPC73 = Instantiate(NPC73, hit.point + SpawnSource.up * 2, SpawnPos.rotation);
SpawnPos.transform.position = TheNPC73.transform.position;
break;
}
}
}
}

//[Archer]===========================================================================================================================
if(TheNPC74 == null && NPC74SpawnChanceIn > 1){

var randomValue74 : int = Random.Range(0, NPC74SpawnChanceIn);

if(VelClamp > 1){
transform.eulerAngles.y = savedRotY;
transform.eulerAngles.y += Random.Range (-60, 60);
}else{
transform.eulerAngles = Vector3(0, Random.Range (-180, 180), 0);
}

if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * 1800, -transform.up, hit, HeightLimit, targetLayers)){
if(!hit.collider.name.Contains ("Wa") && !hit.collider.name.Contains ("T5")){

switch (randomValue74) {
case 2:
SpawnPos.transform.localEulerAngles = Vector3(0, Random.Range (70, 110), 0);
TheNPC74 = Instantiate(NPC74, hit.point + SpawnSource.up * 2, SpawnPos.rotation);
SpawnPos.transform.position = TheNPC74.transform.position;
break;
}
}
}
}

//[Scabbard]===========================================================================================================================
if(TheNPC75 == null && NPC75SpawnChanceIn > 1){

var randomValue75 : int = Random.Range(0, NPC75SpawnChanceIn);

if(VelClamp > 1){
transform.eulerAngles.y = savedRotY;
transform.eulerAngles.y += Random.Range (-60, 60);
}else{
transform.eulerAngles = Vector3(0, Random.Range (-180, 180), 0);
}

if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * 1800, -transform.up, hit, HeightLimit, targetLayers)){
if(!hit.collider.name.Contains ("Wa") && !hit.collider.name.Contains ("T5")){

switch (randomValue75) {
case 2:
SpawnPos.transform.localEulerAngles = Vector3(0, Random.Range (70, 110), 0);
TheNPC75 = Instantiate(NPC75, hit.point + SpawnSource.up * 2, SpawnPos.rotation);
SpawnPos.transform.position = TheNPC75.transform.position;
break;
}
}
}
}

//[Warmonger]===========================================================================================================================
if(TheNPC76 == null && NPC76SpawnChanceIn > 1){

var randomValue76 : int = Random.Range(0, NPC76SpawnChanceIn);

if(VelClamp > 1){
transform.eulerAngles.y = savedRotY;
transform.eulerAngles.y += Random.Range (-60, 60);
}else{
transform.eulerAngles = Vector3(0, Random.Range (-180, 180), 0);
}

if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * 3200, -transform.up, hit, HeightLimit, targetLayers)){
if(!hit.collider.name.Contains ("Wa") && !hit.collider.name.Contains ("T5")){

switch (randomValue76) {
case 2:
SpawnPos.transform.localEulerAngles = Vector3(0, Random.Range (70, 110), 0);
TheNPC76 = Instantiate(NPC76, hit.point + SpawnSource.up * 4, SpawnPos.rotation);
SpawnPos.transform.position = TheNPC76.transform.position;
break;
}
}
}
}

//[Knight]===========================================================================================================================
if(TheNPC77 == null && NPC77SpawnChanceIn > 1){

var randomValue77 : int = Random.Range(0, NPC77SpawnChanceIn);

if(VelClamp > 1){
transform.eulerAngles.y = savedRotY;
transform.eulerAngles.y += Random.Range (-60, 60);
}else{
transform.eulerAngles = Vector3(0, Random.Range (-180, 180), 0);
}

if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * 4000, -transform.up, hit, HeightLimit, targetLayers)){
if(!hit.collider.name.Contains ("Wa") && !hit.collider.name.Contains ("T5")){

switch (randomValue77) {
case 2:
BigSpawnDist = 4000;
BigSpawn77();
return;
break;
}
}
}
}

//[Deus]===========================================================================================================================
if(TheNPC78 == null && NPC78SpawnChanceIn > 1){

var randomValue78 : int = Random.Range(0, NPC78SpawnChanceIn);

if(VelClamp > 1){
transform.eulerAngles.y = savedRotY;
transform.eulerAngles.y += Random.Range (-60, 60);
}else{
transform.eulerAngles = Vector3(0, Random.Range (-180, 180), 0);
}

if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * 8000, -transform.up, hit, HeightLimit, targetLayers)){
if(!hit.collider.name.Contains ("Wa") && !hit.collider.name.Contains ("T5")){

switch (randomValue78) {
case 2:
BigSpawnDist = 8000;
BigSpawn78();
return;
break;
}
}
}
}

//[Eschatos]===========================================================================================================================
if(TheNPC79 == null && NPC79SpawnChanceIn > 1){

var randomValue79 : int = Random.Range(0, NPC79SpawnChanceIn);

if(VelClamp > 1){
transform.eulerAngles.y = savedRotY;
transform.eulerAngles.y += Random.Range (-60, 60);
}else{
transform.eulerAngles = Vector3(0, Random.Range (-180, 180), 0);
}

if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * 16000, -transform.up, hit, HeightLimit, targetLayers)){
if(!hit.collider.name.Contains ("Wa") && !hit.collider.name.Contains ("T5")){

switch (randomValue79) {
case 2:
BigSpawnDist = 16000;
BigSpawn79();
return;
break;
}
}
}
}

//[Dutvutanian Civilian 1]===========================================================================================================================
if(TheNPC90 == null && NPC90SpawnChanceIn > 1){

var Spawnionaise90 = Resources.Load("NPCs/DutvutanianCivilian1", GameObject) as GameObject;

var randomValue90 : int = Random.Range(0, NPC90SpawnChanceIn);

if(VelClamp > 1){
transform.eulerAngles.y = savedRotY;
transform.eulerAngles.y += Random.Range (-60, 60);
}else{
transform.eulerAngles = Vector3(0, Random.Range (-180, 180), 0);
}

if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * 4500, -transform.up, hit, HeightLimit, targetLayers)){

switch (randomValue90) {
case 2:
SpawnPos.transform.localEulerAngles = Vector3(0, Random.Range (70, 110), 0);
TheNPC90 = Instantiate(Spawnionaise90, hit.point + SpawnSource.up * Random.Range (100, 400), SpawnPos.rotation);
SpawnPos.transform.position = TheNPC90.transform.position;
break;
}
}
}

//[Dutvutanian Civilian 2]===========================================================================================================================
if(TheNPC91 == null && NPC91SpawnChanceIn > 1){

var Spawnionaise91 = Resources.Load("NPCs/DutvutanianCivilian2", GameObject) as GameObject;

var randomValue91 : int = Random.Range(0, NPC91SpawnChanceIn);

if(VelClamp > 1){
transform.eulerAngles.y = savedRotY;
transform.eulerAngles.y += Random.Range (-60, 60);
}else{
transform.eulerAngles = Vector3(0, Random.Range (-180, 180), 0);
}

if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * 4500, -transform.up, hit, HeightLimit, targetLayers)){

switch (randomValue91) {
case 2:
SpawnPos.transform.localEulerAngles = Vector3(0, Random.Range (70, 110), 0);
TheNPC91 = Instantiate(Spawnionaise91, hit.point + SpawnSource.up * Random.Range (100, 400), SpawnPos.rotation);
SpawnPos.transform.position = TheNPC91.transform.position;
break;
}
}
}

//[Dutvutanian Civilian 3]===========================================================================================================================
if(TheNPC92 == null && NPC92SpawnChanceIn > 1){

var Spawnionaise92 = Resources.Load("NPCs/DutvutanianCivilian3", GameObject) as GameObject;

var randomValue92 : int = Random.Range(0, NPC92SpawnChanceIn);

if(VelClamp > 1){
transform.eulerAngles.y = savedRotY;
transform.eulerAngles.y += Random.Range (-60, 60);
}else{
transform.eulerAngles = Vector3(0, Random.Range (-180, 180), 0);
}

if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * 4500, -transform.up, hit, HeightLimit, targetLayers)){

switch (randomValue92) {
case 2:
SpawnPos.transform.localEulerAngles = Vector3(0, Random.Range (70, 110), 0);
TheNPC92 = Instantiate(Spawnionaise92, hit.point + SpawnSource.up * Random.Range (100, 400), SpawnPos.rotation);
SpawnPos.transform.position = TheNPC92.transform.position;
break;
}
}
}

//[Dutvutanian Intel Ship 1]===========================================================================================================================
if(TheNPC93 == null && NPC93SpawnChanceIn > 1){

var Spawnionaise93 = Resources.Load("NPCs/DutvutanianIntelShip1", GameObject) as GameObject;

var randomValue93 : int = Random.Range(0, NPC93SpawnChanceIn);

if(VelClamp > 1){
transform.eulerAngles.y = savedRotY;
transform.eulerAngles.y += Random.Range (-60, 60);
}else{
transform.eulerAngles = Vector3(0, Random.Range (-180, 180), 0);
}

if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * 1500, -transform.up, hit, HeightLimit, targetLayers)){

switch (randomValue93) {
case 2:
SpawnPos.transform.localEulerAngles = Vector3(0, Random.Range (70, 110), 0);
TheNPC93 = Instantiate(Spawnionaise93, hit.point + SpawnSource.up * 4, SpawnPos.rotation);
SpawnPos.transform.position = TheNPC93.transform.position;
break;
}
}
}

//[Dutvutanian Police 1]===========================================================================================================================
if(TheNPC94 == null && NPC94SpawnChanceIn > 1){

var Spawnionaise94 = Resources.Load("NPCs/DutvutanianPolice1", GameObject) as GameObject;

var randomValue94 : int = Random.Range(0, NPC94SpawnChanceIn);

if(VelClamp > 1){
transform.eulerAngles.y = savedRotY;
transform.eulerAngles.y += Random.Range (-60, 60);
}else{
transform.eulerAngles = Vector3(0, Random.Range (-180, 180), 0);
}

if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * 4000, -transform.up, hit, HeightLimit, targetLayers)){

switch (randomValue94) {
case 2:
SpawnPos.transform.localEulerAngles = Vector3(0, Random.Range (70, 110), 0);
TheNPC94 = Instantiate(Spawnionaise94, hit.point + SpawnSource.up * 4, SpawnPos.rotation);
SpawnPos.transform.position = TheNPC94.transform.position;
break;
}
}
}

//[Dutvutanian Obmurat 1]===========================================================================================================================
if(TheNPC95 == null && NPC95SpawnChanceIn > 1){

var randomValue95 : int = Random.Range(0, NPC95SpawnChanceIn);

if(VelClamp > 1){
transform.eulerAngles.y = savedRotY;
transform.eulerAngles.y += Random.Range (-60, 60);
}else{
transform.eulerAngles = Vector3(0, Random.Range (-180, 180), 0);
}

if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * 16000, -transform.up, hit, HeightLimit, targetLayers)){

switch (randomValue95) {
case 2:
BigSpawnDist = 16000;
BigSpawn95();
return;
break;
}
}else{
switch (randomValue95) {
case 2:
BigSpawnDist = 16000;
BigSpawn95();
return;
break;
}
}
}

//[Dust Devils]===========================================================================================================================
if(PH0SpawnChanceIn > 1)
if(Thing5){

var randomValue5 : int = Random.Range(0, 512);

if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * Random.Range(-100, 3000), -transform.up, hit, HeightLimit, targetLayers)){
if(!hit.collider.tag.Contains ("tru") && !hit.collider.name.Contains ("Wa")){

switch (randomValue5) {
case 2:
Instantiate(Thing5, hit.point + SpawnSource.up * 2, SpawnSource.rotation);
break;
case 3:
Instantiate(Thing6, hit.point + SpawnSource.up * 2, SpawnSource.rotation);
break;
}
}
}
}

//[Agrian Vigil]===========================================================================================================================
if(TheAgrianVigil == null && AgrianVigil){

var randomValue3 : int = Random.Range(0, 64);

if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * -250, -transform.up, hit, HeightLimit, targetLayers)){
if(!hit.collider.name.Contains ("Wa")){

		    switch (randomValue3) {
    		case 2:
    		TheAgrianVigil = Instantiate(AgrianVigil, hit.point + SpawnSource.up * 5, transform.rotation);
    		break;
    		}
    		}
}
}

//[Pages Gobnard]===========================================================================================================================
if(P0SpawnChanceIn > 1){

var SpawnionaiseP0 = Resources.Load("Objects/PageGobnard", GameObject) as GameObject;

var randomValueP0 : int = Random.Range(0, P0SpawnChanceIn);

if(VelClamp > 1){
transform.eulerAngles.y = savedRotY;
transform.eulerAngles.y += Random.Range (-60, 60);
}else{
transform.eulerAngles = Vector3(0, Random.Range (-180, 180), 0);
}

if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * 200, -transform.up, hit, HeightLimit, targetLayers)){
if(!hit.collider.name.Contains ("Wa")){

switch (randomValueP0) {
case 2:
SpawnPos.transform.localEulerAngles = Vector3(-90, 0, 0);
TheP0 = Instantiate(SpawnionaiseP0, hit.point + SpawnSource.up * Random.Range (0.2, 8), SpawnPos.rotation);
SpawnPos.transform.position = TheP0.transform.position;
break;
}
}
}
}

//[Swirls]===========================================================================================================================
var randomValue1 : int = Random.Range(0, 128);

if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * -100, -transform.up, hit, HeightLimit, targetLayers)){
if(!hit.collider.name.Contains ("Wa")){

		    switch (randomValue1) {
    		case 2:
    		Instantiate(Thing1, hit.point, Thing1.transform.rotation);
    		break;
    		case 3:
    		Instantiate(Thing2, hit.point, Thing2.transform.rotation);
    		break;
    		case 4:
    		Instantiate(Thing3, hit.point, Thing3.transform.rotation);
    		break;
    		}
    		}
}
}
}

function BigSpawn22(){

SpawningBig = true;
Obscured = false;

yield WaitForSeconds (6);

var hit2 : RaycastHit;

var Spawnionaise22 = Resources.Load("NPCs/AgrianAgent", GameObject) as GameObject;

if(!Obscured){
if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * BigSpawnDist, -transform.up, hit2, HeightLimit, targetLayers)){

SpawnPos.transform.localEulerAngles = Vector3(0, Random.Range (70, 110), 0);
TheNPC22 = Instantiate(Spawnionaise22, hit2.point + SpawnSource.up * 64, SpawnPos.rotation);
SpawnPos.transform.position = TheNPC22.transform.position;
SpawningBig = false;
Obscured = false;
}

}else{
SpawningBig = false;
Obscured = false;
}

}

function BigSpawn23(){

SpawningBig = true;
Obscured = false;

yield WaitForSeconds (6);

var hit2 : RaycastHit;

var Spawnionaise23 = Resources.Load("NPCs/AgrianExecutor", GameObject) as GameObject;

if(!Obscured){
if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * BigSpawnDist, -transform.up, hit2, HeightLimit, targetLayers)){

SpawnPos.transform.localEulerAngles = Vector3(0, Random.Range (70, 110), 0);
TheNPC23 = Instantiate(Spawnionaise23, hit2.point + SpawnSource.up * 64, SpawnPos.rotation);
SpawnPos.transform.position = TheNPC23.transform.position;
SpawningBig = false;
Obscured = false;
}

}else{
SpawningBig = false;
Obscured = false;
}

}

function BigSpawn24(){

SpawningBig = true;
Obscured = false;

yield WaitForSeconds (6);

var hit2 : RaycastHit;

var Spawnionaise24 = Resources.Load("NPCs/AgrianSuperExecutor", GameObject) as GameObject;

if(!Obscured){
if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * BigSpawnDist, -transform.up, hit2, HeightLimit, targetLayers)){

SpawnPos.transform.localEulerAngles = Vector3(0, Random.Range (70, 110), 0);
TheNPC24 = Instantiate(Spawnionaise24, hit2.point + SpawnSource.up * 128, SpawnPos.rotation);
SpawnPos.transform.position = TheNPC24.transform.position;
SpawningBig = false;
Obscured = false;
}

}else{
SpawningBig = false;
Obscured = false;
}

}

function BigSpawn26(){

SpawningBig = true;
Obscured = false;

yield WaitForSeconds (6);

var hit2 : RaycastHit;

var Spawnionaise26 = Resources.Load("NPCs/AgrianAnnihilator", GameObject) as GameObject;

if(!Obscured){
if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * BigSpawnDist, -transform.up, hit2, HeightLimit, targetLayers)){

SpawnPos.transform.localEulerAngles = Vector3(0, Random.Range (70, 110), 0);
TheNPC26 = Instantiate(Spawnionaise26, hit2.point + SpawnSource.up * 80, SpawnPos.rotation);
SpawnPos.transform.position = TheNPC26.transform.position;
SpawningBig = false;
Obscured = false;
}

}else{
SpawningBig = false;
Obscured = false;
}

}

function BigSpawn27(){

SpawningBig = true;
Obscured = false;

yield WaitForSeconds (6);

var hit2 : RaycastHit;

var Spawnionaise27 = Resources.Load("NPCs/AgrianDistributor", GameObject) as GameObject;

if(!Obscured){
if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * BigSpawnDist, -transform.up, hit2, HeightLimit, targetLayers)){

SpawnPos.transform.localEulerAngles = Vector3(0, Random.Range (70, 110), 0);
TheNPC27 = Instantiate(Spawnionaise27, hit2.point + SpawnSource.up * 64, SpawnPos.rotation);
SpawnPos.transform.position = TheNPC27.transform.position;
SpawningBig = false;
Obscured = false;
}

}else{
SpawningBig = false;
Obscured = false;
}

}

function BigSpawn303(){

SpawningBig = true;
Obscured = false;

yield WaitForSeconds (6);

var hit2 : RaycastHit;

var Spawnionaise303 = Resources.Load("NPCs/LevNavCruiser1", GameObject) as GameObject;

if(!Obscured){
if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * BigSpawnDist, -transform.up, hit2, HeightLimit, targetLayers)){

SpawnPos.transform.localEulerAngles = Vector3(0, Random.Range (70, 110), 0);
TheNPC303 = Instantiate(Spawnionaise303, hit2.point + SpawnSource.up * 24, SpawnPos.rotation);
SpawnPos.transform.position = TheNPC303.transform.position;
SpawningBig = false;
Obscured = false;
}

}else{
SpawningBig = false;
Obscured = false;
}

}

function BigSpawn32(){

SpawningBig = true;
Obscured = false;

yield WaitForSeconds (6);

var hit2 : RaycastHit;

if(!Obscured){
if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * BigSpawnDist, -transform.up, hit2, HeightLimit, targetLayers)){

SpawnPos.transform.localEulerAngles = Vector3(0, Random.Range (70, 110), 0);
TheNPC32 = Instantiate(NPC32, hit2.point + SpawnSource.up * 5, SpawnPos.rotation);
SpawnPos.transform.position = TheNPC32.transform.position;
SpawningBig = false;
Obscured = false;
}

}else{
SpawningBig = false;
Obscured = false;
}

}

function BigSpawn33(){

SpawningBig = true;
Obscured = false;

yield WaitForSeconds (6);

var hit2 : RaycastHit;

var Spawnionaise33 = Resources.Load("NPCs/DasNavCruiser", GameObject) as GameObject;

if(!Obscured){
if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * BigSpawnDist, -transform.up, hit2, HeightLimit, targetLayers)){

SpawnPos.transform.localEulerAngles = Vector3(0, Random.Range (70, 110), 0);
TheNPC33 = Instantiate(Spawnionaise33, hit2.point + SpawnSource.up * 12, SpawnPos.rotation);
SpawnPos.transform.position = TheNPC33.transform.position;
SpawningBig = false;
Obscured = false;
}

}else{
SpawningBig = false;
Obscured = false;
}

}

function BigSpawn34(){

SpawningBig = true;
Obscured = false;

yield WaitForSeconds (6);

var hit2 : RaycastHit;

var Spawnionaise34 = Resources.Load("NPCs/TRNTank1", GameObject) as GameObject;

if(!Obscured){
if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * BigSpawnDist, -transform.up, hit2, HeightLimit, targetLayers)){

SpawnPos.transform.localEulerAngles = Vector3(0, Random.Range (70, 110), 0);
TheNPC34 = Instantiate(Spawnionaise34, hit2.point + SpawnSource.up * 4, SpawnPos.rotation);
SpawnPos.transform.position = TheNPC34.transform.position;
SpawningBig = false;
Obscured = false;
}

}else{
SpawningBig = false;
Obscured = false;
}

}

function BigSpawn35(){

SpawningBig = true;
Obscured = false;

yield WaitForSeconds (6);

var hit2 : RaycastHit;

var Spawnionaise35 = Resources.Load("NPCs/TLFAdamant", GameObject) as GameObject;

if(!Obscured){
if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * BigSpawnDist, -transform.up, hit2, HeightLimit, targetLayers)){

SpawnPos.transform.localEulerAngles = Vector3(0, Random.Range (70, 110), 0);
TheNPC35 = Instantiate(Spawnionaise35, hit2.point + SpawnSource.up * 16, SpawnPos.rotation);
SpawnPos.transform.position = TheNPC35.transform.position;
SpawningBig = false;
Obscured = false;
}

}else{
SpawningBig = false;
Obscured = false;
}

}

function BigSpawn43(){

SpawningBig = true;
Obscured = false;

yield WaitForSeconds (6);

var hit2 : RaycastHit;

if(!Obscured){
if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * BigSpawnDist, -transform.up, hit2, HeightLimit, targetLayers)){

SpawnPos.transform.localEulerAngles = Vector3(0, Random.Range (70, 110), 0);
TheNPC43 = Instantiate(NPC43, hit2.point + SpawnSource.up * 8, SpawnPos.rotation);
SpawnPos.transform.position = TheNPC43.transform.position;
SpawningBig = false;
Obscured = false;
}

}else{
SpawningBig = false;
Obscured = false;
}

}

function BigSpawn44(){

SpawningBig = true;
Obscured = false;

yield WaitForSeconds (6);

var hit2 : RaycastHit;

if(!Obscured){
if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * BigSpawnDist, -transform.up, hit2, HeightLimit, targetLayers)){

SpawnPos.transform.localEulerAngles = Vector3(0, Random.Range (70, 110), 0);
TheNPC44 = Instantiate(NPC44, hit2.point + SpawnSource.up * 8, SpawnPos.rotation);
SpawnPos.transform.position = TheNPC44.transform.position;
SpawningBig = false;
Obscured = false;
}

}else{
SpawningBig = false;
Obscured = false;
}

}

function BigSpawn45(){

SpawningBig = true;
Obscured = false;

yield WaitForSeconds (6);

var hit2 : RaycastHit;

if(!Obscured){
if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * BigSpawnDist, -transform.up, hit2, HeightLimit, targetLayers)){

SpawnPos.transform.localEulerAngles = Vector3(0, Random.Range (70, 110), 0);
TheNPC45 = Instantiate(NPC45, hit2.point + SpawnSource.up * 8, SpawnPos.rotation);
SpawnPos.transform.position = TheNPC45.transform.position;
SpawningBig = false;
Obscured = false;
}

}else{
SpawningBig = false;
Obscured = false;
}

}

function BigSpawn63(){

SpawningBig = true;
Obscured = false;

yield WaitForSeconds (6);

var hit2 : RaycastHit;

if(!Obscured){
if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * BigSpawnDist, -transform.up, hit2, HeightLimit, targetLayers)){

SpawnPos.transform.localEulerAngles = Vector3(0, Random.Range (70, 110), 0);
TheNPC63 = Instantiate(NPC63, hit2.point + SpawnSource.up * 8, SpawnPos.rotation);
SpawnPos.transform.position = TheNPC63.transform.position;
SpawningBig = false;
Obscured = false;
}

}else{
SpawningBig = false;
Obscured = false;
}

}

function BigSpawn77(){

SpawningBig = true;
Obscured = false;

yield WaitForSeconds (6);

var hit2 : RaycastHit;

if(!Obscured){
if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * BigSpawnDist, -transform.up, hit2, HeightLimit, targetLayers)){

SpawnPos.transform.localEulerAngles = Vector3(0, Random.Range (70, 110), 0);
TheNPC77 = Instantiate(NPC77, hit2.point + SpawnSource.up * 8, SpawnPos.rotation);
SpawnPos.transform.position = TheNPC77.transform.position;
SpawningBig = false;
Obscured = false;
}

}else{
SpawningBig = false;
Obscured = false;
}

}

function BigSpawn78(){

SpawningBig = true;
Obscured = false;

yield WaitForSeconds (6);

var hit2 : RaycastHit;

if(!Obscured){
if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * BigSpawnDist, -transform.up, hit2, HeightLimit, targetLayers)){

SpawnPos.transform.localEulerAngles = Vector3(0, Random.Range (70, 110), 0);
TheNPC78 = Instantiate(NPC78, hit2.point + SpawnSource.up * 16, SpawnPos.rotation);
SpawnPos.transform.position = TheNPC78.transform.position;
SpawningBig = false;
Obscured = false;
}

}else{
SpawningBig = false;
Obscured = false;
}

}

function BigSpawn79(){

SpawningBig = true;
Obscured = false;

yield WaitForSeconds (6);

var hit2 : RaycastHit;

var Spawnionaise79 = Resources.Load("NPCs/MevNavWarcruiser", GameObject) as GameObject;

if(!Obscured){
if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * BigSpawnDist, -transform.up, hit2, HeightLimit, targetLayers)){

SpawnPos.transform.localEulerAngles = Vector3(0, Random.Range (70, 110), 0);
TheNPC79 = Instantiate(Spawnionaise79, hit2.point + SpawnSource.up * 48, SpawnPos.rotation);
SpawnPos.transform.position = TheNPC79.transform.position;
SpawningBig = false;
Obscured = false;
}

}else{
SpawningBig = false;
Obscured = false;
}

}

function BigSpawn95(){

SpawningBig = true;
Obscured = false;

yield WaitForSeconds (6);

var hit2 : RaycastHit;

var Spawnionaise95 = Resources.Load("NPCs/DN_Obmurat_MVA1", GameObject) as GameObject;

if(!Obscured){
if(!AreaSpace){

if(Physics.Raycast(SpawnSource.position + SpawnSource.forward * BigSpawnDist, -transform.up, hit2, HeightLimit, targetLayers)){
SpawnPos.transform.localEulerAngles = Vector3(0, Random.Range (70, 110), 0);
TheNPC95 = Instantiate(Spawnionaise95, hit2.point + SpawnSource.up * 64, SpawnPos.rotation);
SpawnPos.transform.position = TheNPC95.transform.position;
SpawningBig = false;
Obscured = false;
}

}else{
SpawnPos.transform.localEulerAngles = Vector3(0, Random.Range (70, 110), 0);
TheNPC95 = Instantiate(Spawnionaise95, SpawnSource.position + SpawnSource.forward * BigSpawnDist, SpawnPos.rotation);
SpawnPos.transform.position = TheNPC95.transform.position;
SpawningBig = false;
Obscured = false;
}

}else{
SpawningBig = false;
Obscured = false;
}

}