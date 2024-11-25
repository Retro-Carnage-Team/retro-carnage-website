# Development

## Repository structure

The [Retro Carnage project](https://github.com/Retro-Carnage-Team) comprises four main repositories from which two applications are created.

![Source code repositories](/en/media/development/repositories.png)

### Retro Carnage

The Retro Carnage game consists of an application and various assets. The game is build from source code that is managed in the [retro-carnage](https://github.com/Retro-Carnage-Team/retro-carnage) repository. For a release of Retro Carnage, the application is compiled from this repository and combined with the contents of the [retro-carnage-assets](https://github.com/Retro-Carnage-Team/retro-carnage-assets) repository to form an installation archive. These installation archives will then be made available for users to [download](https://www.retro-carnage.net/en/download/) in multiple binary formats for various operating system.

### Retro Carnage Editor

The Retro Carnage Editor consists of an application based on the [NetBeans Rich Client Platform](https://www.netbeans.info/kb/trails/platform.html) and an editor workspace, which contains modifiable definitions of the levels of the game and the assets from which these levels are created.

The Retro Carnage Editor application is being developed in the [retro-carnage-editor](https://github.com/Retro-Carnage-Team/retro-carnage-editor) repository. For a release of the Retro Carnage Editor, the application is compiled from this repository and combined with the contents of the [editor-workspace](https://github.com/Retro-Carnage-Team/editor-workspace) repository to form an installation archive. This archive will then be made available for users to [download](https://www.retro-carnage.net/en/download/) from the project website. The archive contains everything you need to start modifying existing levels or to build your own. These levels can then be exported either directly into a local Retro Carnage installation or into a retro-carnage-assets repository.
