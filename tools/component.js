import * as fs from 'fs'
import inquirer from 'inquirer'
import { paramCase } from 'change-case'

import { htmlBlueprint } from './blueprints/html.blueprint.js'
import { scssBlueprint } from './blueprints/scss.blueprint.js'
import { storybookBlueprint } from './blueprints/storybook.blueprint.js'
import { mdxBlueprint } from './blueprints/mdx.blueprint.js'

// step 1 - prompt the user to select a folder
inquirer.prompt([
    {
        type: 'input',
        name: 'name',
        message: 'What is the name of your component?',
        askAnswered: true,
    },
])
    .then(({ name }) => {
        try {
            scaffoldComponent(name)
            console.log(`\x1b[36m%s\x1b[0m Success! The new component is located in the components/${ paramCase(name) } directory.`, '[COMPONENT]')
        } catch (err) {
            console.log(`\x1b[31m%s\x1b[0m ${ err }`, '[COMPONENT]')
        }
    })
    .catch((err) => {
        console.log(`\x1b[31m%s\x1b[0m An unexpected error was encountered: ${ err.message }`, '[COMPONENT]')
    })

function scaffoldComponent(name) {
    const fileName = paramCase(name)

    if (fs.existsSync(`components/${ fileName }`)) {
        throw new Error('A component with that name already exists.')
    } else {
        fs.mkdirSync(`components/${ fileName }`)
        fs.writeFileSync(`components/${ fileName }/${ fileName }.html`, htmlBlueprint(name))
        fs.writeFileSync(`components/${ fileName }/${ fileName }.scss`, scssBlueprint(name))
        fs.writeFileSync(`components/${ fileName }/${ fileName }.stories.js`, storybookBlueprint(name))
        fs.writeFileSync(`components/${ fileName }/${ fileName }.mdx`, mdxBlueprint(name))
    }
}
