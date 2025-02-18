# Music and sounds effects

Retro Carnage has background music and sound effects stored in a directory called `sounds`. As the names suggest music
files are stored in the `music` sub directory, sound effects in the `fx` sub directory. During development sound files -
just like all other assets - are located in the 
[retro-carnage-assets](https://github.com/Retro-Carnage-Team/retro-carnage-assets) repository.

## Audio format

Retro Carnage uses a single, fixed audio configuration for all music and sounds. These settings are hard coded in the 
source code - more specificly in the code of the 
[stereo struct](https://github.com/Retro-Carnage-Team/retro-carnage/blob/main/assets/stereo.go). These settings define
that all music and files are expected to be encoded in:

- **MP3 format**
- with **stereo channels**
- in **32000 Hz**.

### Converting audio files to meet these settings

Converting audio files to meet the required encoding is simple. You can use e.g. the free and open source audio editor 
[Audacity](https://www.audacityteam.org/) for that purpose. All you need to do is open your audio file in Audacity,
select the export option from the menu and set the export settings as shown here.

![Audacity](/en/media/development/audacity.png)

![Audacity export modal](/en/media/development/audacity-export.png)

## References to sound effects

Sound effects and background music are managed in 
[sounds.go](https://github.com/Retro-Carnage-Team/retro-carnage/blob/main/assets/sounds.go). This file contains references 
to the sound files so that they can be used via constants in the source code. The file references are relative to their 
respective folder.