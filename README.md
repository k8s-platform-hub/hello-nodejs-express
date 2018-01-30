[**Express.js**](http://expressjs.com) is a Fast, unopinionated, minimalist web framework for node.

## What does this come with?

* Express.js Hello World
* Deployed with node server
* **Dockerfile** (automatically used by Hasura for deployment)

```
FROM mhart/alpine-node:7.6.0

WORKDIR /src

ADD src/package.json /src/
#install node modules
RUN npm install

# Add app source files
ADD src /src

CMD ["node", "server.js"]
```

## Deployment instructions

### Basic deployment:

* Press the **Clone & Deploy** button and follow the instructions.
* The `hasura quickstart` command clones the project repository to your local computer, and also creates a **free Hasura cluster**, where the project will be hosted for free.
* A git remote (called hasura) is created and initialized with your project directory.
* Run `git add .`, `git commit`, and `git push hasura master`.
* Run the below command to open your deployed express.js app.
``` shell
$ hasura microservice open api
```

### Making changes and deploying

* To make changes to the project, browse to `/microservices/api/src` and edit the `server.js` file in according to your app.
* Commit the changes, and perform `git push hasura master` to deploy the changes.

## Local development

To test and make changes to this app locally, follow the below instructions.
* Open Terminal and `cd` into the project folder
* Run `npm install` to install all the project dependencies
* Run `npm start` in the terminal to run it.
* Make changes to the app, and see the changes in the browser

## View server logs

You can view the logs emitted by the node server by running the below command:

``` shell
$ hasura microservice logs api
```
You can see the logs in your terminal, press `CTRL + C` to stop logging.

## Managing app dependencies

* System dependencies, like changing the web-server can be made in the Dockerfile
* npm/yarn deps can be managed by editing **package.json**.

If changes have been done to the dependencies, `git commit`, and perform `git push hasura master` to deploy the changes.

## Migrating your existing express.js app

* If you have an existing express.js app which you would like to deploy, replace the code inside `/microservices/api/src/` according to your app.
* You may need to modify the Dockerfile if your `package.json` or the build directory location has changed, but in most cases, it won't be required.
* Commit, and run `git push hasura master` to deploy your app.

## Adding backend features

Hasura comes with BaaS APIs to make it easy to add backend features to your apps.

### Add instant authentication via Hasura’s web UI kit

Every project comes with an Authentication kit, you can restrict the access to your app to specific user roles.
It comes with a UI for Signup and Login pages out of the box, which takes care of user registration and signing in.

![Auth UI](https://docs.hasura.io/0.15/_images/uikit-dark.png)

Follow the [Authorization docs](https://docs.hasura.io/0.15/manual/users/uikit.html) to add Authentication kit to your app.

### Add a custom API

Hasura project is composed of a set of microservices. These include certain Hasura microservices like postgres, nginx, data API, auth API and more but can also include your own microservices.

* Check out docs on adding another microservice [Adding Microservice](https://docs.hasura.io/0.15/manual/custom-microservices/index.html)

### Hasura API console

Every Hasura cluster comes with an api console that gives you a GUI to test out the BaaS features of Hasura. To open the api console

```sh
$ hasura api-console
```


### Add data APIs

Hasura comes with set of Data APIs to access the Postgres database which comes bundled with every Hasura cluster.
Detailed docs of data APIs can be found [here](https://docs.hasura.io/0.15/manual/data/index.html).

This quickstart app comes with two pre-created tables `author` and `article`.

**author**

column | type
--- | ---
id | integer NOT NULL *primary key*
name | text NOT NULL

**article**

column | type
--- | ---
id | serial NOT NULL *primary key*
title | text NOT NULL
content | text NOT NULL
rating | numeric NOT NULL
author_id | integer NOT NULL

Alternatively, you can also view the schema for these tables on the api console by heading over to the tab named `data` as shown in the screenshots below.

![alt text][data1]
![alt text][data2]

This means that you can now leverage the Hasura data queries to perform CRUD operations on these tables.

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

To learn more about the data apis, head over to our [docs](https://docs.hasura.io/0.15/manual/data/index.html)

### Filestore APIs

Sometimes, you would want to upload some files to the cloud. This can range from a profile pic for your user or images for things listed on your app. You can securely add, remove, manage, update files such as pictures, videos, documents using Hasura filestore.

You can try out these in the `API EXPLORER` tab of the `api console`. To learn more, check out our [docs](https://docs.hasura.io/0.15/manual/users/index.html)
