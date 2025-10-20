#!/usr/bin/env node

(async () => {
    'use strict'

    // Import LIBS
    const { default: getPort, portNumbers } = await import('get-port'), // for availPort
          spawn = require('cross-spawn'), // to preserve cmd prompt
          open = (await import('open')).default // for preview in exec().stdout.on()

    // Init UI COLORS
    const bw = '\x1b[97m', // bright white
          by = '\x1b[93m', // bright yellow
          br = '\x1b[91m', // bright red
          nc = '\x1b[0m'   // no color

    if (!process.argv.includes('--spawned')) // spawn new terminal from OG one
        return spawn('node', [__filename, '--spawned', ...process.argv.slice(2)],
            { shell: true, detached: true, stdio: 'ignore' })
                .on('error', err => console.error(`${br}Failed to open new terminal: ${err.message}${nc}`))
                .unref() // detach process to allow immediate return to cmd prompt

    // PREVIEW page
    const availPort = await getPort({ port: portNumbers(3000, 3999) })
    spawn('http-server', ['-p', availPort], { shell: false }).stdout.on('data', data => {
        if (/Available on:[\s\S]+/.test(data)) { // server ready msg, enrich then preview site
            open(`http://localhost:${availPort}`)
            return console.log(`Previewing ${bw}kudoai.com${nc} @ ${by}http://localhost:${availPort}${nc}\n\n`
                + 'Close this window to stop server\n'
                + `Press ${bw}CTRL+SHIFT+R${nc} in browser to clear cache`)
        }
    })

})()
