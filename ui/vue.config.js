const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  filenameHashing: false,
  devServer: {
    proxy: "http://localhost:8000"
  }
})
