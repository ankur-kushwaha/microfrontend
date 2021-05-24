const path = require('path')

module.exports={
    devtool:"inline-nosources-cheap-source-map",
    mode:"development",
    entry:"./lib/index.js",
    externals: {
      react: 'react',
      reactDOM: 'react-dom',
    },
    output:{
        library: {
          name: 'MyLibrary',
          type: 'umd',
          umdNamedDefine: true,
        },
        path:path.resolve(__dirname, "./dist"),
    },
    module: {
        rules: [
          // JavaScript / ES6
          {
            test: /\.js?$/,
            exclude:/node_modules/,
            use: "babel-loader"
          },
        ]
    }
}