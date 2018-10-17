const path = process.env.NODE_ENV === 'development' ?
 '../.dist/public/assets/manifest.json' :
 '../public/assets/manifest.json'

export default () => {
  try {
    return require(path)
  } catch (e) {
    console.error('manifest.json not found. Probably still compiling.')
    return {}
  }
}
