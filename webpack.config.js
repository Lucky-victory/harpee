const path=require('path')
module.exports = {
  mode:'production',
  entry:'./index.js',
  output: {
    path:path.resolve(__dirname,'dist'),
    libraryTarget:'umd',
      library: 'harpee',
      umdNamedDefine:true
  },
};