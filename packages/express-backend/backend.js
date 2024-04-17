// backend.js
import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

const users = {
    users_list: [
        {
            id: "xyz789",
            name: "Charlie",
            job: "Janitor"
        },
        {
            id: "abc123",
            name: "Mac",
            job: "Bouncer"
        },
        {
            id: "ppp222",
            name: "Mac",
            job: "Professor"
        },
        {
            id: "yat999",
            name: "Dee",
            job: "Aspring actress"
        },
        {
            id: "zap555",
            name: "Dennis",
            job: "Bartender"
        }
    ]
};

app.use(cors());
app.use(express.json());

const findUserByName = (name, job) => {
    if (job !== undefined && name !== undefined){
      return users["users_list"].filter(
        (user) => user["name"] === name && user["job"] === job
      );
    }else if(job === undefined){
      return users["users_list"].filter(
        (user) => user["name"] === name
      );
    }
    else{
      return users["users_list"].filter(
        (user) => user["job"] === job
      );
    }
  };  

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  if (name != undefined || job != undefined) {
    let result = findUserByName(name, job);
    result = { users_list: result };
    res.send(result);
  } else {
    res.send(users);
  }
});

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

const deleteUser = (id) => {
  for (let i = 0; i < users["users_list"].length; i++){
    if (users["users_list"][i].id === id){
      users["users_list"].splice(i, 1)
      return true
    }
  }
  return false
};
app.delete("/users/:id", (req, res) => {
  const id = req.params["id"];
  let result = deleteUser(id)
  if (!result){
    res.status(404).send("Resource not found.")
  } else{
    res.send()
  }
})

const addID = (user) => {
  user.id = Math.floor(Math.random()*100000);
  return user;
}
const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  console.log(userToAdd)
  addUser(addID(userToAdd));
  console.log(userToAdd);
  res.status(201).send(userToAdd);
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});
