import axios from 'axios';
import cheerio from 'cheerio';
import probe from 'probe-image-size';

export default function(req, res) {
  let mid;

  if(req.query.hasOwnProperty('id')) {
    mid = req.query.id
  } else {
    res.status(400).send({'errorCode': 400});
  }

  axios({
    method: 'POST',
    url: '/dggb/module/mlsv/selectMlsvDetailPopup.do',
    baseURL : process.env.SCHOOL_URL,
    data: 'mlsvId=' + mid
  })
    .then(async response => {
      const $ = cheerio.load(response.data);

      const mealType = $('#detailFrm  > table > tbody > tr > td').eq(0).html().trim();
      const mealDate = $('#detailFrm  > table > tbody > tr > td').eq(1).html()
      .replace(/일|(월|화|수|목|금)요일/ig, '')
      .replace(/년|월/ig, '-')
      .replace(/\s/ig,'')+"T00:00:00+09:00";
      const mealTitle = $('#detailFrm  > table > tbody > tr > td').eq(2).html().trim();
      const menuString = 
      $('#detailFrm  > table > tbody > tr > td').eq(3).html().trim()
      .replace(/(&amp;)/ig, "&")
      .replace(/\s&/ig, "&") // 1406939 로제소스스파게티 &미트볼
      ;
      const mealCalorie = $('#detailFrm  > table > tbody > tr > td').eq(4).html();

      // not found meal
      if(mealType === "") {
        res.status(404).json({'errorCode': 404});
      }

    // post process

      // menu string split
      let menuArray;

      if(menuString.includes('\n')) {
        menuArray = menuString.split('\n');
      } else {
        menuArray = menuString.split(',');
      }

      // image size
      let imageInfo = {};
      
      if($('#detailFrm  > table > tbody > tr > td img').attr('src')) {
        imageInfo = await probe(process.env.SCHOOL_URL + $('#detailFrm  > table > tbody > tr > td img').attr('src'));
      }

      const toJson = {
        id: Number(mid),
        type: mealType,
        date: mealDate,
        title: mealTitle,
        menu: menuArray,
        calorie: mealCalorie,
        image: { 
          'url' : imageInfo.url,
          'width' : imageInfo.width, 
          'height' : imageInfo.height
        },
      }
      
      res.json(toJson);
    })
    .catch(error => {
      res.status(404).send([{'errorCode': 404}, {'error': error}])
    })
}
