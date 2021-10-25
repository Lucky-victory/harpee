const path=require('path')
module.exports = {
  entry:'./index.js',
  output: {
    path:path.resolve(__dirname,'dist'),
    library: {
      name: 'harpee',
      type: 'umd',
      
    },
  },
};