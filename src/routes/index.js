import catRouter from './cat.route.js';
import posts from './posts.route.js';
import crawler from './crawler.route.js';

function routes(app) {
    
    app.use('/crawling',crawler);
    app.use('/post', posts);
    app.use('/cat', catRouter);
       
}
export default routes; 
