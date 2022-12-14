const users = [
  {
    id: 1,
    name: "Rebekah Johnson",
    email: "Glover12345@gmail.com",
    password: "123qwe",
  },
  {
    id: 2,
    name: "Fabian Predovic",
    email: "Connell29@gmail.com",
    password: "password",
  },
];

let posts = [
  {
    id: 1,
    title: "간단한 HTTP API 개발 시작!",
    content: "Node.js에 내장되어 있는 http 모듈을 사용해서 HTTP server를 구현.",
    userId: 1,
  },
  {
    id: 2,
    title: "HTTP의 특성",
    content: "Request/Response와 Stateless!!",
    userId: 1,
  },
];

const createUser = (req, res) => {

  //const user = req.body.userInfo // 프론트에서 받아온 정보(새로 입력하는 정보를 가져옵니다.
  const { id, name, email, password } = req.body.userInfo

  //console.log('request body', req.body)
  //console.log(user)

  // users.push({
  //   id: user.id,
  //   name: user.name,
  //   email: user.email,
  //   password: user.password
  // })

  // users.push({
  //   id: id,
  //   name: name,
  //   email: email,
  //   password: password
  // })

  users.push({ id, name, email, password })
  console.log('after: ', users)

  res.json({ message: "userCreated" })
  // express 덕분에 JSON.stringify 함수를 사용할 필요없이
  // response 객체의 json 메소드를 활용합니다.
}

const createPost = (req, res) => {
  const post = req.body.postInfo // 프론트에서 받아온 정보를 가져옵니다.
  console.log(post)

  posts.push({
    id: post.id,
    title: post.title,
    content: post.content,
    userId: post.userId
  })

  console.log('after: ', posts)

  res.json({ message: "postCreated" })
  // express 덕분에 JSON.stringify 함수를 사용할 필요없이
  // response 객체의 json 메소드를 활용합니다.

}

const getPost = (req, res) => {
  const newPosts = posts.map((post) => {
    const user = users.find((user) => post.userId === user.id)
    return {
      userid: post.userId,
      userName: user.name,
      postingId: post.id,
      postingTitle: post.title,
      postingContent: post.content
    }
  })
  res.json({ data: newPosts })
  //res.json({ data: posts })
};

const modPost = (req, res) => {
  const { id, content } = req.body;

  const post = posts.find((post) => post.id === id);
  post.content = content;
  const user = users.find((user) => post.userId === user.id)
  const newPost = {
    userId: post.userId,
    userName: user.name,
    postingId: post.id,
    postingTitle: post.title,
    postingContent: post.content
  }

  res.json({ data: newPost })
};

const delPost = (req, res) => {
  let { id } = req.query;
  const newId = Number(id);
  const result = posts.filter((post) => post.id !== newId)
  posts = result;

  console.log("deletePosts :", posts)
  res.status(201).json({ message: "postingDeleted" })
}

const userPost = (req, res) => {
  const userId = Number(req.query.userId);
  const userInfo = users.find((user) => user.id === userId)
  const postInfo = posts.filter((post) => post.userId === userId)

  let newPostings = [];

  postInfo.forEach((post) => {
    let tmp = {
      postingId: post.id,
      postingTitle: post.title,
      postingContent: post.content
    };
    newPostings.push(tmp);
  });

  const newUserPost = {
    userID: userId,
    userName: userInfo.name,
    postings: newPostings
  };

  res.json({ data: newUserPost })
}

//포스팅
module.exports = { createUser, createPost, getPost, modPost, delPost, userPost } // routing.js 에서 사용하기 위해 모듈로 내보냅니다.