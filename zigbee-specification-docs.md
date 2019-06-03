# zigbee-specification-docs

## [zigbee-specification](https://www.zigbee.org/wp-content/uploads/2014/11/docs-05-3474-20-0csg-zigbee-specification.pdf)

1. Zigbee node

    * Là các thiết bị zigbee(ZD) chia thành 2 loại:

        * Coordinator/Router(ZC/ZR): Node làm nhiệm vụ khởi tạo mạng và chuyển tiếp gói tin trong mạng

        * End device(ZED): Node năng lượng thấp thường xuyên ngủ để tiết kiệm năng lượng và thức dậy định kì hoặc theo sự kiện để truyền dữ liệu thông qua ZC/ZR

2. [Endpoint](https://www.eetimes.com/document.asp?doc_id=1278214)

    * Định danh 1 nhóm chức năng(profile) tồn tại trong 1 node
    * 1 Node có thể có nhiều profile <> nhiều endpoint

3. [Profiles](https://www.eetimes.com/document.asp?doc_id=1278223)

    * Quy định kiểu loại endpoint (devicetype): Tương ứng với việc định nghĩa cluster và model của các cluster (client hoặc server hoặc cả 2) được build thành tiêu chuẩn (zigbee standard). **Định nghĩa này cho phép các thiết bị của các nhà cung cấp khác nhau có thể tương thích với nhau** (thông qua binding)

        * [Smart Energy Profile(SE)](zigbee/docs-07-5356-19-0zse-zigbee-smart-energy-profile-specification.pdf)

        * [Home Automation Profile(HA)](zigbee/075367r03ZB_AFG-Home_Automation_Profile_for_Public_Download.pdf)

        * [Lighting Occupancy Device(LO)](zigbee/docs-15-0014-05-0plo-Lighting-OccupancyDevice-Specification-V1.0.pdf)

        * [ZigBee Light Link(LL)](zigbee/13001r00ZB_MWG-ZigBee_Light_Link_Standard.pdf)

    * Nhà cung cấp thiết bị có thể định nghĩa custom endpoint không tuân theo các chuẩn có sẵn mà có thể xây dựng các định nghĩa cluster của riêng mình

4. [Cluster Specification](zigbee/07-5123-06-zigbee-cluster-library-specification.pdf)
    
    * Cluster:
    
        * Định nghĩa các nhóm chức năng, **tuân theo model client/server** có thể đóng vai trò client hoặc server hoặc cả 2
    * Attribute:

        * Thuộc tính được định nghĩa bởi cluster có thể đọc(readonly) hoặc ghi(readwrite). **Server chịu trách nhiệm lưu trữ** (store) các attribute
    * Cluster binding:

        * Là kết nối ảo(virtual wire) giữa client <> server giữa 2 endpoint
    * Client/Server Model ([Mục 2.2.2](zigbee/07-5123-06-zigbee-cluster-library-specification.pdf)):
        
        * Server là thực thể lưu trữ các attribute
        * Client là thực thể  set/get các attribute
        * Command cho phép client set/get các attribute
        * Report command cho phép server report các thay đổi của attribute tới **bound client** 

5. Các cluster phổ biến:

    * General:
        
        * [Basic](zigbee-basic.md)
        * [Power configuration](zigbee-power-configuration.md)
        * [Identify](zigbee-dentify.md)
        * [On/Off](zigbee-onoff.md)
        * [Scene](zigbee-scene.md)
    *