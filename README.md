# NPX CARD
This my NPX card unique style to connect with me directly via console or terminal

👇 just hit 
```bash
npx anmol
```
And get to know me in unique style.

### I spent a non-trivial amount of effort building and designing this iteration of npx card, and I am proud of it! All I ask of you all is to put a **star** ⭐ on this project and not claim this effort as your own ♥.

### SCREENSHOT

The final output might look something like this:

![image](https://github.com/anmol098/npx_card/blob/master/demo.gif)

The Twitter, GitHub, LinkedIn and website links on the card are clickable in terminals that support hyperlinks (iTerm2, Windows Terminal, VS Code, GNOME Terminal, Hyper, …). On other terminals they are printed as plain URLs, so `cmd/ctrl + click` still works.

### PUBLISHING A NEW VERSION

Releases are published to npm straight from GitHub Actions, no local `npm publish` needed.

1. One-time setup: create an npm **Automation** access token and add it to the repository as a secret named `NPM_TOKEN` (Settings → Secrets and variables → Actions).
2. Go to **Actions → Publish to npm → Run workflow**, choose the version bump (`patch` / `minor` / `major`) and run it.

The workflow bumps the version, publishes the package to npm with provenance, and then pushes the release commit and `vX.Y.Z` tag back to the branch.

<hr/>

##### STEPS TO CREATE YOUR OWN
The article written by our friend @jackboberg. I used the same for the reference to deploy the package. 
[Write a Simple npx Business Card](https://studioelsa.se/blog/open-source-oss-npx-business-card). 
