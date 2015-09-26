## Website Performance Optimization portfolio project
I approached this project with three primary goals:

1. Practice using and implementing webpage optimization techniques in the context of the provided portfolio and pizza pages.
1. Continue developing my "eye" for visual design.
1. Improve my ability to use bootstrap effectively.

When these goals conflicted with the Nanodegree project goals, I went with my goals. I did not look at this as a work project requiring minimal low-risk changes, when doing a broader refactoring allowed me to better accomplish my primary goals.

### Installation

#### Build - requires node/npm and grunt
1. From inside project directory, run npm install. This should install all required grunt plugins.
1. From inside project directory, run grunt. This should read the files in source/ , run a jshint task on the javascript files in the source directory, minimize them where appropriate, place the minimized files and all images in a deploy/ directory.

#### Run - requires a local web server
1. You have choices; I would recommend pointing the web server to the project directory so you have the option to point your browser to localhost/project/source as well as localhost/project/deploy
1. If you wish to use ngrok to expose the project to pagespeed insights, follow the instructions below. The last I checked, ngrok had a scripting bug that prevented automating ngrok and pagespeed through a grunt script.

### Metrics

#### index.html, project-2048.html, project-mobile.html, project-webperf.html

1.  2015-09-10: Baseline metrics:
Pagespeed Insights for index.html - 27 on mobile, 29 on desktop

1.  Made google analytics async, moved analytics code to bottom of body, and made print.css import say media="print" :
26 on mobile, 29 on desktop (Ha!)

1.  Inlined latin 400/700 fonts:
29 on mobile, 30 on desktop 

1.  Used compressed/minified js, css, and images from google:
84 mobile, 92 desktop

1.  Minified html
84 mobile, 91 desktop

1.  Optimized my local apache using configuration from https://github.com/h5bp/server-configs-apache :
88 mobile, 95 desktop

1.  Inlined style.css:
94 mobile, 96 desktop
Did this for each html file, even though may make more sense to have external css file when it is used by multiple pages
Good enough
2015-09-10 13:17

All 4 html files (index.html, project-2048.hml, project-mobile.html, project-webperf.html) came in over 90 on mobile and desktop.

#### pizza.html

