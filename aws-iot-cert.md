# Iot Device certificate

 * Mô tả chu trình đăng kí certificate với aws-iot
 * Sử dụng cơ chế tự động đăng kí: [Just-in-Time Registration](https://aws.amazon.com/blogs/iot/just-in-time-registration-of-device-certificates-on-aws-iot/)

# Nhà phát hành (provider)

 * Có trách nhiệm đăng kí certificate authority (CA) với aws-iot

  1. Gen CA private key
      > openssl genrsa -out sampleCACertificate.key 2048

  2. Gen CA cert
      > openssl req -x509 -new -nodes -key sampleCACertificate.key -sha256 -days 36500 -out sampleCACertificate.pem

  3. Gen CA certificate signing request
  
      * Private key
        > openssl genrsa -out privateKeyVerification.key 2048

      * Request registration-code
        > aws iot get-registration-code

      * Gen CSR
        > openssl req -new -key privateKeyVerification.key -out privateKeyVerification.csr

      * Tạo CSR với registration-code: NHập 'registration-code' khi được hỏi:
        > Common Name (e.g. server FQDN or YOUR name) []:

  4. Gen CA verification certificate từ CA cert và signing request
      > openssl genrsa -out privateKeyVerification.key 2048

      > openssl x509 -req -in privateKeyVerification.csr -CA sampleCACertificate.pem -CAkey sampleCACertificate.key -CAcreateserial -out privateKeyVerification.crt -days 365 -sha256

  5. Đăng kí CA với amz

      * Cẩn 2 file 'sampleCACertificate.pem' ở bước 1 và 'privateKeyVerification.crt' ở bước 4

        > aws iot register-ca-certificate --ca-certificate file://sampleCACertificate.pem --verification-certificate file://privateKeyVerification.crt

  6. Active CA
      * Kiểm tra tồn tại của CA

        > aws iot describe-ca-certificate --certificate-id \<certificateId\>

      * Active

        > aws iot update-ca-certificate --certificate-id \<certificateId\> --new-status ACTIVE

  7. Cung cấp CA private key và certificate cho nhà SX thiết bị:

      * Thông tin aws-iot endpoint hostname

        > ${accountArn}-ats.iot.${AWS_REGION}.amazonaws.com

      * certificate
    
        > sampleCACertificate.key

        > sampleCACertificate.pem

  8. Active device certificate:

      * Sau khi thiết bị tự đông đăng kí device certificate với amz, certificate này sẽ ở trạng thái chờ (pending)
      * Nhà phát hành cần active certificate để thiết bị hoạt động bình thường
        > aws iot update-certificate --certificate-id \<certificateId\> --new-status ACTIVE

# Nhà Cung cấp thiết bị (iot-device)

  * Có trách nhiệm đăng kí device certificate (sử dung CA của nhà phát hành) với aws-iot

  1. Gen device certificate

      > openssl genrsa -out deviceCert.key 2048

      > openssl req -new -key deviceCert.key -out deviceCert.csr

      > openssl x509 -req -in deviceCert.csr -CA sampleCACertificate.pem -CAkey sampleCACertificate.key -CAcreateserial -out deviceCert.crt -days 36500 -sha256

  2. Đăng kí certificate với amz

      > cat deviceCert.crt sampleCACertificate.pem > deviceCertAndCACert.crt

      * Auto reconnect tới aws-iot sử dụng certificate (deviceCertAndCACert.crt) và root CA cung cấp bới amz cho tới khi nào certificate được đăng kí thành công (connected)
        > mosquitto_pub --cafile root.cert --cert deviceCertAndCACert.crt --key deviceCert.key -h ${accountArn}-ats.iot.${AWS_REGION}.amazonaws.com -p 8883 -q 1 -t  foo/bar -i  anyclientID --tls-version tlsv1.2 -m "Hello" -d