This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This code follows the tutorial of react-beautiful-dnd : https://egghead.io/lessons/react-set-up-a-react-environment-with-create-react-app


# This year I am tracking every hour of every day - all 8760 of them

As part of that, I wanted to make a little personal site that I will use to track. As with every personal project, work is easier to prioritise first and hence it is now May. Hopefully, this will get of the ground soon. 

All to-do lists are ordered in importance

## Feature list:

* If hour is placed:
  - ~~add the value of the hour block to the state of the hour pot~~
  - ~~update hour pots state to display values totals~~
  - ~~remove the hour block from the page on drop~~
  - ~~check the hours left to limit what options of hour blocks we can display~~ : This would require a change of what hours are displayed from start (0.5 to 8) so have decided against this. Plus this gives the addage of moving from days easily - ie 8 hours sleep will lead to the next day. 
  - ~~incrementally increase the hours of the day that is complete~~
  - ~~add in a scale for the progress bar so you know the time of day~~
* ~~Save a day by moving/dumping all values contexts to a file/output (csv)~~
* ~~Instead of above - implement some conversion so that we can upload this to google sheets: use Sheety~~
* ~~Rethink progress bar to add blocks instead of strecthing one.~~
  - ~~Will need to know the value and the designation as to apply colours~~
* ~~Add icons for the hours? Have a think if useful or if precise values are better~~
    - decided against it currently. Maybe a stretch goal when I want to improve the UI
* ~~Add hour 'tick' marks to the progress bar~~
    - ~~probably best off in CSS~~ 
* ~~Resolve the opacity issue~~
    - ~~Opacity is set in the data import. It doesn't need to be~~
    - ~~Change opacity on to the pot~~
    - ~~Remove opacity from the data~~
    - ~~it will allow the progress bar to be the right colour~~
        - I have placed a dontColour flag on now just incase you want the image to be the pure colour of the pot
        - in google sheets simply leave the field empty
* ~~Have the current time of day on the progress bar~~ 
    - Played with this. Not  abig fan as it says the same as the bar below quite often. Will revisit if necessary.
* ~Have the DayDisplay actually dictate what day needs to be completed in the calendar.~
    - ~It should be an option~
    - ~It should be part of the data that gets sent to the db~
    - ~It should have a skip day option~ this is possible using the calendar
    - In future, add reading the db to find empty rows that need completing
* MAKE MOBILE FRIENDLY (CSS timeeee)
    - ~~First stab done - no real thinking, rhyme or reason applied here~~
* ~Drive all data from google sheets and hence allow that to reorder your initial data~
    - ~Configure images from google sheets by making an images column that takes in urls~

ToDo :
* Move to netlify to begin testing

* Have the ability to create pots
    - ~Allow post on sheety~ not required
    - Give title and own box
    - refresh the new projects listing each 'day submission'

* Add night mode button
* Add an automatic sorting tab in Sheets so that the top hours will always appear in the view
    - https://support.google.com/docs/thread/5536082?hl=en
* Add half hours into the future by expanding the 
* Add a button to create hour pots (stretch goal)
    - ~Will need to post to the SummaryOfPots tab in Google Sheets~
        - Not needed now as any submission will create a new record for it in google sheets
* When a different date is selected we remove any hanging over data.
    - For example if I add 4 hours to a 10pm and then a user changes the date should we clear the data?
* Add backgrounds
    - ~~Manual photos~~
* ~Have the hours on each pot be removed after 24 hours~
    - ~could be an interesting tracking feature but it makes you compare way too much~ done in google sheets now
* ~~Seperate the destination-hour-pots and the hour-bar-pot~~
    - ~~For styling reasons~~ - Done this but now have a weird padding/margin issue on RHS

## Update Pics
For my own benefit with screenshots:

### The Nineth screenshot:
![The Nineth screenshot](./buildScreenshots/img9.png?raw=true "The Nineth screenshot")

Updated the css for mobile. Should be pretty close to ready for me to push onto netlify or something. Would quite like a dark mode maybe before it!

