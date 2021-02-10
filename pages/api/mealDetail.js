import axios from 'axios';
import cheerio from 'cheerio';
import probe from 'probe-image-size';

export default function(req, res) {
  const mid = req.query.id === undefined ? 618168 : req.query.id;

  axios({
    method: 'POST',
    url: '/dggb/module/mlsv/selectMlsvDetailPopup.do',
    baseURL : 'http://sunrint.hs.kr',
    data: 'mlsvId=' + mid
  })
    .then(async response => {
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

      let imageInfo = {};
      
      if($('#detailFrm  > table > tbody > tr > td img').attr('src')) {
        imageInfo = await probe('http://sunrint.hs.kr' + $('#detailFrm  > table > tbody > tr > td img').attr('src'));
      }

      const toJson = {
        id: Number(mid),
        type: $('#detailFrm  > table > tbody > tr > td').eq(0).html().trim(),
        date: $('#detailFrm  > table > tbody > tr > td').eq(1).html()
        .replace(/일|(월|화|수|목|금)요일/ig, '')
        .replace(/년|월/ig, '-')
        .replace(/\s/ig,'')+"T00:00:00+09:00"
        ,
        title: $('#detailFrm  > table > tbody > tr > td').eq(2).html().trim(),
        menu: menuArray,
        calorie: $('#detailFrm  > table > tbody > tr > td').eq(4).html(),
        image: { 
          'url' : imageInfo.url,
          'width' : imageInfo.width, 
          'height' : imageInfo.height
        },
      }
      
      res.json(toJson);
    })
    .catch(error => {
      res.statusCode = 200;
      res.send(error);
    })
}
