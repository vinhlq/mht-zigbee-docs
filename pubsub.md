# Pubsub

[![N|Solid](https://cldup.com/dTxpPi9lDf.thumb.png)](https://nodesource.com/products/nsolid)

Tài liệu mô tả format publish/subscribe cho các giao thức:

  * rest
  * mqtt
  * iot-core
  > Mọi người cần chỉnh sửa thì fork project > modify > pull request

  > Edit bằng vscode tabsize=2

  > sử dụng "Preview to the side" option\
  (góc trên bên phải) để preview

  > [Tài liệu Markdown](https://guides.github.com/features/mastering-markdown)

# Topic format
  * mqtt + iot-core
    * request
      > ${prefix}/${object}/${method}
    * response
      > ${prefix}/${object}/response/${requestID}
  * rest
      > ${prefix}/{object}

  * socket.io
      > {object}
  
# Topic prefix

  * iot-core
    > arn:aws:iot:${AWS_REGION}:${accountArn}:topic/${provider}/${GatewayUid}
  * mqtt
    > ${provider}/${GatewayUid}
  * rest
    > ${host}/rest

  * socket.io
    > None
# Topic method

  * mqtt + iot-core
    > GET

    > POST

    > DEL

  * rest + socket.io
    > None

# Topic response requestID

  * mqtt + iot-core
    > Định nghĩa trong payload của request
  
  * rest + socket.io
    > None

# Request
  * topic
    * mqtt + iot-core
      > ${prefix}/${object}/${method}
    * rest + socket.io
      > ${prefix}/${object}
  * payload
    * mqtt + iot-core
      ```JSON
      {
        "requestID": "string",
        ...
      }
      ```
# Response
  * topic
    * mqtt + iot-core
      > ${prefix}/${object}/response/${requestID}
    * rest + socket.io
      > ${prefix}/${object}
  * payload
    ```JSON
    {
      ...
    }
    ```

# Object:

  ### Device:
  1. GET /device/info
      * request payload
        * rest
          > None
        * mqtt + iot-core + socket.io
          ```JSON
          {
            "requestID": "string",
            "UID": ["uid1", "uid2", "uid3"]
          }
          ```
      * response payload
        ```JSON
        [
          {
            "type": "switch",
            "configuration": {},
            "properties": {},
            "UID": "string",
            "statusInfo": {
              "status": "UNINITIALIZED",
              "statusDetail": "NONE",
              "description": "string"
            },
            "firmwareStatus": {
              "status": "string",
              "updatableVersion": "string"
            }
          }
        ]
        ```
  2. GET /device/state
    
      * request payload
        * rest
          > None
        * mqtt + iot-core + socket.io
          ```JSON
          {
            "requestID": "string",
            "UID": ["uid1", "uid2", "uid3"]
          }
          ```
      * response payload
        ```JSON
        [
          {
            "UID": "string",
            "type": "dimmer",
            "value": "100"
          }
        ]
        ```

  3. POST /device/command

      * request payload
        ```JSON
        {
          "requestID": "string",
          "UID": "string",
          "value": "string"
        }
        ```
      * response payload
        ```JSON
        {
          "UID": "string",
          "code": "number",
          "description": "string"
        }
        ```
  ### Rules
  1. GET /rules
      * request payload
        * rest
          > None
        * mqtt + iot-core
          ```JSON
          {
            "requestID": "string"
          }
          ```
      * response payload
        ```JSON
        {
          "rules": {},
        }
        ```

  2. POST /rules
      * request payload
        ```JSON
        {
          "requestID": "string",
          "rules": {}
        }
        ```
      * response payload
        ```JSON
        {
          "code": "number",
          "description": "string"
        }
        ```