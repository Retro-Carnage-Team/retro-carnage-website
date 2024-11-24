# Weapon types and categories

The weapons of Retro Carnage are set up via their [configuration files](./weapon-configurations.md) so that they can be assigned to different types and categories. These types, categories and their properties are briefly described here.

## Weapon types

Weapon types define the behavior of weapons and are programmed into the source code of the game. Each weapon is assigned a weapon type via its configuration file. The weapon type then determines the behavior of the weapon.

### Non-automatic weapons

Non-automatic weapons include (almost) all weapons that require ammunition and for which the shots must be fired individually. To do this, the button for firing must be pressed and released again. The firing interval of the weapon therefore depends mainly on the speed of the player's inputs.

Example:

![HK45 pistol](/en/media/development/weapon-08.png "HK45")

### Automatic weapons

Automatic weapons fire shots as long as the player keeps the button for firing the weapon pressed and ammunition is available. The speed of the firing sequence is one of the main distinguishing features of these weapons and is defined in the configuration file of the respective weapon.

Example:

![SCAR assault rifle](/en/media/development/weapon-42.png "SCAR")

### Anti-tank rocket launchers

Currently there is only one weapons of this type: the RPG-7. The behavior of the RPG-7 is similar to that of other non-automatic weapons. However, the weapon's projectiles are significantly larger and suitable for destroying tanks. They are therefore displayed differently in the game. Anti-tank rockets explode on contact with enemies or when they reach their maximum range.

Example:

![RPG-7 anti-tank rocket launcher](/en/media/development/weapon-10.png "RPG-7")

### Hand grenades

Hand grenades do not require a weapon to be used by the player. Their use is analogous to non-automatic weapons. Hand grenades explode on contact with enemies or when they reach their maximum range.

Example:

![M67 hand grenade](/en/media/development/weapon-43.png "M67")

## Weapon categories

Weapon categories are used to group properties of weapons. They are not defined by source code but by similarities in the configurations of weapons. They give guidance when weapon configurations are changed by defining certain boundaries that should be considered.

### Pistols

The pistols of the game are all non-automatic weapons with limited range. This makes these weapons a good choice for a secondary weapon - in case the player runs out of ammunition for his primary weapon. Pistols are the most affordable weapons of the game and the ammunition is generally cheap, too.

Example:

![HK45 pistol](/en/media/development/weapon-08.png "HK45")

### Submachine guns

In terms of their characteristics, submachine guns lie somewhere between pistols and assault rifles. Unlike pistols, submachine guns are automatic weapons. Their range is similar to that of pistols. Their ammunition is inexpensive.

Example:

![AKS 74U submachine gun](/en/media/development/weapon-16.png "AKS 74U")

### Shotguns

Shotguns can be automatic and non-automatic. The price of shotguns and their ammunition is higher than that of submachine guns. The range of the weapons is limited. They fire shotgun ammunition, which splits into several smaller projectiles after firing, which spread out in a cone shape.

Example:

![870 SBS shotgun](/en/media/development/weapon-40.png "870 SBS")

### Sturmgewehre und Maschinengewehre

### Scharfschützengewehre

### Granatwerfer

### Anti-tank rocket launcher

### Granaten
