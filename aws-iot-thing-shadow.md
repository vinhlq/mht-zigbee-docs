# aws-iot-thing-shadow

* Mô tả cách thức sử dụng thing shadow
* Tài liệu
  1. [Using Shadows](https://docs.aws.amazon.com/iot/latest/developerguide/using-device-shadows.html)
  2. [Shadow MQTT Topics](https://docs.aws.amazon.com/iot/latest/developerguide/device-shadow-mqtt.html)


# Mục đích:

  1. Giảm số lượng message trùng lặp giữa device <> user qua kênh truyền iot-core -> giảm chi phí
  2. Luôn lấy được state cuối cùng của device cho dù device có đang online hay không

# Khởi tạo:

## Phía cloud aws-iot
1. Tạo aws-iot-thing

    * Tên của **thing** chính là **key** dể thiết bị đăng kí với amz do đó cần duy nhất và có format chuẩn thiết bị luôn xác định được mình gắn với **thing** nào
    * Name format:
      > ${provider}-${thingType}-{deviceUid}

      VD:
      > mht-gw-000B57FFFE4F4F12
2. Attach thing & certificate
3. Tạo policy cho phép
    * Action:
      > iot:Subscribe

      > iot:Receive
    * Topic
      > aws/things/${thingName}/shadow/update
## Phía user app + web
1. Topic:

    * Sử dung API với thing shadow giống như đối với các aws-iot-device thông thường:
    * Topic subscribe:
      * event update: Xảy ra khi device update state
        > aws/things/${thingName}/shadow/update

        * payload
          ```JSON
          {
            "desired": {
              "gatewaysettings": {
                "ncpStackVersion": "6.5.0-188",
                "networkUp": true,
                "networkPanId": "0x43DC",
                "radioTxPower": 20,
                "radioChannel": 14
              },
            },
            "delta": {
              "gatewaysettings": {
                "ncpStackVersion": "6.5.0-188",
                "networkUp": true,
                "networkPanId": "0x43DC",
                "radioTxPower": 20,
                "radioChannel": 14
              },
            }
          }
          ```
          * desired: toàn bộ state hiện tại
          * delta: khác biệt giữa hiện tại và khởi tạo **(reported)**
      * event 
  
## Phía device: mht-zigbee-gateway

1. Giữ nguyên kênh **aws-iot-command** (user >> device) trên 
2. Giữ nguyên kênh **aws-iot-event** (device >> user) cho 1 số event:
    * devices:
      * Do số nested level của event này > 6 (amz maximum nested level) và cũng chỉ phát sinh khi có command từ user
      * Có thể vẫn giữ lại event này bên kênh **aws-iot-thing-shadow** và loại bỏ các level > 6
3. Chuyển toàn bộ event sang kênh **aws-iot-thing-shadow-event**
