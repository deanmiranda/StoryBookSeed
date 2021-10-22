import { paramCase } from 'change-case'

export function htmlBlueprint(componentName) {
    return `<div class="${ paramCase(componentName) }">
    <!-- TBD -->
</div>
`
}
