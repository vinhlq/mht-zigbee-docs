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

# Format
  * mqtt + iot-core
      * get
        > ${prefix}/{object}/get
      * post
        > ${prefix}/{object}/post
      * delete
        > ${prefix}/{object}/del
  * rest
      > ${prefix}/{object}
  
# Prefix

  * iot-core
    > arn:aws:iot:${AWS_REGION}:${accountArn}:topic/${provider}/${deviceUid}
  * mqtt
    > ${provider}/${deviceUid}
  * rest
    > ${host}/rest

# Object:

  ### Device:
  1. GET /info
      * payload
        * rest
          > None
        * mqtt + iot-core
          ```JSON
          {
            "UID": ["uid1", "uid2", "uid3"]
          }
          ```
      * response
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
  2. GET /state

      * payload
        * rest
          > None
        * mqtt + iot-core
          ```JSON
          {
            "UID": ["uid1", "uid2", "uid3"]
          }
          ```
      * response
        ```JSON
        [
          {
            "UID": "string",
            "type": "dimmer",
            "value": "100"
          }
        ]
        ```

  3. POST /command
      * payload
        ```JSON
        {
          "UID": "string",
          "value": "string"
        }
        ```
      * response
        ```JSON
        {
          "UID": "string",
          "code": "number",
          "description": "string"
        }
        ```
  # Rules
  1. GET /rules
      * payload
        * rest
          > None
        * mqtt + iot-core
          > Any
      * response
        ```JSONA
        {
          "rules": {},
        }
        ```

  2. POST /rules
      * payload
        ```JSON
        {
          "rules": {}
        }
        ```
      * response
        ```JSON
        {
          "code": "number",
          "description": "string"
        }
        ```