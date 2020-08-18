const config = {
  apiBase: 'https://us.api.blizzard.com/',
  awsBucket: '',
  version: '3.0.0 BETA',
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
  }
}

export default config;