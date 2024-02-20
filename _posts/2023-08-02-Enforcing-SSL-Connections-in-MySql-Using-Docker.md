---
layout: post
status: publish
published: true
title: Enforcing SSL Connections in MySQL using Docker
author: Peter Kellner
display_name: Peter Kellner
login: admin
email: peter@peterkellner.net
author_email: peter@peterkellner.net
excerpt: In this guide, we secure a MySQL server to accept only SSL connections, minimizing the risk of data exposure. This setup ensures our apps connect securely, protecting sensitive data. By focusing on database connection security, we take a crucial step towards building trusted applications.

---
# Enforcing Encrypted Connections in MySQL with Docker

Today I want to dig deep into a topic that often doesn't get enough attention: securing MySQL connections in Docker. Now, when I say securing, I don't mean merely protecting with passwords or setting user access controls - although these are indeed important. I'm talking about safeguarding data in transit, shielding it from potential eavesdropping by encrypting the connections with our MySQL server.

The risk of data exposure due to insecure connections is not insignificant. Many applications, if not configured properly, might default to unencrypted connections to the database. This risk is amplified when these applications are in the public realm, potentially exposing user credentials. So, it's critical to set up our MySQL server in such a way that it only permits secure SSL connections. Doing so reduces the chances of our applications inadvertently connecting insecurely.

Throughout this tutorial, we will journey through the steps to configure a Docker-based MySQL server to strictly accept SSL encrypted connections.

## Setting Up the Basics - A Simple MySQL Docker-Compose File

First, let's kick things off with a simple docker-compose file for a MySQL server:

```yaml
version: "3.9"

services:
  mysql:
    image: mysql:8.0
    volumes:
      - ./data:/var/lib/mysql
    environment:
      - MYSQL_ROOT_PASSWORD=Abc123abc
      - MYSQL_DATABASE=mydb
      - MYSQL_USER=user1
      - MYSQL_PASSWORD=abc123
    ports:
      - 3306:3306
```

This file is pretty basic. We are setting up a MySQL server with the image of MySQL version 8.0. We map our local directory `./data` to the directory `/var/lib/mysql` inside the container, where the MySQL server stores the database files.

## Implementing SSL Encryption

We're now going to adapt this docker-compose file to incorporate SSL encryption. This will involve creating SSL certificates and altering the MySQL service to use these certificates.

```yaml
version: "3.9"

services:
  mysql:
    image: mysql:8.0
    volumes:
      - ./data:/var/lib/mysql
      - ./certs:/etc/mysql/certs
    environment:
      - MYSQL_ROOT_PASSWORD=Abc123
      - MYSQL_DATABASE=test
      - MYSQL_USER=test
      - MYSQL_PASSWORD=test
    command:
      - --ssl-ca=/etc/mysql/certs/ca.crt
      - --ssl-cert=/etc/mysql/certs/mysql.crt
      - --ssl-key=/etc/mysql/certs/mysql.key
      - --ssl=1
      - --bind-address=0.0.0.0
    ports:
      - 3306:3306

  cert-gen:
    image: alpine
    volumes:
      - ./certs:/certs
    entrypoint:
      - /bin/sh
      - -c
      - |
        apk add --no-cache openssl &&
        openssl genpkey -algorithm RSA -out /certs/mysql.key -pkeyopt rsa_keygen_bits:2048 &&
        openssl req -new -key /certs/mysql.key -out /certs/mysql.csr -subj "/CN=mysql/O=myorg/C=US" &&
        openssl x509 -req -in /certs/mysql.csr -signkey /certs/mysql.key -out /certs/mysql.crt -days 365 &&
        openssl genpkey -algorithm RSA -out /certs/ca.key -pkeyopt rsa_keygen_bits:2048 &&
        openssl req -new -x509 -key /certs/ca.key -out /certs/ca.crt -days 1095 -subj "/CN=Certificate Authority/O=myorg/C=US" &&
        chmod 600 /certs/* && chown 999:999 /certs/*
    restart: "no"
```

### The 'mysql' Service Transformation

There are quite a few changes to the 'mysql' service. Notably, an additional volume mapping has been introduced. Our local directory `./certs` is now mounted to the directory `/etc/mysql/certs` inside the container. This is where the SSL certificates will be stored.

Furthermore, we've appended several command-line parameters to the service configuration to enable and configure SSL:

* `--ssl-ca`, `--ssl-cert`, and `--ssl-key` are used to point the MySQL server to the Certificate Authority (CA) certificate, the server certificate, and the server private key, respectively. These files will be located in the `/etc/mysql/certs` directory in the container.
* `--ssl=1` is an explicit directive to the MySQL server to enable SSL for all incoming MySQL connections.
* `--bind-address=0.0.0.0` is added to make the MySQL server accessible from any host.

### The Birth of 'cert-gen' Service

The 'cert-gen' service is a new addition. It's a transient service whose sole purpose is to generate the SSL certificates required for our MySQL server. We chose to base this service on an alpine image because it's lightweight and well-suited for this temporary task.

This service mounts the same `./certs` directory (as in the 'mysql' service) to `/certs` in the container. This allows it to place the generated certificates directly into the directory that will be accessed by the 'mysql' service.

The entrypoint here is essentially a shell script with a defined sequence of actions:

1. It starts by installing OpenSSL. OpenSSL is a robust, open-source library that provides cryptographic functionality, including generating SSL certificates.
2. It then generates a new private key for the MySQL server.
3. Following this, it creates a certificate signing request (CSR) for the server.
4. The CSR is signed with the server's private key to generate a self-signed certificate.
5. A new private key for the Certificate Authority (CA) is then created.
6. Subsequently, it creates a self-signed CA certificate.
7. Finally, it modifies the permissions and ownership of the certificates. This step is necessary because the MySQL process in the MySQL container runs as the MySQL user (UID 999), and thus needs the appropriate permissions to read the certificates.

The `restart: "no"` directive is there to ensure this service doesn't restart if it exits successfully. Once the certificates have been created, this service has completed its mission and is no longer needed.

**Note:** In this tutorial, we're creating self-signed certificates for illustrative purposes. In a production environment, you would use certificates issued by a trusted certificate authority.

## Conclusion

Enforcing secure connections to your MySQL server is a paramount step in your overall security strategy. It diminishes the likelihood of your applications inadvertently connecting insecurely, hence adding an additional layer of protection for sensitive data. I hope this tutorial imparts a clear understanding of how to set up your Docker-based MySQL server to accept only secure SSL connections. Bear in mind, every bit of security counts when it comes to dealing with user data.

A final note, the SSL certificates are still stored on a local volume after the Docker containers have been shut down. They should be handled with the same care you'd accord to any other sensitive data.

You've now successfully established a MySQL server that exclusively accepts secure SSL connections. Congratulations on this achievement and enhancing your database security! As developers, it's our duty to ensure we're doing our part to keep user data safe.
