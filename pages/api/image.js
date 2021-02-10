import axios from 'axios';

export default (req, res) => {
    const originURL = req.query.url ? req.query.url : null;

    if(originURL === null) {
      return res.json([]);
    }

    axios({
      method: 'get',
      url: decodeURIComponent(originURL),
      responseType: 'stream'
    }).then(response => {
      let image = response.data;
      res.setHeader('Content-Type', 'image/jpg;charset=UTF-8')
      res.send(image);
    }).catch(error => {
      res.statusCode = 200;
      res.send(error);
    });
} 