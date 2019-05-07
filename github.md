# Github

Tài liệu hướng dẫn sử dụng github deploy key

# Deploy key

> Khi project ở trạng thái private thì cách tốt nhất để  push là sử dụng ssh key

  1. Tạo ssh key (linux, osx, hoặc WSL cho windows)

      Lưu ý đăt tên cho file khi được hỏi "Enter file in which to save the key"
      > ssh-keygen -t rsa -b 4096 -C "username@email"
      Kết quả được 1 private key và 1 public key .pub

  2. Đăng ki ssh key với github
      > github.com > settings > Deploy key > Add deploy key

      Mở file chứa private key = text editor copy vào khung, check option "Allow write access" > add key

  3. Push bằng ssh key

      Copy private key vào trong thư mục chứa project (cần thêm tên file vào .gitignore)

      Add remote repo(sử dụng git url, not https) VD:

      > git remote add origin git@github.com:vinhlq/mht-zigbee-docs.git

      Push:
      > chmod 400 private.pem\
      GIT_SSH_COMMAND='ssh -i private.pem' git push origin master

      Hoặc tạo bash file wrap command git:
      > #!/bin/sh\
      chmod 400 private.pem\
      GIT_SSH_COMMAND='ssh -i ssh.rsa.pem' git $@

  4. Chia sẻ ssh key khi share project
    
