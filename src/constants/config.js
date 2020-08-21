const config = {
  apiBase: 'https://us.api.blizzard.com/',
  awsBucket: '',
  version: '3.0.0 BETA',
  client_id: '96adc66832024326b62b6cf276723411',
  client_secret: 'P3l9YKt6hhQr5HAcTXlWmBfL6DlHQdeI',
  apiLinks: {
    guild: {
      roster: 'https://us.api.blizzard.com/data/wow/guild/burning-legion/ironfist/roster?namespace=profile-us',
      achievements: 'https://us.api.blizzard.com/data/wow/guild/burning-legion/ironfist/achievements?namespace=profile-us',
      activity: 'https://us.api.blizzard.com/data/wow/guild/burning-legion/ironfist/activity?namespace=profile-us'
    }
  },
  races: {
    1: 'Human',
    2: 'Orc',
    3: 'Dwarf',
    4: 'Night Elf',
    5: 'Undead',
    6: 'Tauren',
    7: 'Gnome',
    8: 'Troll',
    9: 'Goblin',
    10: 'Blood Elf',
    11: 'Draenei',
    22: 'Worgen',
    24: 'Pandaren',
    25: 'Pandaren',
    26: 'Pandaren',
    27: 'Nightborne',
    28: 'Highmountain Tauren',
    29: 'Void Elf',
    30: 'Lightforged Draenei',
    31: 'Zandalari Troll',
    32: 'Kul Tiran',
    34: 'Dark Iron Dwarf',
    35: 'Vulpera',
    36: 'Mag\'har Orc',
    37: 'Mechagnome',
  },
  classes: {
    1: {
      name: 'Warrior',
      icon: 'https://render-us.worldofwarcraft.com/icons/56/classicon_warrior.jpg'
    },
    2: {
      name: 'Paladin',
      icon: 'https://render-us.worldofwarcraft.com/icons/56/classicon_paladin.jpg'
    },
    3: {
      name: 'Hunter',
      icon: 'https://render-us.worldofwarcraft.com/icons/56/classicon_hunter.jpg'
    },
    4: {
      name: 'Rogue',
      icon: 'https://render-us.worldofwarcraft.com/icons/56/classicon_rogue.jpg'
    },
    5: {
      name: 'Priest',
      icon: 'https://render-us.worldofwarcraft.com/icons/56/classicon_priest.jpg'
    },
    6: {
      name: 'Death Knight',
      icon: 'https://render-us.worldofwarcraft.com/icons/56/classicon_deathknight.jpg'
    },
    7: {
      name: 'Shaman',
      icon: 'https://render-us.worldofwarcraft.com/icons/56/classicon_shaman.jpg'
    },
    8: {
      name: 'Mage',
      icon: 'https://render-us.worldofwarcraft.com/icons/56/classicon_mage.jpg'
    },
    9: {
      name: 'Warlock',
      icon: 'https://render-us.worldofwarcraft.com/icons/56/classicon_warlock.jpg'
    },
    10: {
      name: 'Monk',
      icon: 'https://render-us.worldofwarcraft.com/icons/56/classicon_monk.jpg'
    },
    11: {
      name: 'Druid',
      icon: 'https://render-us.worldofwarcraft.com/icons/56/classicon_druid.jpg'
    },
    12: {
      name: 'Demon Hunter',
      icon: 'https://render-us.worldofwarcraft.com/icons/56/classicon_demonhunter.jpg'
    }
  },
  specs: {
    62: {
      name: "Arcane",
      icon: 'https://us.api.blizzard.com/data/wow/media/playable-specialization/62.jpg?namespace=static-8.3.7_35114-us'
    },
    63: {
      name: "Fire",
      icon: 'https://us.api.blizzard.com/data/wow/media/playable-specialization/63.jpg?namespace=static-8.3.7_35114-us'
    },
    64: {
      name: "Frost",
      icon: 'https://us.api.blizzard.com/data/wow/media/playable-specialization/64.jpg?namespace=static-8.3.7_35114-us'
    },
    65: {
      name: "Holy",
      icon: 'https://us.api.blizzard.com/data/wow/media/playable-specialization/65.jpg?namespace=static-8.3.7_35114-us'
    },
    66: {
      name: "Protection",
      icon: 'https://us.api.blizzard.com/data/wow/media/playable-specialization/66.jpg?namespace=static-8.3.7_35114-us'
    },
    70: {
      name: "Retribution",
      icon: 'https://us.api.blizzard.com/data/wow/media/playable-specialization/70.jpg?namespace=static-8.3.7_35114-us'
    },
    71: {
      name: "Arms",
      icon: 'https://us.api.blizzard.com/data/wow/media/playable-specialization/71.jpg?namespace=static-8.3.7_35114-us'
    },
    72: {
      name: "Fury",
      icon: 'https://us.api.blizzard.com/data/wow/media/playable-specialization/72.jpg?namespace=static-8.3.7_35114-us'
    },
    73: {
      name: "Protection",
      icon: 'https://us.api.blizzard.com/data/wow/media/playable-specialization/72.jpg?namespace=static-8.3.7_35114-us'
    },
    102: {
      name: "Balance",
      icon: 'https://us.api.blizzard.com/data/wow/media/playable-specialization/102.jpg?namespace=static-8.3.7_35114-us'
    },
    103: {
      name: "Feral",
      icon: 'https://us.api.blizzard.com/data/wow/media/playable-specialization/103.jpg?namespace=static-8.3.7_35114-us'
    },
    104: {
      name: "Guardian",
      icon: 'https://us.api.blizzard.com/data/wow/media/playable-specialization/104.jpg?namespace=static-8.3.7_35114-us'
    },
    105: {
      name: "Restoration",
      icon: 'https://us.api.blizzard.com/data/wow/media/playable-specialization/105.jpg?namespace=static-8.3.7_35114-us'
    },
    250: {
      name: "Blood",
      icon: 'https://us.api.blizzard.com/data/wow/media/playable-specialization/250.jpg?namespace=static-8.3.7_35114-us'
    },
    251: {
      name: "Frost",
      icon: 'https://us.api.blizzard.com/data/wow/media/playable-specialization/251.jpg?namespace=static-8.3.7_35114-us'
    },
    252: {
      name: "Unholy",
      icon: 'https://us.api.blizzard.com/data/wow/media/playable-specialization/252.jpg?namespace=static-8.3.7_35114-us'
    },
    253: {
      name: "Beast Mastery",
      icon: 'https://us.api.blizzard.com/data/wow/media/playable-specialization/253.jpg?namespace=static-8.3.7_35114-us'
    },
    254: {
      name: "Marksmanship",
      icon: 'https://us.api.blizzard.com/data/wow/media/playable-specialization/254.jpg?namespace=static-8.3.7_35114-us'
    },
    255: {
      name: "Survival",
      icon: 'https://us.api.blizzard.com/data/wow/media/playable-specialization/255.jpg?namespace=static-8.3.7_35114-us'
    },
    256: {
      name: "Discipline",
      icon: 'https://us.api.blizzard.com/data/wow/media/playable-specialization/256.jpg?namespace=static-8.3.7_35114-us'
    },
    257: {
      name: "Holy",
      icon: 'https://us.api.blizzard.com/data/wow/media/playable-specialization/257.jpg?namespace=static-8.3.7_35114-us'
    },
    258: {
      name: "Shadow",
      icon: 'https://us.api.blizzard.com/data/wow/media/playable-specialization/258.jpg?namespace=static-8.3.7_35114-us'
    },
    259: {
      name: "Assassination",
      icon: 'https://us.api.blizzard.com/data/wow/media/playable-specialization/259.jpg?namespace=static-8.3.7_35114-us'
    },
    260: {
      name: "Outlaw",
      icon: 'https://us.api.blizzard.com/data/wow/media/playable-specialization/260.jpg?namespace=static-8.3.7_35114-us'
    },
    261: {
      name: "Subtlety",
      icon: 'https://us.api.blizzard.com/data/wow/media/playable-specialization/261.jpg?namespace=static-8.3.7_35114-us'
    },
    262: {
      name: "Elemental",
      icon: 'https://us.api.blizzard.com/data/wow/media/playable-specialization/262.jpg?namespace=static-8.3.7_35114-us'
    },
    263: {
      name: "Enhancement",
      icon: 'https://us.api.blizzard.com/data/wow/media/playable-specialization/263.jpg?namespace=static-8.3.7_35114-us'
    },
    264: {
      name: "Restoration",
      icon: 'https://us.api.blizzard.com/data/wow/media/playable-specialization/264.jpg?namespace=static-8.3.7_35114-us'
    },
    265: {
      name: "Affliction",
      icon: 'https://us.api.blizzard.com/data/wow/media/playable-specialization/265.jpg?namespace=static-8.3.7_35114-us'
    },
    266: {
      name: "Demonology",
      icon: 'https://us.api.blizzard.com/data/wow/media/playable-specialization/266.jpg?namespace=static-8.3.7_35114-us'
    },
    267: {
      name: "Destruction",
      icon: 'https://us.api.blizzard.com/data/wow/media/playable-specialization/267.jpg?namespace=static-8.3.7_35114-us'
    },
    268: {
      name: "Brewmaster",
      icon: 'https://us.api.blizzard.com/data/wow/media/playable-specialization/268.jpg?namespace=static-8.3.7_35114-us'
    },
    269: {
      name: "Windwalker",
      icon: 'https://us.api.blizzard.com/data/wow/media/playable-specialization/269.jpg?namespace=static-8.3.7_35114-us'
    },
    270: {
      name: "Mistweaver",
      icon: 'https://us.api.blizzard.com/data/wow/media/playable-specialization/270.jpg?namespace=static-8.3.7_35114-us'
    },
    577: {
      name: "Havoc",
      icon: 'https://us.api.blizzard.com/data/wow/media/playable-specialization/577.jpg?namespace=static-8.3.7_35114-us'
    },
    581: {
      name: "Vengeance",
      icon: 'https://us.api.blizzard.com/data/wow/media/playable-specialization/581.jpg?namespace=static-8.3.7_35114-us'
    },
  },
  ranks : {
    1: 'Leader',
    2: 'XO',
    3: 'Officer',
    4: 'Officer Alt',
    5: 'Raid Leader' ,
    6: 'Raider',
    7: 'Member',
    8: 'Alt',
    9: 'Recruit'

}
}

export default config;