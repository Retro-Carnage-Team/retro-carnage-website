# Build and run

## Install toolchain

First of all, you should install the necessary tools on your computer to be able to work with the source code. You will need [git](https://git-scm.com/) and [Golang](https://go.dev/). Some scripts that make development easier are written in PowerShell. PowerShell is already installed when you're running Microsoft Windows. With Linux you still need to [install PowerShell](https://learn.microsoft.com/en-us/powershell/scripting/install/installing-powershell-on-linux?view=powershell-7.4) if you want to use the scripts - but this is optional.

## Install dependencies

### On Ubuntu

Install the required libraries:

`sudo apt-get install -y libgl1-mesa-dev xorg-dev libasound2-dev`

### On Fedora

Install the required libraries:

`sudo dnf install libXcursor-devel libXrandr-devel libXinerama-devel libXi-devel mesa-libGL-devel xorg-x11-server-devel alsa-lib-devel libXxf86vm-devel`

### On Windows

Install [tdm-gcc](https://jmeubank.github.io/tdm-gcc/) so that various go-bindings can be compiled. A installation with default option will do fine.

## Get and build the source code

Get the code and assets

`git clone https://github.com/Retro-Carnage-Team/retro-carnage.git`  
`git clone https://github.com/Retro-Carnage-Team/retro-carnage-assets.git`

Change into the src directory, install required modules, compile the application

`cd retro-carnage`  
`go get -d`  
`go build -v`

Start the game

`./retro-carnage ../retro-carnage-assets`

The repository contains IDE settings for Visual Studio Code to debug, run, and test the game.

# Running the tests

Run the steps to install the development environment first (see previous chapter).
Open a terminal, navigate into the application folder and run the test script:

`pwsh ./test.ps1`

<script src="https://asciinema.org/a/CTqq3ZDI2RtSlwLga6YVERYF4.js" id="asciicast-CTqq3ZDI2RtSlwLga6YVERYF4" async="true"></script>
