const { map } = require('./lodash.js')

const components = [
    {
        name: 'Rotator',
        props: { angle: 180, speed: 1000 },
        children: [
            {
                name: 'Flower',
                props: { leaves: 8 },
                children: [
                    { name: 'Seeds', props: { count : 1 }}
                ]
            }
        ]
    }
]

const header = components.map(c => `
import ${c.name} from './${c.name}.js'
`).join('\n')

const componentsList = components.map(c => c.name).join(', ')

const renderComponents = components => '    ' + components.map(c => `
        <${c.name} ${map(c.props, (value, key) => `${key}="${value}"`).join(' ')}>
            ${c.children ? renderComponents(c.children) : ''}
        </${c.name}>
`).join('')

const output = `
${header}

new Vue({
    el: '#app',
    components: { ${componentsList} },
    template: \`${renderComponents(components)}    \`
})
`
console.log(output)