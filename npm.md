# NPM

Cơ bản sử dụng npm + ES6 để deploy js module

# Mục đích

  * Để tạo module dùng chung cho nhiều project.
  * Quản lý version

## Mô hình cơ bản

  * Example:
    * > tree --dirsfirst --charset=ascii

      ```
      .
      |-- dist
      |   |-- lib/
      |   `-- index.js
      |-- src
      |   |-- lib/
      |   `-- index.js
      |-- babel.config.js
      |-- package.json
      `-- package-lock.json
      ```

    * package.json
      ```JSON
      {
        "name": "mht-iot-client",
        "description": "MHT IoT Client",
        "version": "0.0.1",
        "main": "./dist/index.js",
        "repository": {
          "type": "git",
          "url": "https://github.com/vinhlq/mht-iot-client-js"
        },
        "author": {
            "name": "vinhlq",
            "email": "vinhlq@hotmail.com",
            "url": "https://mht.vn"
        },
        "dependencies": {
            "@babel/runtime": "^7.4.3",
        },
        "devDependencies": {
            "@babel/cli": "^7.4.3",
        },
        "scripts": {
          "build": "rm -rf dist && babel src --out-dir dist --ignore .. lib/node_modules/*,dist/*"
        },
        "license": "Apache-2.0"
      }
      ```

    * Các trường quan trọng:
      * name
      * version
        * Khi sửa đổi code cần thay đổi version (VD: tăng 1 đơn vị)
      * main
        * Đường dẫn tới file khai báo exported module
      * author
      * dependencies
        * Cần chú ý tính tương thích của các module với các engine tương ứng\
        nodejs, react-native, web ...
      * scripts
          * Nếu sử dụng ES6 cần tạo script convert
          * [babel.config.js example](examples/babel.config.js)
      * devDependencies
        * Module sử dụng trong giai đoan develop (build ES6 script)

# Publish

> npm publish
    