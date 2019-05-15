# Pubsub

[![N|Solid](https://cldup.com/dTxpPi9lDf.thumb.png)](https://nodesource.com/products/nsolid)

Tài liệu mô tả format publish/subscribe cho các giao thức:

  * socket.io
  * mqtt
  * iot-core
  > Mọi người cần chỉnh sửa thì fork project > modify > pull request

  > Edit bằng vscode tabsize=2

  > sử dụng "Preview to the side" option\
  (góc trên bên phải) để preview

  > [Tài liệu Markdown](https://guides.github.com/features/mastering-markdown)

# Topic format
  * mqtt + iot-core
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

# payload
  * mqtt + iot-core
    > JSON
  * socket.io
    > Object
  * parse
    ```javascript
      if(typeof payload === 'string')
        payload = JSON.parse(payload)
    ```

# Object: gateway event

  1. Event /devices
      * payload

      ```JSON
      {
        "devices": [
          {"nodeId":"0x8307","deviceState":16,"deviceType":"0x0103","timeSinceLastMessage":47,"deviceEndpoint":{"eui64":"0x000B57FFFE4F4F12","endpoint":2,"clusterInfo":[{"clusterId":"0x0000","clusterType":"In"},{"clusterId":"0x0003","clusterType":"In"},{"clusterId":"0x0003","clusterType":"Out"},{"clusterId":"0x0006","clusterType":"Out"}]},"hash":"0x000B57FFFE4F4F12-2","gatewayEui":"000B57FFFE51B5A5","sleepyDevice":false,"otaUpdating":false,"otaTotalBytesSent":0,"otaUpdatePercent":0,"otaTargetImageSizeKB":0,"otaTargetFirmwareVersion":0,"supportsRelay":true,"supportedCluster":[{"clusterId":"0x0006","clusterType":"In"}]}
        ]
      }
      ```

  2. Event /heartbeat

      ```JSON
      {
        "networkUp":true,"networkPanId":"0x43DC","radioTxPower":20,"radioChannel":14,"gatewayEui":"000B57FFFE51B5A5"
      }
      ```
  3. Event /relays

      ```JSON
      {}
      ```

  4. Event /gatewaysettings

      ```JSON
      {
        "ncpStackVersion":"6.5.0-188","networkUp":true,"networkPanId":"0x43DC","radioTxPower":20,"radioChannel":14
      }
      ```

  3. Event /serversettings

      ```JSON
      {
        "ip":"10.42.0.1","otaInProgress":false,"customerTesting":false,"logStreaming":false,"cliTerminal":false,"testNumber":1
      }
      ```

# Object: gateway command
  
  1. Device control

      * lighton/lightoff/lighttoggle
      
        ```JSON
        {
          "type":"lighton", "deviceTableIndex": {}}
        }
        ```
        ```JSON
        {
          "type":"lighton", "deviceEndpoint": {}}
        }
        ```

      * setlightlevel
      
        ```JSON
        {
          "type":"setlightlevel", "deviceTableIndex": {}}
        }
        ```
        ```JSON
        {
          "type":"setlightlevel", "deviceEndpoint": {}}
        }
        ```
      
      * setlightcolortemp
      
        ```JSON
        {
          "type":"setlightcolortemp", "deviceTableIndex": {}}
        }
        ```
        ```JSON
        {
          "type":"setlightcolortemp", "deviceEndpoint": {}}
        }
        ```

  2. Device add

      * permitjoinZB3OpenNetworkOnly
      
        ```JSON
        {
          "type":"permitjoinZB3OpenNetworkOnly", "delayMs": "number"
        }
        ```
  3. Relay/Rule

      * addrelay/deleterelay
      
        ```JSON
        {
          "type":"addrelay", "inDeviceInfo": {}, "outDeviceInfo": {}
        }
        ```

      * addcloudrule/deletecloudrule
      
        ```JSON
        {
          "type":"addcloudrule", "inDeviceInfo": {}, "outDeviceInfo": {}
        }
        ```

      * clearrelays
      
        ```JSON
        {
          "type":"clearrelays"
        }
        ```

      * clearcloudrules
      
        ```JSON
        {
          "type":"clearcloudrules"
        }
        ```

      * servermessage: addgroup
      
        ```JSON
        {
          "type":"addgroup", "group": {"devices": ["group1", "group2"]}
        }
        ```

      * servermessage: removegroup
      
        ```JSON
        {
          "type":"removegroup", "groupName": "group1"
        }
        ```
  4. Gateway

      * requestgatewaystate
      
        ```JSON
        {
          "type": "requestgatewaystate"
        }
        ```

      * loadgatewaylog
      
        ```JSON
        {
          "type": "loadgatewaylog"
        }
        ```
