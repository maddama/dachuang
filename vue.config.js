module.exports = {
    devServer: {
      proxy: {
        "/dataserver": {
          target: "http://localhost:8002",
          secure: false,
          changeOrigin: true
        }
      }
    }
  };