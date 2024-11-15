# Weapons

## Overview

Weapons play a central role in Retro Carnage. One of the challenges of the game is the correct use of money in order to be able to afford increasingly powerful weapons and their expensive ammunition for more difficult missions as the game progresses. The weapons are not hard-coded into the game, but are read in from configuration files when the game is started. These are located in the game directory (under */items*).

This article describes how these configuration files are structured and can be customised. Based on this description, existing weapons can be easily customised or replaced with other weapons.

## Directories and files

The configuration files for weapons are developed in the repository [retro-carnage-assets](https://github.com/Retro-Carnage-Team/retro-carnage-assets/tree/main/items). After installing the game on the user's computer, they are located in the */items* directory below the installation directory.

Here the configuration files are sorted again into three subdirectories:

- */items/ammunition*: Contains configuration files for ammunition
- */items/grenades*: Contains configuration files for grenades
- */items/weapons*: Contains configuration files for weapons

### Konfigurationsdateien für Waffen

- Beschreibung
- Aufbau

```json
{
  "ammo": "9 x 19 mm",
  "bulletInterval": 0,
  "bulletRange": 350,
  "bulletSpeed": 1.2,
  "description": "The P7 is a...",
  "image": "images/weapons/HK-P7.png",
  "imageRotated": "images/weapons/HK-P7-r.png",
  "length": "17.1 cm",
  "name": "P7",
  "price": 200,
  "sound": "pistol.mp3",
  "weaponType": 0,
  "weight": "0.780 kg"
}
```

- Beschreibung der Eigenschaften

### Konfigurationsdateien für Munition

- Beschreibung
- Aufbau

```json
{
  "description": "The 9×19mm Parabellum ...",
  "image": "images/weapons/9x19.png",
  "maxCount": 10000,
  "name": "9 x 19 mm",
  "packageSize": 100,
  "price": 100
}
```

- Beschreibung der Eigenschaften

### Konfigurationsdateien für Granaten

- Beschreibung
- Aufbau

```json
{
  "description": "The DM41...",
  "explosive": "150 g",
  "image": "images/weapons/DM41.png",
  "imageRotated": "images/weapons/DM41-r.png",
  "maxCount": 100,
  "movementDistance": 450,
  "movementSpeed": 0.8,
  "name": "DM41",
  "packageSize": 5,
  "price": 500,
  "weight": "0.450 kg"
}
```

- Beschreibung der Eigenschaften