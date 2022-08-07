FROM amazonlinux:2

WORKDIR /srv

RUN yum -y install jq unzip tar gzip
RUN cd /tmp; \
    curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"; \
    unzip awscliv2.zip; \
    ./aws/install

RUN touch ~/.bashrc && chmod +x ~/.bashrc
RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.39.1/install.sh | bash
RUN source ~/.bashrc && nvm install --lts