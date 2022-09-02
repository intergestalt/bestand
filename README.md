## WARNING: Do not commit to master branch unless you rebuild the admin system at the same time

otherwise all changes made in admin will fail *silently* (that's not done well in TinaCMS) and changes won't be saved.

DO CHANGE README ON THE FLY OR ANYTHING LIKE THAT. WILL BREAK THE SYSTEM AND LEAD TO LOSS OF DATA.

## HOW TO COMMIT

Rule 1: Push to dev

Rule 2: To release a new version, ssh into intergestalt-cloud first. Then, start the rebuild script. It will prompt you to do add your commits to master branch. Do so by merging dev into master. Let the script continue.

Rule 3: Check if the commits are in sync. On intergestalt-cloud: `docker exec bestand-admin.web.1 git rev-parse HEAD` compare to latest master commit in github.

### ENV
```
GIT_REMOTE no effect
SSH_KEY
GIT_AUTHOR_EMAIL
GIT_AUTHOR_NAME
TINA_CEE - This needs to be set to ensure that Tina knows that it is being run in a Cloud Editing Environment (?)
```

source: https://tinacms.org/blog/using-tinacms-on-gatsby-cloud


### docker

```
docker build --tag bestand:latest .
docker run -it --env GIT_REMOTE=git@github.com:intergestalt/bestand.git --env GIT_AUTHOR_EMAIL=hi@intergestalt.info --env SSH_KEY=$( cat ~/.ssh/id_rsa | base64)  --env GIT_AUTHOR_NAME=HH --env TINA_CEE=true --rm -p 8000:8000 bestand:latest develop

docker run -it --rm -p 8000:8000 bestand:latest serve

docker run -it --env GIT_REMOTE=git@github.com:intergestalt/bestand.git --env GIT_AUTHOR_EMAIL=hi@intergestalt.info --env SSH_KEY=$( cat ~/.ssh/id_rsa | base64)  --env GIT_AUTHOR_NAME=HH --env TINA_CEE=true --rm -p 8000:8000 -p 8001:8001 bestand:latest both

```

Based on **Tina Grande** 
