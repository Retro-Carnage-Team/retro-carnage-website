# Weapon configurations

## Overview

Weapons play a central role in Retro Carnage. One of the challenges of the game is the correct use of money in order to be able to afford increasingly powerful weapons and their expensive ammunition for more difficult missions as the game progresses. The weapons are not hard-coded into the game, but are read in from configuration files when the game is started. These are located in the game directory (under */items*).

This article describes how these configuration files are structured and can be customised. Based on this description, existing weapons can be easily customised or replaced with other weapons.

## Directories and files

The configuration files for weapons are developed in the repository [retro-carnage-assets](https://github.com/Retro-Carnage-Team/retro-carnage-assets/tree/main/items). After installing the game on the user's computer, they are located in the */items* directory below the installation directory.

Here the configuration files are sorted again into three subdirectories:

- [/items/ammunition](https://github.com/Retro-Carnage-Team/retro-carnage-assets/tree/main/items/ammunition): Contains configuration files for ammunition
- [/items/grenades](https://github.com/Retro-Carnage-Team/retro-carnage-assets/tree/main/items/grenades): Contains configuration files for grenades
- [/items/weapons](https://github.com/Retro-Carnage-Team/retro-carnage-assets/tree/main/items/weapons): Contains configuration files for weapons

## Configurations for weapons

Weapons are each configured using a file in the */items/weapons* directory. Retro Carnage reads the files in the order specified by the alphanumeric sorting of their name. To achieve a specific order of weapons in the shop, the files have a numerical prefix, for example ***02**-P30.json*.

The files are in JSON format. The structure of these configuration files is always as follows:

```json
{
  "ammo": "9 x 19 mm",
  "bulletInterval": 0,
  "bulletRange": 350,
  "bulletSpeed": 1.1,
  "description": "The P30 is a pistol in 9 mm x 19 caliber.",
  "image": "images/weapons/46.png",
  "imageRotated": "images/weapons/46-r.png",
  "length": "40.6 cm",
  "name": "P30",
  "price": 400,
  "sound": "pistol.mp3",
  "weaponType": 0,
  "weight": "0.65 kg"
}
```

This example is based on the [P30 pistol](https://github.com/Retro-Carnage-Team/retro-carnage-assets/blob/main/items/weapons/02-P30.json)

| Property           | Type           | Description                                                                                                                              |
| ------------------ | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| **ammo**           | string         | Name of a type of ammunition (defined by configuration for ammunitions). Acts as a reference.                                            |
| **bulletInterval** | number (int)   | For automatic weapons: the delay between two shots fired. For non-automatic weapons: 0                                                   |
| **bulletRange**    | number (int)   | Distance that a bullet fired by this weapon can travel on screen. Range is 0 <= value <= 2,121                                           |
| **bulletSpeed**    | number (float) | Speed is given in distance per milisecond. Range is 0.0 <= value <= 2.0                                                                  |
| **description**    | string         | The description will be displayed in the popup window of the shop screen.                                                                |
| **image**          | string         | Path of the image to be used in the shop. Path is relative to the root folder of the asset repository.                                   |
| **imageRotated**   | string         | Path of the image to be used in the sidebar of the game. Path is relative to the root folder of the asset repository.                    |
| **length**         | string         | Value to be shown as property in the popup window of the shop. Serves no additional purpose.                                             |
| **name**           | string         | Value to be shown as property in the popup window of the shop. Serves no additional purpose.                                             |
| **price**          | number (int)   | Price of the weapon to be used in the store.                                                                                             |
| **sound**          | string         | Name of the sound file (including file name extension) to be played when the weapon is fired by the player. Not a full or relative path. |
| **weaponType**     | number (int)   | Enum value: **0** = NonAutomatic, **1** = Automatic, **2** = RPG                                                                         |
| **weight**         | string         | Value to be shown as property in the popup window of the shop. Serves no additional purpose.                                             |

## Configurations for ammunition

Types of ammunition are each configured using a file in the */items/ammunition* directory. Ammunition is not displayed - so no specific order is necessary.
There has to be a type of ammunition for each weapon. The name of the type of ammunition has to be exactly as used in the configuration file of that weapon.

The files are in JSON format. The structure of these configuration files is always as follows:

```json
{
  "explosive": false,
  "maxCount": 10000,
  "name": "9 x 19 mm",
  "packageSize": 100,
  "price": 100,
  "scattering": false
}
```

This example is based on the [9 x 19 mm ammunition](https://github.com/Retro-Carnage-Team/retro-carnage-assets/blob/main/items/ammunition/9x19mm.json)

| Property        | Type         | Description                                                                                             |
| --------------- | ------------ | ------------------------------------------------------------------------------------------------------- |
| **explosive**   | boolean      | **true** for grenades used with grenade launchers.                                                      |
| **maxCount**    | number (int) | Limit for the number of bullets that a player can carry for this type of ammunition.                    |
| **name**        | string       | The name is used to identify the ammunition. It has to be exactly as used by the corresponding weapons. |
| **packageSize** | number (int) | The number of bullets purchased in a pack. Price is per pack.                                           |
| **price**       | string       | Price of a pack of this type of ammunition. Used in the store.                                          |
| **scattering**  | number (int) | **true** for shotgun cartridge only (not slugs).                                                        |

## Configurations for grenades

Grenades can be used without weapons. They are thrown - thus have a limited range. They cause explosions when hitting an enemy or when they reached their destination.
Grenades are each configured using a file in the */items/grenade* directory. Retro Carnage reads the files in the order specified by the alphanumeric sorting of their name. To achieve a specific order of weapons in the shop, the files have a numerical prefix, for example ***01**-M67.json*.

The files are in JSON format. The structure of these configuration files is always as follows:

```json
{
  "description": "The M67 is a very ...",
  "explosive": "185 g",
  "image": "images/weapons/43.png",
  "imageRotated": "images/weapons/43-r.png",
  "maxCount": 100,
  "movementDistance": 450,
  "movementSpeed": 0.8,
  "name": "M67",
  "packageSize": 5,
  "price": 500,
  "weight": "0.4 kg"
}
```
This example is based on the [M67 grenade](https://github.com/Retro-Carnage-Team/retro-carnage-assets/blob/main/items/grenades/01-M67.json)

| Property             | Type           | Description                                                                                                           |
| -------------------- | -------------- | --------------------------------------------------------------------------------------------------------------------- |
| **description**      | string         | The description will be displayed in the popup window of the shop screen.                                             |
| **explosive**        | string         | Value to be shown as property in the popup window of the shop. Serves no additional purpose.                          |
| **image**            | string         | Path of the image to be used in the shop. Path is relative to the root folder of the asset repository.                |
| **imageRotated**     | string         | Path of the image to be used in the sidebar of the game. Path is relative to the root folder of the asset repository. |
| **maxCount**         | number (int)   | Limit for the number of grenades that a player can carry for this type.                                               |
| **movementDistance** | number (int)   | Distance that a grenade can travel on screen. Range is 0 <= value <= 2,121                                            |
| **movementSpeed**    | number (float) | Speed is given in distance per milisecond. Range is 0.0 <= value <= 2.0                                               |
| **name**             | string         | Value to be shown as property in the popup window of the shop. Serves no additional purpose.                          |
| **packageSize**      | number (int)   | The number of grenades purchased in a pack. Price is per pack.                                                        |
| **price**            | string         | Price of a pack of grenades of this type. Used in the store.                                                          |
| **weight**           | string         | Value to be shown as property in the popup window of the shop. Serves no additional purpose.                          |
