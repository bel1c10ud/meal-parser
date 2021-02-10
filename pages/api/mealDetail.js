import axios from 'axios';
import cheerio from 'cheerio';

export default (req, res) => {
  const mid = req.query.id === undefined ? 618168 : req.query.id;

  axios({
    method: 'POST',
    url: '/dggb/module/mlsv/selectMlsvDetailPopup.do',
    baseURL : 'http://sunrint.hs.kr',
    data: 'mlsvId=' + mid
  })
    .then(response => {
      const $ = cheerio.load(response.data);

      let menuArray;
      const menuString = 
      $('#detailFrm  > table > tbody > tr > td').eq(3).html().trim()
      .replace(/(&amp;)/ig, "&")
      .replace(/\s&/ig, "&") // 1406939 로제소스스파게티 &미트볼
      ;
      
      if(menuString.includes('\n')) {
        menuArray = menuString.split('\n');
      } else {
        menuArray = menuString.split(',');
      }
      
      const toJson = {
        id: Number(mid),
        type: $('#detailFrm  > table > tbody > tr > td').eq(0).html().trim(),
        date: $('#detailFrm  > table > tbody > tr > td').eq(1).html(),
        title: $('#detailFrm  > table > tbody > tr > td').eq(2).html().trim(),
        menu: menuArray,
        calorie: $('#detailFrm  > table > tbody > tr > td').eq(4).html(),
        image: $('#detailFrm  > table > tbody > tr > td img').attr('src')
      }
      
      res.json(toJson);
    })
    .catch(error => {
      res.statusCode = 200;
      res.send(error);
    })
}
