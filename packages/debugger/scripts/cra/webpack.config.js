// TODO: remove cwd when needed
const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const CleanWebpackPlugin = require("clean-webpack-plugin");
const defaultConfig = require("../../config").default;

const preprocPreset = {
  plugins: [
    [
      require.resolve("@babel/plugin-transform-modules-commonjs"),
      {
        loose: true
      }
    ],
    [require.resolve("@babel/plugin-transform-arrow-functions")],
    [require.resolve("@babel/plugin-transform-shorthand-properties")],
    [
      require.resolve("@babel/plugin-proposal-class-properties"),
      {
        loose: true
      }
    ],
    [
      require.resolve("@babel/plugin-transform-classes"),
      {
        loose: true
      }
    ],
    [require.resolve("@babel/plugin-transform-react-jsx")]
  ]
};

const backend = "vscodeReact"; //"standalone";

const roots = [`${process.cwd()}/src/index.js`];

const timeTravel = true;
const timeTravelForward = true;

module.exports = {
  entry: {
    index: `${process.cwd()}/src/index.js`
  },
  mode: "development",
  devServer: {
    port: 2222,
    hot: true
  },
  plugins: [
    //    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: `${process.cwd()}/public/index.html`,
      inject: true
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devtool: "hidden-source-map", //false,
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /eff.+debugger(?:\/|\\{1,2})config.js$/,
            loader: require.resolve("babel-loader"),
            exclude: [
              /@babel(?:\/|\\{1,2})runtime/,
              /(webpack|css-loader|style-loader)/
            ], //TODO: make it more specific (probably using babel)
            options: {
              babelrc: false,
              configFile: false,
              plugins: [
                [
                  require.resolve("@effectful/core/configure"),
                  {
                    ...defaultConfig,
                    timeTravel,
                    timeTravelForward,
                    url: "ws://localhost:10001",
                    roots
                  }
                ]
              ]
            }
          },
          {
            test: /\.(js|mjs|jsx|ts|tsx)$/,
            include: path.join(process.cwd(), "src"),
            loader: require.resolve("babel-loader"),
            options: {
              babelrc: false,
              configFile: false,
              compact: false,
              passPerPreset: true,
              presets: [
                preprocPreset,
                {
                  plugins: [
                    [
                      require.resolve("../../transform"),
                      {
                        backend,
                        timeTravel,
                        preInstrumentedLibs: true,
                        expInject: 0,
                        expInline: false
                      }
                    ]
                  ]
                },
                require.resolve("babel-preset-react-app")
              ],
              cacheDirectory: true,
              sourceMaps: false
            }
          },
          {
            test: /\.(js|mjs)$/,
            exclude: [
              /@babel(?:\/|\\{1,2})runtime/,
              /@effectful/,
              /css-loader/,
              /style-loader/,
              /eff.+(debugger|serialization|core|transducers)/
            ],
            loader: require.resolve("babel-loader"),
            options: {
              babelrc: false,
              configFile: false,
              compact: false,
              passPerPreset: true,
              presets: [
                preprocPreset,
                {
                  plugins: [
                    [
                      require("../../transform"),
                      {
                        blackbox: true,
                        backend,
                        timeTravel,
                        expInject: 0,
                        expInline: false
                      }
                    ]
                  ]
                } /*,
                [
                  (require.resolve("babel-preset-react-app/dependencies"),
                  { helpers: true })
                ]*/
              ],
              cacheDirectory: true,
              sourceMaps: false
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        parser: {
          amd: false,
          system: false,
          requireJs: false
        }
      }
    ]
  }
};
