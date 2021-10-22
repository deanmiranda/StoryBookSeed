import { paramCase } from 'change-case'

export function scssBlueprint(componentName) {
    return `.${ paramCase(componentName) } {
    // TBD
}
`
}
