## Start Project

- For start this project, you can run:

```
docker compose up --build
```

- After build Docker, you can access this link to handle pygeoapi: _http://localhost:5050_
- pygeoapi already support Swagger document: _http://localhost:5050/openapi?f=html_

## Add new Process in pygeoapi

- Create new file handle new process in process folder.
- Declare this process in the plugin.py file.

```
    'process': {
        ...
        'Validation' : 'pygeoapi.process.validation.ValidationProcessor',
        ...
    },
```

- Declare this process in the pygeoapi-config.yml file.

```
    validation:
        type: process
        processor:
            name: Validation
```

- You can refer to this post:
  _https://medium.com/geobeyond/create-ogc-processes-in-pygeoapi-11c0f7d3be61_

## Validation Process

- In this source, I already add new process for handle validation task.
- This process is written based on the <b>validation.py</b> file
- You can test this process on Swagger document

  ![validation process](./images/valdation_process.png "Text to show on mouseover")
