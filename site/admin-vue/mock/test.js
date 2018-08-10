const postTest = (req, res) => {
  const data = {
    postData: {
      a: 1,
      b: 2
    }
  }
  return res.json(data)
}

module.exports = {
  postTest
}