The foundation for my solution is having 3 main layers of the page - movingPizzas, transparent-overlay, and mainContent. I optimized each independently.
I used this article by Paul Irish and Paul Lewis:
[The Pauls](http://www.html5rocks.com/en/tutorials/speed/high-performance-animations/)
on each layer.

1. movingPizzas layer:

* It was clearly unnecessary to have 200 pizzas. I first created a fixed position div with a black background. Then I created a single row of 6 pizzas in col-xs-2 cells directly in the html. I then cloned that row based on the size of the viewport, where each row takes up 256px of vertical space. I tested screens with 3 rows and with 6 rows. This immediately improved the initial page load time (not needed for the project, but what the heck). I also made a small version of the pizza image rather than retrieve a large image then scale it down. Putting the pizza images in bootstrap cells certainly made for more attractive code and it helped me better understand bootstrap (Daniel, our nanodegree guide, also helped a lot with this), but it is not clear that it helped with performance. However, it apparently didn't cause too much harm either. 
* It was unnecessary to calculate the possible phase shifts for each moving pizza, as there were only 5 possible values. So I moved that out of the for loop in updatePosition.
* I used transform=translateX to move the pizzas from their initial position in their cells, as that is more efficient than left. I used the Pauls article from above.
* I used Paul Lewis' code almost verbatim from
[Animations - Debouncing Scrolls](http://www.html5rocks.com/en/tutorials/speed/animations/)
to debounce the scroll events with efficient use of requestAnimationFrame.
* I noticed that composited layer borders were moving every time a pizza moved off screen, triggering a full layer repaint. So I put the will-change:transform attribute on those pizzas, and the paints only happen along the trajectory of the moving pizzas. I did not add and remove will-change with javascript despite the recommendations to do so in the class and on
[CSS will-change](https://dev.opera.com/articles/css-will-change-property/)
because that didn't seem necessary from my testing and it did seem hackish and in violation of separation of code between display and functionality.
* I used getElementsByClassName instead of querySelectorAll throughout, although I was unable to detect any performance difference between the two. I will try to keep both in my arsenal.

This got me well over (under? the good side...) of 60fps on the movingPizzas layer. The actual javascript code is fast (per timing API calls), actually in practice it is probably faster because of the requestAnimationFrame calls. I am a little confused by the jank warnings on Chrome Dev Tools/Timeline under flame view, but all of my actual frames come in much better than 60. I think that means I am appropriately using hardware resources when they are available.

2. transparent-overlay layer:

* It took me a while for the "only element on its layer" rule to sink in before I pulled this layer out. Then the opacity stopped causing slowdown. I used the idea from
[Centering Fixed div](http://stackoverflow.com/questions/3157372/css-horizontal-centering-of-a-fixed-div)
to make it look reasonable.
The scrolling was still on the good side of 60fps after doing this.

3. mainContent layer:

* First I put in the static content and made sure it didn't interfere with the speed of the background animation. A-OK.
* I created all of the random pizzas, and made sure they looked reasonable on the page with all large images. 
* I got rid of most of the superfluous code relating to resizing the pizzas, and made it a simple function with no layout thrashing.
* I added a will-change: content to the pizza size label to prevent some unnecessary repaints.
* Jose (Nanodegree grader) made an excellent point about sacrificing UX in the interest of performance (don't do that). This forced me to use bootstrap-grid, and to load it before loading my (slight) modifications related to margin/border/padding. As best I can tell, the optimized page looks the same as the original. Important point, and good practice.
* I look forward to learning about single page/AJAX sites, which may allow for limiting the scope of some of the layout calls on resize.

And pizza generation javascript code is fast (per timing API), pizza resizing javascript code is fast, and the animation of the resizing is typically in the 30fps range.

## Instructions from Udacity
Your challenge, if you wish to accept it (and we sure hope you will), is to optimize this online portfolio for speed! In particular, optimize the critical rendering path and make this page render as quickly as possible by applying the techniques you've picked up in the [Critical Rendering Path course](https://www.udacity.com/course/ud884).

To get started, check out the repository, inspect the code,

### Getting started

####Part 1: Optimize PageSpeed Insights score for index.html

Some useful tips to help you get started:

1. Check out the repository
1. To inspect the site on your phone, you can run a local server

  ```bash
  $> cd /path/to/your-project-folder
  $> python -m SimpleHTTPServer 8080
  ```

1. Open a browser and visit localhost:8080
1. Download and install [ngrok](https://ngrok.com/) to make your local server accessible remotely.

  ``` bash
  $> cd /path/to/your-project-folder
  $> ngrok 8080
  ```

1. Copy the public URL ngrok gives you and try running it through PageSpeed Insights! Optional: [More on integrating ngrok, Grunt and PageSpeed.](http://www.jamescryer.com/2014/06/12/grunt-pagespeed-and-ngrok-locally-testing/)

Profile, optimize, measure... and then lather, rinse, and repeat. Good luck!

####Part 2: Optimize Frames per Second in pizza.html

To optimize views/pizza.html, you will need to modify views/js/main.js until your frames per second rate is 60 fps or higher. You will find instructive comments in main.js. 

You might find the FPS Counter/HUD Display useful in Chrome developer tools described here: [Chrome Dev Tools tips-and-tricks](https://developer.chrome.com/devtools/docs/tips-and-tricks).

### Optimization Tips and Tricks
* [Optimizing Performance](https://developers.google.com/web/fundamentals/performance/ "web performance")
* [Analyzing the Critical Rendering Path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/analyzing-crp.html "analyzing crp")
* [Optimizing the Critical Rendering Path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/optimizing-critical-rendering-path.html "optimize the crp!")
* [Avoiding Rendering Blocking CSS](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/render-blocking-css.html "render blocking css")
* [Optimizing JavaScript](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/adding-interactivity-with-javascript.html "javascript")
* [Measuring with Navigation Timing](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/measure-crp.html "nav timing api"). We didn't cover the Navigation Timing API in the first two lessons but it's an incredibly useful tool for automated page profiling. I highly recommend reading.
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/eliminate-downloads.html">The fewer the downloads, the better</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer.html">Reduce the size of text</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/image-optimization.html">Optimize images</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching.html">HTTP caching</a>

### Customization with Bootstrap
The portfolio was built on Twitter's <a href="http://getbootstrap.com/">Bootstrap</a> framework. All custom styles are in `dist/css/portfolio.css` in the portfolio repo.

* <a href="http://getbootstrap.com/css/">Bootstrap's CSS Classes</a>
* <a href="http://getbootstrap.com/components/">Bootstrap's Components</a>

### Sample Portfolios

Feeling uninspired by the portfolio? Here's a list of cool portfolios I found after a few minutes of Googling.

* <a href="http://www.reddit.com/r/webdev/comments/280qkr/would_anybody_like_to_post_their_portfolio_site/">A great discussion about portfolios on reddit</a>
* <a href="http://ianlunn.co.uk/">http://ianlunn.co.uk/</a>
* <a href="http://www.adhamdannaway.com/portfolio">http://www.adhamdannaway.com/portfolio</a>
* <a href="http://www.timboelaars.nl/">http://www.timboelaars.nl/</a>
* <a href="http://futoryan.prosite.com/">http://futoryan.prosite.com/</a>
* <a href="http://playonpixels.prosite.com/21591/projects">http://playonpixels.prosite.com/21591/projects</a>
* <a href="http://colintrenter.prosite.com/">http://colintrenter.prosite.com/</a>
* <a href="http://calebmorris.prosite.com/">http://calebmorris.prosite.com/</a>
* <a href="http://www.cullywright.com/">http://www.cullywright.com/</a>
* <a href="http://yourjustlucky.com/">http://yourjustlucky.com/</a>
* <a href="http://nicoledominguez.com/portfolio/">http://nicoledominguez.com/portfolio/</a>
* <a href="http://www.roxannecook.com/">http://www.roxannecook.com/</a>
* <a href="http://www.84colors.com/portfolio.html">http://www.84colors.com/portfolio.html</a>
