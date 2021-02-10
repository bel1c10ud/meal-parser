import axios from 'axios';
import cheerio from 'cheerio';

export default (req, res) => {
  let year, month;

  if(req.query.year !== undefined && req.query.month !== undefined) {
    if(req.query.year.length == 4 && (Number(req.query.month) <= 12 && Number(req.query.month) >= 1)) {
      year = req.query.year;
      month = req.query.month;
    } else {
      res.json([]); // year 4자리, month 1~12를 충족하지 않으면 빈배열 반환
    }
  } else { // query 없이 요청이 오면
    res.json([]); // 빈배열
  }

  axios({
    method: 'POST',
    url: '/65129/subMenu.do',
    baseURL: 'http://sunrint.hs.kr',
    data: 
    'viewType=calendar'
    +'&siteId=SEI_00000964'
    +'&arrMlsvId=0'
    +'&srhMlsvYear=' + year
    +'&srhMlsvMonth=' + month
  }).then(response => {
    const $ = cheerio.load(response.data);

    let array = $('.calendar_schedule td').map(function (i, el) {
      let ob = {};
      let itemDate = new Date(`${year}-${month}-${$(this).text().trim().split('\n')[0]}`);
      ob.id = i;
      ob.date = `${year}-${month}-${$(this).text().trim().split('\n')[0]}-${itemDate.getDay()}`;
      ob.mealArray = $(this).find('ul a').map(function (i, el) {
        let ob = {};
        ob.id = $(this).attr('onclick').split(`'`)[1];
        ob.title = $(this).text();
        return ob
      }).get();
      return ob
    })
    .get();

    res.json(array);
  }).catch(error => {

  })
}