const path=require('path')
module.exports = {
  mode:'production',
  entry:'./index.js',
  output: {
    filename:'harpee.min.js',
    path:path.resolve(__dirname,'dist'),
    libraryTarget:'umd',
      library: 'harpee',
      umdNamedDefine:true
  },
};