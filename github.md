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

      Mở file chứa public key = text editor copy vào khung, check option "Allow write access" > add key

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
    
## Pull request

  * NGười nằm trong nhóm collaborator có thể push trực tiếp, lưu ý là cần push đến 1 branch khác master và tạo pull request trên github.com

  * Với trường họp không người dùng không nằm trong nhóm collaborator

    1. Tạo deploy key

    2. Gửi public key cho chủ sở hữu repository

    3. Chủ sở hữu thêm public key vào deploy key

    4. Tạo pull request

        * clone project

          > GIT_SSH_COMMAND='ssh -i private.pem' git clone <git_url>

        * push đến 1 branch khác master

          > GIT_SSH_COMMAND='ssh -i private.pem' git push origin <branch_name>

        * Tạo pull request:

          Sử dụng url

          > https://github.com/vinhlq/<repo_name>/pull/new/<branch_name>

          VD:

          > https://github.com/vinhlq/mht-zigbee-gateway-js/pull/new/mht.vn

        * Chủ sở hữu merge request vào master