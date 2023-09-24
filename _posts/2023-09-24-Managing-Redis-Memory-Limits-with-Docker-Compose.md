---
layout: post
status: publish
published: true
title: Managing Redis Memory Limits in Docker-Compose
author: Peter Kellner
display_name: Peter Kellner
login: admin
email: peter@peterkellner.net
author_email: peter@peterkellner.net
excerpt: This blog post serves as a comprehensive guide on managing Redis memory limits using a Docker Compose file. It covers the risks of not setting a memory limit—like uncontrolled memory growth and resource contention—as well as the potential downsides of setting one, such as data eviction. The post provides step-by-step instructions to modify the docker-compose.yml file, allowing for memory restrictions, and how to verify that the settings are correctly applied.

---

# Managing Redis Memory Limits in Docker-Compose

## Introduction

As microservices architecture gains more popularity, managing individual components becomes more challenging, particularly when it comes to resource constraints like memory utilization. One of the most commonly used caching databases, Redis, can quickly consume a lot of memory if not managed properly. This article aims to guide you through setting up a Redis memory limit using a Docker Compose file.

## The Risks of Not Setting a Memory Limit

### Uncontrolled Memory Growth

Without setting memory limits, Redis will consume as much memory as it can, potentially leading to system-level issues such as running out of memory. This could trigger the infamous Linux OOM (Out of Memory) Killer, affecting other services running on the same host.

### Resource Contention

The lack of memory restrictions may result in resource contention, leading to degraded performance across all services utilizing that system’s resources.

## The Risks of Setting a Memory Limit

### Data Eviction

Setting a limit could cause Redis to evict data to stay within the set memory size. Depending on your eviction policy, this can cause unexpected application behavior or performance hits.

### Fragmentation

Another risk is memory fragmentation, which may require the Redis instance to use more memory than what you've set as the limit, affecting its operational capabilities.

## The Original Docker Compose File

Here's the original `docker-compose.yml` file:

```yaml
networks:
  web:
    external: true

volumes:
  redis-data:

services:
  redis:
    image: redis:latest
    restart: always
    expose:
      - 6379
    command: ["redis-server", "--appendonly", "no"]
    hostname: redis
    networks:
      - web
    volumes:
      - redis-data:/data
```

## Setting Memory Limits

You can easily set Redis memory limits by appending `--maxmemory` and `--maxmemory-policy` to the `command` field in the `docker-compose.yml` file.

### Updated Docker Compose File

Here's the fully updated `docker-compose.yml` file:

```yaml
networks:
  web:
    external: true

volumes:
  redis-data:

services:
  redis:
    image: redis:latest
    restart: always
    expose:
      - 6379
    command: ["redis-server", "--appendonly", "no", "--maxmemory", "500mb", "--maxmemory-policy", "allkeys-lru"]
    hostname: redis
    networks:
      - web
    volumes:
      - redis-data:/data
```

## Verifying The Settings

To ensure that the settings are applied correctly, exec into the Redis Docker container:

```bash
docker exec -it <container_id_or_name> sh
```

Then, access the Redis CLI:

```bash
redis-cli
```

Finally, execute the following command:

```bash
CONFIG GET maxmemory
```

If the settings have been applied correctly, you will see the memory limit, represented in bytes (e.g., `524288000` for 500MB).

## What Does `--maxmemory` Limit? RAM or Disk Space?

A common query that arises is whether the `--maxmemory` option controls the computer's RAM or the amount of disk space Redis can write to. The `--maxmemory` configuration specifically targets Redis's in-memory data store, meaning it controls the RAM usage, not the disk space.

### RAM vs Disk Space:

* **RAM**: Redis keeps its dataset in RAM. When you set a `--maxmemory` limit, you're limiting how much RAM Redis can use to store its dataset. When this limit is reached, the eviction policy (`--maxmemory-policy`) kicks in to remove some keys and make space for new ones.

* **Disk Space**: The disk space is used when Redis persistence features like RDB snapshots or AOF log files are enabled. In your Docker Compose configuration, you've set `--appendonly no`, which means you're not using AOF persistence. Therefore, disk space isn't a primary concern in this setup.


Setting a memory limit helps manage RAM utilization, ensuring Redis doesn't consume all available memory, which could lead to system instability or crashes. However, this doesn't impact how much disk space Redis can use for persistence. Disk space would be a separate constraint you'd have to manage, usually at the Docker volume or filesystem level.

## Conclusion

Managing memory in Redis, particularly when running in a containerized environment, is essential for system health and service reliability. While setting a memory limit introduces its own risks, like data eviction and fragmentation, the consequences of not setting any limits are often more severe, such as system crashes and service interruptions. Therefore, it's crucial to find a balance based on your application’s needs.