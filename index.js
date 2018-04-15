const postcss = require('postcss')

module.exports = postcss.plugin('postcss-nest-atrules', () => {
  return root => {
    const existingRules = {}
    root.walkRules(rule => {
      if (rule.parent && rule.parent.type === 'atrule') {
        return
      }
      existingRules[rule.selector] = rule
    })

    root.walkAtRules(atRule => {
      atRule.walkRules(rule => {
        const theRule = rule.clone()
        const theAtRule = atRule.clone()
        const parent = rule.parent
        if (parent && parent.type === 'atrule' && parent.name !== atRule.name) {
          const theParentAtRule = parent.clone()
          theParentAtRule.nodes = theRule.nodes
          theAtRule.nodes = [theParentAtRule]
        } else {
          theAtRule.nodes = theRule.nodes
        }
        if (
          Object.prototype.hasOwnProperty.call(existingRules, rule.selector)
        ) {
          existingRules[rule.selector].nodes.push(theAtRule)
          rule.remove()
        } else {
          theRule.nodes = [theAtRule]
          atRule.parent.insertBefore(atRule, theRule)
        }
      })
      atRule.remove()
    })
  }
})
