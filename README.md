# hello-nodejs-express

This quickstart consists of a basic hasura project with a simple  nodejs express app running on it. Once this project is deployed on to a hasura cluster, you will have the nodejs app running at https://api.cluster-name.hasura-app.io

This is the right place to start if you are planning to build or want to learn to build a react app with hasura.

## Sections

* [Introduction](#introduction)
* [Data API](#data-apis)
* [Auth API](#auth-apis)
* [Filestore API](#filestore-apis)
* [Custom service](#custom-service)
* [Migrate from an existing app](#migrate-from-an-existing-app)
* [Local development](#local-development)
* [Project Structure](#project-structure)

## Introduction

This quickstart project comes with the following by default:
1. A basic hasura project
2. Two tables `article` and `author` with some dummy data
3. A basic nodejs-express app which runs on the `api` subdomain.

## Data APIs

Hasura provides ready to use data apis to make powerful data queries on your tables. This means that you have ready-to-use JSON apis on any tables created. The url to be used to make these queries is always of the type: `https://data.cluster-name.hasura-app.io/v1/query` (in this case `https://data.h34-excise98-stg.hasura-app.io`)

As mentioned earlier, this quickstart app comes with two pre-created tables `author` and `article`.

#### author

column | type
--- | ---
id | integer NOT NULL *primary key*
name | text NOT NULL

#### article

column | type
--- | ---
id | serial NOT NULL *primary key*
title | text NOT NULL
content | text NOT NULL
rating | numeric NOT NULL
author_id | integer NOT NULL

Alternatively, you can also view the schema for these tables on the api console by heading over to the tab named `data` as shown in the screenshots below.

![Data schema 1](https://raw.githubusercontent.com/hasura/base/master/assets/data-1.png "Data schema 1")
-------------------------------------------------------------------------------------------------------------------
![Data schema 2](https://raw.githubusercontent.com/hasura/base/master/assets/data-2.png "Data schema 2")

This means that you can now leverage the hasura data queries to perform CRUD operations on these tables.

The nodejs app uses these data apis to show the respective data, to see it in action check out `https://api.cluster-name.hasura-app.io/get_articles` (replace cluster-name with your cluster name) and check out `microservices/api/src/hasuraExamples.js` to see how the calls are being made. You can also check out all the apis provided by Hasura from the api console by heading over to the `API EXPLORER` tab.

For eg, to fetch a list of all articles from the article table, you have to send the following JSON request to the data api endpoint -> `https://data.cluster-name.hasura-app.io/v1/query` (replace `cluster-name` with your cluster name)

```json
{
    "type": "select",
    "args": {
        "table": "article",
        "columns": [
            "id",
            "title",
            "content",
            "rating",
            "author_id"
        ]
    }
}
```

To learn more about the data apis, head over to our [docs](https://docs.hasura-stg.hasura-app.io/0.15/manual/data/index.html)

## Auth APIs

Every app almost always requires some form of authentication. This is useful to identify a user and provide some sort of personalized experience to the user. Hasura provides various types of authentication (username/password, mobile/otp, email/password, Google, Facebook etc).  

You can try out these in the `API EXPLORER` tab of the `api console`. To learn more, check out our [docs](https://docs.hasura-stg.hasura-app.io/0.15/manual/users/index.html)

## Filestore APIs

Sometimes, you would want to upload some files to the cloud. This can range from a profile pic for your user or images for things listed on your app. You can securely add, remove, manage, update files such as pictures, videos, documents using Hasura filestore.

You can try out these in the `API EXPLORER` tab of the `api console`. To learn more, check out our [docs](https://docs.hasura-stg.hasura-app.io/0.15/manual/users/index.html)

## Custom Service

There might be cases where you might want to perform some custom business logic on your apis. For example, sending an email/sms to a user on sign up or sending a push notification to the mobile device when some event happens. For this, you would want to create your own custom service which does these for you on the endpoints that you define.

This quickstart comes with one such custom service written in `nodejs` using the `express` framework. Check it out in action at `https://api.cluster-name.hasura-app.io`.

In case you want to use another language/framework for your custom service. Take a look at our docs to see how you can add a new custom service.

## Migrate from an existing app

If you have an existing nodejs app and would like to migrate it to Hasura:

- Replace the `microservices/api` directory with your app directory.
- Ensure that the structure of the ui directory is

```
api
└─── src
|    Dockerfile
|    k8s.yaml
```

- `cd path-to-hello-nodejs-express/hello-nodejs-express`
- `git add . && git commit -m "Migration Commit"`
- `git push hasura master`

Now your existing app should be running on `https://api.cluster-name.hasura-app.io`

## Local development

Everytime you push, your code will get deployed on a public URL. However, for faster iteration you should locally test your changes.Since we are directly accessing the internal data endpoint (Read more about internal and external endpoints [here](https://docs.hasura.io/0.15/manual/custom-microservices/communicating-between-microservices.html)) in the nodejs-express app. We need to forward our requests to the port at which the data service is running.

```sh
$ hasura forward -s data -n hasura --local-port 6432 --remote-port 8080
$ cd services/api/app
$ ENVIRONMENT=dev npm start
```

## Project structure

### Files and Directories

The project (a.k.a. project directory) has a particular directory structure and it has to be maintained strictly, else `hasura` cli would not work as expected. A representative project is shown below:

```
.
├── hasura.yaml
├── clusters.yaml
├── conf
│   ├── authorized-keys.yaml
│   ├── auth.yaml
│   ├── ci.yaml
│   ├── domains.yaml
│   ├── filestore.yaml
│   ├── gateway.yaml
│   ├── http-directives.conf
│   ├── notify.yaml
│   ├── postgres.yaml
│   ├── routes.yaml
│   └── session-store.yaml
├── migrations/
└── services
    ├── api/
    └── ui/
```

### `hasura.yaml`

This file contains some metadata about the project, namely a name, description and some keywords. Also contains `platformVersion` which says which Hasura platform version is compatible with this project.

### `clusters.yaml`

Info about the clusters added to this project can be found in this file. Each cluster is defined by it's name allotted by Hasura. While adding the cluster to the project you are prompted to give an alias, which is just hasura by default. The `kubeContext` mentions the name of kubernetes context used to access the cluster, which is also managed by hasura. The `config` key denotes the location of cluster's metadata on the cluster itself. This information is parsed and cluster's metadata is appended while conf is rendered. `data` key is for holding custom variables that you can define. A sample `clusters.yaml` file would look like so:

```yaml
- name: h34-ambitious93-stg
  alias: hasura
  kubeContext: h34-ambitious93-stg
  config:
    configmap: controller-conf
    namespace: hasura
  data: null  
```
