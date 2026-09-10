#!/usr/bin/env node

'use strict'

const boxen = require("boxen");
const chalk = require("chalk");
const inquirer = require("inquirer");
const clear = require("clear");
const open = require("open");
const fs = require('fs');
const request = require('request');
const path = require('path');
const ora = require('ora');
const cliSpinners = require('cli-spinners');
const terminalLink = require('terminal-link');
clear();

// Wraps `text` in an OSC 8 hyperlink pointing at `url` so it becomes clickable
// in terminals that support hyperlinks (iTerm2, Windows Terminal, VS Code,
// GNOME Terminal, Hyper, etc.). On unsupported terminals it falls back to the
// plain text unchanged, where cmd/ctrl + click on the URL still works.
const link = (text, url) => terminalLink(text, url, { fallback: false });

const links = {
    twitter: "https://twitter.com/misteranmol",
    github: "https://github.com/anmol098",
    linkedin: "https://linkedin.com/in/anmol098",
    web: "https://anmolsingh.me"
};

const prompt = inquirer.createPromptModule();

const questions = [
    {
        type: "list",
        name: "action",
        message: "What you want to do?",
        choices: [
            {
                name: `Send me an ${chalk.green.bold("email")}?`,
                value: () => {
                    open("mailto:hi@anmolsingh.me");
                    console.log("\nDone, see you soon at inbox.\n");
                }
            },
            {
                name: `Download my ${chalk.magentaBright.bold("Resume")}?`,
                value: () => {
                    // cliSpinners.dots;
                    const loader = ora({
                        text: ' Downloading Resume',
                        spinner: cliSpinners.material,
                    }).start();
                    let pipe = request('https://anmolsingh.me/api/resume').pipe(fs.createWriteStream('./anmol-resume.html'));
                    pipe.on("finish", function () {
                        let downloadPath = path.join(process.cwd(), 'anmol-resume.html')
                        console.log(`\nResume Downloaded at ${downloadPath} \n`);
                        open(downloadPath)
                        loader.stop();
                    });
                }
            },
            {
                name: `Schedule a ${chalk.redBright.bold("Meeting")}?`,
                value: () => {
                    open('https://calendly.com/anmol098/30min');
                    console.log("\n See you at the meeting \n");
                }
            },
            {
                name: "Just quit.",
                value: () => {
                    console.log("Hasta la vista.\n");
                }
            }
        ]
    }
];

const data = {
    name: chalk.bold.green("             Anmol Pratap Singh"),
    handle: chalk.white("@anmol098"),
    work: `${chalk.white("Lead Software Engineer at")} ${chalk
        .hex("#2b82b2")
        .bold("FootLoose Labs")}`,
    twitter: link(chalk.gray("https://twitter.com/") + chalk.cyan("misteranmol"), links.twitter),
    github: link(chalk.gray("https://github.com/") + chalk.green("anmol098"), links.github),
    linkedin: link(chalk.gray("https://linkedin.com/in/") + chalk.blue("anmol098"), links.linkedin),
    web: link(chalk.cyan("https://anmolsingh.me"), links.web),
    npx: chalk.red("npx") + " " + chalk.white("anmol"),

    labelWork: chalk.white.bold("       Work:"),
    labelTwitter: chalk.white.bold("    Twitter:"),
    labelGitHub: chalk.white.bold("     GitHub:"),
    labelLinkedIn: chalk.white.bold("   LinkedIn:"),
    labelWeb: chalk.white.bold("        Web:"),
    labelCard: chalk.white.bold("       Card:")
};

const me = boxen(
    [
        `${data.name}`,
        ``,
        `${data.labelWork}  ${data.work}`,
        ``,
        `${data.labelTwitter}  ${data.twitter}`,
        `${data.labelGitHub}  ${data.github}`,
        `${data.labelLinkedIn}  ${data.linkedin}`,
        `${data.labelWeb}  ${data.web}`,
        ``,
        `${data.labelCard}  ${data.npx}`,
        ``,
        `${chalk.italic(
            "I am currently looking for new opportunities,"
        )}`,
        `${chalk.italic("my inbox is always open. Whether you have a")}`,
        `${chalk.italic(
            "question or just want to say hi, I will try "
        )}`,
        `${chalk.italic(
            "my best to get back to you!"
        )}`
    ].join("\n"),
    {
        margin: 1,
        float: 'center',
        padding: 1,
        borderStyle: "single",
        borderColor: "green"
    }
);

console.log(me);
const tip = [
    `Tip: The links above are clickable, try ${chalk.cyanBright.bold(
        "cmd/ctrl + click"
    )} on them`,
    '',
].join("\n");
console.log(tip);

prompt(questions).then(answer => answer.action());
