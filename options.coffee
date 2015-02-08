

# Core settings
settings = 
    port: 9000

# Source and Destination
source = {}
source.baseDir = 'frontend/src'
source.scriptDir = "#{source.baseDir}/script"
source.jsShimDir = "#{source.baseDir}/js-shim"
source.jsDir = "#{source.baseDir}/js"
source.sassDir = "#{source.baseDir}/sass"
source.lessDir = "#{source.baseDir}/less"
source.cssDir = "#{source.baseDir}/css"
source.imageDir = "#{source.baseDir}/image"
source.fontDir = "#{source.baseDir}/font"

target = {}
target.baseDir = 'docker/var/www'

alpha = {}
alpha.baseDir = "#{target.baseDir}/alpha"
alpha.cssDir = "#{alpha.baseDir}/css"
alpha.jsDir = "#{alpha.baseDir}/js"
alpha.imageDir = "#{alpha.baseDir}/image"
alpha.fontDir = "#{alpha.baseDir}/font"

beta = {}
beta.baseDir = "#{target.baseDir}/beta"

module.exports =
    source: source
    target: target
    alpha: alpha
    beta: beta
    settings: settings