import fetch from "node-fetch";
import cheerio from "cheerio";
import https from 'https';

const crawleraPage = (url) => {
    https.get('https://vietnambiz.vn/chung-khoan.html',(resp) => {
        let data = '';
        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });
        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            console.log(JSON.parse(data).explanation);
        });
    }).on('error',(err) => {
        console.log('error:',  err.message )
    })
   /* return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      // Read the response as json.
      
      return response.text();
    });*/
  }
function crawlerPageSite ({site,catlink, pagination}){
    return new Promise((resolve, reject)=> {
        let html = crawleraPage(`${site}${catlink}`)
        .then(pageContent => {
            const chee = cheerio.load(pageContent);
            let pagTemp = chee(pagination);           
            let last = pagTemp.filter((i, item) => {
                return i == pagTemp.length - 2
            });
            let lastClass = last.attr('class');
            if (lastClass != 'active') {
                let link = last.attr('href');
                console.log(site, 
                    link,
                    pagination)
                return crawlerPageSite({
                    site, 
                    catlink:link,
                    pagination
                })
            } else {
                
                resovle({
                    pageLink: last.attr('href'),
                    number: last.text()
                });
            }
            
        }) 
    }).then(result => result)
}
export { crawleraPage };
export default crawlerPageSite;
