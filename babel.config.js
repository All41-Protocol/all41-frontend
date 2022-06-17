// babel.config.js
module.exports = function (api) {
  // Cache the returned value forever and don't call this function again.
  api.cache(true)

  const presets = [
    [
      'next/babel',
      {
        'preset-react': {
          runtime: 'classic',
          pragma: '__jsx',
        },
      },
    ],
  ]

  const plugins = [
    [
      // TODO: Remove when airbnb/babel-plugin-inline-react-svg#91 gets fixed
      // Source: https://github.com/vercel/next.js/blob/canary/packages/next/build/babel/preset.ts
      'next/dist/build/babel/plugins/jsx-pragma',
      {
        module: 'react',
        importAs: 'React',
        pragma: '__jsx',
        property: 'createElement',
      },
    ],
    [
      'babel-plugin-inline-react-svg',
      {
        svgo: false,
      },
    ],
  ]

  return { presets, plugins }
}
