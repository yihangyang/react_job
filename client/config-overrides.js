// const {
//   addLessLoader,
//   override,
//   fixBabelImports
// } = require("customize-cra");

// module.exports = {
//   webpack: override(
//     addLessLoader({
//       javascriptEnabled: true
//     }),
//     fixBabelImports("babel-plugin-import", {
//       libraryName: "antd-mobile",
//       style: true
//     })
//   )
// };

const {
  override,
  fixBabelImports,
  addLessLoader,
} = require("customize-cra");


module.exports = override( 
  fixBabelImports("babel-plugin-import", {
    libraryName: "antd-mobile",
    style: true
  }),
  addLessLoader()
);