### The Eigth screenshot:
![The Eigth screenshot](./buildScreenshots/img8.png?raw=true "The Eigth screenshot")

It has been a while! I decided that for simplicity I should use Sheety v2 (https://sheety.co/). It is much quicker an easier and has saved a learning curve of authentication. It also allows me to do analytics in google sheets which is how I have been tracking it the past year. 

Some UI tweaks and then also changed so you can pick dates. This also autoincrements when you have created a day. Because I am lazy/couldn't think on an elegant fix, I have removed the ability to record half hours. I will fix one day. 

### The Seventh screenshot:
![The Seventh screenshot](./buildScreenshots/img7.png?raw=true "The Seventh screenshot")

More mobile fettling (on pots, header bar and timeline). Need to move to cloud asap.


### The Sixth screenshot:
![The sixth screenshot](./buildScreenshots/img6.png?raw=true "The sixth screenshot")

Spent some quick time on mobile CSS. I have not thought much abou the design, but instead worked on getting the elements in an order on the screen - hence why titles have moved. I want to push this so that I can start using it and be the first 'user tester'. Until I have used it I don't know what I want. For example, I expect my first change would be to move the hours bar around so that it is easier to drag with one hand and has to travel less distance. 

### The Fifth screenshot:
![The fifth screenshot](./buildScreenshots/img5.png?raw=true "The fifth screenshot")

Added images (all from unsplash.com), added colour opacity fot the pots to view the bar on the bottom, added flag for this colour in the data set, reordered for usability.  

### The Fourth screenshot:
![The fourth screenshot](./buildScreenshots/img4.png?raw=true "The fourth screenshot")

I decided I didn't want to touch databases today as I still am unsure of the pick and how I want to add graphs and tracking in the future. Instead I focused on CSS and adding blocks so that now you can see which block you pick in the progress bar. This happens through passing the context of the dropped item through the event handler to the function that builds the progress bar. I also added colours to the boxes so it was more obvious. 

### The Third screenshot:
![The third screenshot](./buildScreenshots/img3.png?raw=true "The third screenshot")

Database structure - I am not happy with it but it is cheap in terms of writes. Ultimately, I have put this on pause as I need to actually think about this appose to just hack as it will determine how I communicate data across the whole app and to the database and then to the graphs/metrics which I want to add later.

### The second screenshot:
![The second screenshot](./buildScreenshots/img2.png?raw=true "The second screenshot")

Adding some logic with the drag and drop event handlers

### The first screenshot:
![The first screenshot](./buildScreenshots/img1.png?raw=true "The first screenshot")

Just getting the layout sorted and playing with react beautiful drag n drop


## Removed to do list:
* Removed as we moved to sheety
    - Instead of above again, use a database to do it
    - ~Selected DynamoDB on AWS - mainly to learn more about AWS (I have used GCP and IBM Cloud before - you are next Azure)
        - Created two working scripts to connect to AWS DynamoDB. Procedure is to create a table, add IAM rights to view that table, then read and write through queries.
        - found the scan() functionality but am struggling - started write up in book
        - further investigation - DynamoDB is great at finding single items quickly but is more complicated than perhaps necessary here for functions like scanning to find what is the most recent date. I don't want to get the entire list of dates and find the largest that way. 
        - Doing this has highlighted how much planning ahead is needed before defining primary keys!!
        - Needs more thought
* Removed as with google sheets access there is little need
    - Implement Redux so that we may Undo - unsure if this is necessary for MVP

* Removed as deemed not required:
    - Backgrounds with the unplash api? (stretch goal)
* Removed as we still hacve google sheets though some stanadardisation would be cool
    - Add some analytics modals - you click on the column and a modal shows a graph (or more) about your time in that area (strecth goal)
        - Really want this. There must be prebuilt viz. I can use
         - d3.js? - I have built with before so could be easy
         - specific to db? I could find an example already made with queries already attached potentially? 