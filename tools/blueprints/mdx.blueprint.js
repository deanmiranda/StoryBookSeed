import { capitalCase } from 'change-case'

export function mdxBlueprint(componentName) {
    const displayName = componentName.split(' ')
        .map((word) => {
            const isAllCaps = word.split('').every((letter) => !!letter.match(/[A-Z]/))

            if (isAllCaps) {
                return word
            }

            return capitalCase(word)
        })
        .join(' ')

    return `# ${ displayName }

<br />
---
<br />

**Sitecore Implementation Instructions**

**1.** Run \`yarn build\`, then check the \`dist\` folder for the assets you need to copy over.

<br />
---
<br />

**Jira Ticket**
> https://atlassian.net/browse/MCRN-##

<br/>

**Mockup**
> https://xd.adobe.com/view/TBD
`
}